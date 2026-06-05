import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Gem,
  Inbox,
  LayoutDashboard,
  LogOut,
  Star,
  ToggleRight,
} from "lucide-react";
import { getAdminInquiries, getAdminSlabs } from "../../lib/adminQueries";
import type { AdminInquiry } from "../../lib/adminQueries";
import { signOutAdmin } from "../../lib/authQueries";
import type { Slab } from "../../types/slab";

export function AdminDashboard() {
  const navigate = useNavigate();

  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [slabs, setSlabs] = useState<Slab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadAdminDashboard() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const [liveInquiries, liveSlabs] = await Promise.all([
          getAdminInquiries(),
          getAdminSlabs(),
        ]);

        setInquiries(liveInquiries);
        setSlabs(liveSlabs);
      } catch (error) {
        console.error("Failed to load admin dashboard:", error);
        setErrorMessage(
          "Admin data could not be loaded. This may be an admin permission or session issue."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadAdminDashboard();
  }, []);

  async function handleSignOut() {
    try {
      setIsSigningOut(true);
      await signOutAdmin();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error("Failed to sign out:", error);
      setErrorMessage("Could not sign out. Please refresh and try again.");
    } finally {
      setIsSigningOut(false);
    }
  }

  const stats = useMemo(() => {
    const activeSlabs = slabs.filter((slab) => slab.status !== "sold");
    const featuredSlabs = slabs.filter((slab) => slab.isFeatured);
    const newArrivals = slabs.filter((slab) => slab.isNewArrival);
    const newInquiries = inquiries.filter(
      (inquiry) => !inquiry.status || inquiry.status === "new"
    );

    return {
      totalSlabs: slabs.length,
      activeSlabs: activeSlabs.length,
      featuredSlabs: featuredSlabs.length,
      newArrivals: newArrivals.length,
      totalInquiries: inquiries.length,
      newInquiries: newInquiries.length,
    };
  }, [inquiries, slabs]);

  const recentInquiries = inquiries.slice(0, 5);
  const recentSlabs = slabs.slice(0, 5);

  return (
    <section className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h1>Whitestone Management</h1>
            <p>
              Manage live inventory, review customer inquiries, and prepare the
              site for admin-controlled content.
            </p>
          </div>

          <div className="admin-header-actions">
            <Link to="/admin/inquiries" className="btn btn-primary">
              Manage Inquiries
              <ArrowRight size={16} />
            </Link>

            <Link to="/live-inventory" className="btn btn-secondary">
              View Public Inventory
              <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              className="btn btn-secondary admin-sign-out-button"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              <LogOut size={16} />
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="admin-state-card">
            <h2>Loading admin dashboard...</h2>
            <p>Pulling inventory and inquiry data from Supabase.</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="admin-state-card admin-error-card">
            <h2>Admin data unavailable</h2>
            <p>{errorMessage}</p>
          </div>
        )}

        {!isLoading && !errorMessage && (
          <>
            <div className="admin-stat-grid">
              <article className="admin-stat-card">
                <Gem size={24} />
                <span>Total Slabs</span>
                <strong>{stats.totalSlabs}</strong>
              </article>

              <article className="admin-stat-card">
                <ToggleRight size={24} />
                <span>Active Inventory</span>
                <strong>{stats.activeSlabs}</strong>
              </article>

              <article className="admin-stat-card">
                <Star size={24} />
                <span>Featured Slabs</span>
                <strong>{stats.featuredSlabs}</strong>
              </article>

              <Link
                to="/admin/inquiries"
                className="admin-stat-card admin-stat-link-card"
              >
                <Inbox size={24} />
                <span>New Inquiries</span>
                <strong>{stats.newInquiries}</strong>
              </Link>
            </div>

            <div className="admin-action-grid">
              <Link to="/admin/inquiries" className="admin-action-card">
                <Inbox size={24} />
                <div>
                  <span>Leads</span>
                  <strong>Manage All Inquiries</strong>
                  <p>
                    View full messages, update lead status, and remove test or
                    spam submissions.
                  </p>
                </div>
                <ArrowRight size={18} />
              </Link>

              <div className="admin-action-card admin-action-card-disabled">
                <LayoutDashboard size={24} />
                <div>
                  <span>Inventory</span>
                  <strong>Manage Slabs</strong>
                  <p>
                    Coming next: add, edit, archive, feature, and update slab
                    availability from the admin area.
                  </p>
                </div>
              </div>
            </div>

            <div className="admin-grid">
              <article className="admin-panel">
                <div className="admin-panel-header">
                  <div>
                    <p className="eyebrow">Customer Leads</p>
                    <h2>Recent Inquiries</h2>
                  </div>
                  <Inbox size={22} />
                </div>

                {recentInquiries.length === 0 ? (
                  <p>No inquiries yet.</p>
                ) : (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Contact</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentInquiries.map((inquiry) => (
                          <tr key={inquiry.id}>
                            <td>{inquiry.name}</td>
                            <td>{inquiry.inquiry_type}</td>
                            <td>
                              {inquiry.phone || inquiry.email || "No contact"}
                            </td>
                            <td>
                              <span className="admin-status-pill">
                                {inquiry.status || "new"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="admin-panel-footer">
                  <Link to="/admin/inquiries" className="btn btn-secondary">
                    View All Inquiries
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>

              <article className="admin-panel">
                <div className="admin-panel-header">
                  <div>
                    <p className="eyebrow">Inventory</p>
                    <h2>Recent Slabs</h2>
                  </div>
                  <LayoutDashboard size={22} />
                </div>

                {recentSlabs.length === 0 ? (
                  <p>No slabs found.</p>
                ) : (
                  <div className="admin-slab-list">
                    {recentSlabs.map((slab) => (
                      <Link
                        key={slab.id}
                        to={`/live-inventory/${slab.slug}`}
                        className="admin-slab-row"
                      >
                        <div>
                          <strong>{slab.name}</strong>
                          <span>
                            {slab.materialType} · {slab.thickness} ·{" "}
                            {slab.status}
                          </span>
                        </div>

                        <ArrowRight size={16} />
                      </Link>
                    ))}
                  </div>
                )}

                <div className="admin-panel-footer">
                  <button
                    type="button"
                    className="btn btn-secondary admin-disabled-button"
                    disabled
                  >
                    Inventory Manager Coming Next
                  </button>
                </div>
              </article>
            </div>
          </>
        )}
      </div>
    </section>
  );
}