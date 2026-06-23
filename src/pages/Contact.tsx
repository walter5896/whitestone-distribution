import {
  CheckCircle2,
  Clock,
  Handshake,
  Mail,
  MapPin,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Users,
  Warehouse,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ContactForm } from "../components/forms/ContactForm";

const contactCards = [
  {
    icon: Phone,
    title: "Call the Showroom",
    text: "(801) 555-0199",
    detail:
      "For fastest availability checks, slab holds, and pricing questions, call directly.",
    actionLabel: "Call Now",
    href: "tel:8015550199",
  },
  {
    icon: Mail,
    title: "Email Whitestone",
    text: "sales@whitestonedistribution.com",
    detail:
      "Send project details, slab names, or general questions and we’ll follow up.",
    actionLabel: "Send Email",
    href: "mailto:sales@whitestonedistribution.com",
  },
  {
    icon: MapPin,
    title: "Visit by Appointment",
    text: "Utah Valley, Utah",
    detail:
      "Schedule a visit to view slabs, confirm selections, and coordinate next steps.",
    actionLabel: "Get Directions",
    href: "#service-area",
  },
  {
    icon: Users,
    title: "Fabricator Requests",
    text: "Trade Coordination",
    detail:
      "Fabricators can reach out for inventory access, slab coordination, and sourcing questions.",
    actionLabel: "Fabricator Inquiry",
    href: "#contact-inquiry",
  },
];

const includeItems = [
  "Slab name or material you’re interested in",
  "Project type: kitchen, bath, fireplace, commercial, etc.",
  "Approximate timeline",
  "Whether you’re working with a fabricator",
  "Any design, color, or size preferences",
  "Photos or inspiration if available",
];

const processSteps = [
  {
    icon: Send,
    title: "Send Details",
    text: "Share the slab, material, or project type you’re interested in.",
  },
  {
    icon: Search,
    title: "Confirm Availability",
    text: "We’ll confirm current inventory, pricing, and whether the slab can be placed on hold.",
  },
  {
    icon: Handshake,
    title: "Coordinate Next Steps",
    text: "Schedule a visit, connect with your fabricator, or reserve the material for your project.",
  },
];

export function Contact() {
  return (
    <>
      <section className="contact-hero">
        <div className="contact-hero-shell">
          <div className="contact-hero-content">
            <p className="eyebrow">Contact Whitestone</p>
            <h1>Start With the Stone</h1>
            <p>
              Ask about availability, request pricing, schedule a visit, or
              connect with our team about sourcing premium slabs for your next
              project.
            </p>

            <div className="contact-hero-notice">
              <ShieldCheck size={18} />
              <span>
                Inventory moves quickly. Contact us directly to confirm current
                availability, pricing, and hold options.
              </span>
            </div>

            <div className="contact-hero-actions">
              <a href="tel:8015550199" className="btn btn-primary">
                <Phone size={18} />
                Call to Reserve
              </a>

              <a href="#contact-inquiry" className="btn btn-secondary">
                <Mail size={18} />
                Send an Inquiry
              </a>
            </div>

            <div className="contact-trust-row" aria-label="Whitestone contact benefits">
              <span>
                <ShieldCheck size={18} />
                Live Slab Availability
              </span>

              <span>
                <Users size={18} />
                Fabricator Friendly
              </span>

              <span>
                <MapPin size={18} />
                Utah-Based Distribution
              </span>
            </div>
          </div>

          <div className="contact-hero-image-panel">
            <img
              src="/images/contact/contact-hero-showroom.png"
              alt="Premium stone slab showroom"
            />

            <div className="contact-hero-image-brand" aria-hidden="true">
              <img
                src="/logo/whitestone-logo-transparent.png"
                alt=""
              />
              <span>Whitestone</span>
              <small>Distribution</small>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="container contact-card-grid">
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <article key={card.title} className="contact-card">
                <div className="contact-card-icon">
                  <Icon size={24} />
                </div>

                <h2>{card.title}</h2>
                <strong>{card.text}</strong>
                <p>{card.detail}</p>

                <a href={card.href} className="contact-card-action">
                  {card.actionLabel}
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="contact-inquiry-section" id="contact-inquiry">
        <div className="container contact-inquiry-grid">
          <div className="contact-form-column">
            <p className="eyebrow">Send an Inquiry</p>
            <h2>Tell Us What You’re Looking For</h2>
            <p>
              Share the slab, material, project type, or timeline you have in
              mind and we’ll follow up with availability, pricing, and next
              steps.
            </p>

            <ContactForm />
          </div>

          <aside className="contact-include-card">
            <div>
              <p className="eyebrow">Helpful Details</p>
              <h2>What to Include</h2>

              <ul>
                {includeItems.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-immediate-help">
              <h3>Need Immediate Help?</h3>
              <p>
                Call us directly during business hours for the fastest
                availability and pricing information.
              </p>

              <a href="tel:8015550199">
                <Phone size={18} />
                (801) 555-0199
              </a>

              <span>
                <Clock size={18} />
                Mon - Fri: 8:00 AM - 5:00 PM MST
              </span>

              <span>
                <MapPin size={18} />
                By appointment on Saturdays
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className="contact-process-section">
        <div className="container">
          <div className="contact-section-heading">
            <p className="eyebrow">Simple Process</p>
            <h2>What Happens Next</h2>
          </div>

          <div className="contact-process-grid">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article key={step.title} className="contact-process-step">
                  <span className="contact-process-number">{index + 1}</span>

                  <div className="contact-process-icon">
                    <Icon size={30} />
                  </div>

                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="contact-availability-section">
        <div className="container contact-availability-card">
          <div className="contact-availability-content">
            <div className="contact-availability-icon">
              <ShieldCheck size={34} />
            </div>

            <div>
              <p className="eyebrow">Inventory Availability</p>
              <h2>Confirm Before Final Planning</h2>
              <p>
                Online inventory is intended as a live reference, but natural
                stone moves quickly. Availability, pricing, and holds should be
                confirmed directly with Whitestone before final project planning.
              </p>
            </div>
          </div>

          <div className="contact-availability-image">
            <img
              src="/images/contact/contact-inventory-strip.png"
              alt="Premium stone kitchen island and slab detail"
            />
          </div>
        </div>
      </section>

      <section className="contact-service-section" id="service-area">
        <div className="container contact-service-grid">
          <div className="contact-service-image">
            <img
              src="/images/contact/contact-service-area.png"
              alt="Whitestone Distribution Utah service area"
            />
          </div>

          <div className="contact-service-content">
            <p className="eyebrow">Service Area</p>
            <h2>Serving Utah Projects and Fabricators</h2>
            <p>
              Whitestone Distribution supports homeowners, designers, builders,
              and fabricators throughout Utah Valley and the greater Salt Lake
              region.
            </p>

            <div className="contact-service-points">
              <span>
                <MapPin size={18} />
                Utah Valley
              </span>

              <span>
                <MapPin size={18} />
                Salt Lake Region
              </span>

              <span>
                <Warehouse size={18} />
                Fabricator Pickup / Coordination
              </span>

              <span>
                <Clock size={18} />
                Appointment-Based Slab Viewing
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-final-cta-section">
        <div className="container contact-final-cta">
          <div className="contact-final-brand" aria-hidden="true">
            <img src="/logo/whitestone-logo-transparent.png" alt="" />
          </div>

          <p className="eyebrow">Ready to Check a Slab?</p>
          <h2>Call or Send an Inquiry With the Slab Name, Project Type, and Timeline.</h2>
          <p>
            We’ll help confirm availability, pricing, holds, and the next steps
            for your project.
          </p>

          <div className="contact-final-actions">
            <a href="tel:8015550199" className="btn btn-primary">
              <Phone size={18} />
              Call to Reserve
            </a>

            <Link to="/live-inventory" className="btn btn-secondary">
              <Warehouse size={18} />
              View Live Inventory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}