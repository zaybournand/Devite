"use client";
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/page";
import { useAuth } from "@/app/Auth"; 

const Input = ({ className = "", ...props }: any) => (
  <input
    className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 ${className}`}
    {...props}
  />
);

const Button = ({ children, className = "", ...props }: any) => (
  <button
    className={`w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ message: "", type: "" });
    setLoading(true);

    try {       
      const res = await axios.post(
        `${API_URL}/api/v1/auth/login`, 
        { email, password },
        { withCredentials: true } 
      );
        
      const userToSave = {
          email: res.data.email || email,
          username: res.data.username || "",
          id: res.data.id,
      };
      
      login(userToSave);

      setFeedback({ message: "Success! Redirecting...", type: "success" });
      
      setTimeout(() => {
          window.location.href = "/"; 
      }, 500);

    } catch (err: any) {
      let errorMessage = "Login failed.";
      
      if (err.response) {
          if (err.response.status === 401 || err.response.status === 500) {
             errorMessage = "Invalid email or password.";
          } else if (err.response.data && err.response.data.message) {
             errorMessage = err.response.data.message;
          }
      }
      
      setFeedback({ message: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 font-sans">
      <div className="max-w-md w-full space-y-8 bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="text-center">
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h3>
          <p className="mt-2 text-slate-400 text-sm">Log into Code Learner</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />
          
          <Button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          {feedback.message && (
            <div className={`mt-4 text-center text-sm p-4 rounded-xl border animate-in fade-in zoom-in duration-300 ${
                feedback.type === 'error' 
                    ? 'bg-red-500/10 text-red-200 border-red-500/50' 
                    : 'bg-green-500/10 text-green-200 border-green-500/50'
            }`}>
                {feedback.message}
            </div>
          )}
        </form>

        <p className="text-center text-slate-400 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4 transition-colors">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}