"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { IconCheck } from "@/components/icons";

const CONSENT_KEY = "rostpro-cookie-consent";
const METRIKA_ID = 110934264;

function loadYandexMetrika() {
  if (document.getElementById("yandex-metrika-script")) return;
  const script = document.createElement("script");
  script.id = "yandex-metrika-script";
  script.type = "text/javascript";
  script.text = `
(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}', 'ym');

ym(${METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
`;
  document.head.appendChild(script);
}

function readConsent(): { analytics: boolean } | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    // Back-compat with the earlier accepted/declined-only format.
    if (raw === "accepted") return { analytics: true };
    if (raw === "declined") return { analytics: false };
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeConsent(analytics: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics, decidedAt: new Date().toISOString() }));
  } catch {}
}

/**
 * Cookie notice (152-ФЗ + Роскомнадзор рекомендации по cookie). Necessary
 * cookies (theme preference, this choice) always work. Analytics
 * (Yandex.Metrika) runs by default like on most RU sites — opt-out, not
 * opt-in — the banner just discloses it and lets visitors turn it off.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(true);

  useEffect(() => {
    const consent = readConsent();
    if (consent === null) {
      loadYandexMetrika();
      setVisible(true);
    } else if (consent.analytics) {
      loadYandexMetrika();
    }
  }, []);

  function acknowledge() {
    writeConsent(true);
    setVisible(false);
  }

  function saveChoice() {
    const wasTracking = !!document.getElementById("yandex-metrika-script");
    writeConsent(analyticsChecked);
    setVisible(false);
    // Metrika has no clean "stop tracking" call once initialized — reload so
    // a declined choice actually takes effect for the rest of this visit too.
    if (wasTracking && !analyticsChecked) {
      window.location.reload();
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6" role="dialog" aria-label="Уведомление об использовании cookie">
      <div className="max-w-2xl mx-auto glass-opaque rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl">
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Сайт использует необходимые cookie для работы, а также аналитические (Яндекс.Метрика) — они включены по
          умолчанию и помогают улучшать сайт. Вы можете отключить аналитику. Подробнее — в{" "}
          <a href="/privacy" className="text-[var(--color-brand-blue)] hover:underline">
            политике конфиденциальности
          </a>
          .
        </p>

        {expanded && (
          <div className="mt-4 space-y-3">
            <div className="flex items-start justify-between gap-4 rounded-2xl glass-soft px-4 py-3.5">
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Необходимые</p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)] leading-relaxed">
                  Технические cookie для работы сайта: сохранение темы оформления и вашего выбора в этом окне.
                  Всегда активны и не требуют согласия.
                </p>
              </div>
              <span className="mt-0.5 w-5 h-5 shrink-0 rounded-md icon-chip flex items-center justify-center text-[var(--color-brand-blue)]">
                <IconCheck className="w-3.5 h-3.5" strokeWidth={3} />
              </span>
            </div>

            <label className="flex items-start justify-between gap-4 rounded-2xl glass-soft px-4 py-3.5 cursor-pointer select-none">
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Аналитические</p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)] leading-relaxed">
                  Яндекс.Метрика: статистика посещений, карта кликов и вебвизор — включены по умолчанию, помогают
                  понять, что улучшить на сайте. Можно отключить.
                </p>
              </div>
              <input
                type="checkbox"
                checked={analyticsChecked}
                onChange={(e) => setAnalyticsChecked(e.target.checked)}
                className="peer sr-only"
              />
              <span className="mt-0.5 w-5 h-5 shrink-0 rounded-md icon-chip flex items-center justify-center text-transparent transition-colors peer-checked:bg-[var(--color-brand-blue)] peer-checked:border-[var(--color-brand-blue)] peer-checked:text-white">
                <IconCheck className="w-3.5 h-3.5" strokeWidth={3} />
              </span>
            </label>
          </div>
        )}

        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {!expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors sm:mr-auto text-left"
            >
              Настроить
            </button>
          )}
          <div className="flex items-center gap-3 sm:ml-auto">
            {expanded ? (
              <Button variant="primary" size="sm" onClick={saveChoice} className="flex-1 sm:flex-none">
                Сохранить выбор
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={acknowledge} className="flex-1 sm:flex-none">
                Хорошо, понятно
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
