/**
 * Use Cases full-module background — dotted particle earth (Fibonacci sphere).
 * Dark gray ground + sparse light specks. Globe spins and travels with scroll.
 * Engine lives in ../lib/particle-earth.js (aLand / uSpin / progPt).
 *
 * @returns {() => void}
 */
import { mountUseCasesEarth } from "../lib/particle-earth.js";

export function mount() {
  let teardown = null;
  try {
    const section = document.getElementById("use-cases");
    if (!section) return () => {};

    if (
      window.__reduceFx ||
      window.__isMobileLayout ||
      (window.matchMedia && window.matchMedia("(max-width: 768px)").matches)
    ) {
      return () => {};
    }

    let canvas = section.querySelector(".api-s2-bg-shader");
    const sticky = section.querySelector(".api-s2-sticky");
    const host = sticky || section;
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.className = "api-s2-bg-shader";
      canvas.setAttribute("aria-hidden", "true");
      host.insertBefore(canvas, host.firstChild);
    } else if (sticky && canvas.parentElement !== sticky) {
      sticky.insertBefore(canvas, sticky.firstChild);
    }

    teardown = mountUseCasesEarth({ section, host, canvas });
  } catch (err) {
    console.warn("[fx:use-cases-bg-shader.js]", err);
    teardown = () => {};
  }
  return teardown || (() => {});
}
