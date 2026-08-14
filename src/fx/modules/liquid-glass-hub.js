/**
 * Liquid Glass Hub — terminal as a liquid glass panel
 *
 * Uses the SAME glass shader logic as liquid-glass-prism.html (standalone WebGL2),
 * but the lens shape is a rounded rect matching the terminal panel, and the
 * sampled content is the terminal canvas texture.
 *
 * The panel is rendered by a dedicated WebGL2 canvas overlayed on the Three.js
 * canvas, so the glass effect is pure GPU — no Three.js material hacks.
 *
 * createLiquidGlassHub(host, { assetBase?, onReady? })
 *   .setProgress(0..1)
 *   .resize()
 *   .destroy()
 */
import * as THREE from "three";

const DEFAULT_ASSET_BASE = "/assets/webgl-hub";

// ---------------------------------------------------------------------------
// Glass shader — rounded-rect lens, terminal texture, prism beam background
// ---------------------------------------------------------------------------

const GLASS_VERT = `#version 300 es
layout(location = 0) in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const GLASS_FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform sampler2D uTerm;      // terminal canvas texture
uniform sampler2D uScene;     // three.js scene texture (for background sampling)
uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uPanelCenter;   // CSS px, top-left origin
uniform vec2  uPanelHalf;     // CSS px
uniform float uCorner;        // CSS px
uniform float uRefraction;
uniform float uThickness;
uniform float uAberration;
uniform float uHighlight;
uniform float uHighlightSoftness;
uniform float uLightAngle;    // degrees, y-down
uniform float uSpread;

const float PI = 3.14159265358979;
const float DEG_TO_RAD = 0.017453292519943295;
const float INV_HLEN = 0.4472135954999579;

float ign(vec2 v) {
  return fract(52.9829189 * fract(0.06711056 * v.x + 0.00583715 * v.y));
}

vec3 prismHue2Rgb(float h) {
  float x = fract(h) * 6.0;
  return vec3(
    clamp(abs(x - 3.0) - 1.0, 0.0, 1.0),
    clamp(2.0 - abs(x - 2.0), 0.0, 1.0),
    clamp(2.0 - abs(x - 4.0), 0.0, 1.0)
  );
}

vec4 prismBeam(vec2 uv, vec2 vp, float animTime,
               vec2 position, vec2 splitPosition,
               vec3 beamColor, float beamWidth, float intensity,
               float startFalloff, float endFalloff,
               float spread, float softness, float saturation) {
  float aspect = vp.x / vp.y;
  vec2 pos = vec2(position.x * aspect, position.y);
  vec2 split = vec2(splitPosition.x * aspect, splitPosition.y);
  vec2 rel = vec2(uv.x * aspect, uv.y) - pos;
  vec2 splitRel = split - pos;
  float splitAlong = max(length(splitRel), 0.0001);
  vec2 dir = splitRel / splitAlong;
  vec2 perp = vec2(-dir.y, dir.x);
  float along = dot(rel, dir);
  float across = dot(rel, perp);
  float soft = max(softness, 0.001);
  float raw = along - splitAlong;
  float k = soft * 0.6;
  float past = (raw + sqrt(raw * raw + k * k)) * 0.5;
  float fadeIn = smoothstep(0.0, max(startFalloff, 0.001), along);
  float fadeOut = exp(-past / max(endFalloff, 0.001));
  float longEnv = fadeIn * fadeOut;
  float fanWidth = max(beamWidth + past * spread, 0.001);
  float an = across / fanWidth;
  float profile = exp(-an * an * 2.5);
  float splitSat = smoothstep(splitAlong, splitAlong + soft, along);
  float hue = an * 0.42 + animTime;
  vec3 col = mix(beamColor, prismHue2Rgb(hue), vec3(splitSat * saturation));
  float amt = profile * longEnv;
  return vec4(col * amt * intensity, clamp(amt, 0.0, 1.0));
}

float roundRectSDF(vec2 p, vec2 half_, float r) {
  vec2 q = abs(p) - (half_ - vec2(r));
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 fragPx = gl_FragCoord.xy;
  vec2 uv = fragPx / uResolution;

  // ── background: prism beam + three.js scene ──
  vec3 base = vec3(0.086, 0.090, 0.102);
  vec4 prism = prismBeam(
    uv, uResolution, uTime * 0.04,
    vec2(0.50, -0.10), vec2(0.50, 0.45),
    vec3(1.0), 0.012, 1.35,
    0.10, 0.55, uSpread, 0.16, 0.9
  );
  base += prism.rgb;

  // subtle grid
  vec2 grid = fract(uv * vec2(40.0, 40.0 * uResolution.y / uResolution.x));
  base += vec3(0.03) * smoothstep(0.95, 1.0, max(grid.x, grid.y));

  // three.js content
  vec3 sceneCol = texture(uScene, uv).rgb;
  base += sceneCol;

  // ── glass panel SDF ──
  vec2 p = fragPx - uPanelCenter;
  float sdf = roundRectSDF(p, uPanelHalf, uCorner);

  float aa = 1.5;
  float mask = 1.0 - smoothstep(-aa, 0.0, sdf);
  if (mask < 0.001) {
    // outside panel: film grain on background
    float grain = (ign(fragPx) * 2.0 - 1.0) * 0.05;
    outColor = vec4(base + grain * (1.0 - dot(base, vec3(0.2126, 0.7152, 0.0722))), 1.0);
    return;
  }

  // ── glass optics ──
  float e = 1.5;
  float sdfX = roundRectSDF(p + vec2(e, 0.0), uPanelHalf, uCorner);
  float sdfY = roundRectSDF(p + vec2(0.0, e), uPanelHalf, uCorner);
  vec2 grad = vec2(sdfX - sdf, sdfY - sdf) / e;
  // y-down for lighting
  vec2 gradDown = vec2(grad.x, -grad.y);

  // refraction strength: strong at rim, flat in center
  float depthNorm = clamp(-sdf / max(uThickness * 30.0, 1.0), 0.0, 1.0);
  float refrStrength = (1.0 - depthNorm) * (1.0 - depthNorm);

  float slopeLen = max(length(grad), 0.0001);
  float slopeScale = min(1.0, 12.0 / slopeLen);
  vec2 offset = -grad * slopeScale * uRefraction * 0.15 * refrStrength;

  // sample terminal texture with refraction + chromatic aberration
  vec2 termUV = (fragPx - (uPanelCenter - uPanelHalf)) / (uPanelHalf * 2.0);
  // canvas texture is y-down, WebGL fragCoord is y-up → flip
  termUV.y = 1.0 - termUV.y;
  vec2 rUV = termUV + offset * uAberration * 0.06 / uPanelHalf;
  vec2 bUV = termUV - offset * uAberration * 0.06 / uPanelHalf;
  vec2 gUV = termUV + offset / uPanelHalf;

  vec3 term;
  term.r = texture(uTerm, rUV).r;
  term.g = texture(uTerm, gUV).g;
  term.b = texture(uTerm, bUV).b;
  float termA = texture(uTerm, gUV).a;

  // beam shining through the glass (panel-local)
  vec2 uvDown = vec2(uv.x, 1.0 - uv.y);
  vec4 beam = prismBeam(
    uvDown + offset * 0.01, uResolution, uTime * 0.04,
    vec2(0.50, -0.10), vec2(0.50, 0.45),
    vec3(1.0), 0.010, 1.1,
    0.10, 0.5, uSpread, 0.16, 0.9
  );

  // glass interior: dark tint + beam glow, terminal text on top
  vec3 interior = vec3(0.030, 0.036, 0.055) + beam.rgb * 0.85;
  vec3 col = mix(interior, term, termA);

  // inner edge shading
  col *= 1.0 - refrStrength * 0.18;

  // border highlight
  float w2 = max(uHighlightSoftness * 0.5 * 0.0625, 1.5 / uResolution.y * 1.5);
  float rb2 = clamp(-(sdf - 1.5 / uResolution.y) / w2, 0.0, 1.0) - clamp(-sdf / w2, 0.0, 1.0);
  float lx = cos(uLightAngle * DEG_TO_RAD);
  float ly = sin(uLightAngle * DEG_TO_RAD);
  float lightFacing = clamp(dot(normalize(gradDown + vec2(1e-5)), vec2(lx, ly)) * 0.5 + 0.5, 0.0, 1.0);
  float borderHighlight = rb2 * lightFacing * uHighlight;

  // specular glint
  float nz = 2.0;
  vec3 n = normalize(vec3(gradDown, nz));
  float nDotH = dot(n, normalize(vec3(lx, ly, 2.0)));
  float shininess = exp2(8.0 - uHighlightSoftness * 7.0);
  float spec = pow(clamp(nDotH, 0.0, 1.0), shininess) * uHighlight * (0.35 + refrStrength);

  col += vec3(borderHighlight + spec);

  // blend with background
  vec3 finalCol = mix(base, col, mask);

  // film grain
  float brightness = dot(finalCol, vec3(0.2126, 0.7152, 0.0722));
  float grain = (ign(fragPx) * 2.0 - 1.0) * 0.05;
  finalCol += grain * (1.0 - brightness);

  outColor = vec4(finalCol, 1.0);
}`;

// ---------------------------------------------------------------------------
// Main factory
// ---------------------------------------------------------------------------

export function createLiquidGlassHub(host, opts = {}) {
  if (!host) return null;

  const assetBase = (opts.assetBase || DEFAULT_ASSET_BASE).replace(/\/$/, "");
  let disposed = false;
  let progress = 0;
  let targetProgress = 0;
  let raf = 0;

  // -------------------------------------------------------------------------
  // Glass canvas (fullscreen WebGL2, replaces Three.js canvas visual)
  // -------------------------------------------------------------------------

  const glassCanvas = document.createElement("canvas");
  glassCanvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;";
  host.appendChild(glassCanvas);

  const gl = glassCanvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    premultipliedAlpha: false,
  });

  if (!gl) {
    console.warn("[liquid-glass-hub] WebGL2 not available");
    return null;
  }

  function compileShader(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(sh));
      throw new Error("glass shader compile failed");
    }
    return sh;
  }

  const glassProg = gl.createProgram();
  gl.attachShader(glassProg, compileShader(gl.VERTEX_SHADER, GLASS_VERT));
  gl.attachShader(glassProg, compileShader(gl.FRAGMENT_SHADER, GLASS_FRAG));
  gl.linkProgram(glassProg);
  gl.useProgram(glassProg);

  const glassUniforms = {};
  const uniCount = gl.getProgramParameter(glassProg, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < uniCount; i++) {
    const info = gl.getActiveUniform(glassProg, i);
    glassUniforms[info.name] = gl.getUniformLocation(glassProg, info.name);
  }

  const glassQuad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, glassQuad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  // textures
  const sceneTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, sceneTex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const termTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, termTex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // flip Y when uploading Three.js canvas (WebGL textures expect bottom-left origin)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  // -------------------------------------------------------------------------
  // Three.js scene (rendered to texture, used as background in glass shader)
  // -------------------------------------------------------------------------

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  // do NOT append to host — we render to texture only
  renderer.domElement.style.display = "none";

  const scene = new THREE.Scene();

  const CONTENT_H = 6.85;
  const CENTER_Y = 0.55;
  const FIT_FAR = 0.68;
  let frustum = CONTENT_H / FIT_FAR;

  function hostSize() {
    const r = host.getBoundingClientRect();
    return {
      w: Math.max(2, Math.floor(r.width)),
      h: Math.max(2, Math.floor(r.height)),
    };
  }

  function hostFit(hostH) {
    if (hostH < 420) return { far: 0.5, near: 0.58 };
    if (hostH < 520) return { far: 0.58, near: 0.66 };
    if (hostH < 640) return { far: 0.64, near: 0.72 };
    if (hostH < 780) return { far: 0.68, near: 0.78 };
    return { far: 0.72, near: 0.82 };
  }

  function fitFactors() {
    const { w, h } = hostSize();
    const aspect = w / h;
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

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    glassCanvas.width = Math.round(w * dpr);
    glassCanvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, glassCanvas.width, glassCanvas.height);
  }

  function updateCamera() {
    const dir = ISO_DIR.clone().lerp(FRONT_DIR, viewBlend).normalize();
    camera.position.copy(dir).multiplyScalar(20);
    camera.lookAt(0, CENTER_Y, 0);
    camera.updateMatrixWorld();
  }

  {
    const { h: h0 } = hostSize();
    const { far } = hostFit(h0);
    frustum = CONTENT_H / far;
  }
  layoutCamera();
  updateCamera();

  // -------------------------------------------------------------------------
  // Lights
  // -------------------------------------------------------------------------

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

  // -------------------------------------------------------------------------
  // Materials
  // -------------------------------------------------------------------------

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

  // -------------------------------------------------------------------------
  // Textures
  // -------------------------------------------------------------------------

  const texLoader = new THREE.TextureLoader();
  function loadTex(url) {
    const t = texLoader.load(url);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }

  const logoTexture = loadTex(`${assetBase}/logo-17track.png`);

  // -------------------------------------------------------------------------
  // Server stack
  // -------------------------------------------------------------------------

  const stack = new THREE.Group();
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
    }),
  ];

  // -------------------------------------------------------------------------
  // Dial
  // -------------------------------------------------------------------------

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

  // -------------------------------------------------------------------------
  // Carriers
  // -------------------------------------------------------------------------

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

  // -------------------------------------------------------------------------
  // Terminal canvas (typewriter, drawn to texture for glass shader)
  // -------------------------------------------------------------------------

  const TW = 680;
  const TH = 520;
  const termCanvas = document.createElement("canvas");
  termCanvas.width = TW;
  termCanvas.height = TH;
  const tctx = termCanvas.getContext("2d");

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
    { text: " } ]", cls: "p" },
    { text: "\n  }", cls: "p" },
    { text: "\n}", cls: "p" },
  ];

  const TYPE_COLORS = {
    p: "#e2e8f0",
    w: "#94a3b8",
    s: "#7dd3fc",
    k: "#c084fc",
    n: "#fbbf24",
    c: "#4ade80",
  };

  let typeIdx = 0;
  let typeTimer = 0;
  const TYPE_SPEED = 0.02;

  function drawTerminal() {
    const w = termCanvas.width;
    const h = termCanvas.height;
    tctx.clearRect(0, 0, w, h);

    // translucent dark fill
    tctx.fillStyle = "rgba(8, 10, 16, 0.42)";
    tctx.fillRect(0, 0, w, h);

    // title bar
    tctx.fillStyle = "rgba(255,255,255,0.07)";
    tctx.fillRect(0, 0, w, 36);
    tctx.fillStyle = "#ff5f57";
    tctx.beginPath();
    tctx.arc(18, 18, 5, 0, Math.PI * 2);
    tctx.fill();
    tctx.fillStyle = "#febc2e";
    tctx.beginPath();
    tctx.arc(36, 18, 5, 0, Math.PI * 2);
    tctx.fill();
    tctx.fillStyle = "#28c840";
    tctx.beginPath();
    tctx.arc(54, 18, 5, 0, Math.PI * 2);
    tctx.fill();

    tctx.font = "600 12px ui-monospace, SFMono-Regular, Menlo, monospace";
    tctx.fillStyle = "rgba(255,255,255,0.45)";
    tctx.textAlign = "center";
    tctx.fillText("terminal — api.17track.net", w / 2, 22);
    tctx.textAlign = "left";

    // typewriter
    let y = 60;
    let x = 20;
    const lineH = 20;
    const maxW = w - 40;

    let remaining = typeIdx;
    for (const seg of TERM_SCRIPT) {
      if (remaining <= 0) break;
      const take = Math.min(remaining, seg.text.length);
      const text = seg.text.slice(0, take);
      remaining -= take;

      tctx.fillStyle = TYPE_COLORS[seg.cls] || "#fff";
      tctx.font = "13px ui-monospace, SFMono-Regular, Menlo, monospace";

      for (const ch of text) {
        if (ch === "\n") {
          y += lineH;
          x = 20;
          continue;
        }
        const cw = tctx.measureText(ch).width;
        if (x + cw > maxW) {
          y += lineH;
          x = 20;
        }
        tctx.fillText(ch, x, y);
        x += cw;
      }
    }

    // cursor
    if (Math.floor(performance.now() / 500) % 2 === 0) {
      tctx.fillStyle = "#7dd3fc";
      tctx.fillRect(x, y - 11, 8, 14);
    }
  }

  function stepTerminal(dt) {
    typeTimer += dt;
    const total = TERM_SCRIPT.reduce((a, s) => a + s.text.length, 0);
    while (typeTimer >= TYPE_SPEED && typeIdx < total) {
      typeTimer -= TYPE_SPEED;
      typeIdx++;
    }
  }

  // -------------------------------------------------------------------------
  // Progress / resize
  // -------------------------------------------------------------------------

  function setProgress(p) {
    targetProgress = Math.max(0, Math.min(1, p));
  }

  function resize() {
    layoutCamera();
  }

  const ro = new ResizeObserver(() => {
    layoutCamera();
  });
  ro.observe(host);

  // -------------------------------------------------------------------------
  // Panel rect tracking (CSS pixels, for glass shader)
  // -------------------------------------------------------------------------

  const TERM_W = 3.4;
  const TERM_H = 2.6;
  const termGroup = new THREE.Group();
  scene.add(termGroup);

  // invisible reference plane to get screen-space rect
  const refPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(TERM_W, TERM_H),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  termGroup.add(refPlane);

  const panelRect = { cx: 0, cy: 0, hw: 0, hh: 0, corner: 0 };

  function updatePanelRect() {
    // project panel corners to screen space
    const v = new THREE.Vector3();
    const { w, h } = hostSize();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // get world corners of the reference plane
    refPlane.updateWorldMatrix(true, false);
    const corners = [
      new THREE.Vector3(-TERM_W / 2, -TERM_H / 2, 0),
      new THREE.Vector3(TERM_W / 2, -TERM_H / 2, 0),
      new THREE.Vector3(TERM_W / 2, TERM_H / 2, 0),
      new THREE.Vector3(-TERM_W / 2, TERM_H / 2, 0),
    ].map((c) => c.applyMatrix4(refPlane.matrixWorld));

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    corners.forEach((c) => {
      v.copy(c).project(camera);
      const sx = (v.x * 0.5 + 0.5) * w * dpr;
      const sy = (v.y * 0.5 + 0.5) * h * dpr; // WebGL bottom-left origin
      minX = Math.min(minX, sx);
      maxX = Math.max(maxX, sx);
      minY = Math.min(minY, sy);
      maxY = Math.max(maxY, sy);
    });

    panelRect.cx = (minX + maxX) / 2;
    panelRect.cy = (minY + maxY) / 2;
    panelRect.hw = (maxX - minX) / 2;
    panelRect.hh = (maxY - minY) / 2;
    panelRect.corner = 28 * dpr; // 28 CSS px corner radius
  }

  // -------------------------------------------------------------------------
  // Render loop
  // -------------------------------------------------------------------------

  const clock = new THREE.Clock();
  const smoothstep = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };

  function frame() {
    if (disposed) return;

    const dt = Math.min(clock.getDelta(), 1 / 30);
    const t = clock.elapsedTime;

    progress += (targetProgress - progress) * 0.09;

    // ── scroll-driven choreography ──
    const explode = smoothstep(0.15, 0.75, progress);
    servers.forEach((s) => {
      s.group.position.y = s.baseY + s.explodeDir * explode;
    });
    stack.scale.setScalar(1 + explode * 0.04);
    stack.rotation.y = 0;

    carrierOrbit.rotation.y = progress * Math.PI * 3.2;

    const dialSplit = smoothstep(0.1, 0.7, progress);
    dialOuter.position.y = -dialSplit * 0.55;
    dialInnerGroup.position.y = dialSplit * 0.45;

    const power = smoothstep(0.05, 0.6, progress);
    ambient.intensity = 0.06 + power * 0.24;
    spot.intensity = 4 + power * 38;
    fill.intensity = 0.08 + power * 0.4;
    bounce.intensity = 0.4 + power * 2.2;

    viewBlend = smoothstep(0.15, 0.85, progress);

    const { h: hostH } = hostSize();
    const { far: fitFar, near: fitNear } = hostFit(hostH);
    const zoom = smoothstep(0.0, 0.85, progress);
    const newFrustum = CONTENT_H / (fitFar + (fitNear - fitFar) * zoom);
    if (Math.abs(newFrustum - frustum) > 0.001) {
      frustum = newFrustum;
      layoutCamera();
    }

    // beam subtle life
    const beamT = t * 0.03;
    const spread = 0.55 + Math.sin(t * 0.5) * 0.02;

    // ── LEDs ──
    servers.forEach((s) => {
      s.leds.forEach(({ mat, def, seed }) => {
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

    // ── carriers billboard + blur ──
    const camYaw = Math.atan2(
      ISO_DIR.x + (FRONT_DIR.x - ISO_DIR.x) * viewBlend,
      ISO_DIR.z + (FRONT_DIR.z - ISO_DIR.z) * viewBlend
    );
    carrierPlanes.forEach(({ pivot, logo, blurTex }, i) => {
      const worldYaw = pivot.rotation.y + carrierOrbit.rotation.y;
      logo.rotation.y = camYaw - worldYaw;

      const camLen = Math.hypot(camera.position.x, camera.position.z) || 1;
      const nx = camera.position.x / camLen;
      const nz = camera.position.z / camLen;
      const depth = Math.cos(worldYaw) * nx - Math.sin(worldYaw) * nz;
      const tier = depth > 0.35 ? 0 : depth > -0.35 ? 1 : 2;
      if (tier !== carrierPlanes[i].blurIdx) {
        carrierPlanes[i].blurIdx = tier;
        logo.material.map = blurTex[tier];
        logo.material.needsUpdate = true;
      }
      logo.material.opacity = 0.55 + 0.45 * ((depth + 1) / 2);
    });

    // ── terminal ──
    stepTerminal(dt);
    drawTerminal();

    const maxTermScale =
      hostH < 480 ? 1.04 : hostH < 600 ? 1.08 : hostH < 740 ? 1.12 : 1.14;
    const termGrow = smoothstep(0.12, 0.75, progress);
    termGroup.scale.setScalar(1 + termGrow * (maxTermScale - 1));
    const baseY0 = hostH < 480 ? 2.05 : hostH < 600 ? 2.15 : 2.25;
    const termY = baseY0 + termGrow * 0.08;
    termGroup.position.set(0, termY, 0.45);
    termGroup.rotation.set(0, 0, 0);

    updateCamera();
    updatePanelRect();

    // ── render three.js to texture ──
    renderer.render(scene, camera);

    // ── upload textures to glass shader ──
    // scene: flip Y because Three.js canvas is top-left origin
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, sceneTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, renderer.domElement);

    // terminal: no flip needed, canvas 2D is already y-down
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.bindTexture(gl.TEXTURE_2D, termTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, termCanvas);

    // ── render glass fullscreen ──
    gl.useProgram(glassProg);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, termTex);
    gl.uniform1i(glassUniforms.uTerm, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, sceneTex);
    gl.uniform1i(glassUniforms.uScene, 1);

    gl.uniform2f(glassUniforms.uResolution, glassCanvas.width, glassCanvas.height);
    gl.uniform1f(glassUniforms.uTime, beamT);
    gl.uniform2f(glassUniforms.uPanelCenter, panelRect.cx, panelRect.cy);
    gl.uniform2f(glassUniforms.uPanelHalf, panelRect.hw, panelRect.hh);
    gl.uniform1f(glassUniforms.uCorner, panelRect.corner);
    gl.uniform1f(glassUniforms.uRefraction, 2.5);
    gl.uniform1f(glassUniforms.uThickness, 1.5);
    gl.uniform1f(glassUniforms.uAberration, 1.5);
    gl.uniform1f(glassUniforms.uHighlight, 0.8);
    gl.uniform1f(glassUniforms.uHighlightSoftness, 0.12);
    gl.uniform1f(glassUniforms.uLightAngle, 250);
    gl.uniform1f(glassUniforms.uSpread, spread);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    raf = requestAnimationFrame(frame);
  }

  raf = requestAnimationFrame(frame);

  opts.onReady?.();

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  return {
    setProgress,
    resize,
    destroy() {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      host.removeChild(glassCanvas);
    },
  };
}
