"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { EASE, reducedMotion } from "@/components/Motion";
import { CardLink, HashButton, StepTitle } from "@/components/ui";
import { insights, sustainability as s } from "@/lib/content";

/* irisventure.com's pinned chapter: the scene holds still while the object in the middle settles and frosted glass
   cards arrive around it one after another, all scrubbed by the scroll. Here the object is the live Net Zero
   photograph; the two cards are the homepage's two sustainability blocks (Sustainable Engineering Excellence and
   Our journey to Net Zero 2045), merged into one chapter because they carry one message. The pin lasts 30% of a
   viewport, so it adds little length. Below 1024px, or with reduced motion, nothing pins: the cards simply sit
   under the photograph. The three Industry insights follow as batched cards. */
export function Sustainability() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current; if (!el || reducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const frame = el.querySelector(".sus-frame"), cards = el.querySelectorAll(".glass");
      gsap.set(cards, { autoAlpha: 0, y: 40, scale: 0.94 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=30%", pin: true, scrub: 0.6 } });
      tl.fromTo(frame, { scale: 0.9, clipPath: "inset(6% 6% 6% 6% round 12px)" }, { scale: 1, clipPath: "inset(0% 0% 0% 0% round 12px)", ease: "none", duration: 1 }, 0)
        .to(cards[0], { autoAlpha: 1, y: 0, scale: 1, ease: EASE, duration: 0.45 }, 0.25)
        .to(cards[1], { autoAlpha: 1, y: 0, scale: 1, ease: EASE, duration: 0.45 }, 0.55);
    });
    mm.add("(max-width: 1023px)", () => {
      el.querySelectorAll(".glass").forEach((card) => {
        gsap.fromTo(card, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 1, ease: EASE, scrollTrigger: { trigger: card, start: "top 90%", once: true } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="sus section" id="sustainability" data-scene="slate" aria-labelledby="sus-title" tabIndex={-1}>
      <div className="sus-stage" ref={stage}>
        <div className="wrap sus-inner">
          <StepTitle id="sus-title" lines={s.lines} className="sus-title" />
          <div className="sus-frame">
            <img src={s.image} alt="A Sir Robert McAlpine building with a wildflower green roof" data-parallax />
          </div>
          <article className="glass glass-a" aria-labelledby="see-title">
            <h3 id="see-title" className="glass-title">{s.heading}</h3>
            {s.text.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            <HashButton href={s.cta.href}>{s.cta.label}</HashButton>
          </article>
          <article className="glass glass-b" aria-labelledby="nz-title">
            <h3 id="nz-title" className="glass-title">{s.netZero.title}</h3>
            <p>{s.netZero.text}</p>
            <HashButton href={s.netZero.cta.href}>{s.netZero.cta.label}</HashButton>
          </article>
        </div>
      </div>

      <div className="wrap insights">
        <div className="row-head">
          <h3 className="h-section" data-reveal="head">{insights.title}</h3>
        </div>
        <ul className="cards cards-3" data-reveal="cards">
          {insights.items.map((c) => (
            <li key={c.href}>
              <CardLink card={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
