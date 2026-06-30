import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Material } from "../../types/material";

type MaterialCardProps = {
  material: Material;
};

export function MaterialCard({ material }: MaterialCardProps) {
  return (
    <article className={`material-page-card ${material.visualClass}`}>
      <div className="material-page-card-overlay" />

      <div className="material-page-card-content">
        <p className="eyebrow">Stone Type</p>
        <h2>{material.name}</h2>
        <p>{material.description}</p>

        <Link
          to={`/live-inventory?material=${material.slug}`}
          className="material-card-link"
        >
          View Inventory
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}
