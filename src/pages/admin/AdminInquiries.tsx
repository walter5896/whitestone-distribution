import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Inbox, RefreshCcw, Search, Trash2 } from "lucide-react";
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

function formatLabel(value: string | null | undefined) {
  return (value || "new")
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsedDate);
}

function normalizeStatus(status: string | null): InquiryStatus {
  if (inquiryStatuses.includes(status as InquiryStatus)) {
    return status as InquiryStatus;
  }

  return "new";
}

function getBestContact(inquiry: AdminInquiry) {
  if (inquiry.phone && inquiry.email) {
    return `${inquiry.phone} · ${inquiry.email}`;
  }

  return inquiry.phone || inquiry.email || "No contact provided";
}

export function AdminInquiries() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "all">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function loadInquiries(options?: { showRefreshingState?: boolean }) {
    try {
      if (options?.showRefreshingState) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

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
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  const filteredInquiries = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return inquiries.filter((inquiry) => {
      const inquiryStatus = normalizeStatus(inquiry.status);

      const matchesStatus =
        statusFilter === "all" || inquiryStatus === statusFilter;

      const searchableText = [
        inquiry.inquiry_type,
        inquiry.name,
        inquiry.phone,
        inquiry.email,
        inquiry.message,
        inquiry.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch || searchableText.includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [inquiries, searchTerm, statusFilter]);

  const inquiryCounts = useMemo(() => {
    return inquiries.reduce(
      (counts, inquiry) => {
        const status = normalizeStatus(inquiry.status);

        counts.total += 1;
        counts[status] += 1;

        return counts;
      },
      {
        total: 0,
        new: 0,
        contacted: 0,
        quoted: 0,
        closed: 0,
        archived: 0,
      } as Record<InquiryStatus | "total", number>
    );
  }, [inquiries]);

  async function handleStatusChange(
    inquiryId: string,
    nextStatus: InquiryStatus
  ) {
    const previousInquiries = inquiries;

    try {
      setUpdatingId(inquiryId);
      setErrorMessage("");

      setInquiries((currentInquiries) =>
        currentInquiries.map((inquiry) =>
          inquiry.id === inquiryId
            ? { ...inquiry, status: nextStatus }
            : inquiry
        )
      );

      const updatedInquiry = await updateInquiryStatus(inquiryId, nextStatus);

      setInquiries((currentInquiries) =>
        currentInquiries.map((inquiry) =>
          inquiry.id === inquiryId ? updatedInquiry : inquiry
        )
      );
    } catch (error) {
      console.error("Failed to update inquiry status:", error);
      setInquiries(previousInquiries);
      setErrorMessage("The inquiry status could not be updated.");
    } finally {
      setUpdatingId("");
    }
  }

  async function handleDeleteInquiry(inquiry: AdminInquiry) {
    const confirmed = window.confirm(
      `Permanently delete this inquiry from ${inquiry.name}? This should only be used for test, duplicate, or spam submissions. For real leads, use Archived instead.`
    );

    if (!confirmed) {
      return;
    }

    const previousInquiries = inquiries;

    try {
      setDeletingId(inquiry.id);
      setErrorMessage("");

      setInquiries((currentInquiries) =>
        currentInquiries.filter(
          (currentInquiry) => currentInquiry.id !== inquiry.id
        )
      );

      await deleteInquiry(inquiry.id);
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
      setInquiries(previousInquiries);
      setErrorMessage(
        "The inquiry could not be deleted. You may need to confirm the admin delete policy in Supabase."
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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => loadInquiries({ showRefreshingState: true })}
              disabled={isRefreshing || isLoading}
            >
              <RefreshCcw size={16} />
              {isRefreshing ? "Refreshing..." : "Refresh Leads"}
            </button>
          </div>
        </div>

        <div className="admin-stat-grid">
          <article className="admin-stat-card">
            <Inbox size={24} />
            <span>Total Leads</span>
            <strong>{inquiryCounts.total}</strong>
          </article>

          <article className="admin-stat-card">
            <Inbox size={24} />
            <span>New</span>
            <strong>{inquiryCounts.new}</strong>
          </article>

          <article className="admin-stat-card">
            <Inbox size={24} />
            <span>Contacted</span>
            <strong>{inquiryCounts.contacted}</strong>
          </article>

          <article className="admin-stat-card">
            <Inbox size={24} />
            <span>Quoted</span>
            <strong>{inquiryCounts.quoted}</strong>
          </article>
        </div>

        <div className="admin-panel admin-inquiries-toolbar">
          <div>
            <p className="eyebrow">Lead Filter</p>
            <h2>All Inquiries</h2>
            <p>
              Showing {filteredInquiries.length} of {inquiries.length} leads.
            </p>
          </div>

          <div className="admin-inquiry-actions">
            <label>
              Search
              <div className="admin-search-control">
                <Search size={16} />
                <input
                  type="search"
                  value={searchTerm}
                  placeholder="Search name, phone, email, message..."
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </label>

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
                    {formatLabel(status)}
                  </option>
                ))}
              </select>
            </label>
          </div>
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
              No leads match the current search or status filter. New contact
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
                      <p className="eyebrow">
                        {formatLabel(inquiry.inquiry_type)}
                      </p>
                      <h2>{inquiry.name || "Unnamed Lead"}</h2>
                      <p className="admin-inquiry-date">
                        Submitted {formatDate(inquiry.created_at)}
                      </p>
                    </div>

                    <span className="admin-status-pill">
                      {formatLabel(currentStatus)}
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

                  <div className="admin-inquiry-message">
                    <span>Best Contact</span>
                    <p>{getBestContact(inquiry)}</p>
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
                            {formatLabel(status)}
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
