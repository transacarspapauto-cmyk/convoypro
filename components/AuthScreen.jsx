import { useState } from "react";
import { supabase } from "../lib/supabase";

const C = {
  bg:           "#0D1117",
  bgCard:       "#1E2636",
  bgInput:      "#161C26",
  bgHover:      "#252F42",
  accent:       "#2357E8",
  accentDeep:   "#1A44C4",
  accentLight:  "#3B6FF5",
  accentMist:   "rgba(35,87,232,0.12)",
  accentBorder: "rgba(35,87,232,0.3)",
  textPrimary:  "#FFFFFF",
  textSecondary:"#8896B0",
  textMuted:    "#4A5568",
  border:       "#2A3348",
  borderMid:    "#3A4560",
  green:        "#3ab26e",
  red:          "#E85555",
  redBg:        "rgba(232,85,85,0.10)",
  redBorder:    "rgba(232,85,85,0.3)",
  shadow:       "0 2px 14px rgba(0,0,0,0.5)",
};

const fb = "'Barlow', sans-serif";
const fc = "'Barlow Condensed', sans-serif";

function SafeLogo({ size = 1 }) {
  const base = 32 * size;
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: base * 0.06 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: base * 0.06 }}>
        <span style={{ fontFamily: fb, fontWeight: 800, fontSize: base, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1 }}>
          safe
        </span>
        <span style={{ display: "inline-block", width: base * 0.22, height: base * 0.22, background: C.accent, borderRadius: base * 0.04, marginBottom: base * 0.05, flexShrink: 0 }} />
      </div>
    </div>
  );
}

export default function AuthScreen() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [shake, setShake]       = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: err } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (err) {
      setError(err.message === "Invalid login credentials"
        ? "Email ou mot de passe incorrect."
        : err.message);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  }

  const inputStyle = (hasValue) => ({
    width: "100%",
    background: hasValue ? C.bgHover : C.bgInput,
    border: `1px solid ${hasValue ? C.borderMid : C.border}`,
    borderRadius: 8,
    padding: "11px 14px",
    fontSize: 15,
    color: C.textPrimary,
    fontFamily: fb,
    outline: "none",
    transition: "all .15s",
    boxSizing: "border-box",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&family=Barlow+Condensed:wght@400;500;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; font-family: ${fb}; color: ${C.textPrimary}; }
        input::placeholder { color: ${C.textMuted}; }
        input:focus { border-color: ${C.accentBorder} !important; box-shadow: 0 0 0 3px ${C.accentMist}; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shake  { 0%,100%{transform:translateX(0)} 25%,75%{transform:translateX(-5px)} 50%{transform:translateX(5px)} }
        .auth-card { animation: fadeUp .28s ease both; }
        .auth-card.shake { animation: shake .35s ease; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}>
        {/* Glow décoratif */}
        <div style={{
          position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: 500, height: 300, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(35,87,232,0.12) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div
          className={`auth-card${shake ? " shake" : ""}`}
          style={{
            position: "relative", zIndex: 1,
            width: "100%", maxWidth: 400,
            background: C.bgCard,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: "40px 36px",
            boxShadow: C.shadow,
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <SafeLogo size={1.4} />
            <div style={{
              fontFamily: fc, fontSize: 10, fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: C.textMuted, marginTop: 6,
            }}>
              Convoyage Pro
            </div>
          </div>

          {/* Titre */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: fb, fontWeight: 700, fontSize: 20, color: C.textPrimary, marginBottom: 4 }}>
              Connexion
            </div>
            <div style={{ fontFamily: fb, fontSize: 13, color: C.textSecondary }}>
              Accédez à votre espace convoyeur
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <div style={{
              background: C.redBg,
              border: `1px solid ${C.redBorder}`,
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              color: C.red,
              fontFamily: fb,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span style={{ fontSize: 15 }}>⚠</span>
              {error}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontFamily: fb, fontSize: 12, fontWeight: 600, color: C.textSecondary, display: "block", marginBottom: 6 }}>
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
                autoComplete="email"
                style={inputStyle(email)}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontFamily: fb, fontSize: 12, fontWeight: 600, color: C.textSecondary, display: "block", marginBottom: 6 }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                style={inputStyle(password)}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              style={{
                width: "100%",
                background: loading || !email || !password ? C.accentMist : C.accent,
                border: `1px solid ${loading || !email || !password ? C.accentBorder : C.accent}`,
                borderRadius: 8,
                padding: "12px 0",
                fontSize: 15,
                fontFamily: fb,
                fontWeight: 700,
                color: loading || !email || !password ? C.accentLight : "#fff",
                cursor: loading || !email || !password ? "not-allowed" : "pointer",
                transition: "all .15s",
                letterSpacing: "0.01em",
              }}
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>

          {/* Footer */}
          <div style={{ marginTop: 24, textAlign: "center", fontFamily: fb, fontSize: 12, color: C.textMuted }}>
            Accès réservé aux convoyeurs enregistrés
          </div>
        </div>
      </div>
    </>
  );
}
