import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FabricatorBenefits } from "../components/fabricators/FabricatorBenefits";
import { FabricatorCTA } from "../components/fabricators/FabricatorCTA";
import { FabricatorHero } from "../components/fabricators/FabricatorHero";

const workflowSteps = [
  {
    title: "Browse Current Inventory",
    text: "Search slabs by material, color family, thickness, finish, availability, and style.",
  },
  {
    title: "Open Slab Details",
    text: "Review dimensions, material type, status, finish, style tags, and notes before calling.",
  },
  {
    title: "Call for Pricing",
    text: "Pricing is handled directly so the details can be confirmed before quoting a job.",
  },
  {
    title: "Reserve by Phone",
    text: "Reservation requests are not guaranteed until confirmed directly with Whitestone.",
  },
];

const accessOptions = [
  "Public inventory with no pricing",
  "Call-for-pricing on every slab",
  "Future fabricator trade code",
  "Future private access link",
  "Future approved email or magic link",
];

export function Fabricators() {
  return (
    <>
      <FabricatorHero />
      <FabricatorBenefits />

      <section className="fabricator-workflow-section">
        <div className="container fabricator-workflow-grid">
          <div>
            <p className="eyebrow">Workflow</p>
            <h2>Simple for Fabricators. Controlled for Whitestone.</h2>
            <p>
              The site should make it easy for fabricators to find available
              slabs without giving up control over pricing, holds, or customer
              relationships.
            </p>

            <Link to="/live-inventory" className="workflow-link">
              Browse live inventory
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="workflow-step-list">
            {workflowSteps.map((step, index) => (
              <article key={step.title} className="workflow-step-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="trade-access-section">
        <div className="container trade-access-grid">
          <div className="trade-access-card">
            <p className="eyebrow">Trade Pricing Later</p>
            <h2>Fabricator pricing can be added without making the whole site private.</h2>
            <p>
              Version one can keep pricing off the public site. Later, approved
              fabricators can unlock pricing with a trade code, private access
              link, or passwordless email access.
            </p>
          </div>

          <div className="trade-access-list">
            {accessOptions.map((option) => (
              <div key={option}>
                <CheckCircle2 size={18} />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FabricatorCTA />
    </>
  );
}