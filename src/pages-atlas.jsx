// Atlas AI — interactive country map
const { useState: useStateA, useMemo: useMemoA } = React;

const AtlasPage = () => {
  const [dim, setDim] = useStateA("regulatory");
  const [selected, setSelected] = useStateA(ATLAS_COUNTRIES.find((c) => c.code === "IT"));
  const [compareCodes, setCompareCodes] = useStateA([]);
  const [hover, setHover] = useStateA(null);

  const dimMeta = ATLAS_DIMENSIONS.find((d) => d.key === dim);
  const allValues = ATLAS_COUNTRIES.map((c) => c[dim]);
  const minV = Math.min(...allValues), maxV = Math.max(...allValues);

  const colorFor = (v) => {
    const t = (v - minV) / (maxV - minV);
    const lightness = 0.95 - t * 0.55;
    const chroma = 0.04 + t * 0.12;
    return `oklch(${lightness} ${chroma} 255)`;
  };

  const toggleCompare = (code) => {
    setCompareCodes((prev) => {
      if (prev.includes(code)) return prev.filter((c) => c !== code);
      if (prev.length >= 3) return [...prev.slice(1), code];
      return [...prev, code];
    });
  };

  return (
    <main className="page-fade">
      <section style={{ paddingTop: 48, paddingBottom: 24 }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Atlas AI · v 2.1 · ultima revisione 31 mar 2026</div>
          <div className="flex justify-between items-end" style={{ flexWrap: "wrap", gap: 20 }}>
            <div style={{ maxWidth: 720 }}>
              <h1 style={{ fontSize: "clamp(36px, 4.2vw, 56px)" }}>La mappa dell'AI come fattore di potenza.</h1>
              <p className="lede" style={{ marginTop: 16 }}>
                20 paesi su 6 dimensioni. Dataset curato manualmente, fonti aperte, metodologia trasparente. Aggiornamento trimestrale.
              </p>
            </div>
            <a href="#/atlas/metodologia" className="btn btn-ghost">Metodologia →</a>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 32, paddingBottom: 48 }}>
        <div className="container">
          <div className="flex gap-1" style={{ marginBottom: 24, padding: 4, background: "var(--bg-deep)", borderRadius: 8, width: "fit-content", flexWrap: "wrap" }}>
            {ATLAS_DIMENSIONS.map((d) => (
              <button
                key={d.key}
                className="mono"
                onClick={() => setDim(d.key)}
                style={{
                  padding: "9px 16px",
                  fontSize: 11.5,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: 0,
                  borderRadius: 5,
                  background: dim === d.key ? "var(--accent)" : "transparent",
                  color: dim === d.key ? "#fff" : "var(--ink-2)",
                  fontWeight: 500,
                  transition: "all 160ms ease",
                }}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 32 }}>
            <div className="card" style={{ padding: 24, position: "relative" }}>
              <div className="flex justify-between items-start" style={{ marginBottom: 16 }}>
                <div>
                  <div className="eyebrow">Coropletica · {dimMeta.label}</div>
                  <div className="text-mute" style={{ fontSize: 12, marginTop: 4 }}>Click per dettaglio · Shift+click per confronto</div>
                </div>
                <ColorScale min={minV} max={maxV} colorFor={colorFor} />
              </div>

              {/* Schematic world map */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "var(--bg-deep)", borderRadius: 6, overflow: "hidden" }}>
                <svg viewBox="0 0 100 56" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
                  {/* schematic continents — soft shapes */}
                  <g fill="var(--rule-soft)" opacity="0.6">
                    <path d="M 6 18 L 38 12 L 42 24 L 36 38 L 22 44 L 8 38 Z" />
                    <path d="M 38 12 L 60 14 L 64 22 L 58 32 L 48 30 L 42 24 Z" />
                    <path d="M 60 14 L 92 18 L 94 32 L 76 38 L 62 32 L 58 22 Z" />
                    <path d="M 36 38 L 50 36 L 48 56 L 30 56 Z" />
                    <path d="M 76 38 L 92 38 L 88 56 L 78 54 Z" />
                  </g>
                  {ATLAS_COUNTRIES.filter((c) => !c.aggregate).map((c) => {
                    const r = 1.4 + (c[dim] / 100) * 2.2;
                    return (
                      <g key={c.code}
                        onMouseEnter={(e) => setHover({ c, x: c.x, y: c.y })}
                        onMouseLeave={() => setHover(null)}
                        onClick={(e) => { if (e.shiftKey) toggleCompare(c.code); else setSelected(c); }}
                        style={{ cursor: "pointer" }}
                      >
                        <circle cx={c.x} cy={c.y} r={r + 1.2} fill="var(--bg)" opacity="0.6" />
                        <circle
                          cx={c.x} cy={c.y} r={r}
                          fill={colorFor(c[dim])}
                          stroke={selected?.code === c.code ? "var(--accent-2)" : compareCodes.includes(c.code) ? "var(--accent)" : "var(--ink-2)"}
                          strokeWidth={selected?.code === c.code || compareCodes.includes(c.code) ? "0.5" : "0.2"}
                        />
                        <text x={c.x} y={c.y + r + 2.4} fontSize="2.2" fontFamily="JetBrains Mono" fill="var(--ink-2)" textAnchor="middle" fontWeight="500">{c.code}</text>
                      </g>
                    );
                  })}
                </svg>
                {hover && (
                  <div className="tt" style={{ left: `${hover.x}%`, top: `${hover.y - 6}%`, transform: "translate(-50%, -100%)" }}>
                    {hover.c.name} · {dimMeta.label} <span style={{ color: "var(--accent)", marginLeft: 6 }}>{hover.c[dim]}</span>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 16 }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Top 8 · {dimMeta.label}</div>
                <div className="flex gap-1" style={{ flexWrap: "wrap" }}>
                  {[...ATLAS_COUNTRIES].sort((a, b) => b[dim] - a[dim]).slice(0, 8).map((c, i) => (
                    <button key={c.code} onClick={() => setSelected(c)} className="mono" style={{
                      padding: "5px 10px", fontSize: 11, border: 0, borderRadius: 4,
                      background: colorFor(c[dim]), color: "var(--ink)", letterSpacing: "0.04em", cursor: "pointer",
                    }}>
                      <span style={{ color: "var(--ink-3)", marginRight: 6 }}>{String(i + 1).padStart(2, "0")}</span>
                      {c.code} <span style={{ marginLeft: 6, color: "var(--ink-2)" }}>{c[dim]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <CountryPanel
              country={selected}
              onCompare={(c) => toggleCompare(c)}
              compareCodes={compareCodes}
              compareCountries={compareCodes.map((cc) => ATLAS_COUNTRIES.find((c) => c.code === cc)).filter(Boolean)}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

const ColorScale = ({ min, max, colorFor }) => (
  <div className="flex items-center gap-2">
    <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>{min}</span>
    <div style={{ display: "flex", height: 8, width: 120, borderRadius: 2, overflow: "hidden" }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} style={{ flex: 1, background: colorFor(min + ((max - min) * i) / 23) }} />
      ))}
    </div>
    <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>{max}</span>
  </div>
);

const CountryPanel = ({ country, onCompare, compareCodes, compareCountries }) => {
  if (!country) return null;
  const radarValues = ATLAS_DIMENSIONS.map((d) => country[d.key]);
  return (
    <div className="card" style={{ padding: 28 }}>
      <div className="flex justify-between items-start" style={{ marginBottom: 12 }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: "var(--accent-ink)", letterSpacing: "0.1em" }}>{country.code}</div>
          <h2 style={{ fontSize: 30, marginTop: 6 }}>{country.name}</h2>
        </div>
        <button
          onClick={() => onCompare(country.code)}
          className="btn btn-ghost"
          style={{ padding: "6px 12px", fontSize: 12 }}
        >
          {compareCodes.includes(country.code) ? "✓ in confronto" : "+ confronta"}
        </button>
      </div>
      <p className="text-mute" style={{ fontSize: 14, marginBottom: 20 }}>{country.blurb}</p>
      <div style={{ marginBottom: 20 }}>
        <RadarChart
          axes={ATLAS_DIMENSIONS}
          values={radarValues}
          compareValues={compareCountries.length > 0 ? ATLAS_DIMENSIONS.map((d) => compareCountries[0][d.key]) : null}
          size={300}
        />
        {compareCountries.length > 0 && (
          <div className="flex gap-3 justify-center" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>
            <span><span style={{ display: "inline-block", width: 10, height: 10, background: "var(--accent)", borderRadius: 2, marginRight: 6, verticalAlign: "middle" }}></span>{country.code}</span>
            <span><span style={{ display: "inline-block", width: 10, height: 10, border: "1px dashed var(--ink-3)", borderRadius: 2, marginRight: 6, verticalAlign: "middle" }}></span>{compareCountries[0].code}</span>
          </div>
        )}
      </div>
      <div style={{ marginBottom: 20 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Score per dimensione</div>
        <BarBreakdown items={ATLAS_DIMENSIONS.map((d) => ({ label: d.label, value: country[d.key] }))} />
      </div>
      <div style={{ paddingTop: 16, borderTop: "1px solid var(--rule-soft)" }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Fonti</div>
        <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
          {country.sources.map((s) => <span key={s} className="badge">{s}</span>)}
        </div>
      </div>
    </div>
  );
};

window.AtlasPage = AtlasPage;
