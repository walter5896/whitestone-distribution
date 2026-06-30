import { Phone } from "lucide-react";

export function DarkReserveCTA() {
  return (
    <section className="dark-reserve-section">
      <div className="container dark-reserve-card">
        <div className="dark-phone-icon">
          <Phone size={42} />
        </div>

        <div>
          <p className="eyebrow">Pricing + Availability</p>
          <h2>Call directly before reserving material.</h2>
          <p>
            Pricing, availability, holds, pre-arrival options, and trade
            discounts are confirmed directly with Whitestone.
          </p>
        </div>

        <a href="tel:8014009496" className="dark-reserve-button">
          <Phone size={18} />
          (801) 400-9496
        </a>
      </div>
    </section>
  );
}
