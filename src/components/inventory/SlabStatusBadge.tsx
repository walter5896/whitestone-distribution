import type { SlabStatus } from "../../types/slab";

type SlabStatusBadgeProps = {
  status: SlabStatus;
};

const statusLabels: Record<SlabStatus, string> = {
  available: "Available",
  on_hold: "On Hold",
  sold: "Sold",
  limited: "Limited",
};

export function SlabStatusBadge({ status }: SlabStatusBadgeProps) {
  return (
    <span className={`slab-status-badge slab-status-${status}`}>
      {statusLabels[status]}
    </span>
  );
}