import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { legalDocuments, type LegalDocId } from '@/lib/legalContent';
import { APP_LOGIN_URL, APP_SIGNUP_URL } from '@/config/links';

type Props = { docId: LegalDocId };

export default function LegalDocument({ docId }: Props) {
  const doc = legalDocuments[docId];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1829] to-[#0B1120]" />
        <div className="noise-overlay absolute inset-0 opacity-30" />
      </div>

      <Header />

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
          {doc.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {doc.updated}</p>

        <div className="mt-10 space-y-8">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-foreground">{section.heading}</h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          <a href={APP_LOGIN_URL} className="hover:text-foreground transition-colors">
            Sign in
          </a>
          {' · '}
          <a href={APP_SIGNUP_URL} className="hover:text-foreground transition-colors">
            Sign up
          </a>
          {' · '}
          <a href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </a>
          {' · '}
          <a href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </a>
        </p>
      </article>

      <Footer />
    </main>
  );
}
