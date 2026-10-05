import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { Motion } from "@/components/Motion";
import { Preloader } from "@/components/Preloader";
import { Expertise } from "@/components/home/Expertise";
import { Heritage } from "@/components/home/Heritage";
import { Hero } from "@/components/home/Hero";
import { Projects } from "@/components/home/Projects";
import { WhatsOn } from "@/components/home/WhatsOn";
import { HashButton, HashButtonDefs, Icon } from "@/components/ui";
import { contact, footer, socials } from "@/lib/content";

/* srm.com's homepage on the layout of an approved Regen demo (Coinford, coinford.regendigital.co): one Slate opening,
   then a steady white page with Mist bands. The background never changes as you scroll (client feedback, 5 Oct).
   Every item on the live homepage is here; the copy is in lib/content.ts and the systems are in README.md. */
export default function Home() {
  return (
    <>
      <Motion />
      <HashButtonDefs />
      <Preloader />
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Expertise />
        <Projects />
        <Heritage />
        <WhatsOn />

        {/* Coinford's contact band: the question on the left, the live phone and email on the right. */}
        <section className="section contact" id="contact" data-late aria-labelledby="contact-title" tabIndex={-1}>
          <div className="wrap contact-row">
            <div>
              <h2 className="h2" id="contact-title" data-reveal="head">{contact.title}</h2>
              <p className="label contact-office" data-reveal="label">{contact.office.title}</p>
              <address className="body" data-reveal="text">{contact.office.lines.join(", ")}</address>
            </div>
            <div className="contact-side" data-reveal="label">
              <a className="contact-big" href={contact.phone.href}>{contact.phone.label}</a>
              <a className="contact-big" href={contact.email.href}>{contact.email.label}</a>
              <HashButton href={contact.offices.href} tone="on-light">{contact.offices.label}</HashButton>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" data-late>
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
