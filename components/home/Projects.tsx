import { HashButton } from "@/components/ui";
import { projects } from "@/lib/content";

/* The approved Coinford project strip: one wide frame and narrower ones with 10px gaps, captioned underneath. The
   hovered frame widens; on phones the strip becomes a sideways snap row. Here the three projects the live homepage
   features, each captioned with its summary and tags. */
export function Projects() {
  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title" tabIndex={-1}>
      <div className="wrap">
        <div className="head-row">
          <div>
            <p className="label" data-reveal="label">Projects</p>
            <h2 className="h2" id="projects-title" data-reveal="head">{projects.title}</h2>
          </div>
          <div className="head-row-side" data-reveal="label"><HashButton href={projects.cta.href} tone="on-light">{projects.cta.label}</HashButton></div>
        </div>
        <ul className="strip" data-reveal="cards">
          {projects.items.map((p) => (
            <li key={p.href}>
              <a className="strip-item" href={p.href} target="_blank" rel="noopener">
                <span className="strip-photo"><img src={p.image} alt={p.alt} loading="lazy" /></span>
                <span className="strip-title">{p.title}</span>
                <span className="strip-meta">{p.tags?.map((t) => t.value).join(", ")}</span>
                <span className="strip-text">{p.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
