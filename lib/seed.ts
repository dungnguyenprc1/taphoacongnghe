import type { Category, Product } from "./types";

type RawProduct = [string, string, number, number, string, number, ...string[]];

export const seedCategories: Category[] = [
  { slug: "dien-thoai", name: "Điện thoại", icon: "📱" },
  { slug: "laptop", name: "Laptop", icon: "💻" },
  { slug: "tablet", name: "Tablet", icon: "📲" },
  { slug: "dong-ho", name: "Đồng hồ", icon: "⌚" },
  { slug: "phu-kien", name: "Phụ kiện", icon: "🎧" },
  { slug: "pc-man-hinh", name: "PC, Màn hình", icon: "🖥️" },
  { slug: "tivi", name: "Tivi", icon: "📺" },
  { slug: "may-cu", name: "Máy cũ giá rẻ", icon: "♻️" },
  { slug: "sim-the", name: "Sim, Thẻ cào", icon: "💳" },
  { slug: "dich-vu", name: "Dịch vụ tiện ích", icon: "🧾" },
];

const colors = ["#ffe1e1", "#e1f0ff", "#e8ffe1", "#fff3d6", "#efe1ff", "#e1fff7"];

const raw: RawProduct[] = [
  ["dien-thoai", "Nova X15 Pro Max 256GB", 33990000, 29990000, "📱", 4.9, "6.7\" OLED, 120Hz", "Chip N3 Bionic", "Camera 48MP"],
  ["dien-thoai", "Galaxis S26 Ultra 512GB", 36990000, 31490000, "📱", 4.8, "6.8\" AMOLED 2X", "8 nhân 3.3GHz", "Camera 200MP"],
  ["dien-thoai", "Orbit Reno 13 5G", 12990000, 10990000, "📱", 4.7, "6.6\" AMOLED", "RAM 12GB", "Sạc nhanh 80W"],
  ["dien-thoai", "Mibo Note 14 Pro", 8490000, 6990000, "📱", 4.6, "6.67\" AMOLED", "Pin 5110mAh", "Camera 200MP"],
  ["dien-thoai", "Vibe Y39 128GB", 5490000, 4690000, "📱", 4.5, "6.68\" LCD", "Pin 6500mAh", "Sạc 44W"],
  ["dien-thoai", "Nova X15 128GB", 22990000, 19990000, "📱", 4.8, "6.1\" OLED", "Chip N3", "Camera kép 48MP"],
  ["laptop", "AeroBook 14 M4 16GB/512GB", 32990000, 28490000, "💻", 4.9, "14\" Retina", "Chip M4", "Pin 18 giờ"],
  ["laptop", "ZenPad 15 OLED i7", 25990000, 21990000, "💻", 4.7, "15.6\" OLED", "Core i7 13700H", "RAM 16GB"],
  ["laptop", "Predator Lite 16 RTX 4060", 34990000, 29990000, "💻", 4.8, "16\" 165Hz", "Ryzen 7 8845HS", "RTX 4060 8GB"],
  ["laptop", "IdeaSlim 3 i5", 15990000, 12490000, "💻", 4.5, "15.6\" FHD", "Core i5 12450H", "SSD 512GB"],
  ["tablet", "Slate Air 11 M3 Wi-Fi", 16990000, 15290000, "📲", 4.8, "11\" Liquid", "Chip M3", "Hỗ trợ bút"],
  ["tablet", "Galaxis Tab S10 FE", 12990000, 10990000, "📲", 4.6, "10.9\" LCD 90Hz", "RAM 8GB", "Bút S Pen"],
  ["dong-ho", "Pulse Watch Series 10 GPS", 10990000, 9490000, "⌚", 4.8, "46mm", "Đo SpO2", "Chống nước 5ATM"],
  ["dong-ho", "FitBand 9 Pro", 1690000, 1290000, "⌚", 4.6, "1.74\" AMOLED", "GPS tích hợp", "Pin 14 ngày"],
  ["phu-kien", "Tai nghe AirBeat Pro 3", 6490000, 5490000, "🎧", 4.9, "Chống ồn ANC", "Pin 30 giờ", "USB-C"],
  ["phu-kien", "Sạc dự phòng 20000mAh 65W", 1290000, 790000, "🔋", 4.7, "PD 65W", "3 cổng", "Màn hình LED"],
  ["phu-kien", "Loa Bluetooth BoomGo 4", 2990000, 2390000, "🔊", 4.6, "Chống nước IP67", "Pin 20 giờ", "Bass mạnh"],
  ["pc-man-hinh", "Màn hình ViewMax 27\" 2K 165Hz", 6990000, 5290000, "🖥️", 4.7, "27\" IPS", "2K 165Hz", "1ms"],
  ["tivi", "Smart Tivi QLED 55 inch 4K", 18990000, 13990000, "📺", 4.7, "55\" QLED", "4K HDR10+", "Google TV"],
  ["may-cu", "Nova X13 128GB (Like new)", 13990000, 9990000, "♻️", 4.4, "Đẹp 99%", "Pin 90%", "Bảo hành 6 tháng"],
];

// Seed data only; the app reads products from SQLite (see lib/db.ts).
export const seedProducts: Omit<Product, "id">[] = raw.map(([category, name, oldPrice, price, icon, rating, ...specs], i) => ({
  category,
  name,
  oldPrice,
  price,
  icon,
  rating,
  specs,
  color: colors[i % colors.length],
  sold: 120 + ((i * 397) % 4800),
  stock: 5 + ((i * 7) % 30),
  installment: i % 3 === 0,
  gift: i % 2 === 0 ? `Quà tặng ${(i % 4 + 1) * 100}.000₫` : null,
}));
