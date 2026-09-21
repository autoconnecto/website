import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import type { SolutionOffering } from '@/content/solutions';

const accentStyles: Record<
  SolutionOffering['accent'],
  { badge: string; icon: string; border: string }
> = {
  sky: {
    badge: 'border-sky-500/20 bg-sky-500/10 text-sky-300',
    icon: 'bg-sky-500/15 border-sky-500/20 text-sky-400',
    border: 'hover:border-sky-500/40',
  },
  emerald: {
    badge: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    icon: 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400',
    border: 'hover:border-emerald-500/40',
  },
  violet: {
    badge: 'border-violet-500/20 bg-violet-500/10 text-violet-300',
    icon: 'bg-violet-500/15 border-violet-500/20 text-violet-400',
    border: 'hover:border-violet-500/40',
  },
  amber: {
    badge: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
    icon: 'bg-amber-500/15 border-amber-500/20 text-amber-400',
    border: 'hover:border-amber-500/40',
  },
};

export default function SolutionsCatalog({
  solutions,
}: {
  solutions: SolutionOffering[];
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
          <Icon name="CubeIcon" size={12} />
          Solutions
        </span>
      </div>

      <div className="text-center mb-14 max-w-2xl mx-auto">
        <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-foreground mb-4">
          Hardware plus platform,{' '}
          <span className="text-gradient-primary">packaged to ship</span>
        </h1>
        <p className="text-muted-foreground text-lg font-light">
          Sellable kits and industrial offerings on Autoconnecto. Bundle pricing
          on request — SaaS plans stay on{' '}
          <Link href="/pricing" className="text-primary font-medium hover:underline">
            Pricing
          </Link>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {solutions.map((s) => {
          const a = accentStyles[s.accent];
          return (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card card-glow card-glow-hover transition-all duration-300 p-6 flex flex-col min-h-[280px] ${a.border}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${a.icon}`}
                >
                  <Icon name={s.iconName} size={22} />
                </div>
                <div>
                  <h2 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {s.shortDescription}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {s.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-1 rounded-full border text-xs font-medium ${a.badge}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                View solution
                <Icon
                  name="ArrowRightIcon"
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
