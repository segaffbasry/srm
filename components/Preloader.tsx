"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";
import { EASE, EASE_IO, INTRO_DONE, reducedMotion } from "@/components/Motion";
import { getLenis } from "@/lib/scroll";

/* The company signing its name. The logo is a red box with two lines of wordmark, so it is built the way a sign goes
   up: the box wipes open left to right, "Sir Robert" rises letter by letter out of the box's edge, then McALPINE
   follows a beat later. After a short hold the whole lock-up glides into the header logo position while the Ink
   curtain (the hero's opening colour) fades to reveal the film. One timeline, about 1.8s:
     0.10 to 0.55  box wipes open
     0.35 to 0.95  "Sir Robert" letters rise
     0.50 to 1.10  McALPINE letters rise
     1.10 to 1.30  hold
     1.30 to 1.80  exit: logo to header, curtain fades; handover fires at 1.30 so the hero entrance overlaps
   Once per tab session (sessionStorage "srm-intro"); skipped with reduced motion; hidden without JavaScript. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    let handed = false;
    const handover = () => {
      if (handed) return; handed = true;
      html.classList.remove("is-loading");
      html.dataset.intro = "done";
      try { sessionStorage.setItem("srm-intro", "1"); } catch {}
      getLenis()?.start();
      window.dispatchEvent(new Event(INTRO_DONE));
    };
    if (!el || !html.classList.contains("is-loading") || reducedMotion()) {
      if (el) el.style.display = "none";
      html.classList.add("logo-landed");
      handover();
      return;
    }
    window.scrollTo(0, 0);
    const mark = el.querySelector<HTMLElement>(".preloader-mark")!;
    const q = (s: string) => el.querySelectorAll(`[data-part="${s}"]`);
    // Where the header logo sits, so the lock-up can land exactly on it.
    const target = document.querySelector<HTMLElement>(".header-logo .logo");
    const flight = () => {
      if (!target) return { x: 0, y: -40, scale: 0.4 };
      const a = mark.getBoundingClientRect(), b = target.getBoundingClientRect();
      return { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), scale: b.width / a.width };
    };

    const tl = gsap.timeline({ onComplete: () => { el.classList.remove("is-active"); el.style.display = "none"; html.classList.add("logo-landed"); } });
    // The preloader stays up through the exit (after is-loading is gone) while it carries .is-active.
    tl.add(() => el.classList.add("is-active"), 0)
      .fromTo(q("box"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, transformOrigin: "0% 50%", duration: 0.45, ease: EASE_IO }, 0.1)
      .fromTo([...q("sir"), ...q("robert")], { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: EASE, stagger: 0.03 }, 0.35)
      .fromTo(q("mcalpine"), { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: EASE, stagger: 0.035 }, 0.5)
      .add(handover, 1.3)
      // Measured when the exit starts (tweens initialise lazily), so late layout shifts are accounted for.
      .to(mark, { x: () => flight().x, y: () => flight().y, scale: () => flight().scale, duration: 0.5, ease: EASE_IO }, 1.3)
      .to(el.querySelector(".preloader-curtain"), { autoAlpha: 0, duration: 0.45, ease: "none" }, 1.32);

    // Never hold the page for long: if the tab was hidden or throttled, finish anyway.
    const failsafe = window.setTimeout(() => { tl.progress(1); }, 2600);
    return () => { window.clearTimeout(failsafe); tl.kill(); };
  }, []);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader-curtain" />
      <div className="preloader-mark"><Logo title="" /></div>
    </div>
  );
}
