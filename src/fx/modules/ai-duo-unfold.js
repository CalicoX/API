import { shouldReduceFx } from "../utils.js";

/**
 * AI 段边滚边立：露头就开始 rotateX 回正，到位时立直。
 * 渐进糊是 pin 上的四条横带（backdrop-filter），不挂在 3D 壳里。
 */
export function mount() {
  const section = document.getElementById("ai-intelligence");
  const shell = section?.querySelector(".api-ai-shell");
  const frost = section?.querySelector(".api-ai-frost");
  const bands = frost ? [...frost.querySelectorAll("i")] : [];
  if (!section || !shell) return () => {};

  if (shouldReduceFx()) {
    clear();
    section.style.setProperty("--ai-duo", "1");
    section.classList.add("is-duo-settled");
    return () => {};
  }

  let raf = 0;
  let looping = false;

  function target() {
    const vh = window.innerHeight || 1;
    const top = section.getBoundingClientRect().top;
    return Math.max(0, Math.min(1, (vh - top) / vh));
  }

  function clear() {
    shell.style.transform = "";
    shell.style.filter = "";
    if (frost) frost.style.opacity = "";
    bands.forEach((el) => {
      el.style.removeProperty("--ai-b");
    });
  }

  function write(p) {
    const k = 1 - p;
    const pitch = k * 56;
    const pullY = 1 + k * 0.5;
    const pullX = 1 + k * 0.06;

    section.style.setProperty("--ai-duo", p.toFixed(4));
    section.classList.toggle("is-duo-settled", p > 0.985);

    if (p > 0.985) {
      clear();
      return;
    }

    shell.style.transform =
      `rotateX(${(-pitch).toFixed(2)}deg) ` +
      `scale3d(${pullX.toFixed(3)}, ${pullY.toFixed(3)}, 1)`;

    if (frost) frost.style.opacity = k.toFixed(3);
    const radii = [22, 14, 8, 3];
    bands.forEach((el, i) => {
      el.style.setProperty("--ai-b", `${(radii[i] * k).toFixed(2)}px`);
    });
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

  const io =
    typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) start();
            else stop();
          },
          { threshold: 0, rootMargin: "80px" }
        );
  if (io) io.observe(section);
  else start();

  return function dispose() {
    stop();
    if (io) io.disconnect();
    clear();
  };
}
