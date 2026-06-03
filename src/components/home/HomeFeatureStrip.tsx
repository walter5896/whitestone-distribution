import { Crown, Handshake, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    text: "Carefully sourced stone from the world's most respected quarries.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    text: "Direct coordination with dependable access you can count on.",
  },
  {
    icon: Handshake,
    title: "Industry Partners",
    text: "Proudly serving fabricators, builders, designers, and architects.",
  },
  {
    icon: Crown,
    title: "Exceptional Service",
    text: "Dedicated to building lasting relationships through expertise and care.",
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