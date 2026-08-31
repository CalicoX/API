/**
 * Data Operations 井底 — 蓝 / 紫 / 绿 liquid gradient + film grain。
 * 不是 Hero Undertones（白底灰条纹 + 橙墨）。单 pass WebGL，颗粒很淡。
 * 减动效 / ≤768 / 弱 GPU：不挂 WebGL，留同色系静态渐变。
 *
 * @returns {() => void}
 */
export function mount() {
  let teardown = null;

  try {
    const well = document.querySelector("#data-operations .api-s4-well");
    if (!well) return () => {};

    if (
      window.__reduceFx ||
      window.__isMobileLayout ||
      (window.matchMedia && window.matchMedia("(max-width: 640px)").matches)
    ) {
      well.classList.add("is-grain-fallback");
      return () => {};
    }

    let canvas = well.querySelector(".api-s4-grain");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.className = "api-s4-grain";
      canvas.setAttribute("aria-hidden", "true");
      well.insertBefore(canvas, well.firstChild);
    }

    const ctxOpts = {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    };
    const gl =
      canvas.getContext("webgl", ctxOpts) ||
      canvas.getContext("experimental-webgl", ctxOpts);

    const weakGpu = (renderer) =>
      /swiftshader|llvmpipe|softpipe|microsoft basic render|gdi generic|mali-4|mali-t6|mali-t7|adreno 3[0-9]{2}([^0-9]|$)|adreno 4[0-1][0-9]([^0-9]|$)|powervr sgx/.test(
        String(renderer || "").toLowerCase()
      );

    if (!gl || gl.isContextLost()) {
      well.classList.add("is-grain-fallback");
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return () => {};
    }

    try {
      const info = gl.getExtension("WEBGL_debug_renderer_info");
      const raw = info
        ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
        : gl.getParameter(gl.RENDERER);
      if (weakGpu(raw)) {
        well.classList.add("is-grain-fallback");
        canvas.remove();
        const ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
        return () => {};
      }
    } catch {
      /* keep going */
    }

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);

    const s2l = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    const lin = (hex) => {
      const n = parseInt(hex.slice(1), 16);
      return [
        s2l(((n >> 16) & 255) / 255),
        s2l(((n >> 8) & 255) / 255),
        s2l((n & 255) / 255),
      ];
    };

    const C_BASE = lin("#E7EEF8");
    const C_BLUE = lin("#6B8CFF");
    const C_PURPLE = lin("#9B7CFF");
    const C_GREEN = lin("#4FD6A0");

    const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

    const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
uniform vec3 uBase;
uniform vec3 uBlue;
uniform vec3 uPurple;
uniform vec3 uGreen;

vec3 encodeSrgb(vec3 c){
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(max(c, vec3(0.0)), vec3(1.0/2.4)) - 0.055;
  return mix(lo, hi, step(vec3(0.0031308), c));
}

void main(){
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);
  float t = uTime * 0.11;

  vec2 q = p + 0.24 * vec2(
    sin(p.y * 2.15 + t * 1.05),
    cos(p.x * 1.85 - t * 0.88)
  );
  q += 0.14 * vec2(
    cos(q.y * 3.1 - t * 0.7),
    sin(q.x * 2.6 + t * 0.95)
  );

  float blueW = 0.5 + 0.5 * sin(q.x * 2.35 + t * 1.05);
  float purpleW = 0.5 + 0.5 * cos(q.y * 2.05 - t * 0.82 + q.x * 0.6);
  float greenW = 0.5 + 0.5 * sin((q.x + q.y) * 1.55 - t * 0.9);

  vec3 col = uBase;
  col = mix(col, uBlue, blueW * 0.48);
  col = mix(col, uPurple, purpleW * 0.38);
  col = mix(col, uGreen, greenW * 0.28);

  float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  float grain = noise * 2.0 - 1.0;
  float luma = clamp(dot(col, vec3(0.2126, 0.7152, 0.0722)), 0.0, 1.0);
  float darkFactor = pow(1.0 - luma + 0.000001, 2.0);
  col += grain * darkFactor * 0.028;

  gl_FragColor = vec4(encodeSrgb(col), 1.0);
}`;

    function compile(type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn("[s4-liquid-grain]", gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      well.classList.add("is-grain-fallback");
      canvas.remove();
      return () => {};
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("[s4-liquid-grain] link", gl.getProgramInfoLog(prog));
      well.classList.add("is-grain-fallback");
      canvas.remove();
      return () => {};
    }

    const aPos = gl.getAttribLocation(prog, "aPos");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uBase = gl.getUniformLocation(prog, "uBase");
    const uBlue = gl.getUniformLocation(prog, "uBlue");
    const uPurple = gl.getUniformLocation(prog, "uPurple");
    const uGreen = gl.getUniformLocation(prog, "uGreen");

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    let raf = 0;
    let running = true;
    let visible = true;
    let t0 = performance.now();
    let lastW = 0;
    let lastH = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(well.clientWidth * dpr));
      const h = Math.max(1, Math.floor(well.clientHeight * dpr));
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      canvas.width = w;
      canvas.height = h;
    }

    function draw(now) {
      if (!running) return;
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      resize();
      gl.viewport(0, 0, lastW, lastH);
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(uTime, (now - t0) * 0.001);
      gl.uniform2f(uRes, lastW, lastH);
      gl.uniform3fv(uBase, C_BASE);
      gl.uniform3fv(uBlue, C_BLUE);
      gl.uniform3fv(uPurple, C_PURPLE);
      gl.uniform3fv(uGreen, C_GREEN);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            visible = en.isIntersecting;
          });
        },
        { threshold: 0.02, rootMargin: "80px" }
      );
      io.observe(well);
    }

    well.classList.add("has-s4-grain");
    raf = requestAnimationFrame(draw);

    teardown = () => {
      running = false;
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
      try {
        gl.deleteBuffer(quad);
        gl.deleteProgram(prog);
        const ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
      } catch {
        /* ignore */
      }
      if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
      well.classList.remove("has-s4-grain");
    };
  } catch (err) {
    console.warn("[fx:s4-liquid-grain.js]", err);
  }

  return function dispose() {
    if (typeof teardown === "function") {
      try {
        teardown();
      } catch {
        /* ignore */
      }
    }
  };
}
