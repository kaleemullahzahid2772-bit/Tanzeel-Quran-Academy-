"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  Mail,
  Menu,
  X,
} from "lucide-react";
import TrialClassModal from "./TrialClassModal";
import { WhatsAppIcon } from "./FloatingContact";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Downloads", href: "/downloads" },
  { name: "Student Gallery", href: "/student-gallery" },
  { name: "Contact", href: "/contact" },
  { name: "FAQs", href: "/faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="w-full relative z-50">
        {/* Top Info Bar */}
        <div className="w-full bg-[var(--color-black-nav)] border-b border-[var(--color-border)] py-2 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Contact Details */}
            <div className="flex items-center gap-4 sm:gap-6 text-[var(--color-gray-muted)]">
              <a
                href="https://wa.me/923274816872"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Support +92 327 4816872"
                className="flex items-center gap-2 group hover:text-[#25D366] transition-all"
              >
                <div className="p-1.5 rounded-lg bg-[#25D366]/10 group-hover:bg-[#25D366]/20 transition-all">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                <span className="font-medium text-[11px] sm:text-xs">WhatsApp: +92 327 4816872</span>
              </a>

              <a
                href="mailto:info@altanzeelquranacademy.com"
                aria-label="Email info@altanzeelquranacademy.com"
                className="flex items-center gap-2 group hover:text-[var(--color-sky)] transition-all"
              >
                <div className="p-1.5 rounded-lg bg-[var(--color-accent)]/10 group-hover:bg-[var(--color-accent)]/20 transition-all">
                  <Mail className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                </div>
                <span className="font-medium text-[11px] sm:text-xs">info@altanzeelquranacademy.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav className="w-full bg-[var(--color-black-soft)]/90 backdrop-blur-md border-b border-[var(--color-border)] py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" title="Al Tanzeel Quran Academy Home">
              <div className="relative w-48 h-12 flex items-center">
                <img
                  src="/tanzeel-top-logo.png"
                  alt="Al Tanzeel Quran Academy - Online Quran Academy & Tajweed Classes"
                  width={192}
                  height={48}
                  className="h-full w-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    title={link.name}
                    className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-[var(--color-surface)] text-[var(--color-accent)] border border-[var(--color-accent)]/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(250,132,30,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                Free Trial Class
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="md:hidden p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-gray-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[var(--color-black-soft)] border-b border-[var(--color-border)] px-4 pt-3 pb-6 flex flex-col gap-3 animate-fade-in shadow-2xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    title={link.name}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-[var(--color-surface)] text-[var(--color-accent)] border border-[var(--color-accent)]/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[var(--color-border)] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-wider shadow-md text-center"
              >
                Book Free Trial Class
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Trial Class Popup Modal */}
      <TrialClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
