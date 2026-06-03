import {
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Warehouse,
} from "lucide-react";
import { ContactForm } from "../components/forms/ContactForm";
import { FabricatorInquiryForm } from "../components/forms/FabricatorInquiryForm";

const contactCards = [
  {
    icon: Phone,
    title: "Call for Pricing",
    text: "(801) 555-0199",
    detail: "Pricing and reservation are confirmed directly by phone.",
  },
  {
    icon: Mail,
    title: "Email",
    text: "sales@whitestonedistribution.com",
    detail: "Use for general questions, inventory requests, or trade inquiries.",
  },
  {
    icon: MapPin,
    title: "Location",
    text: "Utah Valley, Utah",
    detail: "Final slab yard or showroom address can be added here.",
  },
  {
    icon: Clock,
    title: "Hours",
    text: "By appointment / call ahead",
    detail: "Hours can be updated once the business schedule is confirmed.",
  },
];

export function Contact() {
  return (
    <>
      <section className="contact-hero">
        <div className="container contact-hero-grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h1>Call Directly for Pricing, Availability, and Reservation.</h1>
            <p>
              Whitestone Distribution is built around direct communication.
              Browse the live inventory first, then call to confirm pricing,
              current availability, and reservation details.
            </p>

            <div className="contact-hero-actions">
              <a href="tel:8015550199" className="btn btn-primary">
                <Phone size={18} />
                Call Whitestone
              </a>

              <a href="/live-inventory" className="btn btn-secondary">
                <Warehouse size={18} />
                Browse Inventory
              </a>
            </div>
          </div>

          <div className="contact-hero-panel">
            <ShieldCheck size={34} />
            <h2>Inventory Disclaimer</h2>
            <p>
              Inventory is updated regularly, but availability, pricing, and
              reservation are not guaranteed until confirmed directly by phone.
            </p>
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
                  <Icon size={23} />
                </div>

                <h2>{card.title}</h2>
                <strong>{card.text}</strong>
                <p>{card.detail}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="contact-forms-section">
        <div className="container contact-forms-grid">
          <div>
            <p className="eyebrow">General Inquiry</p>
            <h2>Ask About Inventory or Availability.</h2>
            <p>
              Use this for general questions, material questions, current slab
              availability, or call-back requests.
            </p>

            <ContactForm />
          </div>

          <div>
            <p className="eyebrow">Fabricator Inquiry</p>
            <h2>Trade or Fabricator Request.</h2>
            <p>
              Use this for trade-focused questions, slab holds, future pricing
              access, or recurring inventory needs.
            </p>

            <FabricatorInquiryForm />
          </div>
        </div>
      </section>

      <section className="contact-map-section">
        <div className="container">
          <div className="contact-map-placeholder">
            <MapPin size={34} />
            <h2>Slab Yard / Showroom Location</h2>
            <p>
              Add the final business address and embedded map once the location
              details are confirmed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}