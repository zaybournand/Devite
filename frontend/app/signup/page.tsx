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

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false); 

  const { login } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ message: "", type: "" });
    setLoading(true); 
    if (email.split("@")[0].length < 3) {
      setFeedback({ message: "The email prefix before the @ must be at least 3 characters long.", type: "error" });
      setLoading(false);
      return;
    }
    if (password.length < 5) {
      setFeedback({ message: "The password must be at least 5 characters long.", type: "error" });
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setFeedback({ message: "Passwords do not match.", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/v1/auth/register`,
        { username, email, password },
        { withCredentials: true } 
      );
      const loginRes = await axios.post(
        `${API_URL}/api/v1/auth/login`,
        { email, password },
        { withCredentials: true } 
      );
      const userToSave = {
        email: res.data.email || email,
        username: res.data.username || "",
        id: res.data.id,
        role: res.data.role 
      };
      
      login(userToSave);

      setFeedback({ message: "Account created! Logging you in...", type: "success" });
      
      setTimeout(() => {
          window.location.href = "/";
      }, 1000);

    } catch (err: any) {
      console.error(err);
      let errorMessage = "Signup failed.";
      if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
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
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            Join Code Learner
          </h3>
          <p className="mt-2 text-slate-400">
            Create your account to start mastering tech
          </p>
        </div>

        <form onSubmit={handleSignup} className="mt-8 space-y-4">
          <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
                required
              />
              
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e: any) => setConfirm(e.target.value)}
                required
              />

              <Button disabled={loading} className="mt-2">
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              {feedback.message && (
                <div className={`mt-2 text-center text-sm p-4 rounded-xl border duration-300 ${
                    feedback.type === 'error' 
                        ? 'bg-red-500/10 text-red-200 border-red-500/50' 
                        : 'bg-green-500/10 text-green-200 border-green-500/50'
                }`}>
                    {feedback.message}
                </div>
              )}
          </div>
        </form>

        <p className="text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4 transition-colors">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}