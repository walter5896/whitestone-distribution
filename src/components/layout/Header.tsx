import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";

const navItems = [
  { label: "Live Inventory", path: "/live-inventory" },
  { label: "Materials", path: "/materials" },
  { label: "Fabricators", path: "/fabricators" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink
          to="/"
          className="brand"
          aria-label="Whitestone home"
          onClick={closeMenu}
        >
          <img
            src="/logo/whitestone-logo-transparent.png"
            alt="Whitestone logo"
            className="brand-logo"
          />

          <span className="brand-text" aria-hidden="true">
            <span className="brand-name">Whitestone</span>
            <span className="brand-tagline">Wholesale Slab Distribution</span>
          </span>
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

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav
        className={isMenuOpen ? "mobile-nav open" : "mobile-nav"}
        aria-label="Mobile navigation"
      >
        <div className="container mobile-nav-inner">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "mobile-nav-link active" : "mobile-nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}

          <a
            href="tel:8015550199"
            className="mobile-nav-cta"
            onClick={closeMenu}
          >
            <Phone size={17} />
            Call to Reserve
          </a>
        </div>
      </nav>
    </header>
  );
}