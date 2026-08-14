/**
 * Code-window typewriter (same as tracking Explore card).
 * Safe to call multiple times — windows with data-cw-bound are skipped.
 */

const SCRIPT = [
  { n: 10, k: "", t: "import axios from 'axios'" },
  { n: 11, k: "", t: "" },
  { n: 12, k: "", t: "const key = process.env.TRACK_TOKEN" },
  { n: 13, k: "", t: "const res = await axios.post(" },
  { n: 14, k: "add", t: "  'https://api.17track.net/track/v2.4/register'," },
  { n: 15, k: "add", t: "  [{ number: 'RR123456789CN', carrier: 3011 }]," },
  { n: 16, k: "del", t: "  { headers: { Authorization: token } }" },
  { n: 17, k: "add", t: "  { headers: { '17token': key, 'content-type': 'application/json' } }" },
  { n: 18, k: "", t: ")" },
  { n: 19, k: "", t: "" },
  { n: 20, k: "", t: "if (res.data.code !== 0) throw res.data" },
  { n: 21, k: "add", t: "const accepted = res.data.data.accepted || []" },
  { n: 22, k: "add", t: "const rejected = res.data.data.rejected || []" },
  { n: 23, k: "", t: "console.log('registered', accepted.length)" },
  { n: 24, k: "", t: "" },
  { n: 25, k: "", t: "// poll status until delivered" },
  { n: 26, k: "add", t: "const get = await axios.post(" },
  { n: 27, k: "add", t: "  'https://api.17track.net/track/v2.4/gettrackinfo'," },
  { n: 28, k: "add", t: "  accepted.map((n) => ({ number: n.number }))," },
  { n: 29, k: "add", t: "  { headers: { '17token': key } }" },
  { n: 30, k: "", t: ")" },
  { n: 31, k: "", t: "return get.data.data" },
];

const CHAR_MS = 28;
const LINE_PAUSE = 160;
const END_PAUSE = 1600;

function setTask(el, state) {
  if (!el) return;
  el.classList.remove("is-running", "is-done", "is-pending");
  el.classList.add("is-" + state);
  const st = el.querySelector(".cw-status");
  if (!st) return;
  if (state === "running") st.textContent = "[running]";
  else if (state === "done") st.textContent = "[done]";
  else st.textContent = "[queued]";
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlight(text, kind) {
  if (!text) return "";
  if (kind === "del") return esc(text);
  let out = "";
  let i = 0;
  while (i < text.length) {
    if (text[i] === "'" || text[i] === '"') {
      const q = text[i];
      let j = i + 1;
      while (j < text.length && text[j] !== q) j++;
      if (j < text.length) j++;
      out += '<span class="s">' + esc(text.slice(i, j)) + "</span>";
      i = j;
      continue;
    }
    if (/\d/.test(text[i])) {
      let k = i;
      while (k < text.length && /[\d.]/.test(text[k])) k++;
      out += '<span class="n">' + esc(text.slice(i, k)) + "</span>";
      i = k;
      continue;
    }
    if (/[A-Za-z_$]/.test(text[i])) {
      let m = i;
      while (m < text.length && /[A-Za-z0-9_$]/.test(text[m])) m++;
      const word = text.slice(i, m);
      const next = text.slice(m).match(/^\s*\(/);
      if (
        word === "const" ||
        word === "await" ||
        word === "import" ||
        word === "from" ||
        word === "if" ||
        word === "throw" ||
        word === "return"
      ) {
        out += '<span class="k">' + esc(word) + "</span>";
      } else if (next || word === "post" || word === "map" || word === "log") {
        out += '<span class="f">' + esc(word) + "</span>";
      } else if (
        word === "number" ||
        word === "carrier" ||
        word === "headers" ||
        word === "Authorization" ||
        word === "code" ||
        word === "data" ||
        word === "accepted" ||
        word === "rejected" ||
        word === "length"
      ) {
        out += '<span class="n">' + esc(word) + "</span>";
      } else {
        out += esc(word);
      }
      i = m;
      continue;
    }
    if (text[i] === "/" && text[i + 1] === "/") {
      out += '<span class="c">' + esc(text.slice(i)) + "</span>";
      break;
    }
    out += esc(text[i]);
    i++;
  }
  return out;
}

function runWindow(win) {
  if (!win || win.getAttribute("data-cw-bound") === "1") return () => {};
  win.setAttribute("data-cw-bound", "1");

  const bar = win.querySelector("[data-cw-bar]");
  const pct = win.querySelector("[data-cw-pct]");
  const thought = win.querySelector("[data-cw-thought]");
  const tasks = win.querySelectorAll("[data-cw-task]");
  const t0 = tasks[0];
  const t1 = tasks[1];
  const host = win.querySelector("[data-cw-typewriter]");
  const scroll = win.querySelector("[data-cw-scroll]");
  if (!host || !scroll) return () => {};

  let totalChars = 0;
  for (let si = 0; si < SCRIPT.length; si++) {
    totalChars += Math.max(SCRIPT[si].t.length, 1);
  }

  let lineIdx = 0;
  let charIdx = 0;
  let typedChars = 0;
  let lastTick = 0;
  let pauseUntil = 0;
  let cycleStart = 0;
  let active = true; // start immediately when bound from hub
  let currentSrc = null;
  let currentLine = null;
  let raf = 0;
  let disposed = false;
  const caret = document.createElement("span");
  caret.className = "cw-caret";
  caret.setAttribute("aria-hidden", "true");

  function keepCaretVisible() {
    if (!host || !currentLine) return;
    const viewH = host.clientHeight || 0;
    if (viewH < 8) return;
    const lineTop = currentLine.offsetTop;
    const lineBottom = lineTop + currentLine.offsetHeight;
    const pad = 4;
    let nextTop = host.scrollTop;
    if (lineBottom > host.scrollTop + viewH - pad) {
      nextTop = lineBottom - viewH + pad;
    } else if (lineTop < host.scrollTop + pad) {
      nextTop = Math.max(0, lineTop - pad);
    }
    if (nextTop < 0) nextTop = 0;
    if (Math.abs(host.scrollTop - nextTop) > 0.5) {
      host.scrollTop = nextTop;
    }
  }

  function resetScript() {
    scroll.innerHTML = "";
    scroll.style.transform = "";
    host.scrollTop = 0;
    lineIdx = 0;
    charIdx = 0;
    typedChars = 0;
    currentSrc = null;
    currentLine = null;
    if (caret.parentNode) caret.parentNode.removeChild(caret);
    win.classList.remove("is-typing");
    setTask(t0, "running");
    setTask(t1, "pending");
  }

  function ensureLine() {
    if (lineIdx >= SCRIPT.length) return false;
    if (currentLine) return true;
    const meta = SCRIPT[lineIdx];
    const row = document.createElement("div");
    row.className = "cw-line" + (meta.k ? " is-" + meta.k : "");
    const ln = document.createElement("span");
    ln.className = "cw-ln";
    ln.textContent = String(meta.n);
    const src = document.createElement("span");
    src.className = "cw-src";
    row.appendChild(ln);
    row.appendChild(src);
    scroll.appendChild(row);
    currentLine = row;
    currentSrc = src;
    src.appendChild(caret);
    keepCaretVisible();
    return true;
  }

  function finishLine() {
    if (!currentSrc) return;
    const meta = SCRIPT[lineIdx];
    if (caret.parentNode) caret.parentNode.removeChild(caret);
    currentSrc.innerHTML = highlight(meta.t, meta.k);
    keepCaretVisible();
    currentLine = null;
    currentSrc = null;
    lineIdx++;
    charIdx = 0;
    if (lineIdx < SCRIPT.length) {
      pauseUntil = performance.now() + LINE_PAUSE;
    } else {
      pauseUntil = performance.now() + END_PAUSE;
      setTask(t0, "done");
      setTask(t1, "done");
      win.classList.remove("is-typing");
    }
  }

  function typeOne() {
    if (lineIdx >= SCRIPT.length) {
      resetScript();
      cycleStart = performance.now();
      setTask(t0, "running");
      setTask(t1, "pending");
      return;
    }
    if (!ensureLine()) return;
    const meta = SCRIPT[lineIdx];
    const text = meta.t;
    win.classList.add("is-typing");

    if (text.length === 0) {
      typedChars += 1;
      finishLine();
      return;
    }

    charIdx++;
    typedChars++;
    const shown = text.slice(0, charIdx);
    currentSrc.textContent = shown;
    currentSrc.appendChild(caret);
    keepCaretVisible();

    if (charIdx >= text.length) {
      finishLine();
    }
  }

  function syncChrome() {
    let p = totalChars > 0 ? Math.min(1, typedChars / totalChars) : 0;
    if (lineIdx >= SCRIPT.length) p = 1;
    const shown = p >= 0.995 ? 100 : Math.min(99.9, p * 100);
    if (bar) bar.style.width = shown + "%";
    if (pct) pct.textContent = (shown >= 100 ? "100" : shown.toFixed(1)) + "%";

    const thoughtSec = 0.3 + p * 4.5;
    if (thought) thought.textContent = "Thought for " + thoughtSec.toFixed(1) + "s";

    if (p < 0.48) {
      setTask(t0, "running");
      setTask(t1, "pending");
    } else if (p < 0.82) {
      setTask(t0, "done");
      setTask(t1, "running");
    } else {
      setTask(t0, "done");
      setTask(t1, p >= 1 ? "done" : "running");
    }
  }

  function frame(now) {
    if (disposed) return;
    raf = requestAnimationFrame(frame);
    if (!active) return;
    if (!cycleStart) cycleStart = now;
    if (now >= pauseUntil && now - lastTick >= CHAR_MS) {
      lastTick = now;
      typeOne();
    }
    syncChrome();
  }

  resetScript();
  raf = requestAnimationFrame(frame);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        active = en.isIntersecting;
        if (en.isIntersecting) {
          lastTick = 0;
          pauseUntil = 0;
          if (lineIdx === 0 && charIdx === 0 && !scroll.children.length) {
            cycleStart = performance.now();
          }
        }
      });
    },
    { threshold: 0.12 }
  );
  io.observe(win);

  return function dispose() {
    disposed = true;
    active = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    win.removeAttribute("data-cw-bound");
  };
}

/**
 * Bind all unbound code windows under root (default document).
 * @param {ParentNode} [root]
 * @returns {() => void} dispose all bound in this call
 */
export function bindCodeWindows(root) {
  const scope = root || document;
  const list = scope.querySelectorAll(".code-window[data-code-anim]:not([data-cw-bound])");
  const disposers = [];
  list.forEach((win) => {
    const d = runWindow(win);
    if (typeof d === "function") disposers.push(d);
  });
  return function dispose() {
    disposers.forEach((d) => {
      try {
        d();
      } catch {
        /* ignore */
      }
    });
  };
}

export function mount() {
  return bindCodeWindows(document);
}
