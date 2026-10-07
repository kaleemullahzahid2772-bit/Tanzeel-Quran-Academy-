"use client";

import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  X,
  Printer,
  Download,
  Loader2,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { TrialRegistration } from "@/types/admin";

interface RegistrationSlipModalProps {
  registration: TrialRegistration | null;
  isOpen: boolean;
  onClose: () => void;
  theme?: "dark" | "light";
}

export default function RegistrationSlipModal({
  registration,
  isOpen,
  onClose,
  theme = "dark",
}: RegistrationSlipModalProps) {
  const isLight = theme === "light";
  const [downloadingImage, setDownloadingImage] = useState(false);
  const slipRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !registration) return null;

  const regNum =
    registration.id && !isNaN(Number(registration.id))
      ? `ALTANZEEL-${10000 + Number(registration.id)}`
      : `ALTANZEEL-${String(registration.id).slice(0, 6).toUpperCase()}`;

  const formattedDate = registration.created_at
    ? new Date(registration.created_at).toLocaleString()
    : new Date().toLocaleString();

  // 1. Download / Print PDF via exact HTML window
  const handlePrintSlip = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://www.altanzeelquranacademy.com";
    const logoUrl = `${origin}/tanzeel-logo.png`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Al Tanzeel Registration Slip - ${regNum}</title>
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
          <div class="watermark-container">
            <img src="${logoUrl}" alt="Al Tanzeel Watermark" class="watermark-img" />
          </div>

          <div class="slip-content">
            <div class="header">
              <img src="${logoUrl}" alt="Al Tanzeel Quran Academy" class="top-logo" />
              <h1 class="logo-title">Al Tanzeel Quran Academy</h1>
              <div class="sublogo">Online Quran & Islamic Studies Worldwide</div>
              <div class="badge">Official Free Trial Class Confirmation Slip</div>
            </div>

            <div class="reg-box">
              <div class="reg-label">Official Registration Number</div>
              <div class="reg-num">${regNum}</div>
            </div>

            <table>
              <tr><th>Student Name</th><td>${registration.full_name || "-"}</td></tr>
              <tr><th>Gender</th><td>${registration.gender || "Not specified"}</td></tr>
              <tr><th>Student Age</th><td>${registration.age ? `${registration.age} Years` : "Not specified"}</td></tr>
              <tr><th>Country</th><td>${registration.country || "-"}</td></tr>
              <tr><th>WhatsApp / Viber / Phone</th><td>${registration.phone || "-"}</td></tr>
              <tr><th>Email Address</th><td>${registration.email || "-"}</td></tr>
              <tr><th>Course Selected</th><td>${registration.course || "-"}</td></tr>
              <tr><th>Preferred Time</th><td>${registration.preferred_time || "-"}</td></tr>
              ${registration.message ? `<tr><th>Additional Note</th><td>${registration.message}</td></tr>` : ""}
              <tr><th>Registered On</th><td>${formattedDate}</td></tr>
              <tr><th>Status</th><td><span style="color:#047857;font-weight:bold;">${registration.status || "Confirmed"}</span></td></tr>
            </table>

            <div class="footer">
              <div class="note-title">Next Steps & Teacher Assignment:</div>
              Our academic coordinator will reach out via WhatsApp or Email within <strong>2 to 4 hours</strong> to introduce your certified teacher and schedule your 1-on-1 live trial class.
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

  // 2. Download Image (PNG) with 100% identical styling via html2canvas
  const handleDownloadImageSlip = async () => {
    if (downloadingImage || !slipRef.current) return;
    setDownloadingImage(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 150));

      const canvas = await html2canvas(slipRef.current, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `AlTanzeel-Registration-${regNum}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Canvas image generation error:", err);
    } finally {
      setDownloadingImage(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md animate-fade-in ${
        isLight ? "bg-slate-900/60" : "bg-black/85"
      }`}
    >
      <div
        className={`relative w-full max-w-3xl rounded-3xl p-4 sm:p-6 max-h-[94vh] overflow-y-auto transition-all shadow-2xl flex flex-col gap-4 ${
          isLight
            ? "bg-slate-100 border border-slate-200 text-slate-800"
            : "bg-[#0b1117] border border-white/15 text-white"
        }`}
      >
        {/* Top Header Bar inside Modal */}
        <div className="flex items-center justify-between gap-3 border-b pb-3 border-inherit">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/40 flex items-center justify-center text-[var(--color-accent)]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`font-black text-sm sm:text-base ${isLight ? "text-slate-900" : "text-white"}`}>
                Student Registration Slip
              </h3>
              <p className="text-[11px] text-gray-400 font-mono">
                {regNum} • {registration.full_name}
              </p>
            </div>
          </div>

          {/* Action buttons & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintSlip}
              title="Download / Print PDF"
              className="py-1.5 px-3 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold transition flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            <button
              onClick={handleDownloadImageSlip}
              disabled={downloadingImage}
              title="Download Slip Image (PNG)"
              className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow disabled:opacity-50 cursor-pointer"
            >
              {downloadingImage ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">Saving...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PNG</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-full transition ${
                isLight
                  ? "text-slate-500 hover:text-slate-900 hover:bg-slate-200"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Preview Container (The actual slip card) */}
        <div className="w-full flex justify-center overflow-x-auto py-2">
          <div
            ref={slipRef}
            style={{
              position: "relative",
              maxWidth: "650px",
              width: "100%",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "36px 32px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              color: "#0f172a",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
              boxSizing: "border-box",
            }}
          >
            {/* Center Watermark Logo with subtle transparency */}
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
              {/* Slip Header */}
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
                  {regNum}
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
                      {registration.full_name || "-"}
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
                      {registration.gender || "Not specified"}
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
                      {registration.age ? `${registration.age} Years` : "Not specified"}
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
                      {registration.country || "-"}
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
                      WhatsApp / Viber / Phone
                    </th>
                    <td
                      style={{
                        fontWeight: 700,
                        color: "#25D366",
                        padding: "10px 12px",
                        textAlign: "left",
                      }}
                    >
                      {registration.phone || "-"}
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
                      {registration.email || "-"}
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
                      {registration.course || "-"}
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
                      {registration.preferred_time || "-"}
                    </td>
                  </tr>
                  {registration.message && (
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
                        {registration.message}
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
                      {formattedDate}
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
                      {registration.status || "Confirmed (Teacher Assignment in Progress)"}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Slip Footer */}
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
                Our academic coordinator will reach out via WhatsApp or Email within <strong>2 to 4 hours</strong> to introduce your certified teacher and schedule your 1-on-1 live trial class.
                <br />
                <br />
                <strong>Official Support:</strong> info@altanzeelquranacademy.com | WhatsApp: +92 327 4816872 | https://www.altanzeelquranacademy.com
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-inherit">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            The generated PDF and PNG slips are 100% identical with official logos and watermark.
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrintSlip}
              className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadImageSlip}
              disabled={downloadingImage}
              className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow disabled:opacity-50 cursor-pointer"
            >
              {downloadingImage ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4" />
                  <span>Download PNG</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className={`py-2 px-4 rounded-xl text-xs font-semibold transition cursor-pointer ${
                isLight
                  ? "bg-slate-200 hover:bg-slate-300 text-slate-700"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
