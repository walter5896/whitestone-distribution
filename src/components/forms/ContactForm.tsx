import { useState, type FormEvent } from "react";
import { createInquiry } from "../../lib/inquiryQueries";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const reason = String(formData.get("reason") || "general").trim();
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

    if (!message) {
      setSubmitStatus("error");
      setErrorMessage("Please enter a short message.");
      return;
    }

    try {
      setSubmitStatus("submitting");
      setErrorMessage("");

      await createInquiry({
        inquiryType: reason || "general",
        name,
        phone,
        email,
        message: `Contact reason: ${reason || "general"}\n\n${message}`,
      });

      form.reset();
      setSubmitStatus("success");
    } catch (error) {
      console.error("Failed to submit contact inquiry:", error);
      setSubmitStatus("error");
      setErrorMessage(
        "Something went wrong while sending your inquiry. Please try again."
      );
    }
  }

  return (
    <form className="site-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" required />
        </label>

        <label>
          Phone
          <input type="tel" name="phone" placeholder="(801) 555-0199" />
        </label>
      </div>

      <label>
        Email
        <input type="email" name="email" placeholder="you@example.com" />
      </label>

      <label>
        What are you reaching out about?
        <select name="reason" defaultValue="" required>
          <option value="" disabled>
            Select one
          </option>
          <option value="pricing">Pricing / availability</option>
          <option value="reservation">Reserve a slab</option>
          <option value="inventory">Inventory question</option>
          <option value="fabricator">Fabricator / trade access</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Message
        <textarea
          name="message"
          rows={6}
          placeholder="Tell us what material, look, or slab you are interested in..."
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