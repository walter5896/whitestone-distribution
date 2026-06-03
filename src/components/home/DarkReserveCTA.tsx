import { Phone } from "lucide-react";

export function DarkReserveCTA() {
  return (
    <section className="dark-reserve-section">
      <div className="container dark-reserve-card">
        <div className="dark-phone-icon">
          <Phone size={42} />
        </div>

        <div>
          <p className="eyebrow">Ready to Reserve?</p>
          <h2>Call directly for pricing and availability.</h2>
          <p>
            Pricing is not listed online. Call to confirm current availability,
            pricing, and to reserve your slab.
          </p>
        </div>

        <a href="tel:8015550199" className="dark-reserve-button">
          <Phone size={18} />
          (801) 555-0199
        </a>
      </div>
    </section>
  );
}