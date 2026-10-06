"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trash2,
  ArrowLeft,
  RefreshCw,
  Clock,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare,
  Lock,
  Unlock,
  Eye,
  MailCheck,
  Mail,
  ShieldCheck,
} from "lucide-react";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: "unread" | "read";
  ip?: string;
}

export default function InboxPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);

  // Security / PIN Protection State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    // Check session storage for existing auth
    const authStatus = sessionStorage.getItem("inbox_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchMessages();
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN is 1234
    if (enteredPin.trim() === "1234") {
      setIsAuthenticated(true);
      sessionStorage.setItem("inbox_authenticated", "true");
      setPinError(false);
      fetchMessages();
    } else {
      setPinError(true);
    }
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("inbox_authenticated");
    setEnteredPin("");
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Failed to load messages", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      }
    } catch (err) {
      console.error("Failed to delete message", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, status: m.status === "unread" ? "read" : "unread" } : m
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-4">
        <div className="theme-card p-8 rounded-3xl max-w-sm w-full text-center border border-white/10 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Protected Inbox</h2>
          <p className="text-xs text-zinc-400 mt-1 mb-6">
            Enter the admin PIN to access received contact messages. (Default: <span className="font-mono text-amber-400">1234</span>)
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter PIN (1234)"
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value);
                  setPinError(false);
                }}
                className="w-full px-4 py-3 rounded-2xl bg-black border border-white/15 text-center text-lg tracking-widest text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 font-mono"
                autoFocus
              />
            </div>

            {pinError && (
              <p className="text-xs text-red-400">Incorrect PIN. Please try again.</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl font-bold text-black btn-gold text-sm cursor-pointer"
            >
              Unlock Inbox
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white pt-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <span>Messages &amp; Inquiries</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400 text-black font-bold">
                {messages.length} total
              </span>
              {unreadCount > 0 && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-semibold">
                  {unreadCount} unread
                </span>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Securely stored messages received via your developer portfolio contact form.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchMessages}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white hover:border-amber-400/40 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-amber-400" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLock}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="mt-8 space-y-4">
          {loading ? (
            <div className="text-center py-16 text-zinc-500 text-sm">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-400" />
              <p>Loading inquiries from database...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="theme-card p-12 rounded-3xl text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">No Messages Yet</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-sm mx-auto">
                When someone submits the contact form on your portfolio, their message will appear here in real time.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isUnread = msg.status === "unread";
              return (
                <div
                  key={msg.id}
                  className={`theme-card p-5 sm:p-6 rounded-3xl transition-all ${
                    isUnread
                      ? "border-amber-400/40 bg-[#16140f] shadow-[0_0_20px_rgba(245,158,11,0.06)]"
                      : "border-white/10"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                          isUnread
                            ? "bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.4)]"
                            : "bg-white/10 text-white border border-white/15"
                        }`}
                      >
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">
                            {msg.name}
                          </h3>
                          {isUnread && (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs text-amber-400 hover:underline"
                          >
                            {msg.email}
                          </a>
                          <button
                            onClick={() => handleCopyEmail(msg.email, msg.id)}
                            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                            title="Copy email"
                          >
                            {copiedId === msg.id ? (
                              <CheckCircle2 className="w-3 h-3 text-amber-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-600" />
                        <span>{new Date(msg.createdAt).toLocaleString()}</span>
                      </div>

                      {/* Mark Read/Unread Toggle */}
                      <button
                        onClick={() => handleToggleStatus(msg.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                          isUnread
                            ? "bg-amber-400/10 text-amber-400 hover:bg-amber-400/20"
                            : "bg-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                        title="Toggle read status"
                      >
                        <MailCheck className="w-3.5 h-3.5" />
                        <span>{isUnread ? "Mark Read" : "Read"}</span>
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(msg.id)}
                        disabled={deletingId === msg.id}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete message"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl bg-black/60 border border-white/5 text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
                    {msg.message}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-white/5">
                    {/* Copy Email */}
                    <button
                      onClick={() => handleCopyEmail(msg.email, msg.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          <span className="text-amber-400">Email Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>

                    {/* Default Mail App (mailto) */}
                    <a
                      href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: Inquiry from Muhammad Kamran's Portfolio`)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
                      title="Open in Windows Mail / Outlook"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Mail App</span>
                    </a>

                    {/* Direct Gmail Web (Guaranteed to open Gmail compose tab) */}
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(msg.email)}&su=${encodeURIComponent(`Re: Portfolio Inquiry - ${msg.name}`)}&body=${encodeURIComponent(`Hi ${msg.name},\n\nThank you for reaching out via my portfolio.\n\n---\nRegarding your message:\n"${msg.message}"\n---\n\nBest regards,\nMuhammad Kamran\nModern Web Developer`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-400 text-black hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/10 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Reply via Gmail Web</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
