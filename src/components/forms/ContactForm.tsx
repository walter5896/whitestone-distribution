export function ContactForm() {
  return (
    <form className="site-form">
      <div className="form-grid">
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" />
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
        <select name="reason" defaultValue="">
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
        />
      </label>

      <button type="submit" className="btn btn-primary">
        Send Inquiry
      </button>

      <p className="form-note">
        This form is a prototype for now. Final submission will be connected to
        Supabase or email later.
      </p>
    </form>
  );
}