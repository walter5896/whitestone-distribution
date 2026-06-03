import { NavLink } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <img
            src="/logo/whitestone-logo-transparent.png"
            alt="Whitestone Distribution logo"
            className="footer-logo"
          />
          <h2 className="footer-brand">Whitestone Distribution</h2>
          <p>
            Your trusted source for premium natural and engineered stone.
            Live inventory, direct communication, and dependable service.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/live-inventory">Live Inventory</NavLink>
          <NavLink to="/materials">Materials</NavLink>
          <NavLink to="/fabricators">Fabricators</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div>
          <h3>Contact</h3>
          <p>
            <Phone size={15} /> (801) 555-0199
          </p>
          <p>
            <Mail size={15} /> sales@whitestonedistribution.com
          </p>
          <p>
            <MapPin size={15} /> Utah Valley, Utah
          </p>
          <p>By appointment / call ahead</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Whitestone Distribution. All rights reserved.
      </div>
    </footer>
  );
}