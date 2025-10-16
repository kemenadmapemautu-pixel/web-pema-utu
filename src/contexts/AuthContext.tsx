import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase, isSupabaseEnabled, UserProfile } from "@/lib/supabase";

interface User {
  username: string;
  name: string;
  role: "admin" | "pimpinan" | "menteri";
  id?: string;
  email?: string;
  position?: string;
  department?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (user: User) => void;
  loginWithSupabase: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout: () => void;
  hasRole: (role: string | string[]) => boolean;
  isAdmin: () => boolean;
  canEditProfile: (userId?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    // Check Supabase session first
    if (isSupabaseEnabled() && supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            const user: User = {
              id: profile.id,
              username: profile.username,
              email: profile.email,
              name: profile.name,
              role: profile.role,
              position: profile.position,
              department: profile.department
            };
            setCurrentUser(user);
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("currentUser", JSON.stringify(user));
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Supabase session check error:", error);
      }
    }

    // Fallback to localStorage
    const authStatus = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("currentUser");
    
    if (authStatus === "true" && userData) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(userData));
    }
    setLoading(false);
  };

  const loginWithSupabase = async (email: string, password: string) => {
    if (!isSupabaseEnabled() || !supabase) {
      return { 
        success: false, 
        error: "Supabase not configured. Using localStorage fallback." 
      };
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user data returned");

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw profileError;

      const user: User = {
        id: profile.id,
        username: profile.username,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        position: profile.position,
        department: profile.department
      };

      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));

      return { success: true, user };
    } catch (error: any) {
      console.error("Supabase login error:", error);
      return { 
        success: false, 
        error: error.message || "Login failed" 
      };
    }
  };

  const login = (user: User) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logout = async () => {
    if (isSupabaseEnabled() && supabase) {
      await supabase.auth.signOut();
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      currentUser, 
      login,
      loginWithSupabase, 
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
