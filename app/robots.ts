import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";

// /robots.txt: cho phép Google đọc toàn bộ web và chỉ chỗ sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
