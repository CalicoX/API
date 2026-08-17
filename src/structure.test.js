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
      "UseCases",
      "HowItWorks",
      "DataOperations",
      "Applications",
      "BottomCta",
      "ExploreMore",
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
    expect(lp).not.toMatch(/ImpactBand|FeaturesSection|AiLab|BrandsSay|Credentials/);
    // Hero then TrustBand
    expect(lp.indexOf("Hero")).toBeLessThan(lp.indexOf("TrustBand"));
    expect(lp.indexOf("TrustBand")).toBeLessThan(lp.indexOf("UseCases"));
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
    expect(read("components/sections/Applications.jsx")).toMatch(/Logistics Service/);
    expect(read("components/sections/Applications.jsx")).toMatch(/Various Platforms/);
    expect(read("components/sections/BottomCta.jsx")).toMatch(/Efficient Solution of Value and Possibility/);
  });

  it("ExploreMore cross-sells Tracking (not API self-promo)", () => {
    const explore = read("components/sections/ExploreMore.jsx");
    expect(explore).toMatch(/17 Order Tracking|explore-card-tracking/);
    expect(explore).toMatch(/17 Returns|explore-card-returns/);
    expect(explore).not.toMatch(/explore-card-api/);
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
