/* filename: src/components/layout/ProtectedRoute.jsx */
/* ─────────────────────────────────────────────────────────────
   🔒 ProtectedRoute (stub)
   - لاحقًا: يتحقق من JWT/Role
   ──────────────────────────────────────────────────────────── */
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles=[] }) {
  const isAuthed = false; // TODO: replace with real auth
  const userRole = "viewer"; // TODO

  if (!isAuthed) return <Navigate to="/login" replace />;
  if (roles.length && !roles.includes(userRole)) return <Navigate to="/" replace />;
  return children;
}
