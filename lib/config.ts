// Thông tin cửa hàng. Sửa ở đây là cả website đổi theo.
export const shop = {
  name: "Điện Tử Giá Kho",
  tagline: "Phụ kiện công nghệ giá kho — sạc, cáp, pin, mic",
  domain: "dientugiakho.com",
  // Link Messenger của Trang. Có thể đổi thành https://m.me/<tên-trang> cho đẹp.
  messenger: "https://m.me/997730426752659",
  facebook: "https://www.facebook.com/997730426752659",
  // Số Zalo / điện thoại. Để trống thì nút tương ứng tự ẩn.
  zalo: "0369680613",
  phone: "0369680613",
  policies: [
    "Ship COD toàn quốc",
    "Kiểm tra hàng trước khi nhận",
    "Bảo hành theo từng sản phẩm",
  ],
};

// Địa chỉ chính thức của web (có www). Dùng cho sitemap, canonical, dữ liệu cho Google.
export const siteUrl = `https://www.${shop.domain}`;

const digits = (s: string) => s.replace(/\D/g, "");

export const zaloUrl = shop.zalo ? `https://zalo.me/${digits(shop.zalo)}` : "";
export const telUrl = shop.phone ? `tel:${digits(shop.phone)}` : "";

// Nội dung copy sẵn khi khách bấm đặt hàng. Để link ở cuối để Messenger/Zalo hiện thẻ có ảnh.
export function orderMessage(p: { slug: string; name: string; price: number }, variant?: string) {
  const price = p.price.toLocaleString("vi-VN") + "đ";
  const v = variant ? ` (${variant})` : "";
  return `Mình muốn đặt: ${p.name}${v} – ${price}\n${siteUrl}/san-pham/${p.slug}`;
}

// 0369680613 -> "0369 680 613"
export function prettyPhone(s: string) {
  const d = digits(s);
  return d.length === 10 ? `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}` : s;
}
