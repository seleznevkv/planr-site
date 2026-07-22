import { Socket } from "node:net";
import { TLSSocket, connect as tlsConnect } from "node:tls";

// Minimal SMTP client (EHLO/STARTTLS/AUTH LOGIN/MAIL/RCPT/DATA) used to send
// the contact-form notification without pulling in a mailer dependency —
// this project has no network access to `npm install` a package like
// nodemailer during development, and a raw client also keeps runtime deps
// at zero for a one-email-at-a-time use case.

export type SendMailOptions = {
  host: string;
  port: number;
  secure: boolean; // true = implicit TLS from connect (port 465), false = STARTTLS (port 587/25)
  user: string;
  pass: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

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

export async function sendMail(opts: SendMailOptions): Promise<void> {
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

    assertOk(await sendCommand(socket, `MAIL FROM:<${opts.from}>`), "MAIL FROM");
    assertOk(await sendCommand(socket, `RCPT TO:<${opts.to}>`), "RCPT TO");
    assertOk(await sendCommand(socket, "DATA"), "DATA");

    const headers = [
      `From: ${opts.from}`,
      `To: ${opts.to}`,
      opts.replyTo ? `Reply-To: ${opts.replyTo}` : null,
      `Subject: ${encodeSubject(opts.subject)}`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=utf-8",
    ]
      .filter(Boolean)
      .join("\r\n");

    // Dot-stuff any line that starts with "." per RFC 5321.
    const body = opts.html.replace(/\r\n/g, "\n").split("\n").map((l) => (l.startsWith(".") ? "." + l : l)).join("\r\n");

    assertOk(await sendCommand(socket, `${headers}\r\n\r\n${body}\r\n.`), "message body");
    await sendCommand(socket, "QUIT");
  } finally {
    socket.end();
  }
}
