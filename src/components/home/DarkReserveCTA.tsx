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

        <a href="tel:8015550199" className="dark-reserve-button">
          <Phone size={18} />
          (801) 555-0199
        </a>
      </div>
    </section>
  );
}