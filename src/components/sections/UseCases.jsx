import { UseCasesStage, AppIcon } from "../visuals/ApiDomVisuals.jsx";

/* 原 Applications 五卡（2026-09-21 Park：挪进 Use Cases 标题下，滚动逐条出现、无卡片框） */
const APP_POINTS = [
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

/**
 * Sticky Use Cases — 3D hub | split title + app list.
 * Bottom: tick-style progress bar with % readout.
 */
export default function UseCases() {
  return (
    <section className="api-s2" id="use-cases" aria-labelledby="api-usecases-title">
      <div className="api-s2-scroll" id="use-cases-scroll">
        <div className="api-s2-sticky">
          {/* thin top progress edge */}
          <div className="api-s2-progress" aria-hidden="true">
            <i id="api-uc-progress-fill" data-uc-progress />
          </div>

          <div className="api-s2-grid" aria-hidden="true">
            <span className="api-s2-grid-v api-s2-grid-v--1" />
            <span className="api-s2-grid-v api-s2-grid-v--2" />
            <span className="api-s2-grid-h api-s2-grid-h--1" />
            <span className="api-s2-grid-h api-s2-grid-h--2" />
            <span className="api-s2-grid-sq api-s2-grid-sq--1" />
            <span className="api-s2-grid-sq api-s2-grid-sq--2" />
            <span className="api-s2-grid-sq api-s2-grid-sq--3" />
            <span className="api-s2-grid-sq api-s2-grid-sq--4" />
          </div>

          <div className="api-wrap api-s2-wrap">
            <div className="api-s2-line" data-uc-root>
              <span className="api-s2-cross api-s2-cross--tl" aria-hidden="true" />
              <span className="api-s2-cross api-s2-cross--tr" aria-hidden="true" />
              <span className="api-s2-cross api-s2-cross--bl" aria-hidden="true" />
              <span className="api-s2-cross api-s2-cross--br" aria-hidden="true" />

              <div className="api-s2-visual" data-uc="diagram">
                <UseCasesStage />
              </div>

              <div className="api-s2-copy" data-uc="copy">
                <div className="api-s2-title-block">
                  <span className="api-s2-eyebrow">Use Cases</span>
                  <h2 className="api-h2 api-s2-title" id="api-usecases-title">
                    <span className="api-s2-title-line api-s2-title-line--top">One Solution,</span>
                    <span className="api-s2-title-line api-s2-title-line--bottom"><em>Various</em> Use Cases.</span>
                  </h2>
                </div>
                <ul className="api-s2-app-list">
                  {APP_POINTS.map((app, i) => (
                    <li className="api-s2-app-item" key={app.title} data-uc-line style={{ ["--d"]: i }}>
                      <AppIcon kind={app.kind} />
                      <div className="api-s2-app-text">
                        <h3>{app.title}</h3>
                        <p>{app.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* bottom tick progress bar */}
          <div className="api-s2-tickbar" aria-hidden="true">
            <div className="api-s2-tickbar-inner">
              <span className="api-s2-tickbar-pct" id="api-uc-tick-pct">0%</span>
              <div className="api-s2-tickbar-track">
                <div className="api-s2-tickbar-ticks" id="api-uc-ticks" />
                <div className="api-s2-tickbar-fill" id="api-uc-tick-fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
