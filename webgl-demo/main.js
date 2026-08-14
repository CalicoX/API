import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const container = document.getElementById("canvas-container");

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0f);
scene.fog = new THREE.FogExp2(0x0a0a0f, 0.035);

const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.set(0, 1.5, 8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 14;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.6;

// ---------------------------------------------------------------------------
// Lights
// ---------------------------------------------------------------------------

const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
keyLight.position.set(5, 6, 4);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x88aaff, 1.4);
rimLight.position.set(-6, 3, -5);
scene.add(rimLight);

scene.add(new THREE.AmbientLight(0x334, 0.6));

// ---------------------------------------------------------------------------
// Central object — icosahedron with subtle vertex "breathing" animation
// ---------------------------------------------------------------------------

const PALETTES = [
  { color: 0x7dd3fc, emissive: 0x0ea5e9 }, // sky blue
  { color: 0xf0abfc, emissive: 0xc026d3 }, // fuchsia
  { color: 0x86efac, emissive: 0x16a34a }, // green
  { color: 0xfda4af, emissive: 0xe11d48 }, // rose
  { color: 0xfde68a, emissive: 0xd97706 }, // amber
];

let paletteIndex = 0;

const coreMaterial = new THREE.MeshStandardMaterial({
  color: PALETTES[0].color,
  emissive: PALETTES[0].emissive,
  emissiveIntensity: 0.25,
  metalness: 0.85,
  roughness: 0.18,
  flatShading: true,
});

const coreGeometry = new THREE.IcosahedronGeometry(1.4, 1);
const basePositions = coreGeometry.attributes.position.array.slice();

const core = new THREE.Mesh(coreGeometry, coreMaterial);
scene.add(core);

// Wireframe shell around the core
const shell = new THREE.Mesh(
  new THREE.IcosahedronGeometry(2.1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  }),
);
scene.add(shell);

// ---------------------------------------------------------------------------
// Particle field
// ---------------------------------------------------------------------------

const PARTICLE_COUNT = 900;
const positions = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const r = 6 + Math.random() * 10;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  positions[i * 3 + 2] = r * Math.cos(phi);
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3),
);

const particleMaterial = new THREE.PointsMaterial({
  color: 0x88aaff,
  size: 0.035,
  transparent: true,
  opacity: 0.7,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// ---------------------------------------------------------------------------
// Interaction — mouse parallax + click to switch palette
// ---------------------------------------------------------------------------

const pointer = new THREE.Vector2();
window.addEventListener("pointermove", (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

let pointerDownPos = null;
window.addEventListener("pointerdown", (e) => {
  pointerDownPos = { x: e.clientX, y: e.clientY };
});
window.addEventListener("pointerup", (e) => {
  if (!pointerDownPos) return;
  const dx = e.clientX - pointerDownPos.x;
  const dy = e.clientY - pointerDownPos.y;
  // Treat as click (not drag) if the pointer barely moved
  if (Math.hypot(dx, dy) < 6) {
    paletteIndex = (paletteIndex + 1) % PALETTES.length;
    const palette = PALETTES[paletteIndex];
    coreMaterial.color.setHex(palette.color);
    coreMaterial.emissive.setHex(palette.emissive);
    particleMaterial.color.setHex(palette.color);
    rimLight.color.setHex(palette.color);
  }
  pointerDownPos = null;
});

// ---------------------------------------------------------------------------
// Resize
// ---------------------------------------------------------------------------

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------------------------------------------------------------------------
// Animation loop
// ---------------------------------------------------------------------------

const clock = new THREE.Clock();

function animate() {
  const elapsed = clock.getElapsedTime();

  // Breathing vertex displacement on the core
  const pos = coreGeometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const ix = i * 3;
    const bx = basePositions[ix];
    const by = basePositions[ix + 1];
    const bz = basePositions[ix + 2];
    const wave =
      1 + 0.08 * Math.sin(elapsed * 2 + bx * 2.5 + by * 2.5 + bz * 2.5);
    pos.setXYZ(i, bx * wave, by * wave, bz * wave);
  }
  pos.needsUpdate = true;
  coreGeometry.computeVertexNormals();

  core.rotation.y = elapsed * 0.25;
  shell.rotation.y = -elapsed * 0.1;
  shell.rotation.x = elapsed * 0.06;
  particles.rotation.y = elapsed * 0.02;

  // Gentle parallax tilt toward the pointer
  scene.rotation.x += (pointer.y * 0.08 - scene.rotation.x) * 0.05;
  scene.rotation.z += (-pointer.x * 0.05 - scene.rotation.z) * 0.05;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
