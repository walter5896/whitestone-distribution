import { Link } from "react-router-dom";
import {
  ArrowRight,
  Boxes,
  Crown,
  Globe2,
  Handshake,
  Leaf,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";

const values = [
  {
    icon: Boxes,
    title: "Premium Inventory",
    text: "Whitestone focuses on rare, high-quality natural stone selected for movement, density, durability, and visual impact.",
  },
  {
    icon: Handshake,
    title: "Relationship-Based Supply",
    text: "Pricing, holds, availability, and trade conversations are handled directly so buyers get accurate information before committing.",
  },
  {
    icon: ShieldCheck,
    title: "Trade-Aware Service",
    text: "Fabricators, builders, designers, and homeowners can browse inventory while trade pricing and client relationships stay protected.",
  },
];

const stats = [
  {
    icon: ShieldCheck,
    value: "45+ Years",
    label: "In Stone",
    text: "Decades of hands-on experience in sourcing, fabrication, and distribution.",
  },
  {
    icon: Crown,
    value: "Rare",
    label: "Materials",
    text: "Access to premium slabs and uncommon materials not found in ordinary yards.",
  },
  {
    icon: Globe2,
    value: "Direct",
    label: "Sourcing",
    text: "Relationships, quarry knowledge, and global logistics behind the inventory.",
  },
  {
    icon: Handshake,
    value: "Trade",
    label: "Friendly",
    text: "Built for fabricators, builders, designers, and serious homeowners.",
  },
];

const sourcingSteps = [
  {
    title: "Block Selection",
    text: "Premium stone begins with experienced buyers reviewing raw blocks for movement, quality, and potential.",
    imageUrl: "/images/about/process-block-selection.png",
  },
  {
    title: "Wetting + Inspection",
    text: "Water helps reveal color, pattern, veining, and depth before the material moves forward.",
    imageUrl: "/images/about/process-wetting-inspection.png",
  },
  {
    title: "Brazil Processing",
    text: "Selected material is processed and polished through advanced stone facilities before export.",
    imageUrl: "/images/about/process-brazil-processing.png",
  },
  {
    title: "Container + Arrival",
    text: "Slabs are organized, containerized, shipped, received, and prepared for inventory access.",
    imageUrl: "/images/about/process-container-arrival.png",
  },
];

const responsibleValues = [
  {
    icon: Globe2,
    title: "Global Material Access",
    text: "Stone is sourced through experienced relationships and processed through established international supply channels.",
  },
  {
    icon: Leaf,
    title: "Responsible Approach",
    text: "The focus is on quality material, thoughtful sourcing, and lasting value rather than fast-turn generic inventory.",
  },
  {
    icon: Handshake,
    title: "Personal Guidance",
    text: "Customers should expect help from people who understand stone, fabrication, availability, pricing, and project timing.",
  },
];

const materials = [
  {
    name: "Quartzite",
    text: "Recommended for strength, movement, and luxury appeal.",
    imageUrl: "/images/about/texture-warm-quartzite.png",
  },
  {
    name: "Dense Dolomite",
    text: "Elegant movement with a refined, high-end natural stone look.",
    imageUrl: "/images/about/texture-white-gold-stone.png",
  },
  {
    name: "Granite",
    text: "Durable, dependable, and available in premium statement selections.",
    imageUrl: "/images/about/texture-black-gold-stone.png",
  },
  {
    name: "Soapstone",
    text: "A timeless material option for warm, distinctive design work.",
    imageUrl: "/images/about/texture-green-exotic-stone.png",
  },
  {
    name: "Crystal + Semi-Precious",
    text: "Rare looks selected for dramatic spaces and standout projects.",
    imageUrl: "/images/about/texture-white-gold-stone.png",
  },
  {
    name: "Rare Exotics",
    text: "Uncommon slabs chosen for color, movement, and visual impact.",
    imageUrl: "/images/about/texture-green-exotic-stone.png",
  },
];

export function About() {
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <p className="eyebrow">About Whitestone</p>
            <h1>Premium Stone Distribution Built on a Lifetime in the Trade.</h1>

            <div className="about-hero-rule" />

            <p>
              Whitestone Distribution is the next evolution of decades spent in
              the stone industry. Built from more than 45 years of hands-on
              experience, the company is moving beyond fabrication into a larger,
              sharper, and more focused natural stone distribution brand.
            </p>

            <p>
              The goal is simple: provide access to premium slabs, rare
              materials, direct guidance, and competitive pricing without making
              homeowners, builders, designers, or fabricators dig through a
              generic supplier experience.
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

          <div className="about-hero-visual about-hero-image-card">
            <img
              src="/images/about/about-hero-showroom.png"
              alt="Luxury stone showroom with premium slabs on display"
            />

            <div className="about-hero-image-badge">
              <strong>45+ Years</strong>
              <span>Stone Expertise</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-transition-section">
        <img
          src="/logo/whitestone-logo-transparent.png"
          alt=""
          className="about-transition-watermark"
          aria-hidden="true"
        />

        <div className="container about-transition-grid">
          <div>
            <p className="eyebrow">Our Story</p>
            <h2>The Transition from Fabrication to Distribution Excellence</h2>
          </div>

          <div className="about-transition-copy">
            <p>
              Whitestone represents a natural progression from the old
              fabrication-centered model into a premium distribution model.
            </p>

            <p>
              By simplifying the focus to distribution, Whitestone can elevate
              the level of stone, strengthen buyer and quarry relationships, and
              offer more direct access to materials selected for serious
              projects.
            </p>

            <p>
              The result is a business built for homeowners, designers,
              builders, fabricators, and trade professionals who need rare
              material, accurate information, and a supplier who understands the
              value of the project.
            </p>

            <Link to="/fabricators" className="about-inline-link">
              Our Commitment to the Trade
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="about-stats-section">
        <div className="container about-stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article key={stat.label} className="about-stat-card">
                <div className="about-stat-icon">
                  <Icon size={26} />
                </div>

                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <p>{stat.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-values-section">
        <div className="container">
          <div className="about-section-header">
            <p className="eyebrow">What Sets Whitestone Apart</p>
            <h2>Rare Materials, Direct Access, and Real Trade Knowledge.</h2>
            <p>
              Whitestone is not trying to be another generic slab yard. The
              company is built around premium selection, lower overhead,
              personal sourcing relationships, and direct communication with
              serious buyers.
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

      <section className="about-texture-band texture-band-black">
        <div className="container texture-band-inner">
          <p>Rare stone selected for movement, quality, and impact.</p>
        </div>
      </section>

      <section className="about-sourcing-section">
        <div className="container about-story-grid">
          <div>
            <p className="eyebrow">Sourcing Process</p>
            <h2>Selected Before It Ever Reaches the Yard.</h2>
          </div>

          <div className="about-story-copy">
            <p>
              Whitestone’s inventory begins with experienced buyers and
              long-standing quarry relationships. Natural stone blocks are
              reviewed carefully, including a wetting process that helps reveal
              the color, pattern, movement, and potential of the material before
              it is processed.
            </p>

            <p>
              Selected stone is sent to advanced processing facilities in
              Brazil, then organized, received, containerized, and shipped
              through major ports such as Houston and Long Beach.
            </p>

            <p>
              The selection includes quartzite, dense dolomite, high-quality
              granite, soapstone, semi-precious looks, crystal materials, and
              rare slabs customers may not even know they want until they see
              them in person.
            </p>
          </div>
        </div>

        <div className="container sourcing-process-grid">
          {sourcingSteps.map((step, index) => (
            <article key={step.title} className="sourcing-process-card">
              <div className="sourcing-process-image-wrap">
                <img src={step.imageUrl} alt={`${step.title} stone process`} />
                <span>{index + 1}</span>
              </div>

              <div className="sourcing-process-content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-logistics-flow-section">
        <div className="container">
          <div className="about-logistics-flow-header">
            <p className="eyebrow">Distribution Reach</p>
            <h2>From Brazil to Major Ports, Then Into Western and Midwest Projects.</h2>
            <p>
              Whitestone’s sourcing model supports a larger distribution vision:
              premium material selected internationally, processed carefully,
              shipped through major ports, and made available through direct
              inventory conversations.
            </p>
          </div>

          <div className="about-logistics-flow-card">
            <img
              src="/images/about/logistics-map-brazil-utah.png"
              alt="Luxury logistics flow from Brazil to Houston and Long Beach, Utah facility, and Western and Midwest projects"
            />
          </div>
        </div>
      </section>

      <section className="about-values-section about-responsible-section">
        <div className="container">
          <div className="about-section-header">
            <p className="eyebrow">Responsible Selection</p>
            <h2>Premium Stone With a Thoughtful Sourcing Mindset.</h2>
            <p>
              Whitestone looks for quality, rarity, and long-term value while
              working through experienced buyers and established relationships.
              The goal is to source beautiful material responsibly and offer it
              through a more personal, flexible, and accessible buying
              experience.
            </p>
          </div>

          <div className="about-values-grid">
            {responsibleValues.map((value) => {
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

      <section className="about-materials-section">
        <div className="container">
          <div className="about-section-header">
            <p className="eyebrow">Materials We Specialize In</p>
            <h2>Curated for Luxury Homes, Trade Projects, and Statement Spaces.</h2>
            <p>
              Whitestone’s selection is built around materials with strong
              visual character, reliable performance, and the kind of movement
              that makes a project feel custom.
            </p>
          </div>

          <div className="about-material-grid">
            {materials.map((material) => (
              <article key={material.name} className="about-material-card">
                <img src={material.imageUrl} alt={`${material.name} texture`} />

                <div>
                  <h3>{material.name}</h3>
                  <p>{material.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-positioning-section">
        <div className="container about-positioning-card">
          <div className="about-positioning-image">
            <img
              src="/images/about/about-hero-showroom.png"
              alt="Premium stone showroom representing Whitestone Distribution"
            />
          </div>

          <div className="about-positioning-copy">
            <p className="eyebrow">Not a Generic Granite Website</p>
            <h2>A Distributor Built for the Trade.</h2>
            <p>
              Whitestone Distribution is built to look and operate like a larger
              premium supplier while keeping the flexibility of a leaner,
              relationship-driven business.
            </p>
            <p>
              Public visitors can browse live inventory, while fabricators and
              trade professionals can request confidential pricing and direct
              support.
            </p>

            <Link to="/fabricators" className="btn btn-primary">
              Request Fabricator Access
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="about-positioning-note">
            <Truck size={22} />
            <span>Pickup, delivery, trade pricing, and inventory support for verified professionals.</span>
          </div>
        </div>
      </section>
    </>
  );
}