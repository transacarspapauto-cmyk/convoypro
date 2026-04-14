import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Hook d'authentification Supabase.
 * Retourne { session, user, loading, signOut }
 */
export function useAuth() {
  const [session, setSession] = useState(undefined); // undefined = initialisation en cours

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    user:    session?.user ?? null,
    loading: session === undefined,
    signOut: () => supabase.auth.signOut(),
  };
}
