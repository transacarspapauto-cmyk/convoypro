import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import AuthScreen from "./components/AuthScreen";
import AppLegacy from "./AppLegacy.jsx";

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = chargement

  useEffect(() => {
    // Session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Écoute les changements (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Chargement initial
  if (session === undefined) return null;

  // Non connecté → écran de login
  if (!session) return <AuthScreen />;

  // Connecté → app principale
  return <AppLegacy session={session} />;
}
