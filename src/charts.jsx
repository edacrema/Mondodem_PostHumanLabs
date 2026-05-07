// Chart components: radar, bar, etc — built from scratch with SVG to avoid heavy deps
const RadarChart = ({ axes, values, compareValues, compareLabel, size = 320, primaryLabel = "Tu" }) => {
  const cx = size / 2, cy = size / 2, R = size / 2 - 40;
  const n = axes.length;
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (v, i) => [cx + Math.cos(angle(i)) * R * (v / 100), cy + Math.sin(angle(i)) * R * (v / 100)];
  const polyPoints = (vals) => vals.map((v, i) => point(v, i).join(",")).join(" ");
  const labelPoint = (i) => [cx + Math.cos(angle(i)) * (R + 22), cy + Math.sin(angle(i)) * (R + 22)];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: size, display: "block" }}>
      {[20, 40, 60, 80, 100].map((r) => (
        <polygon key={r} points={axes.map((_, i) => point(r, i).join(",")).join(" ")} fill="none" stroke="var(--rule-soft)" strokeWidth="0.7" />
      ))}
      {axes.map((_, i) => {
        const [x, y] = point(100, i);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--rule-soft)" strokeWidth="0.7" />;
      })}
      {compareValues && (
        <polygon points={polyPoints(compareValues)} fill="var(--ink-3)" fillOpacity="0.08" stroke="var(--ink-3)" strokeWidth="1.2" strokeDasharray="3 3" />
      )}
      <polygon points={polyPoints(values)} fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.6" />
      {values.map((v, i) => {
        const [x, y] = point(v, i);
        return <circle key={i} cx={x} cy={y} r="3" fill="var(--accent)" />;
      })}
      {axes.map((a, i) => {
        const [x, y] = labelPoint(i);
        const tA = Math.cos(angle(i));
        const anchor = Math.abs(tA) < 0.2 ? "middle" : tA > 0 ? "start" : "end";
        return (
          <g key={i}>
            <text x={x} y={y} fontSize="10.5" fontFamily="JetBrains Mono" fill="var(--ink-2)" textAnchor={anchor} dominantBaseline="middle" style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {a.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// Convert -2..2 axis vector to 0..100 for radar
const axisTo100 = (v) => Math.round(50 + (v / 2) * 45);

const BarBreakdown = ({ items, max = 100 }) => (
  <div className="flex col gap-3" style={{ width: "100%" }}>
    {items.map((it, i) => (
      <div key={i}>
        <div className="flex justify-between" style={{ fontSize: 12.5, marginBottom: 6 }}>
          <span style={{ color: "var(--ink-2)" }}>{it.label}</span>
          <span className="mono" style={{ color: "var(--ink-3)" }}>{it.value}</span>
        </div>
        <div style={{ height: 6, background: "var(--bg-deep)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ width: `${(it.value / max) * 100}%`, height: "100%", background: it.color || "var(--accent)", transition: "width 400ms ease" }} />
        </div>
      </div>
    ))}
  </div>
);

Object.assign(window, { RadarChart, axisTo100, BarBreakdown });
