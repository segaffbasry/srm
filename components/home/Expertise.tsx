import { CardLink, HashButton, StepTitle } from "@/components/ui";
import { services, technical } from "@/lib/content";

/* What we do, on Mist: the homepage's Technical Excellence block (copy beside the live photograph) leads into the
   three Expert Services cards. Both blocks answer the same question, so they share one chapter. */
export function Expertise() {
  return (
    <section className="expertise section" id="expertise" data-scene="mist" aria-labelledby="tech-title" tabIndex={-1}>
      <div className="wrap tech">
        <figure className="tech-media" data-reveal="image"><img src={technical.image} alt={technical.alt} loading="lazy" data-parallax /></figure>
        <div className="tech-copy">
          <StepTitle id="tech-title" lines={technical.lines} />
          {technical.text.map((t) => <p key={t.slice(0, 20)} className="lead" data-reveal="text">{t}</p>)}
          <div data-reveal="label"><HashButton href={technical.cta.href} tone="on-light">{technical.cta.label}</HashButton></div>
        </div>
      </div>
      <div className="wrap">
        <div className="row-head">
          <h3 className="h-section" data-reveal="head">{services.title}</h3>
          <div data-reveal="label"><HashButton href={services.cta.href} tone="on-light">{services.cta.label}</HashButton></div>
        </div>
        <ul className="cards cards-3" data-reveal="cards">
          {services.items.map((c) => (
            <li key={c.href}>
              <CardLink card={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
