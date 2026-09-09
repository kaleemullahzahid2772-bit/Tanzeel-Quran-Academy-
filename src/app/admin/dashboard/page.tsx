"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Sparkles,
  Calendar,
  Clock,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  ChevronDown,
  Eye,
  Phone,
  Mail,
  Globe,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { TrialRegistration, RegistrationStatus, DashboardStats } from "@/types/admin";
import RegistrationDetailModal from "@/components/admin/RegistrationDetailModal";
import { WhatsAppIcon } from "@/components/FloatingContact";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Registrations Data
  const [registrations, setRegistrations] = useState<TrialRegistration[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Detail Modal State
  const [selectedReg, setSelectedReg] = useState<TrialRegistration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Session verification
  useEffect(() => {
    async function verifyAuth() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) {
          router.replace("/admin/login");
          return;
        }
        setUserEmail(data.session.user?.email || "Admin");
      } catch {
        router.replace("/admin/login");
      } finally {
        setCheckingAuth(false);
      }
    }
    verifyAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.replace("/admin/login");
      } else if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // 2. Fetch registrations
  const fetchRegistrations = useCallback(async () => {
    setLoadingData(true);
    setDataError(null);

    try {
      const { data, error } = await supabase
        .from("trial_class_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);
        setDataError(error.message || "Failed to load registrations from database.");
      } else {
        setRegistrations((data as TrialRegistration[]) || []);
      }
    } catch (err: any) {
      console.error("Fetch exception:", err);
      setDataError(err?.message || "An unexpected error occurred while fetching registrations.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (!checkingAuth) {
      fetchRegistrations();
    }
  }, [checkingAuth, fetchRegistrations]);

  // 3. Logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      router.replace("/admin/login");
    }
  };

  // 4. Update registration status or notes
  const handleUpdateRegistration = async (
    id: string | number,
    newStatus: RegistrationStatus,
    newNotes: string
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("trial_class_requests")
        .update({
          status: newStatus,
          notes: newNotes,
        })
        .eq("id", id);

      if (error) {
        console.error("Update error:", error);
        return false;
      }

      // Update in local state
      setRegistrations((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus, notes: newNotes } : item
        )
      );

      // If open in modal, update modal state too
      if (selectedReg && selectedReg.id === id) {
        setSelectedReg((prev) =>
          prev ? { ...prev, status: newStatus, notes: newNotes } : null
        );
      }

      return true;
    } catch (err) {
      console.error("Update exception:", err);
      return false;
    }
  };

  // Quick Status change from dropdown in table
  const handleQuickStatusChange = async (
    id: string | number,
    newStatus: RegistrationStatus
  ) => {
    const current = registrations.find((r) => r.id === id);
    const notes = current?.notes || "";
    await handleUpdateRegistration(id, newStatus, notes);
  };

  // 5. Statistics Calculation
  const stats: DashboardStats = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const oneWeekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

    let total = registrations.length;
    let newCount = 0;
    let todayCount = 0;
    let weekCount = 0;

    registrations.forEach((r) => {
      const regStatus = (r.status || "New").toLowerCase();
      if (regStatus === "new") {
        newCount++;
      }

      const createdTime = new Date(r.created_at).getTime();
      if (createdTime >= todayStart) {
        todayCount++;
      }
      if (createdTime >= oneWeekAgo) {
        weekCount++;
      }
    });

    return { total, newCount, todayCount, weekCount };
  }, [registrations]);

  // 6. Filtered Registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      // Search Match
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.full_name?.toLowerCase().includes(q) ||
        r.phone?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.country?.toLowerCase().includes(q) ||
        r.course?.toLowerCase().includes(q);

      // Status Match
      const currentStatus = r.status || "New";
      const matchesStatus =
        statusFilter === "All" ||
        currentStatus.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [registrations, searchTerm, statusFilter]);

  // Status Badge Helper
  const getStatusBadge = (status?: string) => {
    const s = (status || "New").toLowerCase();
    switch (s) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            New
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Contacted
          </span>
        );
      case "demo scheduled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Demo Scheduled
          </span>
        );
      case "enrolled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Enrolled
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-500/20 text-gray-300 border border-gray-500/30">
            {status || "New"}
          </span>
        );
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#070c11]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)]" />
          <p className="text-gray-400 text-xs tracking-wider uppercase">Verifying Authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#070c11] text-white flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full bg-[#0a1015]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 px-2.5 rounded-xl overflow-hidden border border-white/15 bg-black/60 flex items-center justify-center shadow-inner">
            <img
              src="/tanzeel-top-logo.png"
              alt="Al Tanzeel Quran Academy Logo"
              className="h-7 w-auto object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-black text-sm sm:text-base tracking-tight">
                Al Tanzeel Admin
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] text-[10px] font-bold border border-[var(--color-accent)]/30">
                <ShieldCheck className="w-3 h-3" />
                Portal
              </span>
            </div>
            <p className="text-gray-400 text-[10px] hidden sm:block">
              Logged in as: <span className="text-gray-300 font-semibold">{userEmail}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Refresh button */}
          <button
            onClick={fetchRegistrations}
            disabled={loadingData}
            title="Refresh Registrations"
            className="p-2.5 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin text-[var(--color-accent)]" : ""}`} />
          </button>

          {/* View Public Website */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Public Website"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Welcome & Overview Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Registrations <span className="text-[var(--color-accent)]">Dashboard</span>
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Live inquiries and trial class bookings from prospective students worldwide.
            </p>
          </div>
          <div className="text-xs text-gray-400 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 self-start sm:self-auto flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[var(--color-sky)]" />
            <span>Updated: Just now</span>
          </div>
        </div>

        {/* Database Migration Warning if applicable */}
        {dataError && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-rose-200">Database Connection Notice</p>
              <p>{dataError}</p>
              <p className="text-gray-400">
                If Row Level Security (RLS) is active without the SELECT policy for authenticated users, please run the SQL migration in Supabase SQL Editor.
              </p>
            </div>
          </div>
        )}

        {/* 4 KPI Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Total Registrations */}
          <div className="bg-gradient-to-br from-[#121c25] to-[#0a1016] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden group hover:border-[var(--color-accent)]/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                Total Registrations
              </span>
              <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent)] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white mt-2.5">
              {stats.total}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
              All time records in database
            </p>
          </div>

          {/* New Inquiries */}
          <div className="bg-gradient-to-br from-[#121c25] to-[#0a1016] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                New Requests
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-blue-400 mt-2.5">
              {stats.newCount}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
              Needs follow-up contact
            </p>
          </div>

          {/* Today's Registrations */}
          <div className="bg-gradient-to-br from-[#121c25] to-[#0a1016] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                Today's Inquiries
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2.5">
              {stats.todayCount}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
              Registered in last 24h
            </p>
          </div>

          {/* This Week */}
          <div className="bg-gradient-to-br from-[#121c25] to-[#0a1016] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                This Week
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-purple-300 mt-2.5">
              {stats.weekCount}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
              Registered in last 7 days
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#0f171f] border border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shadow-md">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, phone, email, country or course..."
              className="w-full bg-[#060a0e] border border-white/10 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all placeholder:text-gray-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Status:</span>
            </div>
            <div className="relative flex-1 sm:w-44">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-[#060a0e] border border-white/10 focus:border-[var(--color-accent)] text-white text-xs rounded-xl pl-3 pr-8 py-2.5 outline-none cursor-pointer"
              >
                <option value="All">All Statuses ({registrations.length})</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Demo Scheduled">Demo Scheduled</option>
                <option value="Enrolled">Enrolled</option>
                <option value="Rejected">Rejected</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Results count pill */}
            <span className="text-[11px] text-gray-400 bg-white/5 border border-white/10 rounded-xl px-2.5 py-2 whitespace-nowrap">
              {filteredRegistrations.length} found
            </span>
          </div>
        </div>

        {/* Registrations List */}
        {loadingData ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 bg-[#0f171f]/50 border border-white/10 rounded-3xl">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)]" />
            <p className="text-gray-400 text-xs uppercase tracking-wider">Loading registrations...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3 bg-[#0f171f]/50 border border-white/10 rounded-3xl px-4">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">No registrations match your criteria</h3>
            <p className="text-gray-400 text-xs max-w-sm">
              {searchTerm || statusFilter !== "All"
                ? "Try clearing your search query or setting the status filter back to 'All'."
                : "No demo class registrations have been submitted yet."}
            </p>
            {(searchTerm || statusFilter !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="mt-2 text-xs text-[var(--color-accent)] hover:underline font-bold"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View (Hidden on Mobile) */}
            <div className="hidden lg:block bg-[#0e161e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#090f14] border-b border-white/10 text-gray-400 uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Student / Guardian</th>
                      <th className="py-3.5 px-4">Contact Info</th>
                      <th className="py-3.5 px-4">Country</th>
                      <th className="py-3.5 px-4">Course</th>
                      <th className="py-3.5 px-4">Class Time</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredRegistrations.map((reg) => {
                      const cleanPhone = reg.phone.replace(/[^0-9]/g, "");
                      const formattedDate = new Date(reg.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });

                      return (
                        <tr
                          key={reg.id}
                          className="hover:bg-white/[0.02] transition-colors group"
                        >
                          {/* Name */}
                          <td className="py-4 px-4 font-bold text-white">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent)] flex items-center justify-center font-bold text-xs shrink-0">
                                {reg.full_name?.charAt(0)?.toUpperCase() || "S"}
                              </div>
                              <span className="truncate max-w-[160px]">{reg.full_name}</span>
                            </div>
                          </td>

                          {/* Contact Info */}
                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-1">
                              <a
                                href={`https://wa.me/${cleanPhone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-gray-300 hover:text-[#25D366] transition-colors"
                              >
                                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                                <span className="font-semibold">{reg.phone}</span>
                              </a>
                              <a
                                href={`mailto:${reg.email}`}
                                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors truncate max-w-[180px]"
                              >
                                <Mail className="w-3.5 h-3.5 text-gray-500" />
                                <span className="truncate">{reg.email}</span>
                              </a>
                            </div>
                          </td>

                          {/* Country */}
                          <td className="py-4 px-4 text-gray-300">
                            <div className="flex items-center gap-1.5">
                              <Globe className="w-3.5 h-3.5 text-gray-500" />
                              <span className="truncate max-w-[120px]">{reg.country}</span>
                            </div>
                          </td>

                          {/* Course */}
                          <td className="py-4 px-4">
                            <span className="px-2 py-1 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent-light)] border border-[var(--color-accent)]/20 font-semibold text-[11px]">
                              {reg.course}
                            </span>
                          </td>

                          {/* Preferred Time */}
                          <td className="py-4 px-4 text-sky-300 font-medium whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-sky-400" />
                              <span>{reg.preferred_time}</span>
                            </div>
                          </td>

                          {/* Date */}
                          <td className="py-4 px-4 text-gray-400 whitespace-nowrap">
                            {formattedDate}
                          </td>

                          {/* Status */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {getStatusBadge(reg.status)}
                              <select
                                value={reg.status || "New"}
                                onChange={(e) =>
                                  handleQuickStatusChange(
                                    reg.id,
                                    e.target.value as RegistrationStatus
                                  )
                                }
                                className="opacity-0 group-hover:opacity-100 bg-[#060a0e] border border-white/10 text-[10px] text-gray-300 rounded-lg px-1.5 py-1 outline-none transition-opacity cursor-pointer"
                              >
                                <option value="New">Set New</option>
                                <option value="Contacted">Set Contacted</option>
                                <option value="Demo Scheduled">Set Demo Scheduled</option>
                                <option value="Enrolled">Set Enrolled</option>
                                <option value="Rejected">Set Rejected</option>
                              </select>
                            </div>
                          </td>

                          {/* Action */}
                          <td className="py-4 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                setSelectedReg(reg);
                                setIsModalOpen(true);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-200 hover:text-white border border-white/10 text-xs font-semibold transition-all hover:scale-105"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Details</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Stacked Card View (Touch-friendly for phones) */}
            <div className="grid grid-cols-1 gap-3.5 lg:hidden">
              {filteredRegistrations.map((reg) => {
                const cleanPhone = reg.phone.replace(/[^0-9]/g, "");
                const formattedDate = new Date(reg.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });

                return (
                  <div
                    key={reg.id}
                    className="bg-gradient-to-b from-[#121c25] to-[#0a1016] border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col gap-3 relative"
                  >
                    {/* Header: Name + Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-black text-white">
                            {reg.full_name}
                          </h3>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                          <Globe className="w-3 h-3 text-gray-500" />
                          <span>{reg.country}</span>
                          <span className="text-gray-600">•</span>
                          <span>{formattedDate}</span>
                        </p>
                      </div>
                      {getStatusBadge(reg.status)}
                    </div>

                    {/* Course & Time tags */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent-light)] border border-[var(--color-accent)]/20 font-semibold text-[11px] flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {reg.course}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/20 font-semibold text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {reg.preferred_time}
                      </span>
                    </div>

                    {/* Contact Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] font-bold"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => {
                          setSelectedReg(reg);
                          setIsModalOpen(true);
                        }}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* Registration Details & Notes Modal */}
      <RegistrationDetailModal
        registration={selectedReg}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReg(null);
        }}
        onUpdate={handleUpdateRegistration}
      />
    </div>
  );
}
