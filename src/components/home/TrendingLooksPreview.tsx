import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const looks = [
  {
    title: "Taj Mahal Quartzite Look",
    description:
      "Warm cream, soft gold, and refined movement — one of Whitestone’s strongest recommendations for luxury homes.",
    visualClass: "look-taj",
  },
  {
    title: "White & Gold Veining",
    description:
      "Bright, elevated stone with warmth, contrast, and timeless high-end appeal.",
    visualClass: "look-white-gold",
  },
  {
    title: "Black Dramatic Stone",
    description:
      "Bold slabs with deep contrast, strong movement, and statement-making presence.",
    visualClass: "look-black",
  },
  {
    title: "Exotic Green & Blue",
    description:
      "Rare colorful slabs, crystal-like movement, and materials customers may not know they want until they see them.",
    visualClass: "look-green",
  },
  {
    title: "Pre-Arrival Picks",
    description:
      "Select materials in transit or processing that may be available before they reach open market inventory.",
    visualClass: "look-prearrival",
  },
];

export function TrendingLooksPreview() {
  return (
    <section className="home-section trending-section">
      <div className="container">
        <SectionHeading
          eyebrow="Top 5 Trending Looks"
          title="Browse by the Look Customers Are Asking For"
          description="Many customers know the feeling they want before they know the stone name. These trending looks help homeowners, builders, designers, and fabricators find the right direction quickly."
        />

        <div className="trending-grid">
          {looks.map((look) => (
            <Link
              key={look.title}
              to="/materials"
              className={`trending-card ${look.visualClass}`}
            >
              <div>
                <h3>{look.title}</h3>
                <p>{look.description}</p>
              </div>

              <span className="trending-arrow">
                <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}