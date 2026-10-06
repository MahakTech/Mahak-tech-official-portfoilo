import { NextRequest, NextResponse } from "next/server";
import { getTelemetryData, recordPageView, recordUserClicks } from "@/lib/server-telemetry";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getTelemetryData();
    return NextResponse.json(
      {
        views: data.totalViews,
        uniqueVisitors: data.uniqueVisitors,
        clicks: data.totalClicks,
        lastUpdated: data.lastUpdated,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/telemetry error:", error);
    return NextResponse.json(
      { views: 0, uniqueVisitors: 0, clicks: 0, error: "Failed to read telemetry" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action, count, visitorId } = body;

    let updated;
    if (action === "click") {
      const clickCount = typeof count === "number" ? count : 1;
      updated = await recordUserClicks(clickCount);
    } else {
      // Default action is 'view'
      updated = await recordPageView(visitorId);
    }

    return NextResponse.json(
      {
        success: true,
        views: updated.totalViews,
        uniqueVisitors: updated.uniqueVisitors,
        clicks: updated.totalClicks,
        lastUpdated: updated.lastUpdated,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("POST /api/telemetry error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update telemetry" },
      { status: 500 }
    );
  }
}
