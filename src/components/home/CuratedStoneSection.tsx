import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const materials = [
  {
    name: "Quartzite",
    imageUrl: "/images/slabs/taj-mahal-quartzite.png",
  },
  {
    name: "Dolomite",
    imageUrl: "/images/slabs/calacatta-gold-marble.png",
  },
  {
    name: "Granite",
    imageUrl: "/images/slabs/gray-marble.png",
  },
  {
    name: "Rare Exotics",
    imageUrl: "/images/slabs/black-fusion-granite.png",
  },
];

export function CuratedStoneSection() {
  return (
    <section className="curated-stone-section">
      <div className="container curated-grid">
        <div className="curated-copy">
          <p className="eyebrow">Personally Sourced. Carefully Selected.</p>
          <h2>Premium Stone Chosen With Experience</h2>
          <div className="curated-rule" />

          <p>
            From rare quartzite and dense dolomite to granite, soapstone, and
            statement exotics, Whitestone selects premium natural stone for
            beauty, quality, and lasting value.
          </p>

          <Link to="/materials" className="btn btn-primary">
            Explore Materials
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
