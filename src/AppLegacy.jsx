import { useState, useRef, useEffect } from "react";
import { supabase } from "./lib/supabase";

/* ═══════════════════════════════════════════════════
   SAFE. V2 — Identité visuelle officielle
   Bleu #2357E8 · Barlow · Nuit/Clair
═══════════════════════════════════════════════════ */
function makeTheme(dark) {
  return dark ? {
    // ── NUIT (principal) — safe. brand dark ──
    bg:           "#0D1117",   // Dark exact brand
    bgDeep:       "#080B10",
    bgCard:       "#1E2636",   // Card brand
    bgHover:      "#252F42",
    bgInput:      "#161C26",   // Surface brand
    // Couleur principale safe. V2
    accent:       "#2357E8",
    accentDeep:   "#1A44C4",
    accentLight:  "#3B6FF5",
    accentMist:   "rgba(35,87,232,0.12)",
    accentBorder: "rgba(35,87,232,0.3)",
    // Textes
    textPrimary:  "#FFFFFF",
    textSecondary:"#8896B0",   // Silver brand
    textMuted:    "#4A5568",
    // Bordures
    border:       "#2A3348",   // Border brand exact
    borderMid:    "#3A4560",
    // États
    green:        "#3ab26e",
    greenBg:      "rgba(58,178,110,0.1)",
    greenBorder:  "rgba(58,178,110,0.25)",
    orange:       "#E8902A",
    orangeBg:     "rgba(232,144,42,0.1)",
    shadow:       "0 2px 14px rgba(0,0,0,0.5)",
    isDark:       true,
  } : {
    // ── CLAIR — safe. brand light ──
    bg:           "#F0F2F8",
    bgDeep:       "#FFFFFF",
    bgCard:       "#FFFFFF",
    bgHover:      "#E8EBF5",
    bgInput:      "#EEF0F8",
    // Couleur principale safe. V2
    accent:       "#2357E8",
    accentDeep:   "#1A44C4",
    accentLight:  "#3B6FF5",
    accentMist:   "rgba(35,87,232,0.07)",
    accentBorder: "rgba(35,87,232,0.2)",
    // Textes
    textPrimary:  "#0D1117",
    textSecondary:"#4A5568",
    textMuted:    "#8896B0",
    // Bordures
    border:       "#DCE1EE",
    borderMid:    "#C8D0E4",
    // États
    green:        "#1E8A52",
    greenBg:      "rgba(30,138,82,0.08)",
    greenBorder:  "rgba(30,138,82,0.2)",
    orange:       "#B86E10",
    orangeBg:     "rgba(184,110,16,0.08)",
    shadow:       "0 2px 16px rgba(13,17,23,0.08)",
    isDark:       false,
  };
}
let C = makeTheme(true); // nuit par défaut

/* ── Logo safe. V2 ── */
function SafeLogo({ size = 1, variant = "dark" }) {
  const base   = 32 * size;
  const txtCol = variant === "blue" ? "#fff" : C.textPrimary;
  const sqCol  = variant === "blue" ? "rgba(255,255,255,0.85)" : C.accent;
  return (
    <div style={{ display:"inline-flex", flexDirection:"column", gap: base * 0.06 }}>
      <div style={{ display:"flex", alignItems:"baseline", gap: base * 0.06 }}>
        <span style={{ fontFamily:"'Barlow', sans-serif", fontWeight:800, fontSize:base, letterSpacing:"-0.02em", color:txtCol, lineHeight:1 }}>safe</span>
        <span style={{ display:"inline-block", width: base * 0.22, height: base * 0.22, background:sqCol, borderRadius: base * 0.04, marginBottom: base * 0.05, flexShrink:0 }} />
      </div>
    </div>
  );
}

const fc = "'Barlow Condensed', sans-serif";
const fb = "'Barlow', sans-serif";

const GFont = ({ theme }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&family=Barlow+Condensed:wght@400;500;600;700;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${theme.bg}; font-family: ${fb}; color: ${theme.textPrimary}; transition: background .3s, color .3s; }
    button, input, select, textarea { font-family: inherit; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${theme.bgHover}; border-radius: 2px; }
    @keyframes fadeUp  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes popIn   { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
    @keyframes shake   { 0%,100%{transform:translateX(0)} 25%,75%{transform:translateX(-4px)} 50%{transform:translateX(4px)} }
    @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.4} }
    .fade  { animation: fadeUp .22s ease both; }
    .pop   { animation: popIn  .18s ease both; }
    .shake { animation: shake  .35s ease; }
  `}</style>
);

function usePlatform() {
  const [p, setP] = useState("unknown");
  useEffect(() => {
    const isPWA = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isPWA) setP("pwa"); else if (isMobile) setP("mobile"); else setP("desktop");
  }, []);
  return p;
}

/* ═══════ DATA ═══════ */
const MISSIONS = [
  { id:"MISS628", ref:"MISS628", titre:"MEAUX / IFS", client:"STE ELIOR", date:"Mar 19 Août", heure:"08:00", heureLiv:"17:00", vehicule:"Peugeot EXPERT M", immat:"HE-137-RN", statut:"terminée", marque:"Peugeot", modele:"EXPERT M", adresseEnl:"Peugeot Meaux Gueudet, 1880 Av. Roosevelt, Meaux", adresseLiv:"13 Rue François Arago, Ifs", email:"elefort@gueudet.fr", vin:"SU304910", kmEnl:"0", kmLiv:"280", remuneration:"88,06 €" },
  { id:"MISS614", ref:"MISS614", titre:"PARIS / LYON", client:"FLEET AUTO SAS", date:"Ven 15 Août", heure:"09:00", heureLiv:"18:30", vehicule:"Renault TRAFIC", immat:"AB-234-CD", statut:"en cours", marque:"Renault", modele:"TRAFIC", adresseEnl:"Renault Paris Nation, 12 Pl. de la Nation", adresseLiv:"45 Rue Garibaldi, Lyon", email:"contact@fleetauto.fr", vin:"VF1FL000123", kmEnl:"45200", kmLiv:"—", remuneration:"124,50 €" },
  { id:"MISS601", ref:"MISS601", titre:"BORDEAUX / NANTES", client:"GUEUDET AUTO", date:"Mar 12 Août", heure:"07:30", heureLiv:"16:00", vehicule:"Citroën BERLINGO", immat:"GH-789-IJ", statut:"terminée", marque:"Citroën", modele:"BERLINGO", adresseEnl:"Citroën Bordeaux Lac, 55 Av. du Médoc", adresseLiv:"8 Rue de la Beaujoire, Nantes", email:"missions@gueudet.fr", vin:"VF7K9AHX", kmEnl:"12050", kmLiv:"12630", remuneration:"68,20 €" },
  { id:"MISS589", ref:"MISS589", titre:"LILLE / STRASBOURG", client:"NORD FLEET", date:"Jeu 8 Août", heure:"06:00", heureLiv:"15:00", vehicule:"VW CRAFTER", immat:"XY-456-ZA", statut:"planifiée", marque:"Volkswagen", modele:"CRAFTER", adresseEnl:"VW Lille Labruyère, 12 Rue Labruyère", adresseLiv:"33 Route de Colmar, Strasbourg", email:"dispatch@nordfleet.fr", vin:"WV1ZZZ2EZK5", kmEnl:"—", kmLiv:"—", remuneration:"156,00 €" },
];

/* ═══════ SHARED COMPONENTS ═══════ */
function StatutBadge({ statut, small }) {
  const map = {
    terminée:  { bg: C.greenBg,  border: C.greenBorder,  color: C.green,  dot: C.green,  label: "Terminée"  },
    "en cours":{ bg: C.orangeBg, border:"rgba(232,144,42,0.25)", color: C.orange, dot: C.orange, label: "En cours" },
    planifiée: { bg: C.accentMist,   border:"rgba(74,144,217,0.25)",  color: C.accent,   dot: C.accent,   label: "Planifiée" },
  };
  const s = map[statut] || map.planifiée;
  const size = small ? 11 : 12;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:s.bg, border:`1px solid ${s.border}`, color:s.color, fontSize:size, fontFamily:fb, fontWeight:600, padding:small?"3px 8px":"4px 10px", borderRadius:5 }}>
      <span style={{ width:5, height:5, borderRadius:3, background:s.dot, flexShrink:0 }} />
      {s.label}
    </span>
  );
}

function Card({ children, style={}, onClick }) {
  return (
    <div onClick={onClick} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ children, color = C.textMuted }) {
  return (
    <div style={{ fontFamily: fc, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color, marginBottom: 12 }}>
      {children}
    </div>
  );
}

function FieldLabel({ children, required }) {
  return (
    <div style={{ fontFamily: fb, fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 6, display:"flex", alignItems:"center", gap:4 }}>
      {children}{required && <span style={{ color: C.accent, fontSize: 10 }}>*</span>}
    </div>
  );
}

function InputSelect({ value, onChange, options, placeholder }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width:"100%", background: value ? C.bgHover : C.bgInput, border: `1px solid ${value ? C.borderMid : C.border}`, borderRadius:7, padding:"10px 12px", fontSize:14, color: value ? C.textPrimary : C.textMuted, fontFamily:fb, outline:"none", appearance:"none", transition:"all .15s" }}>
      <option value="" style={{ background: C.bg }}>{placeholder}</option>
      {options.map(o => <option key={o} value={o} style={{ background: C.bg }}>{o}</option>)}
    </select>
  );
}

function InputText({ value, onChange, placeholder, inputMode, type="text" }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} inputMode={inputMode} type={type}
      style={{ width:"100%", background: value ? C.bgHover : C.bgInput, border: `1px solid ${value ? C.borderMid : C.border}`, borderRadius:7, padding:"10px 12px", fontSize:14, color: C.textPrimary, fontFamily:fb, outline:"none", transition:"all .15s" }} />
  );
}

function YesNoToggle({ value, onChange }) {
  return (
    <div style={{ display:"flex", gap:6 }}>
      {["Oui","Non"].map(v => (
        <button key={v} onClick={() => onChange(v)}
          style={{ flex:1, padding:"9px 0", border:"none", borderRadius:6, fontFamily:fb, fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .15s",
            background: value===v ? (v==="Oui" ? C.greenBg : "rgba(217,79,43,0.12)") : C.bgInput,
            color: value===v ? (v==="Oui" ? C.green : C.accent) : C.textMuted,
            boxShadow: value===v ? `inset 0 0 0 1px ${v==="Oui" ? C.greenBorder : C.accentBorder}` : `inset 0 0 0 1px ${C.border}` }}>
          {v === "Oui" ? "✓  Oui" : "✕  Non"}
        </button>
      ))}
    </div>
  );
}

function BtnPrimary({ children, onClick, disabled, style={} }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ background: disabled ? C.bgHover : C.accent, color: disabled ? C.textMuted : "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 14, fontWeight: 700, fontFamily: fb, cursor: disabled ? "not-allowed" : "pointer", transition: "all .15s", ...style }}>
      {children}
    </button>
  );
}

function BtnGhost({ children, onClick, style={} }) {
  return (
    <button onClick={onClick}
      style={{ background: "transparent", color: C.textSecondary, border: `1px solid ${C.borderMid}`, borderRadius: 8, padding: "10px 16px", fontSize: 13, fontWeight: 500, fontFamily: fb, cursor: "pointer", transition: "all .15s", ...style }}>
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   ÉTAT DES LIEUX — Logique
═══════════════════════════════════════════════════ */
const initData = {
  ack: false, arrEnl: false,
  enl: { carburant:"", km:"", cles:"", docs:"", kit:"", roue:"", secu:"", int:"", ext:"", rem:"", defauts:[] },
  pEnl: [], arrLiv: false, pLiv: [],
  liv: { km:"", carburant:"", int:"", ext:"", rem:"" },
  signed: false,
};

function validate(step, d) {
  if (step===1) return d.ack ? [] : ["Confirmer la prise de connaissance de la mission"];
  if (step===2) return d.arrEnl ? [] : ["Confirmer votre arrivée sur le lieu d'enlèvement"];
  if (step===3) {
    const e=d.enl, m=[];
    if(!e.carburant) m.push("Niveau de carburant");
    if(!e.km)        m.push("Kilométrage");
    if(!e.cles)      m.push("Nombre de clés");
    if(!e.docs)      m.push("Documents véhicule");
    if(!e.kit)       m.push("Kit anti-crevaison");
    if(!e.roue)      m.push("Roue de secours");
    if(!e.secu)      m.push("Kit de sécurité");
    if(!e.int)       m.push("État intérieur");
    if(!e.ext)       m.push("État extérieur");
    return m;
  }
  if (step===4) return d.pEnl.length>=4 ? [] : [`Photos : ${d.pEnl.length}/4 — il en manque encore ${4-d.pEnl.length}`];
  if (step===5) return d.arrLiv ? [] : ["Confirmer votre arrivée à destination"];
  if (step===6) return d.pLiv.length>=4 ? [] : [`Photos : ${d.pLiv.length}/4 — il en manque encore ${4-d.pLiv.length}`];
  if (step===7) {
    const l=d.liv, m=[];
    if(!l.km)        m.push("Kilométrage à la livraison");
    if(!l.carburant) m.push("Niveau de carburant");
    if(!l.int)       m.push("Propreté intérieur");
    if(!l.ext)       m.push("Propreté extérieur");
    return m;
  }
  if (step===8) return d.signed ? [] : ["Signature du convoyeur requise"];
  return [];
}
const isDone   = (s,d) => validate(s,d).length === 0;
const isUnlocked = (s,d) => { for(let i=1;i<s;i++) if(!isDone(i,d)) return false; return true; };

const STEP_LABELS = ["","Résumé","Navigation enlèvement","Checklist enlèvement","Photos enlèvement","Navigation livraison","Photos livraison","Checklist livraison","Signature","Procès verbal"];

/* ─── Photo Manager ─── */
const gradients = [["#1e2024","#2a2d35"],["#1a1c20","#242830"],["#16181c","#1e2228"],["#1c1e22","#282c32"],["#181a1e","#202428"]];
function PhotoManager({ photos, onChange }) {
  function add()   { onChange([...photos, { id:Date.now(), g:gradients[photos.length%5] }]); }
  function remove(id) { onChange(photos.filter(p=>p.id!==id)); }
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <div style={{ fontSize:13, color: photos.length>=4 ? C.green : C.textSecondary }}>
          {photos.length>=4
            ? <span style={{ fontWeight:600 }}>✓ {photos.length} photos — OK</span>
            : <span>Minimum 4 requises <span style={{ color:C.accent }}>({photos.length}/4)</span></span>}
        </div>
        <BtnPrimary onClick={add} style={{ padding:"7px 14px", fontSize:12 }}>+ Ajouter</BtnPrimary>
      </div>
      {photos.length > 0 ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {photos.map(p => (
            <div key={p.id} style={{ aspectRatio:"4/3", borderRadius:8, background:`linear-gradient(135deg,${p.g[0]},${p.g[1]})`, border:`1px solid ${C.borderMid}`, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }} className="pop">
              <span style={{ fontSize:22, opacity:.6 }}>📷</span>
              <button onClick={()=>remove(p.id)} style={{ position:"absolute", top:4, right:4, width:18, height:18, borderRadius:9, background:"rgba(0,0,0,0.6)", border:`1px solid ${C.border}`, color:C.textSecondary, fontSize:11, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>×</button>
            </div>
          ))}
          {Array.from({length:Math.max(0,4-photos.length)}).map((_,i) => (
            <div key={i} onClick={add} style={{ aspectRatio:"4/3", borderRadius:8, border:`1px dashed ${C.borderMid}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, cursor:"pointer", transition:"border-color .15s" }}>
              <span style={{ fontSize:20, opacity:.4 }}>📷</span>
              <span style={{ fontSize:11, color:C.textMuted }}>Ajouter</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ border:`1px dashed ${C.border}`, borderRadius:8, padding:"28px 16px", textAlign:"center" }}>
          <div style={{ fontSize:32, marginBottom:8, opacity:.5 }}>📷</div>
          <div style={{ fontSize:13, color:C.textMuted }}>Aucune photo — 4 minimum obligatoires</div>
        </div>
      )}
    </div>
  );
}

/* 🆕 Détecteur de défauts */
const DTYPES = ["Rayure","Bosse","Impact","Éclat","Déformation","Autre"];
const DZONES = ["Aile AV gauche","Aile AV droite","Aile AR gauche","Aile AR droite","Capot","Coffre","Toit","Porte AV gauche","Porte AV droite","Porte AR gauche","Porte AR droite","Pare-choc avant","Pare-choc arrière","Vitre","Jante"];

function DefautDetector({ defauts, onChange }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ type:"", zone:"", detail:"" });
  function add() {
    if(!f.type || !f.zone) return;
    onChange([...defauts, { id:Date.now(), ...f }]);
    setF({ type:"", zone:"", detail:"" }); setOpen(false);
  }
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <div style={{ fontSize:13, color: defauts.length ? C.orange : C.textMuted }}>
          {defauts.length ? `⚠  ${defauts.length} défaut(s) signalé(s)` : "Aucun défaut signalé"}
        </div>
        <button onClick={()=>setOpen(!open)} style={{ background: open ? C.bgHover : C.accentMist, border:`1px solid ${open ? C.borderMid : C.accentBorder}`, color: open ? C.textSecondary : C.accent, borderRadius:6, padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer" }}>
          {open ? "Annuler" : "+ Signaler un défaut"}
        </button>
      </div>
      {open && (
        <div style={{ background:C.bgDeep, border:`1px solid ${C.borderMid}`, borderRadius:8, padding:14, marginBottom:10 }} className="fade">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
            <div><FieldLabel>Type</FieldLabel><InputSelect value={f.type} onChange={v=>setF({...f,type:v})} options={DTYPES} placeholder="Sélectionner"/></div>
            <div><FieldLabel>Zone</FieldLabel><InputSelect value={f.zone} onChange={v=>setF({...f,zone:v})} options={DZONES} placeholder="Sélectionner"/></div>
          </div>
          <FieldLabel>Description (optionnel)</FieldLabel>
          <InputText value={f.detail} onChange={v=>setF({...f,detail:v})} placeholder="Ex: Légère rayure 10cm..." />
          <BtnPrimary onClick={add} style={{ width:"100%", marginTop:10, padding:"11px" }}>Confirmer le défaut</BtnPrimary>
        </div>
      )}
      {defauts.length > 0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:5, marginTop:6 }}>
          {defauts.map(d => (
            <div key={d.id} style={{ display:"flex", alignItems:"center", gap:10, background:C.orangeBg, border:`1px solid rgba(232,144,42,0.2)`, borderRadius:7, padding:"9px 12px" }}>
              <span style={{ fontSize:12, fontWeight:700, color:C.orange, flexShrink:0 }}>{d.type}</span>
              <span style={{ fontSize:12, color:C.textSecondary, flex:1 }}>{d.zone}{d.detail ? " — " + d.detail : ""}</span>
              <button onClick={()=>onChange(defauts.filter(x=>x.id!==d.id))} style={{ background:"none", border:"none", color:C.textMuted, cursor:"pointer", fontSize:14, padding:"0 2px" }}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* 🆕 Barre de progression cliquable */
function ProgressTimeline({ step, data, onJump }) {
  const pct = Math.round(([...Array(9)].filter((_,i)=>isDone(i+1,data)).length / 9) * 100);
  return (
    <div style={{ padding:"12px 14px", background:C.bgDeep, borderBottom:`1px solid ${C.border}` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <span style={{ fontSize:12, color:C.textMuted }}>Progression de la mission</span>
        <span style={{ fontSize:13, fontWeight:700, color: pct===100 ? C.green : C.textPrimary }}>{pct}%</span>
      </div>
      <div style={{ display:"flex", gap:3, alignItems:"flex-end" }}>
        {Array.from({length:9}).map((_,i) => {
          const s=i+1, done=isDone(s,data), active=s===step, unlocked=isUnlocked(s,data);
          return (
            <div key={s} onClick={()=>unlocked&&onJump(s)} style={{ flex:1, cursor:unlocked?"pointer":"default" }}
              title={STEP_LABELS[s]}>
              <div style={{ height:3, borderRadius:2, transition:"background .2s",
                background: done ? C.green : active ? C.accent : "rgba(255,255,255,0.08)" }} />
              <div style={{ marginTop:3, textAlign:"center", fontSize:8, fontFamily:fc, fontWeight:700,
                color: active ? C.accent : done ? C.green : C.textMuted }}>
                {done && !active ? "✓" : s}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Signature */
function SignatureCanvas({ onSigned }) {
  const ref=useRef(null); const drawing=useRef(false); const last=useRef(null);
  const [has,setHas]=useState(false);
  function pos(e) {
    const r=ref.current.getBoundingClientRect();
    const s=e.touches?e.touches[0]:e;
    const sx=ref.current.width/r.width; const sy=ref.current.height/r.height;
    return [(s.clientX-r.left)*sx, (s.clientY-r.top)*sy];
  }
  function start(e){e.preventDefault();drawing.current=true;last.current=pos(e);}
  function move(e){
    if(!drawing.current)return;e.preventDefault();
    const p=pos(e);const ctx=ref.current.getContext("2d");
    ctx.strokeStyle="#fff";ctx.lineWidth=2.2;ctx.lineCap="round";ctx.lineJoin="round";
    ctx.beginPath();ctx.moveTo(...last.current);ctx.lineTo(...p);ctx.stroke();
    last.current=p;setHas(true);onSigned(true);
  }
  function end(){drawing.current=false;}
  function clear(){ref.current.getContext("2d").clearRect(0,0,600,180);setHas(false);onSigned(false);}
  return (
    <div>
      <div style={{ border:`1px solid ${has ? C.borderMid : C.border}`, borderRadius:8, overflow:"hidden", background:C.bgInput, position:"relative", transition:"border-color .2s" }}>
        <canvas ref={ref} width={600} height={160} style={{ width:"100%", height:140, display:"block", touchAction:"none", cursor:"crosshair" }}
          onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end} />
        {!has && (
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
            <span style={{ fontSize:12, color:C.textMuted, animation:"pulse 2s infinite" }}>Signez ici avec votre doigt</span>
          </div>
        )}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
        <span style={{ fontSize:13, color: has ? C.green : C.textMuted, fontWeight: has ? 600 : 400 }}>
          {has ? "✓ Signature capturée" : "Signature requise *"}
        </span>
        <button onClick={clear} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:6, padding:"5px 12px", fontSize:12, color:C.textMuted, cursor:"pointer" }}>Effacer</button>
      </div>
    </div>
  );
}

/* ═══════ STEP SCREENS ═══════ */
function Step1({d,od}){
  const m=MISSIONS[0];
  return (
    <div className="fade">
      {/* Mission card */}
      <Card style={{ marginBottom:12, borderLeft:`3px solid ${C.accent}` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
          <div>
            <div style={{ fontFamily:fc, fontWeight:900, fontSize:22, color:C.textPrimary, letterSpacing:"-0.01em" }}>{m.titre}</div>
            <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>Réf. {m.ref} · {m.client}</div>
          </div>
          <StatutBadge statut="planifiée" small/>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[["📅 Date","Mar 19 Août"],["⏰ Enlèvement",m.heure],["🏁 Livraison",m.heureLiv],["💰 Rémunération",m.remuneration]].map(([l,v])=>(
            <div key={l}><div style={{ fontSize:11, color:C.textMuted, marginBottom:2 }}>{l}</div><div style={{ fontSize:14, fontWeight:600, color:C.textPrimary }}>{v}</div></div>
          ))}
        </div>
      </Card>

      <Card style={{ marginBottom:12 }}>
        <SectionTitle>Véhicule</SectionTitle>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[["Marque / Modèle",`${m.marque} ${m.modele}`],["Immatriculation",m.immat],["VIN",m.vin]].map(([l,v])=>(
            <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:13, color:C.textMuted }}>{l}</span>
              <span style={{ fontSize:14, fontWeight:600, color:C.textPrimary }}>{v}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ marginBottom:12 }}>
        <SectionTitle>Adresses</SectionTitle>
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:11, color:C.textMuted, marginBottom:4 }}>📍 Enlèvement</div>
          <div style={{ fontSize:13, color:C.textPrimary, lineHeight:1.4 }}>{m.adresseEnl}</div>
        </div>
        <div>
          <div style={{ fontSize:11, color:C.textMuted, marginBottom:4 }}>🏁 Livraison</div>
          <div style={{ fontSize:13, color:C.textPrimary, lineHeight:1.4 }}>{m.adresseLiv}</div>
        </div>
      </Card>

      {/* Confirmation */}
      <div onClick={()=>od({...d,ack:!d.ack})}
        style={{ background: d.ack ? C.greenBg : C.bgCard, border:`1px solid ${d.ack ? C.greenBorder : C.border}`, borderRadius:10, padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:12, transition:"all .2s" }}>
        <div style={{ width:22, height:22, borderRadius:4, border:`2px solid ${d.ack ? C.green : C.borderMid}`, background: d.ack ? C.green : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s", fontSize:13 }}>
          {d.ack ? "✓" : ""}
        </div>
        <div>
          <div style={{ fontSize:14, fontWeight:600, color: d.ack ? C.green : C.textPrimary }}>J'ai pris connaissance de la mission</div>
          <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>Obligatoire pour démarrer l'état des lieux</div>
        </div>
      </div>
    </div>
  );
}

function Step2({d,od}){
  const m=MISSIONS[0];
  return (
    <div className="fade">
      <Card style={{ marginBottom:12 }}>
        <SectionTitle>Adresse d'enlèvement</SectionTitle>
        <div style={{ fontSize:14, color:C.textPrimary, lineHeight:1.5, marginBottom:14 }}>{m.adresseEnl}</div>
        {/* 🆕 GPS intégré */}
        <div style={{ display:"flex", gap:8 }}>
          <button style={{ flex:1, background:C.accent, color:"#fff", border:"none", borderRadius:7, padding:"11px", fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            🗺 Google Maps
          </button>
          <button style={{ flex:1, background:C.bgHover, color:C.textSecondary, border:`1px solid ${C.borderMid}`, borderRadius:7, padding:"11px", fontSize:13, fontWeight:500, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            🧭 Waze / Plans
          </button>
        </div>
      </Card>

      <div onClick={()=>od({...d,arrEnl:!d.arrEnl})}
        style={{ background: d.arrEnl ? C.greenBg : C.bgCard, border:`1px solid ${d.arrEnl ? C.greenBorder : C.border}`, borderRadius:10, padding:"16px", cursor:"pointer", display:"flex", alignItems:"center", gap:14, transition:"all .2s" }}>
        <div style={{ width:40, height:40, borderRadius:8, background: d.arrEnl ? C.green : C.bgHover, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0, transition:"all .2s" }}>
          {d.arrEnl ? "✓" : "📍"}
        </div>
        <div>
          <div style={{ fontSize:15, fontWeight:600, color: d.arrEnl ? C.green : C.textPrimary }}>
            {d.arrEnl ? "Arrivée confirmée" : "Je suis arrivé sur place"}
          </div>
          <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>
            {d.arrEnl ? m.adresseEnl : "Appuyez pour confirmer votre présence"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3({d,od}){
  const e=d.enl; function se(f,v){od({...d,enl:{...e,[f]:v}});}
  const carOpts = ["Vide","1/4","1/2","3/4","Plein"];
  const etatOpts = ["Neuf","Très bon","Bon","Passable","Mauvais"];
  return (
    <div className="fade">
      <Card style={{ marginBottom:12 }}>
        <SectionTitle>Véhicule</SectionTitle>
        <div style={{ marginBottom:14 }}>
          <FieldLabel required>Niveau de carburant</FieldLabel>
          <InputSelect value={e.carburant} onChange={v=>se("carburant",v)} options={carOpts} placeholder="Sélectionner le niveau"/>
        </div>
        <div style={{ marginBottom:14 }}>
          <FieldLabel required>Kilométrage</FieldLabel>
          <InputText value={e.km} onChange={v=>se("km",v)} placeholder="Ex: 12 450" inputMode="numeric"/>
        </div>
        <div>
          <FieldLabel required>Clés confiées</FieldLabel>
          <div style={{ display:"flex", gap:8 }}>
            {["1","2","3","4+"].map(n => (
              <button key={n} onClick={()=>se("cles",n)}
                style={{ flex:1, padding:"10px 0", borderRadius:6, border:"none", fontSize:14, fontWeight:600, cursor:"pointer", transition:"all .15s",
                  background: e.cles===n ? C.accent : C.bgInput, color: e.cles===n ? "#fff" : C.textMuted }}>
                🔑 {n}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card style={{ marginBottom:12 }}>
        <SectionTitle>Éléments présents dans le véhicule</SectionTitle>
        {[["docs","Documents (assurance, carte grise)"],["kit","Kit anti-crevaison"],["roue","Roue de secours"],["secu","Kit de sécurité (gilet + triangle)"]].map(([field,label]) => (
          <div key={field} style={{ marginBottom:14 }}>
            <FieldLabel required>{label}</FieldLabel>
            <YesNoToggle value={e[field]} onChange={v=>se(field,v)}/>
          </div>
        ))}
      </Card>

      <Card style={{ marginBottom:12 }}>
        <SectionTitle>État et propreté</SectionTitle>
        <div style={{ marginBottom:14 }}>
          <FieldLabel required>Intérieur</FieldLabel>
          <InputSelect value={e.int} onChange={v=>se("int",v)} options={etatOpts} placeholder="État intérieur"/>
        </div>
        <div style={{ marginBottom:14 }}>
          <FieldLabel required>Extérieur</FieldLabel>
          <InputSelect value={e.ext} onChange={v=>se("ext",v)} options={etatOpts} placeholder="État extérieur"/>
        </div>
        <div style={{ marginBottom:14 }}>
          <FieldLabel>Remarques particulières</FieldLabel>
          <textarea value={e.rem} onChange={ev=>se("rem",ev.target.value)} placeholder="Observations, précisions... (optionnel)" rows={2}
            style={{ width:"100%", background:C.bgInput, border:`1px solid ${C.border}`, borderRadius:7, padding:"10px 12px", fontSize:13, color:C.textPrimary, fontFamily:fb, outline:"none", resize:"none" }}/>
        </div>
        {/* 🆕 Détecteur de défauts */}
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:14 }}>
          <FieldLabel>Signalement de défauts carrosserie</FieldLabel>
          <DefautDetector defauts={e.defauts} onChange={v=>se("defauts",v)}/>
        </div>
      </Card>
    </div>
  );
}

function Step4({d,od}){return(<div className="fade"><Card><SectionTitle>Photos à l'enlèvement</SectionTitle><div style={{fontSize:12,color:C.textMuted,marginBottom:12}}>Avant · Arrière · Côté droit · Côté gauche · + tout défaut visible</div><PhotoManager photos={d.pEnl} onChange={p=>od({...d,pEnl:p})}/></Card></div>);}

function Step5({d,od}){
  const m=MISSIONS[0];
  return (
    <div className="fade">
      <Card style={{ marginBottom:12, background:C.bgDeep }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
          <div style={{ fontSize:11, color:C.textMuted }}>Distance estimée</div>
          <div style={{ fontSize:18, fontWeight:700, color:C.textPrimary }}>~280 km</div>
        </div>
        <div style={{ fontSize:11, color:C.textMuted }}>Durée estimée : 3h15</div>
      </Card>
      <Card style={{ marginBottom:12 }}>
        <SectionTitle>Adresse de livraison</SectionTitle>
        <div style={{ fontSize:14, color:C.textPrimary, lineHeight:1.5, marginBottom:14 }}>{m.adresseLiv}</div>
        <div style={{ display:"flex", gap:8 }}>
          <button style={{ flex:1, background:C.accent, color:"#fff", border:"none", borderRadius:7, padding:"11px", fontSize:13, fontWeight:600, cursor:"pointer" }}>🗺 Google Maps</button>
          <button style={{ flex:1, background:C.bgHover, color:C.textSecondary, border:`1px solid ${C.borderMid}`, borderRadius:7, padding:"11px", fontSize:13, fontWeight:500, cursor:"pointer" }}>🧭 Waze / Plans</button>
        </div>
      </Card>
      <div onClick={()=>od({...d,arrLiv:!d.arrLiv})}
        style={{ background: d.arrLiv ? C.greenBg : C.bgCard, border:`1px solid ${d.arrLiv ? C.greenBorder : C.border}`, borderRadius:10, padding:"16px", cursor:"pointer", display:"flex", alignItems:"center", gap:14, transition:"all .2s" }}>
        <div style={{ width:40, height:40, borderRadius:8, background: d.arrLiv ? C.green : C.bgHover, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>
          {d.arrLiv ? "✓" : "🏁"}
        </div>
        <div>
          <div style={{ fontSize:15, fontWeight:600, color: d.arrLiv ? C.green : C.textPrimary }}>{d.arrLiv ? "Arrivée à destination confirmée" : "Je suis arrivé à destination"}</div>
          <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>{m.adresseLiv}</div>
        </div>
      </div>
    </div>
  );
}

function Step6({d,od}){return(<div className="fade"><Card><SectionTitle>Photos à la livraison</SectionTitle><div style={{fontSize:12,color:C.textMuted,marginBottom:12}}>Avant · Arrière · Tableau de bord · Jauge carburant</div><PhotoManager photos={d.pLiv} onChange={p=>od({...d,pLiv:p})}/></Card></div>);}

function Step7({d,od}){
  const l=d.liv; function sl(f,v){od({...d,liv:{...l,[f]:v}});}
  const kmEnl=parseInt(d.enl.km)||0; const kmLiv=parseInt(l.km)||0;
  const dist = kmLiv>kmEnl ? kmLiv-kmEnl : null;
  return (
    <div className="fade">
      <Card style={{ marginBottom:12 }}>
        <SectionTitle>Relevés à la livraison</SectionTitle>
        <div style={{ marginBottom:14 }}>
          <FieldLabel required>Kilométrage à la livraison</FieldLabel>
          <InputText value={l.km} onChange={v=>sl("km",v)} placeholder={`Min. ${kmEnl} km`} inputMode="numeric"/>
        </div>
        {dist && (
          <div style={{ background:C.accentMist, border:`1px solid rgba(74,144,217,0.2)`, borderRadius:7, padding:"10px 12px", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:16 }}>📏</span>
            <span style={{ fontSize:13, color:C.accent, fontWeight:600 }}>Distance parcourue : <strong>{dist} km</strong></span>
          </div>
        )}
        <div>
          <FieldLabel required>Niveau de carburant</FieldLabel>
          <InputSelect value={l.carburant} onChange={v=>sl("carburant",v)} options={["Vide","1/4","1/2","3/4","Plein"]} placeholder="Niveau de carburant"/>
        </div>
      </Card>
      <Card style={{ marginBottom:12 }}>
        <SectionTitle>Propreté à la livraison</SectionTitle>
        <div style={{ marginBottom:14 }}>
          <FieldLabel required>Intérieur</FieldLabel>
          <InputSelect value={l.int} onChange={v=>sl("int",v)} options={["Neuf","Très bon","Bon","Passable","Mauvais"]} placeholder="État intérieur"/>
        </div>
        <div style={{ marginBottom:14 }}>
          <FieldLabel required>Extérieur</FieldLabel>
          <InputSelect value={l.ext} onChange={v=>sl("ext",v)} options={["Neuf","Très bon","Bon","Passable","Mauvais"]} placeholder="État extérieur"/>
        </div>
        <FieldLabel>Remarques</FieldLabel>
        <textarea value={l.rem} onChange={e=>sl("rem",e.target.value)} placeholder="Observations à la livraison... (optionnel)" rows={2}
          style={{ width:"100%", background:C.bgInput, border:`1px solid ${C.border}`, borderRadius:7, padding:"10px 12px", fontSize:13, color:C.textPrimary, fontFamily:fb, outline:"none", resize:"none" }}/>
      </Card>
    </div>
  );
}

function Step8({d,od}){
  return (
    <div className="fade">
      <Card style={{ marginBottom:12, background:C.bgDeep }}>
        <div style={{ fontSize:13, fontWeight:600, color:C.textPrimary, marginBottom:4 }}>Mission {MISSIONS[0].ref}</div>
        <div style={{ fontSize:12, color:C.textMuted }}>En signant, vous confirmez la bonne exécution du convoyage et l'exactitude des informations renseignées.</div>
      </Card>
      <Card style={{ marginBottom:12 }}>
        <SectionTitle>Signature du convoyeur</SectionTitle>
        <SignatureCanvas onSigned={s=>od({...d,signed:s})}/>
        <div style={{ marginTop:12, background:C.bgDeep, borderRadius:7, padding:"10px 12px" }}>
          <div style={{ fontSize:13, fontWeight:600, color:C.textPrimary }}>MARCKATTY REGULAT</div>
          <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>{new Date().toLocaleDateString("fr-FR")}</div>
        </div>
      </Card>
    </div>
  );
}

function Step9({d,onFin}){
  const m=MISSIONS[0];
  const rows=[["Référence",m.ref],["Trajet",m.titre],["Véhicule",`${m.marque} ${m.modele}`],["Immatriculation",m.immat],["Km enlèvement",`${d.enl.km} km`],["Km livraison",`${d.liv.km} km`],["Distance",`${(parseInt(d.liv.km)||0)-(parseInt(d.enl.km)||0)} km`],["Carburant enl.",d.enl.carburant],["Carburant liv.",d.liv.carburant],["Clés",d.enl.cles],["Intérieur",`${d.enl.int} → ${d.liv.int}`],["Extérieur",`${d.enl.ext} → ${d.liv.ext}`],["Défauts",d.enl.defauts?.length||"Aucun"],["Photos enl.",`${d.pEnl.length} photos`],["Photos liv.",`${d.pLiv.length} photos`]];
  return (
    <div className="fade">
      <Card style={{ marginBottom:12, background:C.bgDeep, textAlign:"center", padding:"22px 16px" }}>
        <div style={{ fontFamily:fc, fontSize:9, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:C.textMuted, marginBottom:4 }}>Procès verbal de livraison</div>
        <div style={{ fontFamily:fc, fontWeight:900, fontSize:20, color:C.textPrimary }}>MISSION {m.ref}</div>
        <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>{new Date().toLocaleDateString("fr-FR")}</div>
      </Card>
      <Card style={{ marginBottom:12 }}>
        <SectionTitle>Récapitulatif</SectionTitle>
        {rows.map(([k,v]) => (
          <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
            <span style={{ fontSize:12, color:C.textMuted }}>{k}</span>
            <span style={{ fontSize:13, fontWeight:600, color:C.textPrimary }}>{v}</span>
          </div>
        ))}
      </Card>
      {d.enl.defauts?.length>0 && (
        <Card style={{ marginBottom:12 }}>
          <SectionTitle color={C.orange}>Défauts signalés à l'enlèvement</SectionTitle>
          {d.enl.defauts.map(df=>(
            <div key={df.id} style={{ fontSize:13, color:C.orange, padding:"5px 0", borderBottom:`1px solid ${C.border}` }}>⚠ {df.type} — {df.zone}{df.detail?" — "+df.detail:""}</div>
          ))}
        </Card>
      )}
      <Card style={{ marginBottom:12, border:`1px solid ${C.greenBorder}`, background:C.greenBg }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:20 }}>✓</span>
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:C.green }}>Signature apposée</div>
            <div style={{ fontSize:12, color:C.textMuted, marginTop:1 }}>MARCKATTY REGULAT · {new Date().toLocaleDateString("fr-FR")}</div>
          </div>
        </div>
      </Card>
      <div style={{ display:"flex", gap:8, marginBottom:10 }}>
        <BtnGhost style={{ flex:1 }}>📤 Envoyer au client</BtnGhost>
        <BtnGhost style={{ flex:1 }}>⬇ Télécharger PDF</BtnGhost>
      </div>
      <BtnPrimary onClick={onFin} style={{ width:"100%", padding:"15px", fontSize:15 }}>
        Finaliser la mission →
      </BtnPrimary>
    </div>
  );
}

/* ═══════ MOBILE APP ═══════ */
function MobileApp({ showPrice = false }) {
  const [tab,setTab]=useState("missions");
  const [selM,setSelM]=useState(null);
  const [inEDL,setInEDL]=useState(false);
  const [step,setStep]=useState(1);
  const [data,setData]=useState(initData);
  const [errors,setErrors]=useState([]);
  const [shaking,setShaking]=useState(false);
  const [finished,setFinished]=useState(false);
  const scrollRef=useRef(null);

  // Success screen
  if(finished) return(
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center", position:"relative", overflow:"hidden" }}>
      {/* Watermark carrés safe. */}
      <div style={{ position:"absolute", top:20, right:20, display:"grid", gridTemplateColumns:"repeat(5,10px)", gap:3, opacity:0.06 }}>
        {[...Array(25)].map((_,i)=><div key={i} style={{ width:10, height:10, background:C.accent, borderRadius:2 }}/>)}
      </div>
      <div style={{ marginBottom:24 }}><SafeLogo size={1.2}/></div>
      <div style={{ width:64, height:64, borderRadius:12, background:C.greenBg, border:`2px solid ${C.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, marginBottom:20 }}>✓</div>
      <div style={{ fontFamily:"'Barlow',sans-serif", fontWeight:800, fontSize:26, color:C.textPrimary, marginBottom:4 }}>Mission terminée</div>
      <div style={{ fontSize:13, color:C.textSecondary, marginBottom:6 }}>Procès verbal généré</div>
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:32, color:C.textMuted, fontSize:12 }}>
        <span style={{ display:"inline-block", width:4, height:4, background:C.accent, borderRadius:1 }}/>
        {new Date().toLocaleDateString("fr-FR")}
        <span style={{ display:"inline-block", width:4, height:4, background:C.accent, borderRadius:1 }}/>
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <BtnGhost>📤 Envoyer</BtnGhost>
        <BtnPrimary onClick={()=>{setFinished(false);setInEDL(false);setStep(1);setData(initData);setSelM(null);}}>← Retour</BtnPrimary>
      </div>
    </div>
  );

  // EDL Wizard
  if(inEDL && selM){
    const errs=validate(step,data); const canGo=errs.length===0;
    function tryNext(){if(canGo){setErrors([]);setStep(s=>Math.min(9,s+1));scrollRef.current?.scrollTo({top:0,behavior:"smooth"});}else{setErrors(errs);setShaking(true);setTimeout(()=>setShaking(false),400);}}
    function jump(s){if(isUnlocked(s,data)){setErrors([]);setStep(s);scrollRef.current?.scrollTo({top:0,behavior:"smooth"});}}
    const SC=[null,Step1,Step2,Step3,Step4,Step5,Step6,Step7,Step8,Step9][step];
    return(
      <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:C.bg }}>
        {/* Header */}
        <div style={{ background:C.bgDeep, borderBottom:`1px solid ${C.border}`, padding:"50px 16px 0", position:"sticky", top:0, zIndex:10 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
            <button onClick={()=>setInEDL(false)} style={{ background:C.bgHover, border:`1px solid ${C.border}`, borderRadius:8, width:36, height:36, cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", color:C.textSecondary }}>←</button>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:11, color:C.textMuted, marginBottom:1 }}>État des lieux</div>
              <div style={{ fontFamily:fc, fontWeight:700, fontSize:15, color:C.textPrimary }}>{STEP_LABELS[step]}</div>
            </div>
            <div style={{ background:C.accentMist, border:`1px solid ${C.accentBorder}`, borderRadius:8, padding:"5px 10px", fontSize:12, fontWeight:700, color:C.accent }}>{step}/9</div>
          </div>
          {/* 🆕 Barre de progression */}
          <ProgressTimeline step={step} data={data} onJump={jump}/>
        </div>

        {/* Content */}
        <div ref={scrollRef} style={{ padding:"14px 14px 110px", overflowY:"auto" }}>
          {errors.length>0 && (
            <div className={shaking?"shake":""} style={{ background:C.accentMist, border:`1px solid ${C.accentBorder}`, borderRadius:8, padding:"12px 14px", marginBottom:12 }}>
              <div style={{ fontSize:13, fontWeight:600, color:C.accent, marginBottom:errors.length>1?6:0 }}>
                {errors.length===1 ? "⚠ "+errors[0] : "⚠ Champs requis manquants :"}
              </div>
              {errors.length>1 && <ul style={{ paddingLeft:16 }}>{errors.map((e,i)=><li key={i} style={{ fontSize:12, color:C.accent, marginTop:3 }}>{e}</li>)}</ul>}
            </div>
          )}
          <SC d={data} od={setData} onFin={()=>setFinished(true)}/>
        </div>

        {/* CTA */}
        {step<9 && (
          <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:C.bgDeep, borderTop:`1px solid ${C.border}`, padding:"12px 14px 26px" }}>
            <button onClick={tryNext} style={{ width:"100%", background: canGo ? C.accent : C.bgHover, color: canGo ? "#fff" : C.textMuted, border:`1px solid ${canGo ? C.accent : C.border}`, borderRadius:8, padding:"14px", fontSize:15, fontWeight:700, cursor: canGo ? "pointer" : "not-allowed", transition:"all .2s", fontFamily:fb }}>
              {canGo ? "Étape suivante →" : "🔒 Complétez les champs requis"}
            </button>
            {!canGo && <div style={{ textAlign:"center", marginTop:6, fontSize:12, color:C.accent }}>{errs.length} élément{errs.length>1?"s":""} manquant{errs.length>1?"s":""}</div>}
          </div>
        )}
      </div>
    );
  }

  // Mission detail
  if(selM && !inEDL) return(
    <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:C.bg }}>
      <div style={{ background:C.bgDeep, borderBottom:`1px solid ${C.border}`, padding:"50px 16px 14px", position:"sticky", top:0, zIndex:10, display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={()=>setSelM(null)} style={{ background:C.bgHover, border:`1px solid ${C.border}`, borderRadius:8, width:36, height:36, cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", color:C.textSecondary }}>←</button>
        <div style={{ fontFamily:fc, fontWeight:700, fontSize:17, color:C.textPrimary }}>{selM.titre}</div>
      </div>
      <div style={{ padding:"14px 14px 80px" }}>
        <Card style={{ marginBottom:12, borderLeft:`3px solid ${C.accent}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
            <div>
              <div style={{ fontFamily:fc, fontWeight:900, fontSize:22, color:C.textPrimary }}>{selM.titre}</div>
              <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>Réf. {selM.ref}</div>
            </div>
            <StatutBadge statut={selM.statut}/>
          </div>
          {[["🚗","Véhicule",`${selM.vehicule} · ${selM.immat}`],["📅","Date / Horaires",`${selM.date} · ${selM.heure} → ${selM.heureLiv}`],["🏢","Client",selM.client],["💰","Rémunération", showPrice ? selM.remuneration : "••••••"]].map(([icon,l,v])=>(
            <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:12, color:C.textMuted }}>{icon} {l}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.textPrimary }}>{v}</span>
            </div>
          ))}
        </Card>
        <BtnPrimary onClick={()=>setInEDL(true)} style={{ width:"100%", padding:"14px", fontSize:15 }}>
          Démarrer l'état des lieux →
        </BtnPrimary>
      </div>
    </div>
  );

  // Mission list
  return(
    <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:C.bg }}>
      <div style={{ padding:"50px 16px 14px", background:C.bgDeep, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
          <div>
            <SafeLogo size={0.55} />
            <div style={{ fontSize:8, fontFamily:fb, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.textSecondary, marginTop:3 }}>Convoyage de véhicules</div>
            <div style={{ fontFamily:fc, fontWeight:900, fontSize:24, color:C.textPrimary }}>{tab==="missions"?"Mes Missions":"Mon Compte"}</div>
          </div>
          <div style={{ width:8, height:8, borderRadius:4, background:C.green }}/>
        </div>
      </div>

      <div style={{ padding:"12px 14px 88px" }}>
        {tab==="missions" && (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:14 }}>
              {[{l:"Terminées",v:MISSIONS.filter(m=>m.statut==="terminée").length,c:C.green,bg:C.greenBg},{l:"En cours",v:MISSIONS.filter(m=>m.statut==="en cours").length,c:C.orange,bg:C.orangeBg},{l:"Planifiées",v:MISSIONS.filter(m=>m.statut==="planifiée").length,c:C.accent,bg:C.accentMist}].map(s=>(
                <Card key={s.l} style={{ textAlign:"center", padding:"12px 8px", background:s.bg, border:`1px solid rgba(255,255,255,0.04)` }}>
                  <div style={{ fontFamily:fc, fontWeight:900, fontSize:26, color:s.c, lineHeight:1 }}>{s.v}</div>
                  <div style={{ fontSize:11, color:s.c, fontWeight:500, marginTop:3, opacity:.8 }}>{s.l}</div>
                </Card>
              ))}
            </div>
            {MISSIONS.map(m=>(
              <Card key={m.id} onClick={()=>setSelM(m)}
                style={{ marginBottom:8, cursor:"pointer", borderLeft:`3px solid ${m.statut==="terminée"?C.green:m.statut==="en cours"?C.orange:C.borderMid}`, transition:"background .15s" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.bgHover}
                onMouseLeave={e=>e.currentTarget.style.background=C.bgCard}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <div>
                    <div style={{ fontFamily:fc, fontWeight:900, fontSize:18, color:C.textPrimary }}>{m.titre}</div>
                    <div style={{ fontSize:11, color:C.textMuted, marginTop:1 }}>Réf. {m.ref}</div>
                  </div>
                  <StatutBadge statut={m.statut} small/>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <div style={{ fontSize:12, color:C.textSecondary }}>📅 {m.date} · {m.heure} → {m.heureLiv}</div>
                  <div style={{ fontSize:12, color:C.textSecondary }}>🚗 {m.vehicule} <span style={{ background:C.bgHover, border:`1px solid ${C.border}`, fontSize:10, fontWeight:700, padding:"1px 6px", borderRadius:4, marginLeft:4 }}>{m.immat}</span></div>
                  <div style={{ fontSize:12, color:C.textSecondary }}>🏢 {m.client} · <span style={{ color: showPrice ? C.green : C.textMuted, fontWeight:600, letterSpacing: showPrice ? 0 : "0.1em" }}>{showPrice ? m.remuneration : "••••••"}</span></div>
                </div>
              </Card>
            ))}
          </>
        )}
        {tab==="compte" && (
          <div>
            <Card style={{ marginBottom:14, display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:54, height:54, borderRadius:27, background:C.bgHover, border:`1px solid ${C.borderMid}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>👤</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:fc, fontWeight:700, fontSize:15, color:C.textPrimary, marginBottom:8 }}>MARCKATTY REGULAT</div>
                <div style={{ display:"flex", gap:8 }}>
                  <button style={{ flex:1, background:C.greenBg, border:`1px solid ${C.greenBorder}`, color:C.green, borderRadius:6, padding:"7px 0", fontSize:12, fontWeight:600, cursor:"pointer" }}>✓ Dispo</button>
                  <button style={{ flex:1, background:C.bgHover, border:`1px solid ${C.border}`, color:C.textMuted, borderRadius:6, padding:"7px 0", fontSize:12, fontWeight:500, cursor:"pointer" }}>✕ Indispo</button>
                </div>
              </div>
            </Card>
            {[{l:"Mon profil",items:[{icon:"📞",t:"+33 06 16 64 99 06"},{icon:"📍",t:"GPS app par défaut"}]},{l:"Juridique",items:[{icon:"📄",t:"CGU"},{icon:"🔒",t:"Politique de confidentialité"}]},{l:"Données",items:[{icon:"🔄",t:"Synchronisation données"},{icon:"🔄",t:"Synchronisation missions"}]}].map(s=>(
              <div key={s.l} style={{ marginBottom:16 }}>
                <div style={{ fontSize:10, fontFamily:fc, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.textMuted, marginBottom:7, paddingLeft:2 }}>{s.l}</div>
                <Card>
                  {s.items.map((item,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom:i<s.items.length-1?`1px solid ${C.border}`:"none" }}>
                      <span style={{ fontSize:18, width:26, textAlign:"center" }}>{item.icon}</span>
                      <span style={{ flex:1, fontSize:14, color:C.textPrimary }}>{item.t}</span>
                      <span style={{ color:C.textMuted, fontSize:16 }}>›</span>
                    </div>
                  ))}
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:C.bgDeep, borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-around", padding:"10px 0 22px" }}>
        {[{id:"missions",icon:"🚗",l:"Accueil"},{id:"compte",icon:"👤",l:"Compte"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4, padding:"0 28px" }}>
            <div style={{ width:34, height:34, borderRadius:17, background: tab===t.id ? C.accent : C.bgHover, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, transition:"background .2s" }}>{t.icon}</div>
            <span style={{ fontSize:11, color: tab===t.id ? C.accent : C.textMuted, fontWeight: tab===t.id ? 700 : 400 }}>{t.l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════ DESKTOP ═══════ */
function DesktopApp({ user, showPrice = false }) {
  const [page,setPage]=useState("dashboard");
  const navItems=[{id:"dashboard",icon:"📊",l:"Tableau de bord"},{id:"missions",icon:"🚗",l:"Missions"},{id:"clients",icon:"👥",l:"Clients"},{id:"rapports",icon:"📄",l:"Rapports"}];
  const bars=[{l:"Lun",v:3},{l:"Mar",v:5},{l:"Mer",v:2},{l:"Jeu",v:7},{l:"Ven",v:4},{l:"Sam",v:1},{l:"Dim",v:0}];
  return(
    <div style={{ display:"flex", minHeight:"100vh", background:C.bg, fontFamily:fb }}>
      {/* Sidebar */}
      <div style={{ width:220, background:C.bgDeep, borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", padding:"0 0 20px", flexShrink:0, position:"sticky", top:0, height:"100vh" }}>
        <div style={{ padding:"22px 20px 18px", borderBottom:`1px solid ${C.border}`, marginBottom:12 }}>
          <SafeLogo size={0.72} />
          <div style={{ fontFamily:fb, fontSize:10, fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", color:C.textSecondary, marginTop:5 }}>Convoyage de véhicules</div>
        </div>
        <nav style={{ flex:1, padding:"4px 10px", display:"flex", flexDirection:"column", gap:2 }}>
          {navItems.map(n=>(
            <button key={n.id} onClick={()=>setPage(n.id)}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:8, border:"none", cursor:"pointer", textAlign:"left", transition:"all .15s", background: page===n.id ? C.accentMist : "transparent", color: page===n.id ? C.accent : C.textSecondary }}>
              <span style={{ fontSize:16, width:22, textAlign:"center" }}>{n.icon}</span>
              <span style={{ fontSize:13, fontWeight: page===n.id ? 700 : 400 }}>{n.l}</span>
              {page===n.id && <div style={{ marginLeft:"auto", width:4, height:4, borderRadius:2, background:C.accent }}/>}
            </button>
          ))}
        </nav>
        <div style={{ margin:"0 10px 8px", background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:8, padding:"12px 14px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:32, height:32, borderRadius:6, background:C.accentMist, border:`1px solid ${C.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>👤</div>
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:C.textPrimary }}>{user.name}</div>
              <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:2 }}><div style={{ width:5, height:5, borderRadius:3, background:C.green }}/><span style={{ fontSize:11, color:C.green }}>Disponible</span></div>
            </div>
          </div>
        </div>
        {/* Tagline safe. */}
        <div style={{ margin:"0 10px", padding:"9px 12px", display:"flex", alignItems:"center", gap:5 }}>
          <span style={{ display:"inline-block", width:4, height:4, background:C.accent, borderRadius:1, flexShrink:0 }}/>
          <span style={{ fontFamily:fb, fontSize:9, fontWeight:500, letterSpacing:"0.1em", color:C.textMuted, fontStyle:"italic" }}>Votre image, à chaque kilomètre.</span>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1, overflowY:"auto" }}>
        <div style={{ padding:"24px 28px 0", marginBottom:22, display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", overflow:"hidden" }}>
          {/* Watermark carrés safe. */}
          <div style={{ position:"absolute", right:160, top:-4, display:"grid", gridTemplateColumns:"repeat(6,10px)", gap:3, opacity:0.05, pointerEvents:"none" }}>
            {[...Array(18)].map((_,i)=><div key={i} style={{ width:10, height:10, background:C.accent, borderRadius:2 }}/>)}
          </div>
          <div>
            <div style={{ fontFamily:"'Barlow',sans-serif", fontWeight:800, fontSize:26, color:C.textPrimary, letterSpacing:"-0.01em" }}>{navItems.find(n=>n.id===page)?.l}</div>
            <div style={{ fontSize:12, color:C.textMuted, marginTop:2, display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ display:"inline-block", width:4, height:4, background:C.accent, borderRadius:1 }}/>
              Semaine du 12 au 19 Août 2025 · {MISSIONS.length} missions
            </div>
          </div>
          <BtnPrimary style={{ padding:"10px 18px", fontSize:13 }}>+ Nouvelle mission</BtnPrimary>
        </div>

        {page==="dashboard" && (
          <div style={{ padding:"0 28px 40px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:18 }}>
              {[{l:"Terminées",v:MISSIONS.filter(m=>m.statut==="terminée").length,s:"67% du total",c:C.green,bg:C.greenBg},{l:"En cours",v:MISSIONS.filter(m=>m.statut==="en cours").length,s:"Sur route",c:C.orange,bg:C.orangeBg},{l:"Planifiées",v:MISSIONS.filter(m=>m.statut==="planifiée").length,s:"À venir",c:C.accent,bg:C.accentMist},{l:"Km parcourus",v:"1 570",s:"Ce mois",c:C.textSecondary,bg:C.bgCard}].map(k=>(
                <Card key={k.l} style={{ background:k.bg }}>
                  <div style={{ fontSize:11, color:C.textMuted, marginBottom:10 }}>{k.l}</div>
                  <div style={{ fontFamily:fc, fontWeight:900, fontSize:30, color:k.c, lineHeight:1, marginBottom:4 }}>{k.v}</div>
                  <div style={{ fontSize:11, color:C.textMuted }}>{k.s}</div>
                </Card>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:12, marginBottom:18 }}>
              <Card>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:C.textPrimary }}>Activité de la semaine</div>
                  <span style={{ fontSize:11, color:C.textMuted }}>Missions / jour</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:60 }}>
                  {bars.map((b,i)=>(
                    <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                      <div style={{ width:"100%", height:50, display:"flex", alignItems:"flex-end" }}>
                        <div style={{ width:"100%", background: b.v===0 ? C.bgHover : C.accent, height:`${Math.round((b.v/7)*100)}%`, borderRadius:"3px 3px 0 0", opacity:b.v===0?0.3:0.85, transition:"height .4s" }}/>
                      </div>
                      <span style={{ fontSize:9, color:C.textMuted }}>{b.l}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <div style={{ fontSize:14, fontWeight:600, color:C.textPrimary, marginBottom:14 }}>Clients actifs</div>
                {[{n:"STE ELIOR",m:3,sub:"Privilège"},{n:"FLEET AUTO SAS",m:2,sub:"Confort"},{n:"GUEUDET AUTO",m:1,sub:"Essentiel"}].map((c,i)=>(
                  <div key={c.n} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:i<2?`1px solid ${C.border}`:"none" }}>
                    <div style={{ width:30, height:30, borderRadius:6, background:C.accentMist, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:fc, fontWeight:700, fontSize:14, color:C.accent, flexShrink:0 }}>{c.n[0]}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:C.textPrimary }}>{c.n}</div>
                      <div style={{ fontSize:11, color:C.textMuted }}>{c.m} mission{c.m>1?"s":""} · {c.sub}</div>
                    </div>
                    <span style={{ background:C.greenBg, color:C.green, fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:5 }}>actif</span>
                  </div>
                ))}
              </Card>
            </div>
            <Card>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <div style={{ fontSize:14, fontWeight:600, color:C.textPrimary }}>Missions récentes</div>
                <span style={{ fontSize:12, color:C.accent, cursor:"pointer" }}>Voir tout →</span>
              </div>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead><tr style={{ borderBottom:`1px solid ${C.border}` }}>
                  {["Référence","Trajet","Client","Véhicule","Date","Statut","Rémun."].map(h=><th key={h} style={{ textAlign:"left", padding:"0 12px 10px", fontSize:11, fontWeight:600, color:C.textMuted }}>{h}</th>)}
                </tr></thead>
                <tbody>{MISSIONS.map((m,i)=>(
                  <tr key={m.id} style={{ borderBottom:i<3?`1px solid ${C.border}`:"none", transition:"background .15s", cursor:"pointer" }}
                    onMouseEnter={e=>e.currentTarget.style.background=C.bgHover}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"11px 12px" }}><span style={{ fontFamily:fc, fontWeight:700, fontSize:13, color:C.accent }}>{m.ref}</span></td>
                    <td style={{ padding:"11px 12px", fontSize:14, fontWeight:600, color:C.textPrimary }}>{m.titre}</td>
                    <td style={{ padding:"11px 12px", fontSize:13, color:C.textSecondary }}>{m.client}</td>
                    <td style={{ padding:"11px 12px" }}><div style={{ fontSize:13, color:C.textPrimary }}>{m.vehicule}</div><div style={{ fontSize:11, color:C.textMuted }}>{m.immat}</div></td>
                    <td style={{ padding:"11px 12px", fontSize:12, color:C.textMuted }}>{m.date}</td>
                    <td style={{ padding:"11px 12px" }}><StatutBadge statut={m.statut} small/></td>
                    <td style={{ padding:"11px 12px", fontSize:14, fontWeight:700, color: showPrice ? C.green : C.textMuted, letterSpacing: showPrice ? 0 : "0.1em" }}>{showPrice ? m.remuneration : "••••••"}</td>
                  </tr>
                ))}</tbody>
              </table>
            </Card>
          </div>
        )}
        {(page==="clients"||page==="rapports") && (
          <div style={{ padding:"0 28px" }}><Card style={{ padding:"80px", textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:16, opacity:.4 }}>{page==="clients"?"👥":"📄"}</div>
            <div style={{ fontSize:18, fontWeight:600, color:C.textPrimary, marginBottom:8 }}>Module en développement</div>
            <div style={{ fontSize:13, color:C.textMuted }}>Disponible prochainement</div>
          </Card></div>
        )}
        {page==="missions" && (
          <div style={{ padding:"0 28px 40px" }}>
            <Card>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead><tr style={{ borderBottom:`1px solid ${C.border}` }}>
                  {["Réf","Trajet","Client","Immat","Date","Km","Statut","Rémun."].map(h=><th key={h} style={{ textAlign:"left", padding:"0 12px 10px", fontSize:11, fontWeight:600, color:C.textMuted, whiteSpace:"nowrap" }}>{h}</th>)}
                </tr></thead>
                <tbody>{MISSIONS.map((m,i)=>(
                  <tr key={m.id} style={{ borderBottom:i<3?`1px solid ${C.border}`:"none" }}
                    onMouseEnter={e=>e.currentTarget.style.background=C.bgHover}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"11px 12px" }}><span style={{ fontFamily:fc, fontWeight:700, fontSize:13, color:C.accent }}>{m.ref}</span></td>
                    <td style={{ padding:"11px 12px", fontSize:14, fontWeight:600, color:C.textPrimary }}>{m.titre}</td>
                    <td style={{ padding:"11px 12px", fontSize:13, color:C.textSecondary }}>{m.client}</td>
                    <td style={{ padding:"11px 12px" }}><span style={{ background:C.bgHover, border:`1px solid ${C.border}`, fontSize:11, fontWeight:700, padding:"2px 7px", borderRadius:4, color:C.textPrimary }}>{m.immat}</span></td>
                    <td style={{ padding:"11px 12px", fontSize:12, color:C.textMuted }}>{m.date}</td>
                    <td style={{ padding:"11px 12px", fontSize:13, fontWeight:600, color:C.textPrimary }}>{m.kmLiv&&m.kmLiv!=="—"?parseInt(m.kmLiv)-parseInt(m.kmEnl)+" km":"—"}</td>
                    <td style={{ padding:"11px 12px" }}><StatutBadge statut={m.statut} small/></td>
                    <td style={{ padding:"11px 12px", fontSize:13, fontWeight:700, color: showPrice ? C.green : C.textMuted, letterSpacing: showPrice ? 0 : "0.1em" }}>{showPrice ? m.remuneration : "••••••"}</td>
                  </tr>
                ))}</tbody>
              </table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════ ROOT ═══════ */
const DEMO_USER = { name:"Marckatty Regulat" };
export default function AppLegacy({ session }) {
  const platform = usePlatform();
  const [user]       = useState(DEMO_USER);
  const [forceView, setForceView] = useState(null);
  const [dark, setDark]           = useState(true);
  const [showPrice, setShowPrice] = useState(false); // 💰 masqué par défaut

  C = makeTheme(dark);

  const view = forceView || (platform==="desktop"||platform==="unknown" ? "desktop" : "mobile");

  return (
    <div style={{ background: C.bg, minHeight:"100vh", transition:"background .3s" }}>
      <GFont theme={C}/>

      {/* ── Barre de contrôle ── */}
      <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:9999, background:C.bgDeep, borderBottom:`1px solid ${C.border}`, padding:"5px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"background .3s" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <SafeLogo size={0.45} />
          <span style={{ fontFamily:fb, fontSize:10, fontWeight:500, letterSpacing:"0.12em", color:C.textSecondary, textTransform:"uppercase" }}>
            · {view==="desktop"?"🖥 Bureau":"📱 Mobile"}
          </span>
        </div>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>

          {/* 💰 Toggle prix — opérateur uniquement */}
          <button onClick={()=>setShowPrice(!showPrice)}
            title={showPrice ? "Masquer les prix" : "Afficher les prix"}
            style={{ display:"flex", alignItems:"center", gap:5, background: showPrice ? "rgba(58,178,110,0.12)" : C.bgHover, border:`1px solid ${showPrice ? "rgba(58,178,110,0.3)" : C.border}`, borderRadius:20, padding:"4px 10px 4px 6px", cursor:"pointer", transition:"all .25s" }}>
            <div style={{ width:30, height:16, borderRadius:8, background: showPrice ? C.green : C.borderMid, position:"relative", transition:"background .25s", flexShrink:0 }}>
              <div style={{ position:"absolute", top:2, left: showPrice ? 16 : 2, width:12, height:12, borderRadius:6, background:"#fff", transition:"left .25s", boxShadow:"0 1px 3px rgba(0,0,0,0.3)" }}/>
            </div>
            <span style={{ fontFamily:fb, fontSize:11, fontWeight:600, color: showPrice ? C.green : C.textMuted, whiteSpace:"nowrap" }}>
              💰 Prix
            </span>
          </button>

          {/* Toggle clair / sombre */}
          <button onClick={()=>setDark(!dark)}
            style={{ display:"flex", alignItems:"center", gap:6, background: dark ? "#1e2024" : "#E5E2DC", border:`1px solid ${C.border}`, borderRadius:20, padding:"4px 10px 4px 6px", cursor:"pointer", transition:"all .25s" }}>
            <div style={{ width:30, height:16, borderRadius:8, background: dark ? C.bgHover : "#CBD0D8", position:"relative", transition:"background .25s", flexShrink:0 }}>
              <div style={{ position:"absolute", top:2, left: dark ? 16 : 2, width:12, height:12, borderRadius:6, background: dark ? C.textSecondary : "#fff", transition:"left .25s, background .25s", boxShadow:"0 1px 3px rgba(0,0,0,0.3)" }}/>
            </div>
            <span style={{ fontFamily:fb, fontSize:11, fontWeight:600, color:C.textSecondary, whiteSpace:"nowrap" }}>
              {dark ? "🌙 Sombre" : "☀️ Clair"}
            </span>
          </button>

          {/* Vue desktop / mobile */}
          {[{id:"desktop",l:"🖥 Bureau"},{id:"mobile",l:"📱 Mobile"}].map(b=>(
            <button key={b.id} onClick={()=>setForceView(b.id)}
              style={{ background: view===b.id ? C.accent : C.bgHover, color: view===b.id ? "#fff" : C.textMuted, border:`1px solid ${view===b.id ? C.accent : C.border}`, borderRadius:6, padding:"4px 12px", fontFamily:fb, fontSize:11, fontWeight:600, cursor:"pointer", transition:"all .15s" }}>
              {b.l}
            </button>
          ))}

          {/* Déconnexion */}
          {session && (
            <button
              onClick={() => supabase.auth.signOut()}
              title="Se déconnecter"
              style={{ background: "transparent", color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: 6, padding: "4px 10px", fontFamily: fb, fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all .15s", display: "flex", alignItems: "center", gap: 4 }}>
              ⎋ Sortir
            </button>
          )}
        </div>
      </div>

      <div style={{ paddingTop:30 }}>
        {view==="desktop" ? <DesktopApp user={user} showPrice={showPrice}/> : (
          <div style={{ display:"flex", justifyContent:"center", background: dark ? "#050506" : "#D8D4CC", minHeight:"calc(100vh - 30px)", alignItems:"flex-start", paddingTop:20, transition:"background .3s" }}>
            <div style={{ width:390, background:C.bg, borderRadius:40, overflow:"hidden", boxShadow: dark ? "0 28px 80px rgba(0,0,0,0.9)" : "0 28px 60px rgba(0,0,0,0.25)", border:"8px solid #111", position:"relative", minHeight:700, transition:"background .3s" }}>
              <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:110, height:26, background:"#111", borderRadius:"0 0 16px 16px", zIndex:50 }}/>
              <MobileApp showPrice={showPrice}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
