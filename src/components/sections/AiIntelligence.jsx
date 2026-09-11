import { AI_MAP } from "../visuals/aiMapLand.js";

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
      <div className="api-ai-orb" aria-hidden="true">
        <canvas id="api-ai-orb" width="96" height="96" />
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
      <svg className="api-ai-map" viewBox={AI_MAP.viewBox} aria-hidden="true">
        <g className="api-ai-map-dots">
          {AI_MAP.dots.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.05" />
          ))}
        </g>
        <path className="api-ai-map-route" d={AI_MAP.route} />
        <circle className="api-ai-map-dot" cx={AI_MAP.sz[0]} cy={AI_MAP.sz[1]} r="4.5" />
        <circle className="api-ai-map-dot is-end" cx={AI_MAP.la[0]} cy={AI_MAP.la[1]} r="4.5" />
        <text x={AI_MAP.sz[0] - 8} y={AI_MAP.sz[1] + 16}>
          CN
        </text>
        <text x={AI_MAP.la[0] - 8} y={AI_MAP.la[1] - 10}>
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
      <div className="api-ai-pin">
        <div className="api-ai-persp">
          <div className="api-ai-shell">
            <div className="api-ai-live">
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
            </div>
          </div>
        </div>
        <div className="api-ai-pblur" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <b />
        </div>
      </div>
    </section>
  );
}
