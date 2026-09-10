function goToTrial(e) {
  const el = document.getElementById("free-trial");
  if (!el) return;
  e.preventDefault();
  if (window.__lenis?.scrollTo) {
    window.__lenis.scrollTo(el, { duration: 1.1, force: true });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/** Section 6 — Ready to Build Smarter Tracking */
export default function BottomCta() {
  return (
    <section className="api-s6 bottom-cta" id="bottom-cta" aria-labelledby="api-cta-title">
      <canvas className="bottom-cta-shader" id="bottom-cta-shader" aria-hidden="true" />
      <div className="section-inner">
        <div className="bottom-cta-copy">
          <h2 id="api-cta-title">Ready to Build Smarter Tracking？</h2>
          <p>
            Power your product with accurate, real-time logistics data from 4,000+ carriers.
          </p>
        </div>
        <div className="cta-row">
          <a className="btn-switch on-dark" href="#free-trial" onClick={goToTrial}>
            <span className="btn-switch-knob" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="5" cy="12" r="1.4" fill="currentColor" opacity="0.35" />
                <circle cx="8.2" cy="12" r="1.5" fill="currentColor" opacity="0.55" />
                <circle cx="11.5" cy="12" r="1.6" fill="currentColor" opacity="0.8" />
                <path
                  d="M13 7.5L18.5 12 13 16.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="btn-switch-label">Start Free</span>
          </a>
        </div>
        <p>
          Interested In 17TRACK Air Cargo (AWS) Tracking API?{" "}
          <a href="#free-trial" onClick={goToTrial}>Register to learn more.</a>
        </p>
      </div>
    </section>
  );
}
