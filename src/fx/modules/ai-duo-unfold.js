import { shouldReduceFx } from "../utils.js";

/**
 * AI 段边滚边立。糊按 kennethnym 的分段 backdrop-filter + mask。
 */
export function mount() {
  const section = document.getElementById("ai-intelligence");
  const shell = section?.querySelector(".api-ai-shell");
  if (!section || !shell) return () => {};

  if (shouldReduceFx()) {
    section.style.setProperty("--ai-duo", "1");
    section.classList.add("is-duo-settled");
    return () => {};
  }

  let raf = 0;
  let looping = false;

  function target() {
    const vh = window.innerHeight || 1;
    const top = section.getBoundingClientRect().top;
    const travel = Math.max(section.offsetHeight - vh, vh);
    // 第一像素进视口就开始立；钉住时还没立直
    const atPin = 0.36;
    if (top >= vh) return 0;
    if (top > 0) {
      const raw = (vh - top) / vh;
      const u = raw * (2 - raw);
      return atPin * u;
    }
    const u = Math.max(0, Math.min(1, -top / (travel * 0.92)));
    return atPin + (1 - atPin) * u;
  }

  function write(p) {
    const k = 1 - p;
    section.style.setProperty("--ai-duo", p.toFixed(4));
    section.classList.toggle("is-duo-settled", p > 0.985);

    if (p > 0.985) {
      shell.style.transform = "";
      return;
    }

    const pitch = k * 54;
    const pullY = 1 + k * 0.48;
    const pullX = 1 + k * 0.05;
    shell.style.transform =
      `rotateX(${(-pitch).toFixed(2)}deg) scale3d(${pullX.toFixed(3)}, ${pullY.toFixed(3)}, 1)`;
  }

  function tick() {
    write(target());
    if (looping) raf = requestAnimationFrame(tick);
    else raf = 0;
  }

  function start() {
    if (looping) return;
    looping = true;
    raf = requestAnimationFrame(tick);
  }

  function stop() {
    looping = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  write(target());
  start();

  window.addEventListener("scroll", start, { passive: true });
  window.addEventListener("resize", start, { passive: true });
  let lenisOff = null;
  if (window.__lenis?.on) {
    window.__lenis.on("scroll", start);
    lenisOff = () => window.__lenis?.off?.("scroll", start);
  }

  const io =
    typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) start();
            else stop();
          },
          { threshold: 0, rootMargin: "120px" }
        );
  if (io) io.observe(section);

  return function dispose() {
    stop();
    window.removeEventListener("scroll", start);
    window.removeEventListener("resize", start);
    if (typeof lenisOff === "function") lenisOff();
    if (io) io.disconnect();
    shell.style.transform = "";
  };
}
