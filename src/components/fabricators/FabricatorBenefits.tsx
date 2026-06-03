import {
  BadgeDollarSign,
  Boxes,
  Clock,
  Eye,
  Phone,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Boxes,
    title: "Live Inventory Visibility",
    text: "Browse current slabs, new arrivals, remnants, and availability without waiting on a callback.",
  },
  {
    icon: BadgeDollarSign,
    title: "Competitive Direct Pricing",
    text: "Pricing stays direct and relationship-based instead of being displayed publicly to every visitor.",
  },
  {
    icon: Clock,
    title: "Fast Availability Checks",
    text: "Fabricators can quickly see what is available, what is limited, and what needs a direct call.",
  },
  {
    icon: Eye,
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

export function FabricatorBenefits() {
  return (
    <section className="fabricator-benefits-section">
      <div className="container">
        <div className="fabricator-section-header">
          <p className="eyebrow">Trade Benefits</p>
          <h2>Built Around How Fabricators Actually Work.</h2>
          <p>
            The first version keeps things simple: full inventory visibility,
            direct calls, and a clean path to pricing and reservation. Trade
            pricing access can be added once the inventory system is stable.
          </p>
        </div>

        <div className="fabricator-benefits-grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article key={benefit.title} className="fabricator-benefit-card">
                <div className="fabricator-benefit-icon">
                  <Icon size={24} />
                </div>

                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}