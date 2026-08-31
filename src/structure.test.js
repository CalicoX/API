import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "src");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

describe("API landing structure (gating)", () => {
  it("App mounts LandingPage section tree, not only LegacyLanding", () => {
    const app = read("App.jsx");
    expect(app).toMatch(/LandingPage/);
    expect(app).not.toMatch(/LegacyLanding/);
    expect(app).not.toMatch(/bootstrapLandingFx/);
    expect(app).toMatch(/api-page\.css/);
  });

  it("LandingPage follows 17track API section order", () => {
    const lp = read("components/LandingPage.jsx");
    for (const name of [
      "Topbar",
      "Hero",
      "TrustBand",
      "BrandsSay",
      "UseCases",
      "HowItWorks",
      "DataOperations",
      "Applications",
      "IntegrationTogether",
      "Credentials",
      "ExploreMore",
      "BottomCta",
      "Footer",
      "ProductDock",
    ]) {
      expect(lp).toContain(name);
      const sectionPath =
        name === "Topbar" || name === "Footer" || name === "ProductDock"
          ? `components/layout/${name}.jsx`
          : `components/sections/${name}.jsx`;
      expect(existsSync(join(root, sectionPath))).toBe(true);
    }
    // tracking-only sections must not drive this page
    // (BrandsSay joined 2026-08-28: Park 同步进 API，TrustBand 后白底单排)
    expect(lp).not.toMatch(/ImpactBand|FeaturesSection|AiLab/);
    // Hero then TrustBand; TrustBand then BrandsSay; Credentials then ExploreMore
    expect(lp.indexOf("Hero")).toBeLessThan(lp.indexOf("TrustBand"));
    expect(lp.indexOf("TrustBand")).toBeLessThan(lp.indexOf("BrandsSay"));
    expect(lp.indexOf("BrandsSay")).toBeLessThan(lp.indexOf("UseCases"));
    expect(lp.indexOf("TrustBand")).toBeLessThan(lp.indexOf("UseCases"));
    expect(lp.indexOf("Credentials")).toBeLessThan(lp.indexOf("ExploreMore"));
    expect(lp.indexOf("ExploreMore")).toBeLessThan(lp.indexOf("BottomCta"));
  });

  it("TrustBand is a static two-row logo grid, not a marquee", () => {
    const tb = read("components/sections/TrustBand.jsx");
    expect(tb).toMatch(/logos-row/);
    expect(tb).toMatch(/Trusted by 100,000\+ brands and businesses/);
    expect(tb).not.toMatch(/aria-hidden/);
    expect(tb).not.toMatch(/logos-scroll/);
    expect(tb).not.toMatch(/shopify\.svg|shein\.svg|temu\.svg/i);
    const css = read("styles/landing.css");
    expect(css).toMatch(/\.logos-row \{[\s\S]*?grid-template-columns: repeat\(6/);
    expect(css).toMatch(/\.trust-copy \{[\s\S]*?text-align: center/);
    expect(css).not.toMatch(/@keyframes logos-scroll/);
  });

  it("Hero copy matches 17track API hero", () => {
    const hero = read("components/sections/Hero.jsx");
    expect(hero).toMatch(/International Package Tracking API/);
    expect(hero).toMatch(/Accurate,\s*(<span[^>]*>)?Reliable/);
    expect(hero).toMatch(/Start My Free Trial/);
    expect(hero).toMatch(/No credit card required/);
    expect(hero).toMatch(/className=\"api-s1 hero\"|className=\{?[\"']api-s1 hero/);
  });

  it("Use Cases hub matches webgl-demo layout + exploded scene", () => {
    const visuals = read("components/visuals/ApiDomVisuals.jsx");
    expect(visuals).toMatch(/UseCasesStage/);
    expect(visuals).toMatch(/iso-hub-webgl|createIsoHubWebGL/);
    expect(visuals).toMatch(/api-iso-host|api-hub--webgl/);
    expect(visuals).not.toMatch(/static\.17track\.net/);
    expect(read("fx/modules/iso-hub-webgl.js")).toMatch(/createIsoHubWebGL|three/);
    expect(read("fx/modules/iso-hub-webgl.js")).toMatch(/TERM_SCRIPT|carrierOrbit|setProgress/);
    const uc = read("components/sections/UseCases.jsx");
    expect(uc).toMatch(/UseCasesStage/);
    expect(uc).toMatch(/api-s2-sticky|api-s2-copy|api-s2-line/);
    expect(uc).toMatch(/api-s2-progress|api-uc-progress-fill/);
    expect(uc).toMatch(/Various.*Use Cases|api-s2-title/);
    expect(read("components/sections/Hero.jsx")).not.toMatch(/API_IMG|\.jpg|\.png/);
  });

  it("core content sections use original 17track wording", () => {
    expect(read("components/sections/UseCases.jsx")).toMatch(/One Solution/);
    expect(read("components/sections/HowItWorks.jsx")).toMatch(/How Does the API Work/);
    expect(read("components/sections/DataOperations.jsx")).toMatch(/Data Operation Granularized/);
    expect(read("components/sections/DataOperations.jsx")).toMatch(/9 main \+ 27 sub/);
    expect(read("components/sections/DataOperations.jsx")).toMatch(/api-s4-board/);
    expect(read("components/sections/DataOperations.jsx")).toMatch(/idx: \"01\"/);
    expect(read("components/sections/DataOperations.jsx")).toMatch(/\[\{card\.idx\}\]/);
    expect(read("components/sections/DataOperations.jsx")).not.toMatch(/api-s4-rail|--s4-x|data-s4-dir/);
    const s4 = read("components/sections/DataOperations.jsx");
    expect(s4).not.toMatch(/Contact Us/);
    expect(s4).not.toMatch(/api-s4-cta/);
    expect(s4).not.toMatch(/api-btn-primary/);
    expect(s4).not.toMatch(/onPick|onHold|aria-current/);
    expect(s4).toMatch(/Start My Free Trial/);
    expect(s4).toMatch(/#free-trial/);
    expect(s4).toMatch(/btn-switch/);
    expect(read("components/sections/Applications.jsx")).toMatch(/Logistics Service/);
    expect(read("components/sections/Applications.jsx")).toMatch(/Various Platforms/);
    expect(read("components/sections/IntegrationTogether.jsx")).toMatch(/Land the Integration Together/);
    expect(read("components/sections/IntegrationTogether.jsx")).toMatch(/className=\"api-h2\"/);
    expect(read("components/sections/IntegrationTogether.jsx")).toMatch(/Each plan is valid for 12 months/);
    expect(read("components/sections/IntegrationTogether.jsx")).toMatch(/Get Started/);
    expect(read("components/sections/IntegrationTogether.jsx")).toMatch(/Popular/);
    expect(read("components/sections/IntegrationTogether.jsx")).toMatch(/api-plan-custom/);
    expect(read("components/sections/IntegrationTogether.jsx")).not.toMatch(/is-custom/);
    expect(read("components/sections/IntegrationTogether.jsx")).toMatch(/3,400 carriers supported/);
    expect(read("components/sections/IntegrationTogether.jsx")).toMatch(/Onboard in 4 Steps/);
    expect(read("components/sections/IntegrationTogether.jsx")).toMatch(/All green\? Go live!/);
    expect(read("components/sections/IntegrationTogether.jsx")).toMatch(/IllusOnboardChat/);
    expect(read("components/sections/IntegrationTogether.jsx")).not.toMatch(/api-onboard-well/);
    expect(read("components/sections/IntegrationTogether.jsx")).not.toMatch(/Part6_/);
    expect(read("components/sections/BottomCta.jsx")).toMatch(/Efficient Solution of Value and Possibility/);
    expect(read("components/sections/BottomCta.jsx")).toMatch(/Contact Us/);
    expect(read("components/sections/BottomCta.jsx")).toMatch(/btn-switch/);
    expect(read("components/LandingPage.jsx")).toMatch(/<BottomCta/);
  });

  it("ExploreMore cross-sells Tracking (not API self-promo)", () => {
    const explore = read("components/sections/ExploreMore.jsx");
    expect(explore).toMatch(/17 Order Tracking|explore-card-tracking/);
    expect(explore).toMatch(/17 Returns|explore-card-returns/);
    expect(explore).not.toMatch(/explore-card-api/);
  });

  it("Explore cards stay flat (no 3D board tilt)", () => {
    const fx = read("fx/modules/landing-inline.js");
    expect(fx).not.toMatch(/setTilt|setCardLayers|--rx|--ry|--tz|--layer-x/);
    const css = read("styles/landing.css");
    expect(css).not.toMatch(/\.explore-card \{[\s\S]*?rotateX\(var\(--rx\)\)/);
    expect(css).not.toMatch(/\.explore-grid \{[\s\S]*?perspective:\s*1600px/);
  });

  it("page copy recipes follow tracking-foundation", () => {
    const css = read("styles/api-page.css");
    expect(css).toMatch(/\.api-h1 \{[\s\S]*?font-size: var\(--fs-display\)/);
    expect(css).toMatch(/\.api-h1 \{[\s\S]*?font-weight: 700/);
    expect(css).toMatch(/\.api-h1 \{[\s\S]*?line-height: 1\.1/);
    expect(css).toMatch(/\.api-h2 \{[\s\S]*?font-size: var\(--fs-h2\)/);
    expect(css).toMatch(/\.api-h2 \{[\s\S]*?font-weight: 700/);
    expect(css).toMatch(/\.api-h2 \{[\s\S]*?letter-spacing: var\(--track-title/);
    expect(css).toMatch(/\.api-lead \{[\s\S]*?font-size: clamp\(14px, calc\(12\.92px \+ 0\.3vw\), 17px\)/);
    expect(css).toMatch(/\.api-kicker \{[\s\S]*?letter-spacing: 0\.04em/);
    expect(css).toMatch(/\.api-s3 \{[\s\S]*?padding: var\(--sec-y\) 0/);
    expect(css).toMatch(/\.api-s3-head \{[\s\S]*?max-width: 760px/);
    expect(css).toMatch(/\.api-s3-head \{[\s\S]*?margin: 0 auto var\(--sec-head-gap\)/);
    expect(css).not.toMatch(/\.api-page \.section\.alt\.api-explore \{[\s\S]*?padding-top: 80px/);
  });

  it("useLandingEffects is the primary FX path (dock + deferred)", () => {
    const fx = read("fx/useLandingEffects.js");
    expect(fx).toMatch(/useLandingEffects/);
    expect(fx).toMatch(/mountProductDock/);
    expect(fx).toMatch(/observeVisibility|IntersectionObserver/);
    expect(fx).not.toMatch(/createElement\([\"']script[\"']\)/);
    const boot = read("fx/bootstrapLandingFx.js");
    expect(boot).toMatch(/retired|no-op|useLandingEffects/i);
  });

  it("topbar-on-dark mounts without requiring #ai-lab", () => {
    const fx = read("fx/useLandingEffects.js");
    expect(fx).toMatch(/topbarOnDark|topbar-on-dark/);
    const mod = read("fx/modules/topbar-on-dark.js");
    expect(mod).toMatch(/export function mount\s*\(/);
    expect(mod).toMatch(/topbar-on-dark/);
    expect(mod).toMatch(/api-s5|applications/);
    expect(mod).toMatch(/return function dispose|return \(\)\s*=>/);
  });

  it("Applications CTA is Tracking btn-switch", () => {
    const apps = read("components/sections/Applications.jsx");
    expect(apps).toMatch(/btn-switch/);
    expect(apps).toMatch(/Start My Free Trial/);
    expect(apps).not.toMatch(/api-s5-cta[\s\S]*api-btn-primary/);
    const fx = read("fx/useLandingEffects.js");
    expect(fx).toMatch(/btnSwitch|btn-switch/);
    expect(read("fx/modules/btn-switch.js")).toMatch(/export function mount/);
  });

  it("Data Operations well is white-to-gray, dot grid removed (liquid grain unmounted)", () => {
    const fx = read("fx/useLandingEffects.js");
    expect(fx).not.toMatch(/s4LiquidGrain/);
    const css = read("styles/api-page.css");
    expect(css).toMatch(
      /\.api-s4-well \{[^}]*linear-gradient\(180deg, #ffffff 0%, #f7f8fa 55%, #e9ecf1 100%\)/s,
    );
    expect(css).not.toMatch(/\.api-s4-well::before/);
  });

  it("Applications mounts Returns ROI point-waves background", () => {
    const fx = read("fx/useLandingEffects.js");
    expect(fx).toMatch(/roiPointWaves|roi-point-waves/);
    expect(fx).toMatch(/getElementById\([\"']applications[\"']\)/);
    const waves = read("fx/modules/roi-point-waves.js");
    expect(waves).toMatch(/export function mount/);
    expect(waves).toMatch(/getElementById\([\"']applications[\"']\)/);
    expect(waves).toMatch(/api-s5-waves/);
    expect(waves).toMatch(/Point Waves 1/);
  });

  it("use-cases sticky scroll drives 3D hub progress", () => {
    const fx = read("fx/useLandingEffects.js");
    expect(fx).toMatch(/useCasesScroll|use-cases-scroll/);
    expect(fx).toMatch(/useCasesBg|use-cases-bg-shader/);
    expect(read("fx/modules/use-cases-scroll.js")).toMatch(/export function mount/);
    expect(read("fx/modules/use-cases-scroll.js")).toMatch(/__isoHubWebGL|setProgress/);
    expect(read("fx/modules/iso-hub-webgl.js")).toMatch(/createIsoHubWebGL|three/);
    expect(read("fx/modules/use-cases-bg-shader.js")).toMatch(/export function mount/);
    expect(read("fx/modules/use-cases-bg-shader.js")).toMatch(
      /Fibonacci|particle earth|aLand|uSpin|progPt|particle-earth/
    );
    expect(read("fx/lib/particle-earth.js")).toMatch(
      /Fibonacci|particle earth|aLand|uSpin|progPt/
    );
    expect(read("components/visuals/ApiDomVisuals.jsx")).toMatch(
      /mountCarriersEarth|particle-earth/
    );
    expect(read("components/visuals/ApiDomVisuals.jsx")).not.toMatch(
      /S4_GLOBE_DOTS|api-s4-hub-globe/
    );
    expect(read("components/visuals/ApiDomVisuals.jsx")).toMatch(/api-s4-carriers-earth/);
    expect(read("components/visuals/ApiDomVisuals.jsx")).not.toMatch(/api-s4-carriers-earth-slot/);
    expect(read("fx/lib/particle-earth.js")).toMatch(/half-well|scale: 1\.3|manualVis/);
    expect(read("fx/modules/iso-hub-webgl.js")).toMatch(
      /hard-edge gradient sweep|xLead|createLinearGradient/
    );
    expect(read("components/sections/UseCases.jsx")).toMatch(/use-cases-scroll|api-s2-sticky/);
  });

  it("LandingPage provides glass-source/output canvases for dock FX", () => {
    const land = read("components/LandingPage.jsx");
    expect(land).toMatch(/id=\"glass-source\"/);
    expect(land).toMatch(/id=\"glass-output\"/);
    expect(land).toMatch(/glass-shell/);
    expect(land).toMatch(/api-page/);
    const dock = read("components/layout/ProductDock.jsx");
    expect(dock).toMatch(/product-dock/);
    expect(dock).toMatch(/data-product=\"api\"/);
  });

  it("FX modules export mount() and return a dispose function", () => {
    for (const name of [
      "responsive-fx.js",
      "liquid-glass-dock.js",
      "undertones-shader.js",
      "landing-inline.js",
      "impact-metrics.js",
      "impact-bg-shader.js",
      "use-cases-bg-shader.js",
      "hero-wash-shader.js",
      "s4-liquid-grain.js",
      "bottom-cta-shader.js",
      "thinking-orb.js",
      "ai-title-particles.js",
      "border-beam.js",
      "ai-lab.js",
    ]) {
      const mod = read(`fx/modules/${name}`);
      expect(mod).toMatch(/export function mount\s*\(/);
      expect(mod).toMatch(/return function dispose|return \(\)\s*=>/);
      expect(mod).not.toMatch(/return function dispose\(\)\s*\{\s*\}/);
    }
  });
});
