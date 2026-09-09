"use client";

import React, { useState, useEffect } from "react";
import { Download, Sparkles, X } from "lucide-react";

export default function AdminPwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Register Admin Service Worker scoped only to /admin/
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/admin-sw.js", { scope: "/admin/" })
        .then((reg) => {
          console.log("Admin ServiceWorker registered successfully:", reg.scope);
        })
        .catch((err) => {
          console.error("Admin ServiceWorker registration failed:", err);
        });
    }

    // 2. Check if already running in standalone mode (installed app)
    const checkStandalone = () => {
      const isDisplayStandalone = window.matchMedia("(display-mode: standalone)").matches;
      const isNavigatorStandalone = (window.navigator as any).standalone === true;
      return isDisplayStandalone || isNavigatorStandalone;
    };

    if (checkStandalone()) {
      setIsStandalone(true);
      return;
    }

    // 3. Listen for Chrome / Android beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 4. Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log("Tanzeel Admin PWA was successfully installed.");
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  // Do not show if already standalone, dismissed, or prompt not ready
  if (isStandalone || isDismissed || !isInstallable) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-50 animate-fade-in max-w-sm">
      <div className="bg-gradient-to-r from-[#141f2a] to-[#0a1218] border border-[var(--color-accent)]/40 rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center justify-between gap-3.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/40 text-[var(--color-accent)] flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <p className="text-white text-xs font-black flex items-center gap-1.5">
              <span>Install Admin App</span>
              <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
            </p>
            <p className="text-gray-400 text-[10px]">
              Add to home screen for quick mobile access
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[11px] font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            Install
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
