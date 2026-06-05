import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Inbox, Trash2 } from "lucide-react";
import {
  deleteInquiry,
  getAdminInquiries,
  updateInquiryStatus,
} from "../../lib/adminQueries";
import type { AdminInquiry, InquiryStatus } from "../../lib/adminQueries";

const inquiryStatuses: InquiryStatus[] = [
  "new",
  "contacted",
  "quoted",
  "closed",
  "archived",
];

function formatStatus(status: string | null) {
  return (status || "new")
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

function normalizeStatus(status: string | null): InquiryStatus {
  if (inquiryStatuses.includes(status as InquiryStatus)) {
    return status as InquiryStatus;
  }

  return "new";
}

export function AdminInquiries() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadInquiries() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const liveInquiries = await getAdminInquiries();
        setInquiries(liveInquiries);
      } catch (error) {
        console.error("Failed to load inquiries:", error);
        setErrorMessage(
          "Inquiries could not be loaded. Please confirm your admin session and permissions."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadInquiries();
  }, []);

  const filteredInquiries = useMemo(() => {
    if (statusFilter === "all") {
      return inquiries;
    }

    return inquiries.filter(
      (inquiry) => normalizeStatus(inquiry.status) === statusFilter
    );
  }, [inquiries, statusFilter]);

  async function handleStatusChange(
    inquiryId: string,
    nextStatus: InquiryStatus
  ) {
    try {
      setUpdatingId(inquiryId);
      setErrorMessage("");

      const updatedInquiry = await updateInquiryStatus(inquiryId, nextStatus);

      setInquiries((currentInquiries) =>
        currentInquiries.map((inquiry) =>
          inquiry.id === inquiryId ? updatedInquiry : inquiry
        )
      );
    } catch (error) {
      console.error("Failed to update inquiry status:", error);
      setErrorMessage("The inquiry status could not be updated.");
    } finally {
      setUpdatingId("");
    }
  }

  async function handleDeleteInquiry(inquiry: AdminInquiry) {
    const confirmed = window.confirm(
      `Delete inquiry from ${inquiry.name}? This is best used for test or spam inquiries.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(inquiry.id);
      setErrorMessage("");

      await deleteInquiry(inquiry.id);

      setInquiries((currentInquiries) =>
        currentInquiries.filter((currentInquiry) => currentInquiry.id !== inquiry.id)
      );
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
      setErrorMessage(
        "The inquiry could not be deleted. You may need to add the admin delete policy in Supabase."
      );
    } finally {
      setDeletingId("");
    }
  }

  return (
    <section className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <Link to="/admin" className="back-link">
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <p className="eyebrow">Admin Inquiries</p>
            <h1>Customer Leads</h1>
            <p>
              Review customer and fabricator inquiries, update lead status, and
              remove test or spam submissions.
            </p>
          </div>

          <div className="admin-header-actions">
            <Link to="/contact" className="btn btn-secondary">
              View Contact Page
            </Link>
          </div>
        </div>

        <div className="admin-panel admin-inquiries-toolbar">
          <div>
            <p className="eyebrow">Lead Filter</p>
            <h2>All Inquiries</h2>
          </div>

          <label className="admin-filter-control">
            Status
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as InquiryStatus | "all")
              }
            >
              <option value="all">All Statuses</option>
              {inquiryStatuses.map((status) => (
                <option key={status} value={status}>
                  {formatStatus(status)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {errorMessage && (
          <div className="admin-state-card admin-error-card">
            <h2>Admin action failed</h2>
            <p>{errorMessage}</p>
          </div>
        )}

        {isLoading && (
          <div className="admin-state-card">
            <h2>Loading inquiries...</h2>
            <p>Pulling customer leads from Supabase.</p>
          </div>
        )}

        {!isLoading && filteredInquiries.length === 0 && (
          <div className="admin-state-card">
            <Inbox size={28} />
            <h2>No inquiries found.</h2>
            <p>
              There are no inquiries matching the current filter. New contact
              and fabricator submissions will appear here.
            </p>
          </div>
        )}

        {!isLoading && filteredInquiries.length > 0 && (
          <div className="admin-inquiry-list">
            {filteredInquiries.map((inquiry) => {
              const currentStatus = normalizeStatus(inquiry.status);

              return (
                <article key={inquiry.id} className="admin-inquiry-card">
                  <div className="admin-inquiry-card-header">
                    <div>
                      <p className="eyebrow">{inquiry.inquiry_type}</p>
                      <h2>{inquiry.name}</h2>
                      <p className="admin-inquiry-date">
                        Submitted {formatDate(inquiry.created_at)}
                      </p>
                    </div>

                    <span className="admin-status-pill">
                      {formatStatus(currentStatus)}
                    </span>
                  </div>

                  <div className="admin-inquiry-contact-grid">
                    <div>
                      <span>Phone</span>
                      <strong>{inquiry.phone || "Not provided"}</strong>
                    </div>

                    <div>
                      <span>Email</span>
                      <strong>{inquiry.email || "Not provided"}</strong>
                    </div>
                  </div>

                  <div className="admin-inquiry-message">
                    <span>Message</span>
                    <p>{inquiry.message || "No message provided."}</p>
                  </div>

                  <div className="admin-inquiry-actions">
                    <label>
                      Update Status
                      <select
                        value={currentStatus}
                        disabled={updatingId === inquiry.id}
                        onChange={(event) =>
                          handleStatusChange(
                            inquiry.id,
                            event.target.value as InquiryStatus
                          )
                        }
                      >
                        {inquiryStatuses.map((status) => (
                          <option key={status} value={status}>
                            {formatStatus(status)}
                          </option>
                        ))}
                      </select>
                    </label>

                    <button
                      type="button"
                      className="btn btn-secondary admin-danger-button"
                      onClick={() => handleDeleteInquiry(inquiry)}
                      disabled={deletingId === inquiry.id}
                    >
                      <Trash2 size={16} />
                      {deletingId === inquiry.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}