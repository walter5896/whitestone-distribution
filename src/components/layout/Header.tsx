import { NavLink } from "react-router-dom";
import { Phone } from "lucide-react";

const navItems = [
  { label: "Live Inventory", path: "/live-inventory" },
  { label: "Materials", path: "/materials" },
  { label: "Fabricators", path: "/fabricators" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand" aria-label="Whitestone Distribution home">
          <img
            src="/logo/whitestone-logo-transparent.png"
            alt="Whitestone Distribution logo"
            className="brand-logo"
          />
        </NavLink>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a href="tel:8015550199" className="header-cta">
          <Phone size={16} />
          Call to Reserve
        </a>
      </div>
    </header>
  );
}