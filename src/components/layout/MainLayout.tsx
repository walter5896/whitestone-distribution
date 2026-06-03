import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function MainLayout() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}