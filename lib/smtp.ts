import { Socket } from "node:net";
import { TLSSocket, connect as tlsConnect } from "node:tls";

// Minimal SMTP client (EHLO/STARTTLS/AUTH LOGIN/MAIL/RCPT/DATA) used to send
// the contact-form notification without pulling in a mailer dependency —
// this project has no network access to `npm install` a package like
// nodemailer during development, and a raw client also keeps runtime deps
// at zero for a one-email-at-a-time use case.

export type ConnectionOptions = {
  host: string;
  port: number;
  secure: boolean; // true = implicit TLS from connect (port 465), false = STARTTLS (port 587/25)
  user: string;
  pass: string;
  from: string;
};

export type Message = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export type SendMailOptions = ConnectionOptions & Message;

type Line = { code: number; text: string };

function readResponse(socket: Socket | TLSSocket): Promise<Line> {
  return new Promise((resolve, reject) => {
    let buffer = "";
    const onData = (chunk: Buffer) => {
      buffer += chunk.toString("utf8");
      const lines = buffer.split("\r\n").filter(Boolean);
      const last = lines[lines.length - 1];
      // Multi-line responses use "250-..." for continuation, "250 ..." for the final line.
      if (last && /^\d{3} /.test(last)) {
        cleanup();
        resolve({ code: Number(last.slice(0, 3)), text: lines.join("\n") });
      }
    };
    const onError = (err: Error) => {
      cleanup();
      reject(err);
    };
    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
    };
    socket.on("data", onData);
    socket.on("error", onError);
  });
}

function sendCommand(socket: Socket | TLSSocket, command: string): Promise<Line> {
  const pending = readResponse(socket);
  socket.write(command + "\r\n");
  return pending;
}

function assertOk(line: Line, step: string) {
  if (line.code >= 400) {
    throw new Error(`SMTP ${step} failed: ${line.code} ${line.text}`);
  }
}

function encodeSubject(subject: string) {
  return `=?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`;
}

// The SMTP envelope (MAIL FROM / RCPT TO) takes a bare address, unlike the
// From: header, which may be "Display Name <address>".
function extractEmail(address: string): string {
  const m = address.match(/<([^>]+)>/);
  return m ? m[1] : address.trim();
}

/**
 * Opens a single authenticated SMTP session and lets `handler` send one or
 * more messages through it (via the `send` callback it's given) before the
 * connection is closed. Sending multiple messages over one session — rather
 * than reconnecting/re-authenticating per message — avoids providers (Mail.ru,
 * Яндекс, etc.) that rate-limit or silently drop rapid repeat logins from the
 * same account.
 */
export async function withSmtpConnection(
  opts: ConnectionOptions,
  handler: (send: (message: Message) => Promise<void>) => Promise<void>
): Promise<void> {
  const connectOnce = () =>
    new Promise<Socket | TLSSocket>((resolve, reject) => {
      const socket = opts.secure
        ? tlsConnect({ host: opts.host, port: opts.port, servername: opts.host }, () => resolve(socket))
        : new Socket().connect(opts.port, opts.host, () => resolve(socket));
      socket.once("error", reject);
    });

  let socket = await connectOnce();
  try {
    assertOk(await readResponse(socket), "connect");

    const ehloName = "localhost";
    let ehlo = await sendCommand(socket, `EHLO ${ehloName}`);
    assertOk(ehlo, "EHLO");

    if (!opts.secure) {
      assertOk(await sendCommand(socket, "STARTTLS"), "STARTTLS");
      const upgraded: TLSSocket = await new Promise((resolve, reject) => {
        const tlsSocket = tlsConnect({ socket, servername: opts.host }, () => resolve(tlsSocket));
        tlsSocket.once("error", reject);
      });
      socket = upgraded;
      ehlo = await sendCommand(socket, `EHLO ${ehloName}`);
      assertOk(ehlo, "EHLO (TLS)");
    }

    assertOk(await sendCommand(socket, "AUTH LOGIN"), "AUTH LOGIN");
    assertOk(await sendCommand(socket, Buffer.from(opts.user, "utf8").toString("base64")), "AUTH USER");
    assertOk(await sendCommand(socket, Buffer.from(opts.pass, "utf8").toString("base64")), "AUTH PASS");

    const send = async (message: Message) => {
      const activeSocket = socket;
      assertOk(await sendCommand(activeSocket, `MAIL FROM:<${extractEmail(opts.from)}>`), "MAIL FROM");
      assertOk(await sendCommand(activeSocket, `RCPT TO:<${extractEmail(message.to)}>`), "RCPT TO");
      assertOk(await sendCommand(activeSocket, "DATA"), "DATA");

      const headers = [
        `From: ${opts.from}`,
        `To: ${message.to}`,
        message.replyTo ? `Reply-To: ${message.replyTo}` : null,
        `Subject: ${encodeSubject(message.subject)}`,
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=utf-8",
      ]
        .filter(Boolean)
        .join("\r\n");

      // Dot-stuff any line that starts with "." per RFC 5321.
      const body = message.html
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map((l) => (l.startsWith(".") ? "." + l : l))
        .join("\r\n");

      assertOk(await sendCommand(activeSocket, `${headers}\r\n\r\n${body}\r\n.`), "message body");
    };

    await handler(send);
    await sendCommand(socket, "QUIT");
  } finally {
    socket.end();
  }
}

/** Convenience wrapper for sending a single message on its own connection. */
export async function sendMail(opts: SendMailOptions): Promise<void> {
  const { to, subject, html, replyTo, ...connectionOpts } = opts;
  await withSmtpConnection(connectionOpts, (send) => send({ to, subject, html, replyTo }));
}
