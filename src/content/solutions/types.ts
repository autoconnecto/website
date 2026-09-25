export type SolutionIncludeKind = 'hardware' | 'platform' | 'service';

export type SolutionInclude = {
  kind: SolutionIncludeKind;
  title: string;
  description: string;
};

export type SolutionFaq = {
  question: string;
  answer: string;
};

export type SolutionStep = {
  title: string;
  description: string;
};

/**
 * Public marketing offering (hardware + platform bundle).
 * Not the same as in-app dashboard Solutions templates.
 */
export type SolutionOffering = {
  /** URL segment under /solutions/[slug] */
  slug: string;
  /** Sort order ascending */
  order: number;
  title: string;
  /** Card / meta blurb */
  shortDescription: string;
  /** Detail hero eyebrow */
  eyebrow: string;
  /** Detail hero headline */
  headline: string;
  /** Detail hero supporting sentence */
  support: string;
  /** Heroicons outline name for cards */
  iconName: string;
  /** Accent for badges (tailwind-ish token) */
  accent: 'sky' | 'emerald' | 'violet' | 'amber';
  tags: string[];
  industries: string[];
  audience: string[];
  includes: SolutionInclude[];
  howItWorks: SolutionStep[];
  faqs: SolutionFaq[];
  ctaLabel: string;
  /** Prefill contact subject */
  contactSubject: string;
  /** Optional later: in-app dashboard template id */
  inAppSolutionId?: string;
  /** When set, this offering is the priced pilot on the detail page */
  pilot?: {
    priceInr: number;
    /** Shown instead of a rupee amount when the pilot is free */
    priceLabel?: string;
    days: number;
    title: string;
    scope: string[];
    note: string;
    proof?: {
      label: string;
      site: string;
      dashboard: string;
      alarm: string;
    };
  };
};
