"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Star,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  Eye,
  Mail,
  Globe,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
  MessageSquare,
  ThumbsUp,
  Database,
  ArrowUpDown,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ParentReview, ReviewStatus } from "@/types/reviews";
import ReviewDetailModal from "./ReviewDetailModal";
import { countriesData, getFlagUrl } from "@/data/countries";

interface AdminReviewsManagerProps {
  theme?: "dark" | "light";
  onPendingCountChange?: (count: number) => void;
}

export default function AdminReviewsManager({
  theme = "dark",
  onPendingCountChange,
}: AdminReviewsManagerProps) {
  const isLight = theme === "light";

  const [reviews, setReviews] = useState<ParentReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [needsMigration, setNeedsMigration] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Selected for Modal
  const [selectedReview, setSelectedReview] = useState<ParentReview | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Notification / Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Fetch reviews from Supabase
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    setNeedsMigration(false);

    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase fetch reviews warning:", error);
        if (
          error.code === "PGRST205" ||
          error.message?.includes("reviews") ||
          error.message?.includes("does not exist")
        ) {
          setNeedsMigration(true);
        } else {
          setErrorMsg(error.message || "Failed to load reviews from database.");
        }
      } else {
        const list = (data as ParentReview[]) || [];
        setReviews(list);

        const pending = list.filter((r) => r.status === "Pending").length;
        if (onPendingCountChange) {
          onPendingCountChange(pending);
        }
      }
    } catch (err: any) {
      console.error("Exception fetching reviews:", err);
      setErrorMsg(err?.message || "An unexpected error occurred while fetching reviews.");
    } finally {
      setLoading(false);
    }
  }, [onPendingCountChange]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Real-time subscription to `reviews` table
  useEffect(() => {
    const channel = supabase
      .channel("admin-realtime-reviews")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reviews",
        },
        () => {
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchReviews]);

  // Status Change (Approve, Reject, Pending)
  const handleStatusChange = async (id: string | number, newStatus: ReviewStatus) => {
    // Optimistic UI update
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );

    if (selectedReview && selectedReview.id === id) {
      setSelectedReview((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      const { error } = await supabase
        .from("reviews")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        showToast("Error updating status: " + error.message);
        fetchReviews();
      } else {
        showToast(`Review marked as ${newStatus}!`);
      }
    } catch (err: any) {
      showToast("Failed to update status.");
      fetchReviews();
    }
  };

  // Toggle Verified Parent status
  const handleToggleVerified = async (id: string | number, currentVerified: boolean) => {
    const nextVal = !currentVerified;

    // Optimistic UI update
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_verified_parent: nextVal } : r))
    );

    if (selectedReview && selectedReview.id === id) {
      setSelectedReview((prev) => (prev ? { ...prev, is_verified_parent: nextVal } : null));
    }

    try {
      const { error } = await supabase
        .from("reviews")
        .update({ is_verified_parent: nextVal })
        .eq("id", id);

      if (error) {
        showToast("Error updating verification: " + error.message);
        fetchReviews();
      } else {
        showToast(nextVal ? "Marked as Verified Parent! 🛡️" : "Removed Verified Parent badge.");
      }
    } catch (err: any) {
      showToast("Failed to update verification.");
      fetchReviews();
    }
  };

  // Delete Review
  const handleDelete = async (id: string | number) => {
    // Optimistic UI update
    setReviews((prev) => prev.filter((r) => r.id !== id));

    try {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) {
        showToast("Error deleting review: " + error.message);
        fetchReviews();
      } else {
        showToast("Review deleted successfully.");
      }
    } catch (err: any) {
      showToast("Failed to delete review.");
      fetchReviews();
    }
  };

  // Save Admin Notes
  const handleSaveNotes = async (id: string | number, notes: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ admin_notes: notes })
        .eq("id", id);

      if (error) {
        showToast("Error saving notes: " + error.message);
      } else {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, admin_notes: notes } : r))
        );
        showToast("Internal notes saved successfully.");
      }
    } catch (err: any) {
      showToast("Failed to save notes.");
    }
  };

  // Compute Statistics
  const stats = useMemo(() => {
    const total = reviews.length;
    const pending = reviews.filter((r) => r.status === "Pending").length;
    const approved = reviews.filter((r) => r.status === "Approved").length;
    const rejected = reviews.filter((r) => r.status === "Rejected").length;
    const verified = reviews.filter((r) => r.is_verified_parent).length;
    return { total, pending, approved, rejected, verified };
  }, [reviews]);

  // Filter and search
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      // Status filter
      if (statusFilter !== "All" && r.status !== statusFilter) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = r.parent_name?.toLowerCase().includes(q);
        const matchesCountry = r.country?.toLowerCase().includes(q);
        const matchesEmail = r.email?.toLowerCase().includes(q);
        const matchesFeedback = r.feedback?.toLowerCase().includes(q);
        const matchesCourse = r.course_name?.toLowerCase().includes(q);
        return matchesName || matchesCountry || matchesEmail || matchesFeedback || matchesCourse;
      }
      return true;
    });
  }, [reviews, statusFilter, searchTerm]);

  // Country Flag Helper
  const getFlag = (countryName: string) => {
    const match = countriesData.find(
      (c) => c.name.toLowerCase() === countryName?.trim().toLowerCase()
    );
    return match ? getFlagUrl(match.code) : null;
  };

  const handleCopySql = () => {
    const sql = `-- Al Tanzeel Quran Academy Reviews Migration
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  parent_name TEXT NOT NULL,
  country TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  is_verified_parent BOOLEAN NOT NULL DEFAULT false,
  course_name TEXT DEFAULT '',
  admin_notes TEXT DEFAULT ''
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read approved reviews" ON public.reviews FOR SELECT USING (status = 'Approved');
CREATE POLICY "Public can submit pending reviews" ON public.reviews FOR INSERT WITH CHECK (status = 'Pending' AND is_verified_parent = false);
CREATE POLICY "Admins have full access to reviews" ON public.reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);
`;
    navigator.clipboard.writeText(sql);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 3000);
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6 animate-fade-in">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-slate-900/95 text-white border border-[var(--color-accent)]/50 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Migration Alert Banner if Table does not exist in Supabase yet */}
      {needsMigration && (
        <div
          className={`p-4 sm:p-5 rounded-3xl border shadow-lg ${
            isLight
              ? "bg-amber-50 border-amber-300 text-amber-950"
              : "bg-amber-500/10 border-amber-500/30 text-amber-200"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-500 shrink-0 mt-0.5">
                <Database className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="font-extrabold text-sm sm:text-base">
                  Supabase &ldquo;reviews&rdquo; Table Setup Required
                </h3>
                <p className="opacity-90 max-w-2xl leading-relaxed">
                  The reviews table has not been created yet in your Supabase project. A complete, secure SQL migration script with Row Level Security (RLS) is ready. Simply run it in your Supabase SQL Editor.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopySql}
                className="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded-xl text-xs transition shadow flex items-center gap-1.5 cursor-pointer"
              >
                {sqlCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{sqlCopied ? "SQL Copied!" : "Copy SQL Script"}</span>
              </button>

              <button
                onClick={fetchReviews}
                className={`p-2 rounded-xl border text-xs font-semibold transition ${
                  isLight
                    ? "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"
                    : "bg-white/10 border-white/15 text-white hover:bg-white/20"
                }`}
                title="Check again"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Database Error Banner */}
      {errorMsg && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 rounded-2xl p-4 flex items-center gap-3 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Top Header & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2
            className={`text-xl sm:text-2xl font-black tracking-tight ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Parents Reviews &amp; <span className="text-[var(--color-accent)]">Feedback Moderation</span>
          </h2>
          <p className={`text-xs mt-0.5 ${isLight ? "text-slate-500" : "text-gray-400"}`}>
            Review incoming parent testimonials, approve genuine reviews, assign Verified Parent badges, and filter submissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchReviews}
            disabled={loading}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer ${
              isLight
                ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                : "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[var(--color-accent)]" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* ==============================================================
          1. STATS METRICS ROW
         ============================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Reviews */}
        <div
          className={`p-4 rounded-3xl border shadow-sm flex items-center justify-between ${
            isLight ? "bg-white border-slate-200" : "bg-[#0e161e] border-white/10"
          }`}
        >
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Total Reviews
            </p>
            <p className="text-2xl sm:text-3xl font-black mt-1">{stats.total}</p>
          </div>
          <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        {/* Pending Approvals (Pulse highlighted) */}
        <div
          onClick={() => setStatusFilter("Pending")}
          className={`p-4 rounded-3xl border shadow-sm flex items-center justify-between cursor-pointer transition ${
            statusFilter === "Pending" ? "ring-2 ring-amber-500" : ""
          } ${
            isLight ? "bg-white border-slate-200" : "bg-[#0e161e] border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Pending Approval
              </p>
              {stats.pending > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              )}
            </div>
            <p className="text-2xl sm:text-3xl font-black mt-1 text-amber-500">
              {stats.pending}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Approved Reviews */}
        <div
          onClick={() => setStatusFilter("Approved")}
          className={`p-4 rounded-3xl border shadow-sm flex items-center justify-between cursor-pointer transition ${
            statusFilter === "Approved" ? "ring-2 ring-emerald-500" : ""
          } ${
            isLight ? "bg-white border-slate-200" : "bg-[#0e161e] border-white/10"
          }`}
        >
          <div>
            <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Approved
            </p>
            <p className="text-2xl sm:text-3xl font-black mt-1 text-emerald-400">
              {stats.approved}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Verified Parents */}
        <div
          className={`p-4 rounded-3xl border shadow-sm flex items-center justify-between ${
            isLight ? "bg-white border-slate-200" : "bg-[#0e161e] border-white/10"
          }`}
        >
          <div>
            <p className="text-[11px] font-bold text-[var(--color-accent)] uppercase tracking-wider">
              Verified Parents
            </p>
            <p className="text-2xl sm:text-3xl font-black mt-1 text-[var(--color-accent)]">
              {stats.verified}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ==============================================================
          2. FILTER & SEARCH TOOLBAR
         ============================================================== */}
      <div
        className={`p-3 sm:p-4 rounded-3xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${
          isLight ? "bg-white border-slate-200" : "bg-[#0e161e] border-white/10"
        }`}
      >
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by parent name, country, email, or feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border outline-none transition ${
              isLight
                ? "bg-slate-50 border-slate-200 focus:border-amber-600 text-slate-800"
                : "bg-black/40 border-white/10 focus:border-[var(--color-accent)] text-white"
            }`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Status:
          </span>
          {["All", "Pending", "Approved", "Rejected"].map((status) => {
            const count =
              status === "All"
                ? reviews.length
                : reviews.filter((r) => r.status === status).length;
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[var(--color-accent)] text-white shadow-md"
                    : isLight
                    ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    : "bg-white/5 hover:bg-white/10 text-gray-300"
                }`}
              >
                <span>{status}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-black/25 text-white"
                      : isLight
                      ? "bg-slate-200 text-slate-600"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ==============================================================
          3. REVIEWS CONTENT: TABLE (Desktop) & CARDS (Mobile)
         ============================================================== */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-[var(--color-accent)] mx-auto" />
          <p className="text-xs text-gray-400">Loading reviews from Supabase database...</p>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div
          className={`py-16 text-center rounded-3xl border ${
            isLight ? "bg-white border-slate-200" : "bg-[#0e161e] border-white/10"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white/5 mx-auto flex items-center justify-center text-gray-400 mb-3">
            <MessageSquare className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold">No Reviews Found</h3>
          <p className={`text-xs mt-1 max-w-sm mx-auto ${isLight ? "text-slate-500" : "text-gray-400"}`}>
            {searchTerm || statusFilter !== "All"
              ? "Try adjusting your search keywords or switching the status filter back to 'All'."
              : "No parent reviews have been submitted yet."}
          </p>
          {(searchTerm || statusFilter !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
              }}
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE VIEW */}
          <div
            className={`hidden lg:block border rounded-3xl overflow-hidden shadow-xl ${
              isLight ? "bg-white border-slate-200" : "bg-[#0e161e] border-white/10 shadow-2xl"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead
                  className={`border-b uppercase text-[10px] font-bold tracking-wider ${
                    isLight
                      ? "bg-slate-100/80 border-slate-200 text-slate-600"
                      : "bg-[#090f14] border-white/10 text-gray-400"
                  }`}
                >
                  <tr>
                    <th className="py-3.5 px-4">Parent / Country</th>
                    <th className="py-3.5 px-4">Email (Private)</th>
                    <th className="py-3.5 px-3">Rating</th>
                    <th className="py-3.5 px-4 min-w-[280px]">Feedback</th>
                    <th className="py-3.5 px-3 text-center">Status</th>
                    <th className="py-3.5 px-3 text-center">Verified Badge</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isLight ? "divide-slate-100" : "divide-white/5"
                  }`}
                >
                  {filteredReviews.map((rev) => {
                    const flag = getFlag(rev.country);
                    const formattedDate = new Date(rev.created_at).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    );

                    return (
                      <tr
                        key={rev.id}
                        className={`transition ${
                          isLight
                            ? "hover:bg-slate-50/70"
                            : "hover:bg-white/[0.02]"
                        }`}
                      >
                        {/* Parent & Country */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--color-accent)] to-amber-600 flex items-center justify-center text-white font-black text-xs shrink-0 shadow">
                              {rev.parent_name?.charAt(0) || "P"}
                            </div>
                            <div>
                              <p className="font-bold text-sm leading-snug">
                                {rev.parent_name}
                              </p>
                              <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5">
                                {flag ? (
                                  <img
                                    src={flag}
                                    alt={rev.country}
                                    className="w-3.5 h-2.5 object-cover rounded-xs border border-white/20 shrink-0"
                                  />
                                ) : (
                                  <Globe className="w-3 h-3 text-gray-400 shrink-0" />
                                )}
                                <span>{rev.country}</span>
                                <span>•</span>
                                <span className="text-[10px]">{formattedDate}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Email (Private to Admin) */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-accent)]">
                            <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="truncate max-w-[160px]">
                              {rev.email || "—"}
                            </span>
                          </div>
                        </td>

                        {/* Rating */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < rev.rating
                                    ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                                    : "text-gray-500"
                                }`}
                              />
                            ))}
                          </div>
                        </td>

                        {/* Feedback Snippet */}
                        <td className="py-3.5 px-4">
                          <p className="line-clamp-2 text-gray-300 italic">
                            &ldquo;{rev.feedback}&rdquo;
                          </p>
                          {rev.course_name && (
                            <span className="inline-block mt-1 text-[10px] font-semibold text-[var(--color-accent-light)]">
                              {rev.course_name}
                            </span>
                          )}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <select
                            value={rev.status}
                            onChange={(e) =>
                              handleStatusChange(rev.id, e.target.value as ReviewStatus)
                            }
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg border outline-none cursor-pointer ${
                              rev.status === "Approved"
                                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                : rev.status === "Rejected"
                                ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                                : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                            }`}
                          >
                            <option value="Pending" className="bg-[#141414] text-amber-400">
                              Pending
                            </option>
                            <option value="Approved" className="bg-[#141414] text-emerald-400">
                              Approved
                            </option>
                            <option value="Rejected" className="bg-[#141414] text-rose-400">
                              Rejected
                            </option>
                          </select>
                        </td>

                        {/* Verified Parent Toggle Button */}
                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleToggleVerified(rev.id, rev.is_verified_parent)
                            }
                            title="Click to toggle Verified Parent badge (Admin Only)"
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 border transition cursor-pointer ${
                              rev.is_verified_parent
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30 shadow-sm"
                                : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/15"
                            }`}
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{rev.is_verified_parent ? "Verified" : "Unverified"}</span>
                          </button>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Quick Approve / Reject buttons */}
                            {rev.status !== "Approved" && (
                              <button
                                onClick={() => handleStatusChange(rev.id, "Approved")}
                                title="Quick Approve"
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition cursor-pointer"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                            )}

                            {rev.status !== "Rejected" && (
                              <button
                                onClick={() => handleStatusChange(rev.id, "Rejected")}
                                title="Quick Reject"
                                className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition cursor-pointer"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}

                            {/* View Full Modal */}
                            <button
                              onClick={() => {
                                setSelectedReview(rev);
                                setIsModalOpen(true);
                              }}
                              title="View Full Review & Notes"
                              className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 transition cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Are you sure you want to permanently delete the review from "${rev.parent_name}"?`
                                  )
                                ) {
                                  handleDelete(rev.id);
                                }
                              }}
                              title="Delete Review"
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE STACKED CARD VIEW */}
          <div className="grid grid-cols-1 gap-3.5 lg:hidden">
            {filteredReviews.map((rev) => {
              const flag = getFlag(rev.country);
              const formattedDate = new Date(rev.created_at).toLocaleDateString(
                "en-US",
                { month: "short", day: "numeric", year: "numeric" }
              );

              return (
                <div
                  key={rev.id}
                  className={`p-4 rounded-3xl border shadow-md flex flex-col gap-3.5 transition ${
                    isLight ? "bg-white border-slate-200" : "bg-[#0e161e] border-white/10"
                  }`}
                >
                  {/* Top: Avatar, Name, Status & Verified Badge */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[var(--color-accent)] to-amber-600 flex items-center justify-center text-white font-black text-sm shrink-0 shadow">
                        {rev.parent_name?.charAt(0) || "P"}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm leading-snug">
                          {rev.parent_name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                          {flag && (
                            <img
                              src={flag}
                              alt={rev.country}
                              className="w-3.5 h-2.5 object-cover rounded-xs border border-white/20 shrink-0"
                            />
                          )}
                          <span>{rev.country}</span>
                          <span>•</span>
                          <span className="text-[10px]">{formattedDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          rev.status === "Approved"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : rev.status === "Rejected"
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {rev.status}
                      </span>

                      {rev.is_verified_parent && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stars & Private Email */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-inherit">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                              : "text-gray-500"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1 font-mono text-[11px] text-[var(--color-accent)] truncate max-w-[180px]">
                      <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                      <span className="truncate">{rev.email || "—"}</span>
                    </div>
                  </div>

                  {/* Feedback text */}
                  <p className="text-xs leading-relaxed italic text-gray-300">
                    &ldquo;{rev.feedback}&rdquo;
                  </p>

                  {/* Mobile Action Buttons Bar */}
                  <div className="pt-2 border-t border-inherit flex flex-wrap items-center justify-between gap-2">
                    {/* Status Actions */}
                    <div className="flex items-center gap-1.5">
                      {rev.status !== "Approved" && (
                        <button
                          onClick={() => handleStatusChange(rev.id, "Approved")}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      )}

                      {rev.status !== "Rejected" && (
                        <button
                          onClick={() => handleStatusChange(rev.id, "Rejected")}
                          className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleToggleVerified(rev.id, rev.is_verified_parent)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                          rev.is_verified_parent
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            : "bg-white/5 text-gray-300 border-white/10"
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{rev.is_verified_parent ? "Verified" : "Verify"}</span>
                      </button>
                    </div>

                    {/* View Details & Delete */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setSelectedReview(rev);
                          setIsModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-sky-500/10 text-sky-400 cursor-pointer"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to delete review from "${rev.parent_name}"?`
                            )
                          ) {
                            handleDelete(rev.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-rose-500/10 text-rose-500 cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Review Details & Moderation Modal */}
      <ReviewDetailModal
        review={selectedReview}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReview(null);
        }}
        onStatusChange={handleStatusChange}
        onToggleVerified={handleToggleVerified}
        onDelete={handleDelete}
        onSaveNotes={handleSaveNotes}
        theme={theme}
      />
    </div>
  );
}
