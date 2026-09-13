import React from "react";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllLeads, getLeadsCount, getAllWebinars, getAllContactInquiries } from "@/lib/db";
import AdminDashboardView from "@/components/admin/AdminDashboardView";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const rawLeads = getAllLeads(500);
  const totalLeads = Number(getLeadsCount());
  const rawWebinars = getAllWebinars();
  const rawContacts = getAllContactInquiries(500);

  // Deep sanitize to plain JSON serializable objects (React 19 / Next.js Server-to-Client rule)
  const cleanLeads = JSON.parse(JSON.stringify(rawLeads));
  const cleanSession = JSON.parse(JSON.stringify(session));
  const cleanWebinars = JSON.parse(JSON.stringify(rawWebinars));
  const cleanContacts = JSON.parse(JSON.stringify(rawContacts));

  return (
    <AdminDashboardView
      session={cleanSession}
      leads={cleanLeads}
      totalLeads={totalLeads}
      webinars={cleanWebinars}
      contacts={cleanContacts}
    />
  );
}

