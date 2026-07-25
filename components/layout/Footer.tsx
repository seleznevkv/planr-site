import Link from "next/link";
import Logo from "@/components/Logo";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { navItems, siteConfig } from "@/lib/site";

const legalLinks = [
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/offer", label: "Публичная оферта" },
];

export default function Footer() {
  return (
    <footer className="relative mt-16 sm:mt-28">
      <div className="container-px max-w-[1280px] mx-auto pb-8 sm:pb-10">
        <GlassCard
          variant="strong"
          padding="md"
          hover={false}
          className="grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]"
        >
          <div>
            <Logo />
            <p className="hidden sm:block mt-4 text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex items-baseline gap-3 sm:block">
            <h4 className="shrink-0 text-xs sm:text-sm font-semibold text-[var(--text-primary)] sm:mb-4">Разделы</h4>
            <ul className="flex flex-wrap gap-x-3 gap-y-1.5 sm:flex-col sm:gap-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--color-brand-blue)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-baseline gap-3 sm:block">
            <h4 className="shrink-0 text-xs sm:text-sm font-semibold text-[var(--text-primary)] sm:mb-4">Правовая информация</h4>
            <ul className="flex flex-wrap gap-x-3 gap-y-1.5 sm:flex-col sm:gap-y-3">
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
            <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-2 sm:mb-4">Свяжитесь с нами</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1 sm:flex-col sm:gap-y-3 text-xs sm:text-sm text-[var(--text-secondary)]">
              <a href={siteConfig.phoneHref} className="hover:text-[var(--color-brand-blue)] transition-colors">
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-[var(--color-brand-blue)] transition-colors">
                {siteConfig.email}
              </a>
            </div>
            <div className="mt-3 sm:mt-5">
              <Button href="/contact" size="sm" variant="secondary">
                Записаться на демо
              </Button>
            </div>
          </div>
        </GlassCard>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-6 sm:mt-8 text-xs text-[var(--text-tertiary)] text-center">
          <p>© {new Date().getFullYear()} РостПро. Все права защищены.</p>
          <p>Сделано для проектного бизнеса, который ценит своё время.</p>
        </div>
      </div>
    </footer>
  );
}
