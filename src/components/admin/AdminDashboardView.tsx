"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Video,
  ShieldCheck,
  KeyRound,
  Activity,
  LogOut,
  ExternalLink,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Smartphone,
  Mail,
  Calendar,
  Edit3,
  Lock,
  RefreshCw,
  SlidersHorizontal,
  Eye,
  X,
  ChevronRight,
  Menu,
  Sparkles,
  Server,
  UserCheck,
  Trash2,
  Plus,
  Clock,
  Globe,
  Upload,
  Image as ImageIcon,
  GripVertical,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Check,
  Bookmark,
  MessageSquare,
  PhoneCall,
} from "lucide-react";
import { AdminSessionPayload } from "@/lib/auth";
import { LeadRecord, WebinarRecord, ContactInquiryRecord } from "@/lib/db";

interface AdminDashboardViewProps {
  session: AdminSessionPayload;
  leads: LeadRecord[];
  totalLeads: number;
  webinars?: WebinarRecord[];
  contacts?: ContactInquiryRecord[];
}

export default function AdminDashboardView({
  session,
  leads: initialLeads,
  totalLeads,
  webinars = [],
  contacts: initialContacts = [],
}: AdminDashboardViewProps) {
  // Navigation State
  const [activeTab, setActiveTab] = useState<"crm" | "contacts" | "webinars" | "profile" | "security" | "system">("crm");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic leads & contacts states
  const [leadsList, setLeadsList] = useState<LeadRecord[]>(initialLeads);
  const [contactsList, setContactsList] = useState<ContactInquiryRecord[]>(initialContacts);

  // Search & Filter State for Webinar Leads CRM
  const [searchQuery, setSearchQuery] = useState("");
  const [webinarFilter, setWebinarFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "New" | "Responded">("all");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);

  // Search & Filter State for Contact Inquiries
  const [contactSearchQuery, setContactSearchQuery] = useState("");
  const [contactStatusFilter, setContactStatusFilter] = useState<"all" | "New" | "Responded">("all");
  const [selectedContact, setSelectedContact] = useState<ContactInquiryRecord | null>(null);

  // 1-Click Status Toggle Handlers
  const handleToggleLeadStatus = async (id: number, currentStatus?: string) => {
    const prevStatus = currentStatus || "New";
    const nextStatus = prevStatus === "Responded" ? "New" : "Responded";
    // Optimistic UI update
    setLeadsList((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: nextStatus } : l))
    );
    try {
      const res = await fetch("/api/admin/leads/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "webinar", id, status: nextStatus }),
      });
      if (!res.ok) {
        // revert on failure
        setLeadsList((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: prevStatus } : l))
        );
      }
    } catch {
      setLeadsList((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: prevStatus } : l))
      );
    }
  };

  const handleToggleContactStatus = async (id: number, currentStatus?: string) => {
    const prevStatus = currentStatus || "New";
    const nextStatus = prevStatus === "Responded" ? "New" : "Responded";
    // Optimistic UI update
    setContactsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: nextStatus } : c))
    );
    try {
      const res = await fetch("/api/admin/leads/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", id, status: nextStatus }),
      });
      if (!res.ok) {
        // revert on failure
        setContactsList((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: prevStatus } : c))
        );
      }
    } catch {
      setContactsList((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: prevStatus } : c))
      );
    }
  };

  // Webinar Campaigns State
  const [webinarList, setWebinarList] = useState<WebinarRecord[]>(webinars);
  const [showWebinarModal, setShowWebinarModal] = useState(false);
  const [editingWebinarId, setEditingWebinarId] = useState<number | null>(null);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2 | 3 | 4>(1);
  const [webinarForm, setWebinarForm] = useState({
    title: "",
    slug: "",
    subtitle: "",
    date_time: "Upcoming Saturday, 7:00 PM IST",
    duration_minutes: 90,
    max_seats: 500,
    banner_image_url: "/images/traderoom/time-cycle-trading.jpg",
    status: "draft" as "draft" | "published" | "archived",
    zoom_join_url: "",
    is_active: 0,
    topics: [
      "Mathematical Price-Time Squaring & Harmonic Equilibrium (W.D. Gann principles)",
      "Forecasting High-Probability Turn Dates in Nifty, Bank Nifty & MCX Crude Oil",
      "Low Implied Volatility (IV) Options Buying Execution with 1:4+ Asymmetric Payoffs",
      "Institutional Liquidity Hunts: Why Retail Support & Resistance Breakouts Get Trapped",
    ],
  });
  const [webinarLoading, setWebinarLoading] = useState(false);
  const [webinarMsg, setWebinarMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Profile Edit State
  const [profile, setProfile] = useState(session);
  const [editAvatar, setEditAvatar] = useState(profile.avatarUrl || "");
  const [editDesignation, setEditDesignation] = useState(profile.designation || "");
  const [editBio, setEditBio] = useState(profile.bio || "");
  const [editTgChatId, setEditTgChatId] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password Change State
  const [passwordStep, setPasswordStep] = useState<"request" | "verify">("request");
  const [pwdOtp, setPwdOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Direct Test Message State
  const [testMsgLoading, setTestMsgLoading] = useState(false);
  const [testMsgSuccess, setTestMsgSuccess] = useState<string | null>(null);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch {
      window.location.href = "/admin/login";
    }
  };

  // Webinar Action Handlers
  const handleOpenCreateWebinar = () => {
    setEditingWebinarId(null);
    setModalStep(1);
    setWebinarForm({
      title: "",
      slug: "",
      subtitle: "",
      date_time: "Upcoming Saturday, 7:00 PM IST",
      duration_minutes: 90,
      max_seats: 500,
      banner_image_url: "/images/traderoom/time-cycle-trading.jpg",
      status: "draft",
      zoom_join_url: "",
      is_active: 0,
      topics: [
        "Mathematical Price-Time Squaring & Harmonic Equilibrium (W.D. Gann principles)",
        "Forecasting High-Probability Turn Dates in Nifty, Bank Nifty & MCX Crude Oil",
        "Low Implied Volatility (IV) Options Buying Execution with 1:4+ Asymmetric Payoffs",
        "Institutional Liquidity Hunts: Why Retail Support & Resistance Breakouts Get Trapped",
      ],
    });
    setWebinarMsg(null);
    setShowWebinarModal(true);
  };

  const handleOpenEditWebinar = (w: WebinarRecord) => {
    setEditingWebinarId(w.id);
    setModalStep(1);
    let topicsList: string[] = [];
    if (w.topics_json) {
      try {
        const parsed = JSON.parse(w.topics_json);
        if (Array.isArray(parsed)) {
          topicsList = parsed.filter(Boolean);
        }
      } catch {
        // Fallback
      }
    }
    if (topicsList.length === 0) {
      topicsList = [
        "Mathematical Price-Time Squaring & Harmonic Equilibrium (W.D. Gann principles)",
        "Forecasting High-Probability Turn Dates in Nifty, Bank Nifty & MCX Crude Oil",
        "Low Implied Volatility (IV) Options Buying Execution with 1:4+ Asymmetric Payoffs",
        "Institutional Liquidity Hunts: Why Retail Support & Resistance Breakouts Get Trapped",
      ];
    }
    const currentStatus = (w.status as any) || (w.is_active ? "published" : "draft");
    setWebinarForm({
      title: w.title || "",
      slug: w.slug || "",
      subtitle: w.subtitle || "",
      date_time: w.date_time || "",
      duration_minutes: w.duration_minutes || 90,
      max_seats: w.max_seats || 500,
      banner_image_url: w.banner_image_url || "/images/traderoom/time-cycle-trading.jpg",
      status: currentStatus,
      zoom_join_url: w.zoom_join_url || "",
      is_active: currentStatus === "published" ? 1 : 0,
      topics: topicsList,
    });
    setWebinarMsg(null);
    setShowWebinarModal(true);
  };

  const handleAddTopic = () => {
    setWebinarForm((prev) => ({
      ...prev,
      topics: [...prev.topics, ""],
    }));
  };

  const handleUpdateTopic = (index: number, val: string) => {
    setWebinarForm((prev) => {
      const nextTopics = [...prev.topics];
      nextTopics[index] = val;
      return { ...prev, topics: nextTopics };
    });
  };

  const handleRemoveTopic = (index: number) => {
    setWebinarForm((prev) => {
      if (prev.topics.length <= 1) return { ...prev, topics: [""] };
      return {
        ...prev,
        topics: prev.topics.filter((_, i) => i !== index),
      };
    });
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingBanner(true);
    setWebinarMsg(null);
    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/admin/upload-banner", {
        method: "POST",
        body: data,
      });

      const resJson = await res.json();
      if (!res.ok || !resJson.success) {
        setWebinarMsg({ type: "error", text: resJson.error || "Failed to upload banner image." });
      } else {
        setWebinarForm((prev) => ({ ...prev, banner_image_url: resJson.url }));
        setWebinarMsg({ type: "success", text: "Banner image uploaded successfully!" });
      }
    } catch {
      setWebinarMsg({ type: "error", text: "Network error during banner upload." });
    } finally {
      setUploadingBanner(false);
    }
  };

  const handleSaveWebinar = async (e?: React.FormEvent, forceStatus?: "draft" | "published" | "archived") => {
    if (e) e.preventDefault();
    setWebinarLoading(true);
    setWebinarMsg(null);

    const statusToSave = forceStatus || webinarForm.status;
    const cleanTopics = webinarForm.topics.map((t) => t.trim()).filter(Boolean);

    try {
      const url = "/api/admin/webinars";
      const method = editingWebinarId ? "PATCH" : "POST";
      const payload = {
        id: editingWebinarId,
        title: webinarForm.title,
        slug: webinarForm.slug,
        subtitle: webinarForm.subtitle,
        date_time: webinarForm.date_time,
        duration_minutes: webinarForm.duration_minutes,
        max_seats: webinarForm.max_seats,
        banner_image_url: webinarForm.banner_image_url,
        status: statusToSave,
        zoom_join_url: webinarForm.zoom_join_url,
        is_active: statusToSave === "published" ? 1 : 0,
        topics: cleanTopics,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setWebinarMsg({ type: "error", text: data.error || "Failed to save webinar." });
        setWebinarLoading(false);
        return;
      }

      setWebinarMsg({
        type: "success",
        text: data.message || (editingWebinarId ? "Masterclass campaign updated!" : "Masterclass campaign created!"),
      });

      // Refresh webinar list
      const listRes = await fetch("/api/admin/webinars");
      const listData = await listRes.json();
      if (listData.webinars) {
        setWebinarList(listData.webinars);
      }

      setTimeout(() => {
        setShowWebinarModal(false);
        setEditingWebinarId(null);
        setWebinarMsg(null);
      }, 900);
    } catch {
      setWebinarMsg({ type: "error", text: "Network error saving masterclass." });
    } finally {
      setWebinarLoading(false);
    }
  };

  const handleUpdateStatus = async (w: WebinarRecord, newStatus: "draft" | "published" | "archived") => {
    try {
      const isActive = newStatus === "published" ? 1 : 0;
      const res = await fetch("/api/admin/webinars", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: w.id, status: newStatus, is_active: isActive }),
      });
      if (res.ok) {
        setWebinarList((prev) =>
          prev.map((item) => (item.id === w.id ? { ...item, status: newStatus, is_active: isActive } : item))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleDeleteWebinar = async (id: number) => {
    if (!confirm("Are you sure you want to delete this webinar campaign?")) return;
    try {
      const res = await fetch(`/api/admin/webinars?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setWebinarList((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Filter Webinar Leads
  const filteredLeads = useMemo(() => {
    return leadsList.filter((l) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchQuery =
          l.name?.toLowerCase().includes(q) ||
          l.phone?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.interest?.toLowerCase().includes(q) ||
          l.experience?.toLowerCase().includes(q);
        if (!matchQuery) return false;
      }
      // Status filter
      if (statusFilter !== "all") {
        const itemStatus = l.status || "New";
        if (itemStatus.toLowerCase() !== statusFilter.toLowerCase()) return false;
      }
      // Webinar cohort filter
      if (webinarFilter !== "all") {
        if (String(l.webinar_id) !== webinarFilter) return false;
      }
      return true;
    });
  }, [leadsList, searchQuery, statusFilter, webinarFilter]);

  // Filter Contact Inquiries
  const filteredContacts = useMemo(() => {
    return contactsList.filter((c) => {
      // Search query filter
      if (contactSearchQuery.trim()) {
        const q = contactSearchQuery.toLowerCase();
        const matchQuery =
          c.name?.toLowerCase().includes(q) ||
          c.phone?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.subject_topic?.toLowerCase().includes(q) ||
          c.message?.toLowerCase().includes(q);
        if (!matchQuery) return false;
      }
      // Status filter
      if (contactStatusFilter !== "all") {
        const itemStatus = c.status || "New";
        if (itemStatus.toLowerCase() !== contactStatusFilter.toLowerCase()) return false;
      }
      return true;
    });
  }, [contactsList, contactSearchQuery, contactStatusFilter]);

  // Export Webinar Leads CSV
  const handleExportCsv = () => {
    if (filteredLeads.length === 0) return;
    const headers = ["ID", "Status", "Webinar ID", "Name", "Phone", "Email", "Interest", "Experience", "Registered At"];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.status || "New"}"`,
      `"${l.webinar_id || ""}"`,
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${l.phone || ""}"`,
      `"${l.email || ""}"`,
      `"${l.interest || ""}"`,
      `"${l.experience || ""}"`,
      `"${l.created_at || ""}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bluetick-webinar-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Contact Desk Inquiries CSV
  const handleExportContactsCsv = () => {
    if (filteredContacts.length === 0) return;
    const headers = ["ID", "Status", "Student Name", "Mobile Phone", "Email Address", "Subject Topic", "Message", "Source URL", "Received At"];
    const rows = filteredContacts.map((c) => [
      c.id,
      `"${c.status || "New"}"`,
      `"${(c.name || "").replace(/"/g, '""')}"`,
      `"${c.phone || ""}"`,
      `"${c.email || ""}"`,
      `"${(c.subject_topic || "").replace(/"/g, '""')}"`,
      `"${(c.message || "").replace(/"/g, '""')}"`,
      `"${c.source_url || "/contact"}"`,
      `"${c.created_at || ""}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bluetick-contact-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save Profile Changes
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg(null);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar_url: editAvatar,
          designation: editDesignation,
          bio: editBio,
          tg_chat_id: editTgChatId || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setProfileMsg({ type: "error", text: data.error || "Failed to update profile." });
        return;
      }

      setProfileMsg({ type: "success", text: "Profile details updated successfully!" });
      setProfile((prev) => ({
        ...prev,
        avatarUrl: editAvatar || prev.avatarUrl,
        designation: editDesignation || prev.designation,
        bio: editBio || prev.bio,
        tgChatId: editTgChatId || prev.tgChatId,
      }));
    } catch {
      setProfileMsg({ type: "error", text: "Network error saving profile." });
    } finally {
      setProfileLoading(false);
    }
  };

  // Password OTP Request
  const handleRequestPasswordOtp = async () => {
    setPasswordLoading(true);
    setPasswordMsg(null);

    try {
      const res = await fetch("/api/admin/otp-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: profile.username }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setPasswordMsg({ type: "error", text: data.error || "Failed to dispatch passcode." });
        return;
      }

      setPasswordMsg({ type: "success", text: data.message || "Passcode dispatched to your Telegram!" });
      setPasswordStep("verify");
    } catch {
      setPasswordMsg({ type: "error", text: "Network error requesting passcode." });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Password Commit
  const handleCommitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMsg(null);

    if (newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "Password must be at least 6 characters long." });
      setPasswordLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Password confirmation does not match." });
      setPasswordLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: profile.username,
          otp: pwdOtp,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setPasswordMsg({ type: "error", text: data.error || "Failed to update password." });
        return;
      }

      setPasswordMsg({ type: "success", text: "Password updated successfully!" });
      setPwdOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordStep("request");
    } catch {
      setPasswordMsg({ type: "error", text: "Network error saving password." });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Send Test Telegram Alert
  const handleSendTestAlert = async () => {
    setTestMsgLoading(true);
    setTestMsgSuccess(null);
    try {
      const res = await fetch("/api/admin/otp-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: profile.username }),
      });
      const data = await res.json();
      if (data.success) {
        setTestMsgSuccess("Test alert dispatched! Check your Telegram.");
      } else {
        setTestMsgSuccess("Failed: " + (data.error || "Could not send alert."));
      }
    } catch {
      setTestMsgSuccess("Network error sending test alert.");
    } finally {
      setTestMsgLoading(false);
    }
  };

  const isSuperAdmin = profile.role === "super_admin";

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col lg:flex-row antialiased">
      {/* ─────────────────────────────────────────────────────────────
          1. MODERN MATERIAL 3 / SHADCN SIDEBAR (Dark Teal Brand Theme)
      ────────────────────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#082126] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative h-9 w-32">
                <Image
                  src="/brand/logo-wide.png"
                  alt="Blue Tick Trading School"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#2FFFB9] animate-pulse" />
            <span className="text-slate-300 font-medium">Production Admin</span>
            <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#2FFFB9]/10 text-[#2FFFB9] border border-[#2FFFB9]/20">
              v2.0
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Core CRM & Operations
            </div>

            <button
              onClick={() => {
                setActiveTab("crm");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "crm"
                  ? "bg-[#0E3B43] text-[#2FFFB9] shadow-sm border border-[#2FFFB9]/30 font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Webinar Registrants</span>
              <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-slate-200">
                {leadsList.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("contacts");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "contacts"
                  ? "bg-[#0E3B43] text-[#2FFFB9] shadow-sm border border-[#2FFFB9]/30 font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Inquiries</span>
              <div className="ml-auto flex items-center gap-1.5">
                {contactsList.filter((c) => (c.status || "New").toLowerCase() === "new").length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-500 text-[#082126] font-extrabold animate-pulse">
                    {contactsList.filter((c) => (c.status || "New").toLowerCase() === "new").length} NEW
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-slate-200">
                  {contactsList.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab("webinars");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "webinars"
                  ? "bg-[#0E3B43] text-[#2FFFB9] shadow-sm border border-[#2FFFB9]/30 font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Webinar Campaigns</span>
              <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] bg-[#2FFFB9]/20 text-[#2FFFB9] font-mono">
                {webinarList.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("profile");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "profile"
                  ? "bg-[#0E3B43] text-[#2FFFB9] shadow-sm border border-[#2FFFB9]/30 font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Admin Profile & Team</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("security");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "security"
                  ? "bg-[#0E3B43] text-[#2FFFB9] shadow-sm border border-[#2FFFB9]/30 font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Password & Security</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("system");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "system"
                  ? "bg-[#0E3B43] text-[#2FFFB9] shadow-sm border border-[#2FFFB9]/30 font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Server className="w-4 h-4" />
              <span>System Health & Logs</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: Active User & Logout */}
        <div className="p-4 border-t border-white/10 bg-black/20 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#10505C] border border-[#2FFFB9]/30 flex items-center justify-center text-sm font-bold text-[#2FFFB9] shrink-0">
              {profile.avatarUrl ? (
                <Image src={profile.avatarUrl} alt={profile.displayName} fill unoptimized className="object-cover" />
              ) : (
                profile.displayName.slice(0, 1)
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-white block truncate">{profile.displayName}</span>
              <span className="text-[11px] text-[#2FFFB9] font-mono block truncate">
                {isSuperAdmin ? "★ Super Admin" : "Lead Admin"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 2-Layer Match
            </span>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT AREA (Shadcn + Material 3 Surfaces)
      ────────────────────────────────────────────────────────────── */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Sticky App Bar Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span>Admin</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#0E3B43] font-bold capitalize">
                  {activeTab === "crm"
                    ? "Webinar Registrants CRM"
                    : activeTab === "contacts"
                    ? "Student Contact Desk"
                    : activeTab === "webinars"
                    ? "Webinar Campaigns"
                    : activeTab === "profile"
                    ? "Admin Profile & Team"
                    : activeTab === "security"
                    ? "Security & Passwords"
                    : "System Status"}
                </span>
              </div>
              <h1 className="text-lg font-black text-[#0E3B43] tracking-tight">
                {activeTab === "crm"
                  ? "Webinar Registration Engine"
                  : activeTab === "contacts"
                  ? "Student Counseling & Inquiries"
                  : activeTab === "webinars"
                  ? "Masterclass Campaigns & Funnels"
                  : activeTab === "profile"
                  ? "Administrator Profile"
                  : activeTab === "security"
                  ? "Security Controls & OTP"
                  : "Platform Infrastructure"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Telegram Bot: Active</span>
            </div>

            <button
              onClick={handleSendTestAlert}
              disabled={testMsgLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all disabled:opacity-60 border border-slate-200"
              title="Dispatches a live test alert to your Telegram account"
            >
              {testMsgLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5 text-[#0E3B43]" />
              )}
              <span className="hidden sm:inline">Test Telegram DM</span>
            </button>
          </div>
        </header>

        {testMsgSuccess && (
          <div className="mx-4 sm:mx-8 mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{testMsgSuccess}</span>
            </div>
            <button onClick={() => setTestMsgSuccess(null)} className="p-1 text-emerald-600 hover:text-emerald-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dynamic Main Workspace */}
        <main className="p-4 sm:p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
          {/* ─────────────────────────────────────────────────────────
              TAB 1: LEADS & INQUIRIES CRM
          ────────────────────────────────────────────────────────── */}
          {activeTab === "crm" && (
            <div className="space-y-6">
              {/* Material 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Total Captured Leads
                    </span>
                    <span className="text-2xl font-black text-[#0E3B43]">{totalLeads}</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Security Engine
                    </span>
                    <span className="text-sm font-bold text-emerald-700 block">Access Control Active</span>
                    <span className="text-[11px] text-slate-400">Security Layer Enforced</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Active Campaign
                    </span>
                    <span className="text-sm font-bold text-sky-800 block">Time-Cycle Masterclass</span>
                    <span className="text-[11px] text-slate-400">Auto-Followup Ready</span>
                  </div>
                </div>
              </div>

              {/* Webinar Registrations CRM Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4">
                {/* Multi-Criteria Filter Bar */}
                <div className="p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Search input */}
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search registrant name, phone, email..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E3B43] placeholder-slate-400 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Middle: Webinar Cohort Filter & Status Filter Chips */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Webinar Dropdown */}
                    <div className="flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <select
                        value={webinarFilter}
                        onChange={(e) => setWebinarFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0E3B43]"
                      >
                        <option value="all">All Webinars ({leadsList.length})</option>
                        {webinarList.map((w) => (
                          <option key={w.id} value={String(w.id)}>
                            {w.title.length > 35 ? `${w.title.slice(0, 35)}...` : w.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status Filter Chips */}
                    <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
                      <button
                        onClick={() => setStatusFilter("all")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          statusFilter === "all"
                            ? "bg-white text-[#0E3B43] shadow-xs"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        All ({leadsList.length})
                      </button>
                      <button
                        onClick={() => setStatusFilter("New")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                          statusFilter === "New"
                            ? "bg-emerald-500 text-[#082126] shadow-xs"
                            : "text-emerald-700 hover:text-emerald-900"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse" />
                        <span>New ({leadsList.filter((l) => (l.status || "New").toLowerCase() === "new").length})</span>
                      </button>
                      <button
                        onClick={() => setStatusFilter("Responded")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          statusFilter === "Responded"
                            ? "bg-white text-slate-700 shadow-xs"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        Responded ({leadsList.filter((l) => (l.status || "New").toLowerCase() === "responded").length})
                      </button>
                    </div>
                  </div>

                  {/* Right: Export Button */}
                  <button
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0E3B43] hover:bg-[#10505C] text-white text-xs font-bold transition-all shadow-xs shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>

                {/* Table Data */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600">
                        <th className="py-3 px-4 font-bold">ID</th>
                        <th className="py-3 px-4 font-bold">Status</th>
                        <th className="py-3 px-4 font-bold">Student Name</th>
                        <th className="py-3 px-4 font-bold">Mobile Number</th>
                        <th className="py-3 px-4 font-bold">Email Address</th>
                        <th className="py-3 px-4 font-bold">Webinar Target</th>
                        <th className="py-3 px-4 font-bold">Registered At</th>
                        <th className="py-3 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-slate-400">
                            No registrant records matching current filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((l) => {
                          const isNew = (l.status || "New").toLowerCase() === "new";
                          const targetWebinar = l.webinar_id
                            ? webinarList.find((w) => w.id === l.webinar_id)
                            : null;

                          return (
                            <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3.5 px-4 font-mono text-slate-400">#{l.id}</td>
                              <td className="py-3.5 px-4">
                                {isNew ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[10px] tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    NEW
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-bold text-[10px]">
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    RESPONDED
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 font-extrabold text-[#0E3B43]">{l.name}</td>
                              <td className="py-3.5 px-4 font-mono text-slate-700">
                                <a
                                  href={`https://wa.me/${l.phone.replace(/[^0-9]/g, "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[#0E3B43] hover:text-emerald-600 font-semibold"
                                  title="Open WhatsApp Chat"
                                >
                                  <Smartphone className="w-3 h-3 text-slate-400" />
                                  <span>{l.phone}</span>
                                </a>
                              </td>
                              <td className="py-3.5 px-4 text-slate-600">
                                <a
                                  href={`mailto:${l.email}`}
                                  className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0E3B43]"
                                >
                                  <Mail className="w-3 h-3 text-slate-400" />
                                  <span>{l.email}</span>
                                </a>
                              </td>
                              <td className="py-3.5 px-4">
                                {targetWebinar ? (
                                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0E3B43]/5 text-[#0E3B43] font-semibold text-[11px] border border-[#0E3B43]/10 truncate max-w-[180px]">
                                    {targetWebinar.title}
                                  </span>
                                ) : (
                                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium text-[11px]">
                                    {l.interest || "Time Cycle Masterclass"}
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 text-slate-400">
                                <span className="inline-flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-slate-400" />
                                  {l.created_at
                                    ? new Date(l.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                                    : "Recent"}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* 1-Click Status Toggle */}
                                  <button
                                    onClick={() => handleToggleLeadStatus(Number(l.id), l.status)}
                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all border ${
                                      isNew
                                        ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200"
                                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"
                                    }`}
                                    title={isNew ? "Click to mark as Responded" : "Click to mark as New"}
                                  >
                                    <Check className="w-3 h-3" />
                                    <span>{isNew ? "Mark Responded" : "Mark as New"}</span>
                                  </button>

                                  <button
                                    onClick={() => setSelectedLead(l)}
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 hover:bg-[#0E3B43] hover:text-white text-slate-700 text-[10px] font-bold transition-all"
                                  >
                                    <Eye className="w-3 h-3" />
                                    <span>View</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Showing <strong>{filteredLeads.length}</strong> of <strong>{leadsList.length}</strong> webinar registrants
                  </span>
                  <span>Real-time database synchronization active</span>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────
              TAB: CONTACT INQUIRIES DESK (Dedicated Tab)
          ────────────────────────────────────────────────────────── */}
          {activeTab === "contacts" && (
            <div className="space-y-6">
              {/* Material 3 Metric Cards for Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Total Contact Inquiries
                    </span>
                    <span className="text-2xl font-black text-[#0E3B43]">{contactsList.length}</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Pending Follow-up
                    </span>
                    <span className="text-2xl font-black text-emerald-600">
                      {contactsList.filter((c) => (c.status || "New").toLowerCase() === "new").length}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Responded / Resolved
                    </span>
                    <span className="text-2xl font-black text-sky-800">
                      {contactsList.filter((c) => (c.status || "New").toLowerCase() === "responded").length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Inquiries Table Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4">
                {/* Search & Filter Bar */}
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={contactSearchQuery}
                      onChange={(e) => setContactSearchQuery(e.target.value)}
                      placeholder="Search student name, phone, email, message..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E3B43] placeholder-slate-400 transition-all"
                    />
                    {contactSearchQuery && (
                      <button
                        onClick={() => setContactSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Status Chips */}
                    <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
                      <button
                        onClick={() => setContactStatusFilter("all")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          contactStatusFilter === "all"
                            ? "bg-white text-[#0E3B43] shadow-xs"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        All ({contactsList.length})
                      </button>
                      <button
                        onClick={() => setContactStatusFilter("New")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                          contactStatusFilter === "New"
                            ? "bg-emerald-500 text-[#082126] shadow-xs"
                            : "text-emerald-700 hover:text-emerald-900"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse" />
                        <span>New ({contactsList.filter((c) => (c.status || "New").toLowerCase() === "new").length})</span>
                      </button>
                      <button
                        onClick={() => setContactStatusFilter("Responded")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          contactStatusFilter === "Responded"
                            ? "bg-white text-slate-700 shadow-xs"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        Responded ({contactsList.filter((c) => (c.status || "New").toLowerCase() === "responded").length})
                      </button>
                    </div>

                    <button
                      onClick={handleExportContactsCsv}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0E3B43] hover:bg-[#10505C] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Contacts Table Data */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600">
                        <th className="py-3 px-4 font-bold">ID</th>
                        <th className="py-3 px-4 font-bold">Status</th>
                        <th className="py-3 px-4 font-bold">Student Name</th>
                        <th className="py-3 px-4 font-bold">Mobile Phone</th>
                        <th className="py-3 px-4 font-bold">Email Address</th>
                        <th className="py-3 px-4 font-bold">Subject / Topic</th>
                        <th className="py-3 px-4 font-bold">Message Preview</th>
                        <th className="py-3 px-4 font-bold">Received At</th>
                        <th className="py-3 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredContacts.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="py-12 text-center text-slate-400">
                            No contact inquiries matching current filters.
                          </td>
                        </tr>
                      ) : (
                        filteredContacts.map((c) => {
                          const isNew = (c.status || "New").toLowerCase() === "new";

                          return (
                            <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3.5 px-4 font-mono text-slate-400">#{c.id}</td>
                              <td className="py-3.5 px-4">
                                {isNew ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[10px] tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    NEW
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-bold text-[10px]">
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    RESPONDED
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 font-extrabold text-[#0E3B43]">{c.name}</td>
                              <td className="py-3.5 px-4 font-mono text-slate-700">
                                <a
                                  href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[#0E3B43] hover:text-emerald-600 font-semibold"
                                  title="Open WhatsApp Chat"
                                >
                                  <Smartphone className="w-3 h-3 text-slate-400" />
                                  <span>{c.phone}</span>
                                </a>
                              </td>
                              <td className="py-3.5 px-4 text-slate-600">
                                <a
                                  href={`mailto:${c.email}`}
                                  className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0E3B43]"
                                >
                                  <Mail className="w-3 h-3 text-slate-400" />
                                  <span>{c.email}</span>
                                </a>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0E3B43]/5 text-[#0E3B43] font-semibold text-[11px] border border-[#0E3B43]/10">
                                  {c.subject_topic || "General Counseling"}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-600 max-w-[200px] truncate">
                                {c.message || "-"}
                              </td>
                              <td className="py-3.5 px-4 text-slate-400">
                                <span className="inline-flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-slate-400" />
                                  {c.created_at
                                    ? new Date(c.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                                    : "Recent"}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* 1-Click Status Toggle */}
                                  <button
                                    onClick={() => handleToggleContactStatus(Number(c.id), c.status)}
                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all border ${
                                      isNew
                                        ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200"
                                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"
                                    }`}
                                    title={isNew ? "Click to mark as Responded" : "Click to mark as New"}
                                  >
                                    <Check className="w-3 h-3" />
                                    <span>{isNew ? "Mark Responded" : "Mark as New"}</span>
                                  </button>

                                  <button
                                    onClick={() => setSelectedContact(c)}
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 hover:bg-[#0E3B43] hover:text-white text-slate-700 text-[10px] font-bold transition-all"
                                  >
                                    <Eye className="w-3 h-3" />
                                    <span>View</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Showing <strong>{filteredContacts.length}</strong> of <strong>{contactsList.length}</strong> contact inquiries
                  </span>
                  <span>Real-time database synchronization active</span>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────
              TAB 3: WEBINAR CAMPAIGNS & FUNNELS
          ────────────────────────────────────────────────────────── */}
          {activeTab === "webinars" && (
            <div className="space-y-6">
              {/* Material 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center shrink-0">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Total Campaigns
                    </span>
                    <span className="text-2xl font-black text-[#0E3B43]">{webinarList.length}</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Active Funnels
                    </span>
                    <span className="text-2xl font-black text-emerald-600">
                      {webinarList.filter((w) => w.is_active === 1).length}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#0E3B43] border border-cyan-100 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Total Registrants
                    </span>
                    <span className="text-2xl font-black text-[#0E3B43]">
                      {webinarList.reduce((acc, curr) => acc + (curr.registrant_count || 0), 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Webinars Table & Actions Bar */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-extrabold text-[#0E3B43]">Masterclass Schedule & Landing Pages</h2>
                    <p className="text-xs text-slate-500">
                      Manage live market masterclasses, update schedules, and toggle public registration pages.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenCreateWebinar}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E3B43] hover:bg-[#10505C] text-[#2FFFB9] text-xs font-bold transition-all shadow-sm shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Schedule Masterclass</span>
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-4">Banner & Masterclass</th>
                        <th className="py-3 px-4">URL Slug & Preview</th>
                        <th className="py-3 px-4">Schedule Date & Time</th>
                        <th className="py-3 px-4">Capacity & Registrants</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                      {webinarList.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            No masterclass campaigns created yet. Click "+ Schedule Masterclass" to launch one.
                          </td>
                        </tr>
                      ) : (
                        webinarList.map((w) => {
                          const currentStatus = (w.status as any) || (w.is_active ? "published" : "draft");
                          const maxSeats = w.max_seats || 500;
                          const regCount = w.registrant_count || 0;
                          const percentFilled = Math.min(100, Math.round((regCount / maxSeats) * 100));

                          return (
                            <tr key={w.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                    <Image
                                      src={w.banner_image_url || "/images/traderoom/time-cycle-trading.jpg"}
                                      alt={w.title}
                                      fill
                                      unoptimized
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-bold text-[#0E3B43] line-clamp-1">{w.title}</div>
                                    {w.subtitle && (
                                      <div className="text-[11px] text-slate-400 line-clamp-1">{w.subtitle}</div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[11px] text-slate-600 truncate max-w-[120px]">
                                    /{w.slug}
                                  </span>
                                  <Link
                                    href={`/webinars/${w.slug}?preview=true`}
                                    target="_blank"
                                    title="Open preview mode"
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0E3B43]/5 hover:bg-[#0E3B43]/10 text-[#0E3B43] text-[10px] font-bold transition-colors"
                                  >
                                    <Eye className="w-3 h-3" />
                                    <span>Preview</span>
                                  </Link>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span>{w.date_time}</span>
                                </div>
                                <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3" />
                                  <span>{w.duration_minutes || 90} mins</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="space-y-1 w-32">
                                  <div className="flex items-center justify-between text-[11px]">
                                    <span className="font-bold text-[#0E3B43]">{regCount}</span>
                                    <span className="text-slate-400 font-normal">/ {maxSeats} Seats</span>
                                  </div>
                                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${
                                        percentFilled >= 90
                                          ? "bg-rose-500"
                                          : percentFilled >= 70
                                          ? "bg-amber-500"
                                          : "bg-[#2FFFB9]"
                                      }`}
                                      style={{ width: `${percentFilled}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <select
                                  value={currentStatus}
                                  onChange={(e) =>
                                    handleUpdateStatus(
                                      w,
                                      e.target.value as "draft" | "published" | "archived"
                                    )
                                  }
                                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                                    currentStatus === "published"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                      : currentStatus === "draft"
                                      ? "bg-amber-50 text-amber-700 border-amber-300"
                                      : "bg-slate-100 text-slate-500 border-slate-300"
                                  }`}
                                >
                                  <option value="draft">Draft (Private)</option>
                                  <option value="published">Published (Live)</option>
                                  <option value="archived">Archived (Closed)</option>
                                </select>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="inline-flex items-center gap-1.5 justify-end">
                                  <button
                                    onClick={() => handleOpenEditWebinar(w)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteWebinar(w.id)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                    title="Delete Masterclass"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Total Registered Funnels: <strong>{webinarList.length}</strong>
                  </span>
                  <span className="text-[11px]">Live campaign synchronization active</span>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────
              TAB 3: ADMIN PROFILE & TEAM
          ────────────────────────────────────────────────────────── */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Profile Overview Card */}
              <div className="bg-gradient-to-br from-[#0E3B43] to-[#082126] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#2FFFB9]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start sm:items-center gap-5">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#10505C] border-2 border-[#2FFFB9]/40 shadow-lg flex-shrink-0 flex items-center justify-center text-2xl font-bold text-[#2FFFB9]">
                      {profile.avatarUrl ? (
                        <Image src={profile.avatarUrl} alt={profile.displayName} fill unoptimized className="object-cover" />
                      ) : (
                        profile.displayName.slice(0, 1)
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="text-2xl font-extrabold text-white tracking-tight">{profile.displayName}</h2>
                        <span
                          className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                            isSuperAdmin
                              ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                              : "bg-[#2FFFB9]/15 text-[#2FFFB9] border-[#2FFFB9]/30"
                          }`}
                        >
                          {isSuperAdmin ? "★ Super Admin" : "Lead Mentor Admin"}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          2-Layer Whitelist Verified
                        </span>
                      </div>

                      <p className="text-sm text-[#2FFFB9] font-medium">{profile.designation}</p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                        <span className="inline-flex items-center gap-1.5 font-mono">
                          <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                          {profile.mobile}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          Username: <strong className="text-white font-mono">{profile.username}</strong>
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[#2FFFB9]">
                          Telegram Alerts: {profile.tgChatId ? "Configured & Active ✓" : "Channel Broadcast"}
                        </span>
                      </div>

                      {profile.bio && (
                        <p className="text-xs text-slate-400 max-w-2xl pt-1 leading-relaxed">{profile.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Form */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-extrabold text-[#0E3B43]">Edit Profile Information</h3>
                  <p className="text-xs text-slate-500">Update your avatar URL, designation, bio, and Telegram Chat ID</p>
                </div>

                {profileMsg && (
                  <div
                    className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                      profileMsg.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-rose-50 text-rose-800 border border-rose-200"
                    }`}
                  >
                    {profileMsg.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    )}
                    <span>{profileMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">Avatar Image URL</label>
                      <input
                        type="text"
                        value={editAvatar}
                        onChange={(e) => setEditAvatar(e.target.value)}
                        placeholder="/brand/avatar-deepak.png or https://..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E3B43]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">Designation Title</label>
                      <input
                        type="text"
                        value={editDesignation}
                        onChange={(e) => setEditDesignation(e.target.value)}
                        placeholder="Platform Architect & Super Admin"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E3B43]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider block">
                      Personal Telegram Chat ID (For Direct 1-on-1 Passcode Delivery)
                    </label>
                    <input
                      type="text"
                      value={editTgChatId}
                      onChange={(e) => setEditTgChatId(e.target.value)}
                      placeholder={profile.tgChatId ? "Configured (Already Linked)" : "e.g. 854912304"}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E3B43]"
                    />
                    <p className="text-[11px] text-slate-400">
                      Connect with the administrative notification bot on Telegram to activate private 1-on-1 direct delivery.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider block">Biography Summary</label>
                    <textarea
                      rows={3}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      placeholder="Brief summary of responsibilities and market background..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E3B43]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E3B43] hover:bg-[#10505C] text-white text-xs font-bold transition-all shadow-xs disabled:opacity-60"
                    >
                      {profileLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>Save Profile Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────
              TAB 3: PASSWORD & SECURITY CONTROLS
          ────────────────────────────────────────────────────────── */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 max-w-2xl">
                <div>
                  <h3 className="text-base font-extrabold text-[#0E3B43]">Password &amp; Two-Factor Authentication</h3>
                  <p className="text-xs text-slate-500">
                    To maintain strict security, updating your password requires a one-time verification passcode delivered to your Telegram account.
                  </p>
                </div>

                {passwordMsg && (
                  <div
                    className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                      passwordMsg.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-rose-50 text-rose-800 border border-rose-200"
                    }`}
                  >
                    {passwordMsg.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    )}
                    <span>{passwordMsg.text}</span>
                  </div>
                )}

                {passwordStep === "request" ? (
                  <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-500 block">Target Administrator:</span>
                      <strong className="text-slate-900">{profile.displayName} ({profile.username})</strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-500 block">Delivery Channel:</span>
                      <strong className="text-[#0E3B43] font-mono">
                        {profile.tgChatId ? "Authorized Direct Channel" : "Authorized Broadcast Channel"}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={handleRequestPasswordOtp}
                      disabled={passwordLoading}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E3B43] hover:bg-[#10505C] text-white text-xs font-bold transition-all shadow-xs disabled:opacity-60"
                    >
                      {passwordLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Dispatching Telegram Passcode...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Request Verification Code to Telegram</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCommitPassword} className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">
                        6-Digit Telegram Passcode
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={pwdOtp}
                        onChange={(e) => setPwdOtp(e.target.value.replace(/[^0-9]/g, ""))}
                        placeholder="••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono tracking-[0.4em] text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#0E3B43]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">
                        New Password (min 6 characters)
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E3B43]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E3B43]"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setPasswordStep("request")}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold"
                      >
                        Resend Code
                      </button>
                      <button
                        type="submit"
                        disabled={passwordLoading || pwdOtp.length !== 6 || newPassword.length < 6}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E3B43] hover:bg-[#10505C] text-white text-xs font-bold transition-all shadow-xs disabled:opacity-60"
                      >
                        {passwordLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                        <span>Save New Password</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────
              TAB 4: SYSTEM HEALTH & LOGS
          ────────────────────────────────────────────────────────── */}
          {activeTab === "system" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Database Engine</h3>
                      <span className="text-xs text-slate-400">Node Native SQLite3 Engine</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Storage Status:</span>
                      <span className="font-mono font-semibold text-emerald-600">Online &amp; Protected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Registered Leads:</span>
                      <span className="font-bold text-[#0E3B43]">{totalLeads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Schema Health:</span>
                      <span className="font-semibold text-emerald-600">Active &amp; Verified</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Notification Engine</h3>
                      <span className="text-xs text-slate-400">Encrypted Gateway</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Bot Gateway:</span>
                      <span className="font-bold text-emerald-600">Connected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Broadcast Channel:</span>
                      <span className="font-semibold text-emerald-600">Configured &amp; Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Administrative Direct Alerts:</span>
                      <span className="font-semibold text-emerald-600">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. LEAD DETAIL MODAL (Shadcn Dialog)
      ────────────────────────────────────────────────────────────── */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 text-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center font-bold text-xs">
                  #{selectedLead.id}
                </div>
                <h3 className="font-extrabold text-base text-[#0E3B43]">Lead Inquiry Dossier</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[11px]">Full Name:</span>
                  <strong className="text-sm font-bold text-[#0E3B43]">{selectedLead.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Registered Date:</span>
                  <span className="font-medium text-slate-700">
                    {selectedLead.created_at
                      ? new Date(selectedLead.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                      : "Recent"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400">Mobile Phone:</span>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="font-mono font-bold text-[#0E3B43] hover:underline"
                  >
                    {selectedLead.phone}
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400">Email Address:</span>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="font-medium text-[#0E3B43] hover:underline"
                  >
                    {selectedLead.email}
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400">Trading Experience:</span>
                  <span className="font-semibold text-slate-700">{selectedLead.experience || "Not Specified"}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400">Selected Subject / Segment:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0E3B43]/10 text-[#0E3B43] font-bold">
                    {selectedLead.interest || "Time Cycle Masterclass"}
                  </span>
                </div>
              </div>

              {selectedLead.message && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Student Query Message:
                  </span>
                  <p className="text-slate-700 leading-relaxed">{selectedLead.message}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0E3B43] hover:bg-[#10505C] text-white text-xs font-bold transition-all shadow-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          CONTACT INQUIRY DOSSIER MODAL
      ────────────────────────────────────────────────────────────── */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 text-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center font-bold text-xs">
                  #{selectedContact.id}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#0E3B43]">Contact Desk Inquiry</h3>
                  <span className="text-[11px] text-slate-400">Student Counseling Message</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[11px]">Full Name:</span>
                  <strong className="text-sm font-bold text-[#0E3B43]">{selectedContact.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Received Date:</span>
                  <span className="font-medium text-slate-700">
                    {selectedContact.created_at
                      ? new Date(selectedContact.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                      : "Recent"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400">Status:</span>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      (selectedContact.status || "New").toLowerCase() === "new"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}>
                      {(selectedContact.status || "New").toUpperCase()}
                    </span>
                    <button
                      onClick={() => handleToggleContactStatus(selectedContact.id, selectedContact.status)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold border border-slate-200"
                    >
                      Toggle
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400">Mobile Phone:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="font-mono font-bold text-[#0E3B43] hover:underline"
                    >
                      {selectedContact.phone}
                    </a>
                    <a
                      href={`https://wa.me/${selectedContact.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-[#082126] font-bold text-[10px] transition-all"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400">Email Address:</span>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="font-medium text-[#0E3B43] hover:underline"
                  >
                    {selectedContact.email}
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400">Inquiry Subject / Topic:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0E3B43]/10 text-[#0E3B43] font-bold">
                    {selectedContact.subject_topic || "General Counseling"}
                  </span>
                </div>
              </div>

              {selectedContact.message && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Student Inquiry Message:
                  </span>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0E3B43] hover:bg-[#10505C] text-white text-xs font-bold transition-all shadow-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: MASTERCLASS CAMPAIGN CREATE & EDIT (Stepped Mockup Inspired)
      ────────────────────────────────────────────────────────────── */}
      {showWebinarModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row my-auto max-h-[94vh] animate-in fade-in zoom-in-95">
            {/* Left Branding Panel (Desktop Only) */}
            <div className="hidden lg:flex w-72 shrink-0 bg-gradient-to-b from-[#0E3B43] via-[#0c3138] to-[#082126] text-white p-7 flex-col justify-between relative overflow-hidden select-none">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#2FFFB9]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 left-0 w-40 h-40 bg-[#C5FF7C]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Top Branding Pill */}
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold text-[#2FFFB9]">
                  <Sparkles className="w-3.5 h-3.5 text-[#2FFFB9]" />
                  <span>BlueTick Masterclass Studio</span>
                </div>

                {/* Floating 3D/Glass Graphics */}
                <div className="space-y-4 py-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#10505C] to-[#2FFFB9]/30 border border-[#2FFFB9]/40 flex items-center justify-center shadow-lg shadow-black/20">
                    <Video className="w-7 h-7 text-[#2FFFB9]" />
                  </div>

                  <h2 className="text-2xl font-black text-white leading-tight tracking-tight">
                    Create impactful <br />
                    <span className="text-[#2FFFB9]">masterclasses</span>
                  </h2>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Update the essential details to keep your audience informed, optimize attendance, and maximize enrollment conversions.
                  </p>
                </div>

                {/* Visual Feature Badges */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-[#2FFFB9]" />
                    <span>Aspect Ratio 800×400px (2:1)</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-[#C5FF7C]" />
                    <span>Instant Telegram Notifications</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-sky-400" />
                    <span>Live Seat Allocation Counter</span>
                  </div>
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="relative z-10 pt-6 border-t border-white/10">
                <p className="text-xs font-serif italic text-emerald-200 tracking-wider">
                  &ldquo;Educate &bull; Engage &bull; Grow&rdquo;
                </p>
                <span className="text-[10px] text-slate-400 block mt-1">
                  BlueTick Trading Institutional Platform
                </span>
              </div>
            </div>

            {/* Main Form Workspace */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-hidden">
              {/* Header Bar */}
              <div className="p-4 sm:p-5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowWebinarModal(false);
                      setEditingWebinarId(null);
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Close"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="w-9 h-9 rounded-xl bg-[#0E3B43]/10 text-[#0E3B43] flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4 text-[#0E3B43]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[#0E3B43] tracking-tight">
                      {editingWebinarId ? "Edit Masterclass Campaign" : "Schedule Masterclass Campaign"}
                    </h3>
                    <p className="text-[11px] text-slate-400 hidden sm:block">
                      Update your landing page details, curriculum highlights, and schedule.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Status Dropdown Pill */}
                  <div className="relative">
                    <select
                      value={webinarForm.status}
                      onChange={(e) => {
                        const newStat = e.target.value as "draft" | "published" | "archived";
                        setWebinarForm({
                          ...webinarForm,
                          status: newStat,
                          is_active: newStat === "published" ? 1 : 0,
                        });
                      }}
                      className={`text-xs font-bold pl-3 pr-8 py-1.5 rounded-full border cursor-pointer focus:outline-none appearance-none transition-all ${
                        webinarForm.status === "published"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : webinarForm.status === "draft"
                          ? "bg-amber-50 text-amber-700 border-amber-300"
                          : "bg-slate-100 text-slate-600 border-slate-300"
                      }`}
                    >
                      <option value="published">&#9679; Published</option>
                      <option value="draft">&#9679; Draft</option>
                      <option value="archived">&#9679; Archived</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-70" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowWebinarModal(false);
                      setEditingWebinarId(null);
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stepper Navigation */}
              <div className="px-4 sm:px-6 py-3 bg-white border-b border-slate-100 shrink-0">
                <div className="flex items-center justify-between max-w-xl mx-auto">
                  {[
                    { step: 1 as const, label: "Basic Info", id: "card-1-banner" },
                    { step: 2 as const, label: "Schedule", id: "card-3-schedule" },
                    { step: 3 as const, label: "Content", id: "card-4-description" },
                    { step: 4 as const, label: "Review", id: "card-review" },
                  ].map((s, idx) => {
                    const isActive = modalStep === s.step;
                    const isPassed = modalStep > s.step;
                    return (
                      <React.Fragment key={s.step}>
                        {idx > 0 && (
                          <div
                            className={`flex-1 h-0.5 mx-2 sm:mx-3 transition-colors ${
                              isPassed ? "bg-[#0E3B43]" : "bg-slate-200"
                            }`}
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setModalStep(s.step);
                            if (s.step !== 4) {
                              setTimeout(() => {
                                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                              }, 50);
                            }
                          }}
                          className="flex items-center gap-1.5 focus:outline-none group"
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isActive
                                ? "bg-[#0E3B43] text-[#2FFFB9] shadow-sm ring-2 ring-[#0E3B43]/20"
                                : isPassed
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                            }`}
                          >
                            {isPassed ? <Check className="w-3.5 h-3.5" /> : s.step}
                          </span>
                          <span
                            className={`text-xs font-semibold hidden sm:inline ${
                              isActive
                                ? "text-[#0E3B43] font-bold"
                                : isPassed
                                ? "text-slate-700"
                                : "text-slate-400 group-hover:text-slate-600"
                            }`}
                          >
                            {s.label}
                          </span>
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {webinarMsg && (
                  <div
                    className={`p-3.5 rounded-2xl text-xs flex items-center justify-between ${
                      webinarMsg.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-rose-50 text-rose-800 border border-rose-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {webinarMsg.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>{webinarMsg.text}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWebinarMsg(null)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {modalStep === 4 ? (
                  /* Step 4: Review & Final Confirmation */
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-[#0E3B43]">Review Masterclass Campaign</h4>
                          <p className="text-[11px] text-slate-400">
                            Confirm all details before publishing to public or saving as draft.
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          webinarForm.status === "published"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        Status: {webinarForm.status}
                      </span>
                    </div>

                    {/* Live Preview Card */}
                    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                      <div className="relative aspect-[2/1] w-full max-h-56 overflow-hidden bg-slate-950">
                        <Image
                          src={webinarForm.banner_image_url || "/images/traderoom/time-cycle-trading.jpg"}
                          alt="Preview Banner"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                          800 × 400 Preview
                        </div>
                      </div>

                      <div className="p-5 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-base sm:text-lg font-black text-[#0E3B43]">
                            {webinarForm.title || "Untitled Masterclass"}
                          </h3>
                          <span className="text-xs font-mono text-[#0E3B43] bg-white px-3 py-1 rounded-lg border border-slate-200">
                            /webinars/{webinarForm.slug || "slug"}
                          </span>
                        </div>

                        {webinarForm.subtitle && (
                          <p className="text-xs text-slate-600 leading-relaxed">{webinarForm.subtitle}</p>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs border-t border-slate-200">
                          <div>
                            <span className="text-slate-400 text-[10px] uppercase font-bold block">Date & Time</span>
                            <span className="font-bold text-slate-800">{webinarForm.date_time}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] uppercase font-bold block">Duration</span>
                            <span className="font-bold text-slate-800">{webinarForm.duration_minutes} Mins</span>
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] uppercase font-bold block">Capacity</span>
                            <span className="font-bold text-slate-800">{webinarForm.max_seats} Seats</span>
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] uppercase font-bold block">Curriculum</span>
                            <span className="font-bold text-slate-800">
                              {webinarForm.topics.filter((t) => t.trim().length > 0).length} Takeaways
                            </span>
                          </div>
                        </div>

                        {/* Topics List */}
                        <div className="pt-2 space-y-1.5 border-t border-slate-200">
                          <span className="text-slate-400 text-[10px] uppercase font-bold block">Takeaway Points:</span>
                          <ul className="space-y-1 text-xs text-slate-700">
                            {webinarForm.topics
                              .filter((t) => t.trim().length > 0)
                              .map((t, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E3B43] mt-0.5 shrink-0" />
                                  <span>{t}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons on Review */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setModalStep(1)}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                      >
                        &larr; Back to Edit
                      </button>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          type="button"
                          disabled={webinarLoading}
                          onClick={() => handleSaveWebinar(undefined, "draft")}
                          className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all disabled:opacity-50"
                        >
                          Save as Draft
                        </button>
                        <button
                          type="button"
                          disabled={webinarLoading}
                          onClick={() => handleSaveWebinar(undefined, "published")}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0E3B43] hover:bg-[#10505C] text-[#2FFFB9] font-bold transition-all shadow-md disabled:opacity-50"
                        >
                          {webinarLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                          <span>Publish Masterclass</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Form Cards 1 through 5 */
                  <form id="masterclass-form" onSubmit={(e) => handleSaveWebinar(e)} className="space-y-6 text-xs">
                    {/* CARD 1: BANNER IMAGE */}
                    <div id="card-1-banner" className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-black flex items-center justify-center shrink-0">
                            1
                          </span>
                          <div>
                            <h4 className="text-xs sm:text-sm font-extrabold text-[#0E3B43]">Banner Image</h4>
                            <p className="text-[11px] text-slate-400">Upload a banner for your webinar landing page.</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        {/* Banner Preview (800x400 aspect ratio) */}
                        <div className="relative aspect-[2/1] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group">
                          <Image
                            src={webinarForm.banner_image_url || "/images/traderoom/time-cycle-trading.jpg"}
                            alt="Masterclass Banner"
                            fill
                            unoptimized
                            className="object-cover"
                          />
                          {webinarForm.banner_image_url && (
                            <button
                              type="button"
                              onClick={() => setWebinarForm({ ...webinarForm, banner_image_url: "" })}
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                              title="Remove Banner"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono backdrop-blur-sm">
                            800 &times; 400 (2:1)
                          </div>
                        </div>

                        {/* Upload Box */}
                        <div className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 text-center space-y-2.5">
                          <div className="w-10 h-10 rounded-xl bg-[#0E3B43]/5 text-[#0E3B43] flex items-center justify-center">
                            {uploadingBanner ? (
                              <Loader2 className="w-5 h-5 animate-spin text-[#0E3B43]" />
                            ) : (
                              <Upload className="w-5 h-5 text-[#0E3B43]" />
                            )}
                          </div>

                          <div>
                            <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0E3B43] hover:bg-[#10505C] text-[#2FFFB9] text-xs font-bold cursor-pointer transition-all shadow-xs">
                              <span>{uploadingBanner ? "Uploading..." : "Upload / Change"}</span>
                              <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                className="hidden"
                                disabled={uploadingBanner}
                                onChange={handleBannerUpload}
                              />
                            </label>
                          </div>

                          <div className="space-y-0.5 text-[11px] text-slate-400">
                            <p className="font-semibold text-slate-600">PNG or JPG (Max 5MB)</p>
                            <p>Recommended: 800 &times; 400 px (2:1)</p>
                          </div>

                          <div className="w-full pt-1">
                            <input
                              type="text"
                              value={webinarForm.banner_image_url}
                              onChange={(e) => setWebinarForm({ ...webinarForm, banner_image_url: e.target.value })}
                              placeholder="Or paste image URL (/images/...)"
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px] font-mono text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0E3B43]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CARD 2: CAMPAIGN DETAILS */}
                    <div id="card-2-details" className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-black flex items-center justify-center shrink-0">
                          2
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#0E3B43]">Campaign Details</h4>
                      </div>

                      <div className="space-y-4">
                        {/* Title */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-700">Masterclass Title *</label>
                            <span className="text-[11px] font-mono text-slate-400">{webinarForm.title.length}/120</span>
                          </div>
                          <input
                            type="text"
                            required
                            maxLength={120}
                            value={webinarForm.title}
                            onChange={(e) => {
                              const newTitle = e.target.value;
                              setWebinarForm((prev) => ({
                                ...prev,
                                title: newTitle,
                                slug: !editingWebinarId && !prev.slug
                                  ? newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                                  : prev.slug,
                              }));
                            }}
                            placeholder="e.g. BankNifty, Nifty & MCX Time Cycle Masterclass: Turn Date Forecasting"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E3B43] text-slate-900 font-medium text-xs transition-all"
                          />
                        </div>

                        {/* Slug */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Landing Page Slug (URL path) *</label>
                          <div className="flex items-center">
                            <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-500 font-mono text-xs">
                              /webinars/
                            </span>
                            <input
                              type="text"
                              required
                              value={webinarForm.slug}
                              onChange={(e) =>
                                setWebinarForm({
                                  ...webinarForm,
                                  slug: e.target.value
                                    .toLowerCase()
                                    .replace(/[^a-z0-9-]/g, "-")
                                    .replace(/-+/g, "-"),
                                })
                              }
                              placeholder="live-market-masterclass-pok"
                              className="flex-1 px-3.5 py-2.5 rounded-r-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E3B43] text-slate-900 font-mono text-xs transition-all"
                            />
                          </div>
                          <p className="text-[11px] text-slate-400">This will be used in your landing page URL.</p>
                        </div>

                        {/* Status */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Campaign Status *</label>
                          <div className="relative">
                            <select
                              value={webinarForm.status}
                              onChange={(e) => {
                                const newStat = e.target.value as "draft" | "published" | "archived";
                                setWebinarForm({
                                  ...webinarForm,
                                  status: newStat,
                                  is_active: newStat === "published" ? 1 : 0,
                                });
                              }}
                              className="w-full pl-3.5 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E3B43] text-slate-900 font-semibold text-xs appearance-none transition-all cursor-pointer"
                            >
                              <option value="published">Published (Public Registration Active)</option>
                              <option value="draft">Draft (Private / Under Preparation)</option>
                              <option value="archived">Archived (Registration Closed)</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CARD 3: SCHEDULE & ACCESS */}
                    <div id="card-3-schedule" className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-black flex items-center justify-center shrink-0">
                          3
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#0E3B43]">Schedule & Access</h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Schedule Date & Time */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Schedule Date & Time *</label>
                          <div className="relative">
                            <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                              type="text"
                              required
                              value={webinarForm.date_time}
                              onChange={(e) => setWebinarForm({ ...webinarForm, date_time: e.target.value })}
                              placeholder="Upcoming Saturday, 7:00 PM IST"
                              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E3B43] text-slate-900 font-medium text-xs transition-all"
                            />
                          </div>
                        </div>

                        {/* Duration (Minutes) */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Duration (Minutes) *</label>
                          <div className="space-y-2">
                            <div className="relative">
                              <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                              <input
                                type="number"
                                min={15}
                                max={360}
                                value={webinarForm.duration_minutes}
                                onChange={(e) =>
                                  setWebinarForm({ ...webinarForm, duration_minutes: parseInt(e.target.value) || 90 })
                                }
                                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E3B43] text-slate-900 font-medium text-xs transition-all"
                              />
                            </div>
                            <div className="flex items-center gap-1.5">
                              {[45, 60, 90, 120].map((dur) => (
                                <button
                                  key={dur}
                                  type="button"
                                  onClick={() => setWebinarForm({ ...webinarForm, duration_minutes: dur })}
                                  className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-all ${
                                    webinarForm.duration_minutes === dur
                                      ? "bg-[#0E3B43] text-[#2FFFB9] shadow-xs"
                                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                  }`}
                                >
                                  {dur}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Seat Capacity */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Seat Capacity (Max Attendees) *</label>
                          <div className="relative">
                            <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                              type="number"
                              min={10}
                              max={10000}
                              value={webinarForm.max_seats}
                              onChange={(e) =>
                                setWebinarForm({ ...webinarForm, max_seats: parseInt(e.target.value) || 500 })
                              }
                              placeholder="500"
                              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E3B43] text-slate-900 font-medium text-xs transition-all"
                            />
                          </div>
                        </div>

                        {/* Zoom / Meeting URL */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Zoom / Meeting URL (Optional)</label>
                          <div className="relative">
                            <Video className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                              type="url"
                              value={webinarForm.zoom_join_url}
                              onChange={(e) => setWebinarForm({ ...webinarForm, zoom_join_url: e.target.value })}
                              placeholder="https://zoom.us/j/blueticktrading"
                              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E3B43] text-slate-900 font-medium text-xs transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CARD 4: DESCRIPTION */}
                    <div id="card-4-description" className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-black flex items-center justify-center shrink-0">
                            4
                          </span>
                          <h4 className="text-xs sm:text-sm font-extrabold text-[#0E3B43]">Description</h4>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">{webinarForm.subtitle.length}/200</span>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Subtitle / Hook Description</label>
                        <textarea
                          rows={2}
                          maxLength={200}
                          value={webinarForm.subtitle}
                          onChange={(e) => setWebinarForm({ ...webinarForm, subtitle: e.target.value })}
                          placeholder="Master institutional price-time squaring, anticipate explosive trend turns, and eliminate retail indicators."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E3B43] text-slate-900 font-medium text-xs resize-none transition-all"
                        />
                      </div>
                    </div>

                    {/* CARD 5: CURRICULUM HIGHLIGHTS / TAKEAWAYS */}
                    <div id="card-5-takeaways" className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-black flex items-center justify-center shrink-0">
                            5
                          </span>
                          <h4 className="text-xs sm:text-sm font-extrabold text-[#0E3B43]">Curriculum Highlights / Takeaways</h4>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddTopic}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0E3B43]/5 hover:bg-[#0E3B43]/10 text-[#0E3B43] text-xs font-bold transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {webinarForm.topics.map((topic, index) => (
                          <div key={index} className="flex items-center gap-2 group">
                            <span className="text-slate-300 group-hover:text-slate-500 cursor-grab shrink-0 p-1">
                              <GripVertical className="w-4 h-4" />
                            </span>
                            <input
                              type="text"
                              value={topic}
                              onChange={(e) => handleUpdateTopic(index, e.target.value)}
                              placeholder={`Takeaway ${index + 1} (e.g. Price-Time Squaring Methodology)`}
                              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0E3B43] text-xs font-medium text-slate-800 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveTopic(index)}
                              className="p-2 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                              title="Remove Takeaway"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Sticky Action Footer */}
              {modalStep !== 4 && (
                <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex items-center justify-between shrink-0 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSaveWebinar(undefined, "draft")}
                    disabled={webinarLoading}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors disabled:opacity-50"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                    <span>Save as Draft</span>
                  </button>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setShowWebinarModal(false);
                        setEditingWebinarId(null);
                      }}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!webinarForm.title.trim() || !webinarForm.slug.trim()) {
                          setWebinarMsg({ type: "error", text: "Please provide a Masterclass Title and URL Slug." });
                          return;
                        }
                        setModalStep(4);
                      }}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#0E3B43] hover:bg-[#10505C] text-[#2FFFB9] font-bold text-xs transition-all shadow-md"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
