/* eslint-disable react/prop-types, react/no-unescaped-entities */
import { useState } from "react";
import { useClientData } from "../hooks/useClientToken";

const C = {
  bg:           "#0D1117",
  bgDeep:       "#080B10",
  bgCard:       "#1E2636",
  bgHover:      "#252F42",
  bgInput:      "#161C26",
  accent:       "#2357E8",
  accentMist:   "rgba(35,87,232,0.12)",
  accentBorder: "rgba(35,87,232,0.3)",
  textPrimary:  "#FFFFFF",
  textSecondary:"#8896B0",
  textMuted:    "#4A5568",
  border:       "#2A3348",
  borderMid:    "#3A4560",
  green:        "#3ab26e",
  greenBg:      "rgba(58,178,110,0.1)",
  greenBorder:  "rgba(58,178,110,0.25)",
  orange:       "#E8902A",
  orangeBg:     "rgba(232,144,42,0.1)",
  shadow:       "0 2px 14px rgba(0,0,0,0.5)",
};

const fb = "'Barlow', sans-serif";
const fc = "'Barlow Condensed', sans-serif";

function SafeLogo({ size = 1 }) {
  const base = 32 * size;
  return (
    <div style={{ display: "inline-flex", alignItems: "baseline", gap: base * 0.06 }}>
      <span style={{ fontFamily: fb, fontWeight: 800, fontSize: base, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1 }}>safe</span>
      <span style={{ display: "inline-block", width: base * 0.22, height: base * 0.22, background: C.accent, borderRadius: base * 0.04, marginBottom: base * 0.05, flexShrink: 0 }} />
    </div>
  );
}

function StatutBadge({ statut }) {
  const map = {
    "terminée":  { bg: C.greenBg,  border: C.greenBorder,  color: C.green,  label: "Terminée"  },
    "en cours":  { bg: C.orangeBg, border: "rgba(232,144,42,0.25)", color: C.orange, label: "En cours" },
    "planifiée": { bg: C.accentMist, border: C.accentBorder, color: C.accent, label: "Planifiée" },
  };
  const s = map[statut] || map["planifiée"];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontSize: 12, fontFamily: fb, fontWeight: 600, padding: "4px 10px", borderRadius: 5 }}>
      <span style={{ width: 5, height: 5, borderRadius: 3, background: s.color, flexShrink: 0 }} />
      {s.label}
    </span>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 12, color: C.textMuted }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{value || "—"}</span>
    </div>
  );
}

function PhotoGrid({ photos, title }) {
  if (!photos?.length) return null;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: fc, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, marginBottom: 10 }}>
        {title} ({photos.length})
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {photos.map((p, i) => (
          p.url
            ? <img key={i} src={p.url} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 8, border: `1px solid ${C.borderMid}`, display: "block" }} />
            : <div key={i} style={{ aspectRatio: "4/3", borderRadius: 8, background: C.bgHover, border: `1px solid ${C.border}` }} />
        ))}
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <SafeLogo size={1.2} />
        <div style={{ fontFamily: fb, fontSize: 13, color: C.textMuted, marginTop: 16 }}>Chargement…</div>
      </div>
    </div>
  );
}

function ErrorScreen({ message }) {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800&family=Barlow+Condensed:wght@700;900&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{background:${C.bg}}`}</style>
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 360 }}>
          <SafeLogo size={1.2} />
          <div style={{ width: 56, height: 56, borderRadius: 12, background: "rgba(232,85,85,0.1)", border: "1px solid rgba(232,85,85,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "24px auto 16px" }}>✕</div>
          <div style={{ fontFamily: fb, fontWeight: 700, fontSize: 18, color: C.textPrimary, marginBottom: 8 }}>Lien invalide</div>
          <div style={{ fontFamily: fb, fontSize: 13, color: C.textSecondary }}>{message}</div>
        </div>
      </div>
    </>
  );
}

export default function ClientPortal({ token }) {
  const { mission: m, edl: d, expiresAt, loading, error } = useClientData(token);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfErr, setPdfErr] = useState(null);

  if (loading) return <LoadingScreen />;
  if (error || !m) return <ErrorScreen message={error || "Ce lien est introuvable ou a expiré."} />;

  const expiryDate = expiresAt ? new Date(expiresAt).toLocaleDateString("fr-FR") : null;
  const dist = d ? (parseInt(d.liv?.km) || 0) - (parseInt(d.enl?.km) || 0) : 0;

  async function handleDownloadPDF() {
    setPdfLoading(true); setPdfErr(null);
    try {
      const date = new Date().toLocaleDateString("fr-FR");
      const [{ pdf }, { PVDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("../lib/PVDocument"),
      ]);
      const blob = await pdf(<PVDocument mission={m} edl={d || {}} date={date} userName="" />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `PV_${m.ref}.pdf`;
      a.click(); URL.revokeObjectURL(url);
    } catch (e) { setPdfErr("Erreur : " + e.message); }
    setPdfLoading(false);
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&family=Barlow+Condensed:wght@400;500;600;700;900&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{background:${C.bg};font-family:${fb};color:${C.textPrimary}}`}</style>

      <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: C.bg }}>

        {/* Header */}
        <div style={{ background: C.bgDeep, borderBottom: `1px solid ${C.border}`, padding: "20px 20px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <SafeLogo size={0.7} />
            {expiryDate && (
              <span style={{ fontFamily: fb, fontSize: 11, color: C.textMuted, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 5, padding: "3px 8px" }}>
                Lien valable jusqu'au {expiryDate}
              </span>
            )}
          </div>
          <div style={{ fontFamily: fc, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.textMuted, marginBottom: 4 }}>
            Suivi de mission
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: fc, fontWeight: 900, fontSize: 22, color: C.textPrimary }}>{m.titre}</div>
            <StatutBadge statut={m.statut} />
          </div>
          <div style={{ fontFamily: fb, fontSize: 12, color: C.textMuted, marginTop: 4 }}>Réf. {m.ref}</div>
        </div>

        <div style={{ padding: "16px 20px 80px" }}>

          {/* Mission info */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
            <div style={{ fontFamily: fc, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, marginBottom: 10 }}>
              Informations
            </div>
            <Row label="Véhicule"   value={`${m.marque || ""} ${m.modele || ""}`.trim() || m.vehicule} />
            <Row label="Immatriculation" value={m.immat} />
            <Row label="Date"       value={m.date} />
            <Row label="Départ"     value={m.heure} />
            <Row label="Livraison"  value={m.heureLiv} />
            <Row label="Client"     value={m.client} />
            {dist > 0 && <Row label="Distance parcourue" value={`${dist} km`} />}
          </div>

          {/* Itinéraire */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
            <div style={{ fontFamily: fc, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, marginBottom: 10 }}>
              Itinéraire
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4, flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: C.accent }} />
                <div style={{ width: 1, height: 28, background: C.border, margin: "4px 0" }} />
                <div style={{ width: 8, height: 8, borderRadius: 4, background: C.green }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 8 }}>{m.adresseEnl}</div>
                <div style={{ fontSize: 12, color: C.textSecondary }}>{m.adresseLiv}</div>
              </div>
            </div>
          </div>

          {/* EDL résumé si disponible */}
          {d && (d.enl?.carburant || d.enl?.km) && (
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
              <div style={{ fontFamily: fc, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, marginBottom: 10 }}>
                État des lieux
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  ["Carburant enl.", d.enl?.carburant],
                  ["Carburant liv.", d.liv?.carburant],
                  ["Km enlèvement", d.enl?.km ? `${d.enl.km} km` : null],
                  ["Km livraison",  d.liv?.km  ? `${d.liv.km} km`  : null],
                  ["État intérieur", d.enl?.int ? `${d.enl.int} → ${d.liv?.int || "—"}` : null],
                  ["État extérieur", d.enl?.ext ? `${d.enl.ext} → ${d.liv?.ext || "—"}` : null],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} style={{ background: C.bgInput, borderRadius: 7, padding: "8px 10px" }}>
                    <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 3 }}>{k}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary }}>{v}</div>
                  </div>
                ))}
              </div>
              {d.enl?.defauts?.length > 0 && (
                <div style={{ marginTop: 10, padding: "8px 10px", background: C.orangeBg, border: `1px solid rgba(232,144,42,0.25)`, borderRadius: 7 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.orange, marginBottom: 4 }}>⚠ {d.enl.defauts.length} défaut(s) signalé(s)</div>
                  {d.enl.defauts.map((df, i) => (
                    <div key={i} style={{ fontSize: 11, color: C.orange }}>{df.type} — {df.zone}{df.detail ? ` — ${df.detail}` : ""}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Photos */}
          {(d?.pEnl?.length > 0 || d?.pLiv?.length > 0) && (
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
              <PhotoGrid photos={d?.pEnl} title="Photos enlèvement" />
              <PhotoGrid photos={d?.pLiv} title="Photos livraison" />
            </div>
          )}

          {/* Signature */}
          {d?.signed && typeof d.signed === "string" && (
            <div style={{ background: C.bgCard, border: `1px solid ${C.greenBorder}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
              <div style={{ fontFamily: fc, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, marginBottom: 10 }}>
                Signature convoyeur
              </div>
              <img src={d.signed} alt="Signature" style={{ width: "100%", maxHeight: 80, objectFit: "contain", background: C.bgInput, borderRadius: 6, display: "block" }} />
            </div>
          )}

          {/* Bouton PV */}
          {pdfErr && (
            <div style={{ fontSize: 12, color: "#E85555", background: "rgba(232,85,85,0.1)", border: "1px solid rgba(232,85,85,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 12 }}>
              {pdfErr}
            </div>
          )}
          <button
            onClick={handleDownloadPDF}
            disabled={pdfLoading}
            style={{ width: "100%", background: pdfLoading ? C.accentMist : C.accent, color: pdfLoading ? C.textSecondary : "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontFamily: fb, fontWeight: 700, cursor: pdfLoading ? "not-allowed" : "pointer", transition: "all .15s" }}>
            {pdfLoading ? "⏳ Génération du PDF…" : "⬇ Télécharger le procès verbal"}
          </button>

          {/* Footer */}
          <div style={{ marginTop: 28, textAlign: "center", fontFamily: fb, fontSize: 11, color: C.textMuted }}>
            Document fourni par <strong style={{ color: C.textSecondary }}>safe.</strong> ConvoyPro · Accès en lecture seule
          </div>
        </div>
      </div>
    </>
  );
}
