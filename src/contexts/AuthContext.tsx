import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  name: string;
  role: "admin" | "pimpinan" | "menteri";
  id?: string;
  position?: string;
  department?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  hasRole: (role: string | string[]) => boolean;
  isAdmin: () => boolean;
  canEditProfile: (userId?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage on mount
    const authStatus = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("currentUser");
    
    if (authStatus === "true" && userData) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const login = (user: User) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
  };

  // Role checking functions
  const hasRole = (role: string | string[]): boolean => {
    if (!currentUser) return false;
    if (Array.isArray(role)) {
      return role.includes(currentUser.role);
    }
    return currentUser.role === role;
  };

  const isAdmin = (): boolean => {
    return currentUser?.role === "admin";
  };

  const canEditProfile = (userId?: string): boolean => {
    if (!currentUser) return false;
    
    // Admin can edit anyone's profile
    if (currentUser.role === "admin") return true;
    
    // Users can only edit their own profile
    if (userId) {
      return currentUser.id === userId || currentUser.username === userId;
    }
    
    // If no userId provided, assume they want to edit their own
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      currentUser, 
      login, 
      logout, 
      hasRole, 
      isAdmin, 
      canEditProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
