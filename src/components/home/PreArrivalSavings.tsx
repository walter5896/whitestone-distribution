import { ArrowRight, Phone, Sparkles, Warehouse } from "lucide-react";
import { Link } from "react-router-dom";

export function PreArrivalSavings() {
  return (
    <section className="pre-arrival-section">
      <div className="container pre-arrival-card">
        <div className="pre-arrival-content">
          <p className="eyebrow">Pre-Arrival Offerings</p>

          <h2>Pre-Arrival Savings on Quartz & Marble</h2>

          <p>
            Get early access to select incoming quartz and marble before they
            arrive. WHITESTONE offers pre-arrival savings on premium materials
            for fabricators, designers, builders, and project buyers planning
            ahead.
          </p>

          <p>
            Incoming materials and hold options are handled directly by phone.
            Call to confirm available colors, estimated arrival, pricing, and
            reservation details.
          </p>

          <div className="pre-arrival-actions">
            <a href="tel:8014009496" className="btn btn-primary">
              <Phone size={18} />
              Call About Pre-Arrival Savings
            </a>

            <Link to="/live-inventory" className="btn btn-secondary">
              <Warehouse size={18} />
              View Live Inventory
            </Link>
          </div>
        </div>

        <div className="pre-arrival-highlights" aria-label="Pre-arrival benefits">
          <div className="pre-arrival-highlight">
            <Sparkles size={24} />
            <span>Quartz & Marble Only</span>
          </div>

          <div className="pre-arrival-highlight">
            <ArrowRight size={24} />
            <span>Early Access Before Arrival</span>
          </div>

          <div className="pre-arrival-highlight">
            <Phone size={24} />
            <span>Holds Handled by Phone</span>
          </div>
        </div>
      </div>
    </section>
  );
}
