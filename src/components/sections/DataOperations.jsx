import { useEffect, useRef } from "react";
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

function pinTop() {
  const n = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--topbar-h")
  );
  return Number.isFinite(n) && n > 0 ? n : 64;
}

const CARDS = [
  {
    Visual: DataStatusStage,
    title: "Tracking data that counts",
    body: "The combination of 9 main + 27 sub package status makes it a no-brainer to understand the shipping progress, and the cause of delivery exceptions.",
  },
  {
    Visual: DataCarriersStage,
    title: "The world's carriers covered",
    body: "17TRACK now includes 3400+ mainstream carriers worldwide, with ever-increasing new ones every week. Contact us anytime and request an unsupported carrier.",
  },
  {
    Visual: DataHubStage,
    title: "Logistics visibility automated",
    body: "The system auto-identifies over 80% of the carriers with the tracking number. All trackings are synced from the carrier on a regular basis, non-stop until fulfilled.",
  },
  {
    Visual: DataChartStage,
    title: "Dashboard report done right",
    body: "All data you care about, in one dashboard. Package status distribution, carrier time performance, tracking function status, webhook push alert, and more.",
  },
];

/** Section 4 — Data Operation Granularized */
export default function DataOperations() {
  const goRef = useRef((dir) => {});

  useEffect(() => {
    const section = document.getElementById("data-operations");
    const track = section?.querySelector(".api-s4-track");
    const sticky = section?.querySelector(".api-s4-sticky");
    const viewport = section?.querySelector(".api-s4-viewport");
    const rail = section?.querySelector(".api-s4-rail");
    const prevBtn = section?.querySelector("[data-s4-dir='-1']");
    const nextBtn = section?.querySelector("[data-s4-dir='1']");
    const head = section?.querySelector(".api-s4-head");
    if (!section || !track || !sticky || !viewport || !rail) return undefined;

    const mq = window.matchMedia("(max-width: 900px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wordEls = () => [...(head?.querySelectorAll(".api-s4-word") || [])];

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
    const cards = () => [...rail.querySelectorAll(".api-s4-card")];
    let idx = 0;
    let lock = 0;

    const maxShift = () => Math.max(0, rail.scrollWidth - viewport.clientWidth);

    const syncRail = (i, animate) => {
      const list = cards();
      const n = Math.max(1, list.length);
      idx = Math.max(0, Math.min(n - 1, i));
      const t = n <= 1 ? 0 : idx / (n - 1);
      if (animate) {
        rail.classList.add("is-nav");
        window.clearTimeout(lock);
        lock = window.setTimeout(() => rail.classList.remove("is-nav"), 480);
      }
      rail.style.setProperty("--s4-x", `${-(maxShift() * t).toFixed(2)}px`);
      section.style.setProperty("--s4-p", t.toFixed(4));
      list.forEach((c, k) => c.classList.toggle("is-on", k === idx));
      if (prevBtn) prevBtn.disabled = idx <= 0;
      if (nextBtn) nextBtn.disabled = idx >= n - 1;
    };

    const scrollYNow = () =>
      typeof window.__lenis?.scroll === "number" ? window.__lenis.scroll : window.scrollY;

    const goTo = (i, animate = true) => {
      const n = Math.max(1, cards().length);
      const next = Math.max(0, Math.min(n - 1, i));
      syncRail(next, animate);
      if (mq.matches || reduce.matches) return;

      const top = pinTop();
      const stickyH = sticky.offsetHeight || window.innerHeight - top;
      const travel = Math.max(1, track.offsetHeight - stickyH);
      const t = n <= 1 ? 0 : next / (n - 1);
      const y = scrollYNow() + track.getBoundingClientRect().top - top + t * travel;
      if (window.__lenis?.scrollTo) {
        window.__lenis.scrollTo(y, { duration: 0.75, programmatic: true, force: true });
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    goRef.current = (dir) => goTo(idx + dir, true);

    const layout = () => {
      if (mq.matches || reduce.matches) {
        track.style.height = "";
        sticky.style.top = "";
        sticky.style.height = "";
        section.style.setProperty("--s4-p", "0");
        rail.style.setProperty("--s4-x", "0px");
        return;
      }
      const top = pinTop();
      const stickyH = Math.max(420, window.innerHeight - top);
      const slides = Math.max(1, cards().length - 1);
      sticky.style.top = `${top}px`;
      sticky.style.height = `${stickyH}px`;
      track.style.height = `${stickyH + stickyH * 0.9 * slides}px`;
    };

    const apply = () => {
      tintByScroll();
      if (mq.matches || reduce.matches) return;
      if (rail.classList.contains("is-nav")) return;
      const top = pinTop();
      const stickyH = sticky.offsetHeight || window.innerHeight - top;
      const travel = Math.max(1, track.offsetHeight - stickyH);
      const p = Math.max(0, Math.min(1, (top - track.getBoundingClientRect().top) / travel));
      const n = Math.max(1, cards().length);
      rail.style.setProperty("--s4-x", `${-(maxShift() * p).toFixed(2)}px`);
      section.style.setProperty("--s4-p", p.toFixed(4));
      idx = Math.round(p * (n - 1));
      cards().forEach((c, k) => c.classList.toggle("is-on", k === idx));
      if (prevBtn) prevBtn.disabled = idx <= 0;
      if (nextBtn) nextBtn.disabled = idx >= n - 1;
    };

    const onChange = () => {
      layout();
      apply();
    };

    layout();
    apply();

    const lenis = window.__lenis;
    if (lenis?.on) lenis.on("scroll", apply);
    else window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", onChange);
    mq.addEventListener?.("change", onChange);
    reduce.addEventListener?.("change", onChange);

    return () => {
      window.clearTimeout(lock);
      goRef.current = () => {};
      if (lenis?.off) lenis.off("scroll", apply);
      else window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", onChange);
      mq.removeEventListener?.("change", onChange);
      reduce.removeEventListener?.("change", onChange);
    };
  }, []);

  return (
    <section className="api-s4" id="data-operations" aria-labelledby="api-data-title">
      <div className="api-s4-track">
        <div className="api-s4-sticky">
          <div className="api-s4-progress" aria-hidden="true">
            <i />
          </div>
          <div className="api-wrap">
            <div className="api-s4-head">
              <h2 className="api-h2" id="api-data-title">
                {tintWords("Data Operation Granularized")}
                <span className="api-s4-h2-sub">{tintWords("Forecast, Monitor, Intervene.", 3)}</span>
              </h2>
              <div className="api-s4-nav" role="group" aria-label="Data operation cards">
                <button
                  type="button"
                  className="api-s4-nav-btn"
                  data-s4-dir="-1"
                  aria-label="Previous card"
                  onClick={() => goRef.current(-1)}
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 3.5 5.5 8 10 12.5"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="api-s4-nav-btn"
                  data-s4-dir="1"
                  aria-label="Next card"
                  onClick={() => goRef.current(1)}
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 3.5 10.5 8 6 12.5"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="api-s4-viewport">
              <div className="api-s4-rail">
                {CARDS.map(({ Visual, title, body }) => (
                  <article className="api-s4-card" key={title}>
                    <div className="api-s4-card-body">
                      <div className="api-s4-illus">
                        <Visual />
                      </div>
                      <div className="api-s4-copy">
                        <h3>{title}</h3>
                        <p>{body}</p>
                        <a className="api-s4-cta" href="#contact">
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
