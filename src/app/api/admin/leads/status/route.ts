import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { updateLeadStatus, updateContactInquiryStatus } from "@/lib/db";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await request.json();
    const { type, id, status } = body;

    if (!id || !status || !["webinar", "contact"].includes(type)) {
      return NextResponse.json(
        { error: "Valid 'type' ('webinar' | 'contact'), 'id', and 'status' are required." },
        { status: 400 }
      );
    }

    let success = false;
    if (type === "webinar") {
      success = updateLeadStatus(Number(id), String(status));
    } else if (type === "contact") {
      success = updateContactInquiryStatus(Number(id), String(status));
    }

    if (!success) {
      return NextResponse.json({ error: "Record not found or update failed." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Status updated to ${status}` });
  } catch (err) {
    console.error("[Admin Status Update Error]:", err);
    return NextResponse.json({ error: "Internal server error updating status." }, { status: 500 });
  }
}
