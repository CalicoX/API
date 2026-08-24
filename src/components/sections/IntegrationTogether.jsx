import {
  IllusOnboardChat,
  IllusOnboardTrial,
  IllusOnboardPlans,
  IllusOnboardLive,
} from "../visuals/ApiDomVisuals.jsx";

const CDN = "https://static.17track.net/www/2026-08/assets/images/api";

const FEATURES = [
  "3,400 carriers supported",
  "Batch tracking and automatic updates",
  "Shipment dashboard and management",
  "Carrier identification and auto-matching",
  "HTTP protocol, compatible with all systems",
  "SLA commitment to 99.9% high availability",
];

const PLANS = [
  { name: "Basic", price: "$ 0.0238", quota: "5,000 quota / $ 119" },
  { name: "Advanced", price: "$ 0.0227", quota: "25,000 quota / $ 569" },
  { name: "Pro", price: "$ 0.0191", quota: "150,000 quota / $ 2,869" },
  { name: "Flagship", price: "$ 0.0185", quota: "500,000 quota / $ 9,299", hot: true },
];

function PlanCheck() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#2563eb" />
      <path
        d="M5.6 10.3l3 3.05 5.8-6.15"
        fill="none"
        stroke="#fff"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STEPS = [
  {
    n: "1",
    Visual: IllusOnboardChat,
    text: "Talk with our expert, tell us how we can help.",
  },
  {
    n: "2",
    Visual: IllusOnboardTrial,
    text: "Get a free trial and the integration support.",
  },
  {
    n: "3",
    Visual: IllusOnboardPlans,
    text: "Choose a price plan that suits your volume.",
  },
  {
    n: "4",
    Visual: IllusOnboardLive,
    text: "All green? Go live!",
  },
];

/** Official 17track.net/en/api — Land the Integration Together */
export default function IntegrationTogether() {
  return (
    <section className="api-land" id="land-together" aria-labelledby="api-land-title">
      <div className="api-wrap">
        <div className="api-land-head">
          <h2 className="api-land-title" id="api-land-title">
            Land the Integration Together
          </h2>
          <p className="api-land-sub">Each plan is valid for 12 months.</p>
        </div>
        <ul className="api-plans">
          {PLANS.map((plan) => (
            <li className={`api-plan-card${plan.hot ? " is-hot" : ""}`} key={plan.name}>
              {plan.hot ? <span className="api-plan-popular">Popular</span> : null}
              <div className="api-plan-inner">
                <span className="api-plan-name">{plan.name}</span>
                <span className="api-plan-unit">Unit Price</span>
                <strong className="api-plan-price">{plan.price}</strong>
                <span className="api-plan-quota">{plan.quota}</span>
                <a className="api-plan-cta" href="#free-trial">
                  Get Started
                </a>
                <p className="api-plan-whats">{`What's in ${plan.name}`}</p>
                <ul className="api-plan-feats">
                  {FEATURES.map((feat) => (
                    <li key={feat}>
                      <PlanCheck />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <li className="api-plan-card is-custom">
            <div className="api-plan-inner">
              <span className="api-plan-name">Custom</span>
              <img
                className="api-plan-illu"
                src={`${CDN}/illustration.png`}
                alt="custom model"
                width="128"
                height="128"
              />
              <a
                className="api-plan-contact"
                href="https://www.17track.com/en/contact-us"
                target="_blank"
                rel="noopener"
              >
                Contact Us
              </a>
            </div>
          </li>
        </ul>
        <div className="api-onboard">
          <h3 className="api-onboard-title">Onboard in 4 Steps</h3>
          <ul className="api-onboard-steps">
            {STEPS.map((step) => (
              <li className="api-onboard-card" key={step.n}>
                <div className="api-onboard-art">
                  <step.Visual />
                </div>
                <b className="api-onboard-num" aria-hidden="true">
                  {step.n}
                </b>
                <span>{step.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
