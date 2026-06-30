import { useState, type FormEvent } from "react";
import { createInquiry } from "../../lib/inquiryQueries";

type SubmitStatus = "idle" | "submitting" | "success" | "error";
type InquiryAudience = "private-buyer" | "fabricator-trade";

const inquiryTypes = [
  { label: "Slab Availability", value: "slab-availability" },
  { label: "Pricing Request", value: "pricing-request" },
  { label: "Reserve / Hold a Slab", value: "reserve-hold" },
  { label: "Showroom Visit", value: "showroom-visit" },
  { label: "Fabricator Inquiry", value: "fabricator-inquiry" },
  { label: "General Question", value: "general-question" },
];

const projectTypes = [
  { label: "Kitchen", value: "kitchen" },
  { label: "Bathroom", value: "bathroom" },
  { label: "Fireplace", value: "fireplace" },
  { label: "Commercial", value: "commercial" },
  { label: "Fabricator / Trade", value: "fabricator-trade" },
  { label: "Other", value: "other" },
];

function formatLabel(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [inquiryAudience, setInquiryAudience] =
    useState<InquiryAudience>("private-buyer");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const inquiryType = String(formData.get("inquiryType") || "").trim();
    const projectType = String(formData.get("projectType") || "").trim();
    const materialInterest = String(
      formData.get("materialInterest") || ""
    ).trim();
    const message = String(formData.get("message") || "").trim();

    if (!name) {
      setSubmitStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!phone && !email) {
      setSubmitStatus("error");
      setErrorMessage("Please enter either a phone number or email.");
      return;
    }

    if (!inquiryType) {
      setSubmitStatus("error");
      setErrorMessage("Please select an inquiry type.");
      return;
    }

    if (!projectType) {
      setSubmitStatus("error");
      setErrorMessage("Please select a project type.");
      return;
    }

    if (!message) {
      setSubmitStatus("error");
      setErrorMessage("Please enter a short message.");
      return;
    }

    const formattedMessage = [
      `Inquiry audience: ${
        inquiryAudience === "private-buyer"
          ? "Private Buyer / Homeowner"
          : "Fabricator / Trade"
      }`,
      `Inquiry type: ${formatLabel(inquiryType)}`,
      `Project type: ${formatLabel(projectType)}`,
      materialInterest
        ? `Interested slab / material: ${materialInterest}`
        : "Interested slab / material: Not specified",
      "",
      "Message:",
      message,
    ].join("\n");

    try {
      setSubmitStatus("submitting");
      setErrorMessage("");

      await createInquiry({
        inquiryType,
        name,
        phone,
        email,
        message: formattedMessage,
      });

      form.reset();
      setInquiryAudience("private-buyer");
      setSubmitStatus("success");
    } catch (error) {
      console.error("Failed to submit contact inquiry:", error);
      setSubmitStatus("error");
      setErrorMessage(
        "Something went wrong while sending your inquiry. Please try again or call us directly."
      );
    }
  }

  return (
    <form className="site-form contact-unified-form" onSubmit={handleSubmit}>
      <fieldset className="contact-audience-toggle">
        <legend>I am inquiring as:</legend>

        <div className="contact-audience-options">
          <label
            className={
              inquiryAudience === "private-buyer"
                ? "contact-audience-option active"
                : "contact-audience-option"
            }
          >
            <input
              type="radio"
              name="inquiryAudience"
              value="private-buyer"
              checked={inquiryAudience === "private-buyer"}
              onChange={() => setInquiryAudience("private-buyer")}
            />
            <span>Private Buyer / Homeowner</span>
          </label>

          <label
            className={
              inquiryAudience === "fabricator-trade"
                ? "contact-audience-option active"
                : "contact-audience-option"
            }
          >
            <input
              type="radio"
              name="inquiryAudience"
              value="fabricator-trade"
              checked={inquiryAudience === "fabricator-trade"}
              onChange={() => setInquiryAudience("fabricator-trade")}
            />
            <span>Fabricator / Trade</span>
          </label>
        </div>
      </fieldset>

      <div className="form-grid">
        <label>
          Full Name
          <input type="text" name="name" placeholder="Your name" required />
        </label>

        <label>
          Email Address
          <input type="email" name="email" placeholder="you@example.com" />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Phone Number
          <input type="tel" name="phone" placeholder="(801) 400-9496" />
        </label>

        <label>
          Inquiry Type
          <select name="inquiryType" defaultValue="" required>
            <option value="" disabled>
              Select an option
            </option>
            {inquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-grid">
        <label>
          Project Type
          <select name="projectType" defaultValue="" required>
            <option value="" disabled>
              Select an option
            </option>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Interested Slab / Material
          <input
            type="text"
            name="materialInterest"
            placeholder="Calacatta Gold, Taj Mahal, warm white quartzite..."
          />
        </label>
      </div>

      <label>
        Message
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your project, timeline, slab interest, and whether you’re working with a fabricator."
          required
        />
      </label>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={submitStatus === "submitting"}
      >
        {submitStatus === "submitting" ? "Sending..." : "Send Inquiry"}
      </button>

      {submitStatus === "success" && (
        <p className="form-note form-note-success">
          Your inquiry was sent. Whitestone Distribution will follow up soon.
        </p>
      )}

      {submitStatus === "error" && (
        <p className="form-note form-note-error">{errorMessage}</p>
      )}

      <p className="form-note">
        For urgent slab holds or same-day availability, calling directly is
        still recommended.
      </p>
    </form>
  );
}
