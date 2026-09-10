import { AppIcon } from "../visuals/ApiDomVisuals.jsx";

const APPS = [
  {
    kind: "logistics",
    title: "Logistics Service",
    body:
      "Unify carrier and last-mile tracking data into one consistent feed, giving you end-to-end shipment visibility.",
  },
  {
    kind: "ecommerce",
    title: "Marketplace",
    body:
      "Sync real-time tracking data with your OMS or tracking tools, so every order stays visible in one place.",
  },
  {
    kind: "finance",
    title: "Finance and Payment",
    body:
      "Use tracking events to assess delivery progress, risk, and package authenticity.",
  },
  {
    kind: "platforms",
    title: "Platforms & SaaS",
    body:
      "Power your platform with unified tracking data across carriers and markets.",
  },
  {
    kind: "integrator",
    title: "System Integrators",
    body:
      "Integrate standardized logistics data into custom workflows and customer experience.",
  },
];

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

/** Section 5 — Wide range of applications */
export default function Applications() {
  return (
    <section className="api-s5" id="applications" aria-labelledby="api-apps-title">
      <div className="api-wrap">
        <div className="api-s5-head">
          <h2 className="api-h2" id="api-apps-title">
            Wide range of applications, thousands of companies have realized more efficient
            management through API integration.
          </h2>
        </div>
        <ul className="api-apps">
          {APPS.map((app) => (
            <li className="api-app-card" key={app.title}>
              <AppIcon kind={app.kind} />
              <h3>{app.title}</h3>
              <p>{app.body}</p>
            </li>
          ))}
        </ul>
        <div className="api-s5-cta">
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
      </div>
    </section>
  );
}
