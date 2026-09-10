/** Presentational section: ExploreMore — Tracking (from Returns) + Returns */
export default function ExploreMore() {
  return (
<section className="section alt api-explore">
        <div className="section-inner">
          <div className="section-head">
            <h2>Find the Right Solution for Your Business</h2>
            <p className="lead">Go beyond tracking with solutions for post-purchase experience, returns automation, and global shipment visibility.</p>
          </div>
          <div className="explore-grid">
            {/* Tracking card — visual from Returns ExploreMore */}
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
                <h3>17TRACK ORDER TRACKING</h3>
                <p>Turn Tracking Into a Branded Customer Experience. Transform post-purchase tracking into a branded customer experience that keeps your brand in the journey, drives repeat purchases, and builds lasting customer loyalty.</p>
                <span className="explore-link">
                  <span className="explore-link-label">Explore 17TRACK Order Tracking</span>
                  <span className="explore-link-arrow" aria-hidden="true">→</span>
                </span>
              </div>
              <div className="track-ui" aria-hidden="true">
                <div className="track-ui-board">
                  <p className="track-ui-status">Your order has been delivered.</p>
                  <div className="track-ui-progress">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M7 8h10l-1 12H8L7 8z" />
                        <path d="M9.5 8V7a2.5 2.5 0 015 0v1" />
                      </svg>
                    </i>
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="4" y="5" width="16" height="14" rx="1.5" />
                        <path d="M8 9h8M8 13h5" />
                      </svg>
                    </i>
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 16V8h11v8H3z" />
                        <path d="M14 11h4l3 3v2h-7v-5z" />
                        <circle cx="7" cy="17.5" r="1.6" />
                        <circle cx="17" cy="17.5" r="1.6" />
                      </svg>
                    </i>
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 17V9l7-4 7 4v8" />
                        <path d="M9 17v-5h6v5" />
                      </svg>
                    </i>
                    <i className="is-now">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 20V10l8-6 8 6v10" />
                        <path d="M10 20v-6h4v6" />
                      </svg>
                    </i>
                  </div>
                  <div className="track-ui-labels">
                    <span>Ordered</span>
                    <span>Processed</span>
                    <span>Shipped</span>
                    <span>Out</span>
                    <span>Delivered</span>
                  </div>
                  <div className="track-ui-events">
                    <div className="track-ui-ev-head">
                      <strong>Shipping Events</strong>
                      <span>USPS · United States</span>
                    </div>
                    <ol className="track-ui-ev-list">
                      <li className="track-ui-ev is-now">
                        <i></i>
                        <div>
                          <b>Aug 18, 10:22</b>
                          <span>Shingle Springs, CA · Delivered</span>
                        </div>
                      </li>
                      <li className="track-ui-ev">
                        <i></i>
                        <div>
                          <b>Aug 18, 08:14</b>
                          <span>Out for Delivery, USPS</span>
                        </div>
                      </li>
                      <li className="track-ui-ev">
                        <i></i>
                        <div>
                          <b>Aug 17, 21:06</b>
                          <span>Arrived at Post Office</span>
                        </div>
                      </li>
                      <li className="track-ui-ev">
                        <i></i>
                        <div>
                          <b>Aug 16, 14:40</b>
                          <span>Picked Up by Shipping Partner</span>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="track-ui-wismo">
                  <div className="track-ui-wismo-top">
                    <span>WISMO inquiries</span>
                  </div>
                  <p className="track-ui-wismo-num">
                    <b>↓</b>
                    35%
                  </p>
                  <p className="track-ui-wismo-hint">More shoppers self-serve after purchase</p>
                  <div className="track-ui-bars">
                    <span style={{ height: "88%" }}></span>
                    <span style={{ height: "76%" }}></span>
                    <span style={{ height: "64%" }}></span>
                    <span style={{ height: "54%" }}></span>
                    <span style={{ height: "46%" }}></span>
                    <span style={{ height: "38%" }}></span>
                    <span style={{ height: "32%" }}></span>
                    <span style={{ height: "26%" }}></span>
                  </div>
                </div>
                <div className="track-ui-video">
                  <div className="track-ui-video-top">
                    <span>Brand video</span>
                  </div>
                  <div className="track-ui-thumb">
                    <img
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80"
                      alt=""
                      width="168"
                      height="105"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="track-ui-play">
                      <svg viewBox="0 0 12 12" fill="currentColor">
                        <path d="M3.2 2.1v7.8L10 6 3.2 2.1z" />
                      </svg>
                    </span>
                  </div>
                  <strong>Studio edit · unbox film</strong>
                  <p>
                    0:42
                    <i></i>
                    Post-purchase story
                  </p>
                </div>
              </div>
            </a>

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
                <h3>17RETURNS</h3>
                <p>Turn Returns Into Revenue and Growth. AI-assisted, branded return experiences help you automate returns, exchanges, and refunds, recover more revenue, and access competitive label rates for DTC brands.</p>
                <span className="explore-link">
                  <span className="explore-link-label">Explore 17RETURNS</span>
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
          </div>
        </div>
      </section>
  );
}
