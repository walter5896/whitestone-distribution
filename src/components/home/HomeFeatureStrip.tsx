import { Crown, Handshake, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "45 Years Experience",
    text: "Stone industry knowledge built through decades of sourcing, fabrication, and distribution.",
  },
  {
    icon: Crown,
    title: "Premium Selection",
    text: "Rare quartzite, dolomite, granite, soapstone, and statement materials selected for quality.",
  },
  {
    icon: Handshake,
    title: "Trade Friendly",
    text: "Confidential fabricator pricing, direct communication, and flexible project support.",
  },
  {
    icon: Truck,
    title: "Pickup + Delivery",
    text: "Coordinate slab pickup or delivery depending on project timing, distance, and availability.",
  },
];

export function HomeFeatureStrip() {
  return (
    <section className="home-feature-strip">
      <div className="feature-strip-grid">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article key={feature.title} className="feature-strip-item">
              <div className="feature-strip-icon">
                <Icon size={48} strokeWidth={1.45} />
              </div>

              <div className="feature-strip-content">
                <h2>{feature.title}</h2>
                <p>{feature.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}