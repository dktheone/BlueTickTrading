import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getAdminById, updateAdminProfile } from "@/lib/db";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const admin = getAdminById(session.id);
    if (!admin) {
      return NextResponse.json({ error: "Admin profile not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      profile: {
        id: admin.id,
        username: admin.username,
        displayName: admin.display_name,
        role: admin.role,
        mobile: admin.mobile,
        tgChatId: admin.tg_chat_id,
        avatarUrl: admin.avatar_url || (admin.role === "super_admin" ? "/brand/avatar-deepak.svg" : "/brand/avatar-amit.svg"),
        designation: admin.designation || (admin.role === "super_admin" ? "Platform Architect & Super Admin" : "Lead Mentor"),
        bio: admin.bio || "",
        hasPassword: Boolean(admin.hashed_password),
        mustChangePassword: Boolean(admin.must_change_password),
      },
    });
  } catch (err) {
    console.error("[Admin Profile GET Error]:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const { avatar_url, bio, designation, tg_chat_id } = body;

    const ok = updateAdminProfile(session.id, {
      avatar_url: avatar_url !== undefined ? avatar_url.trim() : undefined,
      bio: bio !== undefined ? bio.trim() : undefined,
      designation: designation !== undefined ? designation.trim() : undefined,
      tg_chat_id: tg_chat_id !== undefined ? tg_chat_id.trim() : undefined,
    });

    if (!ok) {
      return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
    }

    const updated = getAdminById(session.id);
    const sanitizedProfile = updated
      ? {
          id: updated.id,
          username: updated.username,
          displayName: updated.display_name,
          role: updated.role,
          mobile: updated.mobile,
          tgChatId: updated.tg_chat_id,
          avatarUrl: updated.avatar_url || (updated.role === "super_admin" ? "/brand/avatar-deepak.svg" : "/brand/avatar-amit.svg"),
          designation: updated.designation || (updated.role === "super_admin" ? "Platform Architect & Super Admin" : "Lead Mentor"),
          bio: updated.bio || "",
          hasPassword: Boolean(updated.hashed_password),
          mustChangePassword: Boolean(updated.must_change_password),
        }
      : null;

    return NextResponse.json({
      success: true,
      message: "Admin profile updated successfully.",
      profile: sanitizedProfile,
    });
  } catch (err) {
    console.error("[Admin Profile PATCH Error]:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
