import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import AppLegacy from "./AppLegacy.jsx";

export default function App() {
  const { session, loading } = useAuth();

  // Chargement initial — on n'affiche rien pour éviter un flash
  if (loading) return null;

  // Non connecté → page de login
  if (!session) return <Login />;

  // Connecté → app principale
  return <AppLegacy session={session} />;
}
