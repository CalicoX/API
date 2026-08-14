/* Auto-migrated shell from tracking/index.html */
export default function LegacyLanding({ childrenReplaceHero = null }) {
  return (
    <div className="glass-shell">
      <div className="page" id="glass-content">
<header className="topbar">
      <div className="topbar-inner">
        <div className="nav-left">
          <a className="logo" href="#" aria-label="17TRACK">
            <img src="/assets/logo-17track.svg" alt="17TRACK" width="130" height="20" />
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <div className="nav-group">
              <a className="nav-item active" href="#">Tracking</a>
              <a className="nav-item" href="#">17RETURNS</a>
              <a className="nav-item" href="#">API</a>
            </div>
            <div className="nav-divider" aria-hidden="true"></div>
            <div className="nav-group">
              <a className="nav-item" href="#">Carriers <img src="/assets/icon-dropdown.svg" alt="" /></a>
              <a className="nav-item" href="#">Resources <img src="/assets/icon-dropdown.svg" alt="" /></a>
              <a className="nav-item" href="#">Pricing</a>
            </div>
          </nav>
        </div>
        <div className="nav-actions">
          <a className="btn-text" href="#">Sign in <img src="/assets/icon-chevron.svg" alt="" /></a>
          <a className="btn-split primary" href="#">
            <span className="main"><span className="full">Sign up</span><span className="short" hidden={true}>Sign up</span></span>
            <span className="caret"><img src="/assets/icon-caret.svg" alt="" /></span>
          </a>
          <a className="btn-split shopify" href="#">
            <span className="main">
              <img src="/assets/icon-bag.svg" alt="" />
              Shopify App
            </span>
            <span className="caret"><img src="/assets/icon-caret.svg" alt="" /></span>
          </a>
          <button className="menu-toggle" type="button" aria-label="Open={true} menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
<main>
      {/* Hero */}
      <section className="hero">
        <canvas className="hero-undertones" id="hero-undertones-canvas" aria-hidden="true"></canvas>
        <div className="hero-inner">
          <div>
            <div className="eyebrows">
              <span className="badge">17 Order Tracking</span>
              <img className="badge-shopify-img" src="https://static.17track.net/www/2026-08/assets/images/appdown/build_for_shopify.svg" alt="Built for Shopify" width="140" height="28" decoding="async" />
            </div>
            <h1>Bring every order tracking moment back to your brand</h1>
            <p className="lead">Create a branded order tracking page for Shopify and DTC brands. Proactively sync shipment status, cut WISMO tickets, and turn high-intent tracking visits into repurchase moments.</p>
            <div className="cta-row">
              <a className="btn-switch" href="#"><span className="btn-switch-knob" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.4" fill="currentColor" opacity="0.35"/><circle cx="8.2" cy="12" r="1.5" fill="currentColor" opacity="0.55"/><circle cx="11.5" cy="12" r="1.6" fill="currentColor" opacity="0.8"/><path d="M13 7.5L18.5 12 13 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="btn-switch-label">Start free trial</span></a>
              <a className="btn-demo" href="#">Book a demo</a>
            </div>
            <p className="cta-note">No credit card required={true} · One-click Shopify install · Embed on any storefront</p>
          </div>

          <div className="visual" aria-label="Branded tracking page product preview">
            <div className="visual-asm">
                                                <div className="browser">
              <div className="browser-top">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="browser-url">
                  <svg className="browser-url-lock" viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="2.5" y="5.5" width="7" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.1"/><path d="M4 5.5V4a2 2 0 014 0v1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
                  ogl.com/track
                </span>
                <span className="browser-top-actions" aria-hidden="true"><i></i><i></i></span>
              </div>
              <div className="hero-ogl" aria-hidden="true">
                <div className="ogl-page layout-hero theme-ogl">
                  <header className="ogl-nav">
                    <div className="ogl-nav-links"><span>Shop</span><span>Collections</span></div>
                    <div className="ogl-logo">OGL</div>
                    <div className="ogl-nav-icons" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/></svg>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 7h12l-1 12H7L6 7z"/><path d="M9 7a3 3 0 016 0"/></svg>
                    </div>
                  </header>
                  <div className="ogl-hero">
                    <img src="https://images.unsplash.com/photo-1516914589923-f105f1535f88?auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="" width="700" height="260" decoding="async" />
                    <div className="ogl-track-float">
                      <h3>Track Your Order</h3>
                      <div className="ogl-fields">
                        <input type="text" value="#OGL-28491" readonly={true} tabIndex="-1" />
                        <input type="email" value="alex@example.com" readonly={true} tabIndex="-1" />
                      </div>
                      <button type="button" className="ogl-track-btn" tabIndex="-1">Track</button>
                    </div>
                  </div>
                  <section className="ogl-status hero-ogl-status">
                    <div className="ogl-status-main">
                      <h2>Your Order is Almost Home</h2>
                      <p className="ogl-sub">Out for delivery — estimated today by 8:00 PM.</p>
                      <div className="ogl-note">
                        <span className="ogl-note-ico" aria-hidden="true">🔔</span>
                        <div>
                          <strong>SMS · Courier nearby soon</strong>
                          <span>We'll text you when it's on your street.</span>
                        </div>
                      </div>
                      <div className="ogl-timeline ogl-timeline-rich">
                        <div className="ogl-tl-item done"><div className="ogl-tl-dot"></div><div className="ogl-tl-body"><strong>Order confirmed</strong><span className="ogl-tl-time">Mon · Mar 12 · 10:24 AM</span><span className="ogl-tl-loc">OGL Studio · New York</span></div></div>
                        <div className="ogl-tl-item done"><div className="ogl-tl-dot"></div><div className="ogl-tl-body"><strong>In transit</strong><span className="ogl-tl-time">Tue · Mar 13</span><span className="ogl-tl-loc">Departed origin facility</span></div></div>
                        <div className="ogl-tl-item done"><div className="ogl-tl-dot"></div><div className="ogl-tl-body"><strong>Arrived local facility</strong><span className="ogl-tl-time">Wed · Mar 14 · 10:24 AM</span><span className="ogl-tl-loc">Los Angeles, CA</span></div></div>
                        <div className="ogl-tl-item active"><div className="ogl-tl-dot"></div><div className="ogl-tl-body"><strong>Out for delivery</strong><span className="ogl-tl-time">Wed · Mar 14 · 07:40 AM</span><span className="ogl-tl-loc">With courier</span></div></div>
                      </div>
                    </div>
                    <aside className="ogl-order-card">
                      <h4>Order summary</h4>
                      <div className="ogl-order-row"><span>Order</span><b>#OGL-28491</b></div>
                      <div className="ogl-order-row"><span>Carrier</span><b>UPS</b></div>
                      <div className="ogl-order-row"><span>ETA</span><b>Today · 8:00 PM</b></div>
                      <div className="ogl-order-items">
                        <div className="ogl-order-item">
                          <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&amp;fit=crop&amp;w=100&amp;q=80" alt="" width="40" height="40" loading="lazy" />
                          <div><div className="t">Merino Overcoat</div><div className="m">Size M · $248</div></div>
                        </div>
                        <div className="ogl-order-item">
                          <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&amp;fit=crop&amp;w=100&amp;q=80" alt="" width="40" height="40" loading="lazy" />
                          <div><div className="t">Soft Knit Scarf</div><div className="m">One size · $68</div></div>
                        </div>
                      </div>
                    </aside>
                  </section>
                </div>
              </div>
            </div>
            
            {/* floating metric: lower WISMO */}
            <div className="float-card float-card-metric">
              <div className="float-card-top">
                <span className="label">WISMO inquiries</span>
                <span className="float-card-tag">−12%</span>
              </div>
              <span className="num"><span className="num-arrow" aria-hidden="true">↓</span>35%</span>
              <span className="hint">More shoppers self-serve after purchase</span>
              <div className="mini-bars" aria-hidden="true">
                <span style={{height: '88%'}}></span>
                <span style={{height: '76%'}}></span>
                <span style={{height: '64%'}}></span>
                <span style={{height: '54%'}}></span>
                <span style={{height: '46%'}}></span>
                <span style={{height: '38%'}}></span>
                <span style={{height: '32%'}}></span>
                <span style={{height: '26%'}}></span>
              </div>
            </div>

            {/* floating brand video */}
            <div className="float-card float-card-video">
              <div className="float-card-top">
                <span className="label">Brand video</span>
                <span className="float-card-tag video">Embed</span>
              </div>
              <div className="video-thumb" aria-hidden="true">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&amp;fit=crop&amp;w=400&amp;q=80" alt="" width="168" height="105" loading="lazy" decoding="async" />
                <span className="video-play">
                  <svg viewBox="0 0 12 12" fill="currentColor"><path d="M3.2 2.1v7.8L10 6 3.2 2.1z"/></svg>
                </span>
              </div>
              <strong className="video-title">Winter edit · unbox film</strong>
              <div className="video-meta"><span>0:42</span><i></i><span>Post-purchase story</span></div>
            </div>
            {/* floating product recommendations — same OGL apparel set as in-page */}
            <div className="float-card float-card-rec">
              <div className="float-card-top">
                <span className="label">Recommended for you</span>
                <span className="float-card-tag rec">+28% CTR</span>
              </div>
              <div className="rec-items">
                <div className="rec-item">
                  <span className="rec-thumb">
                    <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&amp;fit=crop&amp;w=120&amp;q=80" alt="" width="42" height="42" loading="lazy" decoding="async" />
                  </span>
                  <div className="rec-meta">
                    <strong>Leather Gloves</strong>
                    <span>$86 · Completes the look</span>
                  </div>
                  <span className="rec-cta">Add</span>
                </div>
                <div className="rec-item">
                  <span className="rec-thumb">
                    <img src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&amp;fit=crop&amp;w=120&amp;q=80" alt="" width="42" height="42" loading="lazy" decoding="async" />
                  </span>
                  <div className="rec-meta">
                    <strong>Wool Beanie</strong>
                    <span>$42 · Bought together</span>
                  </div>
                  <span className="rec-cta">Add</span>
                </div>
              </div>
            </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust：上文案 + 下 logo 无限横滚 */}
      <section className="trust-band">
        <div className="trust">
          <div className="trust-copy">
            <strong>Trusted by 100,000+ brands and businesses</strong>
            <span>Post-purchase infrastructure for DTC, cross-border, and Shopify merchants.</span>
          </div>
          <div className="logos-marquee" aria-label="Brand logos">
            <div className="logos-track">
              <div className="logo-tile"><img src="/assets/logos/aliexpress.svg" alt="AliExpress" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile"><img src="/assets/logos/baleaf.png" alt="baleaf" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile"><img src="/assets/logos/anker.svg" alt="ANKER" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile"><img src="/assets/logos/coofandy.png" alt="COOFANDY" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile"><img src="/assets/logos/eufy.png" alt="eufy" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile"><img src="/assets/logos/shopify.svg" alt="Shopify" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile"><img src="/assets/logos/shein.svg" alt="SHEIN" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile"><img src="/assets/logos/temu.svg" alt="Temu" width="112" height="28" loading="lazy" decoding="async" /></div>
              {/* 复制一组，translateX(-50%) 无缝循环 */}
              <div className="logo-tile" aria-hidden="true"><img src="/assets/logos/aliexpress.svg" alt="" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile" aria-hidden="true"><img src="/assets/logos/baleaf.png" alt="" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile" aria-hidden="true"><img src="/assets/logos/anker.svg" alt="" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile" aria-hidden="true"><img src="/assets/logos/coofandy.png" alt="" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile" aria-hidden="true"><img src="/assets/logos/eufy.png" alt="" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile" aria-hidden="true"><img src="/assets/logos/shopify.svg" alt="" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile" aria-hidden="true"><img src="/assets/logos/shein.svg" alt="" width="112" height="28" loading="lazy" decoding="async" /></div>
              <div className="logo-tile" aria-hidden="true"><img src="/assets/logos/temu.svg" alt="" width="112" height="28" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Business impact — 100vh sticky, big stats + glowing growth curve */}
      <section className="impact-band" id="business-impact">
        <div className="impact-band-sticky">
          <canvas className="impact-bg-shader" id="impact-bg-shader" aria-hidden="true"></canvas>
          <div className="section-inner">
            <div className="section-head">
              <h2>Turn post-purchase into<br /><span className="impact-h2-l1">measurable growth</span></h2>
              <p className="impact-sub">Break the “support is pure cost” mindset — create more customer value at lower after-sales cost.</p>
            </div>
            <div className="impact-stats">
              <div className="impact-stat" data-impact data-value="95" data-decimals="0">
                <span className="impact-stat-bar" aria-hidden="true"></span>
                <div>
                  <div className="metric">
                    <span className="metric-num" data-count>0</span><span className="metric-suffix">%</span>
                  </div>
                  <span className="metric-label">Lower WISMO</span>
                </div>
              </div>
              <div className="impact-stat" data-impact data-value="16" data-decimals="0">
                <span className="impact-stat-bar" aria-hidden="true"></span>
                <div>
                  <div className="metric">
                    <span className="metric-num" data-count>0</span><span className="metric-suffix">%</span>
                  </div>
                  <span className="metric-label">Higher repurchase rate</span>
                </div>
              </div>
              <div className="impact-stat" data-impact data-value="20" data-decimals="0" data-plus="1">
                <span className="impact-stat-bar" aria-hidden="true"></span>
                <div>
                  <div className="metric">
                    <span className="metric-num" data-count>0</span><span className="metric-suffix">+%</span>
                  </div>
                  <span className="metric-label">Retained revenue</span>
                </div>
              </div>
              <div className="impact-stat" data-impact data-value="3.3" data-decimals="1">
                <span className="impact-stat-bar" aria-hidden="true"></span>
                <div>
                  <div className="metric">
                    <span className="metric-num" data-count>0</span><span className="metric-suffix">x</span>
                  </div>
                  <span className="metric-label">Loyalty lift</span>
                </div>
              </div>
            </div>
          </div>
          <div className="impact-curve" aria-hidden="true">
            <div className="impact-curve-grow">
              {/* single line + under-curve fill only (no outer glow stroke) */}
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
                  {/* under-curve: soft blue near line → solid white floor (not transparent) */}
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

      {/* Key features — title + left nav sticky; right panels scroll */}
      <section className="section alt features-section" id="key-features">
        <div className="section-inner">
          <div className="feature-scroll" id="feature-scroll">
            <div className="feature-sticky">
              <div className="section-head" id="feature-section-head">
                <div className="section-head-text">
                  <h2>Everything merchants need to control the post-purchase tracking experience</h2>
                  <p className="lead">Features are organized around merchant problems — not a technical checklist.</p>
                </div>
                <div className="feature-cta">
                  <a className="btn-switch" href="#"><span className="btn-switch-knob" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.4" fill="currentColor" opacity="0.35"/><circle cx="8.2" cy="12" r="1.5" fill="currentColor" opacity="0.55"/><circle cx="11.5" cy="12" r="1.6" fill="currentColor" opacity="0.8"/><path d="M13 7.5L18.5 12 13 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="btn-switch-label">Start free trial</span></a>
                  <a className="btn-demo" href="#">Book a demo</a>
                </div>
              </div>
              <div className="feature-layout">
                <div className="feature-side-wrap">
                  <div className="feature-side" id="feature-side">
                  <div className="feature-list" role="tablist" aria-label="Key features">
                    <button className="feature active" type="button" id="feature-tab-0" data-feature="0" role="tab" aria-selected="true" aria-controls="feature-panel-0">
                      <h3>Branded tracking page</h3>
                      <p>Let customers self-serve on a branded page that also hosts content, product recommendations, and support entry points.</p>
                    </button>
                    <button className="feature" type="button" id="feature-tab-1" data-feature="1" role="tab" aria-selected="false" aria-controls="feature-panel-1">
                      <h3>Proactive notifications</h3>
                      <p>Sync logistics milestones via email, SMS, or other channels to cut repetitive support volume.</p>
                    </button>
                    <button className="feature" type="button" id="feature-tab-2" data-feature="2" role="tab" aria-selected="false" aria-controls="feature-panel-2">
                      <h3>Last-mile visibility</h3>
                      <p>Show last-mile, out-for-delivery, and exception states so customers understand delays and next steps.</p>
                    </button>
                    <button className="feature" type="button" id="feature-tab-3" data-feature="3" role="tab" aria-selected="false" aria-controls="feature-panel-3">
                      <h3>Split-order tracking</h3>
                      <p>Handle split shipments, multi-package, and multi-carrier orders without confusing customers about fulfillment status.</p>
                    </button>
                  </div>{/* /.feature-list */}
                  </div>{/* /.feature-side */}
                </div>{/* /.feature-side-wrap */}
                <div className="feature-panels-col">
                  <div className="feature-panels" id="feature-panels">
                  {/* 0 · Branded tracking page */}
                  <article className="feature-panel is-active" data-feature="0" id="feature-panel-0" role="tabpanel" aria-labelledby="feature-tab-0">
                    <div className="feature-visual">
                      <div className="feature-stage" data-theme="branded" style={{'-FxC': '1'}}>
                        <div className="feature-stage-art" aria-hidden="true">
                          <div className="fx-glass fx-main">
                            <div className="fx-chrome"><i></i><i></i><i></i><span className="fx-url">brand.com/track/order</span></div>
                            <div className="fx-body">
                              <div className="fx-hero-block has-photo">
                                <img className="fx-hero-photo" src="/assets/products/earbuds.jpg" alt="" loading="lazy" decoding="async" />
                                <strong>Track your order</strong>
                                <span>Estimated delivery · Friday</span>
                              </div>
                              <div className="fx-status-grid">
                                <b className="is-ok">Ordered<em>Mon</em></b>
                                <b className="is-ok">Shipped<em>Tue</em></b>
                                <b className="is-on">Transit<em>Live</em></b>
                                <b>Delivered<em>Fri</em></b>
                              </div>
                            </div>
                          </div>
                          <div className="fx-glass fx-float-a">
                            <div className="fx-illus"><img src="/assets/products/earbuds.jpg" alt="" loading="lazy" decoding="async" /></div>
                            <strong>Wireless earbuds Pro</strong>
                            <span>$129 · Brand storefront</span>
                          </div>
                          <div className="fx-glass fx-float-b">
                            <strong>You may also like</strong>
                            <div className="fx-thumb-row">
                              <img src="/assets/products/case.jpg" alt="" loading="lazy" decoding="async" />
                              <img src="/assets/products/tips.jpg" alt="" loading="lazy" decoding="async" />
                              <img src="/assets/products/earbuds.jpg" alt="" loading="lazy" decoding="async" />
                            </div>
                          </div>
                          <div className="fx-glass fx-float-c">
                            <strong>Support entry</strong>
                            <span>Chat · FAQ · Returns</span>
                          </div>
                        </div>
</div>
                    </div>
                  </article>
                  {/* 1 · Proactive notifications */}
                  <article className="feature-panel" data-feature="1" id="feature-panel-1" role="tabpanel" aria-labelledby="feature-tab-1">
                    <div className="feature-visual">
                      <div className="feature-stage" data-theme="notify" style={{'-FxC': '0'}}>
                        <div className="feature-stage-art" aria-hidden="true">
                          <div className="fx-glass fx-main">
                            <div className="fx-chrome"><i></i><i></i><i></i><span className="fx-url">brand.com/track/notify</span></div>
                            <div className="fx-body">
                              <div className="fx-hero-block has-photo">
                                <img className="fx-hero-photo" src="/assets/features/phone-notify.jpg" alt="" loading="lazy" decoding="async" />
                                <strong>Alerts on autopilot</strong>
                                <span>Email · SMS · Push synced</span>
                              </div>
                              <div className="fx-status-grid">
                                <b className="is-ok">Email<em>On</em></b>
                                <b className="is-ok">SMS<em>On</em></b>
                                <b className="is-on">Push<em>Live</em></b>
                                <b>Webhook<em>—</em></b>
                              </div>
                            </div>
                          </div>
                          <div className="fx-glass fx-float-a">
                            <div className="fx-illus"><img src="/assets/features/phone-notify.jpg" alt="" loading="lazy" decoding="async" /></div>
                            <strong>Email queued</strong>
                            <span>Out for delivery template</span>
                          </div>
                          <div className="fx-glass fx-float-b">
                            <strong>SMS · +1 ··· 4821</strong>
                            <span>Your package is on the truck today 2–4pm.</span>
                          </div>
                          <div className="fx-glass fx-float-c">
                            <div className="fx-illus"><img src="/assets/products/earbuds.jpg" alt="" loading="lazy" decoding="async" /></div>
                            <strong>WISMO avoided</strong>
                            <span>Proactive ping before they ask</span>
                          </div>
                        </div>
</div>
                    </div>
                  </article>
                  {/* 2 · Last-mile visibility — arc route + van animation */}
                  <article className="feature-panel" data-feature="2" id="feature-panel-2" role="tabpanel" aria-labelledby="feature-tab-2">
                    <div className="feature-visual">
                      <div className="feature-stage" data-theme="lastmile" style={{'-FxC': '0'}}>
                        <div className="feature-stage-art" aria-hidden="true">
                          <div className="fx-route-map">
                            <svg viewBox="0 0 440 220" preserveAspectRatio="xMidYMid meet">
                              <defs>
                                <linearGradient id="fx-route-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#38bdf8"/>
                                  <stop offset="45%" stopColor="#3b82f6"/>
                                  <stop offset="100%" stopColor="#8b5cf6"/>
                                </linearGradient>
                                <filter id="fx-route-glow" x="-20%" y="-20%" width="140%" height="140%">
                                  <feGaussianBlur stdDeviation="2.2" result="b"/>
                                  <feMerge>
                                    <feMergeNode in="b"/>
                                    <feMergeNode in="SourceGraphic"/>
                                  </feMerge>
                                </filter>
                                <path id="fx-route-path"
                                  d="M 36 168
                                     C 90 168, 120 120, 168 108
                                     C 220 94, 250 140, 300 128
                                     C 348 116, 360 72, 400 64"/>
                              </defs>
                              {/* soft map blocks */}
                              <rect x="48" y="40" width="52" height="36" rx="6" fill="rgba(255,255,255,0.45)"/>
                              <rect x="180" y="28" width="70" height="28" rx="6" fill="rgba(255,255,255,0.35)"/>
                              <rect x="300" y="100" width="60" height="40" rx="6" fill="rgba(255,255,255,0.4)"/>
                              <rect x="90" y="130" width="48" height="32" rx="6" fill="rgba(255,255,255,0.3)"/>
                              {/* dashed base path (arcs) */}
                              <path className="route-base"
                                d="M 36 168 C 90 168, 120 120, 168 108 C 220 94, 250 140, 300 128 C 348 116, 360 72, 400 64"/>
                              {/* live path draw */}
                              <path className="route-live" filter="url(#fx-route-glow)" pathLength="280"
                                d="M 36 168 C 90 168, 120 120, 168 108 C 220 94, 250 140, 300 128 C 348 116, 360 72, 400 64"/>
                              {/* nodes */}
                              <circle className="route-node is-hub" cx="36" cy="168" r="7"/>
                              <circle className="route-node" cx="168" cy="108" r="5.5"/>
                              <circle className="route-node" cx="300" cy="128" r="5.5"/>
                              <circle className="route-node is-home" cx="400" cy="64" r="7"/>
                              <text className="route-label" x="36" y="192" textAnchor="middle">Hub</text>
                              <text className="route-label" x="168" y="96" textAnchor="middle">Sort</text>
                              <text className="route-label" x="300" y="150" textAnchor="middle">Local</text>
                              <text className="route-label" x="400" y="52" textAnchor="middle">Home</text>
                              {/* van along path */}
                              <g className="fx-van-g">
                                <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto" keyPoints="0;0;1;1" keyTimes="0;0.08;0.78;1" calcMode="linear">
                                  <mpath href="#fx-route-path"/>
                                </animateMotion>
                                <g transform="translate(-18,-14)">
                                  <rect x="2" y="8" width="22" height="12" rx="2.5" fill="#2563eb"/>
                                  <path d="M24 11h6l4 5v4H24V11z" fill="#1d4ed8"/>
                                  <rect x="4" y="10" width="8" height="5" rx="1" fill="#93c5fd"/>
                                  <circle cx="10" cy="22" r="3" fill="#0f172a"/>
                                  <circle cx="10" cy="22" r="1.3" fill="#94a3b8"/>
                                  <circle cx="28" cy="22" r="3" fill="#0f172a"/>
                                  <circle cx="28" cy="22" r="1.3" fill="#94a3b8"/>
                                  <rect x="26" y="12" width="4" height="3.5" rx="0.6" fill="#bfdbfe"/>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div className="fx-glass fx-main">
                            <div className="fx-chrome"><i></i><i></i><i></i><span className="fx-url">brand.com/track/last-mile</span></div>
                            <div className="fx-body">
                              <div className="fx-hero-block has-photo">
                                <img className="fx-hero-photo" src="/assets/features/delivery.jpg" alt="" loading="lazy" decoding="async" />
                                <strong>Out for delivery</strong>
                                <span>Courier · ETA 2–4pm today</span>
                              </div>
                              <div className="fx-row">
                                <span className="fx-chip"><i className="fx-dot is-amber"></i>With driver</span>
                                <span className="fx-chip"><i className="fx-dot is-blue"></i>Address OK</span>
                              </div>
                            </div>
                          </div>
                          <div className="fx-glass fx-float-a">
                            <div className="fx-illus"><img src="/assets/features/package.jpg" alt="" loading="lazy" decoding="async" /></div>
                            <strong>Exception explained</strong>
                            <span>Not available — redelivery tomorrow 9–12.</span>
                          </div>
                          <div className="fx-glass fx-float-b">
                            <strong>Next steps</strong>
                            <div className="fx-row">
                              <span className="fx-chip">Reschedule</span>
                              <span className="fx-chip">Leave at door</span>
                            </div>
                          </div>
                        </div>
</div>
                    </div>
                  </article>
                  {/* 3 · Split-order tracking */}
                  <article className="feature-panel" data-feature="3" id="feature-panel-3" role="tabpanel" aria-labelledby="feature-tab-3">
                    <div className="feature-visual">
                      <div className="feature-stage" data-theme="split" style={{'-FxC': '0'}}>
                        <div className="feature-stage-art" aria-hidden="true">
                          <div className="fx-glass fx-main">
                            <div className="fx-chrome"><i></i><i></i><i></i><span className="fx-url">brand.com/track/packages</span></div>
                            <div className="fx-body">
                              <div className="fx-hero-block has-photo">
                                <img className="fx-hero-photo" src="/assets/features/package.jpg" alt="" loading="lazy" decoding="async" />
                                <strong>2 packages · 1 order</strong>
                                <span>Package 1 of 2 delivered</span>
                              </div>
                              <div className="fx-pkg-pair">
                                <div>
                                  <img src="/assets/products/earbuds.jpg" alt="" />
                                  <span>Pkg A<em>UPS · Done</em></span>
                                </div>
                                <div>
                                  <img src="/assets/products/case.jpg" alt="" />
                                  <span>Pkg B<em>DHL · Live</em></span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="fx-glass fx-float-a">
                            <div className="fx-illus"><img src="/assets/products/earbuds.jpg" alt="" loading="lazy" decoding="async" /></div>
                            <strong>Package A</strong>
                            <div className="fx-carrier-row"><img src="/assets/carriers/ups.svg?v=2" alt="UPS" /><span style={{fontSize: '10px', color: '#64748b'}}>Delivered Mon</span></div>
                          </div>
                          <div className="fx-glass fx-float-b">
                            <div className="fx-illus"><img src="/assets/products/case.jpg" alt="" loading="lazy" decoding="async" /></div>
                            <strong>Package B</strong>
                            <div className="fx-carrier-row"><img src="/assets/carriers/dhl.svg?v=2" alt="DHL" /><span style={{fontSize: '10px', color: '#64748b'}}>In transit</span></div>
                          </div>
                          <div className="fx-glass fx-float-c">
                            <strong>Unified view</strong>
                            <span>Both on one tracking page</span>
                          </div>
                        </div>
</div>
                    </div>
                  </article>
                </div>{/* /.feature-panels */}
                </div>{/* /.feature-panels-col */}
              </div>{/* /.feature-layout */}
            </div>
          </div>
        </div>
      </section>

      {/* AI Lab */}
      <section className="ai-lab" id="ai-lab">
        <div className="ai-lab-intro-track" id="ai-lab-intro-track">
          <div className="ai-lab-intro" id="ai-lab-intro">
            {/* CSS/SVG streams only — no canvas RAF (was janky) */}
            <div className="ai-intro-bg" aria-hidden="true">
              <div className="ai-intro-streams">
                <svg className="ai-intro-streams-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
                  <defs>
                    <linearGradient id="ai-stream-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="0"/>
                      <stop offset="35%" stopColor="#c4b5fd" stopOpacity="0.55"/>
                      <stop offset="65%" stopColor="#e879f9" stopOpacity="0.45"/>
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <g className="ai-stream-layer ai-stream-layer-a" fill="none" stroke="url(#ai-stream-grad)" strokeLinecap="round">
                    <path className="ai-stream" d="M-40 120 C 200 80, 420 160, 720 110 S 1200 60, 1500 130"/>
                    <path className="ai-stream" d="M-40 200 C 240 250, 480 150, 760 210 S 1180 180, 1500 230"/>
                    <path className="ai-stream" d="M-40 720 C 260 680, 500 760, 780 700 S 1160 740, 1500 690"/>
                    <path className="ai-stream" d="M-40 800 C 220 840, 460 760, 740 820 S 1200 780, 1500 830"/>
                  </g>
                  <g className="ai-stream-layer ai-stream-layer-b" fill="none" stroke="url(#ai-stream-grad)" strokeLinecap="round">
                    <path className="ai-stream" d="M-40 160 C 280 200, 520 100, 800 170 S 1220 140, 1500 190"/>
                    <path className="ai-stream" d="M-40 760 C 300 720, 540 800, 820 740 S 1180 780, 1500 760"/>
                  </g>
                </svg>
                <div className="ai-intro-dots"></div>
              </div>
              <div className="ai-intro-veil"></div>
            </div>
            <div className="ai-lab-intro-inner" id="ai-lab-intro-inner">
              {/* blur/fade only this block — pills stay sharp outside */}
              <div className="ai-lab-intro-copy" id="ai-lab-intro-copy">
                <div className="ai-intro-orb-row ai-reveal" id="ai-intro-orb-row">
                  <canvas id="ai-intro-orb-canvas" width="128" height="128" aria-hidden="true"></canvas>
                  <span className="ai-intro-orb-label" id="ai-intro-orb-label"><span className="ai-orb-type-text">Searching…</span><span className="ai-orb-caret" aria-hidden="true"></span></span>
                </div>
                <h2 id="ai-intro-title">
                  Show how AI turns tracking pages into personalized post-purchase journeys
                </h2>
                <p className="lead ai-reveal delay-2">Use real brand case studies when available. Without approval, ship industry-template scenarios first — never present mockups as customer outcomes.</p>
              </div>
              <div className="ai-pills" id="ai-pills">
                <span className="ai-pill"><span className="ai-pill-label">AI content personalization</span></span>
                <span className="ai-pill"><span className="ai-pill-label">Shipment-status aware</span></span>
                <span className="ai-pill"><span className="ai-pill-label">Risk-based messaging</span></span>
                <span className="ai-pill"><span className="ai-pill-label">Smart product recommendation</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* 竖线：从 intro 标签模块延伸到案例区（绝对定位在 .ai-lab 内） */}
        <div className="ai-intro-rail" id="ai-intro-rail" aria-hidden="true">
          <div className="ai-intro-rail-track"></div>
          <div className="ai-intro-rail-fill" id="ai-intro-rail-fill"></div>
          <div className="ai-intro-rail-dot" id="ai-intro-rail-dot"></div>
        </div>

        {/* 连接桥：高度占位，背景与案例区衔接 */}
        <div className="ai-intro-bridge" id="ai-intro-bridge" aria-hidden="true"></div>

        <div className="ai-lab-work" id="ai-lab-work">
          <div className="ai-lab-sticky">
            <div className="ai-lab-grid">
              <div className="ai-lab-left">
              <aside className="ai-think" aria-label="AI analyzing">
                <div className="ai-agent-card">
                  <div className="ai-agent-title">
                    <span>Tracking AI Agent</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <p className="ai-agent-lead">Our AI is analyzing your page and creating templates that match your brand</p>
                  <div className="ai-agent-url">
                    <span className="ai-agent-url-ico" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    </span>
                    <span className="ai-agent-url-text">https://www.anker.com</span>
                    <span className="ai-agent-badge" id="ai-agent-badge">Processing</span>
                  </div>
                </div>
                <div className="ai-orb-row">
                  <canvas id="ai-orb-canvas" width="128" height="128" aria-hidden="true"></canvas>
                  <span className="ai-orb-label"><span className="ai-orb-type-text">Searching…</span><span className="ai-orb-caret" aria-hidden="true"></span></span>
                </div>
                <div className="ai-sse" id="ai-sse">
                  <div className="ai-timeline" id="ai-timeline" aria-live="polite">
                    <div className="ai-step" data-step="0">
                      <div className="ai-step-ico" data-ico="search"></div>
                      <div className="ai-step-body">
                        <div className="ai-step-title">Fetching your store style</div>
                        <div className="ai-step-detail">
                          <span className="ai-chip">storefront</span>
                          <span className="ai-chip">css tokens</span>
                          <span className="ai-chip">fonts</span>
                        </div>
                      </div>
                    </div>
                    <div className="ai-step" data-step="1">
                      <div className="ai-step-ico" data-ico="image"></div>
                      <div className="ai-step-body">
                        <div className="ai-step-title">Analyzing your brand style</div>
                        <div className="ai-step-detail">
                          <div className="ai-mini-card">
                            <div className="ai-mini-card-top"><span className="ai-mini-dot"></span><span className="ai-mini-dot"></span></div>
                            <strong>Brand palette</strong>
                            <span>Primary · accent · type scale</span>
                          </div>
                          <span className="ai-step-sub">Profile extracted from storefront</span>
                        </div>
                      </div>
                    </div>
                    <div className="ai-step" data-step="2">
                      <div className="ai-step-ico" data-ico="globe"></div>
                      <div className="ai-step-body">
                        <div className="ai-step-title">Generating tracking page</div>
                        <div className="ai-step-detail">
                          <button type="button" className="ai-step-link" tabIndex="-1">Explored 6 modules <span>›</span></button>
                        </div>
                      </div>
                    </div>
                    <div className="ai-step" data-step="3">
                      <div className="ai-step-ico" data-ico="gear"></div>
                      <div className="ai-step-body">
                        <div className="ai-step-title">Adjust the page</div>
                        <div className="ai-step-detail">
                          <span className="ai-step-sub">Compiling layout, copy, and recommendations…</span>
                        </div>
                      </div>
                    </div>
                    <div className="ai-step" data-step="4">
                      <div className="ai-step-ico" data-ico="check"></div>
                      <div className="ai-step-body">
                        <div className="ai-step-title">Done</div>
                        <div className="ai-step-detail">
                          <span className="ai-step-sub">Tracking template ready for review</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* CTA：在 agent 面板内部底部，上下排 */}
                <div className="ai-lab-cta">
                  <a className="btn-switch" href="#"><span className="btn-switch-knob" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.4" fill="currentColor" opacity="0.35"/><circle cx="8.2" cy="12" r="1.5" fill="currentColor" opacity="0.55"/><circle cx="11.5" cy="12" r="1.6" fill="currentColor" opacity="0.8"/><path d="M13 7.5L18.5 12 13 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="btn-switch-label">Start free trial</span></a>
              <a className="btn-demo" href="#">Book a demo</a>
                </div>
              </aside>
              </div>

              <div className="ai-stack">
                <div className="ai-stack-stage" id="ai-stack-stage">
                      {/* Card 0–3: full OGL fashion tracking page (fig.1) */}
                      <article className="ai-case" data-i="0">
                        <div className="ai-case-inner">
                          <div className="ai-case-face front">
                            <button type="button" className="ai-case-zoom" aria-label="Open={true} case" title="Open">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/><path d="M11 8v6M8 11h6"/></svg>
                            </button>
                            <div className="ai-case-art" data-ogl-page></div>
                          </div>
                          <div className="ai-case-face back">
                            <strong>Status-aware messaging</strong>
                            <p>Copy and CTAs that shift with shipment status — out for delivery becomes the conversion moment.</p>
                          </div>
                        </div>
                      </article>
                      <article className="ai-case" data-i="1">
                        <div className="ai-case-inner">
                          <div className="ai-case-face front">
                            <button type="button" className="ai-case-zoom" aria-label="Open={true} case" title="Open">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/><path d="M11 8v6M8 11h6"/></svg>
                            </button>
                            <div className="ai-case-art" data-ogl-page></div>
                          </div>
                          <div className="ai-case-face back">
                            <strong>Post-delivery retention</strong>
                            <p>Drive repurchase and reviews after delivery with AI-timed recommendations.</p>
                          </div>
                        </div>
                      </article>
                      <article className="ai-case" data-i="2">
                        <div className="ai-case-inner">
                          <div className="ai-case-face front">
                            <button type="button" className="ai-case-zoom" aria-label="Open={true} case" title="Open">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/><path d="M11 8v6M8 11h6"/></svg>
                            </button>
                            <div className="ai-case-art" data-ogl-page></div>
                          </div>
                          <div className="ai-case-face back">
                            <strong>Risk-based messaging</strong>
                            <p>Calm delays with clear next steps and proactive support entry points.</p>
                          </div>
                        </div>
                      </article>
                      <article className="ai-case" data-i="3">
                        <div className="ai-case-inner">
                          <div className="ai-case-face front">
                            <button type="button" className="ai-case-zoom" aria-label="Open={true} case" title="Open">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/><path d="M11 8v6M8 11h6"/></svg>
                            </button>
                            <div className="ai-case-art" data-ogl-page></div>
                          </div>
                          <div className="ai-case-face back">
                            <strong>Multi-package clarity</strong>
                            <p>One order, many carriers — still clear with AI-summarized package status.</p>
                          </div>
                        </div>
                      </article>
                    </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Explore more */}
      <section className="section alt">
        <div className="section-inner">
          <div className="section-head">
            <h2>Need returns automation or shipment data infrastructure?</h2>
            <p className="lead">Beyond tracking, explore returns automation and shipment data APIs — pick the product that matches your stage.</p>
          </div>
          <div className="explore-grid">
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
                  {/* product picker card */}
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
                  {/* return method card — top/left positioned, backdrop-filter glass */}
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
            <a className="explore-card explore-card-api" href="https://api.17track.net/zh-cn/doc#%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97" target="_blank" rel="noopener">
              <div className="api-ascii" aria-hidden="true">
                <pre className="api-ascii-layer api-ascii-a"></pre>
                <pre className="api-ascii-layer api-ascii-b"></pre>
              </div>
              <div className="explore-card-copy">
                <span className="explore-title-ico explore-title-ico-api" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
                    <path className="ico-a-left" d="M8 7l-4 5 4 5"/>
                    <path className="ico-a-slash" d="M13 5l-2 14"/>
                    <path className="ico-a-right" d="M16 7l4 5-4 5"/>
                  </svg>
                </span>
                <h3>Tracking API</h3>
                <p>Global shipment tracking data for developers and enterprise systems — less multi-carrier integration overhead.</p>
                <span className="explore-link">
                  <span className="explore-link-label">Explore Tracking API</span>
                  <span className="explore-link-arrow" aria-hidden="true">→</span>
                </span>
              </div>
              <div className="explore-api-visual" aria-hidden="true">
                <div className="code-window" data-code-anim="api">
                  <div className="code-window-chrome">
                    <span className="cw-dots"><i></i><i></i><i></i></span>
                    <span className="cw-path">track/v2.4/register</span>
                    <span className="cw-progress">
                      <span className="cw-progress-bar"><i data-cw-bar></i></span>
                      <span data-cw-pct>0%</span>
                    </span>
                  </div>
                  <div className="code-window-body">
                    <div className="cw-tasks" data-cw-tasks>
                      <div className="cw-task is-running" data-cw-task="0">
                        <span className="cw-ico">|</span>
                        <span className="cw-label"><span className="hl">Register tracking numbers</span> <span className="tag">api</span></span>
                        <span className="cw-status">[running]</span>
                      </div>
                      <div className="cw-task is-pending" data-cw-task="1">
                        <span className="cw-ico">|</span>
                        <span className="cw-label"><span className="hl">Parse accepted / rejected</span> <span className="tag">guide</span></span>
                        <span className="cw-status">[queued]</span>
                      </div>
                    </div>
                    <div className="cw-thought" data-cw-thought>Thought for 0.0s</div>
                    <div className="cw-edit">
                      <div className="cw-edit-head"><strong>Edit</strong> <span>src/17track/register.js</span></div>
                      <div className="cw-code" data-cw-typewriter>
                        <div className="cw-code-scroll" data-cw-scroll></div>
                      </div>
                    </div>
                  </div>
                  <div className="code-window-foot">
                    <div className="code-window-foot-top">
                      <span className="cw-build">Build</span>
                      <span className="cw-prompt">Webhook receives TRACKING_UPDATED</span>
                      <span className="cw-explore">Explore →</span>
                    </div>
                  </div>
                </div>
                <div className="api-carriers">
                  {/*
                    viewBox 280×80; col centers 10/30/50/70/90% → 28,84,140,196,252
                    Curves start under terminal (y≈4) and end on tile tops (y≈76).
                    SVG margin pulls into window + tiles so paths actually connect.
                  */}
                  <svg className="api-carriers-lines" viewBox="0 0 280 80" preserveAspectRatio="none" aria-hidden="true">
                    {/* hub under terminal */}
                    <circle className="api-flow-hub" cx="140" cy="4" r="3" fill="rgba(191,219,254,0.95)"/>
                    {/* solid curved branches (5 separate paths) */}
                    <path className="api-flow-static" d="M140 4 C140 30, 28 34, 28 76"/>
                    <path className="api-flow-static" d="M140 4 C140 28, 84 30, 84 76"/>
                    <path className="api-flow-static" d="M140 4 C140 34, 140 48, 140 76"/>
                    <path className="api-flow-static" d="M140 4 C140 28, 196 30, 196 76"/>
                    <path className="api-flow-static" d="M140 4 C140 30, 252 34, 252 76"/>
                    {/* solid flow packets */}
                    <path className="api-flow-pulse p1" d="M140 4 C140 30, 28 34, 28 76"/>
                    <path className="api-flow-pulse p2" d="M140 4 C140 28, 84 30, 84 76"/>
                    <path className="api-flow-pulse p3" d="M140 4 C140 34, 140 48, 140 76"/>
                    <path className="api-flow-pulse p4" d="M140 4 C140 28, 196 30, 196 76"/>
                    <path className="api-flow-pulse p5" d="M140 4 C140 30, 252 34, 252 76"/>
                    {/* dots on tile tops */}
                    <circle cx="28" cy="76" r="2.4" fill="rgba(191,219,254,0.95)"/>
                    <circle cx="84" cy="76" r="2.4" fill="rgba(191,219,254,0.95)"/>
                    <circle cx="140" cy="76" r="2.4" fill="rgba(191,219,254,0.95)"/>
                    <circle cx="196" cy="76" r="2.4" fill="rgba(191,219,254,0.95)"/>
                    <circle cx="252" cy="76" r="2.4" fill="rgba(191,219,254,0.95)"/>
                  </svg>
                  <div className="api-carriers-row">
                    <div className="api-carrier" title="USPS">
                      <span className="api-carrier-tile">
                        <img src="/assets/carriers/usps.svg?v=2" alt="USPS" width="36" height="36" loading="lazy" decoding="async" />
                      </span>
                      <span className="api-carrier-name">USPS</span>
                    </div>
                    <div className="api-carrier" title="UPS">
                      <span className="api-carrier-tile">
                        <img src="/assets/carriers/ups.svg?v=2" alt="UPS" width="36" height="36" loading="lazy" decoding="async" />
                      </span>
                      <span className="api-carrier-name">UPS</span>
                    </div>
                    <div className="api-carrier" title="DHL">
                      <span className="api-carrier-tile">
                        <img src="/assets/carriers/dhl.svg?v=2" alt="DHL" width="36" height="36" loading="lazy" decoding="async" />
                      </span>
                      <span className="api-carrier-name">DHL</span>
                    </div>
                    <div className="api-carrier" title="DPD">
                      <span className="api-carrier-tile">
                        <img src="/assets/carriers/dpd.svg?v=2" alt="DPD" width="36" height="36" loading="lazy" decoding="async" />
                      </span>
                      <span className="api-carrier-name">DPD</span>
                    </div>
                    <div className="api-carrier" title="GLS">
                      <span className="api-carrier-tile">
                        <img src="/assets/carriers/gls.svg?v=2" alt="GLS" width="36" height="36" loading="lazy" decoding="async" />
                      </span>
                      <span className="api-carrier-name">GLS</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* What Top Brands Say — dual-row reverse marquee */}
      <section className="brands-say" id="brands-say" aria-labelledby="brands-say-title">
        <div className="section-inner">
          <div className="brands-say-head">
            <h2 id="brands-say-title">What Top Brands Say&nbsp;About&nbsp;Us</h2>
            <p className="lead">Trusted by brands shipping at scale worldwide.</p>
          </div>
          <div className="brands-say-rows" aria-label="Brand testimonials">
            {/* Row 1 → scrolls left */}
            <div className="brands-marquee">
              <div className="brands-track is-left">
                {/* set A */}
                <article className="brand-card">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_aliexpress.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/aliexpress.webp" alt="AliExpress" width="120" height="22" />
                    <p className="brand-card-quote">Accurate, real-time tracking for millions of shoppers — an all-in-one platform we rely on every day.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Aliexpress Operations Team</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_coofandy.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/coofandy.webp" alt="COOFANDY" width="120" height="22" />
                    <p className="brand-card-quote">Tracking and returns are clearer for customers — ops is more efficient, and satisfaction is up.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Head of Operations</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_eufy.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/eufy.webp" alt="eufy" width="120" height="22" />
                    <p className="brand-card-quote">Real-time tracking and smoother returns — built for global e-commerce and brands scaling abroad.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Head of eufy DTC Central</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_vaporesso.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/vaporesso.webp" alt="Vaporesso" width="120" height="22" />
                    <p className="brand-card-quote">Manual tracking work down over 90%. Our tracking page is now a top traffic and conversion driver.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Head of Operations</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_baleaf.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/baleaf.webp" alt="baleaf" width="120" height="22" />
                    <p className="brand-card-quote">Tracking workload cut by 75%, customer complaints down about 60%.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Baleaf Operations Team</span>
                    </div>
                  </div>
                </article>
                {/* set A duplicate for seamless loop={true} */}
                <article className="brand-card" aria-hidden="true">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_aliexpress.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/aliexpress.webp" alt="" width="120" height="22" />
                    <p className="brand-card-quote">Accurate, real-time tracking for millions of shoppers — an all-in-one platform we rely on every day.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Aliexpress Operations Team</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card" aria-hidden="true">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_coofandy.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/coofandy.webp" alt="" width="120" height="22" />
                    <p className="brand-card-quote">Tracking and returns are clearer for customers — ops is more efficient, and satisfaction is up.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Head of Operations</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card" aria-hidden="true">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_eufy.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/eufy.webp" alt="" width="120" height="22" />
                    <p className="brand-card-quote">Real-time tracking and smoother returns — built for global e-commerce and brands scaling abroad.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Head of eufy DTC Central</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card" aria-hidden="true">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_vaporesso.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/vaporesso.webp" alt="" width="120" height="22" />
                    <p className="brand-card-quote">Manual tracking work down over 90%. Our tracking page is now a top traffic and conversion driver.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Head of Operations</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card" aria-hidden="true">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_baleaf.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/baleaf.webp" alt="" width="120" height="22" />
                    <p className="brand-card-quote">Tracking workload cut by 75%, customer complaints down about 60%.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Baleaf Operations Team</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            {/* Row 2 → scrolls right (reverse order for visual variety) */}
            <div className="brands-marquee">
              <div className="brands-track is-right">
                <article className="brand-card">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_baleaf.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/baleaf.webp" alt="baleaf" width="120" height="22" />
                    <p className="brand-card-quote">Tracking workload cut by 75%, customer complaints down about 60%.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Baleaf Operations Team</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_vaporesso.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/vaporesso.webp" alt="Vaporesso" width="120" height="22" />
                    <p className="brand-card-quote">Manual tracking work down over 90%. Our tracking page is now a top traffic and conversion driver.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Head of Operations</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_eufy.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/eufy.webp" alt="eufy" width="120" height="22" />
                    <p className="brand-card-quote">Real-time tracking and smoother returns — built for global e-commerce and brands scaling abroad.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Head of eufy DTC Central</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_coofandy.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/coofandy.webp" alt="COOFANDY" width="120" height="22" />
                    <p className="brand-card-quote">Tracking and returns are clearer for customers — ops is more efficient, and satisfaction is up.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Head of Operations</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_aliexpress.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/aliexpress.webp" alt="AliExpress" width="120" height="22" />
                    <p className="brand-card-quote">Accurate, real-time tracking for millions of shoppers — an all-in-one platform we rely on every day.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Aliexpress Operations Team</span>
                    </div>
                  </div>
                </article>
                {/* set B duplicate */}
                <article className="brand-card" aria-hidden="true">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_baleaf.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/baleaf.webp" alt="" width="120" height="22" />
                    <p className="brand-card-quote">Tracking workload cut by 75%, customer complaints down about 60%.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Baleaf Operations Team</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card" aria-hidden="true">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_vaporesso.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/vaporesso.webp" alt="" width="120" height="22" />
                    <p className="brand-card-quote">Manual tracking work down over 90%. Our tracking page is now a top traffic and conversion driver.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Head of Operations</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card" aria-hidden="true">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_eufy.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/eufy.webp" alt="" width="120" height="22" />
                    <p className="brand-card-quote">Real-time tracking and smoother returns — built for global e-commerce and brands scaling abroad.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Head of eufy DTC Central</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card" aria-hidden="true">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_coofandy.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/coofandy.webp" alt="" width="120" height="22" />
                    <p className="brand-card-quote">Tracking and returns are clearer for customers — ops is more efficient, and satisfaction is up.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Head of Operations</span>
                    </div>
                  </div>
                </article>
                <article className="brand-card" aria-hidden="true">
                  <div className="brand-card-media">
                    <img src="/assets/brands/customer_aliexpress.webp" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="brand-card-body">
                    <img className="brand-card-logo" src="/assets/brands/aliexpress.webp" alt="" width="120" height="22" />
                    <p className="brand-card-quote">Accurate, real-time tracking for millions of shoppers — an all-in-one platform we rely on every day.</p>
                    <div className="brand-card-foot">
                      <span className="brand-card-author">Aliexpress Operations Team</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div className="brands-say-cta">
            <a className="btn-switch on-dark" href="#"><span className="btn-switch-knob" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.4" fill="currentColor" opacity="0.35"/><circle cx="8.2" cy="12" r="1.5" fill="currentColor" opacity="0.55"/><circle cx="11.5" cy="12" r="1.6" fill="currentColor" opacity="0.8"/><path d="M13 7.5L18.5 12 13 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="btn-switch-label">Start free trial</span></a>
            <a className="btn-demo" href="#">Book a demo</a>
          </div>
        </div>
      </section>

      {/* Credentials — trust / compliance before final CTA (Figma 11769:9469) */}
      <section className="credentials" id="credentials" aria-labelledby="credentials-title">
        <div className="section-inner">
          <div className="credentials-head">
            <h2 id="credentials-title">Our Credentials, Your Confidence</h2>
          </div>
          <div className="credentials-grid">
            <article className="cred-card">
              <div className="cred-badge">
                <img src="/assets/credentials/soc2.png" alt="" width="72" height="72" loading="lazy" decoding="async" />
              </div>
              <div className="cred-copy">
                <h3>SOC2 Compliance</h3>
                <p>Providing reliable and secure data management</p>
              </div>
            </article>
            <article className="cred-card">
              <div className="cred-badge is-rect">
                <img src="/assets/credentials/iso27001.png" alt="" width="92" height="80" loading="lazy" decoding="async" />
              </div>
              <div className="cred-copy">
                <h3>ISO/IEC 27001</h3>
                <p>Comprehensive global standards for information security</p>
              </div>
            </article>
            <article className="cred-card">
              <div className="cred-badge is-rect">
                <img src="/assets/credentials/iso27701.png" alt="" width="92" height="80" loading="lazy" decoding="async" />
              </div>
              <div className="cred-copy">
                <h3>ISO/IEC 27701</h3>
                <p>Privacy information management for global data protection</p>
              </div>
            </article>
            <article className="cred-card">
              <div className="cred-badge">
                <img src="/assets/credentials/gdpr.png" alt="" width="72" height="72" loading="lazy" decoding="async" />
              </div>
              <div className="cred-copy">
                <h3>GDPR Compliance</h3>
                <p>Safeguarding of data and privacy for European users</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta" id="bottom-cta">
        <canvas className="bottom-cta-shader" id="bottom-cta-shader" aria-hidden="true"></canvas>
        <div className="section-inner">
          <div>
            <h2>Start building a branded tracking experience customers want to revisit</h2>
            <p>Keep two clear paths on hero and footer: start free on the Shopify App, or book a demo for high-intent teams.</p>
          </div>
          <div className="cta-row">
            <a className="btn-switch on-dark" href="#"><span className="btn-switch-knob" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.4" fill="currentColor" opacity="0.35"/><circle cx="8.2" cy="12" r="1.5" fill="currentColor" opacity="0.55"/><circle cx="11.5" cy="12" r="1.6" fill="currentColor" opacity="0.8"/><path d="M13 7.5L18.5 12 13 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="btn-switch-label">Start free trial</span></a>
            <a className="btn-demo on-dark" href="#">Book a demo</a>
            <a className="btn cta-ghost" href="#">View pricing</a>
          </div>
        </div>
      </section>
    </main>
<footer className="site-footer" data-node-id="26:1988">
      <div className="site-footer-inner">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <a className="site-footer-logo" href="#" aria-label="17TRACK">
              <img src="/assets/logo-17track-white.svg" alt="17TRACK" width="150" height="24" />
            </a>
            <div className="site-footer-who">
              <h3>WHO WE ARE</h3>
              <p>Track all your orders in one place. Sign up to get notifications at every step, and keep your orders organized and managed here.</p>
            </div>
            <div className="site-footer-badges">
              <a href="#" aria-label="Download on the App Store">
                <img src="/assets/badge-appstore.png" alt="Download on the App Store" width="154" height="44" />
              </a>
              <a href="#" aria-label="Get it on Google Play">
                <img src="/assets/badge-googleplay.png" alt="Get it on Google Play" width="154" height="44" />
              </a>
            </div>
            <div className="site-footer-social" aria-label="Social links">
              <a href="#" aria-label="YouTube"><img src="/assets/icon-social-1.svg" alt="" /></a>
              <a href="#" aria-label="Social"><img src="/assets/icon-social-2.svg" alt="" /></a>
              <a href="#" aria-label="Social"><img src="/assets/icon-social-3.svg" alt="" /></a>
            </div>
          </div>

          <nav className="site-footer-nav" aria-label="Footer">
            <div className="site-footer-col">
              <h3>Products</h3>
              <a href="#">Tracking</a>
              <a href="#">Protection</a>
              <a href="#">Notifications</a>
              <a href="#">Returns</a>
              <a href="#">Developer</a>
            </div>
            <div className="site-footer-col">
              <h3>Company</h3>
              <a href="#">About us</a>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">User Cases</a>
              <a href="#">Integration</a>
            </div>
            <div className="site-footer-col">
              <h3>Partners</h3>
              <a href="#">Join with us</a>
            </div>
            <div className="site-footer-col">
              <h3>Support</h3>
              <a href="#">7 x 24 Support</a>
              <a href="#">Contact us</a>
            </div>
          </nav>
        </div>

        <div className="site-footer-bottom">
          <div className="site-footer-bottom-inner">
            <div className="site-footer-bottom-left">
              <button type="button" className="site-footer-lang" aria-label="Language">
                English
                <img src="/assets/icon-chevron-down.svg" alt="" />
              </button>
              <div className="site-footer-legal">
                <a href="#">Terms</a>
                <a href="#">Privacy</a>
                <a href="#">Copyright</a>
              </div>
            </div>
            <p className="site-footer-copy">© Copyright 2011-2024&nbsp;17TRACK All Rights Reserved 粤 ICP 备 11015089 号</p>
          </div>
        </div>
      </div>
    </footer>
      </div>
      {/* dock outside #glass-content — same as static index */}
      <div className="product-dock" aria-label="Product switcher">
        <nav className="tabs" id="product-tabs">
          <a className="tab active" href="#" data-product="tracking">
            17 Order Tracking
          </a>
          <a className="tab" href="#" data-product="returns">
            17 Returns
          </a>
          <a className="tab" href="#" data-product="api">
            Tracking API
          </a>
        </nav>
      </div>
    </div>
  );
}
