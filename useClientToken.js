import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/*
  Table Supabase attendue : "client_tokens"

  SQL de création :
    create table client_tokens (
      id           uuid primary key default gen_random_uuid(),
      token        text not null unique,
      mission_id   text not null,
      user_id      uuid not null references auth.users(id) on delete cascade,
      mission_data jsonb,
      edl_data     jsonb,
      expires_at   timestamptz not null,
      created_at   timestamptz not null default now(),
      unique (mission_id, user_id)
    );
    alter table client_tokens enable row level security;

    -- Lecture publique uniquement si token non expiré
    create policy "Public read valid tokens"
      on client_tokens for select
      using (expires_at > now());

    -- Seul le propriétaire peut créer / mettre à jour
    create policy "Owner upsert"
      on client_tokens for insert
      with check (auth.uid() = user_id);

    create policy "Owner update"
      on client_tokens for update
      using (auth.uid() = user_id);
*/

/**
 * Génère (ou renouvelle) un lien client sécurisé valable 30 jours.
 * Stocke un snapshot de la mission + EDL pour lecture sans auth.
 *
 * @param {object} mission
 * @param {object} edl
 * @param {string} userId
 * @returns {Promise<string>} URL complète du portail client
 */
export async function generateClientToken(mission, edl, userId) {
  const token = Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  // On retire la rémunération du snapshot — jamais visible côté client
  // eslint-disable-next-line no-unused-vars
  const { remuneration: _remuneration, ...missionPublic } = mission;

  const { data, error } = await supabase
    .from("client_tokens")
    .upsert(
      {
        token,
        mission_id:   mission.id,
        user_id:      userId,
        mission_data: missionPublic,
        edl_data:     edl,
        expires_at:   expiresAt.toISOString(),
      },
      { onConflict: "mission_id,user_id" }
    )
    .select("token")
    .single();

  if (error) throw error;

  return `${window.location.origin}/client/${data.token}`;
}

/**
 * Charge les données d'un token client (sans authentification).
 * @param {string} token
 * @returns {{ mission, edl, expiresAt, loading, error }}
 */
export function useClientData(token) {
  const [state, setState] = useState({ mission: null, edl: null, expiresAt: null, loading: true, error: null });

  useEffect(() => {
    if (!token) { setState(s => ({ ...s, loading: false, error: "Token manquant" })); return; }

    supabase
      .from("client_tokens")
      .select("mission_data, edl_data, expires_at")
      .eq("token", token)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle()
      .then(({ data, error: err }) => {
        if (err || !data) {
          setState({ mission: null, edl: null, expiresAt: null, loading: false, error: "Lien invalide ou expiré" });
        } else {
          setState({ mission: data.mission_data, edl: data.edl_data, expiresAt: data.expires_at, loading: false, error: null });
        }
      });
  }, [token]);

  return state;
}
