import { ArrowRight, Building2, Hammer, Home } from "lucide-react";
import { Link } from "react-router-dom";

const audiences = [
  {
    icon: Home,
    label: "For Homeowners",
    text: "Explore premium natural stone for custom homes, kitchens, bathrooms, fireplaces, feature walls, and statement spaces. Our team helps you understand the material before you commit.",
    link: "Explore Materials",
    path: "/materials",
  },
  {
    icon: Hammer,
    label: "For Fabricators",
    text: "Request confidential trade pricing, check availability, coordinate pickup or delivery, and work with a supplier that understands your customer relationship matters.",
    link: "Request Trade Pricing",
    path: "/fabricators",
  },
  {
    icon: Building2,
    label: "For Builders + Designers",
    text: "Source rare quartzite, dense dolomite, granite, soapstone, and pre-arrival materials for luxury projects, multi-home builds, and clients who want something beyond ordinary.",
    link: "Browse Live Inventory",
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