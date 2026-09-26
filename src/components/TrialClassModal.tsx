"use client";

import React, { useState } from "react";
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
  const [copied, setCopied] = useState(false);
  const [downloadingImage, setDownloadingImage] = useState(false);

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
              <tr><th>Registered On</th><td>${new Date().toLocaleString()}</td></tr>
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

  const handleDownloadImageSlip = () => {
    if (downloadingImage) return;
    setDownloadingImage(true);

    const sName = submittedData?.name || formData.name;
    const sGender = submittedData?.gender || formData.gender;
    const sAge = submittedData?.age || formData.age;
    const sCountry = submittedData?.country || formData.country;
    const sPhone = submittedData?.phone || formData.phone;
    const sEmail = submittedData?.email || formData.email;
    const sCourse = submittedData?.course || formData.course;
    const sTime = submittedData?.preferredTime || formData.preferredTime;
    const sMsg = submittedData?.message || formData.message;

    const canvas = document.createElement("canvas");
    const width = 1000;
    const height = sMsg ? 1440 : 1340;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      setDownloadingImage(false);
      return;
    }

    const drawRoundedRect = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      if (typeof c.roundRect === "function") {
        c.roundRect(x, y, w, h, r);
      } else {
        c.rect(x, y, w, h);
      }
    };

    const renderSlip = (logoImg?: HTMLImageElement) => {
      try {
        // 1. White Background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        // Outer Border
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 3;
        ctx.strokeRect(16, 16, width - 32, height - 32);

        // Top Gradient Accent Bar
        const gradient = ctx.createLinearGradient(16, 16, width - 16, 26);
        gradient.addColorStop(0, "#fa841e");
        gradient.addColorStop(0.5, "#f59e0b");
        gradient.addColorStop(1, "#0ea5e9");
        ctx.fillStyle = gradient;
        ctx.fillRect(16, 16, width - 32, 10);

        // 2. Center Middle Watermark Logo (with subtle transparency ~ 0.08)
        if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
          ctx.save();
          ctx.globalAlpha = 0.08;
          const wmSize = 280;
          ctx.drawImage(logoImg, (width - wmSize) / 2, 590, wmSize, wmSize);
          ctx.restore();
        }

        // 3. Header Top Logo
        let currentY = 56;
        if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
          const topLogoSize = 85;
          ctx.drawImage(logoImg, (width - topLogoSize) / 2, currentY, topLogoSize, topLogoSize);
          currentY += topLogoSize + 16;
        } else {
          currentY += 20;
        }

        // 4. Academy Title & Subtitle
        ctx.fillStyle = "#fa841e";
        ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Al Tanzeel Quran Academy", width / 2, currentY);
        currentY += 26;

        ctx.fillStyle = "#64748b";
        ctx.font = "600 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.fillText("ONLINE QURAN & ISLAMIC STUDIES WORLDWIDE", width / 2, currentY);
        currentY += 28;

        // Confirmation Badge
        const badgeText = "OFFICIAL FREE TRIAL CLASS CONFIRMATION SLIP";
        ctx.font = "700 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        const badgeWidth = ctx.measureText(badgeText).width + 32;
        ctx.fillStyle = "#ecfdf5";
        ctx.beginPath();
        drawRoundedRect(ctx, (width - badgeWidth) / 2, currentY - 16, badgeWidth, 26, 13);
        ctx.fill();
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = "#047857";
        ctx.fillText(badgeText, width / 2, currentY + 2);
        currentY += 38;

        // Divider
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(50, currentY);
        ctx.lineTo(width - 50, currentY);
        ctx.stroke();
        currentY += 24;

        // 5. Official Registration Number Card
        const regBoxWidth = 520;
        const regBoxHeight = 74;
        const regBoxX = (width - regBoxWidth) / 2;
        ctx.fillStyle = "#f8fafc";
        ctx.beginPath();
        drawRoundedRect(ctx, regBoxX, currentY, regBoxWidth, regBoxHeight, 14);
        ctx.fill();
        ctx.strokeStyle = "#cbd5e1";
        if (typeof ctx.setLineDash === "function") {
          ctx.setLineDash([6, 4]);
        }
        ctx.stroke();
        if (typeof ctx.setLineDash === "function") {
          ctx.setLineDash([]);
        }

        ctx.fillStyle = "#64748b";
        ctx.font = "700 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.fillText("OFFICIAL REGISTRATION NUMBER", width / 2, currentY + 24);

        ctx.fillStyle = "#fa841e";
        ctx.font = "900 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.fillText(registrationNumber, width / 2, currentY + 56);
        currentY += regBoxHeight + 30;

        // 6. Student Data Table
        const tableX = 60;
        const tableW = width - 120;
        interface SlipRow {
          label: string;
          value: string;
          color?: string;
        }

        const rows: SlipRow[] = [
          { label: "Student Name", value: sName },
          { label: "Gender", value: sGender },
          { label: "Student Age", value: sAge ? `${sAge} Years` : "Not specified" },
          { label: "Country", value: sCountry },
          { label: "WhatsApp / Phone", value: sPhone, color: "#16a34a" },
          { label: "Email Address", value: sEmail },
          { label: "Course Selected", value: sCourse, color: "#fa841e" },
          { label: "Preferred Class Time", value: sTime, color: "#0284c7" },
          ...(sMsg ? [{ label: "Student Special Request", value: sMsg }] : []),
          { label: "Registered On", value: new Date().toLocaleString() },
          { label: "Enrollment Status", value: "Confirmed (Teacher Assignment in Progress)", color: "#047857" },
        ];

        const rowHeight = 44;
        rows.forEach((row, i) => {
          const rowY = currentY + i * rowHeight;

          // Alternate row background
          if (i % 2 === 0) {
            ctx.fillStyle = "#f8fafc";
            ctx.beginPath();
            drawRoundedRect(ctx, tableX, rowY, tableW, rowHeight, 6);
            ctx.fill();
          }

          // Divider
          ctx.strokeStyle = "#edf2f7";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(tableX, rowY + rowHeight);
          ctx.lineTo(tableX + tableW, rowY + rowHeight);
          ctx.stroke();

          // Left Label
          ctx.textAlign = "left";
          ctx.fillStyle = "#64748b";
          ctx.font = "600 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          ctx.fillText(row.label.toUpperCase(), tableX + 18, rowY + 27);

          // Right Value
          ctx.textAlign = "right";
          ctx.fillStyle = row.color || "#0f172a";
          ctx.font = "700 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          const val = row.value.length > 48 ? row.value.slice(0, 45) + "..." : row.value;
          ctx.fillText(val, tableX + tableW - 18, rowY + 27);
        });

        currentY += rows.length * rowHeight + 25;

        // 7. Footer Box
        const footerX = 60;
        const footerW = width - 120;
        const footerH = 112;
        ctx.fillStyle = "#f8fafc";
        ctx.beginPath();
        drawRoundedRect(ctx, footerX, currentY, footerW, footerH, 12);
        ctx.fill();
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.textAlign = "left";
        ctx.fillStyle = "#0f172a";
        ctx.font = "800 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.fillText("Next Steps & Class Assignment:", footerX + 20, currentY + 26);

        ctx.fillStyle = "#475569";
        ctx.font = "500 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.fillText(
          "Our academic coordinator will reach out via WhatsApp/Email within 2 to 4 hours to introduce your certified teacher.",
          footerX + 20,
          currentY + 52
        );

        ctx.fillStyle = "#64748b";
        ctx.font = "700 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.fillText(
          "Support: info@altanzeelquranacademy.com  |  WhatsApp: +92 327 4816872  |  www.altanzeelquranacademy.com",
          footerX + 20,
          currentY + 86
        );

        // Convert canvas to PNG blob & trigger download
        canvas.toBlob((blob) => {
          if (!blob) {
            setDownloadingImage(false);
            return;
          }
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `AlTanzeel-Registration-${registrationNumber}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          setDownloadingImage(false);
        }, "image/png");
      } catch (err) {
        console.error("Canvas image generation error:", err);
        setDownloadingImage(false);
      }
    };

    // Load logo with crossOrigin support
    const logoImg = new window.Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.onload = () => renderSlip(logoImg);
    logoImg.onerror = () => renderSlip();
    logoImg.src = "/tanzeel-logo.png";
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
      setSubmittedData({ ...formData });
      setSubmitted(true);
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
