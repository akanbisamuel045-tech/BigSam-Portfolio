export const ADMIN_COOKIE_NAME = "gadex_admin_session";
const DEFAULT_PASSWORD = "gadex2026";
const DEFAULT_SECRET_SALT = "gadex_production_cms_salt_2026";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

export function getSecretSalt(): string {
  return process.env.ADMIN_SECRET_SALT || DEFAULT_SECRET_SALT;
}

/**
 * Web Crypto SHA-256 digest function compatible with both Edge Middleware and Node runtime.
 */
async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Validates plain-text password against the configured ADMIN_PASSWORD.
 */
export function verifyAdminPassword(inputPassword: string): boolean {
  if (!inputPassword) return false;
  return inputPassword.trim() === getAdminPassword().trim();
}

/**
 * Generates an encrypted/signed session token string.
 */
export async function createSessionToken(): Promise<string> {
  const payload = "gadex_admin_authenticated";
  const timestamp = Date.now();
  const signature = await sha256(`${payload}:${timestamp}:${getAdminPassword()}:${getSecretSalt()}`);
  const tokenData = JSON.stringify({ payload, timestamp, sig: signature });
  
  if (typeof btoa === "function") {
    return btoa(tokenData);
  }
  return Buffer.from(tokenData).toString("base64");
}

/**
 * Verifies the validity and signature of a session token string.
 */
export async function verifySessionToken(token?: string): Promise<boolean> {
  if (!token) return false;

  try {
    let decodedJson = "";
    if (typeof atob === "function") {
      decodedJson = atob(token);
    } else {
      decodedJson = Buffer.from(token, "base64").toString("utf-8");
    }

    const { payload, timestamp, sig } = JSON.parse(decodedJson);
    if (payload !== "gadex_admin_authenticated" || !sig || !timestamp) {
      return false;
    }

    // Verify token age (e.g. 7 days max age)
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > sevenDaysMs) {
      return false;
    }

    const expectedSig = await sha256(`${payload}:${timestamp}:${getAdminPassword()}:${getSecretSalt()}`);
    return sig === expectedSig;
  } catch {
    return false;
  }
}

/**
 * Checks whether the current request is authenticated.
 * Reads cookies() asynchronously via Next.js next/headers (or accepts an explicit token parameter).
 */
export async function isAuthenticatedRequest(explicitToken?: string): Promise<boolean> {
  if (explicitToken) {
    return verifySessionToken(explicitToken);
  }

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}
