import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import ChangelogList from "@/components/changelog/ChangelogList";
import { getChangelog } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "История версий",
  description: "Полный список обновлений платформы РостПро по версиям — что изменилось и когда.",
  alternates: { canonical: "/changelog" },
};

export default async function ChangelogPage() {
  const entries = await getChangelog();
  const currentVersion = entries[0]?.version ?? "";

  return (
    <Section size="lg" className="pt-8 sm:pt-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
        История версий
      </h1>
      <p className="mt-3 text-sm text-[var(--text-tertiary)] max-w-3xl">
        Текущая версия платформы — {currentVersion}. Ниже — список изменений по каждому релизу.
      </p>

      <Reveal className="mt-8 max-w-3xl">
        <GlassCard hover={false} padding="sm">
          <ChangelogList entries={entries} className="px-1 py-1" />
        </GlassCard>
      </Reveal>
    </Section>
  );
}
