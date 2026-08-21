/**
 * Use Cases stage — webgl-demo exploded hub (carriers + server + terminal).
 * Terminal typewriter / explode / orbit animations live inside iso-hub-webgl.
 */

import { useEffect, useRef, useState } from "react";
import { observeVisibility, prefersReducedMotion } from "../../fx/utils.js";

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
        });
        window.__isoHubWebGL = gl;
        // 挂载完立刻用当前滚动进度做种子（onReady 闭包里 gl 还没赋值，之前是空转）
        const section = document.getElementById("use-cases");
        const p = parseFloat(section?.style?.getPropertyValue("--uc-p") || "0.15");
        gl.setProgress(Number.isFinite(p) ? Math.max(p, 0.12) : 0.15);
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

const S4_MAINS_OUTER = [
  { label: "Info Received", icon: "info", src: "/assets/status/info-received.svg" },
  { label: "In Transit", icon: "transit", src: "/assets/status/in-transit.svg" },
  { label: "Out For Delivery", icon: "out", src: "/assets/status/out-for-delivery.svg" },
  { label: "Pick Up", icon: "pickup", src: "/assets/status/pickup.svg" },
  { label: "Delivered", icon: "done", src: "/assets/status/delivered.svg" },
];

const S4_MAINS_INNER = [
  { label: "Alert", icon: "alert", src: "/assets/status/alert.svg" },
  { label: "Expired", icon: "expired", src: "/assets/status/expired.svg" },
  { label: "Undelivered", icon: "fail", src: "/assets/status/undelivered.svg" },
  { label: "Not Found", icon: "missing", src: "/assets/status/not-found.svg" },
];

function StatusOrbitRing({ items, tone }) {
  const base = tone === "inner" ? 45 : 0;
  return (
    <ul className={`api-s4-orbit-ring api-s4-orbit-ring--${tone}`} style={{ "--n": items.length }}>
      {items.map((item, i) => {
        const deg = (((i * 360) / items.length + base) % 360 + 360) % 360;
        const onRight = deg > 20 && deg < 160;
        const flip = tone === "outer" ? onRight : !onRight;
        return (
          <li key={item.label} style={{ "--i": i }}>
            <span
              className={`api-s4-orbit-chip is-named${flip ? " is-flip" : ""}`}
              data-icon={item.icon}
            >
              <span className="api-s4-orbit-dot">
                <img src={item.src} alt="" />
              </span>
              <em>{item.label}</em>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

const S4_HUB_NODES = [
  { src: "/assets/carriers/dhl.svg", name: "DHL", x: 122, y: 42, side: "t", sx: 177, sy: 114 },
  { src: "/assets/carriers/usps.svg", name: "USPS", x: 278, y: 42, side: "t", sx: 223, sy: 114 },
  { src: "/assets/carriers/fedex.svg", name: "FedEx", x: 44, y: 128, side: "l", sx: 137, sy: 156 },
  { src: "/assets/carriers/tnt.svg", name: "TNT", x: 44, y: 232, side: "l", sx: 137, sy: 204 },
  { src: "/assets/carriers/dpd.svg", name: "DPD", x: 356, y: 128, side: "r", sx: 263, sy: 156 },
  { src: "/assets/carriers/gls.svg", name: "GLS", x: 356, y: 232, side: "r", sx: 263, sy: 204 },
  { src: "/assets/carriers/ups.svg", name: "UPS", x: 122, y: 318, side: "b", sx: 177, sy: 246 },
  { src: "/assets/carriers/royal-mail.svg", name: "Royal Mail", x: 278, y: 318, side: "b", sx: 223, sy: 246 },
];

/** Rounded right-angle: leave the hub edge, one 90° corner, arrive at the logo. */
function hubElbowPath(node, r = 14) {
  const { sx, sy, x: ex, y: ey, side } = node;
  const dx = ex - sx;
  const dy = ey - sy;
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  if (ax < 0.8) return `M${sx} ${sy} V${ey}`;
  if (ay < 0.8) return `M${sx} ${sy} H${ex}`;
  const rr = Math.min(r, ax - 1, ay - 1);
  const sxn = Math.sign(dx);
  const syn = Math.sign(dy);
  if (side === "t" || side === "b") {
    const vy = ey - syn * rr;
    const hx = sx + sxn * rr;
    return `M${sx} ${sy} V${vy.toFixed(1)} Q ${sx} ${ey} ${hx.toFixed(1)} ${ey} H${ex}`;
  }
  const hx = ex - sxn * rr;
  const vy = sy + syn * rr;
  return `M${sx} ${sy} H${hx.toFixed(1)} Q ${ex} ${sy} ${ex} ${vy.toFixed(1)} V${ey}`;
}

const S4_HUB_WIRES = S4_HUB_NODES.map((node, i) => ({
  key: node.name,
  d: hubElbowPath(node),
  i,
  sx: node.sx,
  sy: node.sy,
}));

function HubCarrierCount() {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (prefersReducedMotion()) {
      setN(3400);
      return undefined;
    }
    let raf = 0;
    let playing = false;
    const play = () => {
      if (playing) return;
      playing = true;
      const t0 = performance.now();
      const dur = 1500;
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - (1 - p) ** 3;
        setN(Math.round(3400 * e));
        if (p < 1) raf = requestAnimationFrame(tick);
        else playing = false;
      };
      setN(0);
      raf = requestAnimationFrame(tick);
    };
    const stop = observeVisibility(
      el,
      (on) => {
        if (on) play();
        else {
          playing = false;
          cancelAnimationFrame(raf);
          setN(3400);
        }
      },
      { threshold: 0.4, rootMargin: "0px" }
    );
    return () => {
      stop();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <b ref={ref}>
      {n.toLocaleString("en-US")}
      <span>+</span>
    </b>
  );
}

/** One chassis shelf: fill only, 1px light top + 1px dark bottom (no outer stroke). */
function RackShelf({ y, children }) {
  const x = 2.5;
  const w = 71;
  const h = 12;
  const r = 3.5;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="#f4f7fb" />
      <path
        d={`M${x + r} ${y + 1}H${x + w - r}`}
        stroke="#fff"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d={`M${x + r} ${y + h - 1}H${x + w - r}`}
        stroke="#c3cedd"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {children}
    </g>
  );
}



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
      <div className="api-s4-orbit-field" aria-hidden="true">
        {[5, 4, 3, 2, 1, 0].map((i) => (
          <span key={i} className="api-s4-orbit-wash" style={{ "--r": i }} />
        ))}
      </div>
      <div className="api-s4-orbit">
        <StatusOrbitRing items={S4_MAINS_OUTER} tone="outer" />
        <StatusOrbitRing items={S4_MAINS_INNER} tone="inner" />
        <div className="api-s4-orbit-core">
          <div className="api-s4-logo">
            <svg className="api-s4-logo-defs" width="0" height="0" aria-hidden="true">
              <clipPath id="api-s4-logo-squircle" clipPathUnits="objectBoundingBox">
                <path d="M0.6456,0.0034Q0.7912,0.0069 0.8351,0.0174Q0.8789,0.0280 0.9071,0.0463Q0.9353,0.0647 0.9537,0.0929Q0.9720,0.1211 0.9826,0.1649Q0.9931,0.2088 0.9966,0.3544Q1.0000,0.5000 0.9966,0.6456Q0.9931,0.7912 0.9826,0.8351Q0.9720,0.8789 0.9537,0.9071Q0.9353,0.9353 0.9071,0.9537Q0.8789,0.9720 0.8351,0.9826Q0.7912,0.9931 0.6456,0.9966Q0.5000,1.0000 0.3544,0.9966Q0.2088,0.9931 0.1649,0.9826Q0.1211,0.9720 0.0929,0.9537Q0.0647,0.9353 0.0463,0.9071Q0.0280,0.8789 0.0174,0.8351Q0.0069,0.7912 0.0034,0.6456Q0.0000,0.5000 0.0034,0.3544Q0.0069,0.2088 0.0174,0.1649Q0.0280,0.1211 0.0463,0.0929Q0.0647,0.0647 0.0929,0.0463Q0.1211,0.0280 0.1649,0.0174Q0.2088,0.0069 0.3544,0.0034Q0.5000,0.0000 0.6456,0.0034Z" />
              </clipPath>
            </svg>
            <img src="/assets/logo-17-mark.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DataCarriersStage() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let cancelled = false;
    let dispose = () => {};

    import("../../fx/lib/particle-earth.js").then(({ mountCarriersEarth }) => {
      if (cancelled || !hostRef.current) return;
      const canvas = hostRef.current.querySelector(".api-s4-carriers-earth");
      if (!canvas) return;
      dispose = mountCarriersEarth(hostRef.current, canvas);
      if (cancelled) {
        dispose();
        dispose = () => {};
      }
    });

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return (
    <div className="api-s4-vig api-s4-vig--carriers" ref={hostRef} aria-hidden="true">
      <canvas className="api-s4-carriers-earth" aria-hidden="true" />
      <div className="api-s4-hub">
        <svg
          className="api-s4-hub-wires"
          viewBox="0 0 400 360"
          preserveAspectRatio="xMidYMin meet"
          fill="none"
          aria-hidden="true"
        >
          <g className="base">
            {S4_HUB_WIRES.map((wire) => (
              <path key={wire.key} d={wire.d} style={{ "--i": wire.i }} />
            ))}
          </g>
          {["sheen", "mid", "core"].map((layer) => (
            <g key={layer} className={`flow flow-${layer}`}>
              {S4_HUB_WIRES.map((wire) => (
                <path
                  key={`${wire.key}-${layer}`}
                  d={wire.d}
                  pathLength="100"
                  style={{ "--i": wire.i }}
                />
              ))}
            </g>
          ))}
        </svg>
        <div className="api-s4-hub-core">
          <i className="api-s4-hub-port" data-side="t" data-n="0" />
          <i className="api-s4-hub-port" data-side="t" data-n="1" />
          <i className="api-s4-hub-port" data-side="b" data-n="0" />
          <i className="api-s4-hub-port" data-side="b" data-n="1" />
          <i className="api-s4-hub-port" data-side="l" data-n="0" />
          <i className="api-s4-hub-port" data-side="l" data-n="1" />
          <i className="api-s4-hub-port" data-side="r" data-n="0" />
          <i className="api-s4-hub-port" data-side="r" data-n="1" />
          <svg className="api-s4-hub-server" viewBox="0 0 76 46" fill="none" aria-hidden="true">
            <RackShelf y={1.5}>
              <circle className="led" style={{ "--i": 0 }} cx="10" cy="7.5" r="1.7" fill="#2563eb" />
              <circle cx="15.5" cy="7.5" r="1.7" fill="#bfdbfe" />
              <path
                d="M27 4.8v5.4M31.5 4.8v5.4M36 4.8v5.4M40.5 4.8v5.4M45 4.8v5.4"
                stroke="#dbe4f0"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <rect x="56" y="5.6" width="12" height="3.8" rx="1.9" fill="#e8eef8" />
            </RackShelf>
            <RackShelf y={16.5}>
              <circle className="led" style={{ "--i": 1 }} cx="10" cy="22.5" r="1.7" fill="#2563eb" />
              <circle cx="15.5" cy="22.5" r="1.7" fill="#bfdbfe" />
              <rect x="27" y="20.8" width="8" height="3.4" rx="1.4" fill="#93c5fd" />
              <rect x="37" y="20.8" width="8" height="3.4" rx="1.4" fill="#bfdbfe" />
              <rect x="47" y="20.8" width="8" height="3.4" rx="1.4" fill="#dbeafe" />
            </RackShelf>
            <RackShelf y={31.5}>
              <circle className="led" style={{ "--i": 2 }} cx="10" cy="37.5" r="1.7" fill="#2563eb" />
              <circle cx="15.5" cy="37.5" r="1.7" fill="#bfdbfe" />
              <path
                d="M27 34.8v5.4M31.5 34.8v5.4M36 34.8v5.4M40.5 34.8v5.4M45 34.8v5.4"
                stroke="#dbe4f0"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <rect x="56" y="35.6" width="12" height="3.8" rx="1.9" fill="#e8eef8" />
            </RackShelf>
          </svg>
          <HubCarrierCount />
          <em>carriers</em>
        </div>
        {S4_HUB_NODES.map((node, i) => (
          <span
            key={node.name}
            className="api-s4-hub-logo"
            style={{
              "--x": `${(node.x / 400) * 100}%`,
              "--y": `${(node.y / 360) * 100}%`,
              "--s": "44px",
              "--i": i,
            }}
          >
            <img src={node.src} alt="" />
          </span>
        ))}
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
              <b className="api-s4-carrier-box">
                <i className="api-s4-detect-auto">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <circle cx="5.2" cy="5.2" r="3.4" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M7.9 7.9l2.3 2.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Auto-detect
                </i>
                <i className="api-s4-detect-hit">
                  <img src="/assets/carriers/dhl.svg" alt="" />
                  DHL Express
                </i>
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
                <em>LV123242CN</em>
              </div>
              <span className="api-s4-match">80%+ match</span>
            </div>
            <div className="api-s4-sync">
              <div className="api-s4-sync-track">
                <i className="api-s4-sync-dot" style={{ "--c": "#00bcd4", "--i": 0 }} />
                <i className="api-s4-sync-seg" style={{ "--i": 0 }} />
                <i className="api-s4-sync-dot" style={{ "--c": "#2196f3", "--i": 1 }} />
                <i className="api-s4-sync-seg" style={{ "--i": 1 }} />
                <i className="api-s4-sync-dot" style={{ "--c": "#2962ff", "--i": 2 }} />
                <i className="api-s4-sync-seg" style={{ "--i": 2 }} />
                <i className="api-s4-sync-dot is-live" style={{ "--c": "#43a047", "--i": 3 }} />
              </div>
              <em>Auto-sync · non-stop until fulfilled</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Dashboard collage — bars: carrier avg transit days, part of well width */
const S4_PERF_BARS = [
  ["USPS", "3.2d", 0.86, "#2962ff"],
  ["UPS", "2.4d", 0.64, "#2196f3"],
  ["FedEx", "2.1d", 0.56, "#00bcd4"],
  ["DHL", "1.9d", 0.5, "#43a047"],
];

const S4_FN_ROWS = [
  ["Register API", "99.9%", "#43a047"],
  ["Webhook push", "99.8%", "#43a047"],
  ["Carrier sync", "97.2%", "#ff6f00"],
];

export function DataChartStage() {
  let acc = 0;
  return (
    <div className="api-s4-vig api-s4-vig--dash" aria-hidden="true">
      <i className="api-s4-dash-disc" />
      <div className="api-s4-dashgrid">
        <article className="api-s4-dashtile api-s4-dashtile--donut">
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
            {S4_ARCS.slice(0, 4).map(([, color, label]) => (
              <li key={label}>
                <i style={{ background: color }} />
                {label}
              </li>
            ))}
          </ul>
        </article>

        <article className="api-s4-dashtile api-s4-dashtile--perf">
          <span className="api-s4-chart-kicker">Carrier time performance</span>
          <ul className="api-s4-bars">
            {S4_PERF_BARS.map(([label, days, part, color], i) => (
              <li key={label}>
                <em>{label}</em>
                <span className="api-s4-bar-track">
                  <i style={{ "--w": `${Math.round(part * 100)}%`, "--c": color, "--i": i }} />
                </span>
                <b>{days}</b>
              </li>
            ))}
          </ul>
        </article>

        <article className="api-s4-dashtile api-s4-dashtile--fn">
          <span className="api-s4-chart-kicker">Tracking function status</span>
          <ul className="api-s4-fnlist">
            {S4_FN_ROWS.map(([label, pct, color], i) => (
              <li key={label}>
                <i style={{ "--c": color, "--i": i }} />
                {label}
                <b>{pct}</b>
              </li>
            ))}
          </ul>
        </article>

        <div className="api-s4-dashtoast">
          <span className="api-s4-dashtoast-ico">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M7 1.6a3.6 3.6 0 0 0-3.6 3.6c0 2.6-.9 3.6-1.4 4.1h10c-.5-.5-1.4-1.5-1.4-4.1A3.6 3.6 0 0 0 7 1.6Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path d="M5.8 11.6a1.3 1.3 0 0 0 2.4 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="api-s4-dashtoast-txt">
            <b>Webhook push alert</b>
            <em>Endpoint retry · 200 OK</em>
          </span>
        </div>
      </div>
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
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
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
