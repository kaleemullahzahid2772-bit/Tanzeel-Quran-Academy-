"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Sparkles,
  Clock,
  User,
  Mail,
  Phone,
  BookOpen,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Lock,
} from "lucide-react";
import CountrySelect from "./CountrySelect";
import { supabase } from "@/lib/supabase";

interface TrialClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrialClassModal({ isOpen, onClose }: TrialClassModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "United States",
    course: "Quranic Qaidah",
    preferredTime: "06:00 PM",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.country.trim()
    ) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.from("trial_class_requests").insert([
        {
          full_name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          country: formData.country.trim(),
          course: formData.course.trim(),
          preferred_time: formData.preferredTime.trim(),
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        setErrorMsg(error.message || "Failed to submit request. Please try again.");
      } else {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 4000);
      }
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setErrorMsg(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#18232c] to-[#0e161d] border border-white/10 rounded-3xl p-6 sm:p-9 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Top Glowing Color Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-accent)] via-amber-500 to-[var(--color-sky)]" />

        {/* Ambient Corner Orbs */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-[var(--color-accent)]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-[var(--color-sky)]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center gap-5 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border-2 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Demo Request Received!
              </h3>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
                JazakAllah Khair!
              </p>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm max-w-md leading-relaxed bg-white/5 border border-white/10 rounded-2xl p-4">
              Our academic coordinator will reach out to you via WhatsApp or Email within <strong className="text-white">2 to 4 hours</strong> to confirm your free trial class schedule.
            </p>
          </div>
        ) : (
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent-light)] text-[11px] font-bold uppercase tracking-widest mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Free - 3 Days Trial - No Credit Card</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1.5">
                Book a <span className="text-[var(--color-accent)]">Free Trial Class</span>
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Experience live 1-on-1 online Quran tutoring with certified male or female teachers.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl p-3.5 flex items-center gap-2.5 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
              {/* Full Name */}
              <div>
                <label className="block text-gray-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    disabled={loading}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all disabled:opacity-50 placeholder:text-gray-500 shadow-inner"
                  />
                </div>
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    WhatsApp / Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      required
                      disabled={loading}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (123) 456-7890"
                      className="w-full bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all disabled:opacity-50 placeholder:text-gray-500 shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      disabled={loading}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all disabled:opacity-50 placeholder:text-gray-500 shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* Country & Course Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    Country *
                  </label>
                  <CountrySelect
                    value={formData.country}
                    onChange={(country) => setFormData({ ...formData, country })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    Course Interested *
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      disabled={loading}
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all disabled:opacity-50 cursor-pointer shadow-inner"
                    >
                      <option value="Quranic Qaidah">Quranic Qaidah</option>
                      <option value="Quran Gateway">Quran Gateway</option>
                      <option value="Quran Memorizing (Hifz)">Quran Memorizing (Hifz)</option>
                      <option value="Translation of Holy Quran">Translation of Holy Quran</option>
                      <option value="Women Quranic Course">Women Quranic Course</option>
                      <option value="Tajweed Course">Tajweed Course</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-gray-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                  Preferred Class Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    disabled={loading}
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all cursor-pointer disabled:opacity-50 shadow-inner"
                  >
                    <optgroup label="🌅 Morning Slots">
                      <option value="06:00 AM">06:00 AM</option>
                      <option value="07:00 AM">07:00 AM</option>
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                    </optgroup>
                    <optgroup label="☀️ Afternoon Slots">
                      <option value="12:00 PM">12:00 PM (Noon)</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </optgroup>
                    <optgroup label="🌆 Evening Slots">
                      <option value="05:00 PM">05:00 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                      <option value="08:00 PM">08:00 PM</option>
                      <option value="09:00 PM">09:00 PM</option>
                    </optgroup>
                    <optgroup label="🌙 Night / Late Hours">
                      <option value="10:00 PM">10:00 PM</option>
                      <option value="11:00 PM">11:00 PM</option>
                      <option value="12:00 AM">12:00 AM (Midnight)</option>
                      <option value="01:00 AM">01:00 AM</option>
                      <option value="02:00 AM">02:00 AM</option>
                      <option value="03:00 AM">03:00 AM</option>
                      <option value="04:00 AM">04:00 AM</option>
                      <option value="05:00 AM">05:00 AM</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-accent)] via-amber-500 to-[var(--color-accent)] hover:from-[var(--color-accent-hover)] hover:to-amber-600 text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_25px_rgba(250,132,30,0.5)] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <span>Submit Demo Request</span>
                )}
              </button>

              {/* Trust Badges Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Free Trial
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[var(--color-sky)]" />
                  Privacy Guaranteed
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  2-Hour Response
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
