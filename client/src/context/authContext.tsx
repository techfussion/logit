import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    id?: string;
    email?: string;
    role?: string;
  } | null;
  setCredentials: (userData: { id: string; email: string; role: string }, token: string) => void;
  logout: () => void;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  setCredentials: () => {},
  logout: () => {},
});

// Authentication Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem("token"));
  const [user, setUser] = useState<{
    id?: string;
    email?: string;
    role?: string;
  } | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setCredentials = (userData: { id: string; email: string; role: string }, token: string) => {
    // Store token and user data
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    // Update state
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    // Clear stored data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setCredentials, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
