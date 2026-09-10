function PanelEdd() {
  return (
    <div className="api-ai-panel" data-kind="edd">
      <span className="api-ai-panel-kicker">AI EDD</span>
      <strong>Aug 20 – Aug 22</strong>
      <em>Estimated delivery window</em>
      <div className="api-ai-edd-bar" aria-hidden="true">
        <i />
      </div>
      <ul>
        <li>
          <span>Origin</span>
          <b>Shenzhen</b>
        </li>
        <li>
          <span>Destination</span>
          <b>Los Angeles</b>
        </li>
      </ul>
    </div>
  );
}

function PanelAi() {
  return (
    <div className="api-ai-panel" data-kind="ai">
      <span className="api-ai-panel-kicker">AI Carrier Identification</span>
      <div className="api-ai-scan" aria-hidden="true">
        <i className="api-ai-scan-ring" />
        <i className="api-ai-scan-ring is-2" />
        <span>AI</span>
      </div>
      <code>RR123456789CN</code>
      <p>
        <b>USPS</b>
        <span>United States · 98%</span>
      </p>
    </div>
  );
}

function PanelMap() {
  return (
    <div className="api-ai-panel" data-kind="map">
      <span className="api-ai-panel-kicker">Live route</span>
      <svg className="api-ai-map" viewBox="0 0 280 140" aria-hidden="true">
        <path
          className="api-ai-map-land"
          d="M18 78c22-18 48-22 70-14 18 6 28 4 42-8 16-14 40-16 62-6 20 9 38 8 52-4 8 18 6 36-8 52-18 20-48 24-78 16-22-6-36 2-54 12-20 11-46 10-66-4-14-10-22-26-20-44z"
        />
        <path
          className="api-ai-map-route"
          d="M52 86 C 110 28, 176 28, 232 64"
        />
        <circle className="api-ai-map-dot" cx="52" cy="86" r="4.5" />
        <circle className="api-ai-map-dot is-end" cx="232" cy="64" r="4.5" />
        <text x="40" y="108">
          CN
        </text>
        <text x="214" y="48">
          US
        </text>
      </svg>
    </div>
  );
}

/** AI EDD + identification + map — tracking Synthesis 背景 */
export default function AiIntelligence() {
  return (
    <section className="api-ai" id="ai-intelligence" aria-labelledby="api-ai-title">
      <canvas className="api-ai-flow" aria-hidden="true" />
      <div className="api-ai-veil" aria-hidden="true" />
      <div className="api-wrap">
        <h2 className="api-h2" id="api-ai-title">
          AI Make Every Tracking Signal <em>Smarter.</em>
        </h2>
        <p className="api-lead">
          17TRACK AI Intelligence enhances tracking data from identification to
          prediction—helping you deliver more accurate, complete, and reliable shipment
          visibility.
        </p>
        <ul className="api-ai-tags">
          <li>AI EDD</li>
          <li>AI Carrier Identification</li>
        </ul>
        <div className="api-ai-stage">
          <PanelEdd />
          <PanelAi />
          <PanelMap />
        </div>
      </div>
    </section>
  );
}
