/**
 * Use Cases full-module background — dotted particle earth (Fibonacci sphere).
 * Dark gray ground + sparse light specks. Globe spins and travels with scroll.
 *
 * @returns {() => void}
 */
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

    const gl =
      canvas.getContext("webgl", {
        alpha: false,
        antialias: true,
        premultipliedAlpha: false,
        powerPreference: "low-power",
      }) ||
      canvas.getContext("experimental-webgl", {
        alpha: false,
        antialias: true,
      });

    if (!gl) {
      canvas.remove();
      return () => {};
    }

    section.classList.add("has-uc-bg-shader");

    /* —— background: dark charcoal —— */
    const VERT_BG = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

    const FRAG_BG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
float ign(vec2 v){
  return fract(52.9829189 * fract(dot(v, vec2(0.06711056, 0.00583715))));
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec3 c = vec3(0.055, 0.056, 0.058);

  vec2 gp = gl_FragCoord.xy;
  vec2 globeUv = vec2(1.0, mix(1.0, 0.225, uScroll));
  vec2 g = (uv - globeUv) * vec2(aspect, 1.0);
  c += vec3(0.05, 0.08, 0.14) * exp(-dot(g, g) * 1.35) * 0.1;

  c += (ign(gp) - 0.5) * 0.008;
  gl_FragColor = vec4(c, 1.0);
}`;

    /* —— points: uSpin from scroll —— */
    const VERT_PT = `
attribute vec3 aPos;
attribute float aLand;
attribute float aSeed;
uniform vec2 uRes;
uniform float uSpin;
uniform float uScroll;
uniform float uDpr;
varying float vLand;
varying float vFront;
varying float vSeed;

void main(){
  vec3 p = normalize(aPos);
  float t = uSpin;
  float cy = cos(t), sy = sin(t);
  p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
  float tilt = -0.32;
  float ct = cos(tilt), st = sin(tilt);
  p = vec3(p.x, ct * p.y - st * p.z, st * p.y + ct * p.z);

  float scale = 1.35;
  vec3 world = p * scale;
  float camZ = 2.15;
  float z = world.z + camZ;
  float invZ = 1.0 / max(z, 0.2);
  float fov = 0.95;
  float aspect = uRes.x / max(uRes.y, 1.0);
  float k = mix(1.0, invZ / fov, 0.2);
  vec2 ndc = vec2(world.x * k / aspect, world.y * k);
  // right edge; scroll carries the sphere from the top corner toward the bottom
  ndc.x += 1.0;
  ndc.y += mix(1.0, -0.55, uScroll);
  gl_Position = vec4(ndc, 0.0, 1.0);

  float front = clamp(world.z * 0.5 + 0.5, 0.0, 1.0);
  float sz = mix(1.2, 2.8, front);
  sz *= mix(0.7, 1.2, aLand);
  sz *= uDpr * (uRes.y / 900.0);
  gl_PointSize = clamp(sz, 0.9, 5.5);

  vLand = aLand;
  vFront = front;
  vSeed = aSeed;
}`;

    const FRAG_PT = `
precision mediump float;
varying float vLand;
varying float vFront;
varying float vSeed;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c) * 2.0;
  if (d > 1.0) discard;
  float soft = smoothstep(1.0, 0.15, d);
  // ice-blue on dark, with violet rim
  vec3 land = vec3(0.42, 0.58, 0.88);
  vec3 landHi = vec3(0.52, 0.68, 0.96);
  vec3 ocean = vec3(0.28, 0.38, 0.62);
  vec3 oceanHi = vec3(0.38, 0.48, 0.72);
  // violet tint on back-facing particles for glow effect
  vec3 violet = vec3(0.55, 0.45, 0.95);
  vec3 L = mix(land, landHi, vFront);
  vec3 O = mix(ocean, oceanHi, vFront);
  vec3 col = mix(O, L, vLand);
  // add violet rim when particle is on edge
  float rim = 1.0 - abs(vFront - 0.5) * 2.0;
  col = mix(col, violet, rim * 0.25);
  float a = soft;
  a *= mix(0.22, 0.48, mix(0.4, 1.0, vLand));
  a *= mix(0.4, 1.0, vFront);
  a *= 0.9 + 0.08 * sin(vSeed * 28.0);
  if (vFront < 0.12) a *= 0.42;
  if (a < 0.018) discard;
  gl_FragColor = vec4(col * a, a);
}`;

    function compile(type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn("[use-cases-bg]", gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    }

    function link(vsSrc, fsSrc) {
      const vs = compile(gl.VERTEX_SHADER, vsSrc);
      const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
      if (!vs || !fs) return null;
      const p = gl.createProgram();
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.warn("[use-cases-bg] link", gl.getProgramInfoLog(p));
        return null;
      }
      return p;
    }

    const progBg = link(VERT_BG, FRAG_BG);
    const progPt = link(VERT_PT, FRAG_PT);
    if (!progBg || !progPt) {
      canvas.remove();
      return () => {};
    }

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    function landWeight(lon, lat) {
      function blob(lon0, lat0, w, h, power) {
        let dlon = lon - lon0;
        while (dlon > Math.PI) dlon -= Math.PI * 2;
        while (dlon < -Math.PI) dlon += Math.PI * 2;
        const x = dlon / w;
        const y = (lat - lat0) / h;
        return Math.exp(-(x * x + y * y) * (power || 1.1));
      }
      let w =
        blob(-1.7, 0.55, 1.1, 0.55, 1.0) +
        blob(-1.05, -0.25, 0.55, 0.85, 1.15) +
        blob(0.25, 0.2, 0.55, 0.75, 1.0) +
        blob(0.5, 0.85, 1.4, 0.45, 0.95) +
        blob(1.4, 0.55, 1.0, 0.55, 1.05) +
        blob(2.3, -0.45, 0.55, 0.35, 1.2) +
        blob(-0.7, 1.15, 1.2, 0.25, 1.3) +
        blob(1.9, 0.15, 0.35, 0.25, 1.4);
      w += blob(0.0, -1.2, 2.5, 0.28, 0.9) * 0.85;
      w +=
        Math.sin(lon * 6.2 + lat * 4.1) * 0.04 +
        Math.sin(lon * 11.0 - lat * 7.0) * 0.03;
      return w;
    }

    const N = 14000;
    const positions = [];
    const lands = [];
    const seeds = [];
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const lat = Math.asin(Math.max(-1, Math.min(1, y)));
      const lon = Math.atan2(z, x);
      const lw = landWeight(lon, lat);
      const isLand = lw > 0.4 ? 1 : 0;

      if (isLand) {
        positions.push(x, y, z);
        lands.push(1);
        seeds.push((i * 0.618) % 1);
        if (lw > 0.55) {
          const jx = x + (Math.random() - 0.5) * 0.014;
          const jy = y + (Math.random() - 0.5) * 0.014;
          const jz = z + (Math.random() - 0.5) * 0.014;
          const len = Math.sqrt(jx * jx + jy * jy + jz * jz) || 1;
          positions.push(jx / len, jy / len, jz / len);
          lands.push(1);
          seeds.push(Math.random());
        }
        if (lw > 0.75 && i % 2 === 0) {
          const jx2 = x + (Math.random() - 0.5) * 0.01;
          const jy2 = y + (Math.random() - 0.5) * 0.01;
          const jz2 = z + (Math.random() - 0.5) * 0.01;
          const len2 = Math.sqrt(jx2 * jx2 + jy2 * jy2 + jz2 * jz2) || 1;
          positions.push(jx2 / len2, jy2 / len2, jz2 / len2);
          lands.push(1);
          seeds.push(Math.random());
        }
      } else if (Math.random() < 0.42) {
        positions.push(x, y, z);
        lands.push(0);
        seeds.push(Math.random());
      }
    }

    function addRing(lat, count, landish) {
      for (let k = 0; k < count; k++) {
        const lonR = (k / count) * Math.PI * 2 - Math.PI;
        const cl = Math.cos(lat);
        positions.push(Math.cos(lonR) * cl, Math.sin(lat), Math.sin(lonR) * cl);
        lands.push(landish ? 0.35 : 0);
        seeds.push(k / count);
      }
    }
    addRing(0, 160, false);
    addRing(0.35, 120, false);
    addRing(-0.35, 120, false);
    addRing(0.7, 90, false);
    addRing(-0.7, 90, false);

    const count = lands.length;

    const bufPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const bufLand = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufLand);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lands), gl.STATIC_DRAW);

    const bufSeed = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufSeed);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(seeds), gl.STATIC_DRAW);

    let raf = 0;
    let disposed = false;
    let visible = false;
    const t0 = performance.now();
    let dpr = 1;
    let scrollP = 0;
    let smoothScroll = 0;
    let scrollRaf = 0;

    const uBgRes = gl.getUniformLocation(progBg, "uRes");
    const uBgTime = gl.getUniformLocation(progBg, "uTime");
    const uBgScroll = gl.getUniformLocation(progBg, "uScroll");
    const aPosBg = gl.getAttribLocation(progBg, "aPos");
    const uPtRes = gl.getUniformLocation(progPt, "uRes");
    const uPtSpin = gl.getUniformLocation(progPt, "uSpin");
    const uPtScroll = gl.getUniformLocation(progPt, "uScroll");
    const uPtDpr = gl.getUniformLocation(progPt, "uDpr");
    const aPos = gl.getAttribLocation(progPt, "aPos");
    const aLand = gl.getAttribLocation(progPt, "aLand");
    const aSeed = gl.getAttribLocation(progPt, "aSeed");

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      const cssW = Math.max(2, host.clientWidth || rect.width);
      const cssH = Math.max(2, host.clientHeight || rect.height);
      const w = Math.max(2, Math.floor(cssW * dpr));
      const h = Math.max(2, Math.floor(cssH * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      gl.viewport(0, 0, w, h);
    }

    function readScroll() {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(function () {
        scrollRaf = 0;
        const fromCss = parseFloat(section.style.getPropertyValue("--uc-p"));
        if (Number.isFinite(fromCss)) {
          scrollP = Math.max(0, Math.min(1, fromCss));
          return;
        }
        const rect = section.getBoundingClientRect();
        const total = Math.max(section.offsetHeight - window.innerHeight, 1);
        scrollP = Math.max(0, Math.min(1, -rect.top / total));
      });
    }

    function releaseBackbuffer() {
      if (canvas.width > 1 || canvas.height > 1) {
        canvas.width = 1;
        canvas.height = 1;
      }
    }

    function draw(now) {
      if (!visible || disposed) {
        releaseBackbuffer();
        return;
      }
      resize();
      const t = (now - t0) / 1000;
      smoothScroll += (scrollP - smoothScroll) * 0.08;
      // rotate with section scroll only — rest pose is spin 0
      const spin = smoothScroll * 2.4;

      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.BLEND);
      gl.useProgram(progBg);
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(aPosBg);
      gl.vertexAttribPointer(aPosBg, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uBgRes, canvas.width, canvas.height);
      gl.uniform1f(uBgTime, t);
      gl.uniform1f(uBgScroll, smoothScroll);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(progPt);

      gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, bufLand);
      gl.enableVertexAttribArray(aLand);
      gl.vertexAttribPointer(aLand, 1, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, bufSeed);
      gl.enableVertexAttribArray(aSeed);
      gl.vertexAttribPointer(aSeed, 1, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uPtRes, canvas.width, canvas.height);
      gl.uniform1f(uPtSpin, spin);
      gl.uniform1f(uPtScroll, smoothScroll);
      gl.uniform1f(uPtDpr, dpr);
      gl.drawArrays(gl.POINTS, 0, count);

      // CSS grid hole tracks the moving globe (NDC y mix(1.0, -0.55) → uv)
      const ndcY = 1.0 + (-0.55 - 1.0) * smoothScroll;
      const uvY = (ndcY + 1.0) * 0.5;
      section.style.setProperty("--uc-globe-y-t", (1.0 - uvY).toFixed(4));

      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (visible || disposed) return;
      visible = true;
      raf = requestAnimationFrame(draw);
    }

    function stop() {
      visible = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      releaseBackbuffer();
    }

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0.02, rootMargin: "80px" }
    );
    io.observe(section);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", readScroll, { passive: true });
    if (window.__lenis?.on) {
      try {
        window.__lenis.on("scroll", readScroll);
      } catch {
        /* ignore */
      }
    }

    resize();
    readScroll();

    teardown = function dispose() {
      disposed = true;
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", readScroll);
      gl.deleteBuffer(quad);
      gl.deleteBuffer(bufPos);
      gl.deleteBuffer(bufLand);
      gl.deleteBuffer(bufSeed);
      gl.deleteProgram(progBg);
      gl.deleteProgram(progPt);
      section.classList.remove("has-uc-bg-shader");
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  } catch (err) {
    console.warn("[fx:use-cases-bg-shader.js]", err);
    teardown = () => {};
  }
  return teardown || (() => {});
}
