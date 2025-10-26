import { AffiliateLink } from "../schemas";

type Input = {
  url: string;
  merchant?: string;
  geo?: "EU" | "US";
  campaignId?: string;
  utm?: Record<string, string>;
};

function addQuery(u: string, p: Record<string, string>) {
  const U = new URL(u);
  for (const [k, v] of Object.entries(p)) U.searchParams.set(k, v);
  return U.toString();
}

export function wrapAffiliate(input: Input): AffiliateLink {
  const { url, geo = "EU", campaignId = "runwaytwin", utm = {}, merchant } = input;

  const baseUtm = {
    utm_source: "runwaytwin",
    utm_medium: "affiliate",
    utm_campaign: campaignId,
    ...utm,
  };

  const hasAmazon =
    !!(process.env.AMAZON_PAAPI_ACCESS_KEY &&
       process.env.AMAZON_PAAPI_SECRET_KEY &&
       process.env.AMAZON_PAAPI_PARTNER_TAG);

  const hasAwin = !!process.env.AWIN_API_TOKEN;
  const hasRakuten = !!process.env.RAKUTEN_API_KEY;

  // No provider available → non-affiliate (but keep UTMs for analytics)
  if (!hasAmazon && !hasAwin && !hasRakuten) {
    return {
      affiliateUrl: addQuery(url, baseUtm),
      program: "none",
      nonAffiliate: true,
      merchantId: merchant || "unknown",
    };
  }

  // Prefer AWIN in EU
  if (geo === "EU" && hasAwin) {
    return {
      affiliateUrl: addQuery(url, {
        ...baseUtm,
        awinmid: "mock-merchant",
        awinaffid: "mock-affid",
      }),
      program: "awin",
      merchantId: merchant || "unknown",
      nonAffiliate: false,
    };
  }

  // Fallback to Rakuten in EU
  if (geo === "EU" && hasRakuten) {
    return {
      affiliateUrl: addQuery(url, {
        ...baseUtm,
        rktn_id: "mock",
        rktn_campaign: campaignId,
      }),
      program: "rakuten",
      merchantId: merchant || "unknown",
      nonAffiliate: false,
    };
  }

  // Amazon as global baseline
  if (hasAmazon) {
    return {
      affiliateUrl: addQuery(url, {
        ...baseUtm,
        tag: process.env.AMAZON_PAAPI_PARTNER_TAG || "runwaytwin-21",
      }),
      program: "amazon",
      merchantId: merchant || "unknown",
      nonAffiliate: false,
    };
  }

  // Final safety (shouldn't hit here)
  return {
    affiliateUrl: addQuery(url, baseUtm),
    program: "none",
    merchantId: merchant || "unknown",
    nonAffiliate: true,
  };
}
