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
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm6.9 9h-2.6c-.1-2.1-.5-4-.9-5.4A8.1 8.1 0 0 1 18.9 11ZM12 4c.9 0 2.6 2.4 3.1 7H8.9C9.4 6.4 11.1 4 12 4ZM8.6 5.6C8.2 7 7.8 8.9 7.7 11H5.1A8.1 8.1 0 0 1 8.6 5.6ZM5.1 13h2.6c.1 2.1.5 4 .9 5.4A8.1 8.1 0 0 1 5.1 13ZM12 20c-.9 0-2.6-2.4-3.1-7h6.2c-.5 4.6-2.2 7-3.1 7Zm3.4-1.6c.4-1.4.8-3.3.9-5.4h2.6a8.1 8.1 0 0 1-3.5 5.4Z" />
      </svg>
    );
  }
  if (kind === "performance") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.2 3.2a1 1 0 0 1 1.8.4L16.4 9H20a1 1 0 0 1 .8 1.6l-8.2 10.2a1 1 0 0 1-1.8-.5L9.6 15H4a1 1 0 0 1-.8-1.6Z" />
      </svg>
    );
  }
  if (kind === "security") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.2 4.4 5.2v6.2c0 5.1 3.4 8.6 7.6 10.1 4.2-1.5 7.6-5 7.6-10.1V5.2Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="8.2" r="3.1" />
      <path d="M5.2 19.2a6.8 6.8 0 0 1 13.6 0 1 1 0 0 1-1 1.1H6.2a1 1 0 0 1-1-1.1Z" />
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
