import { Link } from "react-router-dom";
import { ArrowRight, Boxes, Handshake, Phone, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: Boxes,
    title: "Live Slab Visibility",
    text: "The site is built around showing current inventory clearly, not hiding materials behind a generic contact form.",
  },
  {
    icon: Handshake,
    title: "Direct Relationships",
    text: "Pricing, availability, and reservations stay relationship-based and confirmed directly by phone.",
  },
  {
    icon: ShieldCheck,
    title: "Trade-Focused Service",
    text: "Fabricators, designers, builders, and homeowners can browse inventory, while trade pricing can be protected later.",
  },
];

const stats = [
  {
    value: "Live",
    label: "Inventory Focus",
  },
  {
    value: "Direct",
    label: "Pricing Conversations",
  },
  {
    value: "Trade",
    label: "Fabricator Friendly",
  },
];

export function About() {
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div>
            <p className="eyebrow">About Whitestone</p>
            <h1>Built on Stone Experience. Repositioned for Distribution.</h1>
            <p>
              Whitestone Distribution is positioned as a premium stone slab
              source built from years of fabrication experience. The goal is
              simple: make current slab availability easy to browse, while
              keeping pricing and reservations direct.
            </p>

            <div className="about-hero-actions">
              <Link to="/live-inventory" className="btn btn-primary">
                View Live Inventory
              </Link>

              <a href="tel:8015550199" className="btn btn-secondary">
                <Phone size={17} />
                Call Directly
              </a>
            </div>
          </div>

          <div className="about-hero-visual">
            <span>Whitestone Distribution</span>
          </div>
        </div>
      </section>

      <section className="about-story-section">
        <div className="container about-story-grid">
          <div>
            <p className="eyebrow">The Pivot</p>
            <h2>From Fabrication Experience to Slab Distribution.</h2>
          </div>

          <div className="about-story-copy">
            <p>
              The old model was centered around fabrication. The new direction
              is centered around stone supply, live inventory, and direct access
              to available slabs.
            </p>

            <p>
              That fabrication background still matters. It means Whitestone
              understands what fabricators actually need before committing to a
              slab: material type, dimensions, thickness, finish, availability,
              and a direct person to call when timing matters.
            </p>

            <p>
              Instead of acting like a basic countertop contractor website,
              Whitestone should feel like a premium slab source: visual,
              organized, trade-aware, and built around inventory.
            </p>
          </div>
        </div>
      </section>

      <section className="about-stats-section">
        <div className="container about-stats-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="about-stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="about-values-section">
        <div className="container">
          <div className="about-section-header">
            <p className="eyebrow">What the Site Is Built Around</p>
            <h2>Premium Inventory. Direct Communication. Fabricator Access.</h2>
            <p>
              The first version keeps the business model clean: show the slabs,
              let people browse, and push serious buyers to call for pricing and
              reservation.
            </p>
          </div>

          <div className="about-values-grid">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article key={value.title} className="about-value-card">
                  <div className="about-value-icon">
                    <Icon size={24} />
                  </div>

                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-positioning-section">
        <div className="container about-positioning-card">
          <div>
            <p className="eyebrow">Positioning</p>
            <h2>Not a Generic Granite Website.</h2>
            <p>
              Whitestone Distribution should be presented as a live slab
              inventory platform for fabricators, designers, builders, and
              homeowners. Public visitors can browse inventory without seeing
              pricing, while future trade access can unlock fabricator pricing
              through a code, private link, or approved access.
            </p>
          </div>

          <Link to="/fabricators" className="positioning-link">
            See Fabricator Access
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}