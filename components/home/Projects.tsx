"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { EASE, EASE_IO, reducedMotion } from "@/components/Motion";
import { HashButton, Icon } from "@/components/ui";
import { projects } from "@/lib/content";

/* hashgraphvc.com's team chapter, used for the three featured projects: one large photograph, the project's name
   in the display face beside a pair of square up/down steppers, its summary and tags in a narrow column. Stepping
   wipes the next photograph in over the last (clip from the bottom, --ease-io) and swaps the copy with a short rise.
   The project names also sit in a tab list so each one is reachable directly, by keyboard included. */
export function Projects() {
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const items = projects.items;

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = root.current; if (!el) return;
    const img = el.querySelector(`.proj-img[data-i="${index}"]`);
    const copy = el.querySelectorAll(".proj-copy > *");
    if (reducedMotion()) return;
    gsap.fromTo(img, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: EASE_IO });
    gsap.fromTo(img?.querySelector("img") ?? [], { scale: 1.15 }, { scale: 1, duration: 1.4, ease: EASE });
    gsap.fromTo(copy, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: EASE, stagger: 0.05, delay: 0.15 });
  }, [index]);

  const go = (d: number) => setIndex((i) => (i + d + items.length) % items.length);
  const p = items[index];

  return (
    <section className="projects section" id="projects" data-scene="ink" aria-labelledby="projects-title" tabIndex={-1}>
      <div className="wrap">
        <div className="row-head">
          <h2 id="projects-title" className="h-display" data-reveal="head">{projects.title}</h2>
          <div data-reveal="label"><HashButton href={projects.cta.href}>{projects.cta.label}</HashButton></div>
        </div>
        <div className="proj" ref={root}>
          <div className="proj-stage" data-reveal="image">
            {items.map((it, i) => (
              <figure key={it.href} className={`proj-img${i === index ? " is-active" : ""}`} data-i={i} aria-hidden={i !== index}>
                <img src={it.image} alt={it.alt} loading={i ? "lazy" : undefined} />
              </figure>
            ))}
          </div>
          <div className="proj-panel">
            <div className="proj-tabs" role="tablist" aria-label="Featured projects" data-reveal="label">
              {items.map((it, i) => (
                <button key={it.href} role="tab" id={`proj-tab-${i}`} aria-selected={i === index} aria-controls="proj-copy" tabIndex={i === index ? 0 : -1}
                  onClick={() => setIndex(i)}
                  onKeyDown={(e) => {
                    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                    if (!d) return;
                    e.preventDefault();
                    const n = (i + d + items.length) % items.length;
                    setIndex(n);
                    requestAnimationFrame(() => document.getElementById(`proj-tab-${n}`)?.focus());
                  }}>
                  {it.title}
                </button>
              ))}
            </div>
            <div className="proj-copy" id="proj-copy" role="tabpanel" aria-labelledby={`proj-tab-${index}`} aria-live="polite">
              <h3 className="proj-name">{p.title}</h3>
              <p className="proj-text">{p.text}</p>
              <dl className="proj-tags">
                {p.tags?.map((t) => <div key={t.label}><dt>{t.label}</dt><dd>{t.value}</dd></div>)}
              </dl>
              <a className="card-more proj-more" href={p.href} target="_blank" rel="noopener">Read more<span className="sr-only"> about {p.title}</span><Icon name="arrow" /></a>
            </div>
            <div className="steppers" data-reveal="label">
              <button className="stepper" onClick={() => go(-1)} aria-label="Previous project"><Icon name="up" /></button>
              <button className="stepper" onClick={() => go(1)} aria-label="Next project"><Icon name="down" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
