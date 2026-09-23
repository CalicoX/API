/** Presentational section: ExploreMore — Tracking (from Returns) + Returns */

/* Returns 项目同款事件流（2026-09-21 Park：用 returns 的 tracking 模块替换） */
const TRACK_EVENTS = [
  { title: "Delivered", meta: "SAINT LOUIS, MO 63109 · 9/14/26, 8:23 PM", latest: true },
  { title: "Out for Delivery", meta: "RUSTON, LA 71270 · 10/31/24, 8:23 AM" },
  { title: "Arrived at Post Office", meta: "RUSTON, LA 71270 · 10/31/24, 6:49 AM" },
  { title: "In Transit to Next Facility", meta: "10/31/24, 6:38 AM" },
  { title: "Departed USPS Facility", meta: "MONROE, LA 71203 · 10/31/24, 4:17 AM" },
  { title: "Arrived at USPS Facility", meta: "MONROE, LA 71203 · 10/31/24, 4:00 AM" },
  { title: "In Transit to Next Facility", meta: "10/30/24, 6:38 PM" },
  { title: "Departed USPS Regional Facility", meta: "SHREVEPORT LA DISTRIBUTION CENTER · 10/30/24, 5:28 PM" },
  { title: "Accepted at USPS Regional Destination Facility", meta: "SHREVEPORT LA DISTRIBUTION CENTER · 10/30/24, 4:44 PM" },
  { title: "Arrived at USPS Regional Facility", meta: "SHREVEPORT LA DISTRIBUTION CENTER · 10/30/24, 2:28 PM" },
  { title: "In Transit to Next Facility", meta: "10/30/24, 2:33 AM" },
  { title: "Departed USPS Regional Facility", meta: "DALLAS TX LOGISTICS CENTER · 10/29/24, 11:57 PM" },
  { title: "Arrived USPS Regional Facility", meta: "DALLAS TX LOGISTICS CENTER · 10/29/24, 10:15 PM" },
  { title: "Departed Shipping Partner Facility, USPS Awaiting Item", meta: "GRAND PRAIRIE, TX 75052 · 10/29/24, 3:26 PM" },
  { title: "Arrived Shipping Partner Facility, USPS Awaiting Item", meta: "GRAND PRAIRIE, TX 75052 · 10/28/24, 7:22 PM" },
  { title: "Delivered to local carrier", meta: "10/28/24, 4:45 PM" },
  { title: "Departed from facility", meta: "LOS ANGELES, CALIFORNIA, US · 10/28/24, 6:57 AM" },
  { title: "Arrived at sort facility", meta: "LOS ANGELES, CALIFORNIA, US · 10/26/24, 10:58 PM" },
  { title: "Arrived at sort facility", meta: "10/25/24, 12:05 PM" },
  { title: "Departed from facility", meta: "10/25/24, 11:10 AM" },
  { title: "Clearance processing completed - Import", meta: "LOS ANGELES, CALIFORNIA, US · 10/25/24, 11:10 AM" },
  { title: "In clearance processing - Import", meta: "10/24/24, 9:09 AM" },
  { title: "International flight has arrived", meta: "US · 10/24/24, 8:03 AM" },
  { title: "International flight has departed", meta: "CN · 10/24/24, 7:56 AM" },
  { title: "Arrived at the origin international airport", meta: "CN · 10/24/24, 4:54 AM" },
  { title: "Shipment is in transit to next facility", meta: "Mainland China, CN · 10/22/24, 6:35 PM" },
  { title: "Departed from sort facility", meta: "Mainland China, CN · 10/22/24, 3:05 PM" },
  { title: "Arrived at origin facility", meta: "Mainland China, CN · 10/21/24, 9:52 PM" },
  { title: "Shipment information received", meta: "10/21/24, 9:26 PM" },
  { title: "Shipping Label Created, USPS Awaiting Item", meta: "9/9/26, 12:23 PM" },
];

export default function ExploreMore() {
  return (
<section className="section alt api-explore">
        <div className="section-inner">
          <div className="section-head center">
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
                <div className="os-status">
                  <h3>Your order has been delivered.</h3>
                  <div className="os-progress">
                    <i className="is-on"></i>
                    <i className="is-on"></i>
                    <i className="is-on"></i>
                    <i className="is-on"></i>
                    <i className="is-on is-now"></i>
                  </div>
                  <div className="os-progress-labels">
                    <span>Order pending</span>
                    <span>Info received</span>
                    <span>In transit</span>
                    <span>Pick up</span>
                    <span>Delivered</span>
                  </div>
                  <div className="os-carrier">
                    <b>USPS</b>
                    <span>9400 1000 0000 2849 1</span>
                  </div>
                  <ul className="os-events">
                    {TRACK_EVENTS.map((ev, i) => (
                      <li key={`${ev.title}-${i}`} className={ev.latest ? "is-latest" : undefined}>
                        <strong>{ev.title}</strong>
                        <span>{ev.meta}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="float-card float-card-metric">
                  <div className="float-card-top">
                    <span className="label">WISMO inquiries</span>
                    <span className="float-card-tag">−12%</span>
                  </div>
                  <span className="num">
                    <span className="num-arrow" aria-hidden="true">↓</span>
                    95%
                  </span>
                  <div className="mini-bars" aria-hidden="true">
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
                <div className="returns-kv-fit">
                  <div className="returns-kv-stage">
                    <img className="returns-ui-photo" src="/assets/returns-kv.jpg" alt="" />
                    <div className="returns-kv-flow">
                      <div className="returns-kv-card">
                        <p>What would you like to return?</p>
                        <div className="returns-kv-item">
                          <img src="/assets/returns-thumb-set.jpg" alt="" />
                          <span><strong>Olive Green Sports Set</strong><em>Olive | xxl · $80.00 · x2</em></span>
                          <i />
                        </div>
                        <div className="returns-kv-item is-on">
                          <img src="/assets/returns-thumb-jacket.jpg" alt="" />
                          <span><strong>Athletic Zip-Up Jacket</strong><em>White | xxl · $60.00 · x1</em></span>
                          <b />
                        </div>
                        <div className="returns-kv-item">
                          <img src="/assets/returns-thumb-sneakers.jpg" alt="" />
                          <span><strong>Beige Athletic Sneakers</strong><em>US 9.5 · $90.00 · x1</em></span>
                          <i />
                        </div>
                      </div>
                      <span className="returns-kv-link" aria-hidden="true"><b /><s /><b /></span>
                      <div className="returns-kv-card">
                        <p>Select return reason</p>
                        <div className="returns-kv-reason is-on"><b />Arrive too late</div>
                        <div className="returns-kv-reason"><i />Poor quality/faulty</div>
                        <div className="returns-kv-reason"><i />Parcel damaged on arrival</div>
                        <div className="returns-kv-reason"><i />Doesn't suit me</div>
                        <div className="returns-kv-reason"><i />Looks different to image on site</div>
                      </div>
                    </div>
                    <div className="returns-kv-method">
                      <p>Select return method</p>
                      <div><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6.5 4.5H4.2A1.2 1.2 0 003 5.7v8.6A1.2 1.2 0 004.2 15.5h7.6M13.5 15.5h2.3A1.2 1.2 0 0017 14.3V5.7A1.2 1.2 0 0015.8 4.5H8.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M8.2 7.2L6.2 5.2 8.2 3.2M11.8 12.8l2 2 2-2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Exchanges</div>
                      <div><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 7.2L10 4l6.5 3.2v8.1L10 18.4 3.5 15.3V7.2zM10 4v14.4M3.5 7.2L10 10.5l6.5-3.3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>Return and Refund</div>
                      <div className="is-on"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.8 8.2h12.4v7.3A1.7 1.7 0 0114.5 17.2H5.5A1.7 1.7 0 013.8 15.5V8.2zM3.8 8.2l1.4-3.4A1.4 1.4 0 016.5 3.8h7a1.4 1.4 0 011.3 1L16.2 8.2M7 11.4h6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Green Return</div>
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
