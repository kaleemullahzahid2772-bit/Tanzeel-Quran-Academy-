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
  PhoneCall,
  Mail,
  Globe,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ExternalLink,
  Sun,
  Moon,
  MessageCircle,
  Bell,
  BellRing,
  BellOff,
  Volume2,
  VolumeX,
  X,
  Printer,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { TrialRegistration, RegistrationStatus, DashboardStats } from "@/types/admin";
import RegistrationDetailModal from "@/components/admin/RegistrationDetailModal";
import RegistrationSlipModal from "@/components/admin/RegistrationSlipModal";
import { WhatsAppIcon } from "@/components/FloatingContact";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Theme State (Dark / Light)
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("altanzeel_admin_theme") as "dark" | "light" | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("altanzeel_admin_theme", next);
  };

  const isLight = theme === "light";

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

  // Slip Modal State
  const [selectedSlipReg, setSelectedSlipReg] = useState<TrialRegistration | null>(null);
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false);

  // Mobile Push & Sound Alert State
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | "unsupported">("default");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [newAlertRecord, setNewAlertRecord] = useState<TrialRegistration | null>(null);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [testFeedback, setTestFeedback] = useState<string | null>(null);
  const knownIdsRef = React.useRef<Set<string | number>>(new Set());
  const initialLoadDoneRef = React.useRef(false);

  // Load sound setting, initial notification permission + Register Admin SW and root SW
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("Notification" in window) {
        setNotificationPermission(Notification.permission);
      } else {
        setNotificationPermission("unsupported");
      }
      const savedSound = localStorage.getItem("altanzeel_sound_enabled");
      if (savedSound !== null) {
        setSoundEnabled(savedSound === "true");
      }
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/admin-sw.js", { scope: "/admin/" })
          .catch((err) => console.warn("Admin SW reg error:", err));
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .catch((err) => console.warn("Root SW reg error:", err));
      }
    }
  }, []);

  // Unlock mobile audio on first user touch / click
  useEffect(() => {
    const unlockAudio = () => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          ctx.resume().then(() => ctx.close());
        }
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });
    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  // Web Audio Melodic Chime Generator (Works on Mobile & Desktop without external asset files)
  const playAlertChime = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // Note 1: E5 (659.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Note 2: A5 (880 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(880, now + 0.15);
      gain2.gain.setValueAtTime(0, now + 0.15);
      gain2.gain.linearRampToValueAtTime(0.35, now + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.7);
    } catch (err) {
      console.warn("Audio chime error:", err);
    }
  }, []);

  // Dispatch notification safely via ServiceWorker (Required on mobile Android & iOS) and fallback to window Notification
  const dispatchSystemNotification = useCallback(
    async (title: string, options: any) => {
      if (typeof window === "undefined" || !("Notification" in window)) return;
      if (Notification.permission !== "granted") return;

      const safeOptions = {
        body: options.body || "",
        icon: "/admin-icon-192.png",
        badge: "/admin-icon-192.png",
        tag: options.tag || `trial-reg-${Date.now()}`,
        vibrate: [300, 150, 300, 150, 400],
        requireInteraction: true,
        data: options.data || { url: "/admin/dashboard" },
        ...options,
      };

      let shown = false;

      // 1. Primary for Mobile (Android Chrome & iOS PWA): ServiceWorker showNotification
      if ("serviceWorker" in navigator) {
        try {
          const regs = await navigator.serviceWorker.getRegistrations();
          const activeReg = regs.find((r) => r.active) || regs[0];
          if (activeReg && "showNotification" in activeReg) {
            await activeReg.showNotification(title, safeOptions);
            shown = true;
          } else {
            const timeout = new Promise<null>((res) => setTimeout(() => res(null), 800));
            const readyReg = await Promise.race([navigator.serviceWorker.ready, timeout]);
            if (readyReg && "showNotification" in readyReg) {
              await readyReg.showNotification(title, safeOptions);
              shown = true;
            }
          }
        } catch (swErr) {
          console.warn("SW showNotification error, falling back:", swErr);
        }

        // Also postMessage to any controller
        try {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: "SHOW_NOTIFICATION",
              title,
              options: safeOptions,
            });
          }
        } catch (pmErr) {
          // ignore
        }
      }

      // 2. Fallback to desktop window Notification constructor
      if (!shown) {
        try {
          const n = new Notification(title, safeOptions);
          n.onclick = () => {
            window.focus();
            n.close();
          };
          shown = true;
        } catch (winErr) {
          console.warn("Window Notification constructor error:", winErr);
        }
      }
    },
    []
  );

  // Trigger sound, vibration and system notification
  const triggerNotification = useCallback(
    (reg: TrialRegistration) => {
      // 1. Play chime if sound enabled
      if (soundEnabled) {
        playAlertChime();
      }

      // 2. Physical Mobile Phone Vibration
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate([300, 150, 300, 150, 400]);
        } catch (e) {
          // ignore
        }
      }

      // 3. System Push Notification on Mobile Phone / Desktop
      const title = `🔔 New Registration: ${reg.full_name || "New Student"}`;
      const body = `Course: ${reg.course || "Quran"} | ${reg.country || "Online"} | Phone: ${reg.phone || ""}`;
      dispatchSystemNotification(title, {
        body,
        icon: "/admin-icon-192.png",
        badge: "/admin-icon-192.png",
        tag: `trial-reg-${reg.id}`,
        vibrate: [300, 150, 300, 150, 400],
        data: { url: "/admin/dashboard", id: reg.id },
      });

      // 4. In-App Floating Toast Banner
      setNewAlertRecord(reg);
    },
    [playAlertChime, soundEnabled, dispatchSystemNotification]
  );

  // Handle incoming new registration
  const handleIncomingRegistration = useCallback(
    (newRecord: TrialRegistration) => {
      if (!newRecord?.id) return;
      if (knownIdsRef.current.has(newRecord.id)) return;
      knownIdsRef.current.add(newRecord.id);

      setRegistrations((prev) => [newRecord, ...prev.filter((r) => r.id !== newRecord.id)]);
      triggerNotification(newRecord);
    },
    [triggerNotification]
  );

  // Request Notification Permission
  const requestNotificationPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      alert("Push notifications are not supported in this browser.");
      return;
    }
    try {
      let perm: NotificationPermission = Notification.permission;
      if (perm === "default") {
        const res = Notification.requestPermission();
        if (res && typeof (res as any).then === "function") {
          perm = await res;
        } else {
          perm = await new Promise((resolve) => Notification.requestPermission(resolve));
        }
      }
      setNotificationPermission(perm);
      if (perm === "granted") {
        playAlertChime();
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate([300, 150, 300]);
        }
        await dispatchSystemNotification("🔔 Al Tanzeel Notifications Active!", {
          body: "You will now receive instant sound & vibration alerts on new registrations.",
          icon: "/admin-icon-192.png",
          badge: "/admin-icon-192.png",
          tag: "altanzeel-welcome",
        });
        setTestFeedback("Alerts enabled successfully!");
        setTimeout(() => setTestFeedback(null), 4000);
      }
    } catch (err) {
      console.error("Permission request error:", err);
    }
  };

  const testAlert = async () => {
    playAlertChime();
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([300, 150, 300]);
    }
    await dispatchSystemNotification("🔔 Test Alert: Al Tanzeel Quran Academy", {
      body: "Your notifications, sound, and vibration alerts are active!",
      icon: "/admin-icon-192.png",
      badge: "/admin-icon-192.png",
      tag: "altanzeel-test",
    });
    setTestFeedback("Test alert sent! If not seen in status bar, check Android Settings > Apps > Chrome/Admin > Notifications.");
    setTimeout(() => setTestFeedback(null), 6000);
  };

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
        const list = (data as TrialRegistration[]) || [];
        setRegistrations(list);
        if (!initialLoadDoneRef.current) {
          list.forEach((r) => knownIdsRef.current.add(r.id));
          initialLoadDoneRef.current = true;
        }
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

  // Realtime Supabase listener & Fast Polling fallback
  useEffect(() => {
    if (checkingAuth) return;

    // 1. Supabase Broadcast Channel (Zero configuration instant push across all clients)
    const alertChannel = supabase
      .channel("altanzeel-admin-live-alerts")
      .on("broadcast", { event: "new_registration" }, ({ payload }) => {
        if (payload) {
          handleIncomingRegistration(payload as TrialRegistration);
        }
      })
      .subscribe();

    // 2. Supabase Postgres Realtime channel (Direct DB replication)
    const dbChannel = supabase
      .channel("admin-realtime-trial-registrations")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "trial_class_requests",
        },
        (payload) => {
          if (payload.new) {
            handleIncomingRegistration(payload.new as TrialRegistration);
          }
        }
      )
      .subscribe();

    // 3. Fast Periodic background check every 4 seconds
    const checkLatestRegistrations = async () => {
      try {
        const { data } = await supabase
          .from("trial_class_requests")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        if (data && initialLoadDoneRef.current) {
          data.forEach((item) => {
            if (!knownIdsRef.current.has(item.id)) {
              handleIncomingRegistration(item as TrialRegistration);
            }
          });
        }
      } catch (err) {
        // silent catch
      }
    };

    const interval = setInterval(checkLatestRegistrations, 4000);

    // 4. Instant check when mobile phone screen turns on or user switches tabs
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkLatestRegistrations();
      }
    };
    window.addEventListener("focus", checkLatestRegistrations);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      supabase.removeChannel(alertChannel);
      supabase.removeChannel(dbChannel);
      clearInterval(interval);
      window.removeEventListener("focus", checkLatestRegistrations);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkingAuth, handleIncomingRegistration]);

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
        r.course?.toLowerCase().includes(q) ||
        r.age?.toLowerCase().includes(q) ||
        r.gender?.toLowerCase().includes(q);

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
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
            isLight ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-blue-500/15 text-blue-400 border-blue-500/30"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-blue-600" : "bg-blue-400"} animate-pulse`} />
            New
          </span>
        );
      case "contacted":
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
            isLight ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-amber-500/15 text-amber-400 border-amber-500/30"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-amber-600" : "bg-amber-400"}`} />
            Contacted
          </span>
        );
      case "demo scheduled":
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
            isLight ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-purple-500/15 text-purple-300 border-purple-500/30"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-purple-600" : "bg-purple-400"}`} />
            Demo Scheduled
          </span>
        );
      case "enrolled":
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
            isLight ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
          }`}>
            <CheckCircle2 className={`w-3 h-3 ${isLight ? "text-emerald-600" : "text-emerald-400"}`} />
            Enrolled
          </span>
        );
      case "rejected":
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
            isLight ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-rose-500/15 text-rose-400 border-rose-500/30"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-rose-600" : "bg-rose-400"}`} />
            Rejected
          </span>
        );
      default:
        return (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${
            isLight ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-gray-500/20 text-gray-300 border-gray-500/30"
          }`}>
            {status || "New"}
          </span>
        );
    }
  };

  if (checkingAuth) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center ${isLight ? "bg-slate-100" : "bg-[#070c11]"}`}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)]" />
          <p className={`${isLight ? "text-slate-500" : "text-gray-400"} text-xs tracking-wider uppercase font-semibold`}>Verifying Authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full flex flex-col transition-colors duration-200 ${
      isLight ? "bg-[#f8fafc] text-slate-800" : "bg-[#070c11] text-white"
    }`}>
      {/* Top Navbar */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b px-3 sm:px-8 py-3 flex items-center justify-between transition-colors ${
        isLight ? "bg-white/95 border-slate-200 shadow-sm" : "bg-[#0a1015]/95 border-white/10"
      }`}>
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className={`relative h-9 sm:h-10 px-2 sm:px-2.5 rounded-xl overflow-hidden border flex items-center justify-center shadow-inner ${
            isLight ? "border-slate-200 bg-slate-50" : "border-white/15 bg-black/60"
          }`}>
            <img
              src="/tanzeel-top-logo.png"
              alt="Al Tanzeel Quran Academy Logo"
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`font-black text-sm sm:text-base tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                Al Tanzeel <span className="text-[var(--color-accent)]">Admin</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] text-[10px] font-bold border border-[var(--color-accent)]/30">
                <ShieldCheck className="w-3 h-3" />
                Portal
              </span>
            </div>
            <p className={`text-[10px] hidden sm:block ${isLight ? "text-slate-400" : "text-gray-400"}`}>
              User: <span className={`font-semibold ${isLight ? "text-slate-700" : "text-gray-300"}`}>{userEmail}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Mobile / Browser Alerts Toggle & Status */}
          <div className="relative">
            <button
              onClick={() => {
                if (notificationPermission !== "granted") {
                  requestNotificationPermission();
                } else {
                  setShowNotificationMenu((prev) => !prev);
                }
              }}
              title={
                notificationPermission === "granted"
                  ? "Alerts Active (Click for Alert Options)"
                  : "Tap to Enable Mobile Registration Alerts"
              }
              aria-label="Notification Alerts"
              className={`p-2 sm:px-3 sm:py-2 flex items-center gap-1.5 rounded-xl border text-xs font-bold transition-all relative ${
                notificationPermission === "granted"
                  ? isLight
                    ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300"
                    : "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border-emerald-500/30"
                  : notificationPermission === "denied"
                  ? isLight
                    ? "bg-rose-50 text-rose-600 border-rose-200"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  : isLight
                  ? "bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-300 animate-pulse"
                  : "bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border-amber-500/30 animate-pulse"
              }`}
            >
              {notificationPermission === "granted" ? (
                <>
                  <BellRing className="w-4 h-4 text-emerald-500" />
                  <span className="hidden lg:inline font-semibold">Alerts On</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute top-1 right-1" />
                </>
              ) : notificationPermission === "denied" ? (
                <>
                  <BellOff className="w-4 h-4 text-rose-500" />
                  <span className="hidden lg:inline text-rose-500 font-semibold">Alerts Blocked</span>
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4 text-amber-500" />
                  <span className="hidden lg:inline font-bold">Enable Alerts</span>
                </>
              )}
            </button>

            {/* Dropdown Menu when clicked if granted */}
            {showNotificationMenu && (
              <div
                className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border p-3 z-50 animate-fade-in ${
                  isLight
                    ? "bg-white text-slate-800 border-slate-200"
                    : "bg-[#18232c] text-white border-white/15"
                }`}
              >
                <div className="flex items-center justify-between border-b pb-2 mb-2 border-inherit">
                  <span className="text-xs font-bold">Notification Settings</span>
                  <button
                    onClick={() => setShowNotificationMenu(false)}
                    className="p-1 rounded hover:opacity-70 text-gray-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <button
                    onClick={() => {
                      const next = !soundEnabled;
                      setSoundEnabled(next);
                      localStorage.setItem("altanzeel_sound_enabled", String(next));
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl border transition ${
                      isLight ? "bg-slate-50 border-slate-200 hover:bg-slate-100" : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {soundEnabled ? (
                        <Volume2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-gray-400" />
                      )}
                      <span>Sound Alert</span>
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${soundEnabled ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-500/20 text-gray-400"}`}>
                      {soundEnabled ? "ON" : "OFF"}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      testAlert();
                      setShowNotificationMenu(false);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 p-2 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold transition shadow"
                  >
                    <BellRing className="w-3.5 h-3.5" />
                    <span>Send Test Alert</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Dark / Light) */}
          <button
            onClick={toggleTheme}
            title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label="Toggle Theme"
            className={`p-2 sm:px-3 sm:py-2 flex items-center gap-1.5 rounded-xl border text-xs font-bold transition-all ${
              isLight
                ? "bg-slate-100 hover:bg-slate-200 text-amber-700 border-slate-300"
                : "bg-white/5 hover:bg-white/10 text-amber-400 border-white/10"
            }`}
          >
            {isLight ? (
              <>
                <Moon className="w-4 h-4 text-slate-700" />
                <span className="hidden md:inline text-slate-700 font-medium">Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline text-amber-300 font-medium">Light Mode</span>
              </>
            )}
          </button>

          {/* Refresh button */}
          <button
            onClick={fetchRegistrations}
            disabled={loadingData}
            title="Refresh Registrations"
            className={`p-2 sm:p-2.5 rounded-xl border transition-all disabled:opacity-50 ${
              isLight
                ? "text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-300"
                : "text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border-white/10"
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin text-[var(--color-accent)]" : ""}`} />
          </button>

          {/* View Public Website */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Public Website"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
              isLight
                ? "text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-300"
                : "text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border-white/10"
            }`}
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-xs font-bold text-rose-500 hover:text-rose-600 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 relative">
        {/* Real-time Floating Toast for Incoming Registration */}
        {newAlertRecord && (
          <div className="fixed top-4 left-4 right-4 md:left-auto md:right-8 z-50 max-w-md bg-gradient-to-r from-amber-600 via-[var(--color-accent)] to-amber-700 text-white p-4 rounded-2xl shadow-2xl border border-white/20 animate-fade-in flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-black/30 rounded-xl shrink-0">
                <BellRing className="w-5 h-5 text-amber-200 animate-pulse" />
              </div>
              <div className="min-w-0 text-xs">
                <p className="font-extrabold text-sm truncate">New Registration Received!</p>
                <p className="opacity-95 truncate font-medium">{newAlertRecord.full_name} • {newAlertRecord.course}</p>
                <p className="text-[11px] opacity-80">{newAlertRecord.country} • {newAlertRecord.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  setSelectedReg(newAlertRecord);
                  setIsModalOpen(true);
                  setNewAlertRecord(null);
                }}
                className="px-3 py-1.5 bg-white text-slate-900 font-bold rounded-lg text-xs hover:bg-slate-100 transition shadow cursor-pointer"
              >
                View
              </button>
              <button
                onClick={() => setNewAlertRecord(null)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Feedback / Alert Status Toast */}
        {testFeedback && (
          <div className="fixed top-20 left-4 right-4 md:left-auto md:right-8 z-50 max-w-md bg-slate-900/95 text-white p-3.5 rounded-2xl shadow-2xl border border-emerald-500/40 animate-fade-in flex items-center justify-between gap-3 backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-xs min-w-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="font-medium text-[12px]">{testFeedback}</p>
            </div>
            <button
              onClick={() => setTestFeedback(null)}
              className="p-1 hover:bg-white/10 rounded-lg text-white/70 hover:text-white shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Welcome & Overview Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className={`text-xl sm:text-3xl font-black tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
              Registrations <span className="text-[var(--color-accent)]">Dashboard</span>
            </h1>
            <p className={`text-xs sm:text-sm mt-0.5 ${isLight ? "text-slate-500" : "text-gray-400"}`}>
              Live student trial class inquiries and enrollment management.
            </p>
          </div>
          <div className={`text-xs rounded-xl px-3 py-1.5 self-start sm:self-auto flex items-center gap-2 border ${
            isLight ? "bg-white text-slate-600 border-slate-200 shadow-sm" : "bg-white/5 text-gray-400 border-white/10"
          }`}>
            <Clock className="w-3.5 h-3.5 text-[var(--color-sky)]" />
            <span>Updated: Just now</span>
          </div>
        </div>

        {/* Enable Notifications Callout Banner */}
        {notificationPermission !== "granted" && notificationPermission !== "unsupported" && (
          <div className={`rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border shadow-sm ${
            isLight ? "bg-amber-50 border-amber-200 text-amber-950" : "bg-amber-500/10 border-amber-500/30 text-amber-200"
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-500 shrink-0">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-sm">Enable Mobile &amp; Desktop Registration Alerts</p>
                <p className="opacity-90">
                  Tap to get instant sound, vibration, and push notifications on your phone whenever a student submits a registration!
                </p>
              </div>
            </div>
            <button
              onClick={requestNotificationPermission}
              className="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded-xl text-xs transition shadow-md shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <BellRing className="w-4 h-4" />
              <span>Turn On Alerts</span>
            </button>
          </div>
        )}

        {/* Database Migration Warning if applicable */}
        {dataError && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-rose-700 dark:text-rose-200">Database Connection Notice</p>
              <p>{dataError}</p>
              <p className={isLight ? "text-slate-500" : "text-gray-400"}>
                If Row Level Security (RLS) is active without the SELECT policy for authenticated users, please run the SQL migration in Supabase SQL Editor.
              </p>
            </div>
          </div>
        )}

        {/* 4 KPI Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {/* Total Registrations */}
          <div className={`border rounded-2xl p-3 sm:p-5 relative overflow-hidden group hover:border-[var(--color-accent)]/50 transition-all ${
            isLight
              ? "bg-white border-slate-200 shadow-sm"
              : "bg-gradient-to-br from-[#121c25] to-[#0a1016] border-white/10 shadow-lg"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isLight ? "text-slate-500" : "text-gray-400"}`}>
                Total Records
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent)] flex items-center justify-center">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className={`text-xl sm:text-3xl font-black mt-2 sm:mt-2.5 ${isLight ? "text-slate-900" : "text-white"}`}>
              {stats.total}
            </p>
            <p className={`text-[9px] sm:text-xs mt-0.5 truncate ${isLight ? "text-slate-400" : "text-gray-400"}`}>
              All time records
            </p>
          </div>

          {/* New Inquiries */}
          <div className={`border rounded-2xl p-3 sm:p-5 relative overflow-hidden group hover:border-blue-500/50 transition-all ${
            isLight
              ? "bg-white border-slate-200 shadow-sm"
              : "bg-gradient-to-br from-[#121c25] to-[#0a1016] border-white/10 shadow-lg"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isLight ? "text-slate-500" : "text-gray-400"}`}>
                New Requests
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-500 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className="text-xl sm:text-3xl font-black text-blue-500 mt-2 sm:mt-2.5">
              {stats.newCount}
            </p>
            <p className={`text-[9px] sm:text-xs mt-0.5 truncate ${isLight ? "text-slate-400" : "text-gray-400"}`}>
              Needs follow-up
            </p>
          </div>

          {/* Today's Registrations */}
          <div className={`border rounded-2xl p-3 sm:p-5 relative overflow-hidden group hover:border-emerald-500/50 transition-all ${
            isLight
              ? "bg-white border-slate-200 shadow-sm"
              : "bg-gradient-to-br from-[#121c25] to-[#0a1016] border-white/10 shadow-lg"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isLight ? "text-slate-500" : "text-gray-400"}`}>
                Today's
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className="text-xl sm:text-3xl font-black text-emerald-500 mt-2 sm:mt-2.5">
              {stats.todayCount}
            </p>
            <p className={`text-[9px] sm:text-xs mt-0.5 truncate ${isLight ? "text-slate-400" : "text-gray-400"}`}>
              Registered in 24h
            </p>
          </div>

          {/* This Week */}
          <div className={`border rounded-2xl p-3 sm:p-5 relative overflow-hidden group hover:border-purple-500/50 transition-all ${
            isLight
              ? "bg-white border-slate-200 shadow-sm"
              : "bg-gradient-to-br from-[#121c25] to-[#0a1016] border-white/10 shadow-lg"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isLight ? "text-slate-500" : "text-gray-400"}`}>
                This Week
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-500 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className="text-xl sm:text-3xl font-black text-purple-500 mt-2 sm:mt-2.5">
              {stats.weekCount}
            </p>
            <p className={`text-[9px] sm:text-xs mt-0.5 truncate ${isLight ? "text-slate-400" : "text-gray-400"}`}>
              Last 7 days
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className={`border rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row gap-2.5 sm:gap-3 items-stretch md:items-center justify-between transition-colors ${
          isLight ? "bg-white border-slate-200 shadow-sm" : "bg-[#0f171f] border-white/10 shadow-md"
        }`}>
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? "text-slate-400" : "text-gray-400"}`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, phone, email, country or course..."
              className={`w-full text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all border focus:ring-1 focus:ring-[var(--color-accent)] ${
                isLight
                  ? "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[var(--color-accent)]"
                  : "bg-[#060a0e] border-white/10 text-white placeholder:text-gray-500 focus:border-[var(--color-accent)]"
              }`}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 text-xs shrink-0 ${isLight ? "text-slate-500" : "text-gray-400"}`}>
              <Filter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Status:</span>
            </div>
            <div className="relative flex-1 sm:w-44">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`w-full appearance-none text-xs rounded-xl pl-3 pr-8 py-2.5 outline-none cursor-pointer border ${
                  isLight
                    ? "bg-slate-50 border-slate-300 text-slate-800 focus:bg-white"
                    : "bg-[#060a0e] border-white/10 text-white"
                }`}
              >
                <option value="All">All Statuses ({registrations.length})</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Demo Scheduled">Demo Scheduled</option>
                <option value="Enrolled">Enrolled</option>
                <option value="Rejected">Rejected</option>
              </select>
              <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
                isLight ? "text-slate-500" : "text-gray-400"
              }`} />
            </div>

            {/* Results count pill */}
            <span className={`text-[11px] rounded-xl px-2.5 py-2 whitespace-nowrap border ${
              isLight ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-white/5 text-gray-400 border-white/10"
            }`}>
              {filteredRegistrations.length} found
            </span>
          </div>
        </div>

        {/* Registrations List */}
        {loadingData ? (
          <div className={`py-20 flex flex-col items-center justify-center gap-3 border rounded-3xl ${
            isLight ? "bg-white border-slate-200" : "bg-[#0f171f]/50 border-white/10"
          }`}>
            <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)]" />
            <p className={`text-xs uppercase tracking-wider ${isLight ? "text-slate-500" : "text-gray-400"}`}>
              Loading registrations...
            </p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className={`py-20 text-center flex flex-col items-center justify-center gap-3 border rounded-3xl px-4 ${
            isLight ? "bg-white border-slate-200" : "bg-[#0f171f]/50 border-white/10"
          }`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
              isLight ? "bg-slate-100 border-slate-200 text-slate-400" : "bg-white/5 border-white/10 text-gray-400"
            }`}>
              <Users className="w-6 h-6" />
            </div>
            <h3 className={`text-base font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
              No registrations match your criteria
            </h3>
            <p className={`text-xs max-w-sm ${isLight ? "text-slate-500" : "text-gray-400"}`}>
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
            <div className={`hidden lg:block border rounded-3xl overflow-hidden shadow-xl ${
              isLight ? "bg-white border-slate-200" : "bg-[#0e161e] border-white/10 shadow-2xl"
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className={`border-b uppercase text-[10px] font-bold tracking-wider ${
                    isLight ? "bg-slate-100/80 border-slate-200 text-slate-600" : "bg-[#090f14] border-white/10 text-gray-400"
                  }`}>
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
                  <tbody className={`divide-y ${isLight ? "divide-slate-100" : "divide-white/5"}`}>
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
                          className={`transition-colors group ${
                            isLight ? "hover:bg-slate-50/80" : "hover:bg-white/[0.02]"
                          }`}
                        >
                          {/* Name */}
                          <td className="py-4 px-4 font-bold">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent)] flex items-center justify-center font-bold text-xs shrink-0">
                                {reg.full_name?.charAt(0)?.toUpperCase() || "S"}
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className={`truncate max-w-[160px] ${isLight ? "text-slate-900" : "text-white"}`}>
                                  {reg.full_name}
                                </span>
                                {(reg.gender || reg.age) && (
                                  <span className={`text-[10px] font-normal truncate max-w-[160px] ${
                                    isLight ? "text-slate-500" : "text-gray-400"
                                  }`}>
                                    {reg.gender}{reg.gender && reg.age ? " • " : ""}{reg.age ? `Age: ${reg.age}` : ""}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Contact Info */}
                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-1">
                              <a
                                href={`https://wa.me/${cleanPhone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 transition-colors"
                              >
                                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                                <span className="font-semibold">{reg.phone}</span>
                              </a>
                              <a
                                href={`mailto:${reg.email}`}
                                className={`inline-flex items-center gap-1.5 transition-colors truncate max-w-[180px] ${
                                  isLight ? "text-slate-500 hover:text-slate-900" : "text-gray-400 hover:text-white"
                                }`}
                              >
                                <Mail className={`w-3.5 h-3.5 ${isLight ? "text-slate-400" : "text-gray-500"}`} />
                                <span className="truncate">{reg.email}</span>
                              </a>
                            </div>
                          </td>

                          {/* Country */}
                          <td className="py-4 px-4">
                            <div className={`flex items-center gap-1.5 ${isLight ? "text-slate-700" : "text-gray-300"}`}>
                              <Globe className={`w-3.5 h-3.5 ${isLight ? "text-slate-400" : "text-gray-500"}`} />
                              <span className="truncate max-w-[120px]">{reg.country}</span>
                            </div>
                          </td>

                          {/* Course */}
                          <td className="py-4 px-4">
                            <span className="px-2 py-1 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 font-semibold text-[11px]">
                              {reg.course}
                            </span>
                          </td>

                          {/* Preferred Time */}
                          <td className="py-4 px-4 font-medium whitespace-nowrap">
                            <div className={`flex items-center gap-1 ${isLight ? "text-sky-700" : "text-sky-300"}`}>
                              <Clock className="w-3 h-3 text-sky-500" />
                              <span>{reg.preferred_time}</span>
                            </div>
                          </td>

                          {/* Date */}
                          <td className={`py-4 px-4 whitespace-nowrap ${isLight ? "text-slate-500" : "text-gray-400"}`}>
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
                                className={`opacity-0 group-hover:opacity-100 border text-[10px] rounded-lg px-1.5 py-1 outline-none transition-opacity cursor-pointer ${
                                  isLight
                                    ? "bg-slate-100 border-slate-300 text-slate-700"
                                    : "bg-[#060a0e] border-white/10 text-gray-300"
                                }`}
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
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedSlipReg(reg);
                                  setIsSlipModalOpen(true);
                                }}
                                title="View & Download Official Slip (PDF / PNG)"
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all hover:scale-105 cursor-pointer ${
                                  isLight
                                    ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200"
                                    : "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30"
                                }`}
                              >
                                <Printer className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                                <span>Slip</span>
                              </button>

                              <button
                                onClick={() => {
                                  setSelectedReg(reg);
                                  setIsModalOpen(true);
                                }}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all hover:scale-105 cursor-pointer ${
                                  isLight
                                    ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
                                    : "bg-white/5 hover:bg-white/15 text-gray-200 hover:text-white border-white/10"
                                }`}
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Details</span>
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

            {/* Mobile Stacked Card View (Enhanced & Highly Responsive for Smart Phones) */}
            <div className="grid grid-cols-1 gap-3.5 lg:hidden">
              {filteredRegistrations.map((reg) => {
                const cleanPhone = reg.phone.replace(/[^0-9]/g, "");
                const formattedDate = new Date(reg.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <div
                    key={reg.id}
                    className={`border rounded-2xl p-4 shadow-sm flex flex-col gap-3 relative transition-all ${
                      isLight
                        ? "bg-white border-slate-200 text-slate-800"
                        : "bg-gradient-to-b from-[#121c25] to-[#0a1016] border-white/10 text-white shadow-lg"
                    }`}
                  >
                    {/* Header: Student Name + Country & Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent)] flex items-center justify-center font-bold text-sm shrink-0">
                          {reg.full_name?.charAt(0)?.toUpperCase() || "S"}
                        </div>
                        <div className="min-w-0">
                          <h3 className={`text-sm sm:text-base font-black truncate ${isLight ? "text-slate-900" : "text-white"}`}>
                            {reg.full_name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[11px] flex-wrap mt-0.5">
                            <span className={`flex items-center gap-1 ${isLight ? "text-slate-500" : "text-gray-400"}`}>
                              <Globe className="w-3 h-3 text-gray-400 shrink-0" />
                              <span className="font-medium">{reg.country}</span>
                            </span>
                            {(reg.gender || reg.age) && (
                              <>
                                <span className={isLight ? "text-slate-300" : "text-gray-600"}>•</span>
                                <span className={`font-semibold ${isLight ? "text-amber-700" : "text-amber-300"}`}>
                                  {reg.gender}{reg.gender && reg.age ? ", " : ""}{reg.age ? `Age: ${reg.age}` : ""}
                                </span>
                              </>
                            )}
                            <span className={isLight ? "text-slate-300" : "text-gray-600"}>•</span>
                            <span className={isLight ? "text-slate-400" : "text-gray-500"}>{formattedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0">
                        {getStatusBadge(reg.status)}
                      </div>
                    </div>

                    {/* Course & Time Badges */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 font-bold text-[11px] flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3" />
                        <span>{reg.course}</span>
                      </span>
                      <span className={`px-2.5 py-1 rounded-lg border font-semibold text-[11px] flex items-center gap-1.5 ${
                        isLight ? "bg-sky-50 text-sky-700 border-sky-200" : "bg-sky-500/10 text-sky-300 border-sky-500/20"
                      }`}>
                        <Clock className="w-3 h-3 text-sky-500" />
                        <span>{reg.preferred_time}</span>
                      </span>
                    </div>

                    {/* Student Message Preview (If any) */}
                    {reg.message && (
                      <div className={`p-2.5 rounded-xl border text-xs ${
                        isLight
                          ? "bg-amber-50/70 border-amber-200/80 text-amber-900"
                          : "bg-amber-500/10 border-amber-500/20 text-gray-300"
                      }`}>
                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider mb-0.5 text-amber-600 dark:text-amber-400">
                          <MessageCircle className="w-3 h-3 shrink-0" />
                          <span>Student Note</span>
                        </div>
                        <p className="line-clamp-2 text-[11px] font-medium leading-relaxed">{reg.message}</p>
                      </div>
                    )}

                    {/* Admin Internal Notes (If any recorded) */}
                    {reg.notes && (
                      <div className={`p-2.5 rounded-xl border text-xs ${
                        isLight
                          ? "bg-blue-50/70 border-blue-200/80 text-blue-950"
                          : "bg-blue-500/10 border-blue-500/20 text-blue-200"
                      }`}>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5 text-blue-600 dark:text-blue-400">
                          Admin Follow-up Note:
                        </p>
                        <p className="line-clamp-2 text-[11px] font-medium leading-relaxed">{reg.notes}</p>
                      </div>
                    )}

                    {/* Mobile Quick Status Selector */}
                    <div className={`flex items-center justify-between gap-2 p-2 rounded-xl border ${
                      isLight ? "bg-slate-50 border-slate-200" : "bg-black/40 border-white/10"
                    }`}>
                      <span className={`text-[11px] font-bold ${isLight ? "text-slate-500" : "text-gray-400"}`}>
                        Quick Status Change:
                      </span>
                      <select
                        value={reg.status || "New"}
                        onChange={(e) =>
                          handleQuickStatusChange(
                            reg.id,
                            e.target.value as RegistrationStatus
                          )
                        }
                        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 outline-none cursor-pointer border ${
                          isLight
                            ? "bg-white border-slate-300 text-slate-800 shadow-sm"
                            : "bg-[#060a0e] border-white/15 text-white"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Demo Scheduled">Demo Scheduled</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    {/* Action Buttons Row (WhatsApp, Call, Slip, Details) */}
                    <div className="grid grid-cols-4 gap-1.5 pt-1 border-t border-white/10 dark:border-white/10 border-slate-200">
                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] font-bold text-xs active:scale-95 transition-transform"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">WA</span>
                      </a>

                      <a
                        href={`tel:${reg.phone}`}
                        className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl border font-bold text-xs active:scale-95 transition-transform ${
                          isLight
                            ? "bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200"
                            : "bg-sky-500/15 hover:bg-sky-500/25 border-sky-500/30 text-sky-400"
                        }`}
                      >
                        <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Call</span>
                      </a>

                      <button
                        onClick={() => {
                          setSelectedSlipReg(reg);
                          setIsSlipModalOpen(true);
                        }}
                        title="View & Download Official Slip (PDF / PNG)"
                        className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl border font-bold text-xs active:scale-95 transition-transform cursor-pointer ${
                          isLight
                            ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/30 text-amber-300"
                        }`}
                      >
                        <Printer className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
                        <span className="truncate">Slip</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedReg(reg);
                          setIsModalOpen(true);
                        }}
                        className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl border font-bold text-xs active:scale-95 transition-transform cursor-pointer ${
                          isLight
                            ? "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
                            : "bg-white/10 hover:bg-white/20 border-white/15 text-white"
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Details</span>
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
        theme={theme}
      />

      {/* Official Registration Slip Preview & Download Modal */}
      <RegistrationSlipModal
        registration={selectedSlipReg}
        isOpen={isSlipModalOpen}
        onClose={() => {
          setIsSlipModalOpen(false);
          setSelectedSlipReg(null);
        }}
        theme={theme}
      />
    </div>
  );
}
