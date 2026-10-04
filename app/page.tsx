import { Backdrop } from "@/components/Backdrop";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { Motion } from "@/components/Motion";
import { Preloader } from "@/components/Preloader";
import { Expertise } from "@/components/home/Expertise";
import { Film } from "@/components/home/Film";
import { Hero } from "@/components/home/Hero";
import { Projects } from "@/components/home/Projects";
import { Sustainability } from "@/components/home/Sustainability";
import { CardLink, HashButton, HashButtonDefs, Icon } from "@/components/ui";
import { contact, footer, heritage, modernSlavery, news, socials } from "@/lib/content";

/* srm.com's homepage in a new skin. Look after hashgraphvc.com (dark cinematic scenes, wide uppercase two-line titles
   with a stepped second line, narrow copy columns, square steppers, its button); motion after irisventure.com (one
   field that recolours between chapters, a pinned chapter with glass cards, a hiding nav, a scroll gauge). Every
   item on the live homepage is here, in its live order, with chapters merged where they repeat a message.
   Copy: lib/content.ts. Systems: README.md. */
export default function Home() {
  return (
    <>
      <Motion />
      <Backdrop />
      <HashButtonDefs />
      <Preloader />
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Film />
        <Sustainability />
        <Projects />
        <Expertise />

        {/* Our Heritage: the archive photograph beside the 150 years that the live block names. */}
        <section className="heritage section" id="heritage" data-scene="slate" aria-labelledby="heritage-title" tabIndex={-1}>
          <div className="wrap heritage-grid">
            <figure className="heritage-media" data-reveal="image"><img src={heritage.image} alt={heritage.alt} loading="lazy" data-parallax /></figure>
            <div className="heritage-copy">
              <h2 id="heritage-title" className="label" data-reveal="label">{heritage.title}</h2>
              <p className="heritage-stat" data-reveal="head" aria-label={`${heritage.stat.value}${heritage.stat.suffix}`}>
                <span data-count={heritage.stat.value} aria-hidden="true">{heritage.stat.value}</span><span aria-hidden="true">{heritage.stat.suffix}</span>
              </p>
              <p className="lead" data-reveal="text">{heritage.text}</p>
              <div data-reveal="label"><HashButton href={heritage.cta.href}>{heritage.cta.label}</HashButton></div>
            </div>
          </div>
        </section>

        {/* Latest news: all six live stories, newest first, as compact cards on white. */}
        <section className="news section" id="news" data-scene="white" data-late aria-labelledby="news-title" tabIndex={-1}>
          <div className="wrap">
            <div className="row-head">
              <h2 id="news-title" className="h-display" data-reveal="head">{news.title}</h2>
              <div data-reveal="label"><HashButton href={news.cta.href} tone="on-light">{news.cta.label}</HashButton></div>
            </div>
            <ul className="cards cards-news" data-reveal="cards">
              {news.items.map((c) => <li key={c.href}><CardLink card={c} /></li>)}
            </ul>
          </div>
        </section>

        {/* Modern Slavery, the live homepage's compliance block, as a short band in the brand red. */}
        <section className="slavery" data-late aria-labelledby="slavery-title">
          <div className="wrap slavery-grid">
            <h2 id="slavery-title" className="h-display" data-reveal="head">{modernSlavery.title}</h2>
            <p className="lead" data-reveal="text">{modernSlavery.text}</p>
            <div data-reveal="label"><HashButton href={modernSlavery.cta.href}>{modernSlavery.cta.label}</HashButton></div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact" data-scene="ink" data-late tabIndex={-1}>
        <div className="wrap">
          <div className="footer-top">
            <a href="#top" className="footer-logo" aria-label="Sir Robert McAlpine, back to the top"><Logo title="" /></a>
            <ul className="socials">
              {socials.map((s) => <li key={s.name}><a href={s.href} aria-label={s.name} target="_blank" rel="noopener"><Icon name={s.icon} /></a></li>)}
            </ul>
          </div>
          <div className="footer-grid">
            <div>
              <h2 className="label">{contact.title}</h2>
              <ul className="footer-list">
                <li><a href={contact.phone.href}><Icon name="phone" />{contact.phone.label}</a></li>
                <li><a href={contact.email.href}><Icon name="mail" />{contact.email.label}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="label">{contact.office.title}</h3>
              <address className="footer-address">{contact.office.lines.map((l) => <span key={l}>{l}</span>)}</address>
              <a className="footer-more" href={contact.offices.href} target="_blank" rel="noopener">{contact.offices.label}</a>
            </div>
            {footer.groups.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <h2 className="label">{g.title}</h2>
                <ul className="footer-list">{g.links.map((l) => <li key={l.label}><a href={l.href} target="_blank" rel="noopener">{l.label}</a></li>)}</ul>
              </nav>
            ))}
          </div>
          <div className="footer-bar">
            <p>{footer.copyright}</p>
            <ul>{footer.legal.map((l) => <li key={l.label}><a href={l.href} target="_blank" rel="noopener">{l.label}</a></li>)}</ul>
          </div>
        </div>
      </footer>
    </>
  );
}
