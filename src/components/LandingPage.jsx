import Topbar from "./layout/Topbar.jsx";
import Footer from "./layout/Footer.jsx";
import ProductDock from "./layout/ProductDock.jsx";
import Hero from "./sections/Hero.jsx";
import TrustBand from "./sections/TrustBand.jsx";
import UseCases from "./sections/UseCases.jsx";
import HowItWorks from "./sections/HowItWorks.jsx";
import DataOperations from "./sections/DataOperations.jsx";
import Applications from "./sections/Applications.jsx";
import ExploreMore from "./sections/ExploreMore.jsx";
import BottomCta from "./sections/BottomCta.jsx";
import { useEffect } from "react";
import { useLandingEffects } from "../fx/useLandingEffects.js";

/**
 * Tracking API landing — section order & copy match 17track.net/en/api.
 * Shared chrome: Topbar / Footer / ProductDock (+ liquid-glass FX).
 */
export default function LandingPage() {
  useEffect(() => {
    document.documentElement.classList.add("glass-mode-liquid");
  }, []);
  useLandingEffects();

  return (
    <div className="glass-shell api-page">
      <div className="page" id="glass-content">
        <Topbar />
        <main>
          <Hero />
          <TrustBand />
          <UseCases />
          <HowItWorks />
          <DataOperations />
          <Applications />
          {/* Cross-sell: Returns + Tracking (no API self-promo) */}
          <ExploreMore />
          <BottomCta />
        </main>
        <Footer />
      </div>
      <canvas id="glass-source" aria-hidden="true" />
      <canvas id="glass-output" aria-hidden="true" />
      {/* ProductDock hidden for now — Park 2026-08-24 */}
    </div>
  );
}
