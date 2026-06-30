import type { Material } from "../../types/material";
import { MaterialCard } from "./MaterialCard";

type MaterialGridProps = {
  materials: Material[];
};

export function MaterialGrid({ materials }: MaterialGridProps) {
  return (
    <div className="material-page-grid">
      {materials.map((material) => (
        <MaterialCard key={material.id} material={material} />
      ))}
    </div>
  );
}
