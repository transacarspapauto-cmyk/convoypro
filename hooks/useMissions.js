import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/*
  Table Supabase attendue : "missions"
  Colonnes : id, ref, titre, client, date, heure, heureLiv, vehicule, immat,
             statut, marque, modele, adresseEnl, adresseLiv, email, vin,
             kmEnl, kmLiv, remuneration, user_id (uuid), created_at

  Si la table n'existe pas encore, l'app utilise les données de secours ci-dessous.
*/
const FALLBACK_MISSIONS = [
  { id:"MISS628", ref:"MISS628", titre:"MEAUX / IFS", client:"STE ELIOR", date:"Mar 19 Août", heure:"08:00", heureLiv:"17:00", vehicule:"Peugeot EXPERT M", immat:"HE-137-RN", statut:"terminée", marque:"Peugeot", modele:"EXPERT M", adresseEnl:"Peugeot Meaux Gueudet, 1880 Av. Roosevelt, Meaux", adresseLiv:"13 Rue François Arago, Ifs", email:"elefort@gueudet.fr", vin:"SU304910", kmEnl:"0", kmLiv:"280", remuneration:"88,06 €" },
  { id:"MISS614", ref:"MISS614", titre:"PARIS / LYON", client:"FLEET AUTO SAS", date:"Ven 15 Août", heure:"09:00", heureLiv:"18:30", vehicule:"Renault TRAFIC", immat:"AB-234-CD", statut:"en cours", marque:"Renault", modele:"TRAFIC", adresseEnl:"Renault Paris Nation, 12 Pl. de la Nation", adresseLiv:"45 Rue Garibaldi, Lyon", email:"contact@fleetauto.fr", vin:"VF1FL000123", kmEnl:"45200", kmLiv:"—", remuneration:"124,50 €" },
  { id:"MISS601", ref:"MISS601", titre:"BORDEAUX / NANTES", client:"GUEUDET AUTO", date:"Mar 12 Août", heure:"07:30", heureLiv:"16:00", vehicule:"Citroën BERLINGO", immat:"GH-789-IJ", statut:"terminée", marque:"Citroën", modele:"BERLINGO", adresseEnl:"Citroën Bordeaux Lac, 55 Av. du Médoc", adresseLiv:"8 Rue de la Beaujoire, Nantes", email:"missions@gueudet.fr", vin:"VF7K9AHX", kmEnl:"12050", kmLiv:"12630", remuneration:"68,20 €" },
  { id:"MISS589", ref:"MISS589", titre:"LILLE / STRASBOURG", client:"NORD FLEET", date:"Jeu 8 Août", heure:"06:00", heureLiv:"15:00", vehicule:"VW CRAFTER", immat:"XY-456-ZA", statut:"planifiée", marque:"Volkswagen", modele:"CRAFTER", adresseEnl:"VW Lille Labruyère, 12 Rue Labruyère", adresseLiv:"33 Route de Colmar, Strasbourg", email:"dispatch@nordfleet.fr", vin:"WV1ZZZ2EZK5", kmEnl:"—", kmLiv:"—", remuneration:"156,00 €" },
];

/**
 * Retourne les missions du convoyeur connecté.
 * Tente un fetch Supabase ; si la table est vide ou absente, utilise FALLBACK_MISSIONS.
 *
 * @param {string|undefined} userId  - ID Supabase de l'utilisateur connecté
 * @returns {{ missions: Array, loading: boolean, error: object|null }}
 */
export function useMissions(userId) {
  const [missions, setMissions] = useState(FALLBACK_MISSIONS);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    supabase
      .from("missions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .then(({ data, error: err }) => {
        if (err) {
          setError(err);
          // Garde les données de secours en cas d'erreur (table inexistante, etc.)
        } else if (data && data.length > 0) {
          setMissions(data);
        }
        // Si data est vide, on garde FALLBACK_MISSIONS
        setLoading(false);
      });
  }, [userId]);

  return { missions, loading, error };
}
