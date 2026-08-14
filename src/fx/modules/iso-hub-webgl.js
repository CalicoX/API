/**
 * Use Cases 3D hub — port of webgl-demo/exploded.js
 * Carriers orbit + exploded server stack + canvas terminal with typewriter.
 *
 * createIsoHubWebGL(host, { assetBase?, onReady? })
 *   .setProgress(0..1)
 *   .resize()
 *   .destroy()
 */
import * as THREE from "three";

const DEFAULT_ASSET_BASE = "/assets/webgl-hub";

/**
 * @param {HTMLElement} host
 * @param {{ assetBase?: string, onReady?: () => void }} [opts]
 */
export function createIsoHubWebGL(host, opts = {}) {
  if (!host) return null;

  const assetBase = (opts.assetBase || DEFAULT_ASSET_BASE).replace(/\/$/, "");
  let disposed = false;
  let progress = 0;
  let targetProgress = 0;
  let raf = 0;

  // ---------------------------------------------------------------------------
  // Renderer / scene / isometric camera
  // ---------------------------------------------------------------------------

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  renderer.domElement.className = "api-iso-canvas";
  renderer.domElement.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;";

  const scene = new THREE.Scene();

  // Frame composition (dial bottom → terminal top).
  // FIT = fraction of viewport height the content span occupies (higher = bigger on screen).
  // Mid fill: larger than the old ~0.42 empty look, smaller than the overfilled red-box pass.
  const CONTENT_H = 6.85;
  const CENTER_Y = 0.55;
  // defaults for tall desktop host; overridden per-frame by hostFit()
  const FIT_FAR = 0.68;
  const FIT_NEAR = 0.78;
  let frustum = CONTENT_H / FIT_FAR;

  function hostSize() {
    const r = host.getBoundingClientRect();
    return {
      w: Math.max(2, Math.floor(r.width)),
      h: Math.max(2, Math.floor(r.height)),
    };
  }

  /** Viewport-aware fill: taller host → a bit larger; short host keeps margin so no clip. */
  function hostFit(hostH) {
    // far = initial / low progress; near = scrolled push-in
    if (hostH < 420) return { far: 0.5, near: 0.58 };
    if (hostH < 520) return { far: 0.58, near: 0.66 };
    if (hostH < 640) return { far: 0.64, near: 0.72 };
    if (hostH < 780) return { far: 0.68, near: 0.78 };
    return { far: 0.72, near: 0.82 };
  }

  function fitFactors() {
    const { w, h } = hostSize();
    const aspect = w / h;
    // portrait / narrow host: widen frustum so sides of orbit don't clip
    return aspect < 1 ? 1 / Math.max(0.55, aspect) : 1;
  }

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -50, 50);
  const ISO_DIR = new THREE.Vector3(1, 0.82, 1).normalize();
  const FRONT_DIR = new THREE.Vector3(0, 0.1, 1).normalize();
  let viewBlend = 0;

  function layoutCamera() {
    const { w, h } = hostSize();
    const aspect = w / h;
    const f = frustum * fitFactors();
    camera.left = (-f * aspect) / 2;
    camera.right = (f * aspect) / 2;
    camera.top = f / 2;
    camera.bottom = -f / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  function updateCamera() {
    const dir = ISO_DIR.clone().lerp(FRONT_DIR, viewBlend).normalize();
    camera.position.copy(dir).multiplyScalar(20);
    camera.lookAt(0, CENTER_Y, 0);
    camera.updateMatrixWorld();
  }

  // seed frustum from actual host height before first paint
  {
    const { h: h0 } = hostSize();
    const { far } = hostFit(h0);
    frustum = CONTENT_H / far;
  }
  layoutCamera();
  updateCamera();

  // ---------------------------------------------------------------------------
  // Lights
  // ---------------------------------------------------------------------------

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

  const chassisFaceMats = () => [
    faceMat(0x1b1b22),
    faceMat(0x0e0e12),
    faceMat(0x2c2c36),
    faceMat(0x0a0a0d),
    faceMat(0x23232a),
    faceMat(0x0e0e12),
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
  // Textures
  // ---------------------------------------------------------------------------

  const texLoader = new THREE.TextureLoader();
  function loadTex(url) {
    const t = texLoader.load(url);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }

  const logoTexture = loadTex(`${assetBase}/logo-17track.png`);

  // ---------------------------------------------------------------------------
  // Server stack
  // ---------------------------------------------------------------------------

  const stack = new THREE.Group();
  stack.position.y = -1.15;
  scene.add(stack);

  function makeServer({
    w,
    h,
    d,
    baseY,
    explodeDir,
    withLogo = false,
    topVents = false,
  }) {
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

    const details = [];
    const faceZ = d / 2 + 0.001;
    const faceY0 = h * 0.22;
    const faceY1 = h * 0.78;
    const slotCount = 5;
    for (let i = 0; i < slotCount; i++) {
      const y = faceY0 + (i / (slotCount - 1)) * (faceY1 - faceY0);
      details.push(
        new THREE.Vector3(-w / 2 + 0.1, y, faceZ),
        new THREE.Vector3(-w / 2 + w * 0.13, y, faceZ)
      );
    }
    details.push(
      new THREE.Vector3(w / 2 - w * 0.28, faceY0, faceZ),
      new THREE.Vector3(w / 2 - w * 0.28, faceY1, faceZ)
    );
    const detailLines = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(details),
      detailMat
    );
    detailLines.renderOrder = 9;
    group.add(detailLines);

    // top-face exhaust grilles (sparse) — upper server only
    if (topVents) {
      const topY = h + 0.0015;
      const ventMat = faceMat(0x0c0c12);
      const ventEdgeMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2,
      });
      // one bank, rear half — few long slots, not a dense mesh
      const x0 = -w * 0.36;
      const x1 = w * 0.36;
      const z0 = -d * 0.32;
      const z1 = -d * 0.02;
      const rows = 3;
      const cols = 4;
      const ventLines = [];
      for (let r = 0; r < rows; r++) {
        const z = z0 + ((r + 0.5) / rows) * (z1 - z0);
        for (let c = 0; c < cols; c++) {
          const slotW = ((x1 - x0) / cols) * 0.62;
          const slotD = ((z1 - z0) / rows) * 0.42;
          const cx = x0 + ((c + 0.5) / cols) * (x1 - x0);
          const slot = new THREE.Mesh(
            new THREE.BoxGeometry(slotW, 0.016, slotD),
            ventMat
          );
          slot.position.set(cx, topY, z);
          slot.renderOrder = 8;
          group.add(slot);
          const hw = slotW * 0.46;
          ventLines.push(
            new THREE.Vector3(cx - hw, topY + 0.01, z),
            new THREE.Vector3(cx + hw, topY + 0.01, z)
          );
        }
      }
      // light frame
      const frame = [
        [x0, z0],
        [x1, z0],
        [x1, z1],
        [x0, z1],
        [x0, z0],
      ];
      for (let i = 0; i < 4; i++) {
        ventLines.push(
          new THREE.Vector3(frame[i][0], topY + 0.012, frame[i][1]),
          new THREE.Vector3(frame[i + 1][0], topY + 0.012, frame[i + 1][1])
        );
      }
      const ventLineMesh = new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(ventLines),
        ventEdgeMat
      );
      ventLineMesh.renderOrder = 9;
      group.add(ventLineMesh);
    }

    if (withLogo) {
      const logoW = w * 0.26;
      const logo = new THREE.Mesh(
        new THREE.PlaneGeometry(logoW, logoW * (240 / 1500)),
        new THREE.MeshBasicMaterial({
          map: logoTexture,
          transparent: true,
          toneMapped: false,
        })
      );
      logo.position.set(-w * 0.1, h / 2, d / 2 + 0.004);
      logo.renderOrder = 11;
      group.add(logo);
    }

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

    // top-left corner status LEDs (blink) — upper server
    if (topVents) {
      const topY = h + 0.012;
      const topLedDefs = [
        { color: 0x2bff88, mode: "blink", speed: 1.6 },
        { color: 0x7dd3fc, mode: "blink", speed: 2.4 },
      ];
      topLedDefs.forEach((def, i) => {
        const mat = new THREE.MeshBasicMaterial({ color: def.color });
        const led = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.022, 0.07), mat);
        // front-left of top face (from iso view = "top-left corner")
        led.position.set(-w * 0.38 + i * 0.12, topY, d * 0.32);
        led.renderOrder = 12;
        group.add(led);
        leds.push({ mat, def, seed: Math.random() * 10 });
      });
    }

    stack.add(group);
    return { group, baseY, explodeDir, leds, w, h, d };
  }

  const servers = [
    makeServer({ w: 3.3, h: 0.5, d: 2.5, baseY: -0.3, explodeDir: -0.22 }),
    makeServer({
      w: 2.95,
      h: 0.45,
      d: 2.25,
      baseY: 0.3,
      explodeDir: 0.14,
      withLogo: true,
      topVents: true,
    }),
  ];

  // ---------------------------------------------------------------------------
  // Dial
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
        new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius)
      );
    }
    return new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(pts),
      edgeMat
    );
  }

  const dialOuter = new THREE.Group();
  dialOuter.add(dialRing(3.3, 120, 10, 0.22, 0.1));
  dial.add(dialOuter);

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
      })
    )
  );

  // ---------------------------------------------------------------------------
  // Carriers
  // ---------------------------------------------------------------------------

  const CARRIERS = ["usps", "ups", "dhl", "gls", "dpd"];
  const carrierOrbit = new THREE.Group();
  carrierOrbit.position.y = -0.55;
  scene.add(carrierOrbit);
  const ORBIT_R = 3.0;

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

    const blurTex = makeBlurredTextures(`${assetBase}/carrier-${name}.png`);
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
  // Terminal (canvas texture + typewriter + border beam)
  // ---------------------------------------------------------------------------

  const TW = 680;
  const TH = 520;
  const termCanvas = document.createElement("canvas");
  termCanvas.width = TW;
  termCanvas.height = TH;
  const tctx = termCanvas.getContext("2d");
  const termTexture = new THREE.CanvasTexture(termCanvas);
  termTexture.colorSpace = THREE.SRGBColorSpace;
  termTexture.anisotropy = 4;

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
    {
      text: "✓ accepted 1 · rejected 1 — webhook TRACKING_UPDATED armed",
      cls: "ok",
    },
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

  let termProgress = 0;
  let termDone = false;
  let termDoneAt = 0;

  function drawTerminal() {
    tctx.clearRect(0, 0, TW, TH);

    tctx.beginPath();
    tctx.roundRect(0, 0, TW, TH, 16);
    tctx.fillStyle = "rgba(20,20,26,0.72)";
    tctx.fill();

    // soft ambient glass sheen (no hard diagonal that reads as a “cut”)
    const sheen = tctx.createLinearGradient(0, 0, TW * 0.85, TH);
    sheen.addColorStop(0, "rgba(255,255,255,0.07)");
    sheen.addColorStop(0.45, "rgba(255,255,255,0.02)");
    sheen.addColorStop(1, "rgba(255,255,255,0)");
    tctx.save();
    tctx.beginPath();
    tctx.roundRect(0, 0, TW, TH, 16);
    tctx.clip();
    tctx.fillStyle = sheen;
    tctx.fillRect(0, 0, TW, TH);

    // —— tilted glass sweep (scroll-driven) ——
    // Soft diagonal blade via rotate(); no stroke, no hard “slice” across the panel.
    {
      const p = Math.max(0, Math.min(1, progress));
      // / diagonal on screen (top-right → bottom-left)
      const angle = (28 * Math.PI) / 180;
      const bandW = TW * 0.16;
      const bandH = Math.hypot(TW, TH) * 1.5;
      // path along the long diagonal of the panel
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);
      const span = Math.hypot(TW, TH) + bandW * 2.2;
      const along = -span * 0.4 + span * p;
      const cx = TW * 0.5 + dirX * (along - span * 0.15);
      const cy = TH * 0.5 + dirY * (along - span * 0.15);

      tctx.save();
      tctx.translate(cx, cy);
      tctx.rotate(angle);
      tctx.globalCompositeOperation = "screen";
      // trail (−x) → soft peak → transparent past leading edge
      const g = tctx.createLinearGradient(-bandW * 0.55, 0, bandW * 0.55, 0);
      g.addColorStop(0.0, "rgba(150, 195, 255, 0)");
      g.addColorStop(0.5, "rgba(140, 185, 250, 0.03)");
      g.addColorStop(0.82, "rgba(165, 200, 255, 0.07)");
      g.addColorStop(0.94, "rgba(185, 215, 255, 0.1)");
      g.addColorStop(1.0, "rgba(210, 230, 255, 0)");
      tctx.fillStyle = g;
      tctx.fillRect(-bandW * 0.55, -bandH * 0.5, bandW * 1.1, bandH);
      tctx.globalCompositeOperation = "source-over";
      tctx.restore();
    }

    tctx.restore();

    const barH = 46;
    tctx.beginPath();
    tctx.roundRect(0, 0, TW, barH, [16, 16, 0, 0]);
    tctx.fillStyle = "rgba(255,255,255,0.07)";
    tctx.fill();
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

    if (Math.floor(performance.now() / 500) % 2 === 0) {
      tctx.fillStyle = "#e6e6ea";
      tctx.fillRect(x + 2, y + 2, 8, 15);
    }

    termTexture.needsUpdate = true;
  }

  function stepTerminal(dt, t) {
    if (!termDone) {
      termProgress += dt * 52;
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

  const terminalGroup = new THREE.Group();
  scene.add(terminalGroup);

  const PANEL_W = 4.15;
  const PANEL_H = (TH / TW) * PANEL_W;
  const PANEL_R = 0.14;

  function roundedRectPoints(w, h, r, segPerCorner = 8) {
    const hw = w / 2;
    const hh = h / 2;
    const pts = [];
    const corners = [
      [hw - r, hh - r, 0],
      [-hw + r, hh - r, 90],
      [-hw + r, -hh + r, 180],
      [hw - r, -hh + r, 270],
    ];
    corners.forEach(([cx, cy, startDeg]) => {
      for (let i = 0; i <= segPerCorner; i++) {
        const a = ((startDeg + (i / segPerCorner) * 90) * Math.PI) / 180;
        pts.push(new THREE.Vector3(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0));
      }
    });
    pts.push(pts[0].clone());
    return pts;
  }

  const panel = new THREE.Mesh(
    new THREE.PlaneGeometry(PANEL_W, PANEL_H),
    new THREE.MeshBasicMaterial({
      map: termTexture,
      transparent: true,
      toneMapped: false,
    })
  );
  terminalGroup.add(panel);

  const borderPts = roundedRectPoints(PANEL_W, PANEL_H, PANEL_R);
  terminalGroup.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(borderPts),
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.28,
      })
    )
  );

  // ---------------------------------------------------------------------------
  // Front-view callouts — 2D canvas overlay
  // Long polylines grow with scroll; labels appear after line completes.
  // Themes from api.17track.net/en/doc: Register · Webhook · Track
  // ---------------------------------------------------------------------------

  // Callout layer may extend past the 3D host on the right — but only into the
  // free gap before .api-s2-copy (never over the title/bullets).
  const CALLOUT_RIGHT_MAX = 200;
  const calloutCanvas = document.createElement("canvas");
  calloutCanvas.className = "api-iso-callouts";
  calloutCanvas.setAttribute("aria-hidden", "true");
  calloutCanvas.style.cssText = [
    "position:absolute",
    "top:0",
    "left:0",
    "height:100%",
    "display:block",
    "pointer-events:none",
    "z-index:2",
  ].join(";");
  host.appendChild(calloutCanvas);
  host.style.overflow = "visible";
  const hostVisual = host.closest(".api-s2-visual");
  if (hostVisual) hostVisual.style.overflow = "visible";
  const cctx = calloutCanvas.getContext("2d");

  const _proj = new THREE.Vector3();
  const _anchW = new THREE.Vector3();

  /** px of free space between host right edge and the copy column (or stage edge) */
  function measureRightRoom() {
    const hostRect = host.getBoundingClientRect();
    const section = document.getElementById("use-cases");
    const copy =
      section?.querySelector(".api-s2-copy") ||
      document.querySelector("#use-cases .api-s2-copy");
    if (copy) {
      const cr = copy.getBoundingClientRect();
      // stay clear of the copy column
      return Math.max(0, cr.left - hostRect.right - 20);
    }
    const line = host.closest(".api-s2-line");
    if (line) {
      const lr = line.getBoundingClientRect();
      return Math.max(0, lr.right - hostRect.right - 24);
    }
    return 48;
  }

  function rightExt() {
    return Math.min(CALLOUT_RIGHT_MAX, measureRightRoom());
  }

  function projectToCanvas(worldVec, out) {
    _proj.copy(worldVec).project(camera);
    // project into the WebGL host rect (not the extended callout width)
    const { w, h } = hostSize();
    out.x = (_proj.x * 0.5 + 0.5) * w;
    out.y = (-_proj.y * 0.5 + 0.5) * h;
    out.visible = _proj.z > -1 && _proj.z < 1;
    return out;
  }

  /** Full paint surface (host + safe right extension) */
  function calloutSize() {
    const { w, h } = hostSize();
    return { w: w + rightExt(), h };
  }

  const PILL_FONT =
    "600 12.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  const PILL_PAD_X = 13;
  const PILL_PAD_Y = 6.5;
  const PILL_GAP = 8; // gap between pill and polyline join
  const EDGE_PAD = 12; // keep pills fully inside canvas

  function measurePill(ctx, text) {
    ctx.font = PILL_FONT;
    const tw = ctx.measureText(text).width;
    return {
      bw: tw + PILL_PAD_X * 2,
      bh: 12.5 + PILL_PAD_Y * 2,
    };
  }

  /**
   * One-fold polyline (3 points), grown **anchor → outward → label**.
   *
   * flat=0: pure diagonal (slanted)
   * flat=1: obtuse bend (钝角) — NOT a 90° L:
   *   ● anchor ──diagonal── elbow ────horizontal──── label
   * Elbow is partway toward the label in X, at label Y → open obtuse turn.
   *
   * edgeOut: 0..1 how hard to pin the pill to the outer edge (Track ≈ 1).
   * rightExtra: extra px past the 3D host for far-right labels (Track).
   */
  function buildCalloutGeometry(
    anchor,
    side,
    yBias,
    flat,
    text,
    edgeOut = 0,
    rightExtra = 0
  ) {
    const { h } = hostSize();
    const { w: hostW } = hostSize();
    const w = hostW + Math.max(0, rightExtra);
    const { bw, bh } = measurePill(cctx, text);

    // label vertical: enough offset for a visible bend
    const labelY = Math.min(
      h - EDGE_PAD - bh / 2,
      Math.max(EDGE_PAD + bh / 2, anchor.y + yBias)
    );

    // pin pill to edge; edgeOut + rightExtra push Track further right
    const edge = Math.max(4, EDGE_PAD * (1 - edgeOut * 0.75));
    let pillX;
    let joinX;
    if (side === "left") {
      pillX = edge;
      joinX = pillX + bw + PILL_GAP;
    } else {
      pillX = w - edge - bw;
      joinX = pillX - PILL_GAP;
    }

    // path: anchor (inside) → elbow → label join (outside)
    const p0 = { x: anchor.x, y: anchor.y };
    const p2 = { x: joinX, y: labelY };

    // obtuse fold: first leg diagonal, second nearly horizontal
    const obtuseT = 0.38;
    const elbowFlat = {
      x: p0.x + (p2.x - p0.x) * obtuseT,
      y: p2.y,
    };
    const elbowDiag = {
      x: p0.x + (p2.x - p0.x) * 0.5,
      y: p0.y + (p2.y - p0.y) * 0.5,
    };
    const f = Math.max(0, Math.min(1, flat));
    const elbow = {
      x: elbowDiag.x + (elbowFlat.x - elbowDiag.x) * f,
      y: elbowDiag.y + (elbowFlat.y - elbowDiag.y) * f,
    };

    return {
      poly: [p0, elbow, p2],
      pill: { x: pillX, y: labelY - bh / 2, bw, bh, cy: labelY },
    };
  }

  function pathLength(pts) {
    let len = 0;
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i].x - pts[i - 1].x;
      const dy = pts[i].y - pts[i - 1].y;
      len += Math.hypot(dx, dy);
    }
    return len;
  }

  /** Sample polyline up to fraction t ∈ [0,1] */
  function samplePath(pts, t) {
    if (t <= 0) return [pts[0]];
    if (t >= 1) return pts.slice();
    const total = pathLength(pts);
    let remain = total * t;
    const out = [{ x: pts[0].x, y: pts[0].y }];
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i].x - pts[i - 1].x;
      const dy = pts[i].y - pts[i - 1].y;
      const seg = Math.hypot(dx, dy) || 1e-6;
      if (remain >= seg) {
        out.push({ x: pts[i].x, y: pts[i].y });
        remain -= seg;
      } else {
        const u = remain / seg;
        out.push({
          x: pts[i - 1].x + dx * u,
          y: pts[i - 1].y + dy * u,
        });
        break;
      }
    }
    return out;
  }

  function drawPillBox(ctx, text, pill, alpha) {
    if (alpha < 0.02) return;
    const { x: bx, y: by, bw, bh, cy } = pill;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = PILL_FONT;
    const r = bh / 2;
    ctx.beginPath();
    ctx.moveTo(bx + r, by);
    ctx.arcTo(bx + bw, by, bx + bw, by + bh, r);
    ctx.arcTo(bx + bw, by + bh, bx, by + bh, r);
    ctx.arcTo(bx, by + bh, bx, by, r);
    ctx.arcTo(bx, by, bx + bw, by, r);
    ctx.closePath();
    ctx.fillStyle = "rgba(14,16,22,0.82)";
    ctx.fill();
    ctx.strokeStyle = "rgba(200, 205, 215, 0.26)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "rgba(232, 235, 242, 0.9)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, bx + bw / 2, cy + 0.5);
    ctx.restore();
  }

  function drawPolylineGrowing(ctx, pts, t, alpha) {
    if (t < 0.01 || alpha < 0.02) return;
    // pts ordered anchor → outward; samplePath grows from inside out
    const drawn = samplePath(pts, t);
    if (drawn.length < 2) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = "rgba(200, 206, 218, 0.38)";
    ctx.lineWidth = 1.1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round"; // soft obtuse corner
    ctx.beginPath();
    ctx.moveTo(drawn[0].x, drawn[0].y);
    for (let i = 1; i < drawn.length; i++) {
      ctx.lineTo(drawn[i].x, drawn[i].y);
    }
    ctx.stroke();
    // origin dot at anchor (inside)
    ctx.beginPath();
    ctx.arc(pts[0].x, pts[0].y, 2.1, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(215, 220, 230, 0.5)";
    ctx.fill();
    // growing tip
    if (t < 0.98) {
      const tip = drawn[drawn.length - 1];
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(200, 205, 215, 0.35)";
      ctx.fill();
    }
    ctx.restore();
  }

  // Register → terminal · Webhook → upper top (left)
  // Track → lower server TOP (right), label only as far as the copy gap allows
  const callouts = [
    {
      word: "Register",
      side: "right",
      // yBias resolved per-frame via yBiasFor()
      yBiasFor: (hostH) => (hostH < 560 ? -22 : hostH < 720 ? -30 : -36),
      edgeOut: 0.15,
      useRightExt: false,
      getWorldAnchor() {
        terminalGroup.getWorldPosition(_anchW);
        _anchW.y += 0.05;
        _anchW.x += PANEL_W * 0.48 * terminalGroup.scale.x;
        _anchW.z += 0.06;
        return _anchW;
      },
    },
    {
      word: "Webhook",
      side: "left",
      yBiasFor: (hostH) => (hostH < 560 ? -24 : hostH < 720 ? -34 : -40),
      edgeOut: 0,
      useRightExt: false,
      getWorldAnchor() {
        // top face of upper server, left side
        servers[1].group.getWorldPosition(_anchW);
        _anchW.y += servers[1].h + 0.02;
        _anchW.x -= servers[1].w * 0.28;
        _anchW.z += servers[1].d * 0.22;
        return _anchW;
      },
    },
    {
      word: "Track",
      side: "right",
      // keep label near lower stack band — below copy bullets on tall screens
      yBiasFor: (hostH) => (hostH < 560 ? 18 : hostH < 720 ? 28 : 36),
      edgeOut: 1,
      useRightExt: true, // only into measured gap before copy
      getWorldAnchor() {
        // START on TOP of the lower server (right side of top plate)
        servers[0].group.getWorldPosition(_anchW);
        _anchW.y += servers[0].h + 0.03;
        _anchW.x += servers[0].w * 0.28;
        _anchW.z += servers[0].d * 0.2;
        return _anchW;
      },
    },
  ];

  let calloutReveal = 0;
  const _scr = { x: 0, y: 0, visible: true };

  function resizeCalloutCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { w, h } = calloutSize();
    const pw = Math.max(2, Math.floor(w * dpr));
    const ph = Math.max(2, Math.floor(h * dpr));
    if (calloutCanvas.width !== pw || calloutCanvas.height !== ph) {
      calloutCanvas.width = pw;
      calloutCanvas.height = ph;
    }
    // keep CSS width in sync with measured room (varies with layout)
    calloutCanvas.style.width = `${w}px`;
    cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawCallouts(reveal) {
    calloutReveal = reveal;
    resizeCalloutCanvas();
    const { w, h } = calloutSize();
    const { w: hostW, h: hostH } = hostSize();
    const ext = rightExt();
    cctx.clearRect(0, 0, w, h);
    if (reveal < 0.01) return;

    callouts.forEach((c, i) => {
      const t0 = 0.06 + i * 0.16;
      const t1 = 0.48 + i * 0.14;
      const grow = smoothstep(t0, t1, reveal);
      if (grow < 0.01) return;

      // diagonal first, then settle into obtuse fold
      const flat = smoothstep(0.2, 0.9, grow);

      const world = c.getWorldAnchor();
      projectToCanvas(world, _scr);
      if (!_scr.visible) return;

      // clamp anchor inside the 3D host (not the extended strip)
      const ax = Math.min(hostW - 10, Math.max(10, _scr.x));
      const ay = Math.min(h - 10, Math.max(10, _scr.y));
      const yBias =
        typeof c.yBiasFor === "function" ? c.yBiasFor(hostH) : c.yBias || 0;
      const rightExtra = c.useRightExt ? ext : 0;
      const { poly, pill } = buildCalloutGeometry(
        { x: ax, y: ay },
        c.side,
        yBias,
        flat,
        c.word,
        c.edgeOut || 0,
        rightExtra
      );

      // hard clamp: never paint a right-side pill into the copy column
      if (c.side === "right") {
        const maxRight = hostW + ext - 2;
        if (pill.x + pill.bw > maxRight) {
          pill.x = maxRight - pill.bw;
          // keep stroke end at the pill's inner edge
          poly[2].x = pill.x - PILL_GAP;
          poly[1].x = poly[0].x + (poly[2].x - poly[0].x) * 0.38;
          poly[1].y = poly[2].y;
        }
      }

      drawPolylineGrowing(cctx, poly, grow, 0.32 + grow * 0.4);

      // label appears as the stroke reaches the outer end
      const labelA = smoothstep(0.72, 0.98, grow);
      drawPillBox(cctx, c.word, pill, labelA * 0.95);
    });
  }

  // ---------------------------------------------------------------------------
  // Progress
  // ---------------------------------------------------------------------------

  const smoothstep = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };

  function applyProgress(p) {
    const local = smoothstep(0.15, 0.75, p);
    servers.forEach((server) => {
      server.group.position.y = server.baseY + server.explodeDir * local;
    });
    // keep stack near 1 — do not let terminal dwarfing force stack scale
    stack.scale.setScalar(1 + local * 0.04);

    carrierOrbit.rotation.y = p * Math.PI * 3.2;

    const dialSplit = smoothstep(0.1, 0.7, p);
    dialOuter.position.y = -dialSplit * 0.55;
    dialInnerGroup.position.y = dialSplit * 0.45;

    const power = smoothstep(0.05, 0.6, p);
    ambient.intensity = 0.06 + power * 0.24;
    spot.intensity = 4 + power * 38;
    fill.intensity = 0.08 + power * 0.4;
    bounce.intensity = 0.4 + power * 2.2;

    viewBlend = smoothstep(0.35, 0.95, p);

    // camera fill does most of the "size" work; terminal only grows a little
    const { h: hostH } = hostSize();
    const { far: fitFar, near: fitNear } = hostFit(hostH);
    const maxTermScale =
      hostH < 480 ? 1.04 : hostH < 600 ? 1.08 : hostH < 740 ? 1.12 : 1.14;
    const termGrow = smoothstep(0.12, 0.75, p);
    const termScale = 1 + termGrow * (maxTermScale - 1);
    terminalGroup.scale.setScalar(termScale);
    // keep terminal just above stack; composition center handles framing
    const baseY0 = hostH < 480 ? 2.05 : hostH < 600 ? 2.15 : 2.25;
    terminalGroup.userData.baseY = baseY0 + termGrow * 0.08;

    const zoom = smoothstep(0.0, 0.85, p);
    const newFrustum = CONTENT_H / (fitFar + (fitNear - fitFar) * zoom);
    if (Math.abs(newFrustum - frustum) > 0.001) {
      frustum = newFrustum;
      layoutCamera();
    }

    // callouts: gate opens in front view; line growth drawn in drawCallouts
    calloutReveal = smoothstep(0.52, 0.92, p);

    stack.rotation.y = 0;
  }

  function setProgress(p) {
    targetProgress = Math.max(0, Math.min(1, p));
  }

  // ---------------------------------------------------------------------------
  // Loop
  // ---------------------------------------------------------------------------

  const clock = new THREE.Clock();
  let lastT = 0;

  function animate() {
    if (disposed) return;
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const dt = Math.min(0.1, t - lastT);
    lastT = t;

    progress += (targetProgress - progress) * 0.09;
    applyProgress(progress);
    updateCamera();

    servers.forEach((server) => {
      server.group.position.y += Math.sin(t * 1.1) * 0.012;
    });
    stack.rotation.y = Math.sin(t * 0.18) * 0.04 * (1 - viewBlend);

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

    dial.rotation.y = t * 0.08;
    dialInner.rotation.y = -t * 0.2;

    const camYaw = Math.atan2(
      ISO_DIR.x + (FRONT_DIR.x - ISO_DIR.x) * viewBlend,
      ISO_DIR.z + (FRONT_DIR.z - ISO_DIR.z) * viewBlend
    );
    carrierPlanes.forEach(({ pivot, logo, blurTex }, i) => {
      logo.position.y = Math.sin(t * 1.3 + i * 1.26) * 0.08;
      const worldYaw = pivot.rotation.y + carrierOrbit.rotation.y;
      logo.rotation.y = camYaw - worldYaw;

      const camDirX = camera.position.x;
      const camDirZ = camera.position.z;
      const camLen = Math.hypot(camDirX, camDirZ) || 1;
      const nx = camDirX / camLen;
      const nz = camDirZ / camLen;
      const lx = Math.cos(worldYaw);
      const lz = -Math.sin(worldYaw);
      const depth = lx * nx + lz * nz;
      const tier = depth > 0.35 ? 0 : depth > -0.35 ? 1 : 2;
      if (tier !== carrierPlanes[i].blurIdx) {
        carrierPlanes[i].blurIdx = tier;
        logo.material.map = blurTex[tier];
        logo.material.needsUpdate = true;
      }
      logo.material.opacity = 0.55 + 0.45 * ((depth + 1) / 2);
    });

    const termY =
      (terminalGroup.userData.baseY != null ? terminalGroup.userData.baseY : 2.4) +
      Math.sin(t * 0.9) * 0.05;
    terminalGroup.position.set(0, termY, 0.45);
    terminalGroup.rotation.set(-0.28 * (1 - viewBlend), 0, 0);

    stepTerminal(dt, t);
    drawTerminal();

    renderer.render(scene, camera);
    // 2D callouts after 3D (project current frame anchors)
    drawCallouts(calloutReveal);
  }

  const ro = new ResizeObserver(() => {
    if (!disposed) {
      layoutCamera();
      updateCamera();
    }
  });
  ro.observe(host);

  setProgress(0.15);
  raf = requestAnimationFrame(animate);
  opts.onReady?.();

  return {
    canvas: renderer.domElement,
    setProgress,
    resize() {
      layoutCamera();
      updateCamera();
    },
    destroy() {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        }
      });
      termTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      if (calloutCanvas.parentNode) {
        calloutCanvas.parentNode.removeChild(calloutCanvas);
      }
    },
  };
}

export function mount() {
  return () => {};
}
