import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { PortfolioData, portfolioData as defaultPortfolioData } from "@/data/portfolioData";

const DB_PATH = path.join(process.cwd(), "src", "data", "cms-db.json");
const DEFAULT_PATH = path.join(process.cwd(), "src", "data", "cms-default.json");
const TS_PATH = path.join(process.cwd(), "src", "data", "portfolioData.ts");

const REQUIRED_KEYS: (keyof PortfolioData)[] = [
  "personalInfo",
  "heroFeaturedProject",
  "stats",
  "clientLogos",
  "services",
  "projects",
  "processSteps",
  "testimonials",
  "pricing",
  "achievements",
  "career",
  "articles",
  "faqs",
];

/**
 * Reads and returns the live CMS database.
 * Falls back gracefully to defaultPortfolioData if the file is missing or corrupt.
 */
export async function getCMSData(): Promise<PortfolioData> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    const parsed = JSON.parse(raw) as PortfolioData;

    // Validate that top-level keys exist
    const hasAllKeys = REQUIRED_KEYS.every((key) => key in parsed);
    if (!hasAllKeys) {
      console.warn("[CMS Storage] Missing keys in cms-db.json, falling back to defaults");
      return defaultPortfolioData;
    }

    return parsed;
  } catch (error) {
    console.warn("[CMS Storage] Error reading cms-db.json, fallback to in-memory data:", error);
    return defaultPortfolioData;
  }
}

/**
 * Validates, persists, and synchronizes CMS data across both cms-db.json and portfolioData.ts.
 * Triggers Next.js on-demand cache revalidation across all frontend routes.
 */
export async function saveCMSData(newData: PortfolioData): Promise<{ success: boolean; updatedAt: string }> {
  // 1. Validation
  if (!newData || typeof newData !== "object") {
    throw new Error("Invalid CMS data payload: Expected a valid PortfolioData object.");
  }

  for (const key of REQUIRED_KEYS) {
    if (!(key in newData)) {
      throw new Error(`Invalid CMS data payload: Missing required section '${key}'.`);
    }
  }

  const updatedAt = new Date().toISOString();

  // 2. Persist to cms-db.json
  const formattedJson = JSON.stringify(newData, null, 2);
  await fs.writeFile(DB_PATH, formattedJson, "utf-8");

  // 3. Keep portfolioData.ts in sync for local git version control
  try {
    const existingTs = await fs.readFile(TS_PATH, "utf-8");
    const marker = "export const portfolioData: PortfolioData =";
    const markerIndex = existingTs.indexOf(marker);

    let interfacesHeader = existingTs;
    if (markerIndex !== -1) {
      interfacesHeader = existingTs.slice(0, markerIndex).trimEnd();
    }

    const updatedTs = `${interfacesHeader}\n\nexport const portfolioData: PortfolioData = ${formattedJson};\n`;
    await fs.writeFile(TS_PATH, updatedTs, "utf-8");
  } catch (syncError) {
    console.warn("[CMS Storage] Notice: Could not sync to portfolioData.ts (read-only environment or file locked):", syncError);
  }

  // 4. Trigger on-demand cache revalidation for all frontend routes
  try {
    revalidatePath("/", "layout");
    revalidatePath("/about");
    revalidatePath("/services");
    revalidatePath("/articles");
    revalidatePath("/contact");
  } catch (revalError) {
    console.warn("[CMS Storage] Revalidation notice (running outside Next.js request context):", revalError);
  }

  return { success: true, updatedAt };
}

/**
 * Resets cms-db.json to the baseline default configuration.
 */
export async function resetCMSData(): Promise<PortfolioData> {
  let defaultData = defaultPortfolioData;

  try {
    const rawDefault = await fs.readFile(DEFAULT_PATH, "utf-8");
    defaultData = JSON.parse(rawDefault) as PortfolioData;
  } catch {
    defaultData = defaultPortfolioData;
  }

  await saveCMSData(defaultData);
  return defaultData;
}
