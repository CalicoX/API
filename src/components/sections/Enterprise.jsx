const PILLARS = ["Visible", "Reliable", "Trust", "Secure"];

const CARDS = [
  {
    kind: "carriers",
    title: "4,000+ Carriers Worldwide",
    body: "Global tracking coverage across markets and carriers.",
  },
  {
    kind: "performance",
    title: "Enterprise-Grade Performance Assurance",
    body: "Designed to minimize latency and ensure rapid data delivery, even during peak volume surges.",
  },
  {
    kind: "security",
    title: "Security & Global Compliance",
    body: "ISO 27001, SOC 2 certified, and fully compliant with global GDPR standards.",
  },
  {
    kind: "sla",
    title: "Dedicated SLA & Dedicated Support",
    body: "Guaranteed uptime agreements paired with technical onboarding and dedicated account managers.",
  },
];

function CardIcon({ kind }) {
  if (kind === "carriers") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle className="d" pathLength="100" style={{ "--d": "0s" }} cx="12" cy="12" r="8.2" />
        <ellipse className="d" pathLength="100" style={{ "--d": "0.08s" }} cx="12" cy="12" rx="3.4" ry="8.2" />
        <path className="d" pathLength="100" style={{ "--d": "0.12s" }} d="M3.8 12h16.4" />
      </svg>
    );
  }
  if (kind === "performance") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path className="d" pathLength="100" style={{ "--d": "0s" }} d="M4.5 16.5 10 11l3.2 3.2 6.3-7.2" />
        <path className="d" pathLength="100" style={{ "--d": "0.1s" }} d="M15.2 7h4.3v4.2" />
      </svg>
    );
  }
  if (kind === "security") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path
          className="d"
          pathLength="100"
          style={{ "--d": "0s" }}
          d="M12 3.6 5.2 6.4v5.3c0 4.4 2.9 7.4 6.8 8.7 3.9-1.3 6.8-4.3 6.8-8.7V6.4Z"
        />
        <path className="d" pathLength="100" style={{ "--d": "0.12s" }} d="m8.8 12.1 2.2 2.2 4.3-4.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        className="d"
        pathLength="100"
        style={{ "--d": "0s" }}
        d="M5.2 16.8a7.6 7.6 0 1 1 13.6 0"
      />
      <circle className="d" pathLength="100" style={{ "--d": "0.08s" }} cx="12" cy="10.2" r="2.4" />
      <path className="d" pathLength="100" style={{ "--d": "0.14s" }} d="M8.2 19.2h7.6" />
    </svg>
  );
}

/** Why Enterprise Trust 17TRACK API? — 4 capability cards */
export default function Enterprise() {
  return (
    <section className="api-ent" id="enterprise" aria-labelledby="api-ent-title">
      <div className="api-wrap">
        <div className="api-ent-head">
          <p className="api-ent-eye">Why Enterprise Trust 17TRACK API?</p>
          <h2 className="api-h2" id="api-ent-title">
            Enterprise-Grade Shipment Tracking Solution
          </h2>
          <ul className="api-ent-badges">
            {PILLARS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <ul className="api-ent-cards">
          {CARDS.map((card) => (
            <li className="api-ent-card" key={card.kind}>
              <span className="api-s4-ico" aria-hidden="true">
                <CardIcon kind={card.kind} />
              </span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
