import { useId } from "react";

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

function GlassFill({ id }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#f7f4ff" />
      <stop offset="42%" stopColor="#ddd6fe" />
      <stop offset="100%" stopColor="#7c3aed" />
    </linearGradient>
  );
}

function CardIcon({ kind }) {
  const uid = useId().replace(/:/g, "");
  const g = `ent-glass-${uid}`;

  if (kind === "carriers") {
    return (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <GlassFill id={g} />
        </defs>
        <circle cx="24" cy="24" r="14" fill={`url(#${g})`} />
        <ellipse cx="24" cy="24" rx="6" ry="14" stroke="#5b21b6" strokeWidth="1.6" opacity="0.28" />
        <path d="M10 24h28" stroke="#5b21b6" strokeWidth="1.6" opacity="0.28" />
      </svg>
    );
  }
  if (kind === "performance") {
    return (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <GlassFill id={g} />
        </defs>
        <path
          fill={`url(#${g})`}
          d="M27.2 6.4 14.6 25.2h9.2L16.8 41.6 33.4 21.2h-9.1L27.2 6.4Z"
        />
      </svg>
    );
  }
  if (kind === "security") {
    return (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <GlassFill id={g} />
        </defs>
        <path
          fill={`url(#${g})`}
          d="M24 5.6 9.6 11.2v9.2c0 9.1 6.1 15.4 14.4 18 8.3-2.6 14.4-8.9 14.4-18v-9.2L24 5.6Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" fill="none">
      <defs>
        <GlassFill id={g} />
      </defs>
      <circle cx="24" cy="16.2" r="7.2" fill={`url(#${g})`} />
      <path
        fill={`url(#${g})`}
        d="M10.4 40.4c0-7.6 6.1-12 13.6-12s13.6 4.4 13.6 12v1.2H10.4v-1.2Z"
      />
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
