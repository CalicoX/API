/**
 * Topbar: raise opacity when content under the nav is dark.
 * Standalone (does not require #ai-lab) — used on API landing and any product page.
 */
export function mount() {
  const bar = document.querySelector(".topbar");
  if (!bar) return () => {};

  const DARK_SEL =
    "#ai-lab-intro, #ai-intelligence, #coverage, #bottom-cta, #use-cases, .api-s2, .api-s6, .api-ai, .coverage-band, .bottom-cta, .site-footer, .ai-lab-intro, .ai-intro-bg";

  function isDarkUnderNav() {
    const br = bar.getBoundingClientRect();
    const x = Math.min(window.innerWidth - 2, Math.max(1, window.innerWidth * 0.5));
    const y = Math.min(window.innerHeight - 2, Math.max(1, br.bottom + 2));
    const prev = bar.style.visibility;
    bar.style.visibility = "hidden";
    const el = document.elementFromPoint(x, y);
    bar.style.visibility = prev || "";

    let node = el;
    let hops = 0;
    while (node && node !== document.documentElement && hops < 14) {
      if (node.nodeType === 1) {
        if (
          node.id === "ai-lab-intro" ||
          node.id === "ai-intelligence" ||
          node.id === "coverage" ||
          node.id === "bottom-cta" ||
          (node.classList &&
            (node.classList.contains("ai-lab-intro") ||
              node.classList.contains("ai-intro-bg") ||
              node.classList.contains("api-ai") ||
              node.classList.contains("coverage-band") ||
              node.classList.contains("bottom-cta") ||
              node.classList.contains("api-s2") ||
              node.classList.contains("api-s6") ||
              node.classList.contains("site-footer") ||
              (node.classList.contains("case-art") && node.classList.contains("dark"))))
        ) {
          return true;
        }
        if (node.closest && node.closest(DARK_SEL)) {
          return true;
        }
        const cs = window.getComputedStyle(node);
        const bg = cs.backgroundColor || "";
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
        if (m) {
          const R = +m[1];
          const G = +m[2];
          const B = +m[3];
          let a = 1;
          const am = bg.match(/,\s*([0-9.]+)\s*\)/);
          if (am) a = parseFloat(am[1]);
          if (a > 0.2) {
            const L = (0.2126 * R + 0.7152 * G + 0.0722 * B) / 255;
            return L < 0.42;
          }
        }
      }
      node = node.parentElement;
      hops++;
    }
    return false;
  }

  let topbarRaf = 0;
  function update() {
    if (topbarRaf) return;
    topbarRaf = requestAnimationFrame(() => {
      topbarRaf = 0;
      bar.classList.toggle("topbar-on-dark", isDarkUnderNav());
    });
  }

  // sync --topbar-h (also done in ai-lab; safe to duplicate)
  function syncTopbarH() {
    const h = Math.round(bar.getBoundingClientRect().height);
    if (h > 0) {
      document.documentElement.style.setProperty("--topbar-h", `${h}px`);
    }
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  window.addEventListener("resize", syncTopbarH, { passive: true });

  const prevTopbarScroll = window.__updateAiScroll;
  window.__updateAiScroll = function () {
    if (typeof prevTopbarScroll === "function") prevTopbarScroll();
    update();
  };

  let lenisOff = null;
  function bindLenis() {
    if (window.__lenis && typeof window.__lenis.on === "function") {
      try {
        window.__lenis.on("scroll", update);
        lenisOff = () => {
          try {
            if (window.__lenis && typeof window.__lenis.off === "function") {
              window.__lenis.off("scroll", update);
            }
          } catch {
            /* ignore */
          }
        };
      } catch {
        /* ignore */
      }
    }
  }
  bindLenis();
  const lenisRetry = setTimeout(bindLenis, 0);

  syncTopbarH();
  requestAnimationFrame(update);

  return function dispose() {
    clearTimeout(lenisRetry);
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
    window.removeEventListener("resize", syncTopbarH);
    if (typeof lenisOff === "function") lenisOff();
    if (topbarRaf) {
      cancelAnimationFrame(topbarRaf);
      topbarRaf = 0;
    }
    bar.classList.remove("topbar-on-dark");
    if (window.__updateAiScroll) {
      // leave chain intact if others hooked after us; best-effort restore
      if (window.__updateAiScroll.toString().includes("prevTopbarScroll") === false) {
        /* keep current chain */
      }
    }
  };
}
