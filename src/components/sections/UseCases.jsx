import { UseCasesStage } from "../visuals/ApiDomVisuals.jsx";

/**
 * Sticky Use Cases — 3D hub | split title + bullets.
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
                <ul className="api-s2-points">
                  <li data-uc-line style={{ ["--d"]: 0 }}>
                    Track and trace your shipments in bulk.
                  </li>
                  <li data-uc-line style={{ ["--d"]: 1 }}>
                    Build a tracking portal in your own system.
                  </li>
                  <li data-uc-line style={{ ["--d"]: 2 }}>
                    Avoid high cost of multi-carrier integration.
                  </li>
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
