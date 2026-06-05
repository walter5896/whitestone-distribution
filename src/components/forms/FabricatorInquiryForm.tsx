import { useState, type FormEvent } from "react";
import { createInquiry } from "../../lib/inquiryQueries";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function FabricatorInquiryForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const companyName = String(formData.get("companyName") || "").trim();
    const contactName = String(formData.get("contactName") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const fabricatorNeed = String(formData.get("fabricatorNeed") || "").trim();
    const notes = String(formData.get("notes") || "").trim();

    if (!companyName && !contactName) {
      setSubmitStatus("error");
      setErrorMessage("Please enter a company name or contact name.");
      return;
    }

    if (!phone && !email) {
      setSubmitStatus("error");
      setErrorMessage("Please enter either a phone number or email.");
      return;
    }

    if (!fabricatorNeed) {
      setSubmitStatus("error");
      setErrorMessage("Please select what you need.");
      return;
    }

    const name = contactName
      ? `${contactName}${companyName ? ` — ${companyName}` : ""}`
      : companyName;

    const message = [
      `Fabricator need: ${fabricatorNeed}`,
      companyName ? `Company: ${companyName}` : "",
      contactName ? `Contact: ${contactName}` : "",
      "",
      notes || "No additional notes provided.",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      setSubmitStatus("submitting");
      setErrorMessage("");

      await createInquiry({
        inquiryType: "fabricator",
        name,
        phone,
        email,
        message,
      });

      form.reset();
      setSubmitStatus("success");
    } catch (error) {
      console.error("Failed to submit fabricator inquiry:", error);
      setSubmitStatus("error");
      setErrorMessage(
        "Something went wrong while sending your fabricator inquiry. Please try again."
      );
    }
  }

  return (
    <form className="site-form fabricator-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Company Name
          <input type="text" name="companyName" placeholder="Company name" />
        </label>

        <label>
          Contact Name
          <input type="text" name="contactName" placeholder="Your name" />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Phone
          <input type="tel" name="phone" placeholder="(801) 555-0199" />
        </label>

        <label>
          Email
          <input type="email" name="email" placeholder="you@example.com" />
        </label>
      </div>

      <label>
        What do you need?
        <select name="fabricatorNeed" defaultValue="" required>
          <option value="" disabled>
            Select one
          </option>
          <option value="trade-pricing">Trade pricing access</option>
          <option value="current-slab">Pricing on a current slab</option>
          <option value="reserve">Reserve / hold a slab</option>
          <option value="remnants">Remnants</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Notes
        <textarea
          name="notes"
          rows={5}
          placeholder="Mention material, color, thickness, dimensions, timeline, or slab name..."
        />
      </label>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={submitStatus === "submitting"}
      >
        {submitStatus === "submitting"
          ? "Sending..."
          : "Send Fabricator Inquiry"}
      </button>

      {submitStatus === "success" && (
        <p className="form-note form-note-success">
          Your fabricator inquiry was sent. Whitestone Distribution will follow
          up soon.
        </p>
      )}

      {submitStatus === "error" && (
        <p className="form-note form-note-error">{errorMessage}</p>
      )}

      <p className="form-note">
        Trade pricing access can be added later with code, private link, or
        approved email access.
      </p>
    </form>
  );
}