import { Link } from "react-router-dom";
import { mockMaterials } from "../../data/mockMaterials";
import { SectionHeading } from "../ui/SectionHeading";

export function MaterialsPreview() {
  return (
    <section className="home-section materials-preview-section">
      <div className="container">
        <SectionHeading
          eyebrow="Materials"
          title="Shop by Stone Type"
          description="Organize inventory by the materials fabricators, designers, builders, and homeowners already search for."
        />

        <div className="materials-grid">
          {mockMaterials.map((material) => (
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