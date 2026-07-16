import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { pricingPlans } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function PricingPlans() {
  return (
    <div className="grid lg:grid-cols-3 gap-6 items-stretch">
      {pricingPlans.map((plan) => (
        <GlassCard
          key={plan.id}
          variant={plan.popular ? "strong" : "default"}
          padding="lg"
          className={cn(
            "relative flex flex-col text-center",
            plan.popular && "lg:-translate-y-3 ring-1 ring-[var(--color-brand-blue)]/40"
          )}
        >
          {plan.popular && (
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-navy)] shadow-lg">
              Популярный выбор
            </span>
          )}
          <h3 className="text-xl font-extrabold text-[var(--text-primary)]">{plan.name}</h3>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{plan.seats}</p>

          <div className="mt-6 flex items-baseline justify-center gap-2">
            <span className="text-4xl font-extrabold text-[var(--text-primary)]">
              {plan.price.toLocaleString("ru-RU")} ₽
            </span>
            <span className="text-sm text-[var(--text-tertiary)]">/ мес.</span>
          </div>

          <Button href="/contact" className="mt-6 w-full" variant={plan.popular ? "primary" : "secondary"}>
            Выбрать тариф
          </Button>
        </GlassCard>
      ))}
    </div>
  );
}
