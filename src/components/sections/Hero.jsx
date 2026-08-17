/** Section 1 — International Package Tracking API + free trial form */
import { useState } from "react";

export default function Hero() {
  const [showPass, setShowPass] = useState(false);
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
            Access the tracking data of{" "}
            <span className="api-lead-tag">3400+</span> carriers worldwide via
            17TRACK’s tracking api integration, optimizing your operations
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
          </div>
          <form
            className="api-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="api-form-grid">
              <div className="api-field">
                <label htmlFor="company_name">Company Name</label>
                <input id="company_name" name="company_name" maxLength={250} required autoComplete="organization" />
              </div>
              <div className="api-field">
                <label htmlFor="company_url">
                  Company Website<span className="opt">Optional</span>
                </label>
                <input id="company_url" name="company_url" maxLength={250} autoComplete="url" />
              </div>
              <div className="api-field">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" maxLength={15} required autoComplete="tel" />
              </div>
              <div className="api-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" maxLength={250} required autoComplete="email" />
              </div>
              <div className="api-field is-full">
                <label htmlFor="password">Password</label>
                <div className="api-pass-wrap">
                  <input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="api-pass-eye"
                    aria-label={showPass ? "Hide password" : "Show password"}
                    onClick={() => setShowPass((v) => !v)}
                  >
                    {showPass ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8s-2.4 4.5-6.5 4.5S1.5 8 1.5 8Z" stroke="currentColor" strokeWidth="1.3" />
                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M2.5 2.5l11 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8s-2.4 4.5-6.5 4.5S1.5 8 1.5 8Z" stroke="currentColor" strokeWidth="1.3" />
                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="api-field is-full">
                <label htmlFor="help_note">
                  Tell us how would you like us to help.<span className="opt">Optional</span>
                </label>
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
            <span className="api-form-nocc">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="#64748b" strokeWidth="1.2" />
                <path d="M1.5 6.5h13" stroke="#64748b" strokeWidth="1.2" />
                <path d="M4 10h3" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              No credit card required
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}
