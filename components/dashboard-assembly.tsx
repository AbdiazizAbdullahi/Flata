import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whatsappUrl } from "@/lib/site-config";

export function DashboardAssembly() {
  return (
    <section className="assembly-section" data-dashboard-assembly aria-label="Flata dashboard assembly">
      <div className="assembly-stage">
        <div className="assembly-heading">
          <p className="eyebrow">Built for Kenyan businesses</p>
          <h1>Your business.<br /><span>Connected. Controlled.</span></h1>
          <p className="assembly-intro">Sales, stock, staff shifts and Cash &amp; M-Pesa records.<br className="desktop-break" /> One practical system.</p>
          <div className="assembly-actions">
            <a className="button electric-primary" href={whatsappUrl()} target="_blank" rel="noreferrer">Book a demo <ArrowRight size={16} /></a>
            <Link className="button electric-secondary" href="/flata-business">Explore Flata Business</Link>
          </div>
        </div>
        <figure className="assembly-media">
          <div className="assembly-image-wrap">
            <img className="assembly-poster" src="/animation/dashboard/poster.webp" width="1280" height="720" alt="Illustrative Flata dashboard showing weekly sales, stock value, and recorded Cash and M-Pesa balances" fetchPriority="high" />
            <canvas className="assembly-canvas" width="1280" height="720" aria-hidden="true" />
          </div>
          <figcaption>Illustrative product view · Sample data</figcaption>
        </figure>
        <div className="assembly-scroll-cue" aria-hidden="true"><ArrowDown size={14} /><span data-assembly-label>Scroll to bring it together</span></div>
        <div className="assembly-progress" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
