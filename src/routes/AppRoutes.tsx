import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";

import { Home } from "../pages/Home";
import { LiveInventory } from "../pages/LiveInventory";
import { SlabDetail } from "../pages/SlabDetail";
import { Materials } from "../pages/Materials";
import { Fabricators } from "../pages/Fabricators";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { NotFound } from "../pages/NotFound";

import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminLogin } from "../pages/admin/AdminLogin";
import { AdminInquiries } from "../pages/admin/AdminInquiries";
import { ProtectedAdminRoute } from "../components/admin/ProtectedAdminRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/live-inventory" element={<LiveInventory />} />
        <Route path="/live-inventory/:slug" element={<SlabDetail />} />

        <Route path="/materials" element={<Materials />} />
        <Route path="/fabricators" element={<Fabricators />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/inquiries"
          element={
            <ProtectedAdminRoute>
              <AdminInquiries />
            </ProtectedAdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}