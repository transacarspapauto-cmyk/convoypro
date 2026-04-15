import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

/*
  Table Supabase attendue : "edl"
  Colonnes : id (uuid, default gen_random_uuid()),
             mission_id (text, not null),
             user_id    (uuid, not null),
             data       (jsonb, not null),
             updated_at (timestamptz, default now())
  Contrainte unique : (mission_id, user_id)

  SQL de création :
    create table edl (
      id          uuid primary key default gen_random_uuid(),
      mission_id  text not null,
      user_id     uuid not null references auth.users(id) on delete cascade,
      data        jsonb not null default '{}',
      updated_at  timestamptz not null default now(),
      unique (mission_id, user_id)
    );
    alter table edl enable row level security;
    create policy "Users manage their own EDL"
      on edl for all using (auth.uid() = user_id);
*/

export const initEDLData = {
  ack: false, arrEnl: false,
  enl: { carburant:"", km:"", cles:"", docs:"", kit:"", roue:"", secu:"", int:"", ext:"", rem:"", defauts:[] },
  pEnl: [], arrLiv: false, pLiv: [],
  liv: { km:"", carburant:"", int:"", ext:"", rem:"" },
  signed: false,
};

/**
 * Charge et persiste l'état des lieux d'une mission.
 *
 * @param {string|undefined} missionId
 * @param {string|undefined} userId
 * @returns {{ data, setData, saveEDL, loading }}
 */
export function useEDL(missionId, userId) {
  const [data, setData]     = useState(initEDLData);
  const [loading, setLoading] = useState(false);

  // Chargement de l'EDL existant quand la mission change
  useEffect(() => {
    if (!missionId || !userId) {
      setData(initEDLData);
      return;
    }

    setLoading(true);
    supabase
      .from("edl")
      .select("data")
      .eq("mission_id", missionId)
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data: row }) => {
        setData(row?.data ?? initEDLData);
        setLoading(false);
      });
  }, [missionId, userId]);

  // Sauvegarde (upsert) de l'EDL
  const saveEDL = useCallback(async (edlData) => {
    if (!missionId || !userId) return;
    await supabase.from("edl").upsert(
      {
        mission_id: missionId,
        user_id:    userId,
        data:       edlData,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "mission_id,user_id" }
    );
  }, [missionId, userId]);

  return { data, setData, loading, saveEDL };
}
