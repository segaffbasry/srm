import { LOGO_H, LOGO_W, glyphs } from "@/lib/logo";

/* The Sir Robert McAlpine lock-up, rebuilt from its own traced shapes (scripts/logo.py): the red box and seventeen
   letters. Each letter sits in its own <g> so the preloader can move it without fighting the path coordinates. */
export function Logo({ title = "Sir Robert McAlpine", box = true, className }: { title?: string; box?: boolean; className?: string }) {
  return (
    <svg className={`logo ${className ?? ""}`} viewBox={`0 0 ${LOGO_W} ${LOGO_H}`} role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true} focusable="false">
      {box && <rect className="logo-box" data-part="box" width={LOGO_W} height={LOGO_H} />}
      <g className="logo-ink">
        {glyphs.map((g, i) => (
          <g key={i} data-part={g.word} data-glyph={g.char}><path d={g.d} /></g>
        ))}
      </g>
    </svg>
  );
}
