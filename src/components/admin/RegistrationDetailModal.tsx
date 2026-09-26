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
  Printer,
} from "lucide-react";
import { TrialRegistration, RegistrationStatus } from "@/types/admin";
import { WhatsAppIcon } from "../FloatingContact";
import RegistrationSlipModal from "./RegistrationSlipModal";

interface Props {
  registration: TrialRegistration | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string | number, status: RegistrationStatus, notes: string) => Promise<boolean>;
  theme?: "dark" | "light";
}

const statusOptions: { label: RegistrationStatus; color: string }[] = [
  { label: "New", color: "bg-blue-500/20 text-blue-400 border-blue-500/40" },
  { label: "Contacted", color: "bg-amber-500/20 text-amber-500 border-amber-500/40" },
  { label: "Demo Scheduled", color: "bg-purple-500/20 text-purple-400 border-purple-500/40" },
  { label: "Enrolled", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/40" },
  { label: "Rejected", color: "bg-rose-500/20 text-rose-400 border-rose-500/40" },
];

export default function RegistrationDetailModal({
  registration,
  isOpen,
  onClose,
  onUpdate,
  theme = "dark",
}: Props) {
  const isLight = theme === "light";
  const [currentStatus, setCurrentStatus] = useState<RegistrationStatus>("New");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showSlipModal, setShowSlipModal] = useState(false);

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
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm animate-fade-in ${
      isLight ? "bg-slate-900/50" : "bg-black/80"
    }`}>
      <div className={`relative w-full max-w-2xl rounded-3xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto transition-all ${
        isLight
          ? "bg-white border border-slate-200 text-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.15)]"
          : "bg-gradient-to-b from-[#141e27] to-[#0b1117] border border-white/15 text-white shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
      }`}>
        {/* Top Glowing Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-accent)] via-amber-500 to-[var(--color-sky)] rounded-t-3xl" />

        {/* Header */}
        <div className={`flex items-start justify-between gap-4 pb-4 border-b ${
          isLight ? "border-slate-200" : "border-white/10"
        }`}>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2.5 py-1 rounded-full border border-[var(--color-accent)]/30">
              Registration #{String(registration.id).slice(0, 8)}
            </span>
            <h3 className={`text-xl sm:text-2xl font-black mt-2 ${
              isLight ? "text-slate-900" : "text-white"
            }`}>
              {registration.full_name}
            </h3>
            <p className={`text-xs flex items-center gap-1.5 mt-1 ${
              isLight ? "text-slate-500" : "text-gray-400"
            }`}>
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Registered on: {formattedDate}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isLight ? "text-slate-400 hover:text-slate-700 hover:bg-slate-100" : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Buttons: WhatsApp, Email & View/Download Slip */}
        <div className="flex flex-col gap-2.5 my-4">
          <button
            type="button"
            onClick={() => setShowSlipModal(true)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-[var(--color-accent)]/20 to-amber-500/20 hover:from-amber-500/30 hover:to-amber-500/30 border border-[var(--color-accent)]/40 text-[var(--color-accent)] font-bold text-xs sm:text-sm transition-all hover:scale-[1.01] shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
            <span>View &amp; Download Confirmation Slip (PDF / PNG)</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold text-xs sm:text-sm transition-all hover:scale-[1.01]"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`mailto:${registration.email}?subject=Al Tanzeel Quran Academy - Free Trial Class`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--color-sky)]/15 hover:bg-[var(--color-sky)]/25 border border-[var(--color-sky)]/40 text-[var(--color-sky-light)] font-bold text-xs sm:text-sm transition-all hover:scale-[1.01]"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Send Email</span>
            </a>
          </div>
        </div>

        {/* Details Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 border rounded-2xl p-4 my-4 ${
          isLight ? "bg-slate-50/80 border-slate-200" : "bg-black/40 border-white/10"
        }`}>
          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isLight ? "bg-slate-200/70 text-slate-700" : "bg-white/5 text-gray-300"
            }`}>
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-[10px] uppercase font-bold ${isLight ? "text-slate-500" : "text-gray-400"}`}>Phone / WhatsApp</p>
              <p className={`text-xs sm:text-sm font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>{registration.phone}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isLight ? "bg-slate-200/70 text-slate-700" : "bg-white/5 text-gray-300"
            }`}>
              <Mail className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className={`text-[10px] uppercase font-bold ${isLight ? "text-slate-500" : "text-gray-400"}`}>Email Address</p>
              <p className={`text-xs sm:text-sm font-semibold truncate ${isLight ? "text-slate-900" : "text-white"}`}>
                {registration.email}
              </p>
            </div>
          </div>

          {/* Country */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isLight ? "bg-slate-200/70 text-slate-700" : "bg-white/5 text-gray-300"
            }`}>
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-[10px] uppercase font-bold ${isLight ? "text-slate-500" : "text-gray-400"}`}>Country</p>
              <p className={`text-xs sm:text-sm font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>{registration.country}</p>
            </div>
          </div>

          {/* Course */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[var(--color-accent)] shrink-0 ${
              isLight ? "bg-amber-100" : "bg-white/5"
            }`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-[10px] uppercase font-bold ${isLight ? "text-slate-500" : "text-gray-400"}`}>Course Selected</p>
              <p className="text-[var(--color-accent)] text-xs sm:text-sm font-bold">
                {registration.course}
              </p>
            </div>
          </div>

          {/* Age */}
          {registration.age && (
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-amber-500 shrink-0 ${
                isLight ? "bg-amber-100" : "bg-white/5"
              }`}>
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className={`text-[10px] uppercase font-bold ${isLight ? "text-slate-500" : "text-gray-400"}`}>Student Age</p>
                <p className={`text-xs sm:text-sm font-semibold ${isLight ? "text-amber-700" : "text-amber-300"}`}>{registration.age}</p>
              </div>
            </div>
          )}

          {/* Gender */}
          {registration.gender && (
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-purple-500 shrink-0 ${
                isLight ? "bg-purple-100" : "bg-white/5"
              }`}>
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className={`text-[10px] uppercase font-bold ${isLight ? "text-slate-500" : "text-gray-400"}`}>Gender</p>
                <p className={`text-xs sm:text-sm font-semibold ${isLight ? "text-purple-700" : "text-purple-300"}`}>{registration.gender}</p>
              </div>
            </div>
          )}

          {/* Preferred Time */}
          <div className={`flex items-center gap-3 ${!registration.age && !registration.gender ? "sm:col-span-2" : ""}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sky-500 shrink-0 ${
              isLight ? "bg-sky-100" : "bg-white/5"
            }`}>
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-[10px] uppercase font-bold ${isLight ? "text-slate-500" : "text-gray-400"}`}>Preferred Class Time</p>
              <p className={`text-xs sm:text-sm font-bold ${isLight ? "text-sky-700" : "text-sky-300"}`}>
                {registration.preferred_time}
              </p>
            </div>
          </div>
        </div>

        {/* Student Message / Special Request */}
        {registration.message && (
          <div className={`rounded-2xl p-3.5 my-2 border ${
            isLight
              ? "bg-amber-50 border-amber-200 text-amber-950"
              : "bg-amber-500/10 border-amber-500/25 text-gray-200"
          }`}>
            <p className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider mb-1 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Student Message / Special Request</span>
            </p>
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
              {registration.message}
            </p>
          </div>
        )}

        {/* Status & Notes Management Section */}
        <div className={`flex flex-col gap-4 mt-5 pt-4 border-t ${
          isLight ? "border-slate-200" : "border-white/10"
        }`}>
          {/* Status Selection */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
              isLight ? "text-slate-700" : "text-gray-300"
            }`}>
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
                      ? `${opt.color} ring-2 ${isLight ? "ring-slate-400" : "ring-white/30"} font-extrabold scale-[1.02]`
                      : isLight
                      ? "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
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
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
              isLight ? "text-slate-700" : "text-gray-300"
            }`}>
              <FileText className={`w-3.5 h-3.5 ${isLight ? "text-slate-500" : "text-gray-400"}`} />
              <span>Internal Admin Notes (Follow-up notes, schedule details, etc.)</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Student prefers female teacher. Contacted on WhatsApp at 10 AM. Demo scheduled for Friday."
              className={`w-full text-xs sm:text-sm rounded-xl p-3 outline-none transition-all resize-none shadow-inner border focus:ring-1 focus:ring-[var(--color-accent)] ${
                isLight
                  ? "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[var(--color-accent)]"
                  : "bg-[#070c11] border-white/15 text-white placeholder:text-gray-600 focus:border-[var(--color-accent)]"
              }`}
            />
          </div>

          {/* Save Status Notification */}
          {saveSuccess && (
            <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs rounded-xl p-3 flex items-center gap-2 animate-fade-in font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Status and notes updated successfully!</span>
            </div>
          )}

          {errorMsg && (
            <div className="bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs rounded-xl p-3 flex items-center gap-2 animate-fade-in font-semibold">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Save Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                isLight
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
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

      {/* Official Registration Slip Preview & Download Modal */}
      <RegistrationSlipModal
        isOpen={showSlipModal}
        onClose={() => setShowSlipModal(false)}
        registration={registration}
        theme={theme}
      />
    </div>
  );
}
