// Danh sách sản phẩm hiển thị trên website.
// Chỉ có giá bán — KHÔNG để giá gốc hay link Dropbuy ở đây (file này nằm trong code website).

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  price: number; // giá bán (đồng)
  image: string; // đường dẫn trong thư mục public/
  category: "pin" | "sac-cap" | "am-thanh" | "tien-ich";
  warranty: string;
  features: string[];
  note?: string; // lưu ý cho khách: không hộp, hàng order, màu ngẫu nhiên...
  preorder?: string; // ngày hàng về nếu là hàng order
  inStock: boolean;
};

export const products: Product[] = [
  {
    slug: "may-phien-dich-enence",
    name: "Máy phiên dịch cầm tay thông minh ENENCE (hàng eBay Mỹ)",
    shortName: "Máy phiên dịch ENENCE",
    price: 629000,
    image: "/images/may-phien-dich-enence.jpg",
    category: "tien-ich",
    warranty: "1 năm",
    features: [
      "Dịch giọng nói thời gian thực",
      "Có trợ lý AI hỗ trợ du lịch",
      "Nhỏ gọn, bỏ túi mang đi khắp nơi",
    ],
    inStock: true,
  },
  {
    slug: "bo-qua-baseus-limited-edition",
    name: "Bộ quà tặng Baseus Limited Edition 4 món",
    shortName: "Bộ quà Baseus Limited",
    price: 755000,
    image: "/images/bo-qua-baseus.jpg",
    category: "pin",
    warranty: "1 tháng",
    features: [
      "Gồm pin dự phòng, củ sạc nhanh 30W, tai nghe Bluetooth và ổ điện",
      "Hộp quà sang trọng",
      "Hợp làm quà Noel, Tết, sinh nhật",
    ],
    inStock: true,
  },
  {
    slug: "pin-du-phong-energyqc-72000mah-130w",
    name: "Pin dự phòng EnergyQC 72.000mAh sạc nhanh 130W",
    shortName: "Pin EnergyQC 72.000mAh",
    price: 1007000,
    image: "/images/pin-energyqc-72000mah.jpg",
    category: "pin",
    warranty: "6 tháng",
    features: [
      "Dung lượng cực lớn 72.000mAh",
      "Sạc nhanh 130W, sạc được cả laptop",
      "Hợp đi phượt, cắm trại, mất điện",
    ],
    preorder: "Hàng order, về ngày 30/11",
    inStock: true,
  },
  {
    slug: "pin-du-phong-20000mah-kem-2-cap",
    name: "Pin dự phòng 20.000mAh sạc nhanh 30W, tích hợp 2 cáp",
    shortName: "Pin 20.000mAh kèm 2 cáp",
    price: 377000,
    image: "/images/pin-20000mah-kem-cap.jpg",
    category: "pin",
    warranty: "6 tháng",
    features: [
      "Sạc nhanh 30W",
      "Tích hợp sẵn cáp Lightning (iPhone) và Type-C",
      "Sản xuất tại nhà máy gia công cho Anker",
    ],
    note: "Hàng không hộp, chưa in logo. Ảnh minh họa.",
    inStock: true,
  },
  {
    slug: "mic-khong-day-ugreen-mic-6",
    name: "Bộ mic thu âm không dây UGREEN MIC 6 (1 thu + 1 phát)",
    shortName: "Mic UGREEN MIC 6",
    price: 1121000,
    image: "/images/mic-ugreen-mic6.jpg",
    category: "am-thanh",
    warranty: "12 tháng",
    features: [
      "Kẹp áo gọn nhẹ, thu âm rõ",
      "Hợp quay TikTok, livestream bán hàng, vlog",
      "Dùng cho học và họp online",
    ],
    inStock: true,
  },
  {
    slug: "cap-sac-3-dau-drapow-cz33",
    name: "Cáp sạc 3 đầu DRAPOW CZ33 (Lightning + Type-C + Micro USB)",
    shortName: "Cáp 3 đầu DRAPOW",
    price: 29000,
    image: "/images/cap-3-dau-drapow.jpg",
    category: "sac-cap",
    warranty: "1 tháng",
    features: [
      "1 dây sạc được iPhone, Android, tai nghe, loa",
      "Tiện để trong xe, văn phòng, balo",
    ],
    inStock: true,
  },
  {
    slug: "cap-c-to-c-kiem-gia-do-60w",
    name: "Cáp sạc C to C dây dù, kiêm giá đỡ điện thoại, sạc nhanh 60W",
    shortName: "Cáp C to C kiêm giá đỡ",
    price: 37000,
    image: "/images/cap-c-c-gia-do.jpg",
    category: "sac-cap",
    warranty: "3 tháng",
    features: [
      "Dây dù bền chắc",
      "Đầu cáp gập thành giá đỡ điện thoại",
      "Sạc nhanh 60W cho điện thoại, iPad, laptop",
    ],
    note: "Hàng Amazon.",
    inStock: true,
  },
  {
    slug: "o-sac-cuky-4-cong",
    name: "Ổ cắm sạc đa năng 4 cổng CUKY (2 USB-A + 2 Type-C)",
    shortName: "Ổ sạc CUKY 4 cổng",
    price: 87000,
    image: "/images/o-sac-cuky-4-cong.jpg",
    category: "sac-cap",
    warranty: "15 ngày",
    features: [
      "Sạc cùng lúc 4 thiết bị",
      "Gọn nhẹ, hợp bàn làm việc, đầu giường, đi công tác",
    ],
    note: "Giao ngẫu nhiên kiểu chân cắm, màu, logo.",
    inStock: true,
  },
  {
    slug: "cu-sac-voltme-revo-35-duo",
    name: "Củ sạc nhanh VOLTME Revo 35 Duo GaN 35W, 2 cổng USB-C",
    shortName: "Củ sạc VOLTME 35W",
    price: 150000,
    image: "/images/cu-sac-voltme-35w.jpg",
    category: "sac-cap",
    warranty: "1 tháng",
    features: [
      "2 cổng Type-C, sạc 2 máy cùng lúc",
      "Sạc nhanh PD 3.0 cho iPhone, Samsung, iPad",
      "Công nghệ GaN nhỏ gọn, ít nóng",
    ],
    note: "Ảnh minh họa.",
    inStock: true,
  },
  {
    slug: "pin-magsafe-nohon-10000mah",
    name: "Pin sạc dự phòng MagSafe NOHON 10.000mAh, tích hợp cáp Type-C",
    shortName: "Pin MagSafe NOHON",
    price: 377000,
    image: "/images/pin-magsafe-nohon.jpg",
    category: "pin",
    warranty: "12 tháng",
    features: [
      "Hít nam châm vào lưng iPhone, vừa sạc vừa dùng",
      "Tích hợp cáp Type-C, sạc nhanh PD 20W",
    ],
    note: "Giao màu ngẫu nhiên. Ảnh minh họa.",
    inStock: true,
  },
];

export const categories: { id: Product["category"] | "all"; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "pin", label: "Pin dự phòng" },
  { id: "sac-cap", label: "Củ sạc & cáp" },
  { id: "am-thanh", label: "Âm thanh" },
  { id: "tien-ich", label: "Tiện ích" },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(v: number) {
  return v.toLocaleString("vi-VN") + "đ";
}
