import { Link } from "react-router-dom";
import { SectionHeading } from "../ui/SectionHeading";

const materials = [
  {
    id: "quartzite",
    name: "Quartzite",
    description:
      "A top Whitestone recommendation for luxury projects — durable, refined, and known for dramatic natural movement.",
    visualClass: "material-quartzite",
  },
  {
    id: "dolomite",
    name: "Dolomite",
    description:
      "Dense, elegant natural stone selected for strength, sophistication, and soft marble-like character.",
    visualClass: "material-marble",
  },
  {
    id: "granite",
    name: "Granite",
    description:
      "High-quality natural stone with proven performance, rich variation, and long-term durability.",
    visualClass: "material-granite",
  },
  {
    id: "soapstone",
    name: "Soapstone",
    description:
      "A timeless, tactile material with a distinct feel, deep character, and a refined architectural look.",
    visualClass: "material-soapstone",
  },
  {
    id: "rare-exotics",
    name: "Rare Exotics",
    description:
      "Statement slabs, crystal materials, semi-precious looks, and rare selections sourced for unforgettable spaces.",
    visualClass: "material-exotic",
  },
  {
    id: "pre-arrival",
    name: "Pre-Arrival Materials",
    description:
      "Select materials may be available before they reach open market inventory, with pricing confirmed directly.",
    visualClass: "material-prearrival",
  },
];

export function MaterialsPreview() {
  return (
    <section className="home-section materials-preview-section">
      <div className="container">
        <SectionHeading
          eyebrow="Materials"
          title="Premium Stone Categories"
          description="Explore the materials Whitestone actively sources for homeowners, builders, designers, and fabricators who want quality, rarity, and long-term value."
        />

        <div className="materials-grid">
          {materials.map((material) => (
            <Link
              key={material.id}
              to="/materials"
              className={`material-card ${material.visualClass}`}
            >
              <div>
                <h3>{material.name}</h3>
                <p>{material.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}