"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "@/app/utils/page";
import axios from "axios";

type User = { 
    email: string; 
    username?: string; 
    id?: number;
    role?: string;
} | null;

interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  login: (userData: User) => void; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/v1/auth/logout`, 
        {}, 
        { withCredentials: true } 
      );
      
      console.log("Successfully logged out of the backend!");
    } catch (error) {
      console.error("Logout failed on backend", error);
    }
    
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);