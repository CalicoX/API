import { createIntroFlowGl } from "./ai-intro-flow-gl.js";
import { shouldReduceFx } from "../utils.js";

/**
 * AI 段背景 — tracking 5175 Synthesis 1 同款蓝粉流（无 sticky / 滚出）。
 * ≤640 / reduce-motion：不挂，走 CSS fallback。
 */
export function mount() {
  const section = document.getElementById("ai-intelligence");
  const canvas = section?.querySelector(".api-ai-flow");
  const sizeEl = section?.querySelector(".api-ai-pin") || section;
  if (!section || !canvas) return () => {};

  if (shouldReduceFx()) {
    canvas.remove();
    return () => {};
  }

  let glApi = null;
  try {
    glApi = createIntroFlowGl(canvas, sizeEl);
  } catch {
    glApi = null;
  }
  if (!glApi) {
    canvas.remove();
    return () => {};
  }

  let raf = 0;
  let running = false;
  let visible = false;

  function loop(now) {
    if (!running) return;
    glApi.draw(now, 1);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  const io =
    typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              visible = e.isIntersecting;
              if (visible && !document.hidden) start();
              else stop();
            });
          },
          { threshold: 0.04, rootMargin: "80px" }
        );
  if (io) io.observe(section);
  else {
    visible = true;
    start();
  }

  function onVis() {
    if (document.hidden) stop();
    else if (visible) start();
  }
  document.addEventListener("visibilitychange", onVis);

  let ro = null;
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(() => {
      glApi.resize();
    });
    ro.observe(sizeEl);
  }

  return function dispose() {
    stop();
    if (io) io.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    if (ro) ro.disconnect();
    glApi.dispose();
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  };
}
