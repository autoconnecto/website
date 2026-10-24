import React from 'react';

const POSTS = [
  {
    title: 'ESP32 to a live dashboard',
    profile: 'https://www.linkedin.com/feed/update/urn:li:activity:7519607054324432896/',
    page: 'https://www.linkedin.com/feed/update/urn:li:share:7519607555581509632?actorCompanyId=145223603',
  },
  {
    title: 'Shared attributes after a power cut',
    profile: 'https://www.linkedin.com/feed/update/urn:li:activity:7519623374717812736/',
    page: 'https://www.linkedin.com/feed/update/urn:li:share:7519623601655037952?actorCompanyId=145223603',
  },
  {
    title: 'For system integrators and EPCs',
    profile: 'https://www.linkedin.com/feed/update/urn:li:activity:7519670283738341376/',
    page: 'https://www.linkedin.com/feed/update/urn:li:share:7519670711741857792/?actorCompanyId=145223603',
  },
];

export default function PostsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold text-foreground">From Autoconnecto</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Notes posted on the Autoconnecto IoT Platform page and on the founder profile.
      </p>
      <ul className="mt-6 space-y-4">
        {POSTS.map((post) => (
          <li key={post.page} className="rounded-xl border border-border bg-card/40 px-4 py-3">
            <p className="font-medium text-foreground">{post.title}</p>
            <p className="mt-1 text-sm">
              <a className="text-primary underline" href={post.page} target="_blank" rel="noreferrer">
                On the platform page
              </a>
              <span className="text-muted-foreground"> · </span>
              <a className="text-primary underline" href={post.profile} target="_blank" rel="noreferrer">
                On the founder profile
              </a>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
