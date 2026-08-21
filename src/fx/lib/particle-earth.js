/**
 * Shared dotted particle earth — Fibonacci sphere + continent blobs.
 * Use Cases (full-bleed, scroll-driven) and Data Operations carriers well
 * both mount this engine with different layout / color / spin options.
 */

import { prefersReducedMotion } from "../utils.js";

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

const VERT_PT = `
attribute vec3 aPos;
attribute float aLand;
attribute float aSeed;
uniform vec2 uRes;
uniform float uSpin;
uniform float uScroll;
uniform float uDpr;
uniform float uScale;
uniform vec2 uNdcOffset;
uniform float uSize;
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

  float scale = uScale;
  vec3 world = p * scale;
  float camZ = 2.15;
  float z = world.z + camZ;
  float invZ = 1.0 / max(z, 0.2);
  float fov = 0.95;
  float aspect = uRes.x / max(uRes.y, 1.0);
  float k = mix(1.0, invZ / fov, 0.2);
  vec2 ndc = vec2(world.x * k / aspect, world.y * k);
  ndc += uNdcOffset;
  gl_Position = vec4(ndc, 0.0, 1.0);

  float front = clamp(world.z * 0.5 + 0.5, 0.0, 1.0);
  float sz = mix(1.2, 2.8, front);
  sz *= mix(0.7, 1.2, aLand);
  sz *= uDpr * (uRes.y / 900.0) * uSize;
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
uniform vec3 uLand;
uniform vec3 uLandHi;
uniform vec3 uOcean;
uniform vec3 uOceanHi;
uniform vec3 uViolet;
uniform float uAlphaMul;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c) * 2.0;
  if (d > 1.0) discard;
  float soft = smoothstep(1.0, 0.15, d);
  vec3 L = mix(uLand, uLandHi, vFront);
  vec3 O = mix(uOcean, uOceanHi, vFront);
  vec3 col = mix(O, L, vLand);
  float rim = 1.0 - abs(vFront - 0.5) * 2.0;
  col = mix(col, uViolet, rim * 0.25);
  float a = soft;
  a *= mix(0.22, 0.48, mix(0.4, 1.0, vLand));
  a *= mix(0.4, 1.0, vFront);
  a *= 0.9 + 0.08 * sin(vSeed * 28.0);
  if (vFront < 0.12) a *= 0.42;
  a *= uAlphaMul;
  if (a < 0.018) discard;
  gl_FragColor = vec4(col * a, a);
}`;

export const USE_CASES_THEME = {
  land: [0.42, 0.58, 0.88],
  landHi: [0.52, 0.68, 0.96],
  ocean: [0.28, 0.38, 0.62],
  oceanHi: [0.38, 0.48, 0.72],
  violet: [0.55, 0.45, 0.95],
  alphaMul: 1,
};

/** Blue globe on the carriers gray well — continents must read, keep it quiet. */
export const CARRIERS_THEME = {
  land: [0.16, 0.3, 0.52],
  landHi: [0.22, 0.38, 0.62],
  ocean: [0.2, 0.3, 0.44],
  oceanHi: [0.26, 0.36, 0.52],
  violet: [0.24, 0.32, 0.52],
  alphaMul: 0.16,
};

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
  w += Math.sin(lon * 6.2 + lat * 4.1) * 0.04 + Math.sin(lon * 11.0 - lat * 7.0) * 0.03;
  return w;
}

export function buildEarthParticles(N) {
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

  return {
    positions: new Float32Array(positions),
    lands: new Float32Array(lands),
    seeds: new Float32Array(seeds),
    count: lands.length,
  };
}

function compile(gl, type, src, logPrefix) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn(logPrefix, gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

function link(gl, vsSrc, fsSrc, logPrefix) {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSrc, logPrefix);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc, logPrefix);
  if (!vs || !fs) return null;
  const p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.warn(`${logPrefix} link`, gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

function rotateEarth(x, y, z, spin) {
  const cy = Math.cos(spin);
  const sy = Math.sin(spin);
  let px = cy * x + sy * z;
  const py = y;
  let pz = -sy * x + cy * z;
  const tilt = -0.32;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  const qy = ct * py - st * pz;
  const qz = st * py + ct * pz;
  return [px, qy, qz];
}

function drawEarth2d(canvas, particles, theme, spin, scale, ndcOffset, size) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  const aspect = w / Math.max(h, 1);
  const camZ = 2.15;
  const fov = 0.95;
  const step = Math.max(1, Math.ceil(particles.count / 2200));
  for (let i = 0; i < particles.count; i += step) {
    const x = particles.positions[i * 3];
    const y = particles.positions[i * 3 + 1];
    const z = particles.positions[i * 3 + 2];
    const land = particles.lands[i];
    const [px, py, pz] = rotateEarth(x, y, z, spin);
    const worldZ = pz * scale;
    const front = Math.max(0, Math.min(1, worldZ * 0.5 + 0.5));
    if (front < 0.12) continue;
    const invZ = 1 / Math.max(worldZ + camZ, 0.2);
    const k = 1 * 0.8 + (invZ / fov) * 0.2;
    const ndcX = px * scale * k / aspect + ndcOffset[0];
    const ndcY = py * scale * k + ndcOffset[1];
    const sx = (ndcX * 0.5 + 0.5) * w;
    const sy = (1 - (ndcY * 0.5 + 0.5)) * h;
    const L = theme.landHi;
    const O = theme.oceanHi;
    const r = L[0] * land + O[0] * (1 - land);
    const g = L[1] * land + O[1] * (1 - land);
    const b = L[2] * land + O[2] * (1 - land);
    const a = (0.22 + 0.36 * land) * (0.4 + 0.6 * front) * theme.alphaMul;
    const rad = Math.max(0.7, (0.9 + front * 1.2) * size);
    ctx.fillStyle = `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${Math.min(1, a).toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(sx, sy, rad, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * @returns {() => void}
 */
export function createParticleEarth(opts) {
  const host = opts.host;
  const logPrefix = opts.logPrefix || "[particle-earth]";
  if (!host) return () => {};

  const canvasClass = opts.canvasClass || "api-particle-earth";
  let canvas = opts.canvas || host.querySelector(`.${canvasClass}`);
  const createdCanvas = !canvas;
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.className = canvasClass;
    canvas.setAttribute("aria-hidden", "true");
    host.insertBefore(canvas, host.firstChild);
  }

  const alpha = !!opts.alpha;
  const gl =
    canvas.getContext("webgl", {
      alpha,
      antialias: opts.antialias !== false,
      premultipliedAlpha: opts.premultipliedAlpha ?? alpha,
      powerPreference: "low-power",
    }) ||
    canvas.getContext("experimental-webgl", {
      alpha,
      antialias: opts.antialias !== false,
    });

  const particles = buildEarthParticles(opts.particleCount || 14000);
  const theme = opts.theme || USE_CASES_THEME;
  const scale = opts.scale ?? 1.35;
  const size = opts.size ?? 1;
  const dprMax = opts.dprMax ?? 2;
  const staticMode = !!opts.staticMode;
  const getSpin = opts.getSpin || (({ smoothScroll }) => smoothScroll * 2.4);
  const getNdcOffset =
    opts.getNdcOffset || (({ smoothScroll }) => [1, 1 + (-0.55 - 1) * smoothScroll]);
  const observeEl = opts.observeEl || host;

  if (!gl) {
    if (!opts.fallback2d) {
      if (createdCanvas || opts.removeCanvasOnDispose) canvas.remove();
      return () => {};
    }
    return mount2dFallback({
      host,
      canvas,
      createdCanvas,
      particles,
      theme,
      scale,
      size,
      dprMax,
      staticMode,
      getSpin,
      getNdcOffset,
      observeEl,
      manualVis: !!opts.manualVis,
      removeCanvas: opts.removeCanvasOnDispose && createdCanvas,
    });
  }

  const progBg = opts.drawBackground ? link(gl, VERT_BG, FRAG_BG, logPrefix) : null;
  const progPt = link(gl, VERT_PT, FRAG_PT, logPrefix);
  if (!progPt || (opts.drawBackground && !progBg)) {
    if (opts.fallback2d) {
      return mount2dFallback({
        host,
        canvas,
        createdCanvas,
        particles,
        theme,
        scale,
        size,
        dprMax,
        staticMode,
        getSpin,
        getNdcOffset,
        observeEl,
        manualVis: !!opts.manualVis,
        removeCanvas: opts.removeCanvasOnDispose && createdCanvas,
      });
    }
    if (createdCanvas) canvas.remove();
    return () => {};
  }

  if (opts.markEl && opts.markClass) {
    opts.markEl.classList.add(opts.markClass);
  }

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const bufPos = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
  gl.bufferData(gl.ARRAY_BUFFER, particles.positions, gl.STATIC_DRAW);

  const bufLand = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufLand);
  gl.bufferData(gl.ARRAY_BUFFER, particles.lands, gl.STATIC_DRAW);

  const bufSeed = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufSeed);
  gl.bufferData(gl.ARRAY_BUFFER, particles.seeds, gl.STATIC_DRAW);

  let raf = 0;
  let disposed = false;
  let visible = false;
  const t0 = performance.now();
  let dpr = 1;
  let scrollP = 0;
  let smoothScroll = 0;
  let scrollRaf = 0;

  const uBgRes = progBg ? gl.getUniformLocation(progBg, "uRes") : null;
  const uBgTime = progBg ? gl.getUniformLocation(progBg, "uTime") : null;
  const uBgScroll = progBg ? gl.getUniformLocation(progBg, "uScroll") : null;
  const aPosBg = progBg ? gl.getAttribLocation(progBg, "aPos") : -1;
  const uPtRes = gl.getUniformLocation(progPt, "uRes");
  const uPtSpin = gl.getUniformLocation(progPt, "uSpin");
  const uPtScroll = gl.getUniformLocation(progPt, "uScroll");
  const uPtDpr = gl.getUniformLocation(progPt, "uDpr");
  const uPtScale = gl.getUniformLocation(progPt, "uScale");
  const uPtOffset = gl.getUniformLocation(progPt, "uNdcOffset");
  const uPtSize = gl.getUniformLocation(progPt, "uSize");
  const uLand = gl.getUniformLocation(progPt, "uLand");
  const uLandHi = gl.getUniformLocation(progPt, "uLandHi");
  const uOcean = gl.getUniformLocation(progPt, "uOcean");
  const uOceanHi = gl.getUniformLocation(progPt, "uOceanHi");
  const uViolet = gl.getUniformLocation(progPt, "uViolet");
  const uAlphaMul = gl.getUniformLocation(progPt, "uAlphaMul");
  const aPos = gl.getAttribLocation(progPt, "aPos");
  const aLand = gl.getAttribLocation(progPt, "aLand");
  const aSeed = gl.getAttribLocation(progPt, "aSeed");

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, dprMax);
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
    if (!opts.followScroll) return;
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(function () {
      scrollRaf = 0;
      const section = opts.scrollSection;
      if (section) {
        const fromCss = parseFloat(section.style.getPropertyValue("--uc-p"));
        if (Number.isFinite(fromCss)) {
          scrollP = Math.max(0, Math.min(1, fromCss));
          return;
        }
        const rect = section.getBoundingClientRect();
        const total = Math.max(section.offsetHeight - window.innerHeight, 1);
        scrollP = Math.max(0, Math.min(1, -rect.top / total));
      }
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
    if (opts.followScroll) {
      smoothScroll += (scrollP - smoothScroll) * 0.08;
    }
    const ctx = { t, smoothScroll };
    const spin = getSpin(ctx);
    const ndcOffset = getNdcOffset(ctx);

    gl.disable(gl.DEPTH_TEST);
    if (progBg) {
      gl.disable(gl.BLEND);
      gl.useProgram(progBg);
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(aPosBg);
      gl.vertexAttribPointer(aPosBg, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uBgRes, canvas.width, canvas.height);
      gl.uniform1f(uBgTime, t);
      gl.uniform1f(uBgScroll, smoothScroll);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    } else {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

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
    gl.uniform1f(uPtScale, scale);
    gl.uniform2f(uPtOffset, ndcOffset[0], ndcOffset[1]);
    gl.uniform1f(uPtSize, size);
    gl.uniform3f(uLand, theme.land[0], theme.land[1], theme.land[2]);
    gl.uniform3f(uLandHi, theme.landHi[0], theme.landHi[1], theme.landHi[2]);
    gl.uniform3f(uOcean, theme.ocean[0], theme.ocean[1], theme.ocean[2]);
    gl.uniform3f(uOceanHi, theme.oceanHi[0], theme.oceanHi[1], theme.oceanHi[2]);
    gl.uniform3f(uViolet, theme.violet[0], theme.violet[1], theme.violet[2]);
    gl.uniform1f(uAlphaMul, theme.alphaMul);
    gl.drawArrays(gl.POINTS, 0, particles.count);

    opts.onFrame?.({ smoothScroll, t, spin, canvas });

    if (!staticMode) {
      // idle pause: when the scene reports itself static, keep the last frame
      // on screen and stop scheduling; wake() resumes the loop.
      if (!opts.getAnimating || opts.getAnimating()) {
        raf = requestAnimationFrame(draw);
      } else {
        raf = 0;
      }
    }
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

  function wake() {
    if (disposed || !visible || raf) return;
    raf = requestAnimationFrame(draw);
  }
  opts.onApi?.({ wake });

  function wellOnScreen() {
    const r = observeEl.getBoundingClientRect();
    const overlapX = Math.min(r.right, window.innerWidth) - Math.max(r.left, 0);
    const overlapY = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
    return r.width > 8 && r.height > 8 && overlapX > 24 && overlapY > 24;
  }

  function syncVis() {
    if (disposed) return;
    if (opts.manualVis) {
      if (wellOnScreen()) start();
      else stop();
      return;
    }
  }

  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (opts.manualVis) {
          syncVis();
          return;
        }
        if (e.isIntersecting) start();
        else stop();
      });
    },
    { threshold: opts.threshold ?? 0.02, rootMargin: opts.rootMargin ?? "80px" }
  );
  io.observe(observeEl);

  function onResize() {
    if (disposed) return;
    if (opts.manualVis) syncVis();
    if (!visible) return;
    if (staticMode) raf = requestAnimationFrame(draw);
    else {
      resize();
      wake();
    }
  }

  window.addEventListener("resize", onResize, { passive: true });
  if (opts.followScroll) {
    window.addEventListener("scroll", readScroll, { passive: true });
    if (window.__lenis?.on) {
      try {
        window.__lenis.on("scroll", readScroll);
      } catch {
        /* ignore */
      }
    }
  }

  let ro = null;
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(onResize);
    ro.observe(host);
  }

  resize();
  if (opts.followScroll) readScroll();
  if (opts.manualVis) {
    window.addEventListener("scroll", syncVis, { passive: true });
    if (window.__lenis?.on) {
      try {
        window.__lenis.on("scroll", syncVis);
      } catch {
        /* ignore */
      }
    }
    requestAnimationFrame(syncVis);
  } else if (opts.autostart) {
    start();
  }

  return function dispose() {
    disposed = true;
    stop();
    io.disconnect();
    ro?.disconnect();
    window.removeEventListener("resize", onResize);
    if (opts.manualVis) window.removeEventListener("scroll", syncVis);
    if (opts.followScroll) {
      window.removeEventListener("scroll", readScroll);
    }
    gl.deleteBuffer(quad);
    gl.deleteBuffer(bufPos);
    gl.deleteBuffer(bufLand);
    gl.deleteBuffer(bufSeed);
    if (progBg) gl.deleteProgram(progBg);
    gl.deleteProgram(progPt);
    if (opts.markEl && opts.markClass) {
      opts.markEl.classList.remove(opts.markClass);
    }
    if (opts.removeCanvasOnDispose && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
}

function mount2dFallback(cfg) {
  const { canvas, host, particles, theme, scale, size, dprMax, getSpin, getNdcOffset, observeEl } =
    cfg;
  let disposed = false;
  let visible = false;

  function onScreen() {
    const r = observeEl.getBoundingClientRect();
    const overlapX = Math.min(r.right, window.innerWidth) - Math.max(r.left, 0);
    const overlapY = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
    return r.width > 8 && r.height > 8 && overlapX > 24 && overlapY > 24;
  }

  function paint() {
    if (disposed || !visible) return;
    const dpr = Math.min(window.devicePixelRatio || 1, dprMax);
    const rect = host.getBoundingClientRect();
    const cssW = Math.max(2, host.clientWidth || rect.width);
    const cssH = Math.max(2, host.clientHeight || rect.height);
    canvas.width = Math.max(2, Math.floor(cssW * dpr));
    canvas.height = Math.max(2, Math.floor(cssH * dpr));
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    const spin = getSpin({ t: 0, smoothScroll: 0 });
    const ndcOffset = getNdcOffset({ t: 0, smoothScroll: 0 });
    drawEarth2d(canvas, particles, theme, spin, scale, ndcOffset, size);
  }

  function start() {
    if (visible || disposed) return;
    visible = true;
    paint();
  }

  function stop() {
    visible = false;
    if (canvas.width > 1 || canvas.height > 1) {
      canvas.width = 1;
      canvas.height = 1;
    }
  }

  function syncVis() {
    if (disposed) return;
    if (onScreen()) {
      start();
      paint();
    } else stop();
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (cfg.manualVis) syncVis();
        else if (e.isIntersecting) start();
        else stop();
      });
    },
    { threshold: 0.02, rootMargin: "80px" }
  );
  io.observe(observeEl);
  window.addEventListener("resize", cfg.manualVis ? syncVis : paint, { passive: true });
  if (cfg.manualVis) {
    window.addEventListener("scroll", syncVis, { passive: true });
    requestAnimationFrame(syncVis);
  }

  return function dispose() {
    disposed = true;
    stop();
    io.disconnect();
    window.removeEventListener("resize", cfg.manualVis ? syncVis : paint);
    if (cfg.manualVis) window.removeEventListener("scroll", syncVis);
    if (cfg.removeCanvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
  };
}

/** Use Cases full-module background — scroll-driven, top-right, dark ground. */
export function mountUseCasesEarth({ section, host, canvas }) {
  return createParticleEarth({
    host,
    canvas,
    canvasClass: "api-s2-bg-shader",
    observeEl: section,
    markEl: section,
    markClass: "has-uc-bg-shader",
    alpha: false,
    antialias: true,
    premultipliedAlpha: false,
    drawBackground: true,
    particleCount: 14000,
    dprMax: 2,
    scale: 1.35,
    size: 1,
    followScroll: true,
    scrollSection: section,
    getSpin: ({ smoothScroll }) => smoothScroll * 2.4,
    getNdcOffset: ({ smoothScroll }) => [1, 1 + (-0.55 - 1) * smoothScroll],
    onFrame: ({ smoothScroll }) => {
      const ndcY = 1.0 + (-0.55 - 1.0) * smoothScroll;
      const uvY = (ndcY + 1.0) * 0.5;
      section.style.setProperty("--uc-globe-y-t", (1.0 - uvY).toFixed(4));
    },
    theme: USE_CASES_THEME,
    logPrefix: "[use-cases-bg]",
    fallback2d: false,
    removeCanvasOnDispose: true,
  });
}

/**
 * Carriers well — canvas fills the well; globe sits on the bottom edge so
 * only the upper hemisphere shows (overflow clips the rest). Keep it faint.
 * Spin is hover-driven: idle frames are frozen (no rAF), hovering the card
 * eases the rotation in, leaving eases it back to a stop.
 */
export function mountCarriersEarth(host, canvas) {
  const reduce = prefersReducedMotion() || !!window.__reduceFx;
  const narrow =
    (window.matchMedia && window.matchMedia("(max-width: 900px)").matches) ||
    !!window.__isMobileLayout;
  const canHover =
    !reduce &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: hover)").matches;

  const BASE_SPIN = 0.18;
  const HOVER_SPEED = 0.18; // rad/s once fully spun up
  let spinAngle = BASE_SPIN;
  let speedK = 0; // eased 0..1 speed factor
  let speedTarget = 0;
  let lastT = null;
  let api = null;

  const dispose = createParticleEarth({
    host,
    canvas,
    canvasClass: "api-s4-carriers-earth",
    observeEl: host,
    alpha: true,
    antialias: !narrow,
    premultipliedAlpha: true,
    drawBackground: false,
    particleCount: narrow ? 4200 : 7200,
    dprMax: narrow ? 1.25 : 1.5,
    scale: 1.3,
    size: 1.55,
    followScroll: false,
    staticMode: reduce,
    manualVis: true,
    getSpin: reduce
      ? () => BASE_SPIN
      : ({ t }) => {
          if (lastT == null) lastT = t;
          const dt = Math.min(Math.max(t - lastT, 0), 0.1);
          lastT = t;
          speedK += (speedTarget - speedK) * Math.min(1, dt * 2.6);
          if (Math.abs(speedK - speedTarget) < 0.004) speedK = speedTarget;
          spinAngle += HOVER_SPEED * speedK * dt;
          return spinAngle;
        },
    getAnimating: () => speedTarget > 0 || speedK > 0.004,
    onApi: (a) => {
      api = a;
    },
    getNdcOffset: () => [0, -1.05],
    theme: CARRIERS_THEME,
    logPrefix: "[carriers-earth]",
    fallback2d: true,
    removeCanvasOnDispose: false,
    threshold: 0,
    rootMargin: "80px",
  });

  let hoverEl = null;
  const onEnter = () => {
    speedTarget = 1;
    lastT = null;
    api?.wake();
  };
  const onLeave = () => {
    speedTarget = 0;
  };
  if (canHover) {
    hoverEl = host.closest(".api-s4-card") || host;
    hoverEl.addEventListener("mouseenter", onEnter);
    hoverEl.addEventListener("mouseleave", onLeave);
  }

  return function disposeCarriersEarth() {
    if (hoverEl) {
      hoverEl.removeEventListener("mouseenter", onEnter);
      hoverEl.removeEventListener("mouseleave", onLeave);
    }
    dispose();
  };
}
