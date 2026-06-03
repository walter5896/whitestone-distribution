import { ArrowRight, Building2, Hammer, Home } from "lucide-react";
import { Link } from "react-router-dom";

const audiences = [
  {
    icon: Home,
    label: "For Homeowners",
    text: "Browse premium stone slabs for kitchens, bathrooms, fireplaces, feature walls, and more.",
    link: "Explore Materials",
    path: "/materials",
  },
  {
    icon: Hammer,
    label: "For Fabricators",
    text: "Live inventory built for your workflow. Fast access, direct pricing, and slab holds by phone.",
    link: "Visit Fabricator Page",
    path: "/fabricators",
  },
  {
    icon: Building2,
    label: "For Industries",
    text: "Serving builders, designers, architects, and stone professionals with premium material.",
    link: "Browse Inventory",
    path: "/live-inventory",
  },
];

export function AudiencePathways() {
  return (
    <section className="audience-section">
      <div className="container audience-grid">
        {audiences.map((audience) => {
          const Icon = audience.icon;

          return (
            <article key={audience.label} className="audience-card">
              <div className="audience-icon">
                <Icon size={34} />
              </div>

              <p className="audience-label">{audience.label}</p>
              <p>{audience.text}</p>

              <Link to={audience.path} className="audience-link">
                {audience.link}
                <ArrowRight size={16} />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}