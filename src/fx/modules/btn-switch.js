/**
 * Tracking 同款 .btn-switch：白钮滑行 + 内层 shader + colorful border beam。
 * tracking 里由 ai-lab.js 挂，但 API 页没有 #ai-lab，所以单独挂。
 * @returns {() => void}
 */
export function mount() {
  const cleanups = [];
  try {
    const btns = document.querySelectorAll(".btn-switch");
    if (!btns.length) return () => {};

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    btns.forEach((btn) => {
      const knob = btn.querySelector(".btn-switch-knob");
      if (!knob) return;

      const go = () => {
        if (reduce) return;
        knob.classList.remove("is-knob-back");
        void knob.offsetWidth;
        knob.classList.add("is-knob-go");
      };
      const back = () => {
        if (reduce) {
          knob.classList.remove("is-knob-go", "is-knob-back");
          return;
        }
        knob.classList.remove("is-knob-go");
        void knob.offsetWidth;
        knob.classList.add("is-knob-back");
      };

      btn.addEventListener("pointerenter", go);
      btn.addEventListener("pointerleave", back);
      btn.addEventListener("focus", go);
      btn.addEventListener("blur", back);
      cleanups.push(() => {
        btn.removeEventListener("pointerenter", go);
        btn.removeEventListener("pointerleave", back);
        btn.removeEventListener("focus", go);
        btn.removeEventListener("blur", back);
      });
    });

    if (typeof window.mountBorderBeam !== "function") return () => {};

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  e.target.setAttribute("data-active", "");
                  e.target.removeAttribute("data-paused");
                } else {
                  e.target.setAttribute("data-paused", "");
                }
              });
            },
            { threshold: 0.05 }
          )
        : null;

    btns.forEach((el, i) => {
      if (!el.querySelector(".btn-switch-shader")) {
        const sh = document.createElement("span");
        sh.className = "btn-switch-shader";
        sh.setAttribute("aria-hidden", "true");
        el.insertBefore(sh, el.firstChild);
      }

      if (el.getAttribute("data-beam")) return;

      const h = el.getBoundingClientRect().height || 44;
      const radius = Math.round(h / 2);

      window.mountBorderBeam(el, {
        id: "btn-switch-" + i,
        theme: "dark",
        colorVariant: "colorful",
        borderRadius: radius,
        borderWidth: 1,
        duration: 2.05 + i * 0.12,
        brightness: 1.5,
        saturation: 1.35,
        strength: 1,
        strokeOpacity: 0.52,
        innerOpacity: 0.55,
        bloomOpacity: 0.42,
        active: true,
      });

      if (io) io.observe(el);
    });

    if (io) cleanups.push(() => io.disconnect());
  } catch (err) {
    console.warn("[fx:btn-switch.js]", err);
  }

  return function dispose() {
    while (cleanups.length) {
      const fn = cleanups.pop();
      try {
        if (typeof fn === "function") fn();
      } catch {
        /* ignore */
      }
    }
  };
}
