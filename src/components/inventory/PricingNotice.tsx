import { Phone } from "lucide-react";

export function PricingNotice() {
  return (
    <div className="pricing-notice">
      <Phone size={18} />
      <p>
        Pricing and reservation are confirmed directly by phone. Availability is
        updated regularly but not guaranteed until confirmed.
      </p>
    </div>
  );
}