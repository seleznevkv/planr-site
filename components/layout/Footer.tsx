import Link from "next/link";
import Logo from "@/components/Logo";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { navItems, siteConfig, legalEntity } from "@/lib/site";

const legalLinks = [
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/offer", label: "Публичная оферта" },
];

const extraSectionLinks = [
  { href: "https://docs.rostpro.tech/", label: "Документация", external: true },
  { href: "/changelog", label: "История версий" },
];

export default function Footer() {
  return (
    <footer className="relative mt-16 sm:mt-28">
      <div className="container-px max-w-[1280px] mx-auto pb-8 sm:pb-10">
        <GlassCard
          variant="strong"
          padding="md"
          hover={false}
          className="grid grid-cols-1 gap-6 lg:gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]"
        >
          <div>
            <Logo />
            <p className="hidden lg:block mt-4 text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex items-baseline gap-3 lg:block">
            <h4 className="shrink-0 text-xs sm:text-sm font-semibold text-[var(--text-primary)] lg:mb-4">Разделы</h4>
            <ul className="flex flex-wrap gap-x-3 gap-y-1.5 lg:flex-col lg:gap-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--color-brand-blue)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {extraSectionLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--color-brand-blue)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-baseline gap-3 lg:block">
            <h4 className="shrink-0 text-xs sm:text-sm font-semibold text-[var(--text-primary)] lg:mb-4">Правовая информация</h4>
            <ul className="flex flex-wrap gap-x-3 gap-y-1.5 lg:flex-col lg:gap-y-3">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--color-brand-blue)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-2 lg:mb-4">Свяжитесь с нами</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1 lg:flex-col lg:gap-y-3 text-xs sm:text-sm text-[var(--text-secondary)]">
              <a href={siteConfig.phoneHref} className="hover:text-[var(--color-brand-blue)] transition-colors">
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-[var(--color-brand-blue)] transition-colors">
                {siteConfig.email}
              </a>
            </div>
            <div className="mt-3 lg:mt-5">
              <Button href="/contact" size="sm" variant="secondary">
                Записаться на демо
              </Button>
            </div>
          </div>
        </GlassCard>

        <div className="mt-6 sm:mt-8 text-center text-xs text-[var(--text-tertiary)]">
          <p>
            {legalEntity.shortName} · ИНН {legalEntity.inn} · КПП {legalEntity.kpp} · ОГРН{" "}
            {legalEntity.ogrn} · {legalEntity.address}
          </p>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2 mt-2">
            <p>© {new Date().getFullYear()} РостПро. Все права защищены.</p>
            <p>Сделано для проектного бизнеса, который ценит своё время.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
