import { AppIcon } from "../visuals/ApiDomVisuals.jsx";

const APPS = [
  {
    kind: "logistics",
    title: "Logistics Service",
    body:
      "Get the tracking data of your carrier partners and last-mile delivery. Put them together to form a complete tracking feed that covers your entire shipping process.",
  },
  {
    kind: "ecommerce",
    title: "E-commerce Seller",
    body:
      "Integrate our API to your order management system, or build your own tracking tool. Monitor all your orders in one place and get up-to-date status and events.",
  },
  {
    kind: "finance",
    title: "Finance and Payment",
    body:
      "Leverage an ocean of data for risk management. Track shipments in bulk, and determine delivery time and package authenticity with event details and key status.",
  },
  {
    kind: "integrator",
    title: "System Integrator",
    body:
      "Create customized tracking features and provide value-added services to your users. Build an optimized order management solution that stands out.",
  },
  {
    kind: "platforms",
    title: "Various Platforms",
    body:
      "Build a logistics middleware empowered by our API, facilitate your end-to-end data processing needs and support your operation.",
  },
];

/** Section 5 — Wide range of applications */
export default function Applications() {
  return (
    <section className="api-s5" id="applications" aria-labelledby="api-apps-title">
      <div className="api-wrap">
        <div className="api-s5-head">
          <h2 className="api-h2" id="api-apps-title">
            Wide range of applications, thousands of companies have realized more efficient
            management through API integration.
          </h2>
        </div>
        <ul className="api-apps">
          {APPS.map((app) => (
            <li className="api-app-card" key={app.title}>
              <AppIcon kind={app.kind} />
              <h3>{app.title}</h3>
              <p>{app.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
