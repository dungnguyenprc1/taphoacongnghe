import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteUrl } from "@/lib/config";

// Google đọc file này ở /sitemap.xml để tìm hết các trang. Thêm sản phẩm là tự cập nhật.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    ...products.map((p) => ({
      url: `${siteUrl}/san-pham/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [siteUrl + p.image],
    })),
  ];
}
