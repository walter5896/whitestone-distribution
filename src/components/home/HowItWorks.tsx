const steps = [
  {
    number: "01",
    title: "Browse Live Inventory",
    text: "Search available slabs by material, color, thickness, finish, and status.",
  },
  {
    number: "02",
    title: "Find the Slab",
    text: "Open slab details to view dimensions, style tags, availability, and notes.",
  },
  {
    number: "03",
    title: "Call for Pricing",
    text: "Pricing is handled directly so availability and details can be confirmed.",
  },
  {
    number: "04",
    title: "Reserve Direct",
    text: "Slabs are not held until confirmed by phone with Whitestone Distribution.",
  },
];

export function HowItWorks() {
  return (
    <section className="home-section how-section">
      <div className="container">
        <div className="how-header">
          <p className="eyebrow">How It Works</p>
          <h2>Simple Inventory. Direct Conversation.</h2>
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