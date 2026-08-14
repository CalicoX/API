/** Presentational section: ExploreMore — Returns + Tracking (API replaced with Tracking) */
export default function ExploreMore() {
  return (
<section className="section alt api-explore">
        <div className="section-inner">
          <div className="section-head">
            <h2>Need a branded tracking page or returns automation?</h2>
            <p className="lead">Beyond the Tracking API, explore ready-made products for storefronts and reverse logistics.</p>
          </div>
          <div className="explore-grid">
            {/* Returns card */}
            <a className="explore-card explore-card-returns" href="#">
              <div className="explore-card-copy">
                <span className="explore-title-ico explore-title-ico-returns" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
                    <path className="ico-r-path" d="M4 9h11a5 5 0 010 10h-3"/>
                    <path className="ico-r-arrow" d="M9 14L4 9l5-5"/>
                    <circle className="ico-r-dot" cx="0" cy="0" r="1.15" fill="currentColor" stroke="none"/>
                  </svg>
                </span>
                <h3>17 Returns</h3>
                <p>Automate returns, exchanges, and refunds to cut manual work, recover more revenue, and control reverse-logistics cost.</p>
                <span className="explore-link">
                  <span className="explore-link-label">Explore 17 Returns</span>
                  <span className="explore-link-arrow" aria-hidden="true">→</span>
                </span>
              </div>
              <div className="returns-ui" aria-hidden="true">
                <div className="returns-ui-blobs" aria-hidden="true">
                  <span></span><span></span><span></span>
                </div>
                <div className="returns-ui-stack">
                  <div className="returns-ui-card">
                    <p className="returns-ui-brand">URBAN STANDARDS</p>
                    <div className="returns-ui-head">
                      <strong>Select an item to return</strong>
                      <span>You can add more items later.</span>
                    </div>
                    <div className="returns-ui-list">
                      <div className="returns-ui-item is-active" data-product="sneakers">
                        <div className="returns-ui-thumb">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 15.5c1.5-3.5 5-5.5 9-5.5 2.2 0 4 .7 5.5 1.8L21 14"/>
                            <path d="M3 15.5h15.5a2.5 2.5 0 010 5H6.2c-1.8 0-3.2-1.4-3.2-3.2 0-.6.2-1.2.5-1.8z"/>
                            <path d="M8 12.2c.6-1 1.6-1.7 2.8-1.7"/>
                          </svg>
                        </div>
                        <div className="returns-ui-meta">
                          <span className="name">Sneakers</span>
                          <span className="sub"><em>Size 38</em><i>·</i><b>$100.00</b></span>
                        </div>
                        <span className="returns-ui-arrow" aria-hidden="true">
                          <svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      </div>
                      <div className="returns-ui-item" data-product="perfume">
                        <div className="returns-ui-thumb">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 3h4v3h-4z"/>
                            <path d="M11 6h2"/>
                            <path d="M8 9h8l-1 11a2 2 0 01-2 2h-2a2 2 0 01-2-2L8 9z"/>
                            <path d="M9.5 13h5"/>
                          </svg>
                        </div>
                        <div className="returns-ui-meta">
                          <span className="name">Perfume</span>
                          <span className="sub"><em>OS</em><i>·</i><b>$165.00</b></span>
                        </div>
                        <span className="returns-ui-arrow" aria-hidden="true">
                          <svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="returns-method">
                    <p className="returns-method-title">Return method</p>
                    <div className="returns-method-list">
                      <div className="returns-method-opt" data-kind="refund">
                        <span className="rm-dot"></span>
                        <span className="rm-ico" aria-hidden="true">
                          <svg viewBox="0 0 16 16" fill="none"><path d="M8 2v12M5.5 5.2c.5-1 1.5-1.6 2.7-1.6 1.6 0 2.8 1 2.8 2.4S9.8 8.4 8 8.4 5.2 9.4 5.2 10.8c0 1.4 1.2 2.4 2.9 2.4 1.2 0 2.2-.6 2.7-1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </span>
                        <span className="rm-label">Refund</span>
                      </div>
                      <div className="returns-method-opt is-selected" data-kind="green">
                        <span className="rm-dot"></span>
                        <span className="rm-ico" aria-hidden="true">
                          <svg viewBox="0 0 16 16" fill="none"><path d="M4 9.5c0 2.2 1.8 3.5 4 3.5s4-1.3 4-3.5c0-2.8-4-3-4-5.5 0-1.2.9-2 2-2 1.3 0 2 .9 2.2 1.8" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round"/><path d="M3.5 8.2c.6-1.6 1.8-2.6 3.3-2.6" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round"/></svg>
                        </span>
                        <span className="rm-label">Green return</span>
                        <span className="rm-tag">ECO</span>
                      </div>
                      <div className="returns-method-opt" data-kind="exchange">
                        <span className="rm-dot"></span>
                        <span className="rm-ico" aria-hidden="true">
                          <svg viewBox="0 0 16 16" fill="none"><path d="M3 5.5h8.5M9 3l2.5 2.5L9 8M13 10.5H4.5M7 8l-2.5 2.5L7 13" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        <span className="rm-label">Exchange</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* Tracking card — replaces former Tracking API card on this product page */}
            <a className="explore-card explore-card-tracking" href="#">
              <div className="explore-card-copy">
                <span className="explore-title-ico explore-title-ico-tracking" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
                    <path className="ico-t-box" d="M4 7.5L12 3l8 4.5v9L12 21l-8-4.5v-9z"/>
                    <path className="ico-t-mid" d="M4 7.5l8 4.5 8-4.5"/>
                    <path className="ico-t-seam" d="M12 12v9"/>
                    <circle className="ico-t-dot" cx="17" cy="8" r="1.2" fill="currentColor" stroke="none"/>
                  </svg>
                </span>
                <h3>17 Order Tracking</h3>
                <p>Branded order tracking for Shopify and DTC — cut WISMO tickets and turn tracking visits into repurchase moments.</p>
                <span className="explore-link">
                  <span className="explore-link-label">Explore 17 Order Tracking</span>
                  <span className="explore-link-arrow" aria-hidden="true">→</span>
                </span>
              </div>
              <div className="tracking-ui" aria-hidden="true">
                <div className="tracking-ui-blobs" aria-hidden="true">
                  <span></span><span></span><span></span>
                </div>
                <div className="tracking-ui-stack">
                  <div className="tracking-ui-card">
                    <div className="tracking-ui-chrome">
                      <i></i><i></i><i></i>
                      <span>brand.com/track</span>
                    </div>
                    <div className="tracking-ui-body">
                      <p className="tracking-ui-brand">OGL</p>
                      <strong className="tracking-ui-title">Your order is almost home</strong>
                      <span className="tracking-ui-sub">Out for delivery · ETA today 8:00 PM</span>
                      <div className="tracking-ui-timeline">
                        <div className="tracking-ui-step is-done"><span></span>Order confirmed</div>
                        <div className="tracking-ui-step is-done"><span></span>In transit</div>
                        <div className="tracking-ui-step is-active"><span></span>Out for delivery</div>
                        <div className="tracking-ui-step"><span></span>Delivered</div>
                      </div>
                    </div>
                  </div>
                  <div className="tracking-ui-float">
                    <span className="tracking-ui-float-label">WISMO</span>
                    <strong>−35%</strong>
                    <span className="tracking-ui-float-hint">Self-serve after purchase</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
  );
}
