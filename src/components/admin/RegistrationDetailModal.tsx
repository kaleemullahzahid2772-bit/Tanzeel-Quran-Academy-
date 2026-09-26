"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  Globe,
  BookOpen,
  Clock,
  Calendar,
  Save,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
} from "lucide-react";
import { TrialRegistration, RegistrationStatus } from "@/types/admin";
import { WhatsAppIcon } from "../FloatingContact";

interface Props {
  registration: TrialRegistration | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string | number, status: RegistrationStatus, notes: string) => Promise<boolean>;
}

const statusOptions: { label: RegistrationStatus; color: string }[] = [
  { label: "New", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { label: "Contacted", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  { label: "Demo Scheduled", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  { label: "Enrolled", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { label: "Rejected", color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
];

export default function RegistrationDetailModal({
  registration,
  isOpen,
  onClose,
  onUpdate,
}: Props) {
  const [currentStatus, setCurrentStatus] = useState<RegistrationStatus>("New");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (registration) {
      setCurrentStatus((registration.status as RegistrationStatus) || "New");
      setNotes(registration.notes || "");
      setSaveSuccess(false);
      setErrorMsg(null);
    }
  }, [registration]);

  if (!isOpen || !registration) return null;

  // Clean phone number for WhatsApp link
  const rawPhone = registration.phone.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
    `Assalamu Alaikum ${registration.full_name}, thank you for contacting Al Tanzeel Quran Academy regarding the ${registration.course} course. We would like to schedule your free trial class.`
  )}`;

  const handleSave = async () => {
    setSaving(true);
    setErrorMsg(null);
    setSaveSuccess(false);

    try {
      const success = await onUpdate(registration.id, currentStatus, notes);
      if (success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setErrorMsg("Failed to save changes. Make sure database migration was run.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const formattedDate = new Date(registration.created_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#141e27] to-[#0b1117] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto">
        {/* Top Glowing Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-amber-500 to-[var(--color-sky)] rounded-t-3xl" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2.5 py-1 rounded-full border border-[var(--color-accent)]/30">
              Registration #{String(registration.id).slice(0, 8)}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
              {registration.full_name}
            </h3>
            <p className="text-gray-400 text-xs flex items-center gap-1.5 mt-1">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>Registered on: {formattedDate}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Contact Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold text-xs sm:text-sm transition-all hover:scale-[1.01]"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`mailto:${registration.email}?subject=Al Tanzeel Quran Academy - Free Trial Class`}
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[var(--color-sky)]/15 hover:bg-[var(--color-sky)]/25 border border-[var(--color-sky)]/40 text-[var(--color-sky-light)] font-bold text-xs sm:text-sm transition-all hover:scale-[1.01]"
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span>Send Email</span>
          </a>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-black/40 border border-white/10 rounded-2xl p-4 my-4">
          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Phone / WhatsApp</p>
              <p className="text-white text-xs sm:text-sm font-semibold">{registration.phone}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] uppercase font-bold text-gray-400">Email Address</p>
              <p className="text-white text-xs sm:text-sm font-semibold truncate">
                {registration.email}
              </p>
            </div>
          </div>

          {/* Country */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Country</p>
              <p className="text-white text-xs sm:text-sm font-semibold">{registration.country}</p>
            </div>
          </div>

          {/* Course */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[var(--color-accent)] shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Course Selected</p>
              <p className="text-[var(--color-accent-light)] text-xs sm:text-sm font-bold">
                {registration.course}
              </p>
            </div>
          </div>

          {/* Age */}
          {registration.age && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-amber-400 shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Student Age</p>
                <p className="text-amber-300 text-xs sm:text-sm font-semibold">{registration.age}</p>
              </div>
            </div>
          )}

          {/* Gender */}
          {registration.gender && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Gender</p>
                <p className="text-purple-300 text-xs sm:text-sm font-semibold">{registration.gender}</p>
              </div>
            </div>
          )}

          {/* Preferred Time */}
          <div className={`flex items-center gap-3 ${!registration.age && !registration.gender ? "sm:col-span-2" : ""}`}>
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-sky-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Preferred Class Time</p>
              <p className="text-sky-300 text-xs sm:text-sm font-bold">
                {registration.preferred_time}
              </p>
            </div>
          </div>
        </div>

        {/* Student Message / Special Request */}
        {registration.message && (
          <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3.5 my-2">
            <p className="text-[10px] uppercase font-bold text-amber-400 tracking-wider mb-1 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Student Message / Special Request</span>
            </p>
            <p className="text-gray-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
              {registration.message}
            </p>
          </div>
        )}

        {/* Status & Notes Management Section */}
        <div className="flex flex-col gap-4 mt-5 pt-4 border-t border-white/10">
          {/* Status Selection */}
          <div>
            <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
              Registration Status
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setCurrentStatus(opt.label)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    currentStatus === opt.label
                      ? `${opt.color} ring-2 ring-white/30 font-extrabold scale-[1.02]`
                      : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {currentStatus === opt.label && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Admin Internal Notes */}
          <div>
            <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-gray-400" />
              <span>Internal Admin Notes (Follow-up notes, schedule details, etc.)</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Student prefers female teacher. Contacted on WhatsApp on 10 AM. Demo scheduled for Friday."
              className="w-full bg-[#070c11] border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl p-3 outline-none transition-all placeholder:text-gray-600 resize-none shadow-inner"
            />
          </div>

          {/* Save Status Notification */}
          {saveSuccess && (
            <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl p-3 flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Status and notes updated successfully!</span>
            </div>
          )}

          {errorMsg && (
            <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs rounded-xl p-3 flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Save Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 text-xs font-semibold transition-colors"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(250,132,30,0.35)] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
