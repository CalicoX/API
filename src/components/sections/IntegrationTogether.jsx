const PLANS = [
  { name: "Basic", price: "$ 0.0238", quota: "5,000 quota / $ 119" },
  { name: "Advanced", price: "$ 0.0227", quota: "25,000 quota / $ 569" },
  { name: "Pro", price: "$ 0.0191", quota: "150,000 quota / $ 2,869" },
  {
    name: "Flagship",
    price: "$ 0.0185",
    quota: "500,000 quota / $ 9,299",
    hot: true,
  },
];

/** Official 17track.net/en/api — Land the Integration Together */
export default function IntegrationTogether() {
  return (
    <section
      className="api-land"
      id="land-together"
      aria-labelledby="api-land-title"
    >
      <div className="api-wrap">
        <div className="api-land-head">
          <h2 className="api-h2" id="api-land-title">
            Land the Integration Together
          </h2>
          <p className="api-land-sub">Each plan is valid for 12 months.</p>
        </div>
        <ul className="api-plans">
          {PLANS.map((plan) => (
            <li
              className={`api-plan-card${plan.hot ? " is-hot" : ""}`}
              key={plan.name}
            >
              <div className="api-plan-inner">
                <span className="api-plan-name">
                  {plan.name}
                  {plan.hot ? (
                    <span className="api-plan-fire" aria-hidden="true">
                      🔥
                    </span>
                  ) : null}
                </span>
                <span className="api-plan-unit">Unit Price</span>
                <strong className="api-plan-price">{plan.price}</strong>
                <span className="api-plan-quota">{plan.quota}</span>
              </div>
            </li>
          ))}
          <li className="api-plan-card api-plan-custom">
            <div className="api-plan-inner">
              <span className="api-plan-name">Custom</span>
              <a
                className="api-plan-qr"
                href="https://www.17track.com/en/contact-us"
                target="_blank"
                rel="noopener"
              >
                <img src="/assets/plan-contact-qr.png" alt="" width="104" height="104" />
                <img
                  className="api-plan-qr-mark"
                  src="/assets/plan-qr-mark.svg"
                  alt=""
                  width="28"
                  height="28"
                />
              </a>
              <p className="api-plan-note">
                Please scan the QR code to contact sales for a customized service.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
