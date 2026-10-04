"use client";

import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/components/Motion";
import { HashButton, Icon, StepTitle } from "@/components/ui";
import { film } from "@/lib/content";

/* The live video block. srm.com embeds its brand film from YouTube behind a cookie wall; here a muted, text-free
   26s cut of the same film (scripts/media.sh) plays in a wide frame that clips open on arrival. It pauses off
   screen, has its own pause control, and stays on the poster with reduced motion. The full film is one click away. */
export function Film() {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = video.current; if (!v) return;
    v.muted = true;
    if (reducedMotion()) { userPaused.current = true; setPaused(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (userPaused.current) return;
      if (e.isIntersecting) v.play().catch(() => setPaused(true)); else v.pause();
    }, { threshold: 0.15 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = video.current; if (!v) return;
    if (v.paused) { userPaused.current = false; v.play(); setPaused(false); } else { userPaused.current = true; v.pause(); setPaused(true); }
  };

  return (
    <section className="film section" id="film" data-scene="ink" aria-labelledby="film-title" tabIndex={-1}>
      <div className="wrap film-head">
        <StepTitle id="film-title" lines={film.lines} />
        <div className="film-side">
          <p className="film-line" data-reveal="text">{film.line}</p>
          <div data-reveal="label"><HashButton href={film.cta.href}>{film.cta.label}</HashButton></div>
        </div>
      </div>
      <div className="wrap">
        <div className="film-frame" data-reveal="image">
          <video ref={video} src={film.src} poster={film.poster} muted loop playsInline preload="metadata" aria-label={`${film.title}: a short, silent cut of the Sir Robert McAlpine brand film`} />
          <button className="media-toggle film-toggle" onClick={toggle} aria-label={paused ? "Play the film" : "Pause the film"}>
            <Icon name={paused ? "play" : "pause"} /><span>{paused ? "Play" : "Pause"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
