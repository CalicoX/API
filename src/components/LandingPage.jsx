import Topbar from "./layout/Topbar.jsx";
import Footer from "./layout/Footer.jsx";
import ProductDock from "./layout/ProductDock.jsx";
import Hero from "./sections/Hero.jsx";
import TrustBand from "./sections/TrustBand.jsx";
import BrandsSay from "./sections/BrandsSay.jsx";
import UseCases from "./sections/UseCases.jsx";
import HowItWorks from "./sections/HowItWorks.jsx";
import DataOperations from "./sections/DataOperations.jsx";
import Applications from "./sections/Applications.jsx";
import IntegrationTogether from "./sections/IntegrationTogether.jsx";
import Credentials from "./sections/Credentials.jsx";
import ExploreMore from "./sections/ExploreMore.jsx";
import CoverageBand from "./sections/CoverageBand.jsx";
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
          <BrandsSay />
          <UseCases />
          <HowItWorks />
          <DataOperations />
          <Applications />
          <IntegrationTogether />
          <Credentials />
          {/* Cross-sell: Returns + Tracking (no API self-promo) */}
          <ExploreMore />
          <CoverageBand />
          <BottomCta />
        </main>
        <Footer />
      </div>
      <canvas id="glass-source" aria-hidden="true" />
      <canvas id="glass-output" aria-hidden="true" />
      <ProductDock />
    </div>
  );
}
