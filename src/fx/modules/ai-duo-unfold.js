import { shouldReduceFx } from "../utils.js";

/**
 * AI 整段钉在视口里：透视拉伸 + 模糊。
 * 合上时绕顶边 rotateX 往下翻、沿纵向拉开；滚完回正、糊散掉。
 */
export function mount() {
  const section = document.getElementById("ai-intelligence");
  const shell = section?.querySelector(".api-ai-shell");
  if (!section || !shell) return () => {};

  if (shouldReduceFx()) {
    clear(shell);
    section.style.setProperty("--ai-duo", "1");
    section.classList.add("is-duo-settled");
    return () => {};
  }

  let raf = 0;
  let looping = false;

  function target() {
    const vh = window.innerHeight || 1;
    const top = section.getBoundingClientRect().top;
    const travel = Math.max(1, section.offsetHeight - vh);
    return Math.max(0, Math.min(1, -top / travel));
  }

  function ease(t) {
    return t * t * (3 - 2 * t);
  }

  function clear(node) {
    node.style.transform = "";
    node.style.filter = "";
  }

  function write(raw) {
    const p = ease(raw);
    const k = 1 - p;
    const pitch = k * 56;
    const pullY = 1 + k * 0.52;
    const pullX = 1 + k * 0.08;
    const blur = k * 18;
    const frost = Math.max(0, 1 - Math.max(0, (p - 0.1) / 0.8));

    section.style.setProperty("--ai-duo", p.toFixed(4));
    section.style.setProperty("--ai-frost", frost.toFixed(4));
    section.classList.toggle("is-duo-settled", p > 0.985);

    if (p > 0.985) {
      clear(shell);
      return;
    }

    shell.style.transform =
      `rotateX(${(-pitch).toFixed(2)}deg) ` +
      `scale3d(${pullX.toFixed(3)}, ${pullY.toFixed(3)}, 1)`;
    shell.style.filter = `blur(${blur.toFixed(2)}px) saturate(${(0.72 + 0.28 * p).toFixed(2)})`;
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
          { threshold: 0, rootMargin: "40px" }
        );
  if (io) io.observe(section);
  else start();

  return function dispose() {
    stop();
    if (io) io.disconnect();
    clear(shell);
  };
}
