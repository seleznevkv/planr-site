"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import VersionBadge from "@/components/layout/VersionBadge";
import { navItems, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

function matchesHref(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function isItemActive(item: NavItem, pathname: string): boolean {
  if (!item.external && matchesHref(item.href, pathname)) return true;
  return !!item.children?.some((c) => !c.external && matchesHref(c.href, pathname));
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(false);
  const [mobileTechOpen, setMobileTechOpen] = useState(false);
  const linkRefs = useRef<Record<string, HTMLElement | null>>({});
  const techRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setTechOpen(false);
    setMobileTechOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!techOpen) return;

    function onPointerDown(e: PointerEvent) {
      if (techRef.current && !techRef.current.contains(e.target as Node)) {
        setTechOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setTechOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [techOpen]);

  // Measure the active link's position within the nav so the highlight pill
  // can animate purely as left/width (never top/bottom) — a viewport-rect-based
  // layoutId animation picks up the sticky header's scroll-driven padding
  // change as a spurious vertical jump when navigating mid-scroll.
  useLayoutEffect(() => {
    const activeItem = navItems.find((item) => isItemActive(item, pathname));
    const activeEl = activeItem ? linkRefs.current[activeItem.href] : null;
    if (activeEl) {
      setPill({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    } else {
      setPill(null);
    }
  }, [pathname]);

  useEffect(() => {
    function onResize() {
      const activeItem = navItems.find((item) => isItemActive(item, pathname));
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
            const active = isItemActive(item, pathname);

            if (item.children) {
              return (
                <div key={item.href} ref={techRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setTechOpen((v) => !v)}
                    aria-expanded={techOpen}
                    aria-haspopup="menu"
                    ref={(el) => {
                      linkRefs.current[item.href] = el;
                    }}
                    className={cn(
                      "relative flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                      active
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn("transition-transform duration-200", techOpen && "rotate-180")}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {techOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        role="menu"
                        className="absolute left-0 top-full mt-2 w-56 z-50 glass-opaque rounded-2xl overflow-hidden shadow-2xl py-2"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            target={child.external ? "_blank" : undefined}
                            rel={child.external ? "noopener noreferrer" : undefined}
                            role="menuitem"
                            onClick={() => setTechOpen(false)}
                            className="block px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg-strong)] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
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
                  const active = isItemActive(item, pathname);

                  if (item.children) {
                    return (
                      <div key={item.href}>
                        <button
                          type="button"
                          onClick={() => setMobileTechOpen((v) => !v)}
                          aria-expanded={mobileTechOpen}
                          className={cn(
                            "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-colors",
                            active
                              ? "bg-[var(--glass-bg-strong)] text-[var(--text-primary)]"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                          )}
                        >
                          {item.label}
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={cn("transition-transform duration-200", mobileTechOpen && "rotate-180")}
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileTechOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="overflow-hidden pl-3"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  target={child.external ? "_blank" : undefined}
                                  rel={child.external ? "noopener noreferrer" : undefined}
                                  className="block px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
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
