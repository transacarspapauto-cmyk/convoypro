import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleLogin() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <div style={{ minHeight:"100vh", background:"#0D1117", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Barlow',sans-serif" }}>
      <style>{@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800&display=swap');}</style>
      <div style={{ width:380, background:"#1E2636", border:"1px solid #2A3348", borderRadius:14, padding:36 }}>
        
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:8 }}>
          <span style={{ fontWeight:800, fontSize:28, color:"#fff", letterSpacing:"-0.02em" }}>safe</span>
          <span style={{ display:"inline-block", width:8, height:8, background:"#2357E8", borderRadius:2, marginBottom:4 }}/>
        </div>
        <div style={{ fontSize:12, color:"#8896B0", marginBottom:32, letterSpacing:"0.1em", textTransform:"uppercase" }}>Connexion</div>

        {/* Email */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:12, fontWeight:600, color:"#8896B0", marginBottom:6 }}>Email</div>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="votre@email.fr" type="email"
            style={{ width:"100%", background:"#161C26", border:"1px solid #2A3348", borderRadius:7, padding:"10px 12px", fontSize:14, color:"#fff", outline:"none" }}/>
        </div>

        {/* Mot de passe */}
        <div style={{ marginBottom:22 }}>
          <div style={{ fontSize:12, fontWeight:600, color:"#8896B0", marginBottom:6 }}>Mot de passe</div>
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" type="password"
            style={{ width:"100%", background:"#161C26", border:"1px solid #2A3348", borderRadius:7, padding:"10px 12px", fontSize:14, color:"#fff", outline:"none" }}/>
        </div>

        {/* Erreur */}
        {error && <div style={{ fontSize:12, color:"#E53E3E", marginBottom:14, background:"rgba(229,62,62,0.1)", padding:"8px 12px", borderRadius:6 }}>{error}</div>}

        {/* Bouton */}
        <button onClick={handleLogin} disabled={loading}
          style={{ width:"100%", background:"#2357E8", color:"#fff", border:"none", borderRadius:8, padding:"12px", fontSize:14, fontWeight:700, cursor:"pointer" }}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <div style={{ marginTop:20, fontSize:11, color:"#4A5568", textAlign:"center" }}>
          Votre image, à chaque kilomètre.
        </div>
      </div>
    </div>
  );
}
