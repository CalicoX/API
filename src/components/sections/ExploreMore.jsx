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

            {/* Returns card — visual from tracking-react ExploreMore */}
            <a className="explore-card explore-card-returns" href="#">
              <div className="explore-card-copy">
                <span className="explore-title-ico explore-title-ico-returns" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path className="ico-r-arc-a" d="M20.5 12A8.5 8.5 0 0 0 6.2 5.8L4 8"/>
                    <path className="ico-r-head-a" d="M4 3.2V8h4.8"/>
                    <path className="ico-r-arc-b" d="M3.5 12A8.5 8.5 0 0 0 17.8 18.2L20 16"/>
                    <path className="ico-r-head-b" d="M20 20.8V16h-4.8"/>
                  </svg>
                </span>
                <h3>17RETURNS</h3>
                <strong className="explore-card-headline">Turn Returns Into Revenue and Growth</strong>
                <p>AI-assisted, branded return experiences help you automate returns, exchanges, and refunds, recover more revenue, and access competitive label rates for DTC brands.</p>
                <span className="explore-link">
                  <span className="explore-link-label">Explore 17RETURNS</span>
                  <span className="explore-link-arrow" aria-hidden="true">→</span>
                </span>
              </div>
              <div className="returns-ui" aria-hidden="true">
                <img className="returns-ui-photo" src="/assets/returns-scene.jpg" alt="" />
                <div className="returns-ui-blobs" aria-hidden="true">
                  <span></span><span></span><span></span>
                </div>
                <div className="returns-ui-stack">
                  <div className="returns-ui-card">
                    <div className="returns-win-bar" aria-hidden="true"><i></i><i></i><i></i></div>
                    <p className="returns-ui-brand">Urban Standards</p>
                    <div className="returns-ui-head">
                      <strong>Select an item to return</strong>
                      <span>You can add more items later.</span>
                    </div>
                    <div className="returns-ui-list">
                      <div className="returns-ui-item is-active" data-product="sneakers">
                        <div className="returns-ui-thumb">
                          <img src="/assets/returns-scene.jpg" alt="" />
                        </div>
                        <div className="returns-ui-meta">
                          <span className="name">Sneakers</span>
                          <span className="sub"><em>Size 38</em><i>·</i><b>$100.00</b></span>
                        </div>
                        <span className="returns-ui-arrow" aria-hidden="true">
                          <svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="returns-method">
                    <div className="returns-win-bar" aria-hidden="true"><i></i><i></i><i></i></div>
                    <p className="returns-method-title">Return method</p>
                    <div className="returns-method-list">
                      <div className="returns-method-opt" data-kind="refund">
                        <span className="rm-dot"></span>
                        <span className="rm-ico" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.4"/><path d="M6 12h.01M18 12h.01"/></svg>
                        </span>
                        <span className="rm-label">Refund</span>
                      </div>
                      <div className="returns-method-opt is-selected" data-kind="green">
                        <span className="rm-dot"></span>
                        <span className="rm-ico" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
                        </span>
                        <span className="rm-label">Green return</span>
                        <span className="rm-tag">ECO</span>
                      </div>
                      <div className="returns-method-opt" data-kind="exchange">
                        <span className="rm-dot"></span>
                        <span className="rm-ico" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>
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
