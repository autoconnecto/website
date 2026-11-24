'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { API_URL, FOUNDER_EMAIL, SUPPORT_EMAIL } from '@/config/links';

type Session = {
  accessToken: string;
  email: string;
  companyName: string;
  accountId: string;
};

type CataloguePlan = {
  planId: string;
  displayName: string;
  description?: string | null;
  priceMonthlyInr?: number | null;
  priceYearlyInr?: number | null;
  priceOnetimeInr?: number | null;
  dpsIncluded?: number | null;
  deviceLimit?: number | null;
  licenceNodes?: number | null;
  quoteOnly: boolean;
  selfServe: boolean;
  checkoutMonthly: boolean;
  checkoutYearly: boolean;
};

type LicenceRow = {
  licenceId: string;
  companyName: string;
  planCode: string;
  mode: string;
  dpsIncluded: number;
  deviceLimit: number;
  productionSlots: number;
  activeInstances: number;
  updatesUntil: string;
  status: string;
};

type InstanceRow = {
  instance_id: string;
  hostname: string | null;
  machine_id: string | null;
  status: string;
  last_seen_at: string;
  activated_at: string;
};

type InstallAssets = {
  channel?: string;
  packageVersion?: string;
  docsUrl: string;
  packageUrl: string | null;
  scriptUrl: string | null;
  installCommand: string;
  activateNote: string;
};

const TOKEN_KEY = 'autoconnecto_licence_portal_token';
const apiBase = (process.env.NEXT_PUBLIC_API_URL || API_URL).replace(/\/+$/, '');

function when(value?: string | null) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

function inr(n?: number | null) {
  if (n == null || !Number.isFinite(Number(n))) return null;
  return `₹${Number(n).toLocaleString('en-IN')}`;
}

export default function LicencesPortalPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [session, setSession] = useState<Session | null>(null);
  const [catalog, setCatalog] = useState<CataloguePlan[]>([]);
  const [install, setInstall] = useState<InstallAssets | null>(null);
  const [licences, setLicences] = useState<LicenceRow[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [instances, setInstances] = useState<InstanceRow[]>([]);
  const [secret, setSecret] = useState('');
  const [planId, setPlanId] = useState('startup_onprem');
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [quoteMessage, setQuoteMessage] = useState('');
  const [banner, setBanner] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const selected = useMemo(
    () => licences.find((l) => l.licenceId === selectedId) || null,
    [licences, selectedId]
  );
  const selectedPlan = useMemo(
    () => catalog.find((p) => p.planId === planId) || null,
    [catalog, planId]
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(TOKEN_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Session;
      if (parsed?.accessToken) setSession(parsed);
    } catch {
      /* ignore */
    }
    const params = new URLSearchParams(window.location.search);
    const qpPlan = params.get('planId');
    const qpPeriod = params.get('period');
    const checkout = params.get('checkout');
    if (qpPlan) setPlanId(qpPlan.toLowerCase());
    if (qpPeriod === 'yearly' || qpPeriod === 'monthly') setPeriod(qpPeriod);
    if (checkout === 'success') {
      setBanner(
        'Payment returned successfully. If the licence is not listed yet, wait a minute and refresh — Dodo confirms via webhook.'
      );
    } else if (checkout === 'cancelled') {
      setBanner('Checkout cancelled. Your account was not charged.');
    }
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        const [c, a] = await Promise.all([
          api<CataloguePlan[]>('/api/licence-portal/catalog'),
          api<InstallAssets>('/api/licence-portal/install-assets'),
        ]);
        setCatalog(c);
        setInstall(a);
        if (!qpHasPlan() && c[0]) setPlanId(c[0].planId);
      } catch (err: any) {
        setError(err?.message || 'Could not load catalogue');
      }
    })();
  }, []);

  useEffect(() => {
    if (!session?.accessToken) return;
    void loadLicences(session.accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.accessToken]);

  useEffect(() => {
    if (!session?.accessToken || !selectedId) return;
    void loadInstances(selectedId, session.accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, session?.accessToken]);

  function qpHasPlan() {
    if (typeof window === 'undefined') return false;
    return Boolean(new URLSearchParams(window.location.search).get('planId'));
  }

  async function api<T>(
    path: string,
    opts: { method?: string; body?: unknown; token?: string } = {}
  ): Promise<T> {
    const res = await fetch(`${apiBase}${path}`, {
      method: opts.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg =
        typeof data?.message === 'string'
          ? data.message
          : Array.isArray(data?.message)
            ? data.message.join(', ')
            : `Request failed (${res.status})`;
      throw new Error(msg);
    }
    return data as T;
  }

  async function loadLicences(token: string) {
    setBusy(true);
    setError('');
    try {
      const rows = await api<LicenceRow[]>('/api/licence-portal/licences', {
        token,
      });
      setLicences(rows);
      if (rows[0] && !selectedId) setSelectedId(rows[0].licenceId);
    } catch (err: any) {
      setError(err?.message || 'Could not load licences');
      if (/session|unauthorized|sign in/i.test(String(err?.message || ''))) {
        logout();
      }
    } finally {
      setBusy(false);
    }
  }

  async function loadInstances(licenceId: string, token: string) {
    setBusy(true);
    setError('');
    setSecret('');
    try {
      const rows = await api<InstanceRow[]>(
        `/api/licence-portal/licences/${licenceId}/instances`,
        { token }
      );
      setInstances(rows);
    } catch (err: any) {
      setError(err?.message || 'Could not load instances');
    } finally {
      setBusy(false);
    }
  }

  async function onAuth(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const data =
        authMode === 'register'
          ? await api<Session>('/api/licence-portal/register', {
              method: 'POST',
              body: { email, password, companyName },
            })
          : await api<Session>('/api/licence-portal/login', {
              method: 'POST',
              body: { email, password },
            });
      localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
      setSession(data);
    } catch (err: any) {
      setError(err?.message || 'Authentication failed');
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setSession(null);
    setLicences([]);
    setInstances([]);
    setSelectedId('');
    setSecret('');
  }

  async function buyOrQuote() {
    if (!session?.accessToken || !selectedPlan) return;
    setBusy(true);
    setError('');
    setBanner('');
    try {
      if (selectedPlan.selfServe) {
        const canPeriod =
          period === 'yearly'
            ? selectedPlan.checkoutYearly
            : selectedPlan.checkoutMonthly;
        if (!canPeriod) {
          throw new Error(
            period === 'yearly'
              ? 'Yearly checkout is not available for this plan yet. Try monthly or request a quote.'
              : 'Monthly checkout is not available for this plan yet.'
          );
        }
        const data = await api<{ checkoutUrl: string }>(
          '/api/licence-portal/checkout',
          {
            method: 'POST',
            token: session.accessToken,
            body: { planCode: selectedPlan.planId, billingPeriod: period },
          }
        );
        window.location.href = data.checkoutUrl;
        return;
      }
      const data = await api<{ message: string }>('/api/licence-portal/quote', {
        method: 'POST',
        token: session.accessToken,
        body: {
          planCode: selectedPlan.planId,
          billingPeriod: period,
          message: quoteMessage,
        },
      });
      setBanner(data.message || 'Quote request sent.');
      setQuoteMessage('');
    } catch (err: any) {
      setError(err?.message || 'Could not start purchase');
    } finally {
      setBusy(false);
    }
  }

  async function deactivate(instanceId: string) {
    if (!session?.accessToken || !selectedId) return;
    if (
      !window.confirm(
        'Deactivate this instance? The old server must stop. Then start the new server with the same licence key.'
      )
    ) {
      return;
    }
    setBusy(true);
    setError('');
    try {
      await api(
        `/api/licence-portal/licences/${selectedId}/instances/${encodeURIComponent(instanceId)}/deactivate`,
        { method: 'POST', token: session.accessToken }
      );
      await loadInstances(selectedId, session.accessToken);
      await loadLicences(session.accessToken);
    } catch (err: any) {
      setError(err?.message || 'Deactivate failed');
    } finally {
      setBusy(false);
    }
  }

  async function revoke() {
    if (!session?.accessToken || !selectedId || !selected) return;
    if (String(selected.status).toUpperCase() !== 'ACTIVE') return;
    if (
      !window.confirm(
        'Cancel this licence? Activate and Reveal will stop working. This cannot be undone from the portal.'
      )
    ) {
      return;
    }
    setBusy(true);
    setError('');
    setSecret('');
    try {
      await api(`/api/licence-portal/licences/${selectedId}/revoke`, {
        method: 'POST',
        token: session.accessToken,
      });
      setBanner('Licence cancelled.');
      await loadLicences(session.accessToken);
      await loadInstances(selectedId, session.accessToken);
    } catch (err: any) {
      setError(err?.message || 'Revoke failed');
    } finally {
      setBusy(false);
    }
  }

  async function reveal() {
    if (!session?.accessToken || !selectedId) return;
    setBusy(true);
    setError('');
    try {
      const data = await api<{ secret: string }>(
        `/api/licence-portal/licences/${selectedId}/reveal-secret`,
        { method: 'POST', token: session.accessToken }
      );
      setSecret(data.secret);
    } catch (err: any) {
      setError(err?.message || 'Could not reveal secret');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0B1120] text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-sm text-slate-400 mb-2">
          <Link href="/" className="hover:text-white">
            Autoconnecto
          </Link>{' '}
          · Licences
        </p>
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          On-prem licences
        </h1>
        <p className="text-slate-400 mb-8 max-w-2xl">
          Create an account, buy Startup / SME On-Prem (or request Business and
          above), download your key, install on your servers, and watch the seat
          go Active when Connected mode heartbeats. Need a{" "}
          <strong className="text-slate-200">hosted</strong> workspace instead
          (we run the cloud)?{" "}
          <a
            href="https://app.autoconnecto.in/signup"
            className="text-sky-400 hover:text-sky-300 underline"
          >
            Sign up for hosted plans
          </a>
          {" · "}
          <a
            href="https://www.autoconnecto.in/pricing"
            className="text-sky-400 hover:text-sky-300 underline"
          >
            Compare pricing
          </a>
          .
        </p>

        {banner ? (
          <p className="mb-4 rounded-lg border border-sky-700 bg-sky-950/40 px-3 py-2 text-sm text-sky-100">
            {banner}
          </p>
        ) : null}
        {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}

        {!session ? (
          <form
            onSubmit={onAuth}
            className="rounded-xl border border-slate-700 bg-slate-900/60 p-6 max-w-md space-y-4"
          >
            <p className="text-xs text-slate-400">
              Looking for hosted cloud plans?{" "}
              <a
                href="https://app.autoconnecto.in/signup"
                className="text-sky-400 hover:text-sky-300 underline"
              >
                Sign up on app.autoconnecto.in
              </a>
            </p>
            <div className="flex gap-3 text-sm">
              <button
                type="button"
                className={authMode === 'login' ? 'text-sky-400' : 'text-slate-500'}
                onClick={() => setAuthMode('login')}
              >
                Sign in
              </button>
              <button
                type="button"
                className={
                  authMode === 'register' ? 'text-sky-400' : 'text-slate-500'
                }
                onClick={() => setAuthMode('register')}
              >
                Create account
              </button>
            </div>
            {authMode === 'register' ? (
              <label className="block text-sm">
                Company
                <input
                  className="mt-1 w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </label>
            ) : null}
            <label className="block text-sm">
              Email
              <input
                className="mt-1 w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="block text-sm">
              Password
              <input
                className="mt-1 w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="rounded-md bg-sky-600 hover:bg-sky-500 px-4 py-2 text-sm font-medium disabled:opacity-60"
            >
              {busy
                ? 'Please wait…'
                : authMode === 'register'
                  ? 'Create account'
                  : 'Sign in'}
            </button>
            <p className="text-xs text-slate-500">
              Help:{' '}
              <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>{' '}
              ·{' '}
              <a className="underline" href={`mailto:${FOUNDER_EMAIL}`}>
                {FOUNDER_EMAIL}
              </a>
            </p>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-300">
                Signed in as <strong>{session.email}</strong>
                {session.companyName ? ` · ${session.companyName}` : ''}
              </p>
              <button
                type="button"
                onClick={logout}
                className="text-sm text-slate-400 hover:text-white underline"
              >
                Sign out
              </button>
            </div>

            <section className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 space-y-3">
              <h2 className="text-lg font-medium">Buy or request a licence</h2>
              <label className="block text-sm">
                Plan
                <select
                  className="mt-1 w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2"
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value)}
                >
                  {catalog.map((p) => (
                    <option key={p.planId} value={p.planId}>
                      {p.displayName || p.planId}
                      {p.selfServe ? ' (self-serve)' : ' (quote)'}
                    </option>
                  ))}
                </select>
              </label>
              {selectedPlan ? (
                <p className="text-xs text-slate-400">
                  {selectedPlan.dpsIncluded ?? '—'} DP/s ·{' '}
                  {selectedPlan.deviceLimit ?? '—'} devices
                  {selectedPlan.licenceNodes != null
                    ? ` · ${selectedPlan.licenceNodes} product node${
                        selectedPlan.licenceNodes === 1 ? '' : 's'
                      }`
                    : ''}
                  {selectedPlan.priceMonthlyInr != null
                    ? ` · ${inr(selectedPlan.priceMonthlyInr)}/mo`
                    : ''}
                  {selectedPlan.priceYearlyInr != null
                    ? ` · ${inr(selectedPlan.priceYearlyInr)}/yr`
                    : ''}
                  {selectedPlan.priceOnetimeInr != null
                    ? ` · ${inr(selectedPlan.priceOnetimeInr)} once`
                    : ''}
                </p>
              ) : null}
              <div className="flex gap-4 text-sm">
                <label>
                  <input
                    type="radio"
                    className="mr-2"
                    checked={period === 'monthly'}
                    onChange={() => setPeriod('monthly')}
                  />
                  Monthly
                </label>
                <label>
                  <input
                    type="radio"
                    className="mr-2"
                    checked={period === 'yearly'}
                    onChange={() => setPeriod('yearly')}
                  />
                  Yearly
                </label>
              </div>
              {selectedPlan && !selectedPlan.selfServe ? (
                <label className="block text-sm">
                  Message (optional)
                  <textarea
                    className="mt-1 w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2"
                    rows={3}
                    value={quoteMessage}
                    onChange={(e) => setQuoteMessage(e.target.value)}
                  />
                </label>
              ) : null}
              <button
                type="button"
                disabled={busy || !selectedPlan}
                onClick={() => void buyOrQuote()}
                className="rounded-md bg-sky-600 hover:bg-sky-500 px-4 py-2 text-sm font-medium disabled:opacity-60"
              >
                {busy
                  ? 'Working…'
                  : selectedPlan?.selfServe
                    ? 'Pay with Dodo'
                    : 'Request quote'}
              </button>
            </section>

            {install ? (
              <section className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 space-y-2 text-sm">
                <h2 className="text-lg font-medium">Install</h2>
                <p className="text-slate-400">{install.activateNote}</p>
                <p className="text-slate-300">
                  Channel: <strong>{install.channel || 'latest'}</strong>
                  {install.packageVersion
                    ? ` · current ${install.packageVersion}`
                    : ''}
                </p>
                <p>
                  Guide:{' '}
                  <a
                    className="text-sky-400 underline"
                    href={install.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {install.docsUrl}
                  </a>
                </p>
                {install.packageUrl ? (
                  <p>
                    Package (latest):{' '}
                    <a
                      className="text-sky-400 underline"
                      href={install.packageUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download
                    </a>
                  </p>
                ) : (
                  <p className="text-slate-500">
                    Latest package URL will appear here once Autoconnecto publishes
                    the on-prem release channel (same latest for every buyer).
                  </p>
                )}
                {install.scriptUrl ? (
                  <p>
                    Script:{' '}
                    <a
                      className="text-sky-400 underline"
                      href={install.scriptUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {install.scriptUrl}
                    </a>
                  </p>
                ) : null}
                <p>
                  Command: <code className="text-slate-200">{install.installCommand}</code>
                </p>
              </section>
            ) : null}

            <section className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <h2 className="text-lg font-medium mb-3">Your licences</h2>
              {licences.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No licences on this account yet.
                </p>
              ) : (
                <ul className="space-y-2">
                  {licences.map((lic) => (
                    <li key={lic.licenceId}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(lic.licenceId)}
                        className={`w-full text-left rounded-lg border px-3 py-2 text-sm ${
                          selectedId === lic.licenceId
                            ? 'border-sky-500 bg-sky-950/40'
                            : 'border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        <div className="font-medium">
                          {lic.planCode} · {lic.mode}
                          {String(lic.status).toUpperCase() !== 'ACTIVE'
                            ? ` · ${lic.status}`
                            : ''}
                        </div>
                        <div className="text-slate-400 font-mono text-xs break-all">
                          {lic.licenceId}
                        </div>
                        <div className="text-slate-400">
                          {lic.dpsIncluded} DP/s · {lic.deviceLimit} devices · seats{' '}
                          {lic.activeInstances}/{lic.productionSlots} · updates until{' '}
                          {when(lic.updatesUntil)}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {selected ? (
              <section className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-medium">
                    Delivery · {selected.planCode}
                    {String(selected.status).toUpperCase() !== 'ACTIVE'
                      ? ` · ${selected.status}`
                      : ''}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void reveal()}
                      disabled={
                        busy || String(selected.status).toUpperCase() !== 'ACTIVE'
                      }
                      className="rounded-md border border-slate-600 px-3 py-1.5 text-sm hover:border-sky-500 disabled:opacity-40"
                    >
                      Reveal licence key
                    </button>
                    {String(selected.status).toUpperCase() === 'ACTIVE' ? (
                      <button
                        type="button"
                        onClick={() => void revoke()}
                        disabled={busy}
                        className="rounded-md border border-red-800 px-3 py-1.5 text-sm text-red-300 hover:border-red-500"
                      >
                        Cancel licence
                      </button>
                    ) : null}
                  </div>
                </div>
                {secret ? (
                  <pre className="overflow-x-auto rounded-md bg-slate-950 p-3 text-xs text-emerald-300 whitespace-pre-wrap break-all">
                    {secret}
                  </pre>
                ) : null}
                <h3 className="font-medium text-sm">Active on site</h3>
                {instances.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    No instance activated yet. Install, set the key, start the
                    server — Connected mode registers here.
                  </p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {instances.map((inst) => (
                      <li
                        key={inst.instance_id}
                        className="flex flex-wrap items-center justify-between gap-2 rounded border border-slate-700 px-3 py-2"
                      >
                        <div>
                          <div className="font-medium">{inst.instance_id}</div>
                          <div className="text-slate-400">
                            {inst.status} · last seen {when(inst.last_seen_at)}
                            {inst.hostname ? ` · ${inst.hostname}` : ''}
                          </div>
                        </div>
                        {inst.status === 'ACTIVE' ? (
                          <button
                            type="button"
                            className="text-xs text-red-300 underline"
                            onClick={() => void deactivate(inst.instance_id)}
                          >
                            Deactivate
                          </button>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
