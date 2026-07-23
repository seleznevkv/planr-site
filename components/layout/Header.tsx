"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import VersionBadge from "@/components/layout/VersionBadge";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Measure the active link's position within the nav so the highlight pill
  // can animate purely as left/width (never top/bottom) — a viewport-rect-based
  // layoutId animation picks up the sticky header's scroll-driven padding
  // change as a spurious vertical jump when navigating mid-scroll.
  useLayoutEffect(() => {
    const activeItem = navItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    );
    const activeEl = activeItem ? linkRefs.current[activeItem.href] : null;
    if (activeEl) {
      setPill({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    } else {
      setPill(null);
    }
  }, [pathname]);

  useEffect(() => {
    function onResize() {
      const activeItem = navItems.find((item) =>
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
      );
      const activeEl = activeItem ? linkRefs.current[activeItem.href] : null;
      if (activeEl) setPill({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass-header py-3" : "py-5 bg-transparent"
      )}
    >
      <div className="container-px max-w-[1280px] mx-auto flex items-center gap-6">
        <div className="shrink-0 flex items-center gap-2">
          <Link href="/">
            <Logo />
          </Link>
          <VersionBadge />
        </div>

        <nav className="hidden lg:flex items-center gap-1 mx-auto relative">
          {pill && (
            <motion.span
              initial={false}
              animate={{ left: pill.left, width: pill.width }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="absolute inset-y-0 rounded-full glass -z-10"
            />
          )}
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => {
                  linkRefs.current[item.href] = el;
                }}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                  active
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <ThemeToggle />
          <Button href="/contact" size="md">
            Запросить демонстрацию
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-2 ml-auto">
          <ThemeToggle />
          <Button href="/contact" size="sm">
            Демо
          </Button>
          <button
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen((v) => !v)}
            className="w-11 h-11 rounded-full glass flex items-center justify-center text-[var(--text-primary)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden overflow-hidden"
          >
            <div className="container-px max-w-[1280px] mx-auto pt-4 pb-2">
              <div className="glass rounded-3xl p-4 flex flex-col gap-1">
                {navItems.map((item) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-4 py-3 rounded-2xl text-sm font-medium transition-colors",
                        active
                          ? "bg-[var(--glass-bg-strong)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-2">
                  <Button href="/contact" className="w-full">
                    Запросить демонстрацию
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
