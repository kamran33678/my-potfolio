"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Phone,
  MessageCircle,
  Loader2,
  AlertCircle,
  Inbox,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const emailAddress = "muhammadkamran0774@gmail.com";
  const phoneNumber = "03296421032";
  const formattedPhone = "+92 329 6421032";
  const whatsappUrl = "https://wa.me/923296421032";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side quick check
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setErrorMsg("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to deliver message. Please try again.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20 inline-flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-amber-400" />
          <span>Get In Touch</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
          Contact <span className="text-amber-400">Muhammad Kamran</span>
        </h2>
        <p className="mt-2 text-zinc-400 text-sm sm:text-base">
          Have a question or looking to build a website? Send a direct message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Card */}
          <div className="theme-card p-6 rounded-3xl">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Email
                </span>
                <a
                  href={`mailto:${emailAddress}`}
                  className="block text-white font-semibold text-sm sm:text-base truncate hover:text-amber-400 transition-colors mt-0.5"
                >
                  {emailAddress}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="text-white font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Phone & WhatsApp Card */}
          <div className="theme-card p-6 rounded-3xl">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Phone &amp; WhatsApp
                </span>
                <div className="mt-0.5">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="block text-white font-semibold text-sm sm:text-base hover:text-amber-400 transition-colors"
                  >
                    {formattedPhone}
                  </a>
                </div>

                {/* Quick Actions */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.04] border border-white/10 text-zinc-200 hover:text-amber-400 hover:border-amber-400/40 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-amber-400" />
                    <span>Call</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedPhone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-white">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Quick Meta */}
          <div className="theme-card p-5 rounded-3xl">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">Location</span>
                <span className="text-white text-sm font-semibold block">Faisalabad, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="theme-card p-6 sm:p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-1">Send a Direct Message</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Messages are saved directly into your message inbox and delivered via email.
            </p>

            {errorMsg && (
              <div className="p-4 mb-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {submitted ? (
              <div className="p-8 rounded-3xl bg-amber-400/[0.06] border border-amber-400/20 text-center animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-black flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Message Delivered &amp; Saved!</h4>
                <p className="text-xs text-zinc-300 mt-2 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out! Your message is safely stored in the Inbox and dispatched to Muhammad Kamran.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/inbox"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold text-black btn-gold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Inbox className="w-3.5 h-3.5 text-black" />
                    <span>Open Inbox to View Message</span>
                  </Link>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-medium text-zinc-300 bg-zinc-900 border border-white/10 hover:border-amber-400/40 hover:text-white transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Email <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Message <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hello Muhammad Kamran, I would like to discuss..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl font-bold text-black btn-gold flex items-center justify-center gap-2 text-sm tracking-wide cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
