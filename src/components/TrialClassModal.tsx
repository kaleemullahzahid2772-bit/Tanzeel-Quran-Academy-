"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
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
  Calendar,
  UserCheck,
  MessageSquare,
  ChevronDown,
  Download,
  Printer,
  Copy,
  Check,
  Globe,
  FileText,
  Image as ImageIcon,
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
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [registeredAt, setRegisteredAt] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [downloadingImage, setDownloadingImage] = useState(false);
  const slipCardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    country: "Maldives",
    course: "Quranic Qaidah",
    preferredTime: "06:00 PM",
    message: "",
    agreed: false,
  });

  if (!isOpen) return null;

  const handleModalClose = () => {
    if (submitted) {
      setSubmitted(false);
      setSubmittedData(null);
      setRegistrationNumber("");
      setDownloadingImage(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        country: "Maldives",
        course: "Quranic Qaidah",
        preferredTime: "06:00 PM",
        message: "",
        agreed: false,
      });
    }
    onClose();
  };

  const handleCopyRegNumber = () => {
    if (!registrationNumber) return;
    navigator.clipboard.writeText(registrationNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintSlip = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const sName = submittedData?.name || formData.name;
    const sGender = submittedData?.gender || formData.gender;
    const sAge = submittedData?.age || formData.age;
    const sCountry = submittedData?.country || formData.country;
    const sPhone = submittedData?.phone || formData.phone;
    const sEmail = submittedData?.email || formData.email;
    const sCourse = submittedData?.course || formData.course;
    const sTime = submittedData?.preferredTime || formData.preferredTime;
    const sMsg = submittedData?.message || formData.message;

    const origin = typeof window !== "undefined" ? window.location.origin : "https://www.altanzeelquranacademy.com";
    const logoUrl = `${origin}/tanzeel-logo.png`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Al Tanzeel Registration Slip - ${registrationNumber}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
          body {
            padding: 30px 20px;
            color: #0f172a;
            background: #f8fafc;
            margin: 0;
            line-height: 1.5;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .slip-card {
            position: relative;
            max-width: 650px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 36px 32px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          }
          /* Center Watermark with subtle transparency */
          .watermark-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 0;
            user-select: none;
            opacity: 0.085;
          }
          .watermark-img {
            width: 240px;
            height: 240px;
            object-fit: contain;
            display: block;
          }
          .slip-content {
            position: relative;
            z-index: 1;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 20px;
            margin-bottom: 22px;
          }
          .top-logo {
            width: 80px;
            height: 80px;
            object-fit: contain;
            margin: 0 auto 10px auto;
            display: block;
          }
          .logo-title {
            font-size: 24px;
            font-weight: 900;
            color: #fa841e;
            letter-spacing: -0.5px;
            margin: 0;
          }
          .sublogo {
            font-size: 13px;
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 4px;
          }
          .badge {
            display: inline-block;
            background: #ecfdf5;
            border: 1px solid #10b981;
            color: #047857;
            font-weight: 700;
            font-size: 11px;
            padding: 4px 14px;
            border-radius: 9999px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 10px;
          }
          .reg-box {
            background: #f8fafc;
            border: 2px dashed #cbd5e1;
            border-radius: 12px;
            padding: 14px 20px;
            text-align: center;
            margin-bottom: 22px;
          }
          .reg-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            color: #64748b;
            letter-spacing: 1.5px;
          }
          .reg-num {
            font-size: 24px;
            font-weight: 900;
            color: #fa841e;
            letter-spacing: 2px;
            margin-top: 4px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 22px;
            font-size: 13px;
          }
          th, td {
            padding: 10px 12px;
            border-bottom: 1px solid #e2e8f0;
            text-align: left;
          }
          th {
            width: 38%;
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
          }
          td {
            font-weight: 700;
            color: #0f172a;
          }
          .footer {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 16px;
            border-radius: 12px;
            font-size: 12px;
            color: #475569;
            line-height: 1.6;
          }
          .note-title {
            font-weight: bold;
            color: #0f172a;
            margin-bottom: 4px;
          }
          @media print {
            body { padding: 0; background: #ffffff; }
            .slip-card { border: none; box-shadow: none; padding: 12px 4px; }
            .watermark-container { opacity: 0.09; }
          }
        </style>
      </head>
      <body>
        <div class="slip-card">
          <!-- Center Middle Watermark Logo -->
          <div class="watermark-container">
            <img src="${logoUrl}" alt="Al Tanzeel Watermark" class="watermark-img" />
          </div>

          <div class="slip-content">
            <div class="header">
              <!-- Top Tanzeel Logo -->
              <img src="${logoUrl}" alt="Al Tanzeel Quran Academy" class="top-logo" />
              <h1 class="logo-title">Al Tanzeel Quran Academy</h1>
              <div class="sublogo">Online Quran & Islamic Studies Worldwide</div>
              <div class="badge">Official Free Trial Class Confirmation Slip</div>
            </div>

            <div class="reg-box">
              <div class="reg-label">Official Registration Number</div>
              <div class="reg-num">${registrationNumber}</div>
            </div>

            <table>
              <tr><th>Student Name</th><td>${sName}</td></tr>
              <tr><th>Gender</th><td>${sGender}</td></tr>
              <tr><th>Student Age</th><td>${sAge}</td></tr>
              <tr><th>Country</th><td>${sCountry}</td></tr>
              <tr><th>WhatsApp / Phone</th><td>${sPhone}</td></tr>
              <tr><th>Email Address</th><td>${sEmail}</td></tr>
              <tr><th>Course Selected</th><td>${sCourse}</td></tr>
              <tr><th>Preferred Time</th><td>${sTime}</td></tr>
              ${sMsg ? `<tr><th>Additional Note</th><td>${sMsg}</td></tr>` : ''}
              <tr><th>Registered On</th><td>${registeredAt || new Date().toLocaleString()}</td></tr>
              <tr><th>Status</th><td><span style="color:#047857;font-weight:bold;">Confirmed (Teacher Assignment in Progress)</span></td></tr>
            </table>

            <div class="footer">
              <div class="note-title">Next Steps & Teacher Assignment:</div>
              Our academic coordinator will reach out to you via WhatsApp or Email within <strong>2 to 4 hours</strong> to introduce your certified teacher (Male/Female tutor according to your preference) and schedule your 1-on-1 live trial class.
              <br /><br />
              <strong>Official Support:</strong> info@altanzeelquranacademy.com | WhatsApp: +92 327 4816872 | https://www.altanzeelquranacademy.com
            </div>
          </div>
        </div>

        <script>
          window.addEventListener('load', function() {
            setTimeout(function() {
              window.print();
            }, 350);
          });
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 450);
  };

  const handleDownloadImageSlip = async () => {
    if (downloadingImage || !slipCardRef.current) return;
    setDownloadingImage(true);

    try {
      // Ensure element styles and images are fully settled
      await new Promise((resolve) => setTimeout(resolve, 150));

      const canvas = await html2canvas(slipCardRef.current, {
        scale: 2.5, // Ultra sharp high resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `AlTanzeel-Registration-${registrationNumber || "Slip"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Canvas image generation error:", err);
    } finally {
      setDownloadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.age.trim() ||
      !formData.gender.trim() ||
      !formData.country.trim()
    ) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    if (!formData.agreed) {
      setErrorMsg("Please agree to attend the free trial class at the scheduled time.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const payload: Record<string, any> = {
        full_name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        age: formData.age.trim(),
        gender: formData.gender.trim(),
        country: formData.country.trim(),
        course: formData.course.trim(),
        preferred_time: formData.preferredTime.trim(),
        message: formData.message.trim() || undefined,
      };

      const { data, error } = await supabase
        .from("trial_class_requests")
        .insert([payload])
        .select();

      let regNum = "";
      if (data && data[0]?.id) {
        regNum = `ALTANZEEL-${10000 + Number(data[0].id)}`;
      } else {
        regNum = `ALTANZEEL-${Math.floor(10000 + Math.random() * 90000)}`;
      }

      if (error) {
        console.error("Supabase insert error:", error);
        // Graceful fallback if database table has missing columns
        const isColumnMissing =
          error.message?.includes("age") ||
          error.message?.includes("gender") ||
          error.message?.includes("message") ||
          error.code === "42703" ||
          error.code === "PGRST204";

        if (isColumnMissing) {
          console.warn("Retrying insert with fallback notes...");
          const noteParts = [
            formData.age ? `Age: ${formData.age.trim()}` : "",
            formData.gender ? `Gender: ${formData.gender.trim()}` : "",
            formData.message ? `Message: ${formData.message.trim()}` : "",
          ]
            .filter(Boolean)
            .join(" | ");

          const fallbackPayload: Record<string, any> = {
            full_name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            country: formData.country.trim(),
            course: formData.course.trim(),
            preferred_time: formData.preferredTime.trim(),
            notes: noteParts,
          };
          const { error: retryError } = await supabase
            .from("trial_class_requests")
            .insert([fallbackPayload]);

          if (retryError) {
            setErrorMsg(retryError.message || "Failed to submit request. Please try again.");
            return;
          }
        } else {
          setErrorMsg(error.message || "Failed to submit request. Please try again.");
          return;
        }
      }

      setRegistrationNumber(regNum);
      setRegisteredAt(new Date().toLocaleString());
      setSubmittedData({ ...formData });
      setSubmitted(true);

      // Realtime Alert Broadcast to Admin Portal (Zero-configuration instant push)
      try {
        const alertChannel = supabase.channel("altanzeel-admin-live-alerts");
        alertChannel.subscribe((status) => {
          if (status === "SUBSCRIBED") {
            alertChannel.send({
              type: "broadcast",
              event: "new_registration",
              payload: {
                id: (data && data[0]?.id) || Math.floor(10000 + Math.random() * 90000),
                full_name: formData.name.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                country: formData.country.trim(),
                course: formData.course.trim(),
                preferred_time: formData.preferredTime.trim(),
                age: formData.age.trim(),
                gender: formData.gender.trim(),
                message: formData.message.trim(),
                created_at: new Date().toISOString(),
                status: "New",
              },
            });
          }
        });
      } catch (broadcastErr) {
        console.warn("Realtime broadcast alert exception:", broadcastErr);
      }

      // Background Web Push Notification to Admin devices (Wakes closed apps & mobile phones anywhere in the world)
      try {
        const notifyPromise = fetch("/api/push/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({
            title: `🔔 New Registration: ${formData.name.trim()}`,
            body: `Course: ${formData.course.trim()} | Country: ${formData.country.trim()} | Phone: ${formData.phone.trim()}`,
            url: "/admin/dashboard",
            data: { id: (data && data[0]?.id) || undefined },
          }),
        });

        // 3-second timeout race so user UI never hangs
        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3000));
        await Promise.race([notifyPromise, timeoutPromise]);
      } catch (pushErr) {
        console.warn("Background push notify dispatch warning (non-fatal):", pushErr);
      }
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setErrorMsg(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in overscroll-contain">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#18232c] to-[#0e161d] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto">
        {/* Top Glowing Color Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-accent)] via-amber-500 to-[var(--color-sky)]" />

        {/* Ambient Corner Orbs */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-[var(--color-accent)]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-[var(--color-sky)]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleModalClose}
          disabled={loading}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/15 transition-colors disabled:opacity-50 z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-2 text-center flex flex-col items-center gap-4 sm:gap-5 animate-fade-in">
            {/* Top Logo and Success Badge */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-16 h-16 rounded-2xl bg-black/60 border border-white/20 p-2 flex items-center justify-center shadow-[0_0_25px_rgba(250,132,30,0.25)]">
                <img
                  src="/tanzeel-logo.png"
                  alt="Al Tanzeel Quran Academy Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Trial Class Request Received!
                </h3>
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> JazakAllah Khair!
                </p>
              </div>
            </div>

            {/* Registration Number Card */}
            <div className="w-full bg-gradient-to-r from-amber-500/10 via-[var(--color-accent)]/15 to-amber-500/10 border border-[var(--color-accent)]/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
              <div className="text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Official Registration Number
                </span>
                <p className="text-xl sm:text-2xl font-black text-[var(--color-accent)] tracking-wider">
                  {registrationNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyRegNumber}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/15 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-300" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
            </div>

            {/* Filled Details Summary Card */}
            <div className="w-full bg-black/60 border border-white/15 rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm flex flex-col gap-3 shadow-inner">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider border-b border-white/10 pb-2 flex items-center justify-between">
                <span>Submitted Registration Details</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Confirmed
                </span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-gray-400 text-[11px] block">Student Name</span>
                  <span className="text-white font-bold">{submittedData?.name || formData.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[11px] block">Gender</span>
                  <span className="text-white font-bold">{submittedData?.gender || formData.gender}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[11px] block">Student Age</span>
                  <span className="text-white font-bold">{submittedData?.age || formData.age}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[11px] block">Country</span>
                  <span className="text-white font-bold">{submittedData?.country || formData.country}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[11px] block">WhatsApp / Phone</span>
                  <span className="text-[#25D366] font-bold">{submittedData?.phone || formData.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[11px] block">Email Address</span>
                  <span className="text-white font-bold truncate block">{submittedData?.email || formData.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[11px] block">Course Selected</span>
                  <span className="text-[var(--color-accent-light)] font-bold">{submittedData?.course || formData.course}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[11px] block">Preferred Class Time</span>
                  <span className="text-sky-300 font-bold">{submittedData?.preferredTime || formData.preferredTime}</span>
                </div>
              </div>

              {(submittedData?.message || formData.message) && (
                <div className="pt-2 border-t border-white/10">
                  <span className="text-gray-400 text-[11px] block">Your Message / Special Request</span>
                  <p className="text-gray-200 text-xs mt-0.5 leading-relaxed bg-white/5 p-2.5 rounded-lg border border-white/5">
                    {submittedData?.message || formData.message}
                  </p>
                </div>
              )}
            </div>

            {/* Coordinator Notification Note */}
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 text-center">
              Our academic coordinator will reach out to you via WhatsApp or Email within <strong className="text-white">2 to 4 hours</strong> to confirm your free trial class schedule.
            </p>

            {/* Action Buttons: Download, Print, Close */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={handlePrintSlip}
                className="py-3 px-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>Download / Print Slip (PDF)</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadImageSlip}
                disabled={downloadingImage}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
              >
                {downloadingImage ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                    <span>Generating Slip...</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4 shrink-0" />
                    <span>Download Slip (PNG / JPG)</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleModalClose}
              className="mt-1 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Close Window
            </button>

            {/* Hidden Slip Template for 100% Identical PNG / JPG Export via html2canvas */}
            <div
              ref={slipCardRef}
              style={{
                position: "fixed",
                left: "-9999px",
                top: 0,
                width: "650px",
                backgroundColor: "#ffffff",
                padding: "36px 32px",
                borderRadius: "20px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                color: "#0f172a",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                zIndex: -100,
                pointerEvents: "none",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              {/* Center Middle Watermark Logo */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                  zIndex: 0,
                  opacity: 0.085,
                  userSelect: "none",
                }}
              >
                <img
                  src="/tanzeel-logo.png"
                  alt="Al Tanzeel Watermark"
                  crossOrigin="anonymous"
                  style={{
                    width: "240px",
                    height: "240px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Header */}
                <div
                  style={{
                    textAlign: "center",
                    borderBottom: "2px solid #0f172a",
                    paddingBottom: "20px",
                    marginBottom: "22px",
                  }}
                >
                  <img
                    src="/tanzeel-logo.png"
                    alt="Al Tanzeel Quran Academy"
                    crossOrigin="anonymous"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      margin: "0 auto 10px auto",
                      display: "block",
                    }}
                  />
                  <h1
                    style={{
                      fontSize: "24px",
                      fontWeight: 900,
                      color: "#fa841e",
                      letterSpacing: "-0.5px",
                      margin: 0,
                    }}
                  >
                    Al Tanzeel Quran Academy
                  </h1>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#64748b",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginTop: "4px",
                    }}
                  >
                    Online Quran &amp; Islamic Studies Worldwide
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      background: "#ecfdf5",
                      border: "1px solid #10b981",
                      color: "#047857",
                      fontWeight: 700,
                      fontSize: "11px",
                      padding: "4px 14px",
                      borderRadius: "9999px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginTop: "10px",
                    }}
                  >
                    Official Free Trial Class Confirmation Slip
                  </div>
                </div>

                {/* Reg Box */}
                <div
                  style={{
                    background: "#f8fafc",
                    border: "2px dashed #cbd5e1",
                    borderRadius: "12px",
                    padding: "14px 20px",
                    textAlign: "center",
                    marginBottom: "22px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "#64748b",
                      letterSpacing: "1.5px",
                    }}
                  >
                    Official Registration Number
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 900,
                      color: "#fa841e",
                      letterSpacing: "2px",
                      marginTop: "4px",
                    }}
                  >
                    {registrationNumber}
                  </div>
                </div>

                {/* Table */}
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "22px",
                    fontSize: "13px",
                  }}
                >
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <th
                        style={{
                          width: "38%",
                          color: "#64748b",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        Student Name
                      </th>
                      <td
                        style={{
                          fontWeight: 700,
                          color: "#0f172a",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        {submittedData?.name || formData.name}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <th
                        style={{
                          width: "38%",
                          color: "#64748b",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        Gender
                      </th>
                      <td
                        style={{
                          fontWeight: 700,
                          color: "#0f172a",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        {submittedData?.gender || formData.gender}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <th
                        style={{
                          width: "38%",
                          color: "#64748b",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        Student Age
                      </th>
                      <td
                        style={{
                          fontWeight: 700,
                          color: "#0f172a",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        {submittedData?.age || formData.age}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <th
                        style={{
                          width: "38%",
                          color: "#64748b",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        Country
                      </th>
                      <td
                        style={{
                          fontWeight: 700,
                          color: "#0f172a",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        {submittedData?.country || formData.country}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <th
                        style={{
                          width: "38%",
                          color: "#64748b",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        WhatsApp / Phone
                      </th>
                      <td
                        style={{
                          fontWeight: 700,
                          color: "#25D366",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        {submittedData?.phone || formData.phone}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <th
                        style={{
                          width: "38%",
                          color: "#64748b",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        Email Address
                      </th>
                      <td
                        style={{
                          fontWeight: 700,
                          color: "#0f172a",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        {submittedData?.email || formData.email}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <th
                        style={{
                          width: "38%",
                          color: "#64748b",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        Course Selected
                      </th>
                      <td
                        style={{
                          fontWeight: 700,
                          color: "#fa841e",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        {submittedData?.course || formData.course}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <th
                        style={{
                          width: "38%",
                          color: "#64748b",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        Preferred Time
                      </th>
                      <td
                        style={{
                          fontWeight: 700,
                          color: "#0f172a",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        {submittedData?.preferredTime || formData.preferredTime}
                      </td>
                    </tr>
                    {(submittedData?.message || formData.message) && (
                      <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <th
                          style={{
                            width: "38%",
                            color: "#64748b",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            fontSize: "11px",
                            letterSpacing: "0.5px",
                            padding: "10px 12px",
                            textAlign: "left",
                          }}
                        >
                          Additional Note
                        </th>
                        <td
                          style={{
                            fontWeight: 700,
                            color: "#0f172a",
                            padding: "10px 12px",
                            textAlign: "left",
                          }}
                        >
                          {submittedData?.message || formData.message}
                        </td>
                      </tr>
                    )}
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <th
                        style={{
                          width: "38%",
                          color: "#64748b",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        Registered On
                      </th>
                      <td
                        style={{
                          fontWeight: 700,
                          color: "#0f172a",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        {registeredAt || new Date().toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <th
                        style={{
                          width: "38%",
                          color: "#64748b",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        Status
                      </th>
                      <td
                        style={{
                          fontWeight: 700,
                          color: "#047857",
                          padding: "10px 12px",
                          textAlign: "left",
                        }}
                      >
                        Confirmed (Teacher Assignment in Progress)
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Footer */}
                <div
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    padding: "16px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#475569",
                    lineHeight: 1.6,
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "#0f172a",
                      marginBottom: "4px",
                    }}
                  >
                    Next Steps &amp; Teacher Assignment:
                  </div>
                  Our academic coordinator will reach out to you via WhatsApp or
                  Email within <strong>2 to 4 hours</strong> to introduce your
                  certified teacher (Male/Female tutor according to your preference)
                  and schedule your 1-on-1 live trial class.
                  <br />
                  <br />
                  <strong>Official Support:</strong> info@altanzeelquranacademy.com
                  | WhatsApp: +92 327 4816872 | https://www.altanzeelquranacademy.com
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-5 sm:mb-6 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent-light)] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Free - 3 Days Trial - No Credit Card</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mb-1">
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

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4 text-sm">
              {/* 1. Full Name */}
              <div>
                <label className="block text-gray-200 text-xs font-bold uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-[var(--color-accent)]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    disabled={loading}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full h-[46px] bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-sm rounded-xl pl-10 pr-4 outline-none transition-all disabled:opacity-50 placeholder:text-gray-500 shadow-inner"
                  />
                </div>
              </div>

              {/* 2 & 3. Gender and Student Age Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {/* 2. Gender */}
                <div>
                  <label className="block text-gray-200 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Gender <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <div className="relative">
                    <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                      required
                      disabled={loading}
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full h-[46px] bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-sm rounded-xl pl-10 pr-8 outline-none transition-all disabled:opacity-50 cursor-pointer shadow-inner appearance-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Student Age */}
                <div>
                  <label className="block text-gray-200 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Student Age <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      disabled={loading}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="e.g. 8 years, 15, Adult"
                      className="w-full h-[46px] bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-sm rounded-xl pl-10 pr-4 outline-none transition-all disabled:opacity-50 placeholder:text-gray-500 shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* 4 & 5. Country and WhatsApp / Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {/* 4. Country */}
                <div>
                  <label className="block text-gray-200 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Country <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <CountrySelect
                    value={formData.country}
                    onChange={(country) => setFormData({ ...formData, country })}
                    required
                  />
                </div>

                {/* 5. WhatsApp / Phone */}
                <div>
                  <label className="block text-gray-200 text-xs font-bold uppercase tracking-wider mb-1.5">
                    WhatsApp / Phone <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      disabled={loading}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+960 765-4321"
                      className="w-full h-[46px] bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-sm rounded-xl pl-10 pr-4 outline-none transition-all disabled:opacity-50 placeholder:text-gray-500 shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* 6 & 7. Email Address and Course Interested Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {/* 6. Email Address */}
                <div>
                  <label className="block text-gray-200 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      disabled={loading}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full h-[46px] bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-sm rounded-xl pl-10 pr-4 outline-none transition-all disabled:opacity-50 placeholder:text-gray-500 shadow-inner"
                    />
                  </div>
                </div>

                {/* 7. Course Interested */}
                <div>
                  <label className="block text-gray-200 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Course Interested <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                      disabled={loading}
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full h-[46px] bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-sm rounded-xl pl-10 pr-8 outline-none transition-all disabled:opacity-50 cursor-pointer shadow-inner appearance-none"
                    >
                      <option value="Quranic Qaidah">Quranic Qaidah</option>
                      <option value="Quran Gateway">Quran Gateway</option>
                      <option value="Quran Memorizing (Hifz)">Quran Memorizing (Hifz)</option>
                      <option value="Translation of Holy Quran">Translation of Holy Quran</option>
                      <option value="Women Quranic Course">Women Quranic Course</option>
                      <option value="Tajweed Course">Tajweed Course</option>
                      <option value="Beautiful Quran Recitation Course">Beautiful Quran Recitation Course</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* 8. Preferred Class Time */}
              <div>
                <label className="block text-gray-200 text-xs font-bold uppercase tracking-wider mb-1.5">
                  Preferred Class Time <span className="text-[var(--color-accent)]">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    disabled={loading}
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full h-[46px] bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-sm rounded-xl pl-10 pr-8 outline-none transition-all cursor-pointer disabled:opacity-50 shadow-inner appearance-none"
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
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 9. Additional Message / Note (Larger Height) */}
              <div>
                <label className="block text-gray-200 text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                    <span>Additional Message / Note</span>
                  </span>
                  <span className="text-gray-400 font-normal lowercase text-[11px]">(optional)</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    disabled={loading}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write any message, question, or special request here."
                    className="w-full min-h-[110px] bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-sm rounded-xl p-3.5 outline-none transition-all disabled:opacity-50 placeholder:text-gray-500 shadow-inner leading-relaxed resize-y"
                  />
                </div>
              </div>

              {/* 10. Attendance Agreement Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group select-none p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all">
                <input
                  type="checkbox"
                  required
                  disabled={loading}
                  checked={formData.agreed}
                  onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded border-white/30 bg-black text-[var(--color-accent)] focus:ring-[var(--color-accent)] focus:ring-offset-0 cursor-pointer accent-[var(--color-accent)] shrink-0"
                />
                <span className="text-xs sm:text-[13px] text-gray-300 group-hover:text-white transition-colors leading-relaxed font-medium">
                  I agree to attend the free trial class at the scheduled time. <span className="text-rose-400 font-bold">*</span>
                </span>
              </label>

              {/* 11. Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-accent)] via-amber-500 to-[var(--color-accent)] hover:from-[var(--color-accent-hover)] hover:to-amber-600 text-white font-black text-sm tracking-wider uppercase shadow-[0_4px_25px_rgba(250,132,30,0.5)] transition-all hover:scale-[1.005] active:scale-[0.99] flex items-center justify-center gap-2 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <span>Submit Demo Request</span>
                )}
              </button>

              {/* Trust Badges Footer */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-around sm:justify-between gap-2 text-[11px] text-gray-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  100% Free Trial
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[var(--color-sky)] shrink-0" />
                  Privacy Guaranteed
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
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
