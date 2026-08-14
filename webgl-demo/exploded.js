import * as THREE from "three";

// ---------------------------------------------------------------------------
// Renderer / scene / isometric camera
// ---------------------------------------------------------------------------

const container = document.getElementById("gl");

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// True isometric-style orthographic camera.
// Frustum is derived from the viewport so the scene fits any screen.
// CONTENT_H = full world height of the composition:
//   dial bottom (-1.7-0.55) … terminal top (2.2 + PANEL_H/2 ≈ 3.75)  ≈ 6
// CENTER_Y = mid-point of that range ≈ 0.75
const CONTENT_H = 6.4;
const CENTER_Y = 0.55;
const FIT_FAR = 0.5;   // initial: content fills half the viewport height
const FIT_NEAR = 0.62; // scrolled: subtle push-in, generous margins
let frustum = CONTENT_H / FIT_FAR;

// small screens (portrait / narrow) need a wider frustum so the scene fits
function fitFactors() {
  const aspect = window.innerWidth / window.innerHeight;
  const narrow = aspect < 1 ? 1 / Math.max(0.55, aspect) : 1; // widen on portrait
  return narrow;
}

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -50, 50);
const ISO_DIR = new THREE.Vector3(1, 0.82, 1).normalize();
const FRONT_DIR = new THREE.Vector3(0, 0.02, 1).normalize(); // nearly level front view
let viewBlend = 0; // 0 = isometric, 1 = front

function layoutCamera() {
  const aspect = window.innerWidth / window.innerHeight;
  const f = frustum * fitFactors();
  camera.left = (-f * aspect) / 2;
  camera.right = (f * aspect) / 2;
  camera.top = f / 2;
  camera.bottom = -f / 2;
  camera.updateProjectionMatrix();
}

function updateCamera() {
  const dir = ISO_DIR.clone().lerp(FRONT_DIR, viewBlend).normalize();
  camera.position.copy(dir).multiplyScalar(20);
  camera.lookAt(0, CENTER_Y, 0); // frame the whole composition vertically
  camera.updateMatrixWorld();
}

layoutCamera();
updateCamera();

// ---------------------------------------------------------------------------
// Lights
// ---------------------------------------------------------------------------

// Lights start dim; scrolling "powers on" the scene
const ambient = new THREE.AmbientLight(0xffffff, 0.06);
scene.add(ambient);

const spot = new THREE.SpotLight(0xffffff, 4, 0, Math.PI / 6, 0.5, 1.5);
spot.position.set(6, 9, 5);
spot.target.position.set(0, 0, 0);
scene.add(spot, spot.target);

const fill = new THREE.DirectionalLight(0x8899bb, 0.08);
fill.position.set(-4, 3, 5);
scene.add(fill);

const bounce = new THREE.PointLight(0xff8300, 0.4, 8, 2);
bounce.position.set(0, -2.2, 0);
scene.add(bounce);

// ---------------------------------------------------------------------------
// Materials
// ---------------------------------------------------------------------------

const faceMat = (hex) =>
  new THREE.MeshStandardMaterial({ color: hex, metalness: 0.3, roughness: 0.55 });

// 3-tone shading so the boxes read as solid without strong lights
const chassisFaceMats = () => [
  faceMat(0x1b1b22), // +x
  faceMat(0x0e0e12), // -x
  faceMat(0x2c2c36), // +y top — brightest
  faceMat(0x0a0a0d), // -y
  faceMat(0x23232a), // +z
  faceMat(0x0e0e12), // -z
];

const edgeMat = new THREE.LineBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.9,
});

const detailMat = new THREE.LineBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.2,
});

// ---------------------------------------------------------------------------
// Texture loader helper
// ---------------------------------------------------------------------------

const texLoader = new THREE.TextureLoader();
function loadTex(url) {
  const t = texLoader.load(url);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

const logoTexture = loadTex("./logo-17track.png");

// ---------------------------------------------------------------------------
// Server builder (smaller units now)
// ---------------------------------------------------------------------------

const stack = new THREE.Group();
// drop the whole stack so the bottom unit sits on the dial plane (-1.7)
stack.position.y = -1.15;
scene.add(stack);

function makeServer({ w, h, d, baseY, explodeDir, withLogo = false }) {
  const group = new THREE.Group();
  group.position.y = baseY;

  const geo = new THREE.BoxGeometry(w, h, d);
  const chassis = new THREE.Mesh(geo, chassisFaceMats());
  chassis.position.y = h / 2;
  group.add(chassis);

  const outline = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
  outline.position.y = h / 2;
  outline.renderOrder = 10;
  group.add(outline);

  // front panel details — short vent slots at the far left
  const details = [];
  const faceZ = d / 2 + 0.001;
  const faceY0 = h * 0.22;
  const faceY1 = h * 0.78;
  const slotCount = 5;
  for (let i = 0; i < slotCount; i++) {
    const y = faceY0 + (i / (slotCount - 1)) * (faceY1 - faceY0);
    details.push(
      new THREE.Vector3(-w / 2 + 0.1, y, faceZ),
      new THREE.Vector3(-w / 2 + w * 0.13, y, faceZ),
    );
  }
  details.push(
    new THREE.Vector3(w / 2 - w * 0.28, faceY0, faceZ),
    new THREE.Vector3(w / 2 - w * 0.28, faceY1, faceZ),
  );
  const detailLines = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(details),
    detailMat,
  );
  detailLines.renderOrder = 9;
  group.add(detailLines);

  // 17TRACK logo decal on the FRONT face — only where requested, smaller
  if (withLogo) {
    const logoW = w * 0.26;
    const logo = new THREE.Mesh(
      new THREE.PlaneGeometry(logoW, logoW * (240 / 1500)),
      new THREE.MeshBasicMaterial({
        map: logoTexture,
        transparent: true,
        toneMapped: false,
      }),
    );
    logo.position.set(-w * 0.1, h / 2, d / 2 + 0.004);
    logo.renderOrder = 11;
    group.add(logo);
  }

  // LEDs — kept inside the face (right of the divider, within bounds)
  const ledDefs = [
    { color: 0x2bff88, mode: "blink", speed: 2.2 },
    { color: 0xff5a2a, mode: "flicker", speed: 9 },
    { color: 0x7dd3fc, mode: "pulse", speed: 1.1 },
    { color: 0x2bff88, mode: "blink", speed: 3.4 },
  ];
  const ledStartX = w / 2 - w * 0.24;
  const leds = ledDefs.map((def, i) => {
    const mat = new THREE.MeshBasicMaterial({ color: def.color });
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.028, 0.015), mat);
    led.position.set(ledStartX + i * 0.11, h * 0.5, faceZ + 0.01);
    group.add(led);
    return { mat, def, seed: Math.random() * 10 };
  });

  stack.add(group);
  return { group, baseY, explodeDir, leds, w, h, d };
}

// smaller than before; top unit carries the logo and separates less
const servers = [
  makeServer({ w: 3.3, h: 0.5, d: 2.5, baseY: -0.3, explodeDir: -0.22 }),
  makeServer({ w: 2.95, h: 0.45, d: 2.25, baseY: 0.3, explodeDir: 0.14, withLogo: true }),
];

// ---------------------------------------------------------------------------
// 360° dial rings — outer & inner split apart vertically on scroll
// ---------------------------------------------------------------------------

const dial = new THREE.Group();
dial.position.y = -1.7;
scene.add(dial);

function dialRing(radius, count, majorEvery, majorLen, minorLen) {
  const pts = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const len = i % majorEvery === 0 ? majorLen : minorLen;
    const r1 = radius - len;
    pts.push(
      new THREE.Vector3(Math.cos(a) * r1, 0, Math.sin(a) * r1),
      new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius),
    );
  }
  return new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(pts),
    edgeMat,
  );
}

// outer ring in its own group so it can sink down on scroll
const dialOuter = new THREE.Group();
dialOuter.add(dialRing(3.3, 120, 10, 0.22, 0.1));
dial.add(dialOuter);

// inner ring (counter-rotates) — rises up on scroll
const dialInnerGroup = new THREE.Group();
const dialInner = dialRing(2.7, 72, 6, 0.17, 0.08);
dialInnerGroup.add(dialInner);
dial.add(dialInnerGroup);

const guidePts = [];
for (let i = 0; i <= 96; i++) {
  const a = (i / 96) * Math.PI * 2;
  guidePts.push(new THREE.Vector3(Math.cos(a) * 3.0, 0, Math.sin(a) * 3.0));
}
dial.add(
  new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(guidePts),
    new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.14,
    }),
  ),
);

// logos orbit exactly along this guide circle (same radius, same center)

// Carrier logos — orbit along the dial ring, driven by scroll.
// Depth-of-field fake: each logo keeps 3 pre-blurred textures and swaps
// them based on its world-space depth (far side of the orbit = blurrier).
// ---------------------------------------------------------------------------

const CARRIERS = ["usps", "ups", "dhl", "gls", "dpd"];
// same center & reference plane as the dial (both at world origin in XZ)
const carrierOrbit = new THREE.Group();
carrierOrbit.position.y = -0.55; // floats just above the dial plane
scene.add(carrierOrbit);

// orbit radius sits exactly between inner (2.7) and outer (3.3) dial rings
const ORBIT_R = 3.0;

// generate blurred variants of a logo texture via canvas 2d filter
function makeBlurredTextures(url, blurLevels = [0, 3, 7]) {
  const textures = blurLevels.map(() => {
    const t = new THREE.Texture();
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
  const img = new Image();
  img.onload = () => {
    blurLevels.forEach((blur, i) => {
      const c = document.createElement("canvas");
      const pad = blur * 2;
      c.width = img.width + pad * 2;
      c.height = img.height + pad * 2;
      const cx = c.getContext("2d");
      if (blur > 0) cx.filter = `blur(${blur}px)`;
      cx.drawImage(img, pad, pad);
      textures[i].image = c;
      textures[i].needsUpdate = true;
    });
  };
  img.src = url;
  return textures;
}

const carrierPlanes = CARRIERS.map((name, i) => {
  const pivot = new THREE.Group();
  pivot.rotation.y = (i / CARRIERS.length) * Math.PI * 2;

  const blurTex = makeBlurredTextures(`./carrier-${name}.png`);

  // bare logo plane, rendered on both sides — no plate, no frame
  const mat = new THREE.MeshBasicMaterial({
    map: blurTex[0],
    transparent: true,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.55), mat);
  logo.position.set(ORBIT_R, 0, 0);
  pivot.add(logo);

  carrierOrbit.add(pivot);
  return { pivot, logo, blurTex, blurIdx: 0 };
});

// ---------------------------------------------------------------------------
// Floating isometric terminal — canvas texture + border beam
// ---------------------------------------------------------------------------

// --- canvas texture with the terminal UI (typed by JS) ---------------------
const TW = 680;
const TH = 520;
const termCanvas = document.createElement("canvas");
termCanvas.width = TW;
termCanvas.height = TH;
const tctx = termCanvas.getContext("2d");
const termTexture = new THREE.CanvasTexture(termCanvas);
termTexture.colorSpace = THREE.SRGBColorSpace;
termTexture.anisotropy = 4;

// Real snippet from the 17TRACK API docs (Quick Guide), with JSON syntax
// highlighting: k=key, s=string, n=number, p=punctuation, c=comment, ok=success
const TERM_SCRIPT = [
  { text: "$ ", cls: "p" },
  { text: "curl -X POST \\\n", cls: "w" },
  { text: "    --header ", cls: "w" },
  { text: "'17token: $TRACK_TOKEN'", cls: "s" },
  { text: " \\\n    --header ", cls: "w" },
  { text: "'Content-Type: application/json'", cls: "s" },
  { text: " \\\n    --data ", cls: "w" },
  { text: "'[", cls: "p" },
  { text: '\n      { "number": ', cls: "k" },
  { text: '"RR123456789CN"', cls: "s" },
  { text: ", ", cls: "p" },
  { text: '"carrier": ', cls: "k" },
  { text: "3011", cls: "n" },
  { text: " },", cls: "p" },
  { text: '\n      { "number": ', cls: "k" },
  { text: '"1234"', cls: "s" },
  { text: " }", cls: "p" },
  { text: "\n    ]'", cls: "p" },
  { text: " \\\n    ", cls: "w" },
  { text: "https://api.17track.net/track/v2.4/register", cls: "s" },
  { text: "\n\n", cls: "w" },
  { text: "// 200 OK\n", cls: "c" },
  { text: "{\n  ", cls: "p" },
  { text: '"code"', cls: "k" },
  { text: ": ", cls: "p" },
  { text: "0", cls: "n" },
  { text: ",\n  ", cls: "p" },
  { text: '"data"', cls: "k" },
  { text: ": {\n    ", cls: "p" },
  { text: '"accepted"', cls: "k" },
  { text: ": [ { ", cls: "p" },
  { text: '"number"', cls: "k" },
  { text: ": ", cls: "p" },
  { text: '"RR123456789CN"', cls: "s" },
  { text: ", ", cls: "p" },
  { text: '"carrier"', cls: "k" },
  { text: ": ", cls: "p" },
  { text: "3011", cls: "n" },
  { text: " } ],\n    ", cls: "p" },
  { text: '"rejected"', cls: "k" },
  { text: ": [ { ", cls: "p" },
  { text: '"number"', cls: "k" },
  { text: ": ", cls: "p" },
  { text: '"1234"', cls: "s" },
  { text: ",\n        ", cls: "p" },
  { text: '"error"', cls: "k" },
  { text: ": { ", cls: "p" },
  { text: '"code"', cls: "k" },
  { text: ": ", cls: "p" },
  { text: "-18010012", cls: "n" },
  { text: ", ", cls: "p" },
  { text: '"message"', cls: "k" },
  { text: ": ", cls: "p" },
  { text: '"format invalid"', cls: "s" },
  { text: " } } ]\n  }", cls: "p" },
  { text: "\n}\n\n", cls: "p" },
  { text: "✓ accepted 1 · rejected 1 — webhook TRACKING_UPDATED armed", cls: "ok" },
];

const TERM_COLORS = {
  w: "#e6e6ea",
  s: "#7dd3fc",
  k: "#f0abfc",
  n: "#fbbf24",
  p: "rgba(255,255,255,0.55)",
  c: "rgba(255,255,255,0.35)",
  ok: "#4ade80",
};

let termProgress = 0; // characters typed so far
let termDone = false;
let termDoneAt = 0;

function drawTerminal() {
  tctx.clearRect(0, 0, TW, TH);

  // frosted glass bg — translucent + subtle top sheen
  tctx.beginPath();
  tctx.roundRect(0, 0, TW, TH, 16);
  tctx.fillStyle = "rgba(20,20,26,0.55)";
  tctx.fill();

  // sheen: diagonal light streak, sells the "glass" read
  const sheen = tctx.createLinearGradient(0, 0, TW, TH * 0.7);
  sheen.addColorStop(0, "rgba(255,255,255,0.10)");
  sheen.addColorStop(0.35, "rgba(255,255,255,0.02)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  tctx.save();
  tctx.clip();
  tctx.fillStyle = sheen;
  tctx.fillRect(0, 0, TW, TH);
  tctx.restore();

  // title bar — frosted strip, vertically centered content
  const barH = 46;
  tctx.beginPath();
  tctx.roundRect(0, 0, TW, barH, [16, 16, 0, 0]);
  tctx.fillStyle = "rgba(255,255,255,0.07)";
  tctx.fill();
  // hairline under the bar
  tctx.fillStyle = "rgba(255,255,255,0.10)";
  tctx.fillRect(0, barH, TW, 1);

  const barMid = barH / 2;
  const dots = ["#ff5f57", "#febc2e", "#28c840"];
  dots.forEach((c, i) => {
    tctx.fillStyle = c;
    tctx.beginPath();
    tctx.arc(26 + i * 20, barMid, 5.5, 0, Math.PI * 2);
    tctx.fill();
  });

  // centered title, baseline aligned to bar middle
  tctx.textBaseline = "middle";
  tctx.fillStyle = "rgba(255,255,255,0.5)";
  tctx.font = "13px ui-monospace, Menlo, monospace";
  tctx.fillText("track/v2.4/register", 96, barMid + 1);

  tctx.fillStyle = "#7dd3fc";
  tctx.font = "11px ui-monospace, Menlo, monospace";
  const badge = "API";
  const bw = tctx.measureText(badge).width + 18;
  tctx.beginPath();
  tctx.roundRect(TW - bw - 16, barMid - 10, bw, 20, 10);
  tctx.fillStyle = "rgba(125,211,252,0.12)";
  tctx.fill();
  tctx.strokeStyle = "rgba(125,211,252,0.35)";
  tctx.lineWidth = 1;
  tctx.stroke();
  tctx.fillStyle = "#7dd3fc";
  tctx.fillText(badge, TW - bw - 16 + 9, barMid + 1);

  // body text
  tctx.font = "13.5px ui-monospace, Menlo, monospace";
  tctx.textBaseline = "top";
  let x = 24;
  let y = barH + 18;
  const lineH = 22;

  let remaining = Math.floor(termProgress);
  for (const frag of TERM_SCRIPT) {
    if (remaining <= 0) break;
    const part = frag.text.slice(0, remaining);
    remaining -= frag.text.length;

    tctx.fillStyle = TERM_COLORS[frag.cls] || TERM_COLORS.w;
    for (const ch of part) {
      if (ch === "\n") {
        x = 24;
        y += lineH;
        continue;
      }
      tctx.fillText(ch, x, y);
      x += tctx.measureText(ch).width;
    }
  }

  // blinking cursor
  if (Math.floor(performance.now() / 500) % 2 === 0) {
    tctx.fillStyle = "#e6e6ea";
    tctx.fillRect(x + 2, y + 2, 8, 15);
  }

  termTexture.needsUpdate = true;
}

function stepTerminal(dt, t) {
  if (!termDone) {
    termProgress += dt * 52; // chars per second
    const total = TERM_SCRIPT.reduce((n, f) => n + f.text.length, 0);
    if (termProgress >= total) {
      termProgress = total;
      termDone = true;
      termDoneAt = t;
    }
  } else if (t - termDoneAt > 3.2) {
    termProgress = 0;
    termDone = false;
  }
}

// --- 3D panel ---------------------------------------------------------------

const terminalGroup = new THREE.Group();
scene.add(terminalGroup);

const PANEL_W = 4.0;
const PANEL_H = (TH / TW) * PANEL_W;

const panel = new THREE.Mesh(
  new THREE.PlaneGeometry(PANEL_W, PANEL_H),
  new THREE.MeshBasicMaterial({
    map: termTexture,
    transparent: true,
    toneMapped: false,
  }),
);
terminalGroup.add(panel);

// panel border (static, dim) — rounded rectangle matching the canvas
const PANEL_R = 0.14; // corner radius in world units

function roundedRectPoints(w, h, r, segPerCorner = 8) {
  const hw = w / 2;
  const hh = h / 2;
  const pts = [];
  const corners = [
    [hw - r, hh - r, 0],           // top-right,   0..90
    [-hw + r, hh - r, 90],         // top-left,    90..180
    [-hw + r, -hh + r, 180],       // bottom-left, 180..270
    [hw - r, -hh + r, 270],        // bottom-right 270..360
  ];
  corners.forEach(([cx, cy, startDeg]) => {
    for (let i = 0; i <= segPerCorner; i++) {
      const a = ((startDeg + (i / segPerCorner) * 90) * Math.PI) / 180;
      pts.push(new THREE.Vector3(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0));
    }
  });
  pts.push(pts[0].clone()); // close
  return pts;
}

const borderPts = roundedRectPoints(PANEL_W, PANEL_H, PANEL_R);
const borderGeo = new THREE.BufferGeometry().setFromPoints(borderPts);
terminalGroup.add(
  new THREE.Line(
    borderGeo,
    new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
    }),
  ),
);

// border beam — bright segment travelling around the rounded perimeter.
// Build a dense polyline of the rounded rect once; beam = moving window.
const perimeterPts = roundedRectPoints(PANEL_W, PANEL_H, PANEL_R, 24);
const PERIMETER = perimeterPts.length - 1; // index-space perimeter
const beamGeo = new THREE.BufferGeometry();
const beam = new THREE.Line(
  beamGeo,
  new THREE.LineBasicMaterial({ color: 0xff8300, transparent: true, opacity: 0.95 }),
);
beam.renderOrder = 12;
terminalGroup.add(beam);

const BEAM_SEGS = 40; // beam length in index space

function updateBeam(t) {
  const head = Math.floor((t * 26) % PERIMETER);
  const pts = [];
  for (let i = 0; i <= BEAM_SEGS; i++) {
    const idx = (((head - i) % PERIMETER) + PERIMETER) % PERIMETER;
    pts.push(perimeterPts[idx]);
  }
  beamGeo.setFromPoints(pts);
}

// ---------------------------------------------------------------------------
// Scroll-driven explode + carrier orbit
// ---------------------------------------------------------------------------

const progressFill = document.getElementById("progress-fill");

let targetProgress = 0;
let progress = 0;

function readScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  targetProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

readScroll();
window.addEventListener("scroll", readScroll, { passive: true });

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function applyProgress(p) {
  const local = smoothstep(0.15, 0.75, p);
  servers.forEach((server) => {
    server.group.position.y = server.baseY + server.explodeDir * local;
  });

  // carriers orbit along the dial as you scroll (about 1.6 turns full scroll)
  carrierOrbit.rotation.y = p * Math.PI * 3.2;

  // dial rings split vertically: outer sinks, inner rises
  const dialSplit = smoothstep(0.1, 0.7, p);
  dialOuter.position.y = -dialSplit * 0.55;
  dialInnerGroup.position.y = dialSplit * 0.45;

  // power-on: lights ramp up with scroll
  const power = smoothstep(0.05, 0.6, p);
  ambient.intensity = 0.06 + power * 0.24;
  spot.intensity = 4 + power * 38;
  fill.intensity = 0.08 + power * 0.4;
  bounce.intensity = 0.4 + power * 2.2;

  // camera morphs from isometric to front view as you scroll
  viewBlend = smoothstep(0.35, 0.95, p);

  // dolly-in: frustum shrinks far -> near over the whole scroll
  const zoom = smoothstep(0.0, 0.9, p);
  const newFrustum =
    CONTENT_H / (FIT_FAR + (FIT_NEAR - FIT_FAR) * zoom);
  if (Math.abs(newFrustum - frustum) > 0.001) {
    frustum = newFrustum;
    layoutCamera();
  }

  stack.rotation.y = 0;

  progressFill.style.width = `${(p * 100).toFixed(1)}%`;
}

// ---------------------------------------------------------------------------
// Resize
// ---------------------------------------------------------------------------

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  layoutCamera();
});

// ---------------------------------------------------------------------------
// Animation loop
// ---------------------------------------------------------------------------

const clock = new THREE.Clock();
let lastT = 0;

function animate() {
  const t = clock.getElapsedTime();
  const dt = Math.min(0.1, t - lastT);
  lastT = t;

  progress += (targetProgress - progress) * 0.09;
  applyProgress(progress);
  updateCamera(); // viewBlend changed by applyProgress

  // synced gentle bob
  servers.forEach((server) => {
    server.group.position.y += Math.sin(t * 1.1) * 0.012;
  });
  // idle sway fades out as the camera moves to front view
  stack.rotation.y = Math.sin(t * 0.18) * 0.04 * (1 - viewBlend);

  // LEDs
  servers.forEach((server) => {
    server.leds.forEach(({ mat, def, seed }) => {
      const v = t * def.speed + seed;
      if (def.mode === "blink") {
        mat.color.setHex(v % 1 > 0.12 ? def.color : 0x0a0f0a);
      } else if (def.mode === "flicker") {
        const on = Math.sin(v) * Math.sin(v * 1.7) * Math.sin(v * 0.31) > -0.2;
        mat.color.setHex(on ? def.color : 0x140b06);
      } else {
        const k = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(v));
        mat.color.setHex(def.color).multiplyScalar(k);
      }
    });
  });

  // dial self-rotation (slow idle; carriers ride the scroll-driven orbit)
  dial.rotation.y = t * 0.08;
  dialInner.rotation.y = -t * 0.2;

  // carrier logos billboard toward the camera (Y-axis only) + gentle bob +
  // depth blur: far side of the orbit gets a blurrier texture
  const camYaw = Math.atan2(
    ISO_DIR.x + (FRONT_DIR.x - ISO_DIR.x) * viewBlend,
    ISO_DIR.z + (FRONT_DIR.z - ISO_DIR.z) * viewBlend,
  );
  carrierPlanes.forEach(({ pivot, logo, blurTex }, i) => {
    logo.position.y = Math.sin(t * 1.3 + i * 1.26) * 0.08;
    const worldYaw = pivot.rotation.y + carrierOrbit.rotation.y;
    logo.rotation.y = camYaw - worldYaw;

    // depth along the camera axis: dot of the logo's XZ direction with the
    // camera's XZ direction — positive = on the camera side (near)
    const camDirX = camera.position.x;
    const camDirZ = camera.position.z;
    const camLen = Math.hypot(camDirX, camDirZ);
    const nx = camDirX / camLen;
    const nz = camDirZ / camLen;
    // logo world XZ (pivot at origin, logo offset by ORBIT_R along local +x)
    const lx = Math.cos(worldYaw);
    const lz = -Math.sin(worldYaw); // THREE yaw is CCW around +Y: x=cos, z=-sin
    const depth = lx * nx + lz * nz; // +1 near … -1 far
    // map to blur tier: near = crisp, far = blurry
    const tier = depth > 0.35 ? 0 : depth > -0.35 ? 1 : 2;
    if (tier !== carrierPlanes[i].blurIdx) {
      carrierPlanes[i].blurIdx = tier;
      logo.material.map = blurTex[tier];
      logo.material.needsUpdate = true;
    }
    // also fade far logos slightly for extra depth
    logo.material.opacity = 0.55 + 0.45 * ((depth + 1) / 2);
  });

  // terminal hovers above the stack; tilt flattens to upright in front view.
  // bottom edge (y − H/2 ≈ 1.6) stays clear of the top server (~y≈0.75 max)
  terminalGroup.position.set(
    0,
    2.2 + Math.sin(t * 0.9) * 0.07,
    0.4,
  );
  terminalGroup.rotation.set(-0.32 * (1 - viewBlend), 0, 0);

  // terminal typing + border beam
  stepTerminal(dt, t);
  drawTerminal();
  updateBeam(t);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
