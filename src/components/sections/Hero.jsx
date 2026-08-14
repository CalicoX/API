/** Section 1 — International Package Tracking API + free trial form (DOM only) */
export default function Hero() {
  return (
    <section className="api-s1 hero" id="content" aria-labelledby="api-hero-title">
      <div className="api-wrap api-s1-grid">
        <div className="api-s1-copy">
          <h1 className="api-h1" id="api-hero-title">
            International Package{" "}
            <span className="api-nowrap">Tracking API</span>
          </h1>
          <h2 className="api-h2">
            Accurate, <span className="api-nowrap">Reliable, Up-to-Date.</span>
          </h2>
          <p className="api-lead">
            <span className="api-lead-line">
              Access the tracking data of{" "}
              <span className="api-lead-tag">3400+</span> carriers worldwide via
            </span>
            <span className="api-lead-line">
              17TRACK’s tracking api integration, optimizing your operations
            </span>
          </p>
          <ul className="api-check-list">
            <li>For developers and dev-capable teams.</li>
            <li>HTTP protocol, all system compatible.</li>
            <li>Free trial + dedicated tech support.</li>
          </ul>
        </div>

        <div className="api-form-card" id="free-trial">
          <div className="api-form-head">
            <h3>Sign up for free trial</h3>
            <span className="api-form-nocc">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="#64748b" strokeWidth="1.2" />
                <path d="M1.5 6.5h13" stroke="#64748b" strokeWidth="1.2" />
                <path d="M4 10h3" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              No credit card required
            </span>
          </div>
          <form
            className="api-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="api-form-grid">
              <div className="api-field">
                <label htmlFor="company_name">
                  Company Name<span className="req">*</span>
                </label>
                <input id="company_name" name="company_name" maxLength={250} required autoComplete="organization" />
              </div>
              <div className="api-field">
                <label htmlFor="company_url">Company Website</label>
                <input id="company_url" name="company_url" maxLength={250} autoComplete="url" />
              </div>
              <div className="api-field">
                <label htmlFor="phone">
                  Phone Number<span className="req">*</span>
                </label>
                <input id="phone" name="phone" maxLength={15} required autoComplete="tel" />
              </div>
              <div className="api-field">
                <label htmlFor="email">
                  Email<span className="req">*</span>
                </label>
                <input id="email" name="email" type="email" maxLength={250} required autoComplete="email" />
              </div>
              <div className="api-field is-full">
                <label htmlFor="password">
                  Password<span className="req">*</span>
                </label>
                <input id="password" name="password" type="password" required autoComplete="new-password" />
              </div>
              <div className="api-field is-full">
                <label htmlFor="help_note">Tell us how would you like us to help.</label>
                <textarea id="help_note" name="help_note" maxLength={1000} />
              </div>
            </div>
            <label className="api-form-agree">
              <input type="checkbox" name="agree" required defaultChecked />
              <span>
                By continuing to use our service means that you have read and agree to 17TRACK{" "}
                <a href="https://www.17track.net/helpcenter/licensing" target="_blank" rel="noopener noreferrer">
                  &apos;Terms&apos;
                </a>{" "}
                and{" "}
                <a href="https://www.17track.net/helpcenter/privacy" target="_blank" rel="noopener noreferrer">
                  &apos;Privacy&apos;
                </a>
                .
              </span>
            </label>
            <button type="submit" className="api-btn-primary">
              Start My Free Trial
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
