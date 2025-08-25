import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user
        ? {
            id: session.user.id,
            email: session.user.email,
            user_metadata: {
              avatar_url: session.user.user_metadata?.avatar_url,
              full_name: session.user.user_metadata?.full_name,
            },
          }
        : null;
      setUser(currentUser);
      setLoading(false);
    };

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user
        ? {
            id: session.user.id,
            email: session.user.email,
            user_metadata: {
              avatar_url: session.user.user_metadata?.avatar_url,
              full_name: session.user.user_metadata?.full_name,
            },
          }
        : null;
      setUser(currentUser);
    });

    getSession();

    return () => subscription.unsubscribe();
  }, []);

  // Fixed logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/login";
    }
  };

  // Google login function
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  };

  const value = {
    user,
    loading,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
