import { getSiteConfig } from "@/lib/config";

export interface LeadPayload {
  /** Which form the lead came from */
  formType: "valuation" | "contact" | "hero-postcode";
  /** Contact info */
  name?: string;
  email?: string;
  phone?: string;
  /** Property details (valuation form) */
  propertyType?: string;
  postcode?: string;
  bedrooms?: string;
  condition?: string;
  timeframe?: string;
  /** Contact form message */
  message?: string;
}

interface GHLPayload {
  [key: string]: string | undefined;
}

/**
 * Captures UTM parameters from the current URL.
 * Returns an object with any utm_source, utm_medium, utm_campaign,
 * utm_term, utm_content values found.
 */
function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const result: Record<string, string> = {};
  for (const key of utmKeys) {
    const val = params.get(key);
    if (val) result[key] = val;
  }
  return result;
}

/**
 * Returns the page URL the user is currently on (without query params).
 */
function getPageUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.origin + window.location.pathname;
}

/**
 * Submit a lead to GoHighLevel via webhook.
 *
 * - Normalises all form payloads into a consistent shape
 * - Captures UTM params and page URL automatically
 * - Retries once on network failure
 * - Falls back to mailto: link if webhook is a placeholder or fails twice
 *
 * Returns { ok: true } on success, or { ok: false, fallbackUrl?: string } on failure.
 */
/** Cloudflare Worker URL — single endpoint for all 110 sites */
const LEAD_WORKER_URL = "https://lead-handler.matt-lenzie.workers.dev/submit";

export async function submitLead(
  lead: LeadPayload
): Promise<{ ok: boolean; fallbackUrl?: string }> {
  const config = getSiteConfig();

  // Build normalised payload
  const payload: GHLPayload = {
    // Contact
    name: lead.name || "",
    email: lead.email || "",
    phone: lead.phone || "",
    // Property
    propertyType: lead.propertyType,
    postcode: lead.postcode,
    bedrooms: lead.bedrooms,
    condition: lead.condition,
    timeframe: lead.timeframe,
    // Message (contact form only)
    message: lead.message,
    // Tracking — always included
    formType: lead.formType,
    source: config.brand.domain,
    location: config.location.name,
    pageUrl: getPageUrl(),
    // UTM
    ...getUtmParams(),
  };

  // Strip undefined values
  const cleanPayload: Record<string, string> = {};
  for (const [k, v] of Object.entries(payload)) {
    if (v !== undefined && v !== "") {
      cleanPayload[k] = v;
    }
  }

  // Attempt Worker endpoint — retry once on failure
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(LEAD_WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanPayload),
      });
      if (res.ok) return { ok: true };
    } catch {
      // network error — retry
    }
  }

  // Both attempts failed — return mailto fallback
  return {
    ok: false,
    fallbackUrl: buildFallbackMailto(cleanPayload, config.leads.fallbackEmail),
  };
}

/**
 * Builds a mailto: link pre-filled with lead data so the user
 * can still reach the business if the webhook is down.
 */
function buildFallbackMailto(
  data: Record<string, string>,
  email: string
): string {
  const subject = "New Lead from " + (data.source || "website");
  const lines = Object.entries(data).map(([k, v]) => k + ": " + v);
  const body = lines.join("\n");
  return (
    "mailto:" +
    encodeURIComponent(email) +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body)
  );
}
