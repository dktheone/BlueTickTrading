import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { 
  getAllWebinars, 
  getWebinarById, 
  createWebinar, 
  updateWebinar, 
  deleteWebinar 
} from "@/lib/db";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const webinars = await getAllWebinars();
    return NextResponse.json({ success: true, webinars });
  } catch (err) {
    console.error("[Admin Webinars GET Error]:", err);
    return NextResponse.json({ error: "Failed to fetch webinars." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await request.json();
    const { 
      title, 
      slug, 
      date_time, 
      subtitle, 
      duration_minutes, 
      topics, 
      zoom_join_url, 
      is_active,
      status,
      max_seats,
      banner_image_url
    } = body;

    if (!title || !slug || !date_time) {
      return NextResponse.json(
        { error: "Title, slug, and scheduled date/time are required." },
        { status: 400 }
      );
    }

    const topicsJson = Array.isArray(topics) ? JSON.stringify(topics) : typeof topics === "string" ? topics : "[]";

    const newId = await createWebinar({
      title,
      slug,
      subtitle,
      date_time,
      duration_minutes: duration_minutes ? Number(duration_minutes) : 90,
      topics_json: topicsJson,
      zoom_join_url,
      status: status || "draft",
      is_active: status === "published" ? 1 : (is_active !== undefined ? Number(is_active) : 0),
      max_seats: max_seats ? Number(max_seats) : 500,
      banner_image_url: banner_image_url || undefined,
    });

    if (!newId) {
      return NextResponse.json(
        { error: "Failed to create webinar. Slug may already be in use." },
        { status: 409 }
      );
    }

    const created = await getWebinarById(newId);

    // Invalidate caches so homepage and webinar pages update immediately
    revalidatePath("/");
    revalidatePath("/webinars");
    if (slug) revalidatePath(`/webinars/${slug}`);

    return NextResponse.json({
      success: true,
      message: "Webinar scheduled successfully.",
      webinar: created,
    });
  } catch (err) {
    console.error("[Admin Webinars POST Error]:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await request.json();
    const { 
      id, 
      title, 
      slug, 
      subtitle, 
      date_time, 
      duration_minutes, 
      topics, 
      zoom_join_url, 
      is_active,
      status,
      max_seats,
      banner_image_url
    } = body;

    if (!id) {
      return NextResponse.json({ error: "Webinar ID is required for update." }, { status: 400 });
    }

    const topicsJson = topics !== undefined ? (Array.isArray(topics) ? JSON.stringify(topics) : String(topics)) : undefined;

    const ok = await updateWebinar(Number(id), {
      title,
      slug,
      subtitle,
      date_time,
      duration_minutes: duration_minutes ? Number(duration_minutes) : undefined,
      topics_json: topicsJson,
      zoom_join_url,
      status: status !== undefined ? status : undefined,
      is_active: is_active !== undefined ? Number(is_active) : undefined,
      max_seats: max_seats !== undefined ? Number(max_seats) : undefined,
      banner_image_url: banner_image_url !== undefined ? banner_image_url : undefined,
    });

    if (!ok) {
      return NextResponse.json({ error: "Failed to update webinar record." }, { status: 500 });
    }

    const updated = await getWebinarById(Number(id));

    // Invalidate caches so homepage and webinar pages update immediately
    revalidatePath("/");
    revalidatePath("/webinars");
    if (updated?.slug) revalidatePath(`/webinars/${updated.slug}`);
    if (slug && slug !== updated?.slug) revalidatePath(`/webinars/${slug}`);

    return NextResponse.json({
      success: true,
      message: "Webinar updated successfully.",
      webinar: updated,
    });
  } catch (err) {
    console.error("[Admin Webinars PATCH Error]:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json({ error: "Webinar ID parameter missing." }, { status: 400 });
    }

    const ok = await deleteWebinar(Number(idParam));
    if (!ok) {
      return NextResponse.json({ error: "Failed to delete webinar." }, { status: 500 });
    }

    // Invalidate caches
    revalidatePath("/");
    revalidatePath("/webinars");

    return NextResponse.json({ success: true, message: "Webinar deleted successfully." });
  } catch (err) {
    console.error("[Admin Webinars DELETE Error]:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
