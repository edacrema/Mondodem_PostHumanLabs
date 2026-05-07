// Shared UI building blocks
const { useState, useEffect, useRef, useMemo, useReducer } = React;

const Logo = ({ size = 17 }) => (
  <a href="#/" className="logo-wm" style={{ fontSize: size }}>
    <span>Post</span>
    <span className="slash">/</span>
    <span>Human Policy</span>
    <span className="lab">Lab</span>
  </a>
);

const NavLink = ({ to, current, children }) => {
  const active = current === to || (to !== "/" && current.startsWith(to));
  return (
    <a href={"#" + to} className={"nav-link" + (active ? " active" : "")}>{children}</a>
  );
};

const Header = ({ route }) => (
  <header className="site-header">
    <div className="container flex items-center justify-between" style={{ height: 64 }}>
      <Logo />
      <nav className="flex gap-6" style={{ alignItems: "center" }}>
        <NavLink to="/" current={route}>Home</NavLink>
        <NavLink to="/journal" current={route}>Journal</NavLink>
        <NavLink to="/bussola" current={route}>Bussola</NavLink>
        <NavLink to="/atlas" current={route}>Atlas</NavLink>
        <NavLink to="/agora" current={route}>Agora</NavLink>
        <NavLink to="/impact" current={route}>Impact</NavLink>
        <NavLink to="/about" current={route}>Chi siamo</NavLink>
      </nav>
      <div className="flex gap-2 items-center">
        <a href="#/journal" className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13 }}>Journal</a>
        <a href="#/bussola" className="btn btn-primary" style={{ padding: "8px 14px", fontSize: 13 }}>Prova la Bussola</a>
      </div>
    </div>
  </header>
);

const Footer = ({ showMondodem }) => (
  <footer style={{ background: "var(--bg-deep)", borderTop: "1px solid var(--rule)", marginTop: 80, paddingTop: 56, paddingBottom: 32 }}>
    <div className="container">
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48 }}>
        <div>
          <Logo size={20} />
          <p className="text-mute" style={{ marginTop: 16, fontSize: 14, maxWidth: 360 }}>
            Osservatorio-laboratorio indipendente sull'impatto politico, economico, sociale e geopolitico dell'intelligenza artificiale.
          </p>
          <div className="eyebrow" style={{ marginTop: 24 }}>posthumanlab.eu</div>
        </div>
        <div className="flex col gap-3">
          <div className="eyebrow">Esplora</div>
          <a href="#/bussola" className="text-mute">Bussola AI</a>
          <a href="#/atlas" className="text-mute">Atlas AI</a>
          <a href="#/agora" className="text-mute">Agora</a>
          <a href="#/impact" className="text-mute">Impact Explorer</a>
        </div>
        <div className="flex col gap-3">
          <div className="eyebrow">Lab</div>
          <a href="#/about" className="text-mute">Chi siamo</a>
          <a href="#/journal" className="text-mute">Journal</a>
          <a href="#/atlas/metodologia" className="text-mute">Metodologia</a>
          <a href="#/contatti" className="text-mute">Contatti</a>
        </div>
        <div className="flex col gap-3">
          <div className="eyebrow">Iscriviti</div>
          <p className="text-mute" style={{ fontSize: 13 }}>2-4 contenuti al mese. Nessun spam.</p>
          <NewsletterMini />
        </div>
      </div>
      <hr className="rule-soft" style={{ margin: "40px 0 20px" }} />
      <div className="flex justify-between items-center" style={{ fontSize: 12, color: "var(--ink-3)" }}>
        <div>© 2026 Post/Human Policy Lab. Tutti i contenuti rilasciati con licenza CC BY-SA 4.0 salvo diversa indicazione.</div>
        <div className="flex gap-4">
          {showMondodem && <span>In dialogo con <a href="#" className="text-accent">MondoDem</a></span>}
          <a href="#" className="text-mute">Privacy</a>
          <a href="#" className="text-mute">Cookie</a>
          <a href="#" className="text-mute">RSS</a>
        </div>
      </div>
    </div>
  </footer>
);

const NewsletterMini = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return done ? (
    <div className="badge badge-accent">Iscrizione confermata</div>
  ) : (
    <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}>
      <input type="email" placeholder="email@esempio.it" value={email} onChange={(e) => setEmail(e.target.value)} style={{ fontSize: 13 }} />
      <button className="btn btn-primary" type="submit" style={{ padding: "10px 14px", fontSize: 13 }}>Iscriviti</button>
    </form>
  );
};

const SectionHead = ({ eyebrow, title, kicker, children }) => (
  <div style={{ marginBottom: 32 }}>
    {eyebrow && <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>}
    <div className="flex justify-between items-start gap-6" style={{ flexWrap: "wrap" }}>
      <div style={{ maxWidth: 720 }}>
        {title && <h2>{title}</h2>}
        {kicker && <p className="lede" style={{ marginTop: 12 }}>{kicker}</p>}
      </div>
      {children}
    </div>
  </div>
);

const ArticleCard = ({ article, featured = false }) => (
  <a href="#/journal" className="card card-hover flex col gap-3" style={{ height: "100%", padding: featured ? 32 : 24 }}>
    <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
      <span className="badge badge-accent">{article.tag}</span>
      {article.crossPost && <span className="badge">via {article.crossPost}</span>}
    </div>
    <h3 style={{ fontSize: featured ? 30 : 22, marginTop: 4 }}>{article.title}</h3>
    <p className="text-mute" style={{ fontSize: featured ? 16 : 14 }}>{article.excerpt}</p>
    <div className="flex gap-3 items-center mono" style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: "auto", letterSpacing: "0.04em" }}>
      <span>{article.author}</span>
      <span>·</span>
      <span>{article.date}</span>
      <span>·</span>
      <span>{article.minutes} min</span>
    </div>
  </a>
);

const ModuleCard = ({ to, badge, title, desc, status, icon }) => (
  <a href={"#" + to} className="card card-hover flex col gap-3" style={{ position: "relative", padding: 28, height: "100%" }}>
    <div className="flex justify-between items-start">
      <div className="badge badge-accent">{badge}</div>
      {status === "live" && <div className="badge badge-live">live</div>}
      {status === "soon" && <div className="badge">in arrivo</div>}
    </div>
    <div style={{ height: 80, marginTop: 8 }}>{icon}</div>
    <h3 style={{ fontSize: 22 }}>{title}</h3>
    <p className="text-mute" style={{ fontSize: 14 }}>{desc}</p>
    <div style={{ marginTop: "auto", paddingTop: 12 }}>
      <span className="text-accent" style={{ fontSize: 13, fontWeight: 500 }}>Apri →</span>
    </div>
  </a>
);

// Module icons (geometric, no fake imagery)
const IconBussola = () => (
  <svg viewBox="0 0 80 80" width="80" height="80">
    <circle cx="40" cy="40" r="30" fill="none" stroke="var(--rule)" strokeWidth="1" />
    <circle cx="40" cy="40" r="20" fill="none" stroke="var(--rule)" strokeWidth="1" />
    <circle cx="40" cy="40" r="10" fill="none" stroke="var(--rule)" strokeWidth="1" />
    <line x1="40" y1="6" x2="40" y2="74" stroke="var(--rule)" strokeWidth="1" />
    <line x1="6" y1="40" x2="74" y2="40" stroke="var(--rule)" strokeWidth="1" />
    <circle cx="52" cy="28" r="4" fill="var(--accent)" />
  </svg>
);
const IconAtlas = () => (
  <svg viewBox="0 0 80 80" width="80" height="80">
    <rect x="6" y="14" width="68" height="52" fill="none" stroke="var(--rule)" strokeWidth="1" />
    {Array.from({ length: 7 }).map((_, i) => (
      <line key={i} x1={6 + i * 11.3} y1="14" x2={6 + i * 11.3} y2="66" stroke="var(--rule-soft)" strokeWidth="0.5" />
    ))}
    {Array.from({ length: 5 }).map((_, i) => (
      <line key={i} x1="6" y1={14 + i * 13} x2="74" y2={14 + i * 13} stroke="var(--rule-soft)" strokeWidth="0.5" />
    ))}
    <rect x="28" y="27" width="14" height="11" fill="var(--accent)" opacity="0.85" />
    <rect x="42" y="27" width="11" height="11" fill="var(--accent)" opacity="0.55" />
    <rect x="17" y="38" width="11" height="13" fill="var(--accent)" opacity="0.35" />
    <rect x="42" y="38" width="14" height="13" fill="var(--accent)" opacity="0.7" />
  </svg>
);
const IconAgora = () => (
  <svg viewBox="0 0 80 80" width="80" height="80">
    <circle cx="40" cy="40" r="32" fill="none" stroke="var(--rule)" strokeWidth="1" />
    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
      const a = (deg * Math.PI) / 180;
      return <circle key={i} cx={40 + Math.cos(a) * 22} cy={40 + Math.sin(a) * 22} r="5" fill={i === 0 ? "var(--accent)" : "var(--ink-3)"} opacity={i === 0 ? 1 : 0.4} />;
    })}
    <circle cx="40" cy="40" r="3" fill="var(--ink)" />
  </svg>
);
const IconImpact = () => (
  <svg viewBox="0 0 80 80" width="80" height="80">
    <line x1="10" y1="66" x2="70" y2="66" stroke="var(--rule)" strokeWidth="1" />
    <line x1="10" y1="14" x2="10" y2="66" stroke="var(--rule)" strokeWidth="1" />
    {[18, 32, 46, 60].map((x, i) => (
      <rect key={i} x={x} y={66 - [22, 38, 30, 48][i]} width="10" height={[22, 38, 30, 48][i]} fill={i === 3 ? "var(--accent)" : "var(--ink-3)"} opacity={i === 3 ? 1 : 0.4} />
    ))}
  </svg>
);

Object.assign(window, {
  Logo, Header, Footer, NewsletterMini, SectionHead,
  ArticleCard, ModuleCard, IconBussola, IconAtlas, IconAgora, IconImpact,
});
