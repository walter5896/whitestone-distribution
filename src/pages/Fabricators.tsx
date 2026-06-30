import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Layers,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

const benefits = [
  {
    icon: Eye,
    title: "Live Inventory Visibility",
    text: "Browse current slabs, new arrivals, remnants, and availability without waiting on a callback.",
  },
  {
    icon: SlidersHorizontal,
    title: "Competitive Direct Pricing",
    text: "Pricing stays direct and relationship-based instead of being displayed publicly to every visitor.",
  },
  {
    icon: Clock,
    title: "Fast Availability Checks",
    text: "Fabricators can quickly see what is available, what is limited, and what needs a direct call.",
  },
  {
    icon: Layers,
    title: "Clear Slab Details",
    text: "View material type, color family, thickness, finish, dimensions, status, and style tags.",
  },
  {
    icon: Phone,
    title: "Call-First Reservations",
    text: "Reservation and pricing are confirmed directly by phone so there is no confusion or false hold.",
  },
  {
    icon: ShieldCheck,
    title: "Future Trade Access",
    text: "Fabricator-only pricing can be added later through trade codes, private links, or approved access.",
  },
];

const workflowSteps = [
  {
    icon: Search,
    title: "Browse Current Inventory",
    text: "Search slabs by material, color family, thickness, finish, availability, and style.",
  },
  {
    icon: FileText,
    title: "Open Slab Details",
    text: "Review dimensions, material type, status, finish, style tags, and notes before calling.",
  },
  {
    icon: Phone,
    title: "Call for Pricing",
    text: "Pricing is handled directly so the details can be confirmed before quoting a job.",
  },
  {
    icon: ShieldCheck,
    title: "Reserve by Phone",
    text: "Reservation requests are not guaranteed until confirmed directly with Whitestone.",
  },
];

const accessOptions = [
  "Public inventory with no pricing",
  "Call-for-pricing on every slab",
  "Future fabricator trade code",
  "Future private access link",
  "Future approved email or magic link",
];

export function Fabricators() {
  return (
    <>
      <section className="fabricator-hero">
        <div className="fabricator-hero-bg" aria-hidden="true">
          <img src="/images/fabricators/fabricators-hero-slabs.png" alt="" />
        </div>

        <div className="container fabricator-hero-inner">
          <div className="fabricator-hero-copy">
            <p className="eyebrow">For Fabricators</p>

            <div className="fabricator-hero-rule" />

            <h1>Fast Slab Access for Trade Professionals.</h1>

            <p>
              Whitestone Distribution is built for fabricators who need current
              slab availability, clear material details, direct communication,
              and competitive pricing — without digging through a generic
              contractor website.
            </p>

            <div className="fabricator-hero-actions">
              <Link to="/live-inventory" className="btn btn-primary">
                Browse Live Inventory
              </Link>

              <a href="tel:8014009496" className="btn btn-secondary">
                <Phone size={17} />
                Call to Reserve
              </a>
            </div>
          </div>

          <div className="fabricator-hero-card">
            <div className="fabricator-hero-card-icon">
              <ShieldCheck size={28} />
            </div>

            <div>
              <h2>Trade-Focused Slab Inventory</h2>
              <p>Built for fabricators. Backed by Whitestone.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fabricator-benefits-section">
        <div className="container">
          <div className="fabricator-section-header centered-header">
            <p className="eyebrow">Trade Benefits</p>
            <h2>Built Around How Fabricators Actually Work.</h2>
            <p>
              Our inventory system and pricing approach are designed to save
              you time, reduce friction, and help you win more jobs.
            </p>
          </div>

          <div className="fabricator-benefit-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article key={benefit.title} className="fabricator-benefit-card">
                  <div className="fabricator-benefit-icon">
                    <Icon size={26} />
                  </div>

                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="fabricator-workflow-section">
        <div className="container fabricator-workflow-grid">
          <div className="fabricator-workflow-copy">
            <p className="eyebrow">Workflow</p>

            <h2>Simple for Fabricators. Controlled for Whitestone.</h2>

            <p>
              The site should make it easy for fabricators to find available
              slabs without giving up control over pricing, holds, or customer
              relationships.
            </p>

            <Link to="/live-inventory" className="workflow-link">
              Browse Live Inventory
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="workflow-step-list">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article key={step.title} className="workflow-step-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>

                  <Icon size={31} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="trade-access-section">
        <div className="container trade-access-grid">
          <div className="trade-access-card">
            <p className="eyebrow">Trade Pricing Access</p>

            <h2>
              Fabricator pricing can be added without making the whole site
              private.
            </h2>

            <div className="trade-access-rule" />

            <p>
              Version one can keep pricing off the public site. Later, approved
              fabricators can unlock pricing with a trade code, private access
              link, or passwordless email access.
            </p>
          </div>

          <div className="trade-access-list">
            {accessOptions.map((option) => (
              <div key={option}>
                <CheckCircle2 size={18} />
                <span>{option}</span>
                <ArrowRight size={16} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fabricator-final-cta-section">
        <div className="container fabricator-final-cta-card">
          <div>
            <p className="eyebrow">Direct Access</p>

            <h2>Need pricing or want to hold a slab?</h2>

            <div className="fabricator-cta-rule" />

            <p>
              Browse the live inventory first, then call directly to confirm
              pricing, current availability, and reservation details.
            </p>
          </div>

          <div className="fabricator-final-actions">
            <Link to="/live-inventory" className="btn btn-primary">
              <Layers size={17} />
              View Inventory
            </Link>

            <a href="tel:8014009496" className="btn btn-secondary">
              <Phone size={17} />
              Call Whitestone
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
