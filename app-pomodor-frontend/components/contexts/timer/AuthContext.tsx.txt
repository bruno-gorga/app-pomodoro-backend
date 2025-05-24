
import React, { createContext, useState, useContext, useEffect } from "react";
import { api, User } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");
      const userId = localStorage.getItem("user_id");
      
      if (token && userId) {
        try {
          // Set the user based on stored info
          // In a more robust implementation, you might want to validate the token with the server
          setUser({ _id: userId, email: localStorage.getItem("user_email") || "" });
        } catch (error) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user_id");
          localStorage.removeItem("user_email");
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Special case for bmg391@hotmail.com
      if (email === "bmg391@hotmail.com" && password === "181093") {
        // Create a mock user and token
        const mockUserId = "special-user-id-12345";
        const mockToken = "special-mock-token-12345";
        
        // Store the auth information
        localStorage.setItem("auth_token", mockToken);
        localStorage.setItem("user_id", mockUserId);
        localStorage.setItem("user_email", email);
        
        // Set the user in the context
        setUser({ _id: mockUserId, email });
        
        // Set the token in the API client
        api.setToken(mockToken);
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        return;
      }
      
      // Special case for bmg391@gmail.com
      if (email === "bmg391@gmail.com" && password === "181093") {
        // Create a mock user and token
        const mockUserId = "special-user-id-54321";
        const mockToken = "special-mock-token-54321";
        
        // Store the auth information
        localStorage.setItem("auth_token", mockToken);
        localStorage.setItem("user_id", mockUserId);
        localStorage.setItem("user_email", email);
        
        // Set the user in the context
        setUser({ _id: mockUserId, email });
        
        // Set the token in the API client
        api.setToken(mockToken);
        
        toast({
          title: "Login successful",
          description: "Welcome to your blank dashboard!",
        });
        
        return;
      }
      
      // Normal authentication flow for other users
      const response = await api.login(email, password);
      localStorage.setItem("user_id", response.userId);
      localStorage.setItem("user_email", email);
      setUser({ _id: response.userId, email });
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Special case for bmg391@gmail.com
      if (email === "bmg391@gmail.com" && password === "181093") {
        // Create a mock user and token
        const mockUserId = "special-user-id-54321";
        const mockToken = "special-mock-token-54321";
        
        // Store the auth information
        localStorage.setItem("auth_token", mockToken);
        localStorage.setItem("user_id", mockUserId);
        localStorage.setItem("user_email", email);
        
        // Set the user in the context
        setUser({ _id: mockUserId, email });
        
        // Set the token in the API client
        api.setToken(mockToken);
        
        toast({
          title: "Registration successful!",
          description: "Your account has been created!",
        });
        
        return;
      }
      
      const response = await api.register(email, password);
      localStorage.setItem("user_id", response.userId);
      localStorage.setItem("user_email", email);
      setUser({ _id: response.userId, email });
      toast({
        title: "Registration successful",
        description: "Your account has been created!",
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    api.logout();
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_email");
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
