import type { Metadata, Viewport } from "next";
import AdminPwaInstaller from "@/components/admin/AdminPwaInstaller";

export const viewport: Viewport = {
  themeColor: "#070c11",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Al Tanzeel Admin Portal",
  description: "Secure Management Portal for Al Tanzeel Quran Academy",
  manifest: "/admin-manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Tanzeel Admin",
  },
  icons: {
    icon: "/admin-icon-192.png",
    apple: "/admin-icon-192.png",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070c11] text-white flex flex-col antialiased">
      {children}
      <AdminPwaInstaller />
    </div>
  );
}
