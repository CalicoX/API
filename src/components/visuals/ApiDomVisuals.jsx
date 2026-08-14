/**
 * Use Cases stage — webgl-demo exploded hub (carriers + server + terminal).
 * Terminal typewriter / explode / orbit animations live inside iso-hub-webgl.
 */

import { useEffect, useRef, useState } from "react";
import { observeVisibility } from "../../fx/utils.js";

/**
 * Full-bleed WebGL hub; scroll progress via window.__isoHubWebGL.setProgress
 * three.js (~500 kB chunk) is fetched only when the section nears the viewport.
 */
export function UseCasesStage() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let cancelled = false;
    let gl = null;
    let loaded = false;

    const load = () => {
      if (loaded || cancelled) return;
      loaded = true;
      import("../../fx/modules/iso-hub-webgl.js").then(({ createIsoHubWebGL }) => {
        if (cancelled || !hostRef.current) return;
        gl = createIsoHubWebGL(hostRef.current, {
          assetBase: "/assets/webgl-hub",
          onReady: () => {
            const section = document.getElementById("use-cases");
            const p = parseFloat(section?.style?.getPropertyValue("--uc-p") || "0.15");
            if (gl) gl.setProgress(Number.isFinite(p) ? Math.max(p, 0.12) : 0.15);
          },
        });
        window.__isoHubWebGL = gl;
      });
    };

    let unvis = () => {};
    unvis = observeVisibility(
      host,
      (vis) => {
        if (vis) {
          load();
          unvis();
        }
      },
      { threshold: 0.01, rootMargin: "240px" }
    );

    return () => {
      cancelled = true;
      unvis();
      if (window.__isoHubWebGL === gl) delete window.__isoHubWebGL;
      gl?.destroy?.();
    };
  }, []);

  return (
    <div className="api-hub api-hub--webgl" aria-hidden="true">
      <div className="api-iso-host" ref={hostRef} data-uc="diagram-webgl" />
    </div>
  );
}

const S4_MAINS = [
  { label: "Info Received", on: true },
  { label: "In Transit", on: true },
  { label: "Pick Up", on: false },
  { label: "Out For Delivery", on: false },
  { label: "Delivered", on: false },
  { label: "Undelivered", on: false },
  { label: "Alert", on: false },
  { label: "Expired", on: false },
  { label: "Not Found", on: false },
];

const S4_SUBS = [
  "Address issue",
  "Customer not available",
  "Refused by recipient",
  "Held at customs",
  "Damaged in transit",
  "Returned to sender",
];

const S4_HUB_LEFT = [
  ["/assets/carriers/dhl.svg", "DHL"],
  ["/assets/carriers/ups.svg", "UPS"],
  ["/assets/carriers/dpd.svg", "DPD"],
];

const S4_HUB_RIGHT = [
  ["/assets/carriers/usps.svg", "USPS"],
  ["/assets/carriers/gls.svg", "GLS"],
];

const DONUT_R = 38;
const DONUT_C = 2 * Math.PI * DONUT_R;
const S4_ARCS = [
  [0.08, "#ef4444", "Not Found"],
  [0.1, "#3b82f6", "Info Received"],
  [0.24, "#6366f1", "In Transit"],
  [0.08, "#f59e0b", "Pick Up"],
  [0.26, "#22c55e", "Delivered"],
  [0.06, "#94a3b8", "Expired"],
  [0.07, "#fb7185", "Undelivered"],
  [0.06, "#f97316", "Alert"],
  [0.05, "#06b6d4", "Out For Delivery"],
];

export function DataStatusStage() {
  return (
    <div className="api-s4-vig api-s4-vig--status" aria-hidden="true">
      <article className="api-s4-status">
        <header className="api-vig-head">
          <h4 className="api-vig-title">Package status</h4>
          <span className="api-vig-close">×</span>
        </header>
        <span className="api-vig-k">9 main status</span>
        <ul className="api-vig-checks">
          {S4_MAINS.map(({ label, on }) => (
            <li key={label} className={on ? "is-on" : ""}>
              {label}
            </li>
          ))}
        </ul>
        <span className="api-vig-k api-vig-k--status">Exception · 27 sub</span>
        <ul className="api-s4-status-chips">
          {S4_SUBS.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export function DataCarriersStage() {
  return (
    <div className="api-s4-vig api-s4-vig--carriers" aria-hidden="true">
      <div className="api-s4-hub">
        <svg
          className="api-s4-hub-wires"
          viewBox="0 0 220 96"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path d="M28 16 C 72 16, 96 48, 110 48" />
          <path d="M28 48 C 72 48, 96 48, 110 48" />
          <path d="M28 80 C 72 80, 96 48, 110 48" />
          <path d="M192 22 C 148 22, 124 48, 110 48" />
          <path d="M192 74 C 148 74, 124 48, 110 48" />
        </svg>
        <div className="api-s4-hub-col">
          {S4_HUB_LEFT.map(([src, name]) => (
            <span key={name} className="api-s4-hub-logo is-left">
              <img src={src} alt="" />
            </span>
          ))}
        </div>
        <div className="api-s4-hub-core">
          <b>3400+</b>
          <em>carriers</em>
        </div>
        <div className="api-s4-hub-col is-right">
          {S4_HUB_RIGHT.map(([src, name]) => (
            <span key={name} className="api-s4-hub-logo is-right">
              <img src={src} alt="" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DataHubStage() {
  return (
    <div className="api-s4-vig api-s4-vig--auto" aria-hidden="true">
      <div className="api-s4-flow">
        <div className="api-s4-pile">
          <div className="api-s4-codewin">
            <div className="api-vig-float-h">
              <strong>Add Number</strong>
              <span>×</span>
            </div>
            <div className="api-vig-field">
              <span>Tracking number*</span>
              <b>LV123242CN</b>
            </div>
            <div className="api-vig-field">
              <span>Carrier*</span>
              <b>
                <i className="api-s4-detect-auto">Auto-detect</i>
                <i className="api-s4-detect-hit">DHL Express</i>
              </b>
            </div>
          </div>
          <div className="api-s4-link" aria-hidden="true">
            <i className="api-vig-link-dot" />
            <i className="api-vig-link-line" />
            <i className="api-vig-link-arrow" />
          </div>
          <div className="api-s4-float">
            <div className="api-vig-float-h">
              <strong>Auto-identified</strong>
              <span>×</span>
            </div>
            <div className="api-s4-idhit">
              <img src="/assets/carriers/dhl.svg" alt="" />
              <div>
                <b>DHL Express</b>
                <em>80%+ match · syncing until fulfilled</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DataChartStage() {
  let acc = 0;
  return (
    <div className="api-s4-vig api-s4-vig--dash" aria-hidden="true">
      <article className="api-s4-chartcard">
        <span className="api-s4-chart-kicker">Status distribution</span>
        <div className="api-s4-donut-wrap">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={DONUT_R} fill="none" stroke="#eef2f7" strokeWidth="11" />
            <g transform="rotate(-90 50 50)">
              {S4_ARCS.map(([part, color, label], i) => {
                const len = part * DONUT_C;
                const off = -acc;
                acc += len;
                return (
                  <circle
                    key={label}
                    className="api-s4-donut-seg"
                    cx="50"
                    cy="50"
                    r={DONUT_R}
                    fill="none"
                    stroke={color}
                    strokeWidth="11"
                    strokeDasharray={`${len} ${DONUT_C - len}`}
                    strokeDashoffset={off}
                    style={{
                      "--len": len,
                      "--rest": DONUT_C - len,
                      "--off": off,
                      "--delay": `${i * 0.07}s`,
                    }}
                  />
                );
              })}
            </g>
          </svg>
          <div className="api-s4-donut-label">
            <b>9</b>
            <em>status</em>
          </div>
        </div>
        <ul className="api-s4-legend">
          {S4_ARCS.slice(0, 5).map(([, color, label]) => (
            <li key={label}>
              <i style={{ background: color }} />
              {label}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
export function AppIcon() {
  return null;
}

/* ——— How-it-works: static light UI vignettes (no cursor) ——— */

/** Step 1 — Edit Tracking webhook (matches product UI; bottom-cropped) */
const WEBHOOK_STATUSES = [
  { label: "Info Received", on: true },
  { label: "In Transit", on: true },
  { label: "Available for Pickup", on: false },
  { label: "Out for Delivery", on: false },
  { label: "Delivery Failure", on: false },
  { label: "Delivered", on: false },
  { label: "Exception", on: false },
  { label: "Expired", on: false },
  { label: "Not Found", on: false },
];

export function IllusWebhookPanel() {
  const rootRef = useRef(null);
  const infoRef = useRef(null);
  const transitRef = useRef(null);
  const saveRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [on, setOn] = useState(() => new Set(["Info Received", "In Transit"]));
  const [cursor, setCursor] = useState({ x: 48, y: 80, show: false, press: false });
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!hover) {
      setOn(new Set(["Info Received", "In Transit"]));
      setCursor((c) => ({ ...c, show: false, press: false }));
      setToast(false);
      return undefined;
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    const aim = (el) => {
      const root = rootRef.current;
      if (!root || !el) return;
      const a = root.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      setCursor({
        x: b.left - a.left + Math.min(14, b.width * 0.22),
        y: b.top - a.top + b.height * 0.55,
        show: true,
        press: false,
      });
    };

    (async () => {
      while (!cancelled) {
        setOn(new Set());
        setToast(false);
        aim(infoRef.current);
        await wait(520);
        if (cancelled) return;
        setCursor((c) => ({ ...c, press: true }));
        await wait(140);
        if (cancelled) return;
        setOn(new Set(["Info Received"]));
        setCursor((c) => ({ ...c, press: false }));
        await wait(320);
        if (cancelled) return;
        aim(transitRef.current);
        await wait(480);
        if (cancelled) return;
        setCursor((c) => ({ ...c, press: true }));
        await wait(140);
        if (cancelled) return;
        setOn(new Set(["Info Received", "In Transit"]));
        setCursor((c) => ({ ...c, press: false }));
        await wait(360);
        if (cancelled) return;
        aim(saveRef.current);
        await wait(500);
        if (cancelled) return;
        setCursor((c) => ({ ...c, press: true }));
        await wait(150);
        if (cancelled) return;
        setCursor((c) => ({ ...c, press: false }));
        setToast(true);
        await wait(1800);
        if (cancelled) return;
        await wait(420);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [hover]);

  return (
    <div
      className="api-vig api-vig--webhook"
      ref={rootRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="api-vig-sheet api-vig-sheet--webhook">
        <header className="api-vig-head">
          <h4 className="api-vig-title">Edit Tracking webhook</h4>
          <span className="api-vig-close" aria-hidden="true">
            ×
          </span>
        </header>
        <p className="api-vig-desc">
          Enter the URL for receiving tracking info. We will send a POST request with a JSON body
          to the URL once the tracking is updated.
        </p>
        <span className="api-vig-k">URL</span>
        <div className="api-vig-input">
          https://webhook.site/2e8c35a9-307c-4e51-a8e9-ddde59507a48
        </div>
        <span className="api-vig-k api-vig-k--status">Package Status</span>
        <ul className="api-vig-checks">
          {WEBHOOK_STATUSES.map(({ label }) => (
            <li
              key={label}
              ref={
                label === "Info Received" ? infoRef : label === "In Transit" ? transitRef : undefined
              }
              className={on.has(label) ? "is-on" : ""}
            >
              {label}
            </li>
          ))}
        </ul>
        <div className="api-vig-actions">
          <span ref={saveRef} className="api-vig-btn api-vig-btn--primary">
            Save
          </span>
          <span className="api-vig-btn api-vig-btn--ghost">Cancel</span>
        </div>
      </div>
      <span
        className={`api-vig-pointer${cursor.show ? " is-on" : ""}${cursor.press ? " is-press" : ""}`}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      >
        <svg className="api-vig-pointer-arrow" viewBox="0 0 24 24" width="22" height="22">
          <path
            d="M4.2 3.2 L4.2 19.4 L8.8 14.9 L12.6 22.2 L15.4 20.8 L11.7 13.6 L18.2 13.6 Z"
            fill="#0a0a0a"
            stroke="#fff"
            stroke-width="2.2"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
        </svg>
      </span>
      <div className={`api-vig-toast${toast ? " is-on" : ""}`} aria-hidden="true">
        Webhook saved
      </div>
    </div>
  );
}

/** Register — two cards overlap → expand, connector; pair stays centered */
export function IllusRegisterPanel() {
  return (
    <div className="api-vig api-vig--register">
      <div className="api-vig-flow">
        <div className="api-vig-pile">
          <div className="api-vig-codewin">
            <div className="api-vig-jsonwin-bar">
              <span className="api-vig-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="api-vig-jsonwin-title">&lt;/17track.api&gt;</span>
            </div>
            <pre className="api-vig-code">
              <code>
                <span className="c-cmd">curl -X POST \</span>
                {"\n"}
                <span className="c-flag">--header</span>
                <span className="c-str"> &apos;17token:token&apos; \</span>
                {"\n"}
                <span className="c-flag">--header</span>
                <span className="c-str"> &apos;Content-Type:application/json&apos; \</span>
                {"\n"}
                <span className="c-flag">--data</span>
                <span className="c-p"> &apos;[</span>
                {"\n  "}
                <span className="c-p">{"{"}</span>
                {"\n    "}
                <span className="c-str">&quot;number&quot;</span>
                <span className="c-p">: </span>
                <span className="c-str">&quot;RR123456789CN&quot;</span>
                {"\n  "}
                <span className="c-p">{"}"}</span>
                {"\n"}
                <span className="c-p">]&apos; \</span>
                {"\n"}
                <span className="c-url">https://api.17track.net/track/v2/register</span>
              </code>
            </pre>
          </div>
          <div className="api-vig-link" aria-hidden="true">
            <i className="api-vig-link-dot" />
            <i className="api-vig-link-line" />
            <i className="api-vig-link-arrow" />
          </div>
          <div className="api-vig-float">
            <div className="api-vig-float-h">
              <strong>Add Number</strong>
              <span>×</span>
            </div>
            <div className="api-vig-field">
              <span>Tracking number*</span>
              <b>RR123456789CN</b>
            </div>
            <div className="api-vig-field">
              <span>Carrier*</span>
              <b>Auto-detect</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LISTEN_JSON = `{
  "service_type": "webhook",
  "latest_sync_status": "delivered",
  "events": [
    {
      "time_iso": "2022-08-18T10:22:00",
      "description": "Delivered",
      "location": "SHINGLE SPRINGS CA",
      "address": {
        "country": "US",
        "state": "CA",
        "city": "Shingle Springs",
        "postal_code": "95682"
      }
    }
  ]
}`;

const LISTEN_EVENTS = [
  { time: "2022/8/18 10:22:00", text: "SHINGLE SPRINGS CA 95682, Delivered", live: true },
  { time: "2022/8/18 08:14:00", text: "Out for Delivery, USPS" },
  { time: "2022/8/17 21:06:00", text: "Arrived at Post Office" },
  { time: "2022/8/16 14:40:00", text: "Picked Up by Shipping Partner" },
];

function highlightListenJson(src) {
  return src
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/("(?:\\.|[^"\\])*")(\s*:)/g, '<span class="jk">$1</span>$2')
    .replace(/(:\s*)("(?:\\.|[^"\\])*")/g, '$1<span class="js">$2</span>');
}

/** Listen — overlapping JSON window + tracking detail (bottom clipped) */
export function IllusListenPanel() {
  const [hover, setHover] = useState(false);
  const [jsonLen, setJsonLen] = useState(LISTEN_JSON.length);
  const [shown, setShown] = useState(LISTEN_EVENTS.length);
  const typing = hover && jsonLen < LISTEN_JSON.length;

  useEffect(() => {
    if (!hover) {
      setJsonLen(LISTEN_JSON.length);
      setShown(LISTEN_EVENTS.length);
      return undefined;
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    const typeJson = () =>
      new Promise((resolve) => {
        const start = performance.now();
        const duration = 2600;
        const tick = (now) => {
          if (cancelled) {
            resolve();
            return;
          }
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - p) * (1 - p);
          setJsonLen(Math.round(eased * LISTEN_JSON.length));
          if (p < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });

    (async () => {
      while (!cancelled) {
        await wait(180);
        if (cancelled) return;
        setShown(0);
        setJsonLen(0);
        const typingP = typeJson();
        const eventsP = (async () => {
          await wait(90);
          for (let n = 1; n <= LISTEN_EVENTS.length; n++) {
            if (cancelled) return;
            setShown(n);
            await wait(560);
          }
        })();
        await Promise.all([typingP, eventsP]);
        if (cancelled) return;
        await wait(2000);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [hover]);

  return (
    <div
      className="api-vig api-vig--listen"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="api-vig-duo">
        <div className="api-vig-jsonwin" aria-hidden="true">
          <div className="api-vig-jsonwin-bar">
            <span className="api-vig-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="api-vig-jsonwin-title">&lt;/17track.api&gt;</span>
          </div>
          <pre className="api-vig-json">
            <code
              dangerouslySetInnerHTML={{
                __html:
                  highlightListenJson(LISTEN_JSON.slice(0, jsonLen)) +
                  (typing ? '<span class="api-vig-caret"></span>' : ""),
              }}
            />
          </pre>
        </div>

        <div className="api-vig-track">
          <div className="api-vig-track-bar">
            <span className="api-vig-track-id">RR123456789CN</span>
            <span className="api-vig-toggle">
              View JSON
              <i />
            </span>
            <span className="api-vig-close" aria-hidden="true">
              ×
            </span>
          </div>
          <div className="api-vig-status">
            <i className="api-vig-check" />
            <div>
              <strong>Delivered</strong>
              <em>China(WUYOUEXP) → United States</em>
              <span>Time of delivery: 2022/8/18</span>
            </div>
          </div>
          <div className="api-vig-timeinfo">
            <b>Time Info</b>
            <ul>
              <li>
                <span>Days after the first event</span>
                <em>12 Day(s)</em>
              </li>
              <li>
                <span>Days after in transit</span>
                <em>12 Day(s)</em>
              </li>
              <li>
                <span>Days after update stopped</span>
                <em>0 Day(s)</em>
              </li>
            </ul>
          </div>
          <div className="api-vig-events">
            <b>Shipping Events</b>
            <p className="api-vig-carrier">WUYOUEXP · China</p>
            <ul className="api-vig-rows">
              {LISTEN_EVENTS.map((row, i) => (
                <li
                  key={row.time}
                  className={`${row.live ? "is-live" : ""}${shown > i ? " is-in" : ""}`.trim()}
                >
                  <b />
                  <div>
                    <strong>{row.time}</strong>
                    <span>{row.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <span className="api-vig-chat" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
