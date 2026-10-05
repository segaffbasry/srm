"use client";

import { useState } from "react";
import { CardLink, HashButton } from "@/components/ui";
import { insights, news } from "@/lib/content";

/* "What's on", the live menu's name for news and events, on a Mist band (Coinford's stone testimonial band). Two tabs
   hold the homepage's six latest stories and its three industry insights, so both lists stay complete without
   stacking two long sections. */
const tabs = [
  { id: "news", label: news.title, items: news.items, cta: news.cta },
  { id: "insights", label: insights.title, items: insights.items, cta: { label: "View all events", href: "https://www.srm.com/events/" } },
];

export function WhatsOn() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  const select = (i: number) => {
    setActive(i);
    requestAnimationFrame(() => document.getElementById(`whatson-tab-${tabs[i].id}`)?.focus());
  };
  return (
    <section className="section band whatson" id="news" data-late aria-labelledby="whatson-title" tabIndex={-1}>
      <div className="wrap">
        <div className="head-row">
          <div>
            <p className="label" data-reveal="label">What&apos;s on</p>
            <h2 className="h2" id="whatson-title" data-reveal="head">{tab.label}</h2>
          </div>
          <div className="head-row-side" data-reveal="label">
            <div className="tabs" role="tablist" aria-label="What's on">
              {tabs.map((t, i) => (
                <button key={t.id} id={`whatson-tab-${t.id}`} role="tab" aria-selected={i === active} aria-controls="whatson-panel" tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); select((i + 1) % tabs.length); } }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* The reveal sits on the panel, not the list: switching tabs mounts a new list after the reveals have run. */}
        <div id="whatson-panel" role="tabpanel" aria-labelledby={`whatson-tab-${tab.id}`} data-reveal="label">
          <ul className={`cards ${tab.items.length > 3 ? "cards-news" : "cards-3"}`} key={tab.id}>
            {tab.items.map((c) => <li key={c.href}><CardLink card={c} /></li>)}
          </ul>
          <div className="whatson-foot"><HashButton href={tab.cta.href} tone="on-light">{tab.cta.label}</HashButton></div>
        </div>
      </div>
    </section>
  );
}
