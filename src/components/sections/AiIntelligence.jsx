const TAGS = ["AI EDD", "AI Carrier Identification"];

/** AI EDD + AI Carrier Identification — dark cinematic band */
export default function AiIntelligence() {
  return (
    <section className="api-ai" id="ai-intelligence" aria-labelledby="api-ai-title">
      <div className="api-wrap">
        <div className="api-ai-mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="15.5" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="24" cy="24" rx="6.4" ry="15.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8.5 24h31" stroke="currentColor" strokeWidth="1.2" />
            <path d="M11.2 16.2h25.6M11.2 31.8h25.6" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        </div>
        <h2 className="api-h2" id="api-ai-title">
          AI Make Every Tracking Signal <em>Smarter.</em>
        </h2>
        <p className="api-lead">
          17TRACK AI Intelligence enhances tracking data from identification to
          prediction—helping you deliver more accurate, complete, and reliable shipment
          visibility.
        </p>
        <ul className="api-ai-tags">
          {TAGS.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
