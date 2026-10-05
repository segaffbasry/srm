"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { EASE, EASE_IO, onIntro, reducedMotion } from "@/components/Motion";
import { HashButton, Icon } from "@/components/ui";
import { film, hero, stats } from "@/lib/content";
import { splitWords } from "@/lib/split";

/* The approved Coinford opening, in SRM's colours: a Slate stage with the eyebrow and a three-line display statement
   on the left, copy and two buttons on the right, then the brand film in a wide frame whose lower part sits on the
   white page below (the page opens up without a colour jump), and the four figures underneath.
   The entrance waits for the preloader's handover (intro:done): lines rise, the copy words follow, the film clips
   open from the bottom, the figures fade up. */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const el = root.current; if (!el) return;
    if (reducedMotion()) return;
    const lines = el.querySelectorAll(".hero-line > span");
    const words = splitWords(el.querySelector<HTMLElement>(".hero-text")!);
    const rest = el.querySelectorAll("[data-hero-in]");
    const frame = el.querySelector(".hero-film");
    gsap.set(lines, { yPercent: 110 });
    gsap.set(words, { yPercent: 105 });
    gsap.set(rest, { autoAlpha: 0, y: 12 });
    gsap.set(frame, { clipPath: "inset(100% 0% 0% 0%)" });
    el.classList.add("is-armed");
    const off = onIntro(() => {
      gsap.timeline()
        .to(rest, { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.06 }, 0)
        .to(lines, { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.07 }, 0.05)
        .to(words, { yPercent: 0, duration: 0.9, ease: EASE, stagger: 0.008 }, 0.3)
        .to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: EASE_IO }, 0.35);
    });
    return off;
  }, []);

  // React drops the muted attribute, so it is set here. The film pauses off screen and stays still with reduced motion.
  useEffect(() => {
    const v = video.current; if (!v) return;
    v.muted = true;
    if (reducedMotion()) { userPaused.current = true; setPaused(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (userPaused.current) return;
      if (e.isIntersecting) v.play().catch(() => setPaused(true)); else v.pause();
    }, { threshold: 0.1 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = video.current; if (!v) return;
    if (v.paused) { userPaused.current = false; v.play(); setPaused(false); } else { userPaused.current = true; v.pause(); setPaused(true); }
  };

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero-stage" data-tone="dark">
        <div className="wrap">
          <div className="hero-top">
            <div>
              <p className="label hero-eyebrow" data-hero-in>{hero.eyebrow}</p>
              <h1 className="h-display hero-title" id="hero-title">
                {hero.lines.map((l, i) => <span className="hero-line" key={l}><span>{i ? " " : ""}{l}</span></span>)}
              </h1>
            </div>
            <div className="hero-side">
              <p className="hero-text">{hero.text}</p>
              <div className="hero-actions" data-hero-in>
                {hero.actions.map((a) => <HashButton key={a.label} href={a.href}>{a.label}</HashButton>)}
              </div>
            </div>
          </div>
          <div className="hero-film" id="film">
            <video ref={video} src={film.src} poster={film.poster} muted loop playsInline preload="auto" aria-label={`${film.title}: a short, silent cut of the Sir Robert McAlpine brand film`} />
            <div className="hero-film-bar">
              <button className="media-toggle" onClick={toggle} aria-label={paused ? "Play the film" : "Pause the film"}>
                <Icon name={paused ? "play" : "pause"} /><span>{paused ? "Play film" : "Pause film"}</span>
              </button>
              <a className="media-toggle" href={film.cta.href} target="_blank" rel="noopener">{film.cta.label}<Icon name="arrow" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap">
        <dl className="stats" data-reveal="cards">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <dt className="label">{s.label}</dt>
              <dd className="stat-value">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
