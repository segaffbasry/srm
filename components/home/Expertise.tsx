"use client";

import { useState } from "react";
import { HashButton, Icon } from "@/components/ui";
import { services, technical } from "@/lib/content";

/* The approved Coinford "Our Expertise" block: heading on the left, the homepage's Technical Excellence copy on the
   right, then a photograph that follows the row in focus beside ruled service rows. A Slate fill rises behind the
   hovered row (Coinford's 0.2s hover). No index numbers, per earlier client feedback. */
export function Expertise() {
  const [active, setActive] = useState(0);
  return (
    <section className="section expertise" id="expertise" aria-labelledby="expertise-title" tabIndex={-1}>
      <div className="wrap">
        <div className="head-row">
          <div>
            <p className="label" data-reveal="label">What we do</p>
            <h2 className="h2" id="expertise-title" data-reveal="head">{services.title}</h2>
          </div>
          <div className="head-row-copy">
            {technical.text.map((t) => <p key={t.slice(0, 20)} className="body" data-reveal="text">{t}</p>)}
            <a className="text-link" href={technical.cta.href} target="_blank" rel="noopener" data-reveal="label">{technical.title}</a>
          </div>
        </div>
        <div className="expertise-grid">
          <div className="expertise-media" data-reveal="image" aria-hidden="true">
            {services.items.map((s, i) => <img key={s.href} src={s.image} alt="" loading="lazy" className={i === active ? "is-active" : ""} />)}
          </div>
          <div>
            <ul className="expertise-list" data-reveal="cards">
              {services.items.map((s, i) => (
                <li key={s.href}>
                  <a className="expertise-row" href={s.href} target="_blank" rel="noopener" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                    <span className="expertise-name">{s.title}</span>
                    <span className="expertise-text">{s.text}</span>
                    <Icon name="arrow" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="expertise-foot" data-reveal="label"><HashButton href={services.cta.href} tone="on-light">{services.cta.label}</HashButton></div>
          </div>
        </div>
      </div>
    </section>
  );
}
