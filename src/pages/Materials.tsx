import { Link } from "react-router-dom";
import {
  ArrowRight,
  Crown,
  Gem,
  Hammer,
  Home,
  PenTool,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const materialCards = [
  {
    name: "Quartzite",
    text: "Bold, durable, and naturally stunning. Our strongest recommendation for premium kitchens, islands, fireplaces, baths, and statement spaces.",
    imageUrl: "/images/materials/cards/materials-quartzite.png",
  },
  {
    name: "Dense Dolomite",
    text: "Soft movement with a refined, marble-like look. A strong option for clients who want elegance, contrast, and natural depth.",
    imageUrl: "/images/materials/cards/materials-dolomite.png",
  },
  {
    name: "Granite",
    text: "Classic, strong, and versatile. Selected for interiors and exteriors where durability, pattern, and long-term performance matter.",
    imageUrl: "/images/materials/cards/materials-granite.png",
  },
  {
    name: "Soapstone",
    text: "Smooth, natural, and timeless with a lived-in elegance. A distinctive option for warm, understated luxury.",
    imageUrl: "/images/materials/cards/materials-soapstone.png",
  },
  {
    name: "Crystal + Semi-Precious",
    text: "Rare, luminous, and truly one-of-a-kind. Selected for backlit features, bars, walls, and signature statement pieces.",
    imageUrl: "/images/materials/cards/materials-crystal.png",
  },
  {
    name: "Rare Exotics",
    text: "Extraordinary slabs from around the world. Chosen for movement, contrast, color, rarity, and unforgettable visual impact.",
    imageUrl: "/images/materials/cards/materials-exotics.png",
  },
];

const quartziteBenefits = [
  {
    icon: Gem,
    title: "Naturally Strong",
  },
  {
    icon: Sparkles,
    title: "Unique Movement",
  },
  {
    icon: ShieldCheck,
    title: "Heat + Scratch Resistant",
  },
  {
    icon: Crown,
    title: "Timeless Luxury",
  },
];

const trendingLooks = [
  {
    title: "Warm Quartzite + Taj Mahal Looks",
    imageUrl: "/images/materials/cards/materials-quartzite.png",
  },
  {
    title: "White + Gold Elegance",
    imageUrl: "/images/materials/featured/featured-quartzite-slab.png",
  },
  {
    title: "Dramatic Black Stone",
    imageUrl: "/images/materials/cards/materials-exotics.png",
  },
  {
    title: "Green Exotic Statements",
    imageUrl: "/images/materials/cards/materials-crystal.png",
  },
  {
    title: "Crystal + Semi-Precious Looks",
    imageUrl: "/images/materials/cards/materials-crystal.png",
  },
];

const buyerGuides = [
  {
    icon: Home,
    title: "Homeowners",
    text: "We help you find the perfect stone for your space, lifestyle, and budget.",
  },
  {
    icon: PenTool,
    title: "Designers + Builders",
    text: "Consistent quality, reliable supply, and expert support for your projects.",
  },
  {
    icon: Hammer,
    title: "Fabricators",
    text: "Premium slabs, precise dimensions, confidential pricing, and trade-friendly service.",
  },
];

export function Materials() {
  return (
    <>
      <section className="materials-hero">
        <div className="materials-hero-bg" aria-hidden="true">
          <img
            src="/images/materials/hero/materials-hero-background.png"
            alt=""
          />
        </div>

        <div className="container materials-hero-inner">
          <div className="materials-hero-copy">
            <p className="eyebrow">Premium Natural Stone, Personally Sourced</p>

            <div className="materials-hero-rule materials-hero-rule-top" />

            <h1>Premium Stone Selected for Luxury Projects</h1>

            <p>
              From rare quartzite to exotic crystal and dense dolomite,
              Whitestone curates the world&apos;s most exceptional materials
              for timeless spaces and unforgettable designs.
            </p>

            <div className="materials-hero-actions">
              <Link to="/live-inventory" className="btn btn-primary">
                Explore Live Inventory
              </Link>

              <a href="tel:8015550198" className="btn btn-secondary">
                <Phone size={17} />
                Call for Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="materials-feature-section">
        <div className="container materials-feature-grid">
          <div className="materials-feature-media">
            <img
              className="materials-feature-slab"
              src="/images/materials/featured/featured-quartzite-slab.png"
              alt="Warm quartzite slab with gold veining"
            />

            <img
              className="materials-feature-kitchen"
              src="/images/materials/featured/featured-quartzite-kitchen.png"
              alt="Luxury kitchen with quartzite island"
            />
          </div>

          <div className="materials-feature-copy">
            <p className="eyebrow">Whitestone Recommendation</p>

            <div className="materials-small-rule" />

            <h2>Quartzite</h2>

            <p>
              Our top recommendation for beauty and performance. Quartzite is a
              natural stone that brings the elegance of marble with the strength
              to handle real life — perfect for kitchens, islands, fireplaces,
              bathrooms, and statement spaces.
            </p>

            <div className="materials-benefit-grid">
              {quartziteBenefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div key={benefit.title} className="materials-benefit-item">
                    <Icon size={28} />
                    <span>{benefit.title}</span>
                  </div>
                );
              })}
            </div>

            <Link to="/live-inventory" className="btn btn-primary">
              Shop Quartzite Inventory
            </Link>
          </div>
        </div>
      </section>

      <section className="materials-section">
        <div className="container">
          <div className="materials-section-header centered-header">
            <h2>Materials We Specialize In</h2>
            <div className="materials-centered-rule" />
          </div>

          <div className="materials-card-grid">
            {materialCards.map((material) => (
              <article key={material.name} className="materials-card">
                <img src={material.imageUrl} alt={`${material.name} texture`} />

                <div className="materials-card-body">
                  <h3>{material.name}</h3>
                  <p>{material.text}</p>

                  <Link to="/live-inventory" className="materials-card-link">
                    View Inventory
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="materials-trending-section">
        <div className="container">
          <div className="materials-section-header centered-header">
            <h2>Top 5 Trending Looks</h2>
            <div className="materials-centered-rule" />
          </div>

          <div className="trending-look-grid">
            {trendingLooks.map((look) => (
              <article key={look.title} className="trending-look-card">
                <img src={look.imageUrl} alt={`${look.title} stone texture`} />

                <div>
                  <h3>{look.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="material-guidance-section">
        <div className="container material-guidance-grid">
          <div>
            <div className="materials-section-header centered-header">
              <h2>Choosing the Right Material</h2>
              <div className="materials-centered-rule" />
            </div>

            <div className="material-guide-card-grid">
              {buyerGuides.map((guide) => {
                const Icon = guide.icon;

                return (
                  <article key={guide.title} className="material-guide-card">
                    <div className="material-guide-icon">
                      <Icon size={30} />
                    </div>

                    <h3>{guide.title}</h3>
                    <p>{guide.text}</p>

                    <Link to="/contact" className="materials-card-link">
                      Learn More
                      <ArrowRight size={15} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="material-guidance-image-card">
            <img
              src="/images/materials/featured/featured-quartzite-kitchen.png"
              alt="Luxury kitchen with stone island"
            />

            <div className="material-guidance-callout">
              <p className="eyebrow">Need Guidance?</p>
              <p>Our stone experts are here to help you choose.</p>

              <a href="tel:8015550198" className="btn btn-primary">
                Call to Consult
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="materials-inventory-banner">
        <div className="materials-inventory-bg" aria-hidden="true">
          <img
            src="/images/materials/inventory/materials-inventory-strip.png"
            alt=""
          />
        </div>

        <div className="container materials-inventory-banner-inner">
          <div>
            <h2>The Right Stone Is the One That Speaks to You.</h2>
            <p>
              Material type is just the beginning — each slab is unique. Explore
              our current inventory to find the one.
            </p>

            <Link to="/live-inventory" className="btn btn-primary">
              View Live Inventory
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="materials-contact-strip">
        <div className="container materials-contact-card">
          <div className="materials-contact-icon">
            <Phone size={28} />
          </div>

          <div>
            <h2>Let&apos;s Find Your Perfect Stone</h2>
            <p>Call us for pricing, availability, and expert recommendations.</p>
          </div>

          <a href="tel:8015550198" className="btn btn-primary">
            Call (801) 555-0198
          </a>
        </div>
      </section>
    </>
  );
}
