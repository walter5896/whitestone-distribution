import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const looks = [
  {
    title: "Taj Mahal Look",
    description: "Warm cream and gold movement.",
    visualClass: "look-taj",
  },
  {
    title: "White & Gold Veining",
    description: "Bright luxury stone with soft warmth.",
    visualClass: "look-white-gold",
  },
  {
    title: "Black Dramatic Stone",
    description: "Bold slabs with high-contrast movement.",
    visualClass: "look-black",
  },
  {
    title: "Exotic Green & Blue",
    description: "Rare statement slabs with color.",
    visualClass: "look-green",
  },
];

export function TrendingLooksPreview() {
  return (
    <section className="home-section trending-section">
      <div className="container">
        <SectionHeading
          eyebrow="Trending Looks"
          title="Browse by the Look Customers Are Asking For"
          description="Customers often know the style before they know the stone name. These categories help them find the right direction fast."
        />

        <div className="trending-grid">
          {looks.map((look) => (
            <article key={look.title} className={`trending-card ${look.visualClass}`}>
              <div>
                <h3>{look.title}</h3>
                <p>{look.description}</p>
              </div>
              <span className="trending-arrow">
                <ArrowRight size={18} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}