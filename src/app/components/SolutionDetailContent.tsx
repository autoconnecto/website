import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import type { SolutionOffering } from '@/content/solutions';

const kindLabel: Record<SolutionOffering['includes'][0]['kind'], string> = {
  hardware: 'Hardware',
  platform: 'Platform',
  service: 'Service',
};

const kindBadge: Record<SolutionOffering['includes'][0]['kind'], string> = {
  hardware: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  platform: 'border-sky-500/25 bg-sky-500/10 text-sky-300',
  service: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
};

function contactHref(solution: SolutionOffering) {
  const params = new URLSearchParams({
    solution: solution.slug,
    tab: 'contact',
  });
  return `/?${params.toString()}#contact`;
}

export default function SolutionDetailContent({
  solution,
}: {
  solution: SolutionOffering;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <Link
        href="/solutions"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <Icon name="ArrowLeftIcon" size={14} />
        All solutions
      </Link>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-5">
            {solution.eyebrow}
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-foreground mb-4">
            {solution.headline}
          </h1>
          <p className="text-muted-foreground text-lg font-light max-w-2xl leading-relaxed">
            {solution.support}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href={contactHref(solution)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {solution.ctaLabel}
              <Icon name="ArrowRightIcon" size={16} />
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/40 transition-colors"
            >
              Platform pricing
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 p-6 space-y-5">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Industries
            </p>
            <div className="flex flex-wrap gap-2">
              {solution.industries.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-full border border-border text-xs text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Built for
            </p>
            <ul className="space-y-2">
              {solution.audience.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-foreground">
                  <Icon
                    name="CheckCircleIcon"
                    size={16}
                    className="text-primary flex-shrink-0 mt-0.5"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Hardware and bundle pricing on request. Autoconnecto SaaS subscription
            required for cloud features.
          </p>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          What&apos;s included
        </h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-2xl">
          Hardware in the box versus platform capabilities — scoped clearly so
          quotes stay honest.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {solution.includes.map((item) => (
            <div
              key={`${item.kind}-${item.title}`}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <span
                className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider mb-3 ${kindBadge[item.kind]}`}
              >
                {kindLabel[item.kind]}
              </span>
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display font-bold text-2xl text-foreground mb-6">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {solution.howItWorks.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary mb-3">
                {i + 1}
              </div>
              <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display font-bold text-2xl text-foreground mb-6">
          FAQ
        </h2>
        <div className="space-y-4">
          {solution.faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="font-display font-bold text-xl text-foreground mb-1">
            Ready to scope {solution.title}?
          </h2>
          <p className="text-sm text-muted-foreground">
            Tell us sites, volumes, and timeline — we respond within 2 business hours.
          </p>
        </div>
        <a
          href={contactHref(solution)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex-shrink-0"
        >
          {solution.ctaLabel}
          <Icon name="ArrowRightIcon" size={16} />
        </a>
      </div>
    </div>
  );
}
