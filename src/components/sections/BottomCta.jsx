/** Section 6 — Efficient Solution of Value and Possibility */
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

export default function BottomCta() {
  return (
    <section className="api-s6 bottom-cta" id="bottom-cta" aria-labelledby="api-cta-title">
      <div className="api-wrap">
        <h2 className="api-h2" id="api-cta-title">
          Efficient Solution of Value and Possibility
        </h2>
        <div className="api-cta-row">
          <a className="api-btn-primary" href="#free-trial" onClick={goToTrial}>
            Start My Free Trial
          </a>
        </div>
      </div>
    </section>
  );
}
