import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════ */
const C = {
  bg: "#EEF1F6", white: "#FFFFFF", navy: "#1A3A6B",
  blue: "#2D6BB5", blueLight: "#D6E8FB", blueXLight: "#EBF3FD",
  purple: "#7A6CC0", purpleLight: "#EDE9FA",
  gold: "#C4903B", goldLight: "#FBF3E3",
  green: "#1AB954", greenLight: "#E8F7EE",
  red: "#E53E3E", redLight: "#FFF0F0",
  orange: "#F59E0B", orangeLight: "#FEF3C7",
  grayText: "#8E9BB5", border: "#E2E8F3", text: "#1A2340",
};
const font = "'DM Sans', sans-serif";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════ */
const GFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${C.bg}; font-family: ${font}; }
    button, input, select, textarea { font-family: inherit; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
    @keyframes fadeIn   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideIn  { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes popIn    { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
    @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.55} }
    @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
    .fade  { animation: fadeIn  .28s ease both; }
    .slide { animation: slideIn .28s ease both; }
    .pop   { animation: popIn   .22s ease both; }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════
   PLATFORM DETECTION
═══════════════════════════════════════════════════════════ */
function usePlatform() {
  const [p, setP] = useState("unknown");
  useEffect(() => {
    const isPWA = window.matchMedia("(display-mode: standalone)").matches
               || window.navigator.standalone === true;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
                  || window.innerWidth < 768;
    if (isPWA)         setP("pwa");
    else if (isMobile) setP("mobile");
    else               setP("desktop");
  }, []);
  return p;
}

/* ═══════════════════════════════════════════════════════════
   SAMPLE DATA
═══════════════════════════════════════════════════════════ */
const MISSIONS = [
  { id:"MISS628", ref:"MISS628", titre:"MEAUX / IFS",          client:"STE ELIOR",     date:"Mar 19 Août", heure:"08:00", heureLiv:"17:00", vehicule:"Peugeot EXPERT M",  immat:"HE-137-RN", statut:"terminée",  marque:"Peugeot",    modele:"EXPERT M",  adresseEnl:"Peugeot Meaux Gueudet, 1880 Av. Roosevelt, Meaux", adresseLiv:"13 Rue François Arago, Ifs",     email:"elefort@gueudet.fr",     vin:"SU304910",       enl:{carburant:"1/4",  km:"0",     cles:"2",documents:"Oui",kitCrevaison:"Non",roueSec:"Oui",kitSecurite:"Oui",interieur:"Neuf",   exterieur:"Neuf",   remarques:"Niveau carburant : 1/4"}, liv:{km:"280",  carburant:"1/4", interieur:"Neuf",   exterieur:"Neuf",   remarques:""}, photosEnl:4,photosLiv:4 },
  { id:"MISS614", ref:"MISS614", titre:"PARIS / LYON",         client:"FLEET AUTO SAS",date:"Ven 15 Août", heure:"09:00", heureLiv:"18:30", vehicule:"Renault TRAFIC",    immat:"AB-234-CD", statut:"en cours",  marque:"Renault",    modele:"TRAFIC",    adresseEnl:"Renault Paris Nation, 12 Pl. de la Nation",       adresseLiv:"45 Rue Garibaldi, Lyon",        email:"contact@fleetauto.fr",   vin:"VF1FL000123",    enl:{carburant:"1/2",  km:"45200", cles:"1",documents:"Oui",kitCrevaison:"Oui",roueSec:"Non",kitSecurite:"Oui",interieur:"Bon",    exterieur:"Bon",    remarques:""}, liv:null, photosEnl:3,photosLiv:0 },
  { id:"MISS601", ref:"MISS601", titre:"BORDEAUX / NANTES",    client:"GUEUDET AUTO",  date:"Mar 12 Août", heure:"07:30", heureLiv:"16:00", vehicule:"Citroën BERLINGO",  immat:"GH-789-IJ", statut:"terminée",  marque:"Citroën",    modele:"BERLINGO",  adresseEnl:"Citroën Bordeaux Lac, 55 Av. du Médoc",           adresseLiv:"8 Rue de la Beaujoire, Nantes", email:"missions@gueudet.fr",    vin:"VF7K9AHXB12",    enl:{carburant:"Plein",km:"12050",cles:"2",documents:"Oui",kitCrevaison:"Oui",roueSec:"Oui",kitSecurite:"Oui",interieur:"Très bon",exterieur:"Très bon",remarques:""}, liv:{km:"12630",carburant:"3/4",interieur:"Très bon",exterieur:"Très bon",remarques:""}, photosEnl:4,photosLiv:4 },
  { id:"MISS589", ref:"MISS589", titre:"LILLE / STRASBOURG",   client:"NORD FLEET",    date:"Jeu 8 Août",  heure:"06:00", heureLiv:"15:00", vehicule:"Volkswagen CRAFTER",immat:"XY-456-ZA", statut:"planifiée", marque:"Volkswagen", modele:"CRAFTER",   adresseEnl:"VW Lille Labruyère, 12 Rue Labruyère",            adresseLiv:"33 Route de Colmar, Strasbourg",email:"dispatch@nordfleet.fr",  vin:"WV1ZZZ2EZK5001",enl:null,liv:null, photosEnl:0,photosLiv:0 },
  { id:"MISS577", ref:"MISS577", titre:"LYON / MARSEILLE",     client:"STE ELIOR",     date:"Lun 5 Août",  heure:"08:30", heureLiv:"14:00", vehicule:"Peugeot 308",       immat:"DF-321-GH", statut:"terminée",  marque:"Peugeot",    modele:"308",       adresseEnl:"Peugeot Lyon Ouest, 45 Av. de Saxe",              adresseLiv:"22 Bd Michelet, Marseille",     email:"elefort@gueudet.fr",     vin:"VF3LBHNS0KS001", enl:{carburant:"3/4",  km:"34100",cles:"1",documents:"Oui",kitCrevaison:"Oui",roueSec:"Non",kitSecurite:"Oui",interieur:"Bon",    exterieur:"Bon",    remarques:""}, liv:{km:"34580",carburant:"1/2",interieur:"Bon",    exterieur:"Bon",    remarques:""}, photosEnl:4,photosLiv:4 },
  { id:"MISS562", ref:"MISS562", titre:"NANTES / RENNES",      client:"FLEET AUTO SAS",date:"Ven 2 Août",  heure:"10:00", heureLiv:"12:30", vehicule:"Renault ZOE",       immat:"KL-654-MN", statut:"terminée",  marque:"Renault",    modele:"ZOE",       adresseEnl:"Renault Nantes Atlantis, Bd du Massacre",         adresseLiv:"14 Rue de Paris, Rennes",       email:"contact@fleetauto.fr",   vin:"VF1AGV15A000234",enl:{carburant:"Plein",km:"8200", cles:"2",documents:"Oui",kitCrevaison:"Oui",roueSec:"Oui",kitSecurite:"Oui",interieur:"Neuf",   exterieur:"Neuf",   remarques:""}, liv:{km:"8430", carburant:"3/4",interieur:"Neuf",   exterieur:"Neuf",   remarques:""}, photosEnl:4,photosLiv:4 },
];

const CLIENTS = [
  { id:1, nom:"STE ELIOR",     contact:"E. Lefort",  email:"elefort@gueudet.fr",    missions:3, statut:"actif",  abonnement:"Privilège" },
  { id:2, nom:"FLEET AUTO SAS",contact:"M. Durant",  email:"contact@fleetauto.fr",  missions:2, statut:"actif",  abonnement:"Confort"   },
  { id:3, nom:"GUEUDET AUTO",  contact:"P. Gueudet", email:"missions@gueudet.fr",   missions:1, statut:"actif",  abonnement:"Essentiel" },
  { id:4, nom:"NORD FLEET",    contact:"S. Moreau",  email:"dispatch@nordfleet.fr", missions:1, statut:"inactif",abonnement:"Essentiel" },
];

/* ═══════════════════════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════════════════════ */
function StatusBadge({ statut }) {
  const map = {
    terminée:  { bg:"#E8F7EE", color:"#16A34A", dot:"#16A34A", label:"Terminée"  },
    "en cours":{ bg:"#FEF9E7", color:"#D97706", dot:"#D97706", label:"En cours"  },
    planifiée: { bg:"#EFF6FF", color:"#2563EB", dot:"#2563EB", label:"Planifiée" },
  };
  const s = map[statut] || map.planifiée;
  return (
    <span style={{ background:s.bg, color:s.color, fontSize:12, fontWeight:700, padding:"3px 10px 3px 8px", borderRadius:20, display:"inline-flex", alignItems:"center", gap:5 }}>
      <span style={{ width:6,height:6,borderRadius:3,background:s.dot,display:"inline-block" }}/>
      {s.label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   ████████  LOGIN  ████████
═══════════════════════════════════════════════════════════ */
function LoginScreen({ onLogin }) {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr]         = useState("");

  function submit() {
    if (!email || !password) { setErr("Veuillez remplir tous les champs"); return; }
    onLogin({ email, name: "Marckatty Regulat", role: "operator" });
  }

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg,#0A1E4A 0%,${C.navy} 55%,#1E4D8C 100%)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"32px 24px", fontFamily:font }}>
      {/* Logo */}
      <div style={{ textAlign:"center", marginBottom:44 }} className="fade">
        <div style={{ width:72,height:72,borderRadius:22,background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:36,backdropFilter:"blur(10px)" }}>🚗</div>
        <div style={{ fontSize:28,fontWeight:800,color:C.white,letterSpacing:-0.5 }}>ConvoyPro</div>
        <div style={{ fontSize:13,color:"rgba(255,255,255,0.4)",marginTop:4 }}>Convoyage · États des lieux · Conciergerie</div>
      </div>

      {/* Form */}
      <div style={{ width:"100%",maxWidth:380,background:"rgba(255,255,255,0.07)",backdropFilter:"blur(20px)",borderRadius:24,padding:"28px 24px",border:"1px solid rgba(255,255,255,0.1)" }} className="fade">
        <div style={{ fontSize:17,fontWeight:700,color:C.white,marginBottom:20 }}>Connexion</div>
        {err && <div style={{ background:"rgba(229,62,62,0.15)",border:"1px solid rgba(229,62,62,0.3)",borderRadius:10,padding:"10px 14px",fontSize:13,color:"#FCA5A5",marginBottom:14 }}>{err}</div>}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.5)",marginBottom:6 }}>Email</div>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="marckatty@convoypro.fr"
            style={{ width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${email?"rgba(45,107,181,0.6)":"rgba(255,255,255,0.1)"}`,background:"rgba(255,255,255,0.08)",fontSize:14,color:C.white,outline:"none" }}/>
        </div>
        <div style={{ marginBottom:22 }}>
          <div style={{ fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.5)",marginBottom:6 }}>Mot de passe</div>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••"
            style={{ width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${password?"rgba(45,107,181,0.6)":"rgba(255,255,255,0.1)"}`,background:"rgba(255,255,255,0.08)",fontSize:14,color:C.white,outline:"none" }}/>
        </div>
        <button onClick={submit}
          style={{ width:"100%",background:`linear-gradient(135deg,${C.blue},#1A5AA0)`,color:C.white,border:"none",borderRadius:14,padding:"14px",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 20px rgba(45,107,181,0.4)" }}>
          Se connecter
        </button>
        <div style={{ textAlign:"center",marginTop:14,fontSize:12,color:"rgba(255,255,255,0.3)",cursor:"pointer" }}>Mot de passe oublié ?</div>
      </div>

      {/* Platform hint */}
      <div style={{ marginTop:28,fontSize:12,color:"rgba(255,255,255,0.2)",textAlign:"center" }}>
        La connexion adapte automatiquement l'interface à votre appareil
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ████████  DESKTOP DASHBOARD  ████████
═══════════════════════════════════════════════════════════ */

/* ── Sidebar ── */
function Sidebar({ active, onChange, user }) {
  const nav = [
    { id:"dashboard", icon:"📊", label:"Tableau de bord" },
    { id:"missions",  icon:"🚗", label:"Missions"        },
    { id:"clients",   icon:"👥", label:"Clients"         },
    { id:"rapports",  icon:"📄", label:"Rapports"        },
    { id:"calendrier",icon:"📅", label:"Calendrier"      },
    { id:"settings",  icon:"⚙️", label:"Paramètres"      },
  ];
  return (
    <div style={{ width:220,background:C.navy,height:"100vh",position:"sticky",top:0,display:"flex",flexDirection:"column",padding:"0 0 20px",flexShrink:0 }}>
      {/* Logo */}
      <div style={{ padding:"24px 20px 20px",borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>🚗</div>
          <div>
            <div style={{ fontSize:15,fontWeight:800,color:C.white }}>ConvoyPro</div>
            <div style={{ fontSize:10,color:"rgba(255,255,255,0.35)",marginTop:1 }}>Gestionnaire</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex:1,padding:"14px 10px",display:"flex",flexDirection:"column",gap:3 }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => onChange(n.id)}
            style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,border:"none",cursor:"pointer",textAlign:"left",transition:"all .15s",
              background:active===n.id?"rgba(255,255,255,0.12)":"transparent",
              color:active===n.id?C.white:"rgba(255,255,255,0.45)" }}>
            <span style={{ fontSize:16,width:22,textAlign:"center" }}>{n.icon}</span>
            <span style={{ fontSize:13,fontWeight:active===n.id?700:500 }}>{n.label}</span>
            {active===n.id && <span style={{ marginLeft:"auto",width:4,height:4,borderRadius:2,background:C.green }} />}
          </button>
        ))}
      </nav>

      {/* User */}
      <div style={{ margin:"0 10px",background:"rgba(255,255,255,0.06)",borderRadius:12,padding:"12px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:34,height:34,borderRadius:17,background:C.blueLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0 }}>👤</div>
          <div style={{ flex:1,minWidth:0 }}>
            <div style={{ fontSize:12,fontWeight:700,color:C.white,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{user.name}</div>
            <div style={{ fontSize:10,color:"rgba(255,255,255,0.35)" }}>Opérateur</div>
          </div>
        </div>
      </div>

      {/* Mobile banner hint */}
      <div style={{ margin:"10px 10px 0",background:"rgba(26,185,84,0.12)",border:"1px solid rgba(26,185,84,0.2)",borderRadius:10,padding:"10px 12px" }}>
        <div style={{ fontSize:11,fontWeight:700,color:"#4ADE80",marginBottom:3 }}>📱 Version mobile</div>
        <div style={{ fontSize:10,color:"rgba(255,255,255,0.4)",lineHeight:1.4 }}>Terrain : ouvrez convoypro.app sur votre téléphone</div>
      </div>
    </div>
  );
}

/* ── Top bar ── */
function TopBar({ title, subtitle }) {
  return (
    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 28px 0",marginBottom:24 }}>
      <div>
        <div style={{ fontSize:22,fontWeight:800,color:C.text }}>{title}</div>
        {subtitle && <div style={{ fontSize:13,color:C.grayText,marginTop:2 }}>{subtitle}</div>}
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:12 }}>
        <button style={{ background:C.white,border:`1px solid ${C.border}`,borderRadius:10,padding:"8px 16px",fontSize:13,fontWeight:600,color:C.text,cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
          + Nouvelle mission
        </button>
        <div style={{ width:36,height:36,borderRadius:18,background:C.blueLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer" }}>🔔</div>
      </div>
    </div>
  );
}

/* ── Stat card ── */
function StatCard({ icon, label, value, sub, color, trend }) {
  return (
    <div style={{ background:C.white,borderRadius:16,padding:"18px 20px",boxShadow:"0 2px 12px rgba(26,58,107,0.07)",flex:1,minWidth:0 }} className="fade">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
        <div style={{ width:42,height:42,borderRadius:12,background:`${color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{icon}</div>
        {trend && <span style={{ fontSize:12,fontWeight:700,color:trend>0?C.green:C.red,background:trend>0?C.greenLight:C.redLight,padding:"3px 8px",borderRadius:8 }}>{trend>0?"+":""}{trend}%</span>}
      </div>
      <div style={{ fontSize:28,fontWeight:800,color:C.text,lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:13,color:C.grayText,marginTop:4 }}>{label}</div>
      {sub && <div style={{ fontSize:12,color:color,fontWeight:600,marginTop:6 }}>{sub}</div>}
    </div>
  );
}

/* ── Mini chart (CSS bars) ── */
function MiniBarChart({ data, color }) {
  const max = Math.max(...data.map(d=>d.val));
  return (
    <div style={{ display:"flex",alignItems:"flex-end",gap:4,height:50 }}>
      {data.map((d,i) => (
        <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
          <div style={{ width:"100%",background:`${color}20`,borderRadius:"4px 4px 0 0",position:"relative",height:40,display:"flex",alignItems:"flex-end" }}>
            <div style={{ width:"100%",background:color,borderRadius:"4px 4px 0 0",height:`${Math.round((d.val/max)*100)}%`,transition:"height .5s ease" }} />
          </div>
          <span style={{ fontSize:9,color:C.grayText,fontWeight:600 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Dashboard home ── */
function DashboardHome({ missions, clients }) {
  const done    = missions.filter(m=>m.statut==="terminée").length;
  const ongoing = missions.filter(m=>m.statut==="en cours").length;
  const planned = missions.filter(m=>m.statut==="planifiée").length;
  const totalKm = missions.filter(m=>m.liv).reduce((a,m)=>a+(parseInt(m.liv.km)-parseInt(m.enl.km)),0);

  const chartData = [
    {label:"Lun",val:3},{label:"Mar",val:5},{label:"Mer",val:2},{label:"Jeu",val:7},
    {label:"Ven",val:4},{label:"Sam",val:1},{label:"Dim",val:0},
  ];

  return (
    <div style={{ padding:"0 28px 32px" }}>
      <TopBar title="Tableau de bord" subtitle={`Semaine du 12 au 19 Août 2025 · ${missions.length} missions totales`} />

      {/* KPI row */}
      <div style={{ display:"flex",gap:14,marginBottom:20 }}>
        <StatCard icon="✅" label="Missions terminées" value={done}    color={C.green}  trend={12}  sub={`${Math.round((done/missions.length)*100)}% du total`} />
        <StatCard icon="🔄" label="En cours"           value={ongoing} color={C.orange} trend={0}   sub="Actuellement sur route" />
        <StatCard icon="📅" label="Planifiées"         value={planned} color={C.blue}   sub="À venir cette semaine" />
        <StatCard icon="📏" label="Km parcourus"       value={`${totalKm.toLocaleString()} km`} color={C.purple} sub="Ce mois-ci" />
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:16,marginBottom:20 }}>
        {/* Activity chart */}
        <div style={{ background:C.white,borderRadius:16,padding:"20px",boxShadow:"0 2px 12px rgba(26,58,107,0.07)" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
            <div>
              <div style={{ fontSize:15,fontWeight:700,color:C.text }}>Activité de la semaine</div>
              <div style={{ fontSize:12,color:C.grayText }}>Missions par jour</div>
            </div>
            <span style={{ background:C.blueXLight,color:C.blue,fontSize:12,fontWeight:700,padding:"4px 10px",borderRadius:8 }}>Cette semaine</span>
          </div>
          <MiniBarChart data={chartData} color={C.blue} />
        </div>

        {/* Clients actifs */}
        <div style={{ background:C.white,borderRadius:16,padding:"20px",boxShadow:"0 2px 12px rgba(26,58,107,0.07)" }}>
          <div style={{ fontSize:15,fontWeight:700,color:C.text,marginBottom:4 }}>Clients actifs</div>
          <div style={{ fontSize:12,color:C.grayText,marginBottom:16 }}>{clients.filter(c=>c.statut==="actif").length} sur {clients.length}</div>
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            {clients.slice(0,3).map(c=>(
              <div key={c.id} style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ width:32,height:32,borderRadius:10,background:C.blueXLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:C.blue,flexShrink:0 }}>{c.nom[0]}</div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:13,fontWeight:600,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{c.nom}</div>
                  <div style={{ fontSize:11,color:C.grayText }}>{c.missions} mission{c.missions>1?"s":""} · {c.abonnement}</div>
                </div>
                <span style={{ background:c.statut==="actif"?C.greenLight:C.bg,color:c.statut==="actif"?C.green:C.grayText,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:6,flexShrink:0 }}>{c.statut}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent missions table */}
      <div style={{ background:C.white,borderRadius:16,padding:"20px",boxShadow:"0 2px 12px rgba(26,58,107,0.07)" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
          <div style={{ fontSize:15,fontWeight:700,color:C.text }}>Missions récentes</div>
          <span style={{ fontSize:13,color:C.blue,fontWeight:600,cursor:"pointer" }}>Voir tout →</span>
        </div>
        <table style={{ width:"100%",borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ borderBottom:`1px solid ${C.border}` }}>
              {["Référence","Trajet","Client","Véhicule","Date","Statut","Actions"].map(h=>(
                <th key={h} style={{ textAlign:"left",padding:"0 12px 10px",fontSize:11,fontWeight:700,color:C.grayText,letterSpacing:0.5,textTransform:"uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {missions.slice(0,5).map((m,i)=>(
              <tr key={m.id} style={{ borderBottom:i<4?`1px solid ${C.border}`:"none",transition:"background .15s" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.blueXLight}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <td style={{ padding:"12px" }}><span style={{ fontSize:13,fontWeight:700,color:C.navy }}>{m.ref}</span></td>
                <td style={{ padding:"12px" }}><span style={{ fontSize:13,fontWeight:600,color:C.text }}>{m.titre}</span></td>
                <td style={{ padding:"12px" }}><span style={{ fontSize:13,color:C.grayText }}>{m.client}</span></td>
                <td style={{ padding:"12px" }}><span style={{ fontSize:12,color:C.text }}>{m.vehicule}</span><br/><span style={{ fontSize:11,color:C.grayText }}>{m.immat}</span></td>
                <td style={{ padding:"12px" }}><span style={{ fontSize:12,color:C.grayText }}>{m.date}</span></td>
                <td style={{ padding:"12px" }}><StatusBadge statut={m.statut} /></td>
                <td style={{ padding:"12px" }}>
                  <button style={{ background:C.blueXLight,border:"none",borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:600,color:C.blue,cursor:"pointer" }}>Voir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Missions list (desktop) ── */
function MissionsPage({ missions }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter==="all" ? missions : missions.filter(m=>m.statut===filter);
  return (
    <div style={{ padding:"0 28px 32px" }}>
      <TopBar title="Missions" subtitle={`${missions.length} missions au total`} />
      <div style={{ display:"flex",gap:8,marginBottom:18 }}>
        {["all","en cours","terminée","planifiée"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            style={{ background:filter===f?C.navy:C.white,color:filter===f?C.white:C.grayText,border:`1px solid ${filter===f?C.navy:C.border}`,borderRadius:20,padding:"6px 16px",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .15s" }}>
            {f==="all"?"Toutes":f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ background:C.white,borderRadius:16,padding:"20px",boxShadow:"0 2px 12px rgba(26,58,107,0.07)" }}>
        <table style={{ width:"100%",borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ borderBottom:`1px solid ${C.border}` }}>
              {["Réf","Trajet","Client","Véhicule","Immat","Date","Enlèvement","Livraison","Km","Statut","EDL"].map(h=>(
                <th key={h} style={{ textAlign:"left",padding:"0 10px 10px",fontSize:11,fontWeight:700,color:C.grayText,letterSpacing:.5,textTransform:"uppercase",whiteSpace:"nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m,i)=>(
              <tr key={m.id} style={{ borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.blueXLight}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <td style={{ padding:"11px 10px" }}><b style={{ fontSize:12,color:C.navy }}>{m.ref}</b></td>
                <td style={{ padding:"11px 10px" }}><span style={{ fontSize:13,fontWeight:600 }}>{m.titre}</span></td>
                <td style={{ padding:"11px 10px" }}><span style={{ fontSize:12,color:C.grayText }}>{m.client}</span></td>
                <td style={{ padding:"11px 10px" }}><span style={{ fontSize:12 }}>{m.marque} {m.modele}</span></td>
                <td style={{ padding:"11px 10px" }}><span style={{ fontSize:11,background:C.blueXLight,color:C.navy,padding:"2px 7px",borderRadius:5,fontWeight:700 }}>{m.immat}</span></td>
                <td style={{ padding:"11px 10px" }}><span style={{ fontSize:12,color:C.grayText,whiteSpace:"nowrap" }}>{m.date}</span></td>
                <td style={{ padding:"11px 10px" }}><span style={{ fontSize:11,color:C.grayText }}>{m.enl?.km ? `${m.enl.km} km` : "—"}</span></td>
                <td style={{ padding:"11px 10px" }}><span style={{ fontSize:11,color:C.grayText }}>{m.liv?.km ? `${m.liv.km} km` : "—"}</span></td>
                <td style={{ padding:"11px 10px" }}><span style={{ fontSize:12,fontWeight:600,color:C.blue }}>{m.liv && m.enl ? `${parseInt(m.liv.km)-parseInt(m.enl.km)} km` : "—"}</span></td>
                <td style={{ padding:"11px 10px" }}><StatusBadge statut={m.statut} /></td>
                <td style={{ padding:"11px 10px" }}>
                  <span style={{ fontSize:11,background:m.statut==="terminée"?C.greenLight:C.bg,color:m.statut==="terminée"?C.green:C.grayText,padding:"3px 8px",borderRadius:6,fontWeight:700 }}>
                    {m.statut==="terminée"?"✓ Complet":"En attente"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Clients page ── */
function ClientsPage({ clients }) {
  return (
    <div style={{ padding:"0 28px 32px" }}>
      <TopBar title="Clients" subtitle={`${clients.length} clients · ${clients.filter(c=>c.statut==="actif").length} actifs`} />
      <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14 }}>
        {clients.map(c=>(
          <div key={c.id} style={{ background:C.white,borderRadius:16,padding:"20px",boxShadow:"0 2px 12px rgba(26,58,107,0.07)" }} className="fade">
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16 }}>
              <div style={{ display:"flex",gap:12,alignItems:"center" }}>
                <div style={{ width:46,height:46,borderRadius:14,background:C.blueXLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,color:C.blue }}>{c.nom[0]}</div>
                <div>
                  <div style={{ fontSize:15,fontWeight:800,color:C.text }}>{c.nom}</div>
                  <div style={{ fontSize:12,color:C.grayText }}>{c.contact}</div>
                </div>
              </div>
              <span style={{ background:c.statut==="actif"?C.greenLight:C.bg,color:c.statut==="actif"?C.green:C.grayText,fontSize:12,fontWeight:700,padding:"4px 10px",borderRadius:8 }}>{c.statut}</span>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              <div style={{ display:"flex",justifyContent:"space-between" }}>
                <span style={{ fontSize:12,color:C.grayText }}>Abonnement</span>
                <span style={{ fontSize:13,fontWeight:700,color:C.navy }}>{c.abonnement}</span>
              </div>
              <div style={{ display:"flex",justifyContent:"space-between" }}>
                <span style={{ fontSize:12,color:C.grayText }}>Missions</span>
                <span style={{ fontSize:13,fontWeight:700,color:C.text }}>{c.missions}</span>
              </div>
              <div style={{ display:"flex",justifyContent:"space-between" }}>
                <span style={{ fontSize:12,color:C.grayText }}>Email</span>
                <span style={{ fontSize:12,color:C.blue }}>{c.email}</span>
              </div>
            </div>
            <div style={{ display:"flex",gap:8,marginTop:14 }}>
              <button style={{ flex:1,background:C.blueXLight,border:"none",borderRadius:10,padding:"9px",fontSize:12,fontWeight:700,color:C.blue,cursor:"pointer" }}>Voir missions</button>
              <button style={{ flex:1,background:C.navy,border:"none",borderRadius:10,padding:"9px",fontSize:12,fontWeight:700,color:C.white,cursor:"pointer" }}>Envoyer rapport</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Placeholder pages ── */
function PlaceholderPage({ icon, title, desc }) {
  return (
    <div style={{ padding:"0 28px" }}>
      <TopBar title={title} />
      <div style={{ background:C.white,borderRadius:16,padding:"60px",textAlign:"center",boxShadow:"0 2px 12px rgba(26,58,107,0.07)" }}>
        <div style={{ fontSize:52,marginBottom:16 }}>{icon}</div>
        <div style={{ fontSize:18,fontWeight:700,color:C.text,marginBottom:8 }}>{title}</div>
        <div style={{ fontSize:14,color:C.grayText }}>{desc}</div>
      </div>
    </div>
  );
}

/* ── Desktop App shell ── */
function DesktopApp({ user, onLogout }) {
  const [page, setPage] = useState("dashboard");
  return (
    <div style={{ display:"flex",minHeight:"100vh",background:C.bg,fontFamily:font }}>
      <Sidebar active={page} onChange={setPage} user={user} />
      <div style={{ flex:1,overflowY:"auto",overflowX:"hidden" }}>
        {page==="dashboard"  && <DashboardHome   missions={MISSIONS} clients={CLIENTS} />}
        {page==="missions"   && <MissionsPage    missions={MISSIONS} />}
        {page==="clients"    && <ClientsPage     clients={CLIENTS}  />}
        {page==="rapports"   && <PlaceholderPage icon="📄" title="Rapports" desc="Génération automatique des procès verbaux et rapports PDF" />}
        {page==="calendrier" && <PlaceholderPage icon="📅" title="Calendrier" desc="Vue planning des missions de la semaine et du mois" />}
        {page==="settings"   && <PlaceholderPage icon="⚙️" title="Paramètres" desc="Configuration de votre compte et de vos préférences" />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ████████  MOBILE APP  ████████
═══════════════════════════════════════════════════════════ */

/* shared card style */
const mcard = { background:C.white, borderRadius:16, padding:"16px", marginBottom:12, boxShadow:"0 2px 10px rgba(26,58,107,0.07)" };

function SectionHeader({ num, title }) {
  return (
    <div style={{ background:C.blueLight,borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
      <div style={{ width:28,height:28,borderRadius:14,border:`2px solid ${C.navy}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:C.navy,flexShrink:0 }}>{num}</div>
      <span style={{ fontWeight:600,fontSize:15,color:C.text }}>{title}</span>
    </div>
  );
}

function MField({ label, value, color=C.gold }) {
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{ fontSize:13,color,fontWeight:500,marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:15,color:C.text }}>{value||<span style={{ color:C.grayText }}>—</span>}</div>
    </div>
  );
}

const pgColors=[["#BFD4E8","#6B9BB8"],["#C8D8E0","#7A9FB8"],["#B8CCDC","#5C8EAC"],["#C0D0E4","#6090B0"],["#BCC8DC","#6888A8"]];
function PhotoGrid({ count }) {
  if(!count) return <div style={{ textAlign:"center",color:C.grayText,padding:"20px 0",fontSize:14 }}>Aucune photo</div>;
  return (
    <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8 }}>
      {Array.from({length:count}).map((_,i)=>{
        const [bg,fg]=pgColors[i%pgColors.length];
        return (
          <div key={i} style={{ aspectRatio:"4/3",borderRadius:10,background:`linear-gradient(135deg,${bg},${fg})`,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <svg width="32" height="24" viewBox="0 0 36 28" fill="none"><rect x="1" y="6" width="34" height="20" rx="3" fill="white" fillOpacity=".25"/><circle cx="18" cy="16" r="6" fill="white" fillOpacity=".4"/><rect x="13" y="2" width="10" height="6" rx="2" fill="white" fillOpacity=".3"/></svg>
          </div>
        );
      })}
    </div>
  );
}

function SignaturePad({ signed }) {
  const ref=useRef(null);const drawing=useRef(false);const last=useRef(null);
  useEffect(()=>{
    if(!signed||!ref.current)return;
    const ctx=ref.current.getContext("2d");
    ctx.strokeStyle="#111";ctx.lineWidth=2.5;ctx.lineCap="round";ctx.lineJoin="round";
    [[55,90],[40,130],[38,155],[52,168],[66,152],[64,125],[80,90]].reduce((prev,pt)=>{ ctx.beginPath();if(prev){ctx.moveTo(...prev);ctx.lineTo(...pt);ctx.stroke();}return pt; },null);
    [[80,90],[95,115],[110,90]].reduce((prev,pt)=>{ if(prev){ctx.beginPath();ctx.moveTo(...prev);ctx.lineTo(...pt);ctx.stroke();}return pt; },null);
  },[signed]);
  function getPos(e){const r=ref.current.getBoundingClientRect();const s=e.touches?e.touches[0]:e;return[s.clientX-r.left,s.clientY-r.top];}
  function start(e){e.preventDefault();drawing.current=true;last.current=getPos(e);}
  function move(e){if(!drawing.current)return;e.preventDefault();const[x,y]=getPos(e);const ctx=ref.current.getContext("2d");ctx.strokeStyle="#111";ctx.lineWidth=2.5;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(...last.current);ctx.lineTo(x,y);ctx.stroke();last.current=[x,y];}
  function end(){drawing.current=false;}
  return <canvas ref={ref} width={340} height={180} style={{ width:"100%",height:180,borderRadius:8,display:"block",touchAction:"none",cursor:"crosshair" }} onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end} onTouchStart={start} onTouchMove={move} onTouchEnd={end}/>;
}

function MobileMissionDetail({ m, onBack }) {
  return (
    <div style={{ background:C.bg,minHeight:"100vh",fontFamily:font }}>
      <div style={{ background:C.white,padding:"50px 16px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 1px 6px rgba(0,0,0,0.07)",position:"sticky",top:0,zIndex:10 }}>
        <button onClick={onBack} style={{ background:C.blueLight,border:"none",borderRadius:10,width:36,height:36,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",color:C.navy }}>←</button>
        <div style={{ fontSize:16,fontWeight:700,color:C.text }}>{m.titre}</div>
        <button style={{ background:C.blueLight,border:"none",borderRadius:10,width:36,height:36,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center" }}>💬</button>
      </div>
      <div style={{ padding:"16px 16px 60px" }}>
        <SectionHeader num={1} title="Résumé mission" />
        <div style={mcard}>
          <div style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:2 }}>{m.titre}</div>
          <div style={{ fontSize:12,color:C.grayText,marginBottom:14 }}>Réf: {m.ref} · <StatusBadge statut={m.statut}/></div>
          <MField label="Immatriculation / VIN" value={`${m.immat} / ${m.vin}`} color={C.grayText}/>
          <MField label="Marque" value={m.marque} color={C.grayText}/>
          <MField label="Modèle" value={m.modele} color={C.grayText}/>
          <MField label="Email donneur d'ordre" value={m.email} color={C.grayText}/>
        </div>

        <SectionHeader num={2} title="Navigation vers l'enlèvement" />
        <div style={mcard}><div style={{ display:"flex",gap:10,alignItems:"flex-start" }}><span style={{ fontSize:18 }}>📍</span><div style={{ fontSize:14,color:C.text }}>{m.adresseEnl}</div></div></div>

        <SectionHeader num={3} title="Checklist à l'enlèvement" />
        <div style={mcard}>
          {m.enl ? (<>
            <MField label="Niveau carburant" value={m.enl.carburant} color={C.purple}/>
            <MField label="Kilométrage" value={m.enl.km} color={C.purple}/>
            <MField label="Clés confiées" value={m.enl.cles} color={C.purple}/>
            <MField label="Intérieur" value={m.enl.interieur} color={C.purple}/>
            <MField label="Extérieur" value={m.enl.exterieur} color={C.purple}/>
          </>) : <div style={{ textAlign:"center",color:C.grayText,padding:"16px 0" }}>Non démarré</div>}
        </div>

        <SectionHeader num={4} title="Photos à l'enlèvement" />
        <div style={mcard}><PhotoGrid count={m.photosEnl}/></div>

        <SectionHeader num={5} title="Navigation vers la livraison" />
        <div style={mcard}><div style={{ display:"flex",gap:10,alignItems:"flex-start" }}><span style={{ fontSize:18 }}>📍</span><div style={{ fontSize:14,color:C.text }}>{m.adresseLiv}</div></div></div>

        <SectionHeader num={6} title="Photos à la livraison" />
        <div style={mcard}><PhotoGrid count={m.photosLiv}/></div>

        <SectionHeader num={7} title="Checklist à la livraison" />
        <div style={mcard}>
          {m.liv ? (<>
            <MField label="Kilométrage" value={m.liv.km} color={C.gold}/>
            <MField label="Carburant" value={m.liv.carburant} color={C.gold}/>
            <MField label="Intérieur" value={m.liv.interieur} color={C.gold}/>
            <MField label="Extérieur" value={m.liv.exterieur} color={C.gold}/>
          </>) : <div style={{ textAlign:"center",color:C.grayText,padding:"16px 0" }}>En attente</div>}
        </div>

        <SectionHeader num={8} title="Signature" />
        <div style={mcard}>{m.liv ? <SignaturePad signed/> : <div style={{ height:140,border:`2px dashed ${C.border}`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",color:C.grayText,fontSize:14 }}>Zone de signature</div>}</div>

        <SectionHeader num={9} title="Procès Verbal" />
        <div style={mcard}>
          <div style={{ fontSize:14,fontWeight:700,color:C.text,marginBottom:4 }}>PROCÈS VERBAL DE LIVRAISON</div>
          <div style={{ fontSize:13,color:C.grayText }}>Formats : <b style={{ color:C.text }}>Documents</b></div>
        </div>
      </div>
    </div>
  );
}

function MobileDashboard({ missions, onMission }) {
  const [filter,setFilter]=useState("all");
  const filtered=filter==="all"?missions:missions.filter(m=>m.statut===filter);
  const counts={all:missions.length,terminée:missions.filter(m=>m.statut==="terminée").length,"en cours":missions.filter(m=>m.statut==="en cours").length,planifiée:missions.filter(m=>m.statut==="planifiée").length};
  return (
    <div style={{ padding:"56px 16px 88px",fontFamily:font }}>
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:26,fontWeight:800,color:C.text }}>Mes Missions</div>
        <div style={{ fontSize:13,color:C.grayText }}>{missions.length} au total · {counts["en cours"]} en cours</div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:18 }}>
        {[{label:"Terminées",val:counts["terminée"],color:"#16A34A",bg:"#E8F7EE"},{label:"En cours",val:counts["en cours"],color:"#D97706",bg:"#FEF9E7"},{label:"Planifiées",val:counts["planifiée"],color:"#2563EB",bg:"#EFF6FF"}].map(s=>(
          <div key={s.label} style={{ background:s.bg,borderRadius:12,padding:"12px 10px",textAlign:"center" }}>
            <div style={{ fontSize:22,fontWeight:800,color:s.color }}>{s.val}</div>
            <div style={{ fontSize:11,color:s.color,fontWeight:500 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex",gap:7,marginBottom:14,overflowX:"auto",paddingBottom:4 }}>
        {["all","en cours","terminée","planifiée"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{ background:filter===f?C.navy:C.white,color:filter===f?C.white:C.grayText,border:"none",borderRadius:20,padding:"7px 14px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0 }}>
            {f==="all"?"Toutes":f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>
      <button style={{ width:"100%",background:C.blue,color:C.white,border:"none",borderRadius:14,padding:"14px",fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
        + Nouvelle mission
      </button>
      {filtered.map(m=>(
        <div key={m.id} onClick={()=>onMission(m)} style={{ ...mcard,cursor:"pointer" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10 }}>
            <div>
              <div style={{ fontSize:17,fontWeight:800,color:C.text }}>{m.titre}</div>
              <div style={{ fontSize:12,color:C.grayText,marginTop:1 }}>Réf: {m.ref}</div>
            </div>
            <StatusBadge statut={m.statut}/>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
            <div style={{ fontSize:13,color:C.grayText }}>📅 {m.date} · {m.heure} → {m.heureLiv}</div>
            <div style={{ fontSize:13,color:C.grayText }}>🚗 {m.vehicule} <span style={{ background:C.blueLight,color:C.navy,fontSize:11,fontWeight:700,padding:"2px 7px",borderRadius:5 }}>{m.immat}</span></div>
            <div style={{ fontSize:13,color:C.grayText }}>🏢 {m.client}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileProfile({ dispo, onDispo }) {
  return (
    <div style={{ padding:"56px 16px 88px",fontFamily:font }}>
      <div style={{ fontSize:22,fontWeight:800,color:C.text,marginBottom:18 }}>Mon compte</div>
      <div style={{ ...mcard,display:"flex",alignItems:"center",gap:14 }}>
        <div style={{ width:60,height:60,borderRadius:30,background:C.blueLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0 }}>👤</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14,fontWeight:700,color:C.text,marginBottom:8 }}>MARCKATTY REGULAT</div>
          <div style={{ display:"flex",gap:8 }}>
            <button onClick={()=>onDispo(true)} style={{ flex:1,background:dispo?C.green:C.white,color:dispo?C.white:C.grayText,border:`1px solid ${dispo?C.green:C.border}`,borderRadius:20,padding:"7px 0",fontSize:12,fontWeight:700,cursor:"pointer" }}>✓ Dispo</button>
            <button onClick={()=>onDispo(false)} style={{ flex:1,background:!dispo?"#E53E3E":C.white,color:!dispo?C.white:C.grayText,border:`1px solid ${!dispo?"#E53E3E":C.border}`,borderRadius:20,padding:"7px 0",fontSize:12,fontWeight:700,cursor:"pointer" }}>✕ Indispo</button>
          </div>
        </div>
      </div>
      {[{label:"Mon profil",items:[{icon:"📞",text:"+33 06 16 64 99 06"},{icon:"📍",text:"GPS app par défaut",arrow:true}]},{label:"Conciergerie",items:[{icon:"⭐",text:"Abonnements actifs",arrow:true},{icon:"🚗",text:"Véhicules confiés",arrow:true}]},{label:"Juridique",items:[{icon:"📄",text:"CGU",arrow:true},{icon:"🔒",text:"Politique de Confidentialité",arrow:true}]}].map(section=>(
        <div key={section.label}>
          <div style={{ fontSize:11,fontWeight:700,color:C.grayText,letterSpacing:1,marginBottom:7,paddingLeft:4,marginTop:6 }}>{section.label.toUpperCase()}</div>
          <div style={{ ...mcard,marginBottom:10 }}>
            {section.items.map((item,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<section.items.length-1?`1px solid ${C.border}`:"none" }}>
                <span style={{ fontSize:18,width:26,textAlign:"center" }}>{item.icon}</span>
                <span style={{ flex:1,fontSize:14,color:C.text }}>{item.text}</span>
                {item.arrow && <span style={{ color:C.grayText }}>›</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileApp({ user }) {
  const [screen,setScreen]=useState("dashboard");
  const [selectedMission,setSelectedMission]=useState(null);
  const [tab,setTab]=useState("home");
  const [dispo,setDispo]=useState(true);

  if(screen==="mission"&&selectedMission) return <MobileMissionDetail m={selectedMission} onBack={()=>{setScreen("dashboard");setSelectedMission(null);}}/>;
  return (
    <div style={{ maxWidth:430,margin:"0 auto",minHeight:"100vh",background:C.bg,fontFamily:font }}>
      {screen==="dashboard" && <MobileDashboard missions={MISSIONS} onMission={m=>{setSelectedMission(m);setScreen("mission");}}/>}
      {screen==="profile"   && <MobileProfile dispo={dispo} onDispo={setDispo}/>}
      <div style={{ position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.white,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-around",padding:"10px 0 20px",zIndex:100 }}>
        {[{id:"home",icon:"🏠",label:"Accueil"},{id:"profile",icon:"👤",label:"Mon compte"}].map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setScreen(t.id==="home"?"dashboard":"profile");}}
            style={{ background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"0 28px" }}>
            <div style={{ width:34,height:34,borderRadius:17,background:tab===t.id?C.navy:C.blueLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,transition:"background .2s" }}>{t.icon}</div>
            <span style={{ fontSize:11,color:tab===t.id?C.navy:C.grayText,fontWeight:tab===t.id?700:400 }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════ */
const DEMO_USER = { email: "marckatty@convoypro.fr", name: "Marckatty Regulat", role: "operator" };

export default function App() {
  const platform = usePlatform();
  // Auto-login pour la maquette — pas de blocage
  const [user]   = useState(DEMO_USER);
  // Permet de forcer une vue pour la démo
  const [forceView, setForceView] = useState(null);

  const view = forceView || (platform === "desktop" || platform === "unknown" ? "desktop" : "mobile");

  return (
    <>
      <GFont />

      {/* ── Barre de switcher demo (visible en haut) ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: C.navy, padding: "6px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:600, letterSpacing:0.8 }}>MAQUETTE</span>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>
            {view === "desktop" ? "🖥 Version bureau" : "📱 Version mobile"}
          </span>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          <button
            onClick={() => setForceView("desktop")}
            style={{
              background: view === "desktop" ? C.blue : "rgba(255,255,255,0.08)",
              color: C.white, border: "none", borderRadius: 8,
              padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
              display:"flex", alignItems:"center", gap:5, transition:"all .15s",
            }}>
            🖥 Bureau
          </button>
          <button
            onClick={() => setForceView("mobile")}
            style={{
              background: view === "mobile" ? C.green : "rgba(255,255,255,0.08)",
              color: C.white, border: "none", borderRadius: 8,
              padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
              display:"flex", alignItems:"center", gap:5, transition:"all .15s",
            }}>
            📱 Mobile
          </button>
        </div>
      </div>

      {/* ── Décalage pour la barre demo ── */}
      <div style={{ paddingTop: 34 }}>
        {view === "desktop"
          ? <DesktopApp user={user} onLogout={() => {}} />
          : (
            <div style={{ display:"flex", justifyContent:"center", background: view==="mobile" ? "#1A1A2E" : "transparent", minHeight:"calc(100vh - 34px)", alignItems: "flex-start", paddingTop: view==="mobile" ? 20 : 0 }}>
              {view === "mobile" && (
                <div style={{
                  width: 390, background: C.bg, borderRadius: 40,
                  overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                  border: "8px solid #111", position: "relative", minHeight: 700,
                }}>
                  {/* iPhone notch */}
                  <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:120, height:28, background:"#111", borderRadius:"0 0 18px 18px", zIndex:50 }}/>
                  <MobileApp user={user} />
                </div>
              )}
            </div>
          )
        }
      </div>
    </>
  );
}
