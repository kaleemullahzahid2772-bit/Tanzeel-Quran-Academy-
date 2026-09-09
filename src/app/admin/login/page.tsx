"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    async function checkExistingSession() {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          router.replace("/admin/dashboard");
          return;
        }
      } catch {
        // Continue on error
      } finally {
        setCheckingAuth(false);
      }
    }
    checkExistingSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!email.trim() || !password) {
      setErrorMsg("Please enter both email address and password.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        if (
          error.message.toLowerCase().includes("invalid login credentials") ||
          error.message.toLowerCase().includes("invalid_grant")
        ) {
          setErrorMsg("Invalid email or password. Please check your credentials.");
        } else if (error.message.toLowerCase().includes("email not confirmed")) {
          setErrorMsg("Email not confirmed. Please check 'Auto Confirm User' in Supabase.");
        } else {
          setErrorMsg(error.message || "Login failed. Please try again.");
        }
        return;
      }

      if (data.session) {
        router.replace("/admin/dashboard");
      }
    } catch (err: any) {
      console.error("Admin login error:", err);
      setErrorMsg(err?.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#070c11]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)]" />
          <p className="text-gray-400 text-xs tracking-wider uppercase">Checking Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#070c11] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--color-accent)]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--color-sky)]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-md bg-gradient-to-b from-[#131d26] to-[#0a1015] border border-white/10 rounded-3xl p-6 sm:p-9 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-accent)] via-amber-500 to-[var(--color-sky)] rounded-t-3xl" />

        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="relative h-16 px-4 mb-3 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(250,132,30,0.25)] border border-white/15 bg-black/60 flex items-center justify-center">
            <img
              src="/tanzeel-top-logo.png"
              alt="Al Tanzeel Quran Academy Logo"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent-light)] text-[11px] font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Secure Admin Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Al Tanzeel <span className="text-[var(--color-accent)]">Admin</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Sign in to manage student registrations & inquiries
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-6 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl p-3.5 flex items-start gap-2.5 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span className="leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email Address */}
          <div>
            <label className="block text-gray-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                autoComplete="email"
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@altanzeelquranacademy.com"
                className="w-full bg-[#060a0e] border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all disabled:opacity-50 placeholder:text-gray-600 shadow-inner"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#060a0e] border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl pl-10 pr-11 py-3 outline-none transition-all disabled:opacity-50 placeholder:text-gray-600 shadow-inner"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--color-accent)] via-amber-500 to-[var(--color-accent)] hover:from-[var(--color-accent-hover)] hover:to-amber-600 text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_25px_rgba(250,132,30,0.4)] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In to Admin Portal</span>
              </>
            )}
          </button>
        </form>

        {/* Card Footer: Back to Website Link */}
        <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Website</span>
          </Link>
          <span className="text-[10px] text-gray-500 font-mono">
            SSL 256-bit Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
