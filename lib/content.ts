/* Every word on the page, taken verbatim from the srm.com homepage (crawled 4 October 2026) and kept in its live
   order. Hrefs are the live URLs, each checked against https://www.srm.com/sitemap.xml by scripts/check-links.mjs.
   House rule for these demos: no em or en dashes anywhere, so the one dash on the live page ("Careers - Home")
   is not used. Images are the live homepage photos, downloaded by scripts/media.sh. */

export const SITE = "https://www.srm.com";
const u = (path: string) => (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:") ? path : SITE + path);

export type Link = { label: string; href: string };

// Primary navigation, as in the live header (Projects, Who We Are, What We Do, Careers, What's on, plus two features).
export const nav: { label: string; href: string; children: Link[] }[] = [
  { label: "Projects", href: u("/projects/"), children: [
    { label: "View All Projects", href: u("/projects/") },
    { label: "Infrastructure", href: u("/sectors/infrastructure/") },
    { label: "Commercial", href: u("/sectors/commercial/") },
    { label: "Healthcare", href: u("/sectors/healthcare/") },
    { label: "Industrial", href: u("/sectors/industrial/") },
    { label: "Heritage & Special Projects", href: u("/sectors/heritage-special-projects/") },
  ] },
  { label: "Who We Are", href: u("/about-us/"), children: [
    { label: "About Us", href: u("/about-us/") },
    { label: "Our Approach", href: u("/about-us/our-approach/") },
    { label: "Our Vision", href: u("/about-us/our-vision/") },
    { label: "Our Heritage", href: u("/about-us/our-heritage/") },
    { label: "People & Culture", href: u("/people-culture/") },
    { label: "Our Commitments", href: u("/our-commitments/") },
    { label: "Our Offices", href: u("/office-locations/") },
  ] },
  { label: "What We Do", href: u("/expert-services/"), children: [
    { label: "Expertise & Services", href: u("/expert-services/") },
    { label: "Specialist Businesses", href: u("/expert-services/") },
    { label: "Sectors", href: u("/expert-services/") },
    { label: "Frameworks and Integrated Partnerships", href: u("/expert-services/frameworks-and-integrated-partnerships/") },
  ] },
  { label: "Careers", href: u("/careers/"), children: [
    { label: "Working for Us", href: u("/careers/") },
    { label: "Emerging Talent", href: u("/careers/emerging-talent/") },
    { label: "Meet the Team", href: u("/careers/meet-the-team/") },
    { label: "Search & Apply", href: "https://jobs.srm.com/jobs/home/" },
  ] },
  { label: "What's on", href: u("/news-and-comment/"), children: [
    { label: "Latest news", href: u("/news-and-comment/") },
    { label: "Events", href: u("/events/") },
  ] },
  { label: "Capital Ventures", href: u("/capital-ventures/"), children: [] },
  { label: "Sustainable Engineering Excellence", href: u("/sustainable-engineering-excellence/"), children: [] },
];

export const socials = [
  { name: "X (formerly Twitter)", icon: "x", href: "https://twitter.com/WeAreMcAlpine" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/wearemcalpine/" },
  { name: "Facebook", icon: "facebook", href: "https://facebook.com/wearemcalpine" },
  { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/sir-robert-mcalpine/" },
  { name: "YouTube", icon: "youtube", href: "https://www.youtube.com/@sirrobertmcalpine5282" },
] as const;

/* Hero, in the approved Coinford layout (statement on the left, copy and buttons on the right, the film below).
   Every line is SRM's own: the eyebrow is the live video block's title, the display lines are the brand film's
   closing card, and the copy is the live "About us" blurb from the Who We Are menu. */
export const hero = {
  eyebrow: "A family building and civil engineering company",
  lines: ["Proudly building", "Britain’s future", "heritage"],
  text: "It’s the quality of our people that makes us different.",
  actions: [
    { label: "What we do", href: u("/expert-services/") },
    { label: "View all projects", href: u("/projects/") },
  ],
};

// The live video block (YouTube caE2UjmlpCQ); here a muted, text-free cut of the same film, framed under the hero.
export const film = {
  title: "A family building and civil engineering company",
  src: "/media/film.mp4",
  poster: "/media/film-poster.jpg",
  cta: { label: "Watch the film", href: "https://www.youtube.com/watch?v=caE2UjmlpCQ" },
};

/* Credibility strip under the film. Each figure is quoted from copy on the live homepage. */
export const stats = [
  { value: "150", label: "Years of technical excellence and innovation" },
  { value: "2045", label: "Our journey to Net Zero" },
  { value: "£500m", label: "Temple Quarter Enterprise Campus, completed" },
  { value: "5,792", label: "Façade panels installed at 2 Finsbury Avenue" },
];

export const sustainability = {
  title: "Sustainable Engineering Excellence",
  lines: ["Sustainable Engineering", "Excellence"],
  heading: "Making choices that matter",
  text: [
    "Sustainable Engineering Excellence is our commitment to creating projects that deliver lasting value for people, places and the planet. It’s about embedding sustainability into every choice we make, from the earliest concept discussions to the final handover, ensuring our decisions deliver a legacy we’re proud of.",
    "Our Sustainable Engineering Excellence hub brings together our strategy, partnerships, insights and innovation in one place, showcasing how we are driving positive change across the industry.",
  ],
  cta: { label: "Find out more", href: u("/sustainable-engineering-excellence/") },
  image: "/media/netzero.webp",
  netZero: {
    title: "Our journey to Net Zero 2045",
    text: "In order to realise our vision and continue proudly building Britain's future heritage, we want to help lead the transition to Net Zero and develop solutions that address this challenge.",
    cta: { label: "Find out more", href: "https://netzero.srm.com" },
  },
};

export type Card = { title: string; text: string; href: string; image: string; alt: string; date?: string; tags?: { label: string; value: string }[] };

export const insights: { title: string; items: Card[] } = {
  title: "Industry insights",
  items: [
    { title: "Why construction must embrace circularity", text: "Darron Hall, Head of Sustainability, and Kathryn Castledine, Senior Sustainability Manager, explain why the construction industry must look beyond recycling and embed circular thinking", href: u("/events/why-construction-must-embrace-circularity/"), image: "/media/insight-circularity.webp", alt: "An excavator sorting materials on a demolition site" },
    { title: "“Digital construction has moved on. Has the industry?”", text: "Our Director of Digital Construction, Nick Leach, asks whether the industry is keeping up with the pace of change in digital capabilities", href: u("/events/digital-construction-has-moved-on-has-the-industry/"), image: "/media/insight-digital.webp", alt: "A site engineer checking a digital model on a phone at 21 Moorfields" },
    { title: "Equity vs Equality: Why the difference really matters", text: "Company Social Value Manager, Anjana Raj, and Senior Social Value Manager, Alex Ward, reflect on the importance of equity", href: u("/events/equity-vs-equality-why-the-difference-really-matters/"), image: "/media/insight-equity.webp", alt: "Students in hard hats building a STEM bridge" },
  ],
};

export const technical = {
  title: "Technical Excellence",
  lines: ["Technical", "Excellence"],
  text: [
    "It’s what we are known for and it’s why we attract some of the industry’s brightest talent.",
    "Our commitment to technical excellence means we are always looking to push the boundaries of the possible.",
  ],
  cta: { label: "Find out more", href: u("/about-us/technical-excellence/") },
  image: "/media/technical.webp",
  alt: "Two Sir Robert McAlpine engineers reviewing drawings inside a building under construction",
};

export const projects: { title: string; items: Card[]; cta: Link } = {
  title: "Our projects",
  items: [
    { title: "National Rehabilitation Centre", text: "We are leveraging digital construction in Loughborough to deliver a first for the NHS", href: u("/projects/national-rehabilitation-centre/"), image: "/media/project-nrc.webp", alt: "CGI of the National Rehabilitation Centre seen from the south", tags: [{ label: "Sectors", value: "Healthcare" }, { label: "Region", value: "Midlands" }, { label: "Themes", value: "Sustainability" }] },
    { title: "Temple Quarter Enterprise Campus", text: "We constructed a new, world-class campus for the University of Bristol.", href: u("/projects/temple-quarter-enterprise-campus/"), image: "/media/project-tqec.webp", alt: "The University of Bristol’s Temple Quarter Enterprise Campus", tags: [{ label: "Sectors", value: "Education" }, { label: "Themes", value: "Sustainability" }] },
    { title: "National Gallery", text: "The National Gallery’s transformation project marked a pivotal moment as it celebrated its bicentennial.", href: u("/projects/national-gallery/"), image: "/media/project-gallery.webp", alt: "The National Gallery on Trafalgar Square", tags: [{ label: "Sectors", value: "Heritage & Special Projects" }, { label: "Region", value: "London" }] },
  ],
  cta: { label: "View all projects", href: u("/projects/") },
};

export const modernSlavery = {
  title: "Modern Slavery",
  text: "Modern Slavery is everyone's issue and we will only tackle it effectively if we collaborate and address it together.",
  cta: { label: "Find out more", href: u("/our-commitments/compliance/") },
};

export const services: { title: string; items: Card[]; cta: Link } = {
  title: "Expert Services",
  items: [
    { title: "McAlpine Design Group", text: "Thanks to the expertise of our in-house design specialists, we do more than turn our clients’ visions into reality.", href: u("/expert-services/mcalpine-design-group/"), image: "/media/service-design.webp", alt: "Aerial view of Pinewood Studios phase two" },
    { title: "Construction Management", text: "Construction management is a delivery route through which we can add tremendous value.", href: u("/expert-services/construction-management/"), image: "/media/service-cm.webp", alt: "Aerial view of Battersea Power Station and the Thames" },
    { title: "Geospatial Engineering", text: "Providing a 360° analysis of land and developments, with minimal disruption onsite.", href: u("/expert-services/geospatial-engineering/"), image: "/media/service-geo.webp", alt: "A geospatial engineer surveying a site with a total station" },
  ],
  cta: { label: "View our expertise", href: u("/expert-services/") },
};

export const heritage = {
  title: "Our Heritage",
  text: "Our reputation is founded on 150 years of technical excellence and innovation, our entrepreneurial spirit and our future-focused approach.",
  cta: { label: "Find out more", href: u("/about-us/our-heritage/") },
  image: "/media/heritage.webp",
  alt: "An archive photograph of Sir Robert McAlpine’s team beneath a viaduct under construction",
  stat: { value: 150, suffix: " years", label: "of technical excellence and innovation" },
};

export const news: { title: string; items: Card[]; cta: Link } = {
  title: "Latest news",
  items: [
    { title: "Data-driven innovation earns national recognition", date: "01 Oct 2026", text: "Introduction of integrated information hubs impresses judges at Building Innovation Awards 2026", href: u("/news-and-comment/data-driven-innovation-earns-national-recognition/"), image: "/media/news-1.webp", alt: "The digital construction team with their Building Innovation Award" },
    { title: "Sir Robert McAlpine achieves Clear Assured Bronze", date: "29 Sep 2026", text: "This independent industry certification recognises our commitment to building a workplace where everyone can thrive", href: u("/news-and-comment/sir-robert-mcalpine-achieves-clear-assured-bronze/"), image: "/media/news-2.webp", alt: "Two colleagues in hard hats on a roof terrace" },
    { title: "Celebrating 10 years of the Broadgate Framework at LREF", date: "25 Sep 2026", text: "We hosted our own panel, ‘Built on Partnership: 10 Years of Broadgate’, at this year's London Real Estate Forum", href: u("/news-and-comment/celebrating-10-years-of-the-broadgate-framework-at-lref/"), image: "/media/news-3.webp", alt: "The Broadgate panel on stage at the London Real Estate Forum" },
    { title: "Green steel takes shape at Port Talbot", date: "23 Sep 2026", text: "Work on the foundations, infrastructure and buildings that will support Tata Steel's new electric arc furnace is now well underway", href: u("/news-and-comment/green-steel-takes-shape-at-port-talbot/"), image: "/media/news-4.webp", alt: "Piling for the electric arc furnace at Port Talbot" },
    { title: "2 Finsbury Avenue façade installation completes", date: "10 Sep 2026", text: "All 5,792 unitised façade panels at 2 Finsbury Avenue have now been installed", href: u("/news-and-comment/2-finsbury-avenue-facade-installation-completes/"), image: "/media/news-5.webp", alt: "The unitised façade of 2 Finsbury Avenue" },
    { title: "University of Bristol's TQEC completes", date: "07 Sep 2026", text: "The £500 million campus creates a new gateway to Bristol at the heart of the wider Bristol Temple Quarter regeneration programme", href: u("/news-and-comment/university-of-bristols-tqec-completes/"), image: "/media/news-6.webp", alt: "Aerial view of the Temple Quarter Enterprise Campus" },
  ],
  cta: { label: "View all news", href: u("/news-and-comment/") },
};

export const contact = {
  title: "Contact Us",
  // The closing panel's statement: the live "Our Vision" blurb from the Who We Are menu.
  statement: "To be renowned for our work with clients and communities as we construct a better world for future generations.",
  image: "/media/technical.webp",
  alt: "Two Sir Robert McAlpine engineers reviewing drawings inside a building under construction",
  careers: { label: "Search & Apply", href: "https://jobs.srm.com/jobs/home/" },
  phone: { label: "0333 566 3444", href: "tel:+443335663444" },
  email: { label: "information@srm.com", href: "mailto:information@srm.com" },
  office: { title: "Registered Office", lines: ["Concept House, Home Park Mill Link", "Kings Langley", "Hertfordshire", "WD4 8UD", "GB"] },
  offices: { label: "Office Locations", href: u("/office-locations/") },
};

export const footer = {
  groups: [
    { title: "Working For Us", links: [
      { label: "Careers", href: u("/careers/") },
      { label: "Why Join Us", href: u("/careers/why-join-us/") },
      { label: "What's On Offer", href: u("/careers/whats-on-offer/") },
      { label: "Emerging Talent", href: u("/careers/emerging-talent/") },
      { label: "Experienced Hires", href: u("/careers/experienced-hires/") },
    ] },
    { title: "About Us", links: [
      { label: "About Us", href: u("/about-us/") },
      { label: "Our Heritage", href: u("/about-us/our-heritage/") },
      { label: "People & Culture", href: u("/people-culture/") },
      { label: "Our Commitments", href: u("/our-commitments/") },
      { label: "Compliance", href: u("/our-commitments/compliance/") },
    ] },
  ],
  copyright: "© Sir Robert McAlpine 2026",
  legal: [
    { label: "Terms of Use", href: u("/terms-of-use/") },
    { label: "Privacy Notice & Cookie Policy", href: u("/privacy-notice-cookie-policy/") },
    { label: "Accessibility", href: u("/accessibility/") },
  ],
};

// Homepage sections the menu can scroll to.
export const sections: Link[] = [
  { label: "Expert Services", href: "#expertise" },
  { label: "Our projects", href: "#projects" },
  { label: "Our Heritage", href: "#heritage" },
  { label: "What's on", href: "#news" },
  { label: "Contact Us", href: "#contact" },
];
