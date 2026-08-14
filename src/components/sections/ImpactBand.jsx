/** Presentational section: ImpactBand — API scale metrics */
export default function ImpactBand() {
  return (
<section className="impact-band" id="business-impact">
        <div className="impact-band-sticky">
          <canvas className="impact-bg-shader" id="impact-bg-shader" aria-hidden="true"></canvas>
          <div className="section-inner">
            <div className="section-head">
              <h2>One solution,<br /><span className="impact-h2-l1">various use cases</span></h2>
              <p className="impact-sub">Track in bulk, build your own portal, and skip the cost of multi-carrier integration.</p>
            </div>
            <div className="impact-stats">
              <div className="impact-stat" data-impact data-value="3400" data-decimals="0" data-plus="1">
                <span className="impact-stat-bar" aria-hidden="true"></span>
                <div>
                  <div className="metric">
                    <span className="metric-num" data-count>0</span><span className="metric-suffix">+</span>
                  </div>
                  <span className="metric-label">Carriers worldwide</span>
                </div>
              </div>
              <div className="impact-stat" data-impact data-value="80" data-decimals="0">
                <span className="impact-stat-bar" aria-hidden="true"></span>
                <div>
                  <div className="metric">
                    <span className="metric-num" data-count>0</span><span className="metric-suffix">%+</span>
                  </div>
                  <span className="metric-label">Auto carrier match</span>
                </div>
              </div>
              <div className="impact-stat" data-impact data-value="9" data-decimals="0">
                <span className="impact-stat-bar" aria-hidden="true"></span>
                <div>
                  <div className="metric">
                    <span className="metric-num" data-count>0</span><span className="metric-suffix"></span>
                  </div>
                  <span className="metric-label">Main package statuses</span>
                </div>
              </div>
              <div className="impact-stat" data-impact data-value="27" data-decimals="0">
                <span className="impact-stat-bar" aria-hidden="true"></span>
                <div>
                  <div className="metric">
                    <span className="metric-num" data-count>0</span><span className="metric-suffix"></span>
                  </div>
                  <span className="metric-label">Sub-status detail</span>
                </div>
              </div>
            </div>
          </div>
          <div className="impact-curve" aria-hidden="true">
            <div className="impact-curve-grow">
              <svg viewBox="0 0 1440 560" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="impact-curve-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.55"/>
                    <stop offset="18%" stopColor="#38bdf8" stopOpacity="0.9"/>
                    <stop offset="40%" stopColor="#3b82f6"/>
                    <stop offset="62%" stopColor="#6366f1"/>
                    <stop offset="82%" stopColor="#a855f7"/>
                    <stop offset="100%" stopColor="#e879f9"/>
                  </linearGradient>
                  <linearGradient id="impact-area-grad" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.26"/>
                    <stop offset="38%" stopColor="#bfdbfe" stopOpacity="0.12"/>
                    <stop offset="70%" stopColor="#f7f8fa" stopOpacity="0.92"/>
                    <stop offset="100%" stopColor="#f7f8fa" stopOpacity="1"/>
                  </linearGradient>
                </defs>
                <path
                  className="curve-fill"
                  d="M-40,520
                     C140,518 280,505 400,460
                     C540,400 640,320 760,230
                     C880,140 1000,100 1140,78
                     C1260,58 1360,52 1520,56
                     L1520,560 L-40,560 Z"
                />
                <path
                  className="curve-line"
                  d="M-40,520
                     C140,518 280,505 400,460
                     C540,400 640,320 760,230
                     C880,140 1000,100 1140,78
                     C1260,58 1360,52 1520,56"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
  );
}
