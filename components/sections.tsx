import Link from "next/link";
import { ArrowRight, Check, MessageCircle, type LucideIcon } from "lucide-react";
import { features, plans, whatsappUrl } from "@/lib/site-config";

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: React.ReactNode }) {
  return <section className="page-hero"><div className="page-wrap"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p>{children}</div></section>;
}

export function FeatureGrid({ icons }: { icons: LucideIcon[] }) {
  return <div className="feature-grid">{features.map((feature, index) => { const Icon = icons[index]; return <article className="feature-card" key={feature.title}><span className="feature-icon"><Icon /></span><h3>{feature.title}</h3><p>{feature.description}</p></article>; })}</div>;
}

export function PricingGrid({ compact = false }: { compact?: boolean }) {
  return <div className={`pricing-grid ${compact ? "pricing-compact" : ""}`}>{plans.map((plan) => <article className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.name}>{plan.featured && <span className="plan-badge">Most popular</span>}<h3>{plan.name}</h3><p className="price-setup">{plan.setup}<small> setup</small></p><p className="price-monthly">+ {plan.monthly}</p><p>{plan.summary}</p><div className="best-for">{plan.bestFor}</div>{!compact && <ul>{plan.includes.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>}{plan.note && <p className="plan-note">{plan.note}</p>}<a className={plan.featured ? "button button-primary" : "button button-secondary"} href={whatsappUrl(`Hello Flata, I am interested in the ${plan.name} package.\n\nBusiness name:\nLocation:\nNumber of tills:\nPreferred visit date:`)} target="_blank" rel="noreferrer">Discuss this plan</a></article>)}</div>;
}

export function DemoBanner() {
  return <section className="demo-banner"><div className="page-wrap demo-inner"><div><p className="eyebrow light">Start with your actual business</p><h2>Let us see how you work before we recommend a system.</h2><p>A guided demo and site assessment help us scope devices, tills, staff, catalogue setup and training.</p></div><a className="button button-white" href={whatsappUrl()} target="_blank" rel="noreferrer">Book a demo on WhatsApp <MessageCircle size={18} /></a></div></section>;
}

export function NextStep({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="text-link" href={href}>{children} <ArrowRight size={16} /></Link>;
}
