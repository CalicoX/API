/**
 * Hero 点阵地球（2026-09-21 Park）：three.js Points 球面点阵，淡蓝、缓慢自转。
 * 挂在 Hero 左列文案后面（.api-s1-hero-globe），浅底上做柔和装饰。
 * 离屏停 rAF；reduce-motion / ≤640 不挂（responsive-fx 的 __reduceFx）。
 */
import * as THREE from "three";

const DOT = 0x7fb2e5; /* 淡蓝，浅底上可见但不抢文案 */
const RADIUS = 1;
const ROWS = 46; /* 纬度采样行数 */
const SPEED = 0.07; /* rad/s，慢自转 */

function buildDots() {
  const pos = [];
  for (let i = 0; i < ROWS; i++) {
    const lat = ((i + 0.5) / ROWS) * Math.PI; /* 0..π，不过极点 */
    const r = Math.sin(lat);
    const y = Math.cos(lat);
    const cols = Math.max(6, Math.round(r * ROWS * 2));
    for (let j = 0; j < cols; j++) {
      const lon = (j / cols) * Math.PI * 2;
      pos.push(RADIUS * r * Math.cos(lon), RADIUS * y, RADIUS * r * Math.sin(lon));
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  return geo;
}

export function mount() {
  const host = document.getElementById("hero-globe");
  if (!host || host.dataset.globeMounted) return () => {};
  host.dataset.globeMounted = "1";

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch (err) {
    console.warn("[fx:hero-globe]", err);
    return () => {};
  }

  const w = host.clientWidth || 560;
  const h = host.clientHeight || 560;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h);
  renderer.domElement.style.display = "block";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 10);
  camera.position.z = 3.1;

  const points = new THREE.Points(
    buildDots(),
    new THREE.PointsMaterial({
      color: DOT,
      size: 0.016,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    })
  );
  scene.add(points);

  let visible = true;
  let raf = 0;
  let last = 0;

  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = last ? Math.min((t - last) / 1000, 0.1) : 0;
    last = t;
    points.rotation.y += SPEED * dt;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function wake() {
    last = 0;
    if (!raf && visible) raf = requestAnimationFrame(frame);
  }

  const io =
    typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(
          (entries) => {
            visible = entries.some((e) => e.isIntersecting);
            if (visible) wake();
            else if (raf) {
              cancelAnimationFrame(raf);
              raf = 0;
            }
          },
          { rootMargin: "80px" }
        )
      : null;
  if (io) io.observe(host);

  const onResize = () => {
    const nw = host.clientWidth || w;
    const nh = host.clientHeight || h;
    if (nw === w && nh === h) return;
    renderer.setSize(nw, nh);
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", onResize, { passive: true });

  wake();

  return function dispose() {
    window.removeEventListener("resize", onResize);
    if (io) io.disconnect();
    if (raf) cancelAnimationFrame(raf);
    points.geometry.dispose();
    points.material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
    delete host.dataset.globeMounted;
  };
}
