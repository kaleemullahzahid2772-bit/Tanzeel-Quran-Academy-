"use client";

import React, { useState } from "react";
import {
  X,
  Star,
  User,
  Mail,
  Globe,
  Calendar,
  CheckCircle2,
  XCircle,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  BookOpen,
  MessageSquare,
  FileText,
} from "lucide-react";
import { ParentReview, ReviewStatus } from "@/types/reviews";

interface ReviewDetailModalProps {
  review: ParentReview | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string | number, newStatus: ReviewStatus) => Promise<void>;
  onToggleVerified: (id: string | number, currentVerified: boolean) => Promise<void>;
  onDelete: (id: string | number) => Promise<void>;
  onSaveNotes?: (id: string | number, notes: string) => Promise<void>;
  theme?: "dark" | "light";
}

export default function ReviewDetailModal({
  review,
  isOpen,
  onClose,
  onStatusChange,
  onToggleVerified,
  onDelete,
  onSaveNotes,
  theme = "dark",
}: ReviewDetailModalProps) {
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState(review?.admin_notes || "");
  const [notesSaving, setNotesSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  React.useEffect(() => {
    if (review) {
      setAdminNotes(review.admin_notes || "");
      setConfirmDelete(false);
    }
  }, [review]);

  if (!isOpen || !review) return null;

  const isLight = theme === "light";

  const handleStatus = async (status: ReviewStatus) => {
    try {
      setActionLoading(true);
      await onStatusChange(review.id, status);
    } finally {
      setActionLoading(false);
    }
  };

  const handleVerified = async () => {
    try {
      setActionLoading(true);
      await onToggleVerified(review.id, review.is_verified_parent);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      await onDelete(review.id);
      onClose();
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!onSaveNotes) return;
    try {
      setNotesSaving(true);
      await onSaveNotes(review.id, adminNotes);
    } finally {
      setNotesSaving(false);
    }
  };

  const formattedDate = new Date(review.created_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto transition-colors my-auto ${
          isLight
            ? "bg-white text-slate-800 border-slate-200"
            : "bg-[#111922] text-white border-white/15"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition cursor-pointer ${
            isLight
              ? "bg-slate-100 hover:bg-slate-200 text-slate-600"
              : "bg-white/10 hover:bg-white/20 text-gray-300"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 mb-6 pr-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  review.status === "Approved"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : review.status === "Rejected"
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}
              >
                {review.status}
              </span>

              {review.is_verified_parent && (
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Parent
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black">
              Review from {review.parent_name}
            </h2>
            <p className={`text-xs mt-0.5 flex items-center gap-1.5 ${isLight ? "text-slate-500" : "text-gray-400"}`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>Submitted: {formattedDate}</span>
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-4 mb-6 text-xs sm:text-sm">
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className={`p-3.5 rounded-2xl border ${
                isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/10"
              }`}
            >
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <Globe className="w-3.5 h-3.5 text-[var(--color-sky)]" />
                <span>Country of Residence</span>
              </div>
              <p className="font-bold text-base">{review.country}</p>
            </div>

            <div
              className={`p-3.5 rounded-2xl border ${
                isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/10"
              }`}
            >
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>Parent Email (Private)</span>
              </div>
              <p className="font-bold text-sm truncate font-mono text-[var(--color-accent)]">
                {review.email || "Not Provided"}
              </p>
            </div>
          </div>

          {/* Rating Display */}
          <div
            className={`p-4 rounded-2xl border ${
              isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/10"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Rating Given
              </span>
              <span className="text-xs font-bold text-amber-400">
                {review.rating} / 5 Stars
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < review.rating
                      ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                      : "text-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Feedback Body */}
          <div
            className={`p-4 rounded-2xl border ${
              isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/10"
            }`}
          >
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Full Parent Feedback
            </span>
            <p className="text-sm leading-relaxed whitespace-pre-wrap italic">
              &ldquo;{review.feedback}&rdquo;
            </p>
          </div>

          {/* Course Name if present */}
          {review.course_name && (
            <div
              className={`p-3 rounded-2xl border flex items-center justify-between ${
                isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/10"
              }`}
            >
              <span className="text-xs text-gray-400">Course Reference:</span>
              <span className="font-bold text-xs text-[var(--color-accent)]">
                {review.course_name}
              </span>
            </div>
          )}

          {/* Admin Notes */}
          <div
            className={`p-4 rounded-2xl border ${
              isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/10"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Internal Admin Notes</span>
              </span>
              {onSaveNotes && (
                <button
                  onClick={handleSaveNotes}
                  disabled={notesSaving}
                  className="px-2.5 py-1 text-xs font-bold bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg transition disabled:opacity-50"
                >
                  {notesSaving ? "Saving..." : "Save Notes"}
                </button>
              )}
            </div>
            <textarea
              rows={2}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="e.g. Verified parent of student Fatima in Batch 3..."
              className={`w-full text-xs rounded-xl p-2.5 border outline-none resize-none transition ${
                isLight
                  ? "bg-white border-slate-300 text-slate-800"
                  : "bg-black/40 border-white/15 text-white"
              }`}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="border-t pt-4 border-inherit space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            {/* Left Actions: Approve / Reject / Verified Badge Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              {review.status !== "Approved" && (
                <button
                  onClick={() => handleStatus("Approved")}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Review</span>
                </button>
              )}

              {review.status !== "Rejected" && (
                <button
                  onClick={() => handleStatus("Rejected")}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition cursor-pointer disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Review</span>
                </button>
              )}

              {/* Verified Parent Toggle */}
              <button
                onClick={handleVerified}
                disabled={actionLoading}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer disabled:opacity-50 ${
                  review.is_verified_parent
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25"
                    : "bg-white/5 text-gray-300 border-white/20 hover:bg-white/10"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  {review.is_verified_parent ? "Verified Parent (Active)" : "Mark as Verified Parent"}
                </span>
              </button>
            </div>

            {/* Right Action: Delete */}
            <div>
              {confirmDelete ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-rose-400 font-semibold">Confirm delete?</span>
                  <button
                    onClick={handleDelete}
                    disabled={actionLoading}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-2.5 py-1.5 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 rounded-lg text-xs transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="px-3 py-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
