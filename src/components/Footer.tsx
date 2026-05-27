import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import {
  ARDUINO_SDK_GITHUB_URL,
  MOBILE_APP_RELEASES_URL,
} from '@/config/links';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.autoconnecto.in').trim().replace(/\/+$/, '');

const footerLinks = [
  { label: 'Product', href: '/product', external: false },
  { label: 'Platform', href: '/#platform', external: false },
  { label: 'Pricing', href: '/pricing', external: false },
  { label: 'Features', href: '/#features', external: false },
  { label: 'Scale', href: '/#scale', external: false },
  { label: 'Developers', href: '/#developers', external: false },
  { label: 'Arduino SDK', href: ARDUINO_SDK_GITHUB_URL, external: true },
  { label: 'Mobile app', href: MOBILE_APP_RELEASES_URL, external: true },
  { label: 'Docs', href: 'https://docs.autoconnecto.in', external: true },
  { label: 'Privacy', href: '/privacy', external: false },
  { label: 'Terms', href: '/terms', external: false },
  { label: 'AI guide', href: '/llms.txt', external: false },
];

const socialLinks = [
  { icon: 'GlobeAltIcon', href: `${siteUrl}/`, label: 'Marketing site' },
  { icon: 'EnvelopeIcon', href: 'mailto:support@autoconnecto.in', label: 'Email support' },
  { icon: 'EnvelopeIcon', href: 'mailto:founder@autoconnecto.in', label: 'Email founder' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Single row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <AppLogo size={28} />
            <span className="font-display font-semibold text-base text-foreground tracking-tight">
              Autoconnecto
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social + copyright */}
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
              >
                <Icon name={s.icon as 'GlobeAltIcon'} size={16} />
              </a>
            ))}
            <span className="text-sm text-muted-foreground">
              © 2026 Autoconnecto
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-xs text-muted-foreground/60">
          Enterprise IoT Platform. Cloud &amp; On-Premises deployments available.
        </p>
        <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-muted-foreground/60">
          <span className="flex items-center gap-1.5">
            <Icon name="PhoneIcon" size={12} />
            <a href="tel:+919212100555" className="hover:text-muted-foreground transition-colors">+91 92121 00555</a>
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <Icon name="MapPinIcon" size={12} />
            Villa-71, Galaxy Enclave, Mahindra SEZ Road, Kalwara, Jaipur – 302037
          </span>
        </div>
      </div>
    </footer>
  );
}