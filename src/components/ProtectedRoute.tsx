import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
  fallbackPath?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallbackPath = "/admin/dashboard" 
}: ProtectedRouteProps) {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If specific role is required, check it
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}

// Specific role-based route components
export function AdminOnlyRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin" fallbackPath="/admin/dashboard">
      {children}
    </ProtectedRoute>
  );
}

export function PimpinanMenteriRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole={["pimpinan", "menteri"]} fallbackPath="/admin/dashboard">
      {children}
    </ProtectedRoute>
  );
}
