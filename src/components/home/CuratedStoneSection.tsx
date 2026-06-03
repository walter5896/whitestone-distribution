import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const materials = [
  {
    name: "Quartzite",
    imageUrl: "/images/slabs/taj-mahal-quartzite.png",
  },
  {
    name: "Marble",
    imageUrl: "/images/slabs/calacatta-gold-marble.png",
  },
  {
    name: "Granite",
    imageUrl: "/images/slabs/gray-marble.png",
  },
  {
    name: "Exotic Stone",
    imageUrl: "/images/slabs/black-fusion-granite.png",
  },
];

export function CuratedStoneSection() {
  return (
    <section className="curated-stone-section">
      <div className="container curated-grid">
        <div className="curated-copy">
          <p className="eyebrow">Curated. Crafted. Delivered.</p>
          <h2>Stone That Defines Extraordinary Spaces</h2>
          <div className="curated-rule" />
          <p>
            From timeless classics to rare exotics, our collection is selected
            for beauty, performance, and lasting value.
          </p>

          <Link to="/materials" className="btn btn-primary">
            Explore Our Stone Collection
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="stone-tile-grid">
          {materials.map((material) => (
            <Link key={material.name} to="/materials" className="stone-tile">
              <img src={material.imageUrl} alt={`${material.name} stone`} />
              <span>{material.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}