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
    title: "Tracking data that counts",
    body: "The combination of 9 main + 27 sub package status makes it a no-brainer to understand the shipping progress, and the cause of delivery exceptions.",
    dwell: 5200,
  },
  {
    Visual: DataCarriersStage,
    well: "carriers",
    idx: "02",
    title: "The world's carriers covered",
    body: "17TRACK now includes 3400+ mainstream carriers worldwide, with ever-increasing new ones every week. Contact us anytime and request an unsupported carrier.",
    dwell: 5800,
  },
  {
    Visual: DataHubStage,
    well: "auto",
    idx: "03",
    title: "Logistics visibility automated",
    body: "The system auto-identifies over 80% of the carriers with the tracking number. All trackings are synced from the carrier on a regular basis, non-stop until fulfilled.",
    dwell: 6200,
  },
  {
    Visual: DataChartStage,
    well: "dash",
    idx: "04",
    title: "Dashboard report done right",
    body: "All data you care about, in one dashboard. Package status distribution, carrier time performance, tracking function status, webhook push alert, and more.",
    dwell: 6400,
  },
];

const EXIT_MS = 980;

function CopyCard({ card }) {
  return (
    <article className="api-s4-copy-card">
      <span className="api-s4-idx">[{card.idx}]</span>
      <h3>{card.title}</h3>
      <p>{card.body}</p>
    </article>
  );
}

/** Section 4 — Data Operation Granularized */
export default function DataOperations() {
  const sectionRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(null);
  const [bloom, setBloom] = useState(false);
  const idxRef = useRef(0);
  const inViewRef = useRef(false);

  const advance = () => {
    const from = idxRef.current;
    const n = (from + 1) % SCENES.length;
    setBloom(from === 0);
    setPrev(from);
    idxRef.current = n;
    setIdx(n);
  };

  useEffect(() => {
    if (prev == null) return undefined;
    const t = window.setTimeout(() => {
      setPrev(null);
      setBloom(false);
    }, EXIT_MS);
    return () => window.clearTimeout(t);
  }, [prev]);

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
        inViewRef.current = entry.isIntersecting && entry.intersectionRatio > 0.28;
      },
      { threshold: [0, 0.28, 0.5] }
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
            {tintWords("Data Operation Granularized")}
            <span className="api-s4-h2-sub">{tintWords("Forecast, Monitor, Intervene.", 3)}</span>
          </h2>
          <a className="api-s4-pill" href="#free-trial" onClick={goToTrial}>
            <span className="api-s4-pill-knob" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="4.2" cy="12" r="1.55" fill="currentColor" opacity="0.42" />
                <circle cx="8" cy="12" r="1.65" fill="currentColor" opacity="0.68" />
                <circle cx="11.8" cy="12" r="1.75" fill="currentColor" />
                <path
                  d="M14.2 8.1L19.4 12 14.2 15.9"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="api-s4-pill-label">Start My Free Trial</span>
          </a>
        </div>

        <div className="api-s4-board">
          <div className="api-s4-col">
            <CopyCard card={SCENES[0]} />
            <CopyCard card={SCENES[1]} />
          </div>

          <div className="api-s4-stage-card">
            <div className={`api-s4-well${bloom ? " is-bloom" : ""}`}>
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
