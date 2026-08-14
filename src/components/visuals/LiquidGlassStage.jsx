/**
 * Liquid Glass Hub stage — drop-in replacement for UseCasesStage.
 * Uses liquid-glass-hub.js (prism beam + glass lens + film grain).
 */

import { useEffect, useRef } from "react";

export function LiquidGlassStage() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let cancelled = false;
    let gl = null;

    import("../../fx/modules/liquid-glass-hub.js").then(({ createLiquidGlassHub }) => {
      if (cancelled || !hostRef.current) return;
      gl = createLiquidGlassHub(hostRef.current, {
        assetBase: "/assets/webgl-hub",
        onReady: () => {
          const section = document.getElementById("use-cases");
          const p = parseFloat(section?.style?.getPropertyValue("--uc-p") || "0.15");
          if (gl) gl.setProgress(Number.isFinite(p) ? Math.max(p, 0.12) : 0.15);
        },
      });
      window.__liquidGlassHub = gl;
    });

    return () => {
      cancelled = true;
      if (window.__liquidGlassHub === gl) delete window.__liquidGlassHub;
      gl?.destroy?.();
    };
  }, []);

  return (
    <div className="api-hub api-hub--webgl" aria-hidden="true">
      <div className="api-iso-host" ref={hostRef} data-uc="diagram-webgl" />
    </div>
  );
}
