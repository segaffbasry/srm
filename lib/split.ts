/* Splits a block of text into masked words: <span class="w"><span class="wi">word</span></span>. The outer span
   clips, the inner one rises. Inline elements (an <a>, an <em>) are walked into, so their styling is kept.
   Calling it twice is safe; the second call returns the existing inner spans. */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split) return Array.from(el.querySelectorAll<HTMLElement>(".wi"));
  el.dataset.split = "1";
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (child.textContent ?? "").split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const outer = document.createElement("span"); outer.className = "w";
          const inner = document.createElement("span"); inner.className = "wi"; inner.textContent = part;
          outer.appendChild(inner); frag.appendChild(outer);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== "BR") walk(child);
    });
  };
  walk(el);
  return Array.from(el.querySelectorAll<HTMLElement>(".wi"));
}

/* Hashgraph's decode effect for short uppercase labels: characters cycle through glyphs and settle left to right.
   Used only in the hero (the brief keeps per-character effects to the preloader and hero). */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export function decode(el: HTMLElement, duration = 0.9) {
  const final = el.dataset.text ?? el.textContent ?? "";
  el.dataset.text = final;
  const start = performance.now();
  let raf = 0;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / (duration * 1000));
    const settled = Math.floor(p * final.length);
    el.textContent = final.split("").map((c, i) => (i < settled || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join("");
    if (p < 1) raf = requestAnimationFrame(tick); else el.textContent = final;
  };
  raf = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(raf); el.textContent = final; };
}
