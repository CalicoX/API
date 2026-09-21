/**
 * Tracking 同款 .btn-switch：内层 shader 光雾。
 * 2026-09-21 Park：hover 滑动和 border beam 全去，按钮保持静息态（钮固定右侧），
 * 这里只负责给按钮补 shader 层。
 * @returns {() => void}
 */
export function mount() {
  const btns = document.querySelectorAll(".btn-switch");
  if (!btns.length) return () => {};

  btns.forEach((el) => {
    if (el.querySelector(".btn-switch-shader")) return;
    const sh = document.createElement("span");
    sh.className = "btn-switch-shader";
    sh.setAttribute("aria-hidden", "true");
    el.insertBefore(sh, el.firstChild);
  });

  return () => {};
}
