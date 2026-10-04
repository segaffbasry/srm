"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { EASE, EASE_IO, onIntro, reducedMotion } from "@/components/Motion";
import { HashButton, Icon } from "@/components/ui";
import { hero } from "@/lib/content";
import { decode, splitWords } from "@/lib/split";

/* Opening scene: the live header film (Port Talbot piling, drone) full-bleed under an Ink scrim, with its news story
   set the Hashgraph way: a small decoded label, a two-line wide uppercase headline whose second line steps in, and
   a narrow body column beside it. The entrance waits for the preloader's handover (intro:done): the film opens from a
   horizontal slit, the headline words rise, the label decodes, the copy and button follow. */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);

  // React drops the muted attribute, so it is set here before playing.
  useEffect(() => {
    const v = video.current; if (!v) return;
    v.muted = true;
    if (reducedMotion()) { v.pause(); setPaused(true); userPaused.current = true; return; }
    const io = new IntersectionObserver(([e]) => {
      if (userPaused.current) return;
      if (e.isIntersecting) v.play().catch(() => setPaused(true)); else v.pause();
    }, { threshold: 0.05 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current; if (!el) return;
    if (reducedMotion()) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".hero-line")).flatMap((l) => splitWords(l));
    const label = el.querySelector<HTMLElement>(".hero-label-text");
    const media = el.querySelector(".hero-media");
    const rest = el.querySelectorAll("[data-hero-in]");
    gsap.set(words, { yPercent: 110 });
    gsap.set(rest, { autoAlpha: 0, y: 16 });
    gsap.set(media, { clipPath: "inset(46% 0% 46% 0%)" });
    el.classList.add("is-armed");
    let stop = () => {};
    const off = onIntro(() => {
      gsap.timeline()
        .to(media, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: EASE_IO }, 0)
        .to(words, { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.05 }, 0.25)
        .add(() => { if (label) stop = decode(label, 0.8); }, 0.3)
        .to(rest, { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.08 }, 0.6);
    });
    return () => { off(); stop(); };
  }, []);

  const toggle = () => {
    const v = video.current; if (!v) return;
    if (v.paused) { userPaused.current = false; v.play(); setPaused(false); } else { userPaused.current = true; v.pause(); setPaused(true); }
  };

  return (
    <section className="hero" ref={root} data-scene="ink" aria-labelledby="hero-title">
      <div className="hero-media">
        <video ref={video} className="hero-video" src={hero.film} poster={hero.poster} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="hero-scrim" />
      </div>
      <div className="hero-copy wrap">
        <p className="label hero-label" aria-label={hero.label}><span className="hero-label-text" aria-hidden="true">{hero.label.toUpperCase()}</span></p>
        <h1 id="hero-title" className="h-display hero-title">
          {hero.lines.map((l, i) => <span key={l} className={`hero-line${i ? " hero-line-step" : ""}`}>{i ? " " : ""}{l}</span>)}
        </h1>
        <div className="hero-side">
          <p className="hero-text" data-hero-in>{hero.text}</p>
          <div data-hero-in><HashButton href={hero.cta.href}>{hero.cta.label}</HashButton></div>
        </div>
      </div>
      <button className="media-toggle hero-toggle" onClick={toggle} aria-label={paused ? "Play the background film" : "Pause the background film"} data-hero-in>
        <Icon name={paused ? "play" : "pause"} /><span>{paused ? "Play" : "Pause"}</span>
      </button>
    </section>
  );
}
