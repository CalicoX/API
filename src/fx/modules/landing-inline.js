import { bindCodeWindows } from "./code-window-anim.js";

/** Explore + features sticky */
export function mount() {
  const rafs = new Set();
  const intervals = new Set();
  const origRAF = window.requestAnimationFrame.bind(window);
  const origCAF = window.cancelAnimationFrame.bind(window);
  const origSI = window.setInterval.bind(window);
  const origCI = window.clearInterval.bind(window);
  window.requestAnimationFrame = (cb) => {
    let id;
    id = origRAF((t) => { rafs.delete(id); return cb(t); });
    rafs.add(id);
    return id;
  };
  window.cancelAnimationFrame = (id) => { rafs.delete(id); return origCAF(id); };
  window.setInterval = (cb, ms, ...a) => {
    const id = origSI(cb, ms, ...a);
    intervals.add(id);
    return id;
  };
  window.clearInterval = (id) => { intervals.delete(id); return origCI(id); };

  let disposeCodeWindows = () => {};

  try {
/* Extracted from tracking/index.html inline scripts */
/* Explore CTAs — colorful border beam (same engine as AI Lab / dock) */
    (function () {
      if (typeof window.mountBorderBeam !== "function") return;
      var links = document.querySelectorAll(".explore-link");
      if (!links.length) return;

      var io =
        typeof IntersectionObserver !== "undefined"
          ? new IntersectionObserver(
              function (entries) {
                entries.forEach(function (e) {
                  if (e.isIntersecting) {
                    e.target.setAttribute("data-active", "");
                    e.target.removeAttribute("data-paused");
                  } else {
                    e.target.setAttribute("data-paused", "");
                  }
                });
              },
              { threshold: 0.08 }
            )
          : null;

      Array.prototype.forEach.call(links, function (el, i) {
        if (el.getAttribute("data-beam")) return;
        var h = el.getBoundingClientRect().height || 42;
        var radius = Math.round(h / 2) || 22;
        window.mountBorderBeam(el, {
          id: "explore-cta-" + i,
          theme: "dark",
          colorVariant: "colorful",
          borderRadius: radius,
          borderWidth: 1,
          duration: 1.9 + i * 0.15,
          brightness: 1.55,
          saturation: 1.4,
          strength: 1.1,
          strokeOpacity: 0.58,
          innerOpacity: 0.52,
          bloomOpacity: 0.48,
          active: true,
        });
        if (io) io.observe(el);
      });
    })();

    /* API card — fill + animate faint ASCII matrix */
    (function () {
      var root = document.querySelector(".explore-card-api .api-ascii");
      if (!root) return;
      var reduce =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var glyphs = "+*#=-.|:";
      var rows = 36;
      var cols = 64;

      function make(seed) {
        var out = "";
        var s = seed | 0;
        for (var r = 0; r < rows; r++) {
          for (var c = 0; c < cols; c++) {
            s = (s * 1664525 + 1013904223) | 0;
            /* more empty → quieter field */
            if ((s >>> 0) % 100 < 48) out += " ";
            else out += glyphs[(Math.abs(s) + r * 17 + c * 31) % glyphs.length];
          }
          out += "\n";
        }
        return out;
      }

      function fillLayer(el, seed) {
        if (!el) return;
        /* double block for seamless -50% CSS loop */
        var block = make(seed);
        el.textContent = block + block;
      }

      var a = root.querySelector(".api-ascii-a");
      var b = root.querySelector(".api-ascii-b");
      /* fill only when card near viewport — frees DOM text when far */
      var filled = false;
      var bufs = [null, null];
      function ensureFilled() {
        if (filled) return;
        fillLayer(a, 42);
        fillLayer(b, 917);
        filled = true;
        bufs[0] = a ? a.textContent.split("") : null;
        bufs[1] = b ? b.textContent.split("") : null;
      }
      function releaseAscii() {
        if (!filled) return;
        if (a) a.textContent = "";
        if (b) b.textContent = "";
        bufs[0] = null;
        bufs[1] = null;
        filled = false;
      }

      if (reduce) {
        ensureFilled();
        return;
      }
      var layers = [a, b].filter(Boolean);
      var visible = false;
      var twinkleTimer = 0;
      function twinkle() {
        if (!visible || !filled) return;
        for (var i = 0; i < layers.length; i++) {
          var arr = bufs[i];
          if (!arr || arr.length < 40) continue;
          for (var n = 0; n < 4; n++) {
            var idx = (Math.random() * arr.length) | 0;
            if (arr[idx] === "\n") continue;
            if (Math.random() < 0.45) arr[idx] = " ";
            else arr[idx] = glyphs[(Math.random() * glyphs.length) | 0];
          }
          layers[i].textContent = arr.join("");
        }
      }
      var card = document.querySelector(".explore-card-api");
      if (card && typeof IntersectionObserver !== "undefined") {
        var ioA = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (e) {
              visible = e.isIntersecting;
              if (visible) {
                ensureFilled();
                if (!twinkleTimer) twinkleTimer = setInterval(twinkle, 220);
              } else {
                if (twinkleTimer) {
                  clearInterval(twinkleTimer);
                  twinkleTimer = 0;
                }
                releaseAscii();
              }
            });
          },
          { threshold: 0.05, rootMargin: "80px" }
        );
        ioA.observe(card);
      } else {
        ensureFilled();
        twinkleTimer = setInterval(twinkle, 220);
      }
    })();

    /* Explore cards — pointer spotlight only (Park: no 3D board tilt) */
    (function () {
      var cards = document.querySelectorAll(".explore-card");
      if (!cards.length) return;

      function setSpot(card, xPct, yPct, on) {
        card.style.setProperty("--spot-x", xPct.toFixed(2) + "%");
        card.style.setProperty("--spot-y", yPct.toFixed(2) + "%");
        card.style.setProperty("--spot-opacity", on ? "1" : "0");
      }

      Array.prototype.forEach.call(cards, function (card) {
        var raf = 0;
        var latest = null;

        function applyLatest() {
          raf = 0;
          if (!latest) return;
          var e = latest;
          latest = null;
          var r = card.getBoundingClientRect();
          var x = e.clientX - r.left;
          var y = e.clientY - r.top;
          var xPct = (x / Math.max(r.width, 1)) * 100;
          var yPct = (y / Math.max(r.height, 1)) * 100;
          setSpot(card, xPct, yPct, true);
        }

        card.addEventListener("pointerenter", function () {
          card.classList.remove("is-leaving");
          card.classList.add("is-tilting");
          card.style.setProperty("--spot-opacity", "1");
        });

        card.addEventListener("pointermove", function (e) {
          latest = e;
          if (!raf) raf = requestAnimationFrame(applyLatest);
        });

        card.addEventListener("pointerleave", function () {
          if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
          latest = null;
          card.classList.remove("is-tilting");
          card.classList.add("is-leaving");
          setSpot(card, 50, 35, false);
          window.setTimeout(function () {
            card.classList.remove("is-leaving");
          }, 560);
        });
      });
    })();

    
// stripped


    /*
     * Features sticky-frame:
     * 1) Module hits header → frame sticks (title + left + right viewport stay)
     * 2) Continue scroll → right stack translates; left switches; leaving panels blur
     * 3) Past last panel → sticky ends; whole module scrolls away
     */
    (function () {
      var section = document.getElementById("key-features");
      var track = document.getElementById("feature-scroll");
      var sticky = track ? track.querySelector(".feature-sticky") : null;
      var panelsRoot = document.getElementById("feature-panels");
      var panelsCol = panelsRoot ? panelsRoot.closest(".feature-panels-col") : null;
      var topbarEl = document.querySelector(".topbar");
      var buttons = document.querySelectorAll(".feature-list .feature[data-feature]");
      var panels = panelsRoot
        ? Array.prototype.slice.call(panelsRoot.querySelectorAll(".feature-panel[data-feature]"))
        : [];
      if (!section || !track || !sticky || !panelsRoot || !panels.length || !buttons.length) return;

      var n = panels.length;
      var current = -1;
      var clickAnimating = false;
      var clickUnlockTimer = 0;
      var mqMobile = window.matchMedia("(max-width: 1024px)");
      var panelGap = 28;
      var panelH = 0;
      var travelPx = 1;
      var lastP = -1;
      var rafTick = 0;

      section.style.setProperty("--feature-n", String(n));

      function measureTopbar() {
        if (!topbarEl) return 64;
        var th = Math.max(
          Math.ceil(topbarEl.getBoundingClientRect().height),
          Math.ceil(topbarEl.offsetHeight || 0),
          56
        );
        document.documentElement.style.setProperty("--topbar-h", th + "px");
        section.style.setProperty("--feature-pin-top", th + "px");
        return th;
      }

      function pinTop() {
        return (
          parseFloat(getComputedStyle(section).getPropertyValue("--feature-pin-top")) ||
          parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topbar-h")) ||
          64
        );
      }

      function pageScrollY() {
        if (window.__lenis && typeof window.__lenis.scroll === "number") {
          return window.__lenis.scroll;
        }
        return window.pageYOffset || document.documentElement.scrollTop || 0;
      }

      function measureLayout() {
        if (mqMobile.matches) {
          track.style.height = "";
          if (panelsCol) panelsCol.style.height = "";
          section.style.removeProperty("--feature-panel-h");
          panels.forEach(function (p) {
            p.style.height = "";
            p.style.removeProperty("--fp-blur");
            p.style.removeProperty("--fp-op");
          });
          panelsRoot.style.transform = "";
          travelPx = 1;
          return;
        }
        measureTopbar();
        var gap =
          parseFloat(getComputedStyle(section).getPropertyValue("--feature-panel-gap")) || 28;
        panelGap = gap;

        /*
         * Panel height from available sticky space under title — not stretched full.
         * Col is then fixed to panelH and vertically centered in feature-layout.
         */
        var stickyH = sticky.offsetHeight || Math.max(320, window.innerHeight - pinTop());
        var headEl = sticky.querySelector(".section-head");
        var headH = headEl ? headEl.getBoundingClientRect().height : 120;
        var padY = 48; /* sticky top+bottom padding approx */
        var avail = Math.max(360, stickyH - headH - padY);
        /* taller right stage */
        var cap = Math.min(660, Math.max(460, window.innerHeight - pinTop() - 100));
        panelH = Math.round(Math.min(avail, cap));

        panels.forEach(function (p) {
          p.style.height = panelH + "px";
        });
        if (panelsCol) {
          panelsCol.style.height = panelH + "px";
          section.style.setProperty("--feature-panel-h", panelH + "px");
        }

        /*
         * Travel = tiny start settle + (n-1) strides only.
         * No long end hold — last panel centers, then page keeps scrolling.
         */
        var stride = panelH + panelGap;
        var holdStart = Math.round(stride * 0.06); /* brief first-panel settle */
        travelPx = Math.max(1, Math.round(holdStart + (n - 1) * stride));
        track.style.height = stickyH + travelPx + "px";
      }

      function stridePx() {
        return panelH + panelGap;
      }

      function holdStartPx() {
        return Math.round(stridePx() * 0.06);
      }

      /** 0 = just pinned, 1 = last panel centered → sticky unsticks immediately after */
      function scrollProgress() {
        var pt = pinTop();
        var travel = Math.max(1, travelPx);
        var rect = track.getBoundingClientRect();
        var scrolled = Math.min(travel, Math.max(0, pt - rect.top));
        return scrolled / travel;
      }

      function setActive(idx) {
        if (idx < 0 || idx >= n) return;
        if (idx === current) return;
        current = idx;
        buttons.forEach(function (b) {
          var on = parseInt(b.getAttribute("data-feature"), 10) === idx;
          b.classList.toggle("active", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
        });
        panels.forEach(function (p, i) {
          p.classList.toggle("is-active", i === idx);
        });
      }

      /**
       * Map scroll progress → continuous index 0..n-1
       * brief start hold at 0; at p≈1 continuous = n-1 and sticky ends
       */
      function continuousFromProgress(p) {
        if (n <= 1) return 0;
        var stride = stridePx();
        var hold = holdStartPx();
        var y = Math.max(0, Math.min(1, p)) * travelPx;
        var y2 = Math.max(0, y - hold);
        var continuous = y2 / Math.max(1, stride);
        return Math.min(n - 1, Math.max(0, continuous));
      }

      function progressToIndex(p) {
        return Math.min(n - 1, Math.max(0, Math.round(continuousFromProgress(p))));
      }

      /** scroll progress that places panel idx fully in view */
      function indexToProgress(idx) {
        if (n <= 1) return 0;
        var stride = stridePx();
        var hold = holdStartPx();
        var i = Math.max(0, Math.min(n - 1, idx));
        var y = hold + i * stride;
        return Math.max(0, Math.min(1, y / Math.max(1, travelPx)));
      }

      function applyProgress(p) {
        if (mqMobile.matches) return;
        if (!panelH || panelH < 80) measureLayout();
        p = Math.max(0, Math.min(1, p));
        lastP = p;

        var continuous = continuousFromProgress(p);
        setActive(progressToIndex(p));

        var stride = panelH + panelGap;
        var y = -continuous * stride;
        panelsRoot.style.transform = "translate3d(0, " + y.toFixed(2) + "px, 0)";

        /*
         * Blur only when LEAVING the center band.
         * |offset| ≈ 0 (scrolled to middle of a panel) → sharpest.
         */
        panels.forEach(function (panel, i) {
          var offset = continuous - i;
          var leave = Math.abs(offset);
          var blurPx = 0;
          var op = 1;
          /* fully clear within ±0.28 of center; then ramp blur outward */
          if (leave > 0.28) {
            var t = Math.min(1, (leave - 0.28) / 0.72);
            var ease = t * t;
            blurPx = ease * 16;
            op = 1 - ease * 0.55;
          }
          panel.style.setProperty("--fp-blur", blurPx.toFixed(2) + "px");
          panel.style.setProperty("--fp-op", Math.max(0.35, op).toFixed(3));

          /* 1 when centered, 0 when far — float pieces scatter/converge */
          var c = Math.max(0, 1 - leave);
          c = c * c * (3 - 2 * c); /* smoothstep */
          var stage = panel.querySelector(".feature-stage");
          if (stage) {
            stage.style.setProperty("--fx-c", c.toFixed(3));
            if (stage.getAttribute("data-theme") === "lastmile") {
              var on = leave < 0.55;
              stage.classList.toggle("is-route-on", on);
              var routeSvg = stage.querySelector(".fx-route-map svg");
              if (routeSvg) {
                try {
                  if (on) routeSvg.unpauseAnimations();
                  else routeSvg.pauseAnimations();
                } catch (err) {}
              }
            }
          }
        });
      }

      function onScroll() {
        if (mqMobile.matches) {
          var line = window.innerHeight * 0.35;
          var best = 0;
          for (var i = 0; i < panels.length; i++) {
            if (panels[i].getBoundingClientRect().top <= line) best = i;
          }
          setActive(best);
          return;
        }
        /* always follow real scroll — including during click-driven scrollTo */
        applyProgress(scrollProgress());
      }

      /* rAF poll — reliable with Lenis (native scroll events may not fire) */
      function tick() {
        rafTick = requestAnimationFrame(tick);
        if (mqMobile.matches) return;
        var p = scrollProgress();
        if (Math.abs(p - lastP) > 0.0005) applyProgress(p);
      }

      function finishClickAnim() {
        clickAnimating = false;
        if (clickUnlockTimer) {
          clearTimeout(clickUnlockTimer);
          clickUnlockTimer = 0;
        }
        /* snap UI to true scroll position after animation */
        applyProgress(scrollProgress());
      }

      function scrollToFeature(idx) {
        if (idx < 0 || idx >= n) return;
        if (mqMobile.matches) {
          var panel = panels[idx];
          if (!panel) return;
          if (window.__lenis && typeof window.__lenis.scrollTo === "function") {
            window.__lenis.scrollTo(panel, {
              offset: -80,
              duration: 0.85,
            });
          } else {
            panel.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          return;
        }

        measureLayout();
        var pt = pinTop();
        var travel = Math.max(1, travelPx);
        var pageY = pageScrollY();
        var trackTop = track.getBoundingClientRect().top + pageY;
        var p = indexToProgress(idx);
        var target = trackTop - pt + p * travel;

        /*
         * Scroll-only navigation: do NOT applyProgress(p) here.
         * Panels / left nav follow scroll progress as the page animates.
         */
        clickAnimating = true;
        if (clickUnlockTimer) clearTimeout(clickUnlockTimer);
        /* safety unlock — Lenis onComplete can miss */
        clickUnlockTimer = setTimeout(finishClickAnim, 1200);

        if (window.__lenis && typeof window.__lenis.scrollTo === "function") {
          window.__lenis.scrollTo(target, {
            duration: 0.9,
            onComplete: finishClickAnim,
          });
        } else {
          window.scrollTo({ top: target, behavior: "smooth" });
          setTimeout(finishClickAnim, 950);
        }
      }

      buttons.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          var idx = parseInt(btn.getAttribute("data-feature"), 10);
          if (!isNaN(idx)) scrollToFeature(idx);
        });
      });

      function onResize() {
        measureLayout();
        onScroll();
      }

      if (window.__lenis && typeof window.__lenis.on === "function") {
        window.__lenis.on("scroll", onScroll);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });

      if (typeof ResizeObserver !== "undefined") {
        if (topbarEl) new ResizeObserver(onResize).observe(topbarEl);
        if (panelsCol) new ResizeObserver(onResize).observe(panelsCol);
        new ResizeObserver(onResize).observe(sticky);
      }

      measureLayout();
      setActive(0);
      applyProgress(0);
      requestAnimationFrame(function () {
        measureLayout();
        onScroll();
        if (!rafTick) rafTick = requestAnimationFrame(tick);
      });

      document.querySelectorAll("#product-tabs .tab").forEach(function (tab) {
        tab.addEventListener("click", function (e) {
          e.preventDefault();
          document.querySelectorAll("#product-tabs .tab").forEach(function (t) {
            t.classList.remove("active");
          });
          tab.classList.add("active");
        });
      });
    })();

    /* Brands marquee — pause only the hovered row */
    (function () {
      var rows = document.querySelectorAll(".brands-say .brands-marquee");
      if (!rows.length) return;
      Array.prototype.forEach.call(rows, function (row) {
        var track = row.querySelector(":scope > .brands-track") || row.querySelector(".brands-track");
        if (!track) return;
        row.addEventListener("pointerenter", function () {
          track.style.animationPlayState = "paused";
        });
        row.addEventListener("pointerleave", function () {
          track.style.animationPlayState = "running";
        });
      });
    })();

    /* Credentials — stagger cards in on scroll */
    (function () {
      var section = document.getElementById("credentials");
      if (!section) return;
      var cards = section.querySelectorAll(".cred-card");
      if (!cards.length) return;

      var reduce =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        section.classList.add("is-inview");
        return;
      }

      if (!("IntersectionObserver" in window)) {
        section.classList.add("is-inview");
        return;
      }

      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            section.classList.add("is-inview");
            io.disconnect();
          });
        },
        { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
      );
      io.observe(section);
    })();

    /* Code-window typewriter — shared with use-cases hub */
    disposeCodeWindows = bindCodeWindows(document) || (() => {});

  } catch (err) {
    console.warn("[fx:landing-inline]", err);
  }

  return function dispose() {
    try {
      disposeCodeWindows();
    } catch (e) {
      /* ignore */
    }
    rafs.forEach((id) => { try { origCAF(id); } catch (e) {} });
    rafs.clear();
    intervals.forEach((id) => { try { origCI(id); } catch (e) {} });
    intervals.clear();
    window.requestAnimationFrame = origRAF;
    window.cancelAnimationFrame = origCAF;
    window.setInterval = origSI;
    window.clearInterval = origCI;
  };
}
