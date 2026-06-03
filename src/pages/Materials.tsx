import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { MaterialGrid } from "../components/materials/MaterialGrid";
import { InventoryCard } from "../components/inventory/InventoryCard";
import { mockMaterials } from "../data/mockMaterials";
import { mockSlabs } from "../data/mockSlabs";

const materialNotes = [
  {
    title: "Granite",
    text: "Durable natural stone with strong pattern variation and long-term performance for kitchens, islands, bathrooms, and commercial spaces.",
  },
  {
    title: "Quartzite",
    text: "A premium natural stone known for strength, movement, and luxury looks like Taj Mahal, warm creams, gold veining, and dramatic exotic slabs.",
  },
  {
    title: "Marble",
    text: "Classic, elegant, and visually refined. Best for clients who want natural veining and understand the care expectations of softer stone.",
  },
  {
    title: "Quartz",
    text: "Engineered consistency, clean colors, and practical performance. Good for clients who want a controlled look and easy maintenance.",
  },
];

export function Materials() {
  const featuredSlabs = mockSlabs.slice(0, 3);

  return (
    <>
      <section className="materials-hero">
        <div className="container materials-hero-grid">
          <div>
            <p className="eyebrow">Materials</p>
            <h1>Shop Stone by Type, Look, and Availability.</h1>
            <p>
              Browse granite, quartzite, marble, quartz, and exotic stone
              categories before checking current live inventory. Pricing and
              reservation are handled directly by phone.
            </p>

            <div className="materials-hero-actions">
              <Link to="/live-inventory" className="btn btn-primary">
                View Live Inventory
              </Link>

              <a href="tel:8015550199" className="btn btn-secondary">
                <Phone size={17} />
                Call for Pricing
              </a>
            </div>
          </div>

          <div className="materials-hero-visual">
            <span>Stone Type Catalog</span>
          </div>
        </div>
      </section>

      <section className="materials-section">
        <div className="container">
          <div className="materials-section-header">
            <p className="eyebrow">Stone Categories</p>
            <h2>Material Types</h2>
            <p>
              Keep the site easy for fabricators, designers, builders, and
              homeowners by organizing slabs around the terms people already
              search for.
            </p>
          </div>

          <MaterialGrid materials={mockMaterials} />
        </div>
      </section>

      <section className="material-education-section">
        <div className="container">
          <div className="materials-section-header">
            <p className="eyebrow">Quick Guide</p>
            <h2>Help Buyers Understand the Difference.</h2>
            <p>
              This section can later be expanded into full resource pages, but
              for the first version it gives visitors enough context to browse
              the live inventory with confidence.
            </p>
          </div>

          <div className="material-notes-grid">
            {materialNotes.map((note) => (
              <article key={note.title} className="material-note-card">
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="materials-inventory-section">
        <div className="container">
          <div className="materials-section-header">
            <p className="eyebrow">Featured Inventory</p>
            <h2>Available Slabs by Material.</h2>
            <p>
              These sample cards preview how material pages can connect directly
              into the live inventory system.
            </p>
          </div>

          <div className="materials-featured-inventory">
            {featuredSlabs.map((slab) => (
              <InventoryCard key={slab.id} slab={slab} />
            ))}
          </div>

          <div className="materials-bottom-action">
            <Link to="/live-inventory" className="btn btn-primary">
              Browse All Inventory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}