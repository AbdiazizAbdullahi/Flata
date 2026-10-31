"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { demoIndustries } from './Demos';

export const email = 'flatasoftware@gmail.com';
export const enquiry = 'mailto:' + email + '?subject=' + encodeURIComponent('A website for my business') + '&body=' + encodeURIComponent("Hello Flata's team,\n\nBusiness name:\nLocation:\nWhat we do:\nWhat visitors should be able to do:\nExisting website or social page:\nStyle, priorities and timing:\n");
export const siteOrigin = 'https://flata-business.flata.chatgpt.site';

const stages = [
  { title: 'Understand', line: 'Start with the right questions.', body: 'Your services, your customers and the action your website should make easier.', image: 'workshop-plate.webp' },
  { title: 'Design & build', line: 'Give the details a clear place.', body: 'Thoughtful pages, useful content and a visitor journey that works on phones and computers.', image: 'framework-hero.webp' },
  { title: 'Launch together', line: 'Make the next step feel simple.', body: 'Review the content and links together, then prepare a careful handover to your domain and hosting.', image: 'workshop-plate.webp' },
  { title: 'Keep it useful', line: 'Your website can keep up.', body: 'Refresh photos, update services and take care of small fixes as your business changes.', image: 'care-plate.webp' },
  { title: "Support what's next", line: 'Make room for useful new tools.', body: 'Discuss manageable web tasks and simple workflows. Larger software is scoped and priced separately.', image: 'framework-hero.webp' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="site-logo" href="/" aria-label="Flata Software home"><img src="/assets/flata-wordmark.svg" width="135" height="32" alt="Flata" /></a>
    <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="site-nav" aria-label="Main navigation" className={open ? 'site-nav is-open' : 'site-nav'}>
      <a href="/portfolio">The demos</a><a href="/pricing">Pricing & care</a><a href="/about">Our approach</a>
      <a className="nav-project" href="/contact"><span>Start a project</span><span aria-hidden="true">↗</span></a>
    </nav>
  </header>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-brand"><a href="/" aria-label="Flata Software home"><img src="/assets/flata-wordmark.svg" width="135" height="32" alt="Flata" /></a><p>Good websites. Ongoing partnership.</p></div>
    <div><p>Based in Kenya.<br />Working internationally.</p><a href={'mailto:' + email}>{email}</a></div>
    <nav aria-label="Footer navigation"><a href="/portfolio">Industry demos</a><a href="/support">Ongoing support</a><a href="/privacy">Privacy</a><a href="/terms">Service terms</a></nav>
    <p className="footer-note">© 2026 Flata Software. Industry concepts are fictional, independently created demonstrations.</p>
  </footer>;
}

export function Layout({ children }: { children: ReactNode }) {
  return <div className="flata-shell"><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /></div>;
}

function Hero() {
  const frame = useRef<HTMLDivElement>(null);
  const forced = useRef(false);
  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    const render = () => {
      raf = 0;
      const amount = media.matches || forced.current ? 1 : Math.min(1, Math.max(0, window.scrollY / 420));
      node.style.setProperty('--opening', String(amount));
    };
    const scroll = () => { if (!raf) raf = window.requestAnimationFrame(render); };
    render();
    window.addEventListener('scroll', scroll, { passive: true });
    media.addEventListener('change', render);
    return () => { window.removeEventListener('scroll', scroll); media.removeEventListener('change', render); window.cancelAnimationFrame(raf); };
  }, []);
  return <section className="hero" aria-labelledby="hero-heading">
    <div className="hero-copy"><h1 id="hero-heading">Make room for<br /><span>what’s next.</span></h1>
      <p>Thoughtful websites and ongoing care for independent businesses.</p>
      <div className="hero-actions"><a className="hero-ticket" href="/contact"><span>Start a project</span><span aria-hidden="true">↗</span></a><a className="hero-collection" href="/portfolio">Explore demos<span aria-hidden="true">→</span></a></div>
    </div>
    <div className="hero-frame" ref={frame}><img src="/assets/framework-hero.webp" width="1800" height="1013" fetchPriority="high" alt="A sculptural open framework with translucent pages and a green path, illustrating how a website takes shape." />
      <button className="scene-reveal" type="button" onClick={() => { forced.current = true; frame.current?.style.setProperty('--opening', '1'); }}>Open the frame<span aria-hidden="true">↗</span></button>
    </div>
  </section>;
}

export function Gallery({ full = false }: { full?: boolean }) {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? demoIndustries : demoIndustries.filter(i => i.slug === filter);
  return <section className={'collection section-wrap' + (full ? ' full-collection' : '')} aria-labelledby="collection-title">
    <div className="collection-heading"><h2 id="collection-title">Different businesses.<br />Distinct experiences.</h2><p>Five industry experiences, each with a different customer journey.</p></div>
    {full && <div className="gallery-filters" role="group" aria-label="Filter industry concepts"><button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All concepts</button>{demoIndustries.map(i => <button type="button" key={i.slug} aria-pressed={filter === i.slug} onClick={() => setFilter(i.slug)}>{i.sector}</button>)}</div>}
    <div className={'portfolio-grid' + (filter !== 'all' ? ' filtered' : '')}>
      {visible.map(i => <a className={'portfolio-item portfolio-' + i.slug} href={i.slug === 'catering' ? 'https://gather-and-grain.flata.chatgpt.site/' : i.slug === 'detailing' ? 'https://obsidian-auto-studio.flata.chatgpt.site/' : '/demos/' + i.slug} key={i.slug}>
        <div className="portfolio-photo"><img src={i.image} alt={i.sector + ' concept image, illustrative.'} width="1200" height="900" loading="lazy" /><span className="demo-arrow" aria-hidden="true">↗</span></div>
        <div className="portfolio-caption"><div><p>{i.sector}</p><h3>{i.brand}</h3></div><span>{['catering', 'detailing'].includes(i.slug) ? 'Visit website' : 'Explore demo'} <span aria-hidden="true">→</span></span></div><p className="portfolio-description">{i.description}</p>
      </a>)}
    </div>
    <p className="gallery-disclosure">These are independent design projects, not commissioned client work. Gather & Grain and Obsidian Auto Studio open as standalone websites. The other three sample planners run within this site.</p>
  </section>;
}

export function Workshop() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  return <section className="workshop section-wrap" aria-labelledby="workshop-title">
    <h2 id="workshop-title">A clear path from idea<br />to everyday use.</h2>
    <div className="workshop-layout"><div className="workshop-list" role="group" aria-label="Explore the website journey">
      {stages.map((s, i) => <button type="button" key={s.title} aria-pressed={active === i} className={active === i ? 'workshop-row selected' : 'workshop-row'} onClick={() => setActive(i)}><span className="stage-counter">{String(i + 1).padStart(2, '0')}</span><span>{s.title}</span><span aria-hidden="true">{active === i ? '−' : '+'}</span></button>)}
      <div className="workshop-navigation"><button type="button" aria-label="Previous website stage" onClick={() => setActive((active + 4) % 5)}>←</button><span>Step {active + 1} of 5</span><button type="button" aria-label="Next website stage" onClick={() => setActive((active + 1) % 5)}>→</button></div>
    </div><div className="workshop-detail" aria-live="polite" aria-atomic="true"><div className="workshop-image"><img src={'/assets/' + stage.image} alt="A considered arrangement of physical frames and page-like materials." width="1100" height="825" loading="lazy" /></div><div className="workshop-detail-title"><img src={"/assets/icon-" + ["browser", "arrow", "linked", "photo", "linked"][active] + ".png"} width="34" height="34" alt="" /><h3>{stage.line}</h3></div><p>{stage.body}</p><div className="stage-progress" role="img" aria-label={'Journey progress, step ' + (active + 1) + ' of 5'}><span style={{ transform: 'scaleX(' + ((active + 1) / 5) + ')' }} /></div></div></div>
  </section>;
}

export function Care() {
  return <section className="care section-wrap" aria-labelledby="care-title">
    <div className="care-copy"><h2 id="care-title">Good websites<br />keep moving.</h2><p>New photos, service updates and small fixes, with someone to help.</p>
      <div className="care-points">{[
        ['photo', 'Content', 'Keep photos and information current.'],
        ['wrench', 'Fixes', 'Take care of small website issues.'],
        ['sparkle', 'Improvements', 'Make useful, manageable changes.'],
      ].map(([icon, title, copy]) => <div key={icon}><img src={'/assets/icon-' + icon + '.png'} width="36" height="36" alt="" /><span><strong>{title}</strong><span>{copy}</span></span></div>)}</div>
      <a className="care-route" href="/support"><span>View support</span><span aria-hidden="true">↗</span></a>
    </div><div className="care-image"><img src="/assets/care-plate.webp" alt="A carefully aligned green paper and glass composition, illustrating ongoing care." width="1200" height="900" loading="lazy" /></div>
  </section>;
}

export function PricingLedger({ detailed = false }: { detailed?: boolean }) {
  return <section className="pricing section-wrap" aria-labelledby="pricing-title"><h2 id="pricing-title">Start well.<br />Stay supported.</h2><p className="pricing-intro">Clear starting points in USD. Agree the scope before work begins.</p>
    <div className="price-ledger">
      <article className="price-row"><h3>Website creation</h3><p className="price-value">$600<span>once</span></p><div><p>A considered business website, designed and built around an agreed scope.</p>{detailed && <ul><li>Business-focused design and content structure</li><li>Responsive pages and working visitor journeys</li><li>Review and launch preparation</li></ul>}</div></article>
      <article className="price-row"><h3>Website care</h3><p className="price-value">$100<span>per month</span></p><div><p>Maintenance, small content and photo changes, fixes and minor improvements.</p>{detailed && <ul><li>Keep existing website content current</li><li>Agree the scope of small changes</li><li>Review larger requests separately</li></ul>}</div></article>
      <article className="price-row technology-row"><h3>Technology partner</h3><p className="price-value">$300<span>per month total</span></p><div><p>Includes website care, plus manageable software tasks, small web work and simple workflow tools.</p>{detailed && <ul><li>The $100 website-care service is included</li><li>Task limits and timing are agreed in advance</li><li>Major software remains a separate project</li></ul>}</div></article>
    </div>
    <div className="price-notes"><p>Domain registration and hosting are supplied and paid for separately by you. Major software projects are separately scoped and priced, with an agreed discounted project fee for retainer clients.</p>{!detailed && <a className="price-swatch" href="/pricing"><span aria-hidden="true" />View pricing</a>}</div>
    {detailed && <p className="scope-note">No unlimited-work promise, fixed hour allowance or turnaround is implied. Your written agreement confirms deliverables, task limits, timing, payment and cancellation terms.</p>}
  </section>;
}

export function ContactBand() {
  return <section className="contact-band section-wrap" aria-labelledby="contact-band-title"><h2 id="contact-band-title">Your business.<br />A better place online.</h2><a className="contact-strip" href="/contact"><span>Start a project</span><span aria-hidden="true">↗</span></a><p>Tell us what you do, who you serve and what the website should help with.</p></section>;
}

export function Home() {
  return <Layout><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'Flata Software', url: siteOrigin, logo: siteOrigin + '/assets/flata-mark.svg', email, description: 'Website design, development and ongoing care for independent businesses.' }) }} /><Hero /><Gallery /><Workshop /><Care /><PricingLedger /><ContactBand /></Layout>;
}

function PageLead({ title, children }: { title: string; children: ReactNode }) {
  return <div className="page-lead section-wrap"><h1>{title}</h1>{children}</div>;
}

export const pageKeys = ['portfolio', 'pricing', 'about', 'contact', 'support', 'privacy', 'terms', 'flata-business', 'custom-software', 'case-study'] as const;
export type PageKey = typeof pageKeys[number];

export function InfoPage({ page }: { page: PageKey }) {
  if (page === 'portfolio') return <Layout><div className="portfolio-page-lead section-wrap"><p>Independent concepts. Real interactions.</p></div><Gallery full /><ContactBand /></Layout>;
  if (page === 'pricing') return <Layout><PageLead title="A good start. A lasting partnership."><p>Build your website around a clear scope, then choose the support that fits.</p></PageLead><PricingLedger detailed /><section className="faq section-wrap"><h2>Before we begin.</h2><details><summary>Does the $300 tier include care?</summary><p>Yes. It is $300 per month total, including the $100 website-care service.</p></details><details><summary>Are domain and hosting included?</summary><p>No. You supply and pay for domain registration, renewals and hosting separately. We agree the handover and launch requirements with you.</p></details><details><summary>What about a larger application?</summary><p>Major development, complex integrations, ecommerce and substantial redesigns require a separate scope and price. Retainer clients receive an agreed discounted project fee.</p></details></section><ContactBand /></Layout>;
  if (page === 'about') return <Layout><PageLead title="Useful websites. Human partnership."><p>Flata Software works with independent businesses from first idea through everyday website care.</p></PageLead><section className="about-statement section-wrap"><img src="/assets/workshop-plate.webp" width="1200" height="900" alt="Layered materials arranged with care, an illustrative studio composition." /><div><h2>Clear decisions.<br />Considered details.</h2><p>A website should explain what you do and make the next step easy. We shape the design around that purpose.</p><p>We are based in Kenya and work with businesses internationally. Our approach is collaborative, practical and grounded in an agreed scope.</p><a className="about-project" href="/contact">Start a project <span aria-hidden="true">↗</span></a></div></section><Workshop /><ContactBand /></Layout>;
  if (page === 'support') return <Layout><PageLead title="Care for the everyday changes."><p>Your services, photos and priorities can change. Your website can keep up.</p></PageLead><Care /><section className="support-lines section-wrap"><h2>Choose the right scope.</h2><article><h3>$100 website care</h3><p>Maintenance, small text and photo changes, fixes and minor improvements to the existing website.</p></article><article><h3>$300 technology partner</h3><p>Care is included, with manageable software tasks, small web projects and simple workflow tools agreed in advance.</p></article><article><h3>A separate project when needed</h3><p>Major applications, ecommerce, complex integrations and substantial redesigns need their own agreed scope and fee.</p></article></section><section className="faq section-wrap"><h2>A clear way to ask.</h2><details><summary>What should I send with a request?</summary><p>Describe the change, include the relevant page link, and share approved wording or images. We confirm the scope before work starts.</p></details><details><summary>Is every request included?</summary><p>No. Task limits and timing are agreed. Larger requests are discussed and priced separately rather than treated as unlimited work.</p></details></section><ContactBand /></Layout>;
  if (page === 'contact') return <Layout><PageLead title="Tell us what you’re building."><p>A short email is enough to begin. We’ll work through the details with you.</p></PageLead><section className="contact-page section-wrap"><div><a className="email-sheet" href={enquiry}><span>Start a project</span><strong>{email}</strong><span aria-hidden="true">↗</span></a><p>This opens your email app with a simple brief. Nothing is sent until you send the email.</p></div><div className="brief-checklist"><h2>A useful first note.</h2><ol><li>Your business name and location</li><li>Your services and customers</li><li>The action visitors should take</li><li>Your current website or social page</li><li>Style, priorities and timing</li></ol></div></section><section className="contact-facts section-wrap"><p>Based in Kenya. Working internationally.</p><p>USD 600 website creation. Ongoing care from USD 100 per month. Domain and hosting paid separately.</p></section></Layout>;
  if (page === 'privacy') return <Layout><PageLead title="Privacy, in plain language."><p>Information about this website and how to contact Flata.</p></PageLead><article className="prose section-wrap"><h2>Using the site</h2><p>Access is controlled by the hosting platform. Flata has not added advertising pixels or visitor analytics to this site.</p><h2>Industry concept tools</h2><p>Demo planner selections stay in the page’s temporary memory. They are not submitted as enquiries, bookings or orders, and are reset when the page is reloaded.</p><h2>If you email us</h2><p>Your email provider and ours handle the message. Share only the information needed to discuss your website. Please do not send customer records, passwords or sensitive files in an initial enquiry.</p><h2>Technical services</h2><p>The hosting provider may process request and technical diagnostic information to serve and operate the site. External links and your email app have their own privacy practices.</p><h2>Questions</h2><p>Email <a href={'mailto:' + email}>{email}</a> with a privacy question or a request relating to information you have shared with Flata.</p></article></Layout>;
  if (page === 'terms') return <Layout><PageLead title="A clear scope before we start."><p>These service notes explain the offer. Each project needs its own completed agreement.</p></PageLead><article className="prose section-wrap"><h2>Website creation</h2><p>USD 600 is the starting website-creation offer for an agreed business-website scope. Confirm deliverables, content, review, timing and launch requirements in writing before work begins.</p><h2>Ongoing support</h2><p>Website care is USD 100 per month. Broader technology support is USD 300 per month total and includes care. Task limits and timing are agreed; no unlimited capacity is implied.</p><h2>Separate costs and projects</h2><p>You supply and pay for domain registration and hosting separately. Major software and substantial changes require a separate scope and fee, with an agreed project discount for retainer clients.</p><h2>Project agreement</h2><p>The completed agreement confirms the actual parties, scope, fees, payment, revisions, ownership, support, timing and cancellation terms. A demo interaction or email enquiry does not confirm a booking, accepted agreement or payment.</p><h2>Industry concepts</h2><p>The five demo brands are fictional and independently created. Sample tools do not represent operating businesses, service availability, real orders or payments.</p><p>Discuss a project at <a href={'mailto:' + email}>{email}</a>.</p></article></Layout>;
  const compatibility: Record<string, [string, string]> = {
    'flata-business': ['A useful website for your business.', 'Explore business websites, ongoing care and five complete industry concepts.'],
    'custom-software': ['Useful tools, thoughtfully scoped.', 'Simple workflow tools and manageable web tasks can sit alongside website care. Larger software projects are scoped separately.'],
    'case-study': ['Explore the design possibilities.', 'Our portfolio presents five independent fictional concepts with real interactions. They are design demonstrations, not client case studies.'],
  };
  const [title, text] = compatibility[page];
  return <Layout><PageLead title={title}><p>{text}</p><a className="compatibility-link" href="/portfolio">Explore demos <span aria-hidden="true">↗</span></a></PageLead><ContactBand /></Layout>;
}

const titles: Record<PageKey, [string, string]> = {
  portfolio: ['Industry demos', 'Explore five fictional business websites with complete service pages and interactive sample planners.'],
  pricing: ['Pricing & website care', 'USD600 website creation, USD100 monthly care, or USD300 total technology support including care.'],
  about: ['Our approach', 'Flata builds useful websites for independent businesses and supports them after launch. Based in Kenya, working internationally.'],
  contact: ['Start a project', 'Tell Flata about your business, customers and website priorities by email.'],
  support: ['Ongoing support', 'Website maintenance, small content changes, fixes and scoped technology support for independent businesses.'],
  privacy: ['Privacy', 'How this website, its fictional demo tools and email enquiries handle information.'],
  terms: ['Service terms', 'Plain service notes about Flata website creation and ongoing support. Every project requires its own completed agreement.'],
  'flata-business': ['Business websites', 'Website design, creation and care for independent businesses.'],
  'custom-software': ['Scoped technology work', 'Manageable web tasks and workflow tools, with major software projects scoped separately.'],
  'case-study': ['Design concepts', 'Independent fictional website concepts with practical visitor journeys.'],
};

export function infoHead(page: PageKey) {
  const [title, description] = titles[page];
  const unique = ['portfolio', 'pricing', 'about', 'contact', 'support'].includes(page);
  const image = siteOrigin + '/assets/' + (unique ? 'og-' + page + '.png' : 'flata-og-wide.png');
  return { meta: [{ title: title + ' | Flata Software' }, { name: 'description', content: description }, { property: 'og:title', content: title + ' | Flata Software' }, { property: 'og:description', content: description }, { property: 'og:url', content: siteOrigin + '/' + page }, { property: 'og:image', content: image }, { name: 'twitter:image', content: image }], links: [{ rel: 'canonical', href: siteOrigin + '/' + page }] };
}
