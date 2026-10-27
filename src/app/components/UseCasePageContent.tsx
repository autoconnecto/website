import React from 'react';
import Image from 'next/image';
import type { UseCasePage } from '@/content/useCases';
import { APP_SIGNUP_URL } from '@/config/links';
import Icon from '@/components/ui/AppIcon';

export default function UseCasePageContent({ page }: { page: UseCasePage }) {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Autoconnecto
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground tracking-tight text-balance">
          {page.h1}
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{page.lead}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={APP_SIGNUP_URL}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Try the platform
            <Icon name="ArrowRightIcon" size={14} />
          </a>
          <a
            href="/product"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            Product overview
          </a>
        </div>

        {page.image ? (
          <div className="mt-12">
            <Image
              src={page.image.src}
              alt={page.image.alt}
              width={960}
              height={540}
              className="w-full rounded-xl border border-border shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              sizes="(max-width: 768px) 100vw, 768px"
              loading="lazy"
            />
          </div>
        ) : null}

        <div className="mt-14 space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>

        {page.steps && page.steps.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-semibold text-foreground mb-6">Get running</h2>
            <ol className="space-y-5">
              {page.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-medium text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-14 pt-10 border-t border-border">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Related
          </h2>
          <ul className="flex flex-col gap-2">
            {page.links.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-primary hover:underline text-sm font-medium"
                >
                  {link.label}
                  {link.external ? ' →' : ''}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
