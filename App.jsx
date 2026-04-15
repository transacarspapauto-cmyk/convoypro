import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import AppLegacy from "./AppLegacy.jsx";
import ClientPortal from "./pages/ClientPortal.jsx";

// Détection route /client/:token sans react-router
function getClientToken() {
  const match = window.location.pathname.match(/^\/client\/([a-f0-9]{48})$/);
  return match ? match[1] : null;
}

export default function App() {
  const clientToken = getClientToken();
  const { session, loading } = useAuth();

  // Route publique /client/:token — pas besoin d'être connecté
  if (clientToken) return <ClientPortal token={clientToken} />;

  // Chargement initial — on n'affiche rien pour éviter un flash
  if (loading) return null;

  // Non connecté → page de login
  if (!session) return <Login />;

  // Connecté → app principale
  return <AppLegacy session={session} />;
}
