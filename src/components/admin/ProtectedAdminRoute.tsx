import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentAdminProfile } from "../../lib/authQueries";
import type { AdminProfile } from "../../lib/authQueries";

type ProtectedAdminRouteProps = {
  children: ReactNode;
};

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkAdminAccess() {
      try {
        const profile = await getCurrentAdminProfile();
        setAdminProfile(profile);
      } catch (error) {
        console.error("Failed to check admin access:", error);
        setAdminProfile(null);
      } finally {
        setIsChecking(false);
      }
    }

    checkAdminAccess();
  }, []);

  if (isChecking) {
    return (
      <section className="admin-page">
        <div className="container">
          <div className="admin-state-card">
            <p className="eyebrow">Admin Access</p>
            <h1>Checking admin session...</h1>
            <p>Please wait while we verify your account.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!adminProfile) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
