"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AdminRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          router.replace("/admin/dashboard");
        } else {
          router.replace("/admin/login");
        }
      } catch {
        router.replace("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#070c11] text-white">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)]" />
        <p className="text-gray-400 text-xs tracking-wider uppercase">Loading Admin Portal...</p>
      </div>
    </div>
  );
}
