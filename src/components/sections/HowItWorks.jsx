import {
  IllusWebhookPanel,
  IllusRegisterPanel,
  IllusListenPanel,
} from "../visuals/ApiDomVisuals.jsx";

const CARDS = [
  {
    Visual: IllusWebhookPanel,
    step: "Step 1",
    text: "Create your webhook endpoint.",
  },
  {
    Visual: IllusRegisterPanel,
    step: "Step 2",
    text: "Register tracking numbers via the API.",
  },
  {
    Visual: IllusListenPanel,
    step: "Step 3",
    text: "Listen to your webhook for auto-updates.",
  },
];

/** Section 3 — How Does the API Work? — 3 equal cards fill 1440 content shell */
export default function HowItWorks() {
  return (
    <section className="api-s3" id="how-it-works" aria-labelledby="api-how-title">
      <div className="api-wrap">
        <div className="api-s3-head">
          <h2 className="api-h2" id="api-how-title">
            How Does the API Work?
          </h2>
          <p className="api-lead">
            17TRACK&apos;s TRACKING API can process massive trackings in a snap, with all - system
            compatibility based on HTTP protocol and webhook push mechanism. It automatically feeds
            your endpoint with the latest and historical tracking data covering the entire life cycle.
          </p>
        </div>

        <div className="api-s3-cards">
          {CARDS.map(({ Visual, step, text }) => (
            <article className="api-s3-card" key={step}>
              <div className="api-s3-card-body">
                <div className="api-s3-illus">
                  <Visual />
                </div>
                <div className="api-s3-card-text">
                  <p className="api-s3-step">{step}</p>
                  <h3>{text}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
