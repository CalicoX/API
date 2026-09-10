import {
  IllusWebhookPanel,
  IllusRegisterPanel,
  IllusListenPanel,
} from "../visuals/ApiDomVisuals.jsx";

const CARDS = [
  {
    Visual: IllusWebhookPanel,
    step: "Step 1",
    text: "Create Your Webhook Endpoint",
  },
  {
    Visual: IllusRegisterPanel,
    step: "Step 2",
    text: "Register Tracking Numbers via API",
  },
  {
    Visual: IllusListenPanel,
    step: "Step 3",
    text: "Receive Automatic Updates",
  },
];

/** Section 3 — From Tracking Data to Real-Time Visibility — 3 equal cards fill 1440 content shell */
export default function HowItWorks() {
  return (
    <section className="api-s3" id="how-it-works" aria-labelledby="api-how-title">
      <div className="api-wrap">
        <div className="api-s3-head">
          <h2 className="api-h2" id="api-how-title">
            From Tracking Data to Real-Time Visibility
          </h2>
          <p className="api-lead">
            Connect your systems to 17TRACK and start receiving shipment updates with a simple integration.
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
