"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { EASE, EASE_IO, onIntro, reducedMotion } from "@/components/Motion";
import { Icon } from "@/components/ui";
import { contact, nav, sections, socials } from "@/lib/content";
import { getLenis } from "@/lib/scroll";

/* Full-screen menu: an Ink panel wipes down from the top (Hashgraph's curtain), the live navigation rises in group by
   group, with the homepage sections, contact and socials alongside. GSAP timeline in, the same timeline reversed out.
   Focus is trapped inside, Esc closes, and focus returns to the toggle. */
function Menu({ open, close }: { open: boolean; close: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const t = gsap.timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    t.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: EASE_IO }, 0)
      // opacity, not autoAlpha: the links must be focusable the moment the menu opens.
      .fromTo(el.querySelectorAll("[data-menu-in]"), { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: EASE, stagger: 0.035 }, 0.4);
    tl.current = t;
    return () => { t.kill(); };
  }, []);

  useEffect(() => {
    const el = root.current, t = tl.current; if (!el || !t) return;
    const lenis = getLenis();
    if (open) {
      el.style.visibility = "visible";
      t.timeScale(reducedMotion() ? 100 : 1).play();
      lenis?.stop();
      const focusables = () => Array.from(el.querySelectorAll<HTMLElement>("a[href], button"));
      focusables()[0]?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") { close(); return; }
        if (e.key !== "Tab") return;
        const f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
    if (t.progress() > 0) { lenis?.start(); t.timeScale(reducedMotion() ? 100 : 1.4).reverse(); }
  }, [open, close]);

  // Section links close the menu first, then the page scrolls (the link guard in Motion does the scrolling).
  const onClick = (e: React.MouseEvent) => { if ((e.target as Element).closest('a[href^="#"]')) close(); };

  return (
    <div className="menu" id="site-menu" ref={root} role="dialog" aria-modal="true" aria-label="Menu" inert={!open} data-lenis-prevent onClick={onClick}>
      <div className="menu-inner wrap">
        <nav className="menu-main" aria-label="Sir Robert McAlpine">
          <ul>
            {nav.map((g) => (
              <li key={g.label} data-menu-in>
                <a className="menu-big" href={g.href} target="_blank" rel="noopener">{g.label}</a>
                {g.children.length > 0 && (
                  <ul className="menu-sub">{g.children.map((c) => <li key={c.label}><a href={c.href} target="_blank" rel="noopener">{c.label}</a></li>)}</ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-side">
          <div data-menu-in>
            <p className="label">On this page</p>
            <ul className="menu-list">{sections.map((s) => <li key={s.href}><a href={s.href}>{s.label}</a></li>)}</ul>
          </div>
          <div data-menu-in>
            <p className="label">{contact.title}</p>
            <ul className="menu-list">
              <li><a href={contact.phone.href}>{contact.phone.label}</a></li>
              <li><a href={contact.email.href}>{contact.email.label}</a></li>
              <li><a href={contact.offices.href} target="_blank" rel="noopener">{contact.offices.label}</a></li>
            </ul>
          </div>
          <ul className="socials" data-menu-in>
            {socials.map((s) => <li key={s.name}><a href={s.href} aria-label={s.name} target="_blank" rel="noopener"><Icon name={s.icon} /></a></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* No bar and no box: the red lock-up on the left, three live destinations and the menu toggle on the right. Its
   colour follows the scene behind it (--hfg from Backdrop). It slides away on the way down and returns on the way up,
   with irisventure.com's nav transition: translateY(-170%) over 0.3s on cubic-bezier(.33,0,.66,1). */
export function Header() {
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => { setOpen(false); toggle.current?.focus(); }, []);

  useEffect(() => {
    const el = bar.current; if (!el) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY, d = y - last;
      if (y < 120) { el.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(d) < 6) return;
      el.classList.toggle("is-hidden", d > 0);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const off = onIntro(() => el.classList.add("is-in"));
    return () => { window.removeEventListener("scroll", onScroll); off(); };
  }, []);

  useEffect(() => { if (open) bar.current?.classList.remove("is-hidden"); }, [open]);

  const quick = [nav[0], nav[2], nav[3]];
  return (
    <>
      <header className={`site-header${open ? " is-open" : ""}`} ref={bar}>
        <a href="#top" className="header-logo" aria-label="Sir Robert McAlpine, back to the top"><Logo title="" /></a>
        <nav className="header-nav" aria-label="Main">
          <ul>{quick.map((l) => <li key={l.label}><a href={l.href} target="_blank" rel="noopener">{l.label}</a></li>)}</ul>
        </nav>
        <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="site-menu" onClick={() => (open ? close() : setOpen(true))}>
          <span className="menu-toggle-label">{open ? "Close" : "Menu"}</span>
          <span className="menu-toggle-lines" aria-hidden="true"><i /><i /></span>
        </button>
      </header>
      <Menu open={open} close={close} />
    </>
  );
}
