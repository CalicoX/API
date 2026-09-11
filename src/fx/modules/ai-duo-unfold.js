import { shouldReduceFx } from "../utils.js";

/**
 * AI 整段 Duo 式展开：滚入时从中间拉开 + 渐进模糊。
 * --ai-duo 0 合上 / 1 打开；--ai-frost 糊层透明度（略滞后于拉伸）。
 * ≤640 / reduce-motion 定格打开。
 */
export function mount() {
  const section = document.getElementById("ai-intelligence");
  if (!section) return () => {};

  if (shouldReduceFx()) {
    section.style.setProperty("--ai-duo", "1");
    section.style.setProperty("--ai-frost", "0");
    return () => {};
  }

  let raf = 0;
  let current = 1;
  let running = false;

  function target() {
    const r = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const t = (vh - r.top) / vh;
    const p = Math.max(0, Math.min(1, t));
    return p * p * (3 - 2 * p);
  }

  function write(p) {
    const frost = Math.max(0, Math.min(1, 1 - Math.max(0, (p - 0.08) / 0.86)));
    section.style.setProperty("--ai-duo", p.toFixed(4));
    section.style.setProperty("--ai-frost", frost.toFixed(4));
    section.classList.toggle("is-duo-settled", p > 0.985);
  }

  function tick() {
    raf = 0;
    const next = target();
    current += (next - current) * 0.55;
    if (Math.abs(next - current) < 0.002) current = next;
    write(current);
    if (Math.abs(next - current) > 0.002) {
      raf = requestAnimationFrame(tick);
    } else {
      running = false;
    }
  }

  function schedule() {
    if (raf) return;
    running = true;
    raf = requestAnimationFrame(tick);
  }

  write(target());
  current = target();

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });

  let lenisOff = null;
  const bindLenis = () => {
    if (window.__lenis && typeof window.__lenis.on === "function") {
      window.__lenis.on("scroll", schedule);
      lenisOff = () => {
        try {
          window.__lenis?.off?.("scroll", schedule);
        } catch {
          /* older lenis */
        }
      };
    }
  };
  bindLenis();
  const lenisRetry = setTimeout(bindLenis, 0);

  return function dispose() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    clearTimeout(lenisRetry);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (typeof lenisOff === "function") lenisOff();
  };
}
