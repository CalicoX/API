/**
 * Use Cases stage — webgl-demo exploded hub (carriers + server + terminal).
 * Terminal typewriter / explode / orbit animations live inside iso-hub-webgl.
 */

import { useEffect, useId, useRef, useState } from "react";
import { observeVisibility, prefersReducedMotion } from "../../fx/utils.js";
import avaAgent from "../../assets/onboard/ava-agent.jpg";
import avaUser from "../../assets/onboard/ava-user.jpg";
import avaHelp from "../../assets/onboard/ava-help.jpg";
import avaAsk from "../../assets/onboard/ava-ask.jpg";
import xlsTile from "../../assets/onboard/xls.jpg";

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
      import("../../fx/modules/iso-hub-webgl.js").then(
        ({ createIsoHubWebGL }) => {
          if (cancelled || !hostRef.current) return;
          gl = createIsoHubWebGL(hostRef.current, {
            assetBase: "/assets/webgl-hub",
          });
          window.__isoHubWebGL = gl;
          // 挂载完立刻用当前滚动进度做种子（onReady 闭包里 gl 还没赋值，之前是空转）
          const section = document.getElementById("use-cases");
          const p = parseFloat(
            section?.style?.getPropertyValue("--uc-p") || "0.15",
          );
          gl.setProgress(Number.isFinite(p) ? Math.max(p, 0.12) : 0.15);
        },
      );
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
      { threshold: 0.01, rootMargin: "240px" },
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
  {
    label: "Info Received",
    icon: "info",
    src: "/assets/status/info-received.svg",
  },
  {
    label: "In Transit",
    icon: "transit",
    src: "/assets/status/in-transit.svg",
  },
  {
    label: "Out For Delivery",
    icon: "out",
    src: "/assets/status/out-for-delivery.svg",
  },
  { label: "Pick Up", icon: "pickup", src: "/assets/status/pickup.svg" },
  { label: "Delivered", icon: "done", src: "/assets/status/delivered.svg" },
];

const S4_MAINS_INNER = [
  { label: "Alert", icon: "alert", src: "/assets/status/alert.svg" },
  { label: "Expired", icon: "expired", src: "/assets/status/expired.svg" },
  { label: "Undelivered", icon: "fail", src: "/assets/status/undelivered.svg" },
  { label: "Not Found", icon: "missing", src: "/assets/status/not-found.svg" },
];

function StatusOrbitRing({ items, tone, seq = 0 }) {
  const base = tone === "inner" ? 45 : 0;
  return (
    <ul
      className={`api-s4-orbit-ring api-s4-orbit-ring--${tone}`}
      style={{ "--n": items.length }}
    >
      {items.map((item, i) => {
        const deg = ((((i * 360) / items.length + base) % 360) + 360) % 360;
        const onRight = deg > 20 && deg < 160;
        const flip = tone === "outer" ? onRight : !onRight;
        return (
          <li key={item.label} style={{ "--i": i, "--ci": seq + i }}>
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
  {
    src: "/assets/carriers/dhl.svg",
    name: "DHL",
    x: 122,
    y: 42,
    side: "t",
    sx: 177,
    sy: 114,
  },
  {
    src: "/assets/carriers/usps.svg",
    name: "USPS",
    x: 278,
    y: 42,
    side: "t",
    sx: 223,
    sy: 114,
  },
  {
    src: "/assets/carriers/fedex.svg",
    name: "FedEx",
    x: 44,
    y: 128,
    side: "l",
    sx: 137,
    sy: 156,
  },
  {
    src: "/assets/carriers/tnt.svg",
    name: "TNT",
    x: 44,
    y: 232,
    side: "l",
    sx: 137,
    sy: 204,
  },
  {
    src: "/assets/carriers/dpd.svg",
    name: "DPD",
    x: 356,
    y: 128,
    side: "r",
    sx: 263,
    sy: 156,
  },
  {
    src: "/assets/carriers/gls.svg",
    name: "GLS",
    x: 356,
    y: 232,
    side: "r",
    sx: 263,
    sy: 204,
  },
  {
    src: "/assets/carriers/ups.svg",
    name: "UPS",
    x: 122,
    y: 318,
    side: "b",
    sx: 177,
    sy: 246,
  },
  {
    src: "/assets/carriers/royal-mail.svg",
    name: "Royal Mail",
    x: 278,
    y: 318,
    side: "b",
    sx: 223,
    sy: 246,
  },
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

function HubCarrierCount({ active = false }) {
  const ref = useRef(null);
  const [n, setN] = useState(4000);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setN(4000);
      return undefined;
    }
    let raf = 0;
    const play = () => {
      cancelAnimationFrame(raf);
      const t0 = performance.now();
      const dur = 1500;
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - (1 - p) ** 3;
        setN(Math.round(4000 * e));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setN(0);
      raf = requestAnimationFrame(tick);
    };
    if (active) play();
    else {
      cancelAnimationFrame(raf);
      setN(4000);
    }
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <b ref={ref}>
      {n.toLocaleString("en-US")}
      <span>+</span>
    </b>
  );
}

export function DataStatusStage() {
  return (
    <div className="api-s4-vig api-s4-vig--status" aria-hidden="true">
      <div className="api-s4-orbit-field" aria-hidden="true">
        {[5, 4, 3, 2, 1, 0].map((i) => (
          <span key={i} className="api-s4-orbit-wash" style={{ "--r": i }} />
        ))}
      </div>
      <div className="api-s4-orbit">
        <StatusOrbitRing items={S4_MAINS_OUTER} tone="outer" seq={0} />
        <StatusOrbitRing items={S4_MAINS_INNER} tone="inner" seq={5} />
        <div className="api-s4-orbit-core" />
      </div>
    </div>
  );
}

export function DataCarriersStage({ active = false }) {
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
    <div
      className="api-s4-vig api-s4-vig--carriers"
      ref={hostRef}
      aria-hidden="true"
    >
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
              <path
                key={wire.key}
                d={wire.d}
                pathLength="100"
                style={{ "--i": wire.i }}
              />
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
        <div className="api-s4-hub-core" data-s4-core>
          <span
            className="api-s4-keel-slot"
            data-s4-keel-slot
            aria-hidden="true"
          />
          <HubCarrierCount active={active} />
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

/* DHL Express waybill: 10 digits, last digit = first 9 mod 7 */
const S4_NUMBER = "8564312072";
const S4_TRACK_EVENTS = [
  {
    time: "2022/8/18 10:22:00",
    text: "NEW YORK NY 10001, Delivered",
    live: true,
  },
  { time: "2022/8/18 08:14:00", text: "With delivery courier, DHL Express" },
  {
    time: "2022/8/17 21:06:00",
    text: "Arrived at DHL facility, Los Angeles CA",
  },
  { time: "2022/8/16 14:40:00", text: "Shipment picked up, Shanghai CN" },
];

export function DataHubStage({ active = false }) {
  const vigRef = useRef(null);
  const [typed, setTyped] = useState(S4_NUMBER);
  const [typing, setTyping] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState(true);
  const [panel, setPanel] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [snap, setSnap] = useState(false);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    let cancelled = false;
    let timer = 0;
    let startTimer = 0;

    const finish = () => {
      setTyped(S4_NUMBER);
      setTyping(false);
      setScanning(false);
      setDetected(true);
      setPanel(true);
      setPlaying(false);
      setSnap(false);
    };

    const wait = (ms) =>
      new Promise((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const play = async () => {
      if (reduce) {
        finish();
        return;
      }
      /* 激活时已清空，这里只负责打字→扫描→识别；面板不位移，DHL 桥落点才准 */
      setPlaying(true);
      setTyping(true);
      for (let i = 1; i <= S4_NUMBER.length; i++) {
        if (cancelled) return;
        setTyped(S4_NUMBER.slice(0, i));
        await wait(70);
      }
      if (cancelled) return;
      setTyping(false);
      setScanning(true);
      await wait(680);
      if (cancelled) return;
      setDetected(true);
      setScanning(false);
      /* 识别完成：卡上移，轨迹面板带分块渐显跟进 */
      setPanel(true);
    };

    if (active) {
      /* 激活即清空 + 面板收拢：单号卡居中独处，识别完成再上移 */
      setTyped("");
      setTyping(false);
      setScanning(false);
      setDetected(false);
      setPanel(false);
      startTimer = window.setTimeout(play, reduce ? 0 : 700);
    } else finish();

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(timer);
    };
  }, [active]);

  const cls = [
    "api-s4-vig api-s4-vig--auto",
    scanning ? "is-scanning" : "",
    detected ? "is-detected" : "",
    panel ? "is-panel" : "",
    playing ? "is-playing" : "",
    snap ? "is-snap" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} ref={vigRef} aria-hidden="true">
      <div className="api-s4-flow">
        <div className="api-s4-codewin" data-s4-core>
          <div className="api-vig-float-h">
            <strong>Add Number</strong>
            <span>×</span>
          </div>
          <div className="api-vig-field">
            <span>Tracking number*</span>
            <b className="api-s4-numtype">
              {typed}
              {typing ? <span className="api-vig-caret" /> : null}
            </b>
          </div>
          <div className="api-vig-field">
            <span>Carrier*</span>
            <b className="api-s4-carrier-box">
              <i className="api-s4-detect-auto">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="5.2"
                    cy="5.2"
                    r="3.4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M7.9 7.9l2.3 2.3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                Auto-detect
              </i>
              <i className="api-s4-detect-hit" data-s4-dhl-target>
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
        <div className="api-s4-trackpane api-vig-track">
          <div className="api-vig-track-bar">
            <span className="api-vig-track-id">{S4_NUMBER}</span>
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
              <em>China (DHL Express) → United States</em>
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
            <p className="api-vig-carrier">DHL Express · China</p>
            <ul className="api-vig-rows">
              {S4_TRACK_EVENTS.map((row) => (
                <li
                  key={row.time}
                  className={row.live ? "is-live is-in" : "is-in"}
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
        </div>
      </div>
    </div>
  );
}

/* Dashboard collage — Mora 式浮空排版 + 状态分布扇区（Park: 状态要保留） */
const S4_DASH_ARCS = [
  [0.22, "#9aa3af", "Not Found"],
  [0.04, "#22d3ee", "Info Received"],
  [0.05, "#60a5fa", "In Transit"],
  [0.03, "#2563eb", "Pick Up"],
  [0.55, "#43a047", "Delivered"],
  [0.04, "#3b82f6", "Out For Delivery"],
  [0.03, "#ef4444", "Undelivered"],
  [0.025, "#f97316", "Alert"],
  [0.015, "#b91c1c", "Expired"],
];

const DONUT_CX = 50;
const DONUT_R_IN = 31;
const DONUT_R_OUT = 46.5;

/** Filled annular sector. Tiny stroke-dashes look like radial ticks — don't use those. */
function donutSlicePath(a0, a1) {
  const delta = a1 - a0;
  if (delta < 1e-4) return "";
  const large = delta > Math.PI ? 1 : 0;
  const pt = (r, a) => [DONUT_CX + r * Math.cos(a), DONUT_CX + r * Math.sin(a)];
  const [ox0, oy0] = pt(DONUT_R_OUT, a0);
  const [ox1, oy1] = pt(DONUT_R_OUT, a1);
  const [ix1, iy1] = pt(DONUT_R_IN, a1);
  const [ix0, iy0] = pt(DONUT_R_IN, a0);
  return `M${ox0.toFixed(3)} ${oy0.toFixed(3)} A${DONUT_R_OUT} ${DONUT_R_OUT} 0 ${large} 1 ${ox1.toFixed(3)} ${oy1.toFixed(3)} L${ix1.toFixed(3)} ${iy1.toFixed(3)} A${DONUT_R_IN} ${DONUT_R_IN} 0 ${large} 0 ${ix0.toFixed(3)} ${iy0.toFixed(3)} Z`;
}

const S4_DONUT_SLICES = (() => {
  let a = -Math.PI / 2;
  return S4_DASH_ARCS.map(([part, color, label], i) => {
    const a1 = a + part * Math.PI * 2;
    const slice = { d: donutSlicePath(a, a1 + 0.012), color, label, i };
    a = a1;
    return slice;
  });
})();

const S4_TREND_XS = [
  "08-14",
  "08-15",
  "08-16",
  "08-17",
  "08-18",
  "08-19",
  "08-20",
];
const S4_TREND_BOX = { l: 24, r: 248 };

function s4TrendX(i) {
  const { l, r } = S4_TREND_BOX;
  return l + (i / (S4_TREND_XS.length - 1)) * (r - l);
}

const S4_CURVE_LINE =
  "M0 176 C70 186 128 192 180 180 C232 168 278 140 328 112 C368 92 424 78 480 76";
const S4_CURVE_FILL = `${S4_CURVE_LINE} L480 260 L0 260 Z`;

export function DataChartStage() {
  const fillId = `s4-dash-fill-${useId().replace(/:/g, "")}`;
  return (
    <div className="api-s4-vig api-s4-vig--dash" aria-hidden="true">
      <svg
        className="api-s4-dash-curve"
        viewBox="0 0 480 260"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7B5CFF" stopOpacity="0.38" />
            <stop offset="46%" stopColor="#8B74FF" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#7B5CFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="api-s4-dash-curve-fill"
          d={S4_CURVE_FILL}
          fill={`url(#${fillId})`}
        />
        <path
          className="api-s4-dash-curve-line"
          d={S4_CURVE_LINE}
          pathLength="100"
        />
      </svg>
      <div className="api-s4-dashgrid">
        <article
          className="api-s4-dashtile api-s4-dashtile--donut"
          data-s4-core
        >
          <span className="api-s4-chart-kicker">Status distribution</span>
          <div className="api-s4-donut-row">
            <div className="api-s4-donut-wrap">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="38.75"
                  fill="none"
                  stroke="#eef2f7"
                  strokeWidth="15.5"
                />
                {S4_DONUT_SLICES.map((slice) => (
                  <path
                    key={slice.label}
                    className="api-s4-donut-seg"
                    d={slice.d}
                    fill={slice.color}
                    style={{ "--delay": `${slice.i * 0.07}s` }}
                  />
                ))}
              </svg>
            </div>
            <ul className="api-s4-legend">
              {S4_DASH_ARCS.map(([, color, label]) => (
                <li key={label}>
                  <i style={{ background: color }} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="api-s4-dashtile api-s4-dashtile--trend">
          <span className="api-s4-chart-kicker">Not Found · 90d</span>
          <svg
            className="api-s4-trend"
            viewBox="0 0 256 118"
            preserveAspectRatio="none"
          >
            {S4_TREND_XS.map((d, i) =>
              i % 2 === 0 ? (
                <text key={d} x={s4TrendX(i)} y={108} textAnchor="middle">
                  {d}
                </text>
              ) : null,
            )}
          </svg>
        </article>
        <div className="api-s4-dashtoast">
          <span className="api-s4-dashtoast-ico">
            <svg
              width="11"
              height="11"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 1.6a3.6 3.6 0 0 0-3.6 3.6c0 2.6-.9 3.6-1.4 4.1h10c-.5-.5-1.4-1.5-1.4-4.1A3.6 3.6 0 0 0 7 1.6Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path
                d="M5.8 11.6a1.3 1.3 0 0 0 2.4 0"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
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
const APP_ICONS = {
  logistics: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7.5h11.5V17H3z" pathLength="100" />
      <path d="M14.5 10.5H19l2.5 3V17h-7" pathLength="100" />
      <circle cx="7.2" cy="18.2" r="1.55" pathLength="100" />
      <circle cx="17.3" cy="18.2" r="1.55" pathLength="100" />
    </svg>
  ),
  ecommerce: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.2 8.2h11.6L16.7 20H7.3L6.2 8.2Z" pathLength="100" />
      <path d="M9.2 8.2V7.1a2.8 2.8 0 0 1 5.6 0v1.1" pathLength="100" />
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.2"
        y="6.2"
        width="17.6"
        height="11.6"
        rx="2.2"
        pathLength="100"
      />
      <path d="M3.2 10.2h17.6" pathLength="100" />
      <path d="M7 15.2h4.2" pathLength="100" />
    </svg>
  ),
  integrator: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6.2" cy="6.4" r="2.15" pathLength="100" />
      <circle cx="17.8" cy="6.4" r="2.15" pathLength="100" />
      <circle cx="12" cy="17.7" r="2.15" pathLength="100" />
      <path d="M8 7.6 10.7 15.8" pathLength="100" />
      <path d="M16 7.6 13.3 15.8" pathLength="100" />
      <path d="M8.4 6.4h7.2" pathLength="100" />
    </svg>
  ),
  platforms: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.2"
        y="3.2"
        width="7.6"
        height="7.6"
        rx="1.7"
        pathLength="100"
      />
      <rect
        x="13.2"
        y="3.2"
        width="7.6"
        height="7.6"
        rx="1.7"
        pathLength="100"
      />
      <rect
        x="3.2"
        y="13.2"
        width="7.6"
        height="7.6"
        rx="1.7"
        pathLength="100"
      />
      <rect
        x="13.2"
        y="13.2"
        width="7.6"
        height="7.6"
        rx="1.7"
        pathLength="100"
      />
    </svg>
  ),
};

export function AppIcon({ kind }) {
  return (
    <span className="api-app-ico" data-kind={kind} aria-hidden="true">
      {APP_ICONS[kind] ?? null}
    </span>
  );
}

/* ——— How-it-works: light UI vignettes ——— */

function useVigCardHover(ref) {
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const node = ref.current;
    const card = node?.closest(".api-s3-card") ?? node;
    if (!card) return undefined;
    const on = () => setHover(true);
    const off = () => setHover(false);
    card.addEventListener("mouseenter", on);
    card.addEventListener("mouseleave", off);
    return () => {
      card.removeEventListener("mouseenter", on);
      card.removeEventListener("mouseleave", off);
    };
  }, []);
  return hover;
}

function VigPointer({ cursor }) {
  return (
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
  );
}

function aimIn(root, el, setCursor) {
  if (!root || !el) return;
  const a = root.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  setCursor({
    x: b.left - a.left + Math.min(14, b.width * 0.22),
    y: b.top - a.top + b.height * 0.55,
    show: true,
    press: false,
  });
}

/** Step 1 — Hero 留资表缩样 + 光标填表 */
export function IllusSignupPanel() {
  const rootRef = useRef(null);
  const companyRef = useRef(null);
  const emailRef = useRef(null);
  const volumeRef = useRef(null);
  const submitRef = useRef(null);
  const hover = useVigCardHover(rootRef);
  const [fill, setFill] = useState({ company: "", email: "", volume: "" });
  const [cursor, setCursor] = useState({ x: 48, y: 80, show: false, press: false });
  const [toast, setToast] = useState(false);
  const [sheetY, setSheetY] = useState(0);

  useEffect(() => {
    if (!hover) {
      setFill({ company: "", email: "", volume: "" });
      setCursor((c) => ({ ...c, show: false, press: false }));
      setToast(false);
      setSheetY(0);
      return undefined;
    }
    if (prefersReducedMotion()) return undefined;

    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const aim = (el) => aimIn(rootRef.current, el, setCursor);

    (async () => {
      while (!cancelled) {
        setFill({ company: "", email: "", volume: "" });
        setToast(false);
        setSheetY(0);
        aim(companyRef.current);
        await wait(480);
        if (cancelled) return;
        setCursor((c) => ({ ...c, press: true }));
        await wait(140);
        if (cancelled) return;
        setFill((f) => ({ ...f, company: "Acme Logistics" }));
        setCursor((c) => ({ ...c, press: false }));
        await wait(320);
        if (cancelled) return;
        aim(emailRef.current);
        await wait(440);
        if (cancelled) return;
        setCursor((c) => ({ ...c, press: true }));
        await wait(140);
        if (cancelled) return;
        setFill((f) => ({ ...f, email: "you@acme.com" }));
        setCursor((c) => ({ ...c, press: false }));
        await wait(280);
        if (cancelled) return;
        setSheetY(-36);
        await wait(480);
        if (cancelled) return;
        aim(volumeRef.current);
        await wait(440);
        if (cancelled) return;
        setCursor((c) => ({ ...c, press: true }));
        await wait(140);
        if (cancelled) return;
        setFill((f) => ({ ...f, volume: "1,001–10,000" }));
        setCursor((c) => ({ ...c, press: false }));
        await wait(280);
        if (cancelled) return;
        setSheetY(-88);
        await wait(480);
        if (cancelled) return;
        aim(submitRef.current);
        await wait(480);
        if (cancelled) return;
        setCursor((c) => ({ ...c, press: true }));
        await wait(150);
        if (cancelled) return;
        setCursor((c) => ({ ...c, press: false }));
        setToast(true);
        await wait(1600);
        if (cancelled) return;
        await wait(360);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [hover]);

  return (
    <div className="api-vig api-vig--signup" ref={rootRef}>
      <div
        className="api-vig-sheet api-vig-sheet--signup"
        style={{ transform: `translateY(${sheetY}px)` }}
      >
        <header className="api-vig-head">
          <h4 className="api-vig-title">Sign up for free trial</h4>
        </header>
        <div className="api-vig-signup-grid">
          <div className="api-vig-signup-field">
            <span className="api-vig-k">Company Name</span>
            <div ref={companyRef} className={`api-vig-input${fill.company ? " is-filled" : ""}`}>
              {fill.company}
            </div>
          </div>
          <div className="api-vig-signup-field">
            <span className="api-vig-k">Company Website</span>
            <div className="api-vig-input" />
          </div>
          <div className="api-vig-signup-field">
            <span className="api-vig-k">Phone Number</span>
            <div className="api-vig-input" />
          </div>
          <div className="api-vig-signup-field">
            <span className="api-vig-k">Email</span>
            <div ref={emailRef} className={`api-vig-input${fill.email ? " is-filled" : ""}`}>
              {fill.email}
            </div>
          </div>
          <div className="api-vig-signup-field is-full">
            <span className="api-vig-k">Monthly Shipment Volume</span>
            <div
              ref={volumeRef}
              className={`api-vig-input api-vig-input--select${fill.volume ? " is-filled" : ""}`}
            >
              {fill.volume || "Select"}
            </div>
          </div>
          <div className="api-vig-signup-field is-full">
            <span className="api-vig-k">Password</span>
            <div className="api-vig-input api-vig-input--pass">
              <i />
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8s-2.4 4.5-6.5 4.5S1.5 8 1.5 8Z" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </div>
          </div>
          <div className="api-vig-signup-field is-full">
            <span className="api-vig-k">Tell us how would you like us to help.</span>
            <div className="api-vig-input" />
          </div>
        </div>
        <p className="api-vig-signup-agree">
          <i className="is-on" />
          <span>
            By continuing to use our service means that you have read and agree to 17TRACK
            &apos;Terms&apos; and &apos;Privacy&apos;.
          </span>
        </p>
        <div className="api-vig-actions">
          <span ref={submitRef} className="api-vig-btn api-vig-btn--primary api-vig-btn--wide">
            Start My Free Trial
          </span>
        </div>
        <p className="api-vig-signup-nocc">No credit card required</p>
      </div>
      <VigPointer cursor={cursor} />
      <div className={`api-vig-toast${toast ? " is-on" : ""}`} aria-hidden="true">
        Trial started
      </div>
    </div>
  );
}

/** Step 2 — Edit Tracking webhook (matches product UI; bottom-cropped) */
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
  const hover = useVigCardHover(rootRef);
  const [on, setOn] = useState(() => new Set(["Info Received", "In Transit"]));
  const [cursor, setCursor] = useState({
    x: 48,
    y: 80,
    show: false,
    press: false,
  });
  const [toast, setToast] = useState(false);
  const [sheetY, setSheetY] = useState(0);

  useEffect(() => {
    if (!hover) {
      setOn(new Set(["Info Received", "In Transit"]));
      setCursor((c) => ({ ...c, show: false, press: false }));
      setToast(false);
      setSheetY(0);
      return undefined;
    }
    if (prefersReducedMotion()) return undefined;

    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const aim = (el) => aimIn(rootRef.current, el, setCursor);

    (async () => {
      while (!cancelled) {
        setOn(new Set());
        setToast(false);
        setSheetY(0);
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
        await wait(280);
        if (cancelled) return;
        setSheetY(-56);
        await wait(480);
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
    <div className="api-vig api-vig--webhook" ref={rootRef}>
      <div
        className="api-vig-sheet api-vig-sheet--webhook"
        style={{ transform: `translateY(${sheetY}px)` }}
      >
        <header className="api-vig-head">
          <h4 className="api-vig-title">Edit Tracking webhook</h4>
          <span className="api-vig-close" aria-hidden="true">
            ×
          </span>
        </header>
        <p className="api-vig-desc">
          Enter the URL for receiving tracking info. We will send a POST request
          with a JSON body to the URL once the tracking is updated.
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
                label === "Info Received"
                  ? infoRef
                  : label === "In Transit"
                    ? transitRef
                    : undefined
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
      <VigPointer cursor={cursor} />
      <div
        className={`api-vig-toast${toast ? " is-on" : ""}`}
        aria-hidden="true"
      >
        Webhook saved
      </div>
    </div>
  );
}

/** Register — curl above Add Number, overlap then split on hover */
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
              <span className="api-vig-jsonwin-title">
                &lt;/17track.api&gt;
              </span>
            </div>
            <pre className="api-vig-code">
              <code>
                <span className="c-cmd">curl -X POST \</span>
                {"\n"}
                <span className="c-flag">--header</span>
                <span className="c-str"> &apos;17token:token&apos; \</span>
                {"\n"}
                <span className="c-flag">--header</span>
                <span className="c-str">
                  {" "}
                  &apos;Content-Type:application/json&apos; \
                </span>
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
                <span className="c-url">
                  https://api.17track.net/track/v2/register
                </span>
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
  {
    time: "2022/8/18 10:22:00",
    text: "SHINGLE SPRINGS CA 95682, Delivered",
    live: true,
  },
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

function ObAva({ src }) {
  return <img className="api-ob-ava" src={src} alt="" />;
}

/** Onboard 1 — support chat, floating white sheet. */
export function IllusOnboardChat() {
  return (
    <div className="api-ob api-ob--chat" aria-hidden="true">
      <div className="api-ob-sheet">
        <header className="api-ob-head">
          <span className="api-ob-mark">
            <b>17</b>TRACK
          </span>
        </header>
        <div className="api-ob-thread">
          <div className="api-ob-row is-bot">
            <ObAva src={avaAgent} />
            <p>
              17TRACK is a logistics tracking platform with a Tracking API that
              automatically tracks the logistics information of your parcels.
            </p>
          </div>
          <div className="api-ob-row is-me">
            <p>I want to understand how the API works.</p>
            <ObAva src={avaUser} />
          </div>
          <div className="api-ob-row is-bot">
            <ObAva src={avaAgent} />
            <p>Well, there are three main steps to using the API.</p>
          </div>
          <div className="api-ob-row is-me">
            <p>Thank you!</p>
            <ObAva src={avaUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Onboard 2 — navy Help window + overlapping chat. */
export function IllusOnboardTrial() {
  return (
    <div className="api-ob api-ob--trial" aria-hidden="true">
      <div className="api-ob-code">
        <div className="api-ob-codebar">
          <span className="api-vig-dots">
            <i />
            <i />
            <i />
          </span>
          <span>Help</span>
        </div>
        <pre className="api-vig-code">
          <code>
            <span className="c-cmd">curl -X POST \</span>
            {"\n"}
            <span className="c-flag">--header</span>
            {" '17token:token' \\"}
            {"\n"}
            <span className="c-flag">--header</span>
            {" 'Content-Type:application/json' \\"}
            {"\n"}
            <span className="c-flag">--data</span>
            {" '[{"}
            {"\n  "}
            {'"number": "RR123456789CN"'}
            {"\n"}
            {"}]' \\"}
            {"\n"}
            <span className="c-url">
              https://api.17track.net/track/v2/register
            </span>
          </code>
        </pre>
      </div>
      <div className="api-ob-help">
        <div className="api-ob-row is-bot">
          <ObAva src={avaHelp} />
          <p>Hello! How can I help you?</p>
        </div>
        <div className="api-ob-row is-me">
          <p>Can I pass multiple tracking numbers?</p>
          <ObAva src={avaAsk} />
        </div>
      </div>
    </div>
  );
}

/** Onboard 3 — stacked plan chips, cursor points at Flagship. */
export function IllusOnboardPlans() {
  return (
    <div className="api-ob api-ob--plans" aria-hidden="true">
      <div className="api-ob-mini">
        <span>Pro</span>
        <strong>$2,869</strong>
        <em>
          150,000 Quota <i>$0.0191/Quota</i>
        </em>
      </div>
      <div className="api-ob-mini is-flag">
        <span>
          Flagship <b>🔥</b>
        </span>
        <strong>$9,299</strong>
        <em>
          500,000 Quota <i>$0.0185/Quota</i>
        </em>
        <abbr>Recommended</abbr>
      </div>
      <div className="api-ob-mini">
        <span>Advanced</span>
        <strong>$569</strong>
        <em>
          25,000 Quota <i>$0.0227/Quota</i>
        </em>
      </div>
      <svg className="api-ob-cursor" viewBox="0 0 24 24" width="18" height="18">
        <path
          d="M4.2 3.2 L4.2 19.4 L8.8 14.9 L12.6 22.2 L15.4 20.8 L11.7 13.6 L18.2 13.6 Z"
          fill="#0a0a0a"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Onboard 4 — delivered board + XLS tile + Add Number. */
export function IllusOnboardLive() {
  return (
    <div className="api-ob api-ob--live" aria-hidden="true">
      <div className="api-ob-board">
        <div className="api-ob-board-top">
          <b>LV123242CN</b>
          <i className="api-ob-toggle" />
        </div>
        <div className="api-ob-deliv">
          <span>✓</span>
          Delivered
        </div>
        <ul className="api-ob-bars">
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
      <div className="api-ob-xls">
        <img src={xlsTile} alt="" />
        <em>Sheet Import</em>
      </div>
      <div className="api-ob-modal">
        <div className="api-vig-float-h">
          <strong>Add Number</strong>
          <span>×</span>
        </div>
        <div className="api-vig-field">
          <span>Tracking Number*</span>
          <b>8564312072</b>
        </div>
        <div className="api-vig-field">
          <span>Carrier*</span>
          <b>DHL Express</b>
        </div>
        <div className="api-vig-field">
          <span>Tag</span>
          <b />
        </div>
      </div>
    </div>
  );
}
