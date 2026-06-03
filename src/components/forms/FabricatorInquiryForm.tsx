export function FabricatorInquiryForm() {
  return (
    <form className="site-form fabricator-form">
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
        <select name="fabricatorNeed" defaultValue="">
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

      <button type="submit" className="btn btn-primary">
        Send Fabricator Inquiry
      </button>

      <p className="form-note">
        Trade pricing access can be added later with code, private link, or
        approved email access.
      </p>
    </form>
  );
}