import { Phone } from "lucide-react";

export function HomeCTA() {
  return (
    <section className="home-cta">
      <div className="container home-cta-inner">
        <div>
          <p className="eyebrow">Call to Reserve</p>
          <h2>Need pricing or want to reserve a slab?</h2>
          <p>
            Inventory and pricing are confirmed directly. Call for current
            availability and reservation details.
          </p>
        </div>

        <a href="tel:8015550199" className="btn btn-primary">
          <Phone size={18} />
          Call Whitestone
        </a>
      </div>
    </section>
  );
}