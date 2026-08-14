/**
 * Sticky Use Cases — scroll progress for webgl-demo explode (matches ~2–3 screens of travel).
 * Bottom tick bar + % readout driven by scroll.
 */
export function mount() {
  const section = document.getElementById("use-cases");
  const track = document.getElementById("use-cases-scroll");
  const sticky = section?.querySelector(".api-s2-sticky");
  const grid = section?.querySelector(".api-s2-grid");
  if (!section || !track || !sticky) return () => {};

  const reduce =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ||
    window.__reduceFx;

  let raf = 0;

  function pinTop() {
    const v = getComputedStyle(document.documentElement).getPropertyValue("--topbar-h");
    const n = parseFloat(v);
    return Number.isFinite(n) && n > 0 ? n : 64;
  }

  function layout() {
    const vh = window.innerHeight;
    const top = pinTop();
    const stickyH = Math.max(360, vh - top);
    sticky.style.top = `${top}px`;
    sticky.style.height = `${stickyH}px`;
    const travel = reduce ? stickyH * 0.2 : stickyH * 1.2;
    track.style.height = `${stickyH + travel}px`;
    updateGlobeMask();
  }

  function progress() {
    const tr = track.getBoundingClientRect();
    const top = pinTop();
    const stickyH = sticky.offsetHeight || window.innerHeight - top;
    const travel = Math.max(1, track.offsetHeight - stickyH);
    const scrolled = top - tr.top;
    return Math.max(0, Math.min(1, scrolled / travel));
  }

  // Build tick marks (30 ticks, major every 5)
  function buildTicks() {
    const host = section.querySelector("#api-uc-ticks");
    if (!host) return;
    host.innerHTML = "";
    for (let i = 0; i <= 30; i++) {
      const t = document.createElement("i");
      t.className = i % 5 === 0 ? "is-major" : "";
      host.appendChild(t);
    }
  }

  // Grid light must pass BEHIND the bg-shader globe. Center stays on the
  // right edge; Y follows --uc-globe-y-t (0 = top, 1 = bottom of canvas).
  function updateGlobeMask() {
    if (!grid || !section.classList.contains("has-uc-bg-shader")) return;
    const cv = section.querySelector(".api-s2-bg-shader");
    if (!cv) return;
    const cvr = cv.getBoundingClientRect();
    const gr = grid.getBoundingClientRect();
    const t = parseFloat(section.style.getPropertyValue("--uc-globe-y-t"));
    const yT = Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
    section.style.setProperty("--uc-globe-x", `${(cvr.left + cvr.width - gr.left).toFixed(1)}px`);
    section.style.setProperty("--uc-globe-y", `${(cvr.top - gr.top + yT * cvr.height).toFixed(1)}px`);
    section.style.setProperty("--uc-globe-r", `${(0.72 * Math.min(cvr.width, cvr.height)).toFixed(1)}px`);
  }

  function apply(p) {
    section.style.setProperty("--uc-p", p.toFixed(4));
    const gridIn = reduce ? 1 : Math.max(0, Math.min(1, (p - 0.03) / 0.2));
    section.style.setProperty("--uc-grid", gridIn.toFixed(3));
    updateGlobeMask();
    section.dataset.ucStep = String(Math.min(3, Math.floor(p * 3.001)));
    section.classList.toggle("is-uc-active", p > 0.02 && p < 0.98);

    const api = window.__isoHubWebGL;
    if (api && typeof api.setProgress === "function") {
      api.setProgress(p);
    }

    // thin top progress fill
    const fill =
      section.querySelector("#api-uc-progress-fill") ||
      section.querySelector("[data-uc-progress]");
    if (fill) fill.style.width = `${(p * 100).toFixed(1)}%`;

    // bottom tick bar
    const tickPct = section.querySelector("#api-uc-tick-pct");
    if (tickPct) tickPct.textContent = `${Math.round(p * 100)}%`;

    // highlight ticks: current is tallest, smooth ramp to neighbors
    const ticks = section.querySelectorAll("#api-uc-ticks i");
    const activeCount = Math.round(p * (ticks.length - 1));
    ticks.forEach((el, i) => {
      const isActive = i <= activeCount;
      const isCurrent = i === activeCount;
      const dist = Math.abs(i - activeCount);

      el.classList.toggle("is-active", isActive);
      el.classList.toggle("is-current", isCurrent);
      el.classList.toggle("is-near-1", !isCurrent && dist === 1);
      el.classList.toggle("is-near-2", !isCurrent && dist === 2);
    });

    const copy = section.querySelector('[data-uc="copy"]');
    if (copy) copy.classList.add("is-in");

    section.querySelectorAll("[data-uc-line]").forEach((el) => {
      el.classList.add("is-in");
    });
  }

  function tick() {
    raf = 0;
    apply(reduce ? 1 : progress());
  }

  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(tick);
  }

  buildTicks();
  layout();
  apply(reduce ? 1 : 0.05);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", layout, { passive: true });
  if (window.__lenis?.on) {
    try {
      window.__lenis.on("scroll", onScroll);
    } catch {
      /* ignore */
    }
  }
  requestAnimationFrame(tick);

  return function dispose() {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", layout);
    if (raf) cancelAnimationFrame(raf);
    section.classList.remove("is-uc-active");
    delete section.dataset.ucStep;
  };
}
