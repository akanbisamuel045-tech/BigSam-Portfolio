import { NextRequest, NextResponse } from "next/server";
import { getCMSData, saveCMSData, resetCMSData } from "@/lib/cmsStorage";
import { PortfolioData } from "@/data/portfolioData";
import { ADMIN_COOKIE_NAME, getAdminPassword, verifySessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Validates request authorization via x-admin-key header or session cookie.
 */
async function isAuthorized(request: NextRequest): Promise<boolean> {
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey && adminKey.trim() === getAdminPassword().trim()) {
    return true;
  }
  const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (sessionToken && (await verifySessionToken(sessionToken))) {
    return true;
  }
  return false;
}

/**
 * GET /api/admin/content
 * Returns the live CMS portfolio dataset.
 */
export async function GET() {
  try {
    const data = await getCMSData();
    return NextResponse.json(
      { success: true, data },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch CMS content";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/content
 * Updates the full dataset or merges a specific section.
 * Requires valid administrator session or x-admin-key.
 */
export async function PUT(request: NextRequest) {
  try {
    if (!(await isAuthorized(request))) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Administrator session or x-admin-key required." },
        { status: 401 }
      );
    }
    const body = await request.json();
    const currentData = await getCMSData();

    let targetData: PortfolioData;

    // Check if updating a single section
    if (body && typeof body === "object" && "section" in body && "value" in body) {
      const { section, value } = body as { section: keyof PortfolioData; value: unknown };
      if (!(section in currentData)) {
        return NextResponse.json(
          { success: false, error: `Invalid section name: '${String(section)}'` },
          { status: 400 }
        );
      }
      targetData = {
        ...currentData,
        [section]: value,
      };
    } else if (body && typeof body === "object") {
      targetData = body as PortfolioData;
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid request payload: Expected JSON object." },
        { status: 400 }
      );
    }

    const { success, updatedAt } = await saveCMSData(targetData);

    return NextResponse.json({
      success,
      data: targetData,
      updatedAt,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update CMS content";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/content
 * Handles administrative maintenance actions:
 *  - { action: "reset" } -> Restores cms-db.json to default configuration
 *  - { action: "import", data: PortfolioData } -> Overwrites database with imported JSON
 */
export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthorized(request))) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Administrator session or x-admin-key required." },
        { status: 401 }
      );
    }
    const body = await request.json();

    if (body?.action === "reset") {
      const resetData = await resetCMSData();
      return NextResponse.json({
        success: true,
        message: "CMS database successfully reset to default seed.",
        data: resetData,
      });
    }

    if (body?.action === "import" && body?.data) {
      const { success, updatedAt } = await saveCMSData(body.data as PortfolioData);
      return NextResponse.json({
        success,
        message: "CMS database successfully restored from imported data.",
        data: body.data,
        updatedAt,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action. Supported actions: 'reset' | 'import'" },
      { status: 400 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process CMS action";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
