const steps = [
  {
    number: "01",
    title: "Browse Current Inventory",
    text: "Explore available slabs by material, color, finish, thickness, and status. Featured and fast-moving materials may change quickly.",
  },
  {
    number: "02",
    title: "Review the Details",
    text: "Open slab details to view dimensions, style tags, availability, and material notes. Lot, bundle, and slab numbering can be confirmed directly with Whitestone.",
  },
  {
    number: "03",
    title: "Call to Confirm",
    text: "Pricing, availability, trade discounts, pre-arrival opportunities, and hold options are confirmed through direct conversation with our team.",
  },
  {
    number: "04",
    title: "Reserve, Pickup, or Deliver",
    text: "Serious buyers may request a hold after speaking with management. Fabricators can coordinate pickup or delivery depending on timing, distance, and availability.",
  },
];

export function HowItWorks() {
  return (
    <section className="home-section how-section">
      <div className="container">
        <div className="how-header">
          <p className="eyebrow">How It Works</p>
          <h2>Live Inventory. Real Guidance. Serious Holds.</h2>
          <p>
            Whitestone keeps the process direct so homeowners, builders,
            designers, and fabricators can get accurate answers before making a
            commitment.
          </p>
        </div>

        <div className="how-grid">
          {steps.map((step) => (
            <article key={step.number} className="how-card">
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}