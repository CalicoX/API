/**
 * API hero background — 1:1 Glass Agency Hero from shaders.com
 * (https://previews.shaders.com/sections/glass-agency-hero)
 *
 * Layer stack (preview siblings, nested here because FlutedGlass/FilmGrain require a child):
 *   FilmGrain(FlutedGlass(Swirl + ChromaFlow))
 *
 * @returns {() => void}
 */
const GLASS_AGENCY_HERO = {
  components: [
    {
      type: "FilmGrain",
      props: { strength: 0.05 },
      children: [
        {
          type: "FlutedGlass",
          props: {
            aberration: 0.61,
            angle: 31,
            frequency: 8,
            highlight: 0.12,
            highlightSoftness: 0,
            lightAngle: -90,
            refraction: 4,
            shape: "rounded",
            softness: 1,
            speed: 0.15,
          },
          children: [
            {
              type: "Swirl",
              props: {
                colorA: "#ffffff",
                colorB: "#f0f0f0",
                detail: 1.7,
              },
            },
            {
              type: "ChromaFlow",
              props: {
                baseColor: "#ffffff",
                downColor: "#8b89ff",
                leftColor: "#8ed8fd",
                momentum: 13,
                radius: 3.5,
                rightColor: "#9a94ff",
                upColor: "#b3a4ff",
                intensity: 0.85,
              },
            },
          ],
        },
      ],
    },
  ],
};

export function mount() {
  let cancelled = false;
  let shader = null;
  let canvas = null;

  try {
    const section = document.querySelector(".api-s1.hero");
    if (!section) return () => {};
    if (
      window.__reduceFx ||
      window.__isMobileLayout ||
      (window.matchMedia && window.matchMedia("(max-width: 768px)").matches)
    ) {
      return () => {};
    }

    canvas = section.querySelector(".api-s1-shader");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.className = "api-s1-shader";
      canvas.setAttribute("aria-hidden", "true");
      section.insertBefore(canvas, section.firstChild);
    }
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";

    (async () => {
      try {
        const { createShader, isWebGPUSupported } = await import("shaders/js");
        if (cancelled) return;
        if (!isWebGPUSupported()) {
          if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
          canvas = null;
          return;
        }
        shader = await createShader(canvas, GLASS_AGENCY_HERO, {
          disableTelemetry: true,
          onError: (reason) => {
            console.warn("[hero-wash]", reason);
          },
        });
        if (cancelled) {
          shader.destroy();
          shader = null;
        }
      } catch (err) {
        console.warn("[fx:hero-wash-shader.js]", err);
        if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
        canvas = null;
      }
    })();
  } catch (err) {
    console.warn("[fx:hero-wash-shader.js]", err);
  }

  return function dispose() {
    cancelled = true;
    if (shader) {
      try {
        shader.destroy();
      } catch (e) {
        /* ignore */
      }
      shader = null;
    }
    if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
    canvas = null;
  };
}
