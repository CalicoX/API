import { useEffect, useRef, useState } from "react";
import {
  DataStatusStage,
  DataCarriersStage,
  DataHubStage,
  DataChartStage,
} from "../visuals/ApiDomVisuals.jsx";

function tintWords(text, start = 0) {
  let n = start;
  return text.split(/(\s+)/).map((part, i) => {
    if (!part.trim()) return part;
    const el = (
      <span key={`${part}-${i}`} className="api-s4-word" style={{ "--i": n }}>
        {part}
      </span>
    );
    n += 1;
    return el;
  });
}

function goToTrial(e) {
  const el = document.getElementById("free-trial");
  if (!el) return;
  e.preventDefault();
  if (window.__lenis?.scrollTo) {
    window.__lenis.scrollTo(el, { duration: 1.1, force: true });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

const SCENES = [
  {
    Visual: DataStatusStage,
    well: "status",
    idx: "01",
    title: "Tracking Data That Counts",
    body: "Standardized 9+30 shipment statuses give your systems a consistent view of shipment progress across carriers.",
    dwell: 4600,
  },
  {
    Visual: DataCarriersStage,
    well: "carriers",
    idx: "02",
    title: "Global Carriers Covered",
    body: "Access tracking data from 4,000+ carriers through one reliable data layer.",
    dwell: 5800,
  },
  {
    Visual: DataHubStage,
    well: "auto",
    idx: "03",
    title: "Smart Carrier Identification",
    body: "Automatically identify carriers for 80%+ of tracking numbers and keep shipment data continuously updated until delivery.",
    dwell: 5200,
  },
  {
    Visual: DataChartStage,
    well: "dash",
    idx: "04",
    title: "Actionable tracking insights",
    body: "Monitor tracking accuracy, shipment status, carrier performance, and webhook activity in one dashboard.",
    dwell: 5600,
  },
];

/* 要盖过最长的进场过渡（--s4-in 1.25s），否则 is-exit 提前摘掉会闪一帧候场态 */
const EXIT_MS = 1300;

/* 桥的候场逆变换系数：stage 候场是 scale(0.52)、origin 50% 50%（css 同步） */
const STANDBY_SCALE = 0.52;

/* match-cut 桥只保留真有关联的场对（2026-08-29 Park：没有关联元素就别强行同元素过渡）：
   2→3 的 DHL 徽标是真关联（同一承运商），3→4 / 4→1 的白卡 morph 已删，
   那两段靠各场自己的进出场编排衔接。
   dur 与第三场识别时刻对齐：激活即清空、700ms 起打字 700ms、扫 680ms → 识别 ~2.08s。 */
const BRIDGE_PAIRS = {
  "carriers>auto": { kind: "dhl", dur: "2.1s", ttl: 2150 },
};

function measureBridge(well, fromWell, toWell, id) {
  const cfg = BRIDGE_PAIRS[`${fromWell}>${toWell}`];
  if (!well || !cfg) return null;
  const wr = well.getBoundingClientRect();
  if (!wr.width || !wr.height) return null;
  let aEl;
  if (cfg.kind === "dhl") {
    aEl = [
      ...well.querySelectorAll(`.api-s4-illus--${fromWell} .api-s4-hub-logo`),
    ].find((el) => el.querySelector('img[src*="dhl"]'));
  } else {
    aEl = well.querySelector(`.api-s4-illus--${fromWell} [data-s4-core]`);
  }
  const bEl = well.querySelector(
    cfg.toSelector ?? `.api-s4-illus--${toWell} [data-s4-core]`,
  );
  if (!aEl || !bEl) return null;
  const rel = (el) => {
    const r = el.getBoundingClientRect();
    return {
      x: ((r.left - wr.left) / wr.width) * 100,
      y: ((r.top - wr.top) / wr.height) * 100,
      w: (r.width / wr.width) * 100,
      h: (r.height / wr.height) * 100,
      r: getComputedStyle(el).borderTopLeftRadius,
    };
  };
  const a = rel(aEl);
  const b0 = rel(bEl);
  const s = STANDBY_SCALE;
  const cx = 50 + (b0.x + b0.w / 2 - 50) / s;
  let cy = 50 + (b0.y + b0.h / 2 - 50) / s;
  if (cfg.kind === "dhl") {
    /* 识别瞬间面板还是收拢态：落点要按「单号卡居中」的布局算
       （css 的收拢位移是 translateY((100cqh - 100%) / 2 - 6px)） */
    const codeEl = well.querySelector(
      `.api-s4-illus--${toWell} .api-s4-codewin`,
    );
    if (codeEl) {
      const codeH = codeEl.getBoundingClientRect().height / s;
      cy += (((wr.height - codeH) / 2 - 6) / wr.height) * 100;
    }
  }
  const bw = b0.w / s;
  const bh = b0.h / s;
  return {
    id,
    kind: cfg.kind,
    dur: cfg.dur,
    fx: a.x,
    fy: a.y,
    fw: a.w,
    fh: a.h,
    fr: a.r,
    tx: cx - bw / 2,
    ty: cy - bh / 2,
    tw: bw,
    th: bh,
    tr: b0.r,
  };
}

/* keel 落进枢纽卡 logo 槽位的落点：槽位在候场（scale s）里实测，按中心逆映射回终态 */
function measureKeelSlot(well) {
  if (!well) return null;
  const wr = well.getBoundingClientRect();
  if (!wr.width || !wr.height) return null;
  const el = well.querySelector("[data-s4-keel-slot]");
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (!r.width || !r.height) return null;
  const s = STANDBY_SCALE;
  const rawCx = ((r.left + r.width / 2 - wr.left) / wr.width) * 100;
  const rawCy = ((r.top + r.height / 2 - wr.top) / wr.height) * 100;
  /* 槽位终态中心（相对井中心 px）+ 缩放比，给 keel 直线落位用 */
  const cxPx = ((50 + (rawCx - 50) / s) / 100) * wr.width;
  const cyPx = ((50 + (rawCy - 50) / s) / 100) * wr.height;
  return {
    dx: +(cxPx - wr.width / 2).toFixed(1),
    dy: +(cyPx - wr.height / 2).toFixed(1),
    scale: +(r.width / s / 64).toFixed(3),
  };
}

/* squircle 裁切路径：keel 常驻 logo 与第一场共用同一形状 */
const LOGO_SQUIRCLE_D =
  "M0.6456,0.0034Q0.7912,0.0069 0.8351,0.0174Q0.8789,0.0280 0.9071,0.0463Q0.9353,0.0647 0.9537,0.0929Q0.9720,0.1211 0.9826,0.1649Q0.9931,0.2088 0.9966,0.3544Q1.0000,0.5000 0.9966,0.6456Q0.9931,0.7912 0.9826,0.8351Q0.9720,0.8789 0.9537,0.9071Q0.9353,0.9353 0.9071,0.9537Q0.8789,0.9720 0.8351,0.9826Q0.7912,0.9931 0.6456,0.9966Q0.5000,1.0000 0.3544,0.9966Q0.2088,0.9931 0.1649,0.9826Q0.1211,0.9720 0.0929,0.9537Q0.0647,0.9353 0.0463,0.9071Q0.0280,0.8789 0.0174,0.8351Q0.0069,0.7912 0.0034,0.6456Q0.0000,0.5000 0.0034,0.3544Q0.0069,0.2088 0.0174,0.1649Q0.0280,0.1211 0.0463,0.0929Q0.0647,0.0647 0.0929,0.0463Q0.1211,0.0280 0.1649,0.0174Q0.2088,0.0069 0.3544,0.0034Q0.5000,0.0000 0.6456,0.0034Z";

/* 文案卡序号位的四枚线性 icon（2026-08-31 Park：[01]-[04] 换 icon + hover SVG 动画）。
   全部 stroke 走 currentColor；带 pathLength="100" 的描边在 hover 时统一走 dash 绘制 */
function IcoRadar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" pathLength="100" className="d" style={{ "--d": "0s" }} />
      <circle cx="12" cy="12" r="5" pathLength="100" className="d" style={{ "--d": "0.08s" }} />
      <line className="sweep" x1="12" y1="12" x2="12" y2="3.5" />
      <circle className="core" cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IcoGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" pathLength="100" className="d" style={{ "--d": "0s" }} />
      <ellipse cx="12" cy="12" rx="4.2" ry="9" pathLength="100" className="d" style={{ "--d": "0.1s" }} />
      <line x1="3" y1="12" x2="21" y2="12" pathLength="100" className="d" style={{ "--d": "0.2s" }} />
    </svg>
  );
}

function IcoEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path
        d="M1.8 12C5.8 5.7 18.2 5.7 22.2 12C18.2 18.3 5.8 18.3 1.8 12Z"
        pathLength="100"
        className="d"
        style={{ "--d": "0s" }}
      />
      <circle cx="12" cy="12" r="4.1" pathLength="100" className="d" style={{ "--d": "0.1s" }} />
      <circle className="core" cx="12" cy="12" r="1.35" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IcoBars() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <line x1="3.5" y1="20.5" x2="20.5" y2="20.5" pathLength="100" className="d" style={{ "--d": "0s" }} />
      <rect className="bar b1" x="6" y="13" width="3.6" height="7.5" rx="1.2" />
      <rect className="bar b2" x="11.2" y="9" width="3.6" height="11.5" rx="1.2" />
      <rect className="bar b3" x="16.4" y="5" width="3.6" height="15.5" rx="1.2" />
    </svg>
  );
}

const COPY_ICONS = {
  "01": IcoRadar,
  "02": IcoGlobe,
  "03": IcoEye,
  "04": IcoBars,
};

function CopyCard({ card }) {
  const Ico = COPY_ICONS[card.idx];
  return (
    <article className="api-s4-copy-card">
      <span className="api-s4-ico" aria-hidden="true">{Ico ? <Ico /> : null}</span>
      <h3>{card.title}</h3>
      <p>{card.body}</p>
    </article>
  );
}

/** Section 4 — Turn Complex Tracking Data into Usable Intelligence */
export default function DataOperations() {
  const sectionRef = useRef(null);
  const wellRef = useRef(null);
  const seqRef = useRef(0);
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(null);
  const [bloom, setBloom] = useState(false);
  const [bridge, setBridge] = useState(null);
  const [started, setStarted] = useState(false);
  const [keel, setKeel] = useState("off");
  const [keelSlot, setKeelSlot] = useState(null);
  const idxRef = useRef(0);
  const inViewRef = useRef(false);

  const advance = () => {
    const from = idxRef.current;
    const n = (from + 1) % SCENES.length;
    seqRef.current += 1;
    setBloom(true);
    setBridge(
      measureBridge(
        wellRef.current,
        SCENES[from].well,
        SCENES[n].well,
        seqRef.current,
      ),
    );
    /* 进第二场时按枢纽卡 logo 槽位终态定 keel 落点，其余场清掉 */
    setKeelSlot(n === 1 ? measureKeelSlot(wellRef.current) : null);
    setPrev(from);
    idxRef.current = n;
    setIdx(n);
  };

  useEffect(() => {
    if (prev == null) return undefined;
    const settle = () => {
      setPrev(null);
      setBloom(false);
    };
    const t = window.setTimeout(settle, EXIT_MS);
    /* DHL 桥要飞 2.9s，不能跟着 1.3s 的退场一起拆 */
    const bt = bridge
      ? window.setTimeout(() => setBridge(null), bridge.ttl)
      : 0;
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(bt);
    };
  }, [prev, bridge]);

  /* 滑入视口才开始第一场编排；reduce 直接视为已开始（静态终态） */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      setStarted(true);
  }, []);

  /* keel logo：第一场即它；进第二场原地续住并落进枢纽卡槽位（落点见 keelSlot，
     settle 由 CSS 延迟过渡完成），之后 logo 就是卡的一部分，随场进出 */
  useEffect(() => {
    if (idx === 0) {
      setKeel(started ? "in" : "off");
      setKeelSlot(null);
      return undefined;
    }
    if (idx === 1) {
      setKeel("hold");
      return undefined;
    }
    setKeel("off");
    setKeelSlot(null);
    return undefined;
  }, [idx, started]);

  useEffect(() => {
    const section = sectionRef.current;
    const head = section?.querySelector(".api-s4-head");
    if (!section || !head) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wordEls = () => [...head.querySelectorAll(".api-s4-word")];

    const tintByScroll = () => {
      const words = wordEls();
      if (!words.length) return;
      if (reduce.matches) {
        words.forEach((w) => w.style.setProperty("--on", "1"));
        return;
      }
      const vh = window.innerHeight || 1;
      const top = head.getBoundingClientRect().top;
      const t = Math.max(0, Math.min(1, (vh * 0.9 - top) / (vh * 0.55)));
      const n = words.length;
      const step = 0.7 / Math.max(1, n);
      words.forEach((w, i) => {
        const local = Math.max(0, Math.min(1, (t - i * step) / (step * 1.4)));
        w.style.setProperty("--on", local.toFixed(3));
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current =
          entry.isIntersecting && entry.intersectionRatio > 0.28;
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: [0, 0.28, 0.5] },
    );
    io.observe(section);

    const onScroll = () => tintByScroll();
    tintByScroll();

    const lenis = window.__lenis;
    if (lenis?.on) lenis.on("scroll", onScroll);
    else window.addEventListener("scroll", onScroll, { passive: true });
    reduce.addEventListener?.("change", tintByScroll);

    return () => {
      io.disconnect();
      if (lenis?.off) lenis.off("scroll", onScroll);
      else window.removeEventListener("scroll", onScroll);
      reduce.removeEventListener?.("change", tintByScroll);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return undefined;

    let timer = 0;
    const arm = () => {
      window.clearTimeout(timer);
      if (!inViewRef.current) {
        timer = window.setTimeout(arm, 360);
        return;
      }
      timer = window.setTimeout(advance, SCENES[idxRef.current].dwell);
    };
    arm();
    return () => window.clearTimeout(timer);
  }, [idx]);

  return (
    <section
      className="api-s4"
      id="data-operations"
      aria-labelledby="api-data-title"
      ref={sectionRef}
    >
      <div className="api-wrap">
        <div className="api-s4-head">
          <h2 className="api-h2" id="api-data-title">
            {tintWords("Turn Complex Tracking Data")}
            <br />
            {tintWords("into Usable Intelligence", 4)}
            <span className="api-s4-h2-sub">
              {tintWords("Forecast, Monitor, Intervene.", 7)}
            </span>
          </h2>
          <a className="btn-switch" href="#free-trial" onClick={goToTrial}>
            <span className="btn-switch-knob" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle
                  cx="5"
                  cy="12"
                  r="1.4"
                  fill="currentColor"
                  opacity="0.35"
                />
                <circle
                  cx="8.2"
                  cy="12"
                  r="1.5"
                  fill="currentColor"
                  opacity="0.55"
                />
                <circle cx="11.5" cy="12" r="1.6" fill="currentColor" opacity="0.8" />
                <path
                  d="M13 7.5L18.5 12 13 16.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="btn-switch-label">Start Free</span>
          </a>
        </div>

        <div className="api-s4-board">
          <div className="api-s4-col">
            <CopyCard card={SCENES[0]} />
            <CopyCard card={SCENES[1]} />
          </div>

          <div className="api-s4-stage-card">
            <div
              className={`api-s4-well${bloom ? " is-bloom" : ""}${started ? " is-started" : ""}${
                bridge ? ` has-bridge--${bridge.kind}` : ""
              }`}
              ref={wellRef}
            >
              <span className="api-s4-bloom" aria-hidden="true" />
              {SCENES.map(({ Visual, well, title }, i) => {
                const on = i === idx;
                const exiting = i === prev;
                return (
                  <div
                    key={title}
                    className={[
                      "api-s4-stage",
                      "api-s4-illus",
                      well ? `api-s4-illus--${well}` : "",
                      on ? "is-on" : "",
                      exiting ? "is-exit" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-hidden={!on}
                  >
                    <Visual active={on} />
                  </div>
                );
              })}
              <div
                className={`api-s4-keel is-${keel}${keelSlot ? " is-settle" : ""}`}
                style={
                  keelSlot
                    ? {
                        "--sdx": `${keelSlot.dx}px`,
                        "--sdy": `${keelSlot.dy}px`,
                        "--ss": keelSlot.scale,
                      }
                    : undefined
                }
                aria-hidden="true"
              >
                <svg
                  className="api-s4-logo-defs"
                  width="0"
                  height="0"
                  aria-hidden="true"
                >
                  <clipPath
                    id="api-s4-logo-squircle"
                    clipPathUnits="objectBoundingBox"
                  >
                    <path d={LOGO_SQUIRCLE_D} />
                  </clipPath>
                </svg>
                <img src="/assets/logo-17-mark.png" alt="" />
              </div>
              {bridge ? (
                <span
                  key={bridge.id}
                  className={`api-s4-bridge api-s4-bridge--${bridge.kind}`}
                  aria-hidden="true"
                  style={{
                    "--fx": `${bridge.fx}%`,
                    "--fy": `${bridge.fy}%`,
                    "--fw": `${bridge.fw}%`,
                    "--fh": `${bridge.fh}%`,
                    "--fr": bridge.fr,
                    "--tx": `${bridge.tx}%`,
                    "--ty": `${bridge.ty}%`,
                    "--tw": `${bridge.tw}%`,
                    "--th": `${bridge.th}%`,
                    "--tr": bridge.tr,
                    "--bdur": bridge.dur,
                  }}
                >
                  {bridge.kind === "dhl" ? (
                    <img src="/assets/carriers/dhl.svg" alt="" />
                  ) : null}
                </span>
              ) : null}
            </div>
          </div>

          <div className="api-s4-col">
            <CopyCard card={SCENES[2]} />
            <CopyCard card={SCENES[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
