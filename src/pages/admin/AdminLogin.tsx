import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { getCurrentAdminProfile, signInAdmin } from "../../lib/authQueries";

type LoginStatus = "idle" | "checking" | "submitting" | "error";

export function AdminLogin() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<LoginStatus>("checking");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function checkExistingSession() {
      try {
        const profile = await getCurrentAdminProfile();

        if (profile) {
          navigate("/admin", { replace: true });
          return;
        }
      } catch (error) {
        console.error("Admin session check failed:", error);
      } finally {
        setStatus("idle");
      }
    }

    checkExistingSession();
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setStatus("error");
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      setStatus("submitting");
      setErrorMessage("");

      await signInAdmin(email, password);

      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Admin login failed:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
    }
  }

  return (
    <section className="admin-login-page">
      <div className="container admin-login-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={17} />
          Back to Site
        </Link>

        <div className="admin-login-card">
          <div className="admin-login-icon">
            <Lock size={28} />
          </div>

          <p className="eyebrow">Admin Login</p>
          <h1>Whitestone Management</h1>
          <p>
            Sign in with an approved admin account to manage inventory and
            review inquiries.
          </p>

          <form className="site-form admin-login-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </label>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "submitting" || status === "checking"}
            >
              {status === "submitting" ? "Signing in..." : "Sign In"}
            </button>

            {status === "error" && (
              <p className="form-note form-note-error">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
