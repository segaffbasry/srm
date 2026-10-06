import type { ReactNode } from "react";
import { brandIcons } from "@/lib/brand-icons";
import type { Card } from "@/lib/content";

const glyphs = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />,
  northeast: <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />,
  up: <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />,
  down: <path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />,
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" />,
  pause: <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />,
  phone: <path d="M6.6 3.5h3l1.5 4-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 4.5 5.6a2 2 0 0 1 2.1-2.1z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  mail: <g fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3.5" y="5.5" width="17" height="13" /><path d="M3.5 6.5l8.5 6.5 8.5-6.5" /></g>,
};

export type IconName = keyof typeof glyphs | keyof typeof brandIcons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const brand = (brandIcons as Record<string, string>)[name];
  return (
    <svg className={`icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {brand ? <path d={brand} fill="currentColor" /> : glyphs[name as keyof typeof glyphs]}
    </svg>
  );
}

/* The copied interaction: hashgraphvc.com's .btn, rebuilt with its own structure and timings.
   - a 1px outline drawn as an SVG rect with a two-stop gradient stroke; it draws itself in when the button
     scrolls into view (.is-drawn, stroke-dashoffset over 1.2s on --ease-io)
   - an idle shimmer: a blurred light bar rotated 19.92deg sweeps across every 5s (keyframes btn-shimmer)
   - on hover the base label leaves upwards (translateY(-100%), 0.6s --ease-io, opacity 0.5s linear 0.1s), the hover
     label rises in from below (translateY(100%) to 0, 0.8s --ease-io, opacity 0.6s linear), a 2px border blurred by
     0.4rem fades in as a glow (0.6s --ease-out) and the shimmer fades out
   Palette swap: Hashgraph's #9BB8E1 to #2C4E73 gradient becomes Mist to Slate on dark scenes (tone "on-dark"), Red to Slate on light ones ("on-light"). */
export function HashButton({ href, children, tone = "on-dark", className, external = true }: {
  href: string; children: ReactNode; tone?: "on-dark" | "on-light"; className?: string; external?: boolean;
}) {
  return (
    <a href={href} className={`hbtn hbtn-${tone} ${className ?? ""}`} {...(external && !href.startsWith("#") ? { target: "_blank", rel: "noopener" } : {})}>
      <span className="hbtn-shimmer" aria-hidden="true"><span className="hbtn-shimmer-inner" /></span>
      <svg className="hbtn-svg" aria-hidden="true" focusable="false">
        <rect className="hbtn-rect" x="0.5" y="0.5" rx="5" ry="5" pathLength={1} />
      </svg>
      <span className="hbtn-wrap">
        <span className="hbtn-label hbtn-base">{children}</span>
        <span className="hbtn-label hbtn-hover" aria-hidden="true">{children}</span>
      </span>
    </a>
  );
}

// A shared gradient for every button outline (Hashgraph defines one #btnBorderGrad for the page).
export function HashButtonDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hbtn-grad-on-dark" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#F0F6F9" /><stop offset="100%" stopColor="#3A4953" /></linearGradient>
        <linearGradient id="hbtn-grad-on-light" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#E4032C" /><stop offset="100%" stopColor="#3A4953" /></linearGradient>
      </defs>
    </svg>
  );
}

/* The one card used for insights, services and news: photograph, optional date, title, two lines of summary and
   a "Read more" that names the item for screen readers. The image zooms slightly on hover (--ease-out). */
export function CardLink({ card, lazy = true }: { card: Card; lazy?: boolean }) {
  return (
    <a className="card" href={card.href} target="_blank" rel="noopener">
      <span className="card-media"><img src={card.image} alt={card.alt} loading={lazy ? "lazy" : undefined} /></span>
      {card.date && <span className="card-date">{card.date}</span>}
      <span className="card-title">{card.title}</span>
      <span className="card-text">{card.text}</span>
      <span className="card-more">Read more<span className="sr-only"> about {card.title}</span></span>
    </a>
  );
}
