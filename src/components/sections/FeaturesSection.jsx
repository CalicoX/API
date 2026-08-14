/** Presentational section: FeaturesSection — How API works + data ops */
export default function FeaturesSection() {
  return (
<section className="section alt features-section" id="key-features">
        <div className="section-inner">
          <div className="feature-scroll" id="feature-scroll">
            <div className="feature-sticky">
              <div className="section-head" id="feature-section-head">
                <div className="section-head-text">
                  <h2>How the Tracking API works — forecast, monitor, intervene</h2>
                  <p className="lead">HTTP + webhook push. Register once, then receive live and historical tracking across the full package lifecycle.</p>
                </div>
                <div className="feature-cta">
                  <a className="btn-switch" href="#"><span className="btn-switch-knob" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.4" fill="currentColor" opacity="0.35"/><circle cx="8.2" cy="12" r="1.5" fill="currentColor" opacity="0.55"/><circle cx="11.5" cy="12" r="1.6" fill="currentColor" opacity="0.8"/><path d="M13 7.5L18.5 12 13 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="btn-switch-label">Start free trial</span></a>
                  <a className="btn-demo" href="https://api.17track.net/zh-cn/doc" target="_blank" rel="noopener">API docs</a>
                </div>
              </div>
              <div className="feature-layout">
                <div className="feature-side-wrap">
                  <div className="feature-side" id="feature-side">
                  <div className="feature-list" role="tablist" aria-label="Key features">
                    <button className="feature active" type="button" id="feature-tab-0" data-feature="0" role="tab" aria-selected="true" aria-controls="feature-panel-0">
                      <h3>Receive updates in 3 steps</h3>
                      <p>Create a webhook, register numbers via API, then listen for automatic pushes — no polling required.</p>
                    </button>
                    <button className="feature" type="button" id="feature-tab-1" data-feature="1" role="tab" aria-selected="false" aria-controls="feature-panel-1">
                      <h3>Tracking data that counts</h3>
                      <p>9 main + 27 sub package statuses make shipping progress and exception causes easy to act on.</p>
                    </button>
                    <button className="feature" type="button" id="feature-tab-2" data-feature="2" role="tab" aria-selected="false" aria-controls="feature-panel-2">
                      <h3>World’s carriers covered</h3>
                      <p>3400+ mainstream carriers worldwide, with new ones added every week. Request unsupported carriers anytime.</p>
                    </button>
                    <button className="feature" type="button" id="feature-tab-3" data-feature="3" role="tab" aria-selected="false" aria-controls="feature-panel-3">
                      <h3>Logistics visibility automated</h3>
                      <p>Auto-identify 80%+ of carriers from the tracking number. Sync non-stop until fulfilled, plus dashboard reports.</p>
                    </button>
                  </div>
                  </div>
                </div>
                <div className="feature-panels-col">
                  <div className="feature-panels" id="feature-panels">
                  {/* 0 · 3 steps */}
                  <article className="feature-panel is-active" data-feature="0" id="feature-panel-0" role="tabpanel" aria-labelledby="feature-tab-0">
                    <div className="feature-visual">
                      <div className="feature-stage" data-theme="branded" style={{'-FxC': '1'}}>
                        <div className="feature-stage-art" aria-hidden="true">
                          <div className="fx-glass fx-main">
                            <div className="fx-chrome"><i></i><i></i><i></i><span className="fx-url">your.app/webhooks/17track</span></div>
                            <div className="fx-body">
                              <div className="fx-hero-block">
                                <strong>Webhook endpoint ready</strong>
                                <span>POST · JSON · TRACKING_UPDATED</span>
                              </div>
                              <div className="fx-status-grid">
                                <b className="is-ok">Step 1<em>Webhook</em></b>
                                <b className="is-ok">Step 2<em>Register</em></b>
                                <b className="is-on">Step 3<em>Listen</em></b>
                                <b>Done<em>—</em></b>
                              </div>
                            </div>
                          </div>
                          <div className="fx-glass fx-float-a">
                            <strong>1 · Create endpoint</strong>
                            <span>HTTPS URL in your system</span>
                          </div>
                          <div className="fx-glass fx-float-b">
                            <strong>2 · Register numbers</strong>
                            <span>POST /track/v2.4/register</span>
                          </div>
                          <div className="fx-glass fx-float-c">
                            <strong>3 · Auto-updates</strong>
                            <span>Push on every status change</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                  {/* 1 · Status taxonomy */}
                  <article className="feature-panel" data-feature="1" id="feature-panel-1" role="tabpanel" aria-labelledby="feature-tab-1">
                    <div className="feature-visual">
                      <div className="feature-stage" data-theme="notify" style={{'-FxC': '0'}}>
                        <div className="feature-stage-art" aria-hidden="true">
                          <div className="fx-glass fx-main">
                            <div className="fx-chrome"><i></i><i></i><i></i><span className="fx-url">status · 9 main + 27 sub</span></div>
                            <div className="fx-body">
                              <div className="fx-hero-block">
                                <strong>Package status map</strong>
                                <span>Progress + exception cause</span>
                              </div>
                              <div className="fx-status-grid">
                                <b className="is-ok">Info<em>Received</em></b>
                                <b className="is-ok">Transit<em>Live</em></b>
                                <b className="is-on">Exception<em>Delay</em></b>
                                <b>Delivered<em>Done</em></b>
                              </div>
                            </div>
                          </div>
                          <div className="fx-glass fx-float-a">
                            <strong>Main status</strong>
                            <span>InTransit · OutForDelivery</span>
                          </div>
                          <div className="fx-glass fx-float-b">
                            <strong>Sub status</strong>
                            <span>ArrivalScan · Departure</span>
                          </div>
                          <div className="fx-glass fx-float-c">
                            <strong>Exception</strong>
                            <span>Address issue · Hold</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                  {/* 2 · Carriers */}
                  <article className="feature-panel" data-feature="2" id="feature-panel-2" role="tabpanel" aria-labelledby="feature-tab-2">
                    <div className="feature-visual">
                      <div className="feature-stage" data-theme="lastmile" style={{'-FxC': '0'}}>
                        <div className="feature-stage-art" aria-hidden="true">
                          <div className="fx-glass fx-main">
                            <div className="fx-chrome"><i></i><i></i><i></i><span className="fx-url">carriers · 3400+</span></div>
                            <div className="fx-body">
                              <div className="fx-hero-block">
                                <strong>Global carrier network</strong>
                                <span>One API · every major lane</span>
                              </div>
                              <div className="fx-row" style={{marginTop: "0.75rem", flexWrap: "wrap", gap: "0.4rem"}}>
                                <span className="fx-chip"><img src="/assets/carriers/usps.svg?v=2" alt="" width="16" height="16" style={{display: "inline", verticalAlign: "middle", marginRight: 4}} />USPS</span>
                                <span className="fx-chip"><img src="/assets/carriers/ups.svg?v=2" alt="" width="16" height="16" style={{display: "inline", verticalAlign: "middle", marginRight: 4}} />UPS</span>
                                <span className="fx-chip"><img src="/assets/carriers/dhl.svg?v=2" alt="" width="16" height="16" style={{display: "inline", verticalAlign: "middle", marginRight: 4}} />DHL</span>
                                <span className="fx-chip">+3397</span>
                              </div>
                            </div>
                          </div>
                          <div className="fx-glass fx-float-a">
                            <div className="fx-carrier-row"><img src="/assets/carriers/ups.svg?v=2" alt="UPS" /><span style={{fontSize: "10px", color: "#64748b"}}>North America</span></div>
                            <strong>UPS</strong>
                          </div>
                          <div className="fx-glass fx-float-b">
                            <div className="fx-carrier-row"><img src="/assets/carriers/dhl.svg?v=2" alt="DHL" /><span style={{fontSize: "10px", color: "#64748b"}}>Cross-border</span></div>
                            <strong>DHL</strong>
                          </div>
                          <div className="fx-glass fx-float-c">
                            <strong>Need a carrier?</strong>
                            <span>Contact us to add it</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                  {/* 3 · Auto visibility + dashboard */}
                  <article className="feature-panel" data-feature="3" id="feature-panel-3" role="tabpanel" aria-labelledby="feature-tab-3">
                    <div className="feature-visual">
                      <div className="feature-stage" data-theme="split" style={{'-FxC': '0'}}>
                        <div className="feature-stage-art" aria-hidden="true">
                          <div className="fx-glass fx-main">
                            <div className="fx-chrome"><i></i><i></i><i></i><span className="fx-url">dashboard · reports</span></div>
                            <div className="fx-body">
                              <div className="fx-hero-block">
                                <strong>Ops dashboard</strong>
                                <span>Status · carriers · webhooks</span>
                              </div>
                              <div className="fx-status-grid">
                                <b className="is-ok">Sync<em>24/7</em></b>
                                <b className="is-on">Push<em>Live</em></b>
                                <b className="is-ok">Match<em>80%+</em></b>
                                <b>Alert<em>On</em></b>
                              </div>
                            </div>
                          </div>
                          <div className="fx-glass fx-float-a">
                            <strong>Auto identify</strong>
                            <span>From tracking number alone</span>
                          </div>
                          <div className="fx-glass fx-float-b">
                            <strong>Carrier SLA</strong>
                            <span>Time performance charts</span>
                          </div>
                          <div className="fx-glass fx-float-c">
                            <strong>Webhook health</strong>
                            <span>Push success alerts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
