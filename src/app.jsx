// Main App — router + tweaks panel
const { useState: useStateApp, useEffect: useEffectApp } = React;

const ACCENT_PALETTES = {
  blue: { accent: "oklch(0.42 0.12 255)", soft: "oklch(0.92 0.04 255)", ink: "oklch(0.32 0.13 255)" },
  terracotta: { accent: "oklch(0.55 0.13 40)", soft: "oklch(0.94 0.04 40)", ink: "oklch(0.45 0.14 40)" },
  forest: { accent: "oklch(0.45 0.10 150)", soft: "oklch(0.93 0.04 150)", ink: "oklch(0.36 0.11 150)" },
  ink: { accent: "oklch(0.25 0.02 250)", soft: "oklch(0.92 0.01 250)", ink: "oklch(0.18 0.02 250)" },
};

const useRoute = () => {
  const [route, setRoute] = useStateApp(window.location.hash.slice(1) || "/");
  useEffectApp(() => {
    const onHash = () => {
      setRoute(window.location.hash.slice(1) || "/");
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
};

const App = () => {
  const route = useRoute();
  const [tweaks, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);

  // Apply tweaks to root
  useEffectApp(() => {
    const palette = ACCENT_PALETTES[tweaks.accent] || ACCENT_PALETTES.blue;
    const r = document.documentElement;
    r.style.setProperty("--accent", palette.accent);
    r.style.setProperty("--accent-soft", palette.soft);
    r.style.setProperty("--accent-ink", palette.ink);
    r.dataset.theme = tweaks.theme;
    r.dataset.density = tweaks.density;
  }, [tweaks.accent, tweaks.theme, tweaks.density]);

  let page;
  if (route === "/" || route === "") page = <HomePage />;
  else if (route.startsWith("/about")) page = <AboutPage />;
  else if (route.startsWith("/journal")) page = <JournalPage />;
  else if (route.startsWith("/bussola")) page = <BussolaPage />;
  else if (route.startsWith("/atlas")) page = <AtlasPage />;
  else if (route.startsWith("/agora")) page = <AgoraPage agoraState={tweaks.agoraState} />;
  else if (route.startsWith("/impact")) page = <ImpactPage />;
  else page = <HomePage />;

  return (
    <>
      <Header route={route} />
      {page}
      <Footer showMondodem={tweaks.showMondodem} />
      <TweaksPanel title="Tweaks">
        <TweakSection title="Aspetto">
          <TweakColor
            label="Accento"
            value={tweaks.accent}
            onChange={(v) => setTweak("accent", v)}
            options={[
              ["#1a3a8f"],
              ["#a04030"],
              ["#2f6a4a"],
              ["#1a1a1a"],
            ]}
            valueOptions={["blue", "terracotta", "forest", "ink"]}
          />
          <TweakRadio
            label="Tema"
            value={tweaks.theme}
            onChange={(v) => setTweak("theme", v)}
            options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]}
          />
          <TweakRadio
            label="Densità"
            value={tweaks.density}
            onChange={(v) => setTweak("density", v)}
            options={[{ value: "compact", label: "Compatta" }, { value: "default", label: "Default" }, { value: "airy", label: "Arieggiata" }]}
          />
        </TweakSection>
        <TweakSection title="Stato moduli">
          <TweakRadio
            label="Agora"
            value={tweaks.agoraState}
            onChange={(v) => setTweak("agoraState", v)}
            options={[{ value: "active", label: "Ciclo attivo" }, { value: "between", label: "Tra cicli" }]}
          />
          <TweakToggle label="Footer: rapporto MondoDem" value={tweaks.showMondodem} onChange={(v) => setTweak("showMondodem", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

// Custom TweakColor with predefined palette mapping
const TweakColor = ({ label, value, onChange, options, valueOptions }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ fontSize: 12, color: "var(--tp-fg-muted, #71717a)", marginBottom: 8, fontWeight: 500 }}>{label}</div>
    <div style={{ display: "flex", gap: 8 }}>
      {options.map((swatch, i) => {
        const v = valueOptions[i];
        const active = v === value;
        return (
          <button
            key={i}
            onClick={() => onChange(v)}
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: swatch[0],
              border: active ? "2px solid #18181b" : "1px solid #d4d4d8",
              cursor: "pointer",
              padding: 0,
              boxShadow: active ? "0 0 0 2px #fff inset" : "none",
            }}
          />
        );
      })}
    </div>
  </div>
);
window.TweakColor = TweakColor;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
