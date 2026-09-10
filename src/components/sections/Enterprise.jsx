const PILLARS = [
  { label: "Visible", kind: "visible" },
  { label: "Reliable", kind: "reliable" },
  { label: "Trust", kind: "trust" },
  { label: "Secure", kind: "secure" },
];

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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
        <circle cx="12" cy="12" r="7.2" />
        <ellipse cx="12" cy="12" rx="3" ry="7.2" />
        <path d="M4.8 12h14.4" />
      </svg>
    );
  }
  if (kind === "performance") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M5 16.5 10.2 11l3 3L19 8" />
        <path d="M14.2 8H19v4.8" />
      </svg>
    );
  }
  if (kind === "security") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M12 3.6 5.4 6.4v5.2c0 4.3 2.9 7.3 6.6 8.6 3.7-1.3 6.6-4.3 6.6-8.6V6.4Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="12" cy="9" r="3.1" />
      <path d="M6.2 18.6c.6-2.8 2.8-4.2 5.8-4.2s5.2 1.4 5.8 4.2" />
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
              <li key={item.kind} data-kind={item.kind}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <ul className="api-ent-cards">
          {CARDS.map((card) => (
            <li className="api-ent-card" key={card.kind}>
              <span className="api-ent-ico" aria-hidden="true">
                <span className="api-ent-ico-back" />
                <span className="api-ent-ico-glass" />
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
