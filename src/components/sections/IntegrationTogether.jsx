const CDN = "https://static.17track.net/www/2026-08/assets/images/api";

const PLANS = [
  { name: "Basic", price: "$0.0238", quota: "5,000 quota / $119" },
  { name: "Advanced", price: "$0.0227", quota: "25,000 quota / $569" },
  { name: "Pro", price: "$0.0191", quota: "150,000 quota / $2,869" },
  { name: "Flagship", price: "$0.0185", quota: "500,000 quota / $9,299", hot: true },
];

const STEPS = [
  {
    n: "1",
    img: `${CDN}/Part6_1_en.png`,
    text: "Talk with our expert, tell us how we can help.",
  },
  {
    n: "2",
    img: `${CDN}/Part6_2_en.png`,
    text: "Get a free trial and the integration support.",
  },
  {
    n: "3",
    img: `${CDN}/Part6_3_ol_en.png`,
    text: "Choose a price plan that suits your volume.",
  },
  {
    n: "4",
    img: `${CDN}/Part6_4_en.png`,
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
          <p className="api-land-sub">Each plan has a valid period of 12 months</p>
        </div>
        <ul className="api-plans">
          {PLANS.map((plan) => (
            <li className={`api-plan-card${plan.hot ? " is-hot" : ""}`} key={plan.name}>
              <span className="api-plan-name">
                {plan.name}
                {plan.hot ? (
                  <span className="api-plan-fire" aria-hidden="true">
                    🔥
                  </span>
                ) : null}
              </span>
              <span className="api-plan-unit">Unit price</span>
              <strong className="api-plan-price">{plan.price}</strong>
              <span className="api-plan-quota">{plan.quota}</span>
            </li>
          ))}
          <li className="api-plan-card is-custom">
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
          </li>
        </ul>
        <div className="api-onboard">
          <h3 className="api-onboard-title">Onboard in 4 Steps</h3>
          <ul className="api-onboard-steps">
            {STEPS.map((step) => (
              <li className="api-onboard-card" key={step.n}>
                <div className="api-onboard-art">
                  <img src={step.img} alt={step.text} width="486" height="480" />
                  <b className="api-onboard-num" aria-hidden="true">
                    {step.n}
                  </b>
                </div>
                <span>{step.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
