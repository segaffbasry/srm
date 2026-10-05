import { HashButton } from "@/components/ui";
import { heritage, modernSlavery, sustainability } from "@/lib/content";

/* The approved Coinford "About Us" block: a statement heading, three short columns, then two photographs side by
   side with a closing line and button. The statement is the live Our Heritage block; the columns are the homepage's
   three commitment blocks (Sustainable Engineering Excellence, Net Zero 2045, Modern Slavery). */
export function Heritage() {
  const columns = [
    { title: sustainability.heading, body: sustainability.text[0], cta: sustainability.cta },
    { title: sustainability.netZero.title, body: sustainability.netZero.text, cta: sustainability.netZero.cta },
    { title: modernSlavery.title, body: modernSlavery.text, cta: modernSlavery.cta },
  ];
  return (
    <section className="section heritage" id="heritage" aria-labelledby="heritage-title" tabIndex={-1}>
      <div className="wrap">
        <p className="label" data-reveal="label">{heritage.title}</p>
        <h2 className="h2 heritage-title" id="heritage-title" data-reveal="head">{heritage.text}</h2>
        <ul className="heritage-cols" data-reveal="cards">
          {columns.map((c) => (
            <li key={c.title}>
              <h3 className="h5">{c.title}</h3>
              <p className="body">{c.body}</p>
              <a className="text-link" href={c.cta.href} target="_blank" rel="noopener">{c.cta.label}<span className="sr-only">: {c.title}</span></a>
            </li>
          ))}
        </ul>
        <div className="heritage-media">
          <figure className="photo heritage-wide" data-reveal="image"><img src={heritage.image} alt={heritage.alt} loading="lazy" data-parallax /></figure>
          <div className="heritage-side">
            <figure className="photo" data-reveal="image"><img src={sustainability.image} alt="A Sir Robert McAlpine building with a wildflower green roof" loading="lazy" data-parallax /></figure>
            <p className="body" data-reveal="text">{sustainability.text[1]}</p>
            <div data-reveal="label"><HashButton href={heritage.cta.href} tone="on-light">{heritage.cta.label}</HashButton></div>
          </div>
        </div>
      </div>
    </section>
  );
}
