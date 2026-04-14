mport { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import AppLegacy from "./AppLegacy.jsx";

export default function App() {
  const { session, loading } = useAuth();

  if (loading) return null;

  if (!session) return <Login />;

  return <AppLegacy session={session} />;
}
