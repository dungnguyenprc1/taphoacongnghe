// Danh sách sản phẩm hiển thị trên website.
// Chỉ có giá bán — KHÔNG để giá gốc hay link Dropbuy ở đây (file này nằm trong code website).

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  price: number; // giá bán (đồng)
  image: string; // đường dẫn trong thư mục public/
  category: "pin" | "sac-cap" | "camera" | "dong-ho" | "am-thanh" | "tien-ich" | "ghe-o-to";
  warranty: string;
  features: string[];
  note?: string; // lưu ý cho khách: không hộp, hàng order, màu ngẫu nhiên...
  preorder?: string; // ngày hàng về nếu là hàng order
  badge?: string; // nhãn nhỏ trên ảnh: "Bán chạy", "Mới", "Quà tặng"...
  inStock: boolean;
  // Phân loại (màu, mẫu, loại...). Khách phải chọn đủ mỗi nhóm trước khi đặt.
  // price của lựa chọn (nếu có) thay cho giá gốc; soldOut = lựa chọn đó hết hàng;
  // image = ảnh hiện khi khách chọn lựa chọn đó.
  variants?: VariantGroup[];
};

export type VariantOption = { label: string; price?: number; soldOut?: boolean; image?: string };
export type VariantGroup = { name: string; options: VariantOption[] };

// Ảnh tạm cho sản phẩm chưa có ảnh. Có ảnh thật thì đặt vào public/images/ và sửa đường dẫn.
const ANH_TAM = "/images/dang-cap-nhat.svg";

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
    badge: "Quà tặng",
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
    badge: "Bán chạy",
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
    variants: [
      { name: "Màu sắc", options: [{ label: "Hồng", image: "/images/v/pin-du-phong-20000mah-kem-2-cap-2.jpg", soldOut: true }, { label: "Xanh dương", soldOut: true }, { label: "Xanh lá" }, { label: "Tím", soldOut: true }, { label: "Đen", image: "/images/v/pin-du-phong-20000mah-kem-2-cap-1.jpg", soldOut: true }] },
    ],
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
    variants: [
      { name: "Màu sắc", options: [{ label: "Đen" }, { label: "Trắng", image: "/images/v/cap-sac-3-dau-drapow-cz33-3.jpg" }, { label: "Đỏ" }, { label: "Tím" }, { label: "Xanh lá" }, { label: "Xanh dương", image: "/images/v/cap-sac-3-dau-drapow-cz33-1.jpg" }, { label: "Vàng champagne", image: "/images/v/cap-sac-3-dau-drapow-cz33-2.jpg" }] },
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
    badge: "Mới",
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
    variants: [
      { name: "Màu sắc", options: [{ label: "Trắng" }, { label: "Đen" }] },
    ],
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

  // ===== Pin & trạm sạc =====
  {
    slug: "kich-binh-baseus-primetrip-vj1-1200a",
    name: "Bộ kích bình siêu tụ điện khởi động xe hơi 1200A BASEUS PrimeTrip VJ1",
    shortName: "Kích bình ô tô Baseus 1200A",
    price: 3150000,
    image: "/images/kich-binh-baseus-1200a.webp",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Dòng khởi động 1200A, kích nổ xe hơi khi hết bình",
      "Công nghệ siêu tụ điện",
      "Nhỏ gọn, để sẵn trong cốp xe",
    ],
    note: "Ảnh minh họa.",
    inStock: true,
  },
  {
    slug: "pin-du-phong-10000mah-2-cap-30w",
    name: "Pin dự phòng 10.000mAh sạc nhanh 30W, tích hợp 2 cáp (Lightning + Type-C)",
    shortName: "Pin 10.000mAh kèm 2 cáp",
    price: 315000,
    image: "/images/pin-10000mah-2-cap.jpeg",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Sạc nhanh 30W",
      "Tích hợp sẵn cáp Lightning (iPhone) và Type-C",
      "Sản xuất tại nhà máy gia công cho Anker",
    ],
    note: "Hàng không hộp, chưa in logo.",
    variants: [
      { name: "Màu sắc", options: [{ label: "Hồng", image: "/images/v/pin-du-phong-10000mah-2-cap-30w-1.jpg" }, { label: "Xanh dương", image: "/images/v/pin-du-phong-10000mah-2-cap-30w-2.jpg", soldOut: true }, { label: "Xanh lá" }, { label: "Tím" }, { label: "Đen", soldOut: true }] },
    ],
    inStock: true,
  },
  {
    slug: "pin-du-phong-10000mah-lien-cap-type-c-30w",
    name: "Pin dự phòng 10.000mAh sạc nhanh 30W, liền cáp Type-C",
    shortName: "Pin 10.000mAh liền cáp C",
    price: 301000,
    image: "/images/pin-10000mah-lien-cap-c.png",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Sạc nhanh 30W",
      "Liền cáp Type-C, không cần mang dây",
      "Sản xuất tại nhà máy gia công cho Anker",
    ],
    note: "Hàng không hộp, chưa in logo.",
    variants: [
      { name: "Màu sắc", options: [{ label: "Đen" }, { label: "Trắng", image: "/images/v/pin-du-phong-10000mah-lien-cap-type-c-30w-1.jpg", soldOut: true }, { label: "Hồng" }, { label: "Xanh", soldOut: true }] },
    ],
    inStock: true,
  },
  {
    slug: "pin-du-phong-20000mah-30w",
    name: "Pin dự phòng 20.000mAh sạc nhanh 30W",
    shortName: "Pin 20.000mAh 30W",
    price: 377000,
    image: "/images/pin-20000mah-30w.png",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Dung lượng 20.000mAh, sạc điện thoại nhiều lần",
      "Sạc nhanh 30W",
      "Sản xuất tại nhà máy gia công cho Anker",
    ],
    note: "Hàng không hộp.",
    inStock: true,
  },
  {
    slug: "pin-du-phong-momax-ip78-20000mah",
    name: "Pin dự phòng Momax IP78 20.000mAh, sạc nhanh PD 3.0 20W",
    shortName: "Pin Momax 20.000mAh",
    price: 301000,
    image: "/images/pin-momax-20000mah.jpeg",
    category: "pin",
    warranty: "Liên hệ shop",
    features: ["Dung lượng 20.000mAh", "Sạc nhanh PD 3.0 20W"],
    inStock: true,
  },
  {
    slug: "pin-qi2-10000mah-m02b-25w",
    name: "Pin dự phòng 10.000mAh Qi2 M02B+, sạc không dây 25W, liền cáp Type-C",
    shortName: "Pin Qi2 10.000mAh 25W",
    price: 377000,
    image: "/images/pin-qi2.jpg",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Chuẩn Qi2, sạc không dây nhanh 25W",
      "Liền cáp Type-C",
      "Có chứng nhận CCC",
    ],
    note: "Hàng không hộp. Ảnh minh họa.",
    inStock: true,
  },
  {
    slug: "pin-magsafe-sieu-mong-5000mah-20w",
    name: "Pin dự phòng siêu mỏng 5000mAh sạc không dây MagSafe, sạc nhanh PD 20W",
    shortName: "Pin MagSafe siêu mỏng 20W",
    price: 226000,
    image: "/images/pin-magsafe-20w.jpg",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Siêu mỏng, hít nam châm vào lưng iPhone",
      "Sạc không dây MagSafe",
      "Sạc nhanh có dây PD 20W",
    ],
    note: "Hàng không hộp. Ảnh minh họa.",
    inStock: true,
  },
  {
    slug: "pin-magsafe-sieu-mong-5000mah-vo-kim-loai",
    name: "Pin dự phòng siêu mỏng 5000mAh sạc không dây MagSafe, vỏ kim loại",
    shortName: "Pin MagSafe vỏ kim loại",
    price: 226000,
    image: "/images/pin-magsafe-kim-loai.jpg",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Siêu mỏng, vỏ kim loại",
      "Hít nam châm, sạc không dây MagSafe cho iPhone",
    ],
    note: "Hàng không hộp. Ảnh minh họa.",
    inStock: true,
  },
  {
    slug: "pin-veger-x5-5000mah-find-my",
    name: "Pin dự phòng VEGER X5 5000mAh (VG-W0582), định vị Apple Find My, sạc nhanh 20W & MagSafe",
    shortName: "Pin VEGER X5 Find My",
    price: 326000,
    image: "/images/pin-veger-x5.jpeg",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Định vị bằng Apple Find My, khó thất lạc",
      "Sạc không dây MagSafe",
      "Sạc nhanh 20W",
    ],
    variants: [
      { name: "Màu sắc", options: [{ label: "Đen", image: "/images/v/pin-veger-x5-5000mah-find-my-1.jpg" }, { label: "Trắng", image: "/images/v/pin-veger-x5-5000mah-find-my-2.jpg" }] },
    ],
    inStock: true,
  },
  {
    slug: "pin-mipow-power-tube-pro-10000mah",
    name: "Pin dự phòng MiPOW Power Tube Pro 10.000mAh, liền cáp Lightning MFi, sạc nhanh 20W, sạc được Apple Watch",
    shortName: "Pin MiPOW Power Tube Pro",
    price: 289000,
    image: "/images/pin-mipow-power-tube.png",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Liền cáp Lightning chuẩn MFi cho iPhone",
      "Sạc nhanh 20W",
      "Sạc được cả Apple Watch",
    ],
    variants: [
      { name: "Màu sắc", options: [{ label: "Đỏ", image: "/images/v/pin-mipow-power-tube-pro-10000mah-1.jpg" }, { label: "Xanh", image: "/images/v/pin-mipow-power-tube-pro-10000mah-2.jpg" }] },
    ],
    inStock: true,
  },
  {
    slug: "tay-cam-pin-nohon-dji-pocket-3-4",
    name: "Tay cầm pin di động NOHON 10.000mAh cho DJI Pocket 3 & Pocket 4, sạc nhanh 22.5W",
    shortName: "Tay cầm pin NOHON DJI Pocket",
    price: 755000,
    image: "/images/tay-cam-pin-nohon-pocket.png",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Vừa làm tay cầm vừa sạc cho DJI Pocket 3 / Pocket 4",
      "Dung lượng 10.000mAh, quay lâu hơn",
      "Sạc nhanh 22.5W",
    ],
    variants: [
      { name: "Dung lượng", options: [{ label: "5.000mAh", price: 629000, soldOut: true }, { label: "10.000mAh", price: 755000 }] },
    ],
    inStock: true,
  },
  {
    slug: "tram-sac-zendure-superbase-m-600wh",
    name: "Trạm sạc ZENDURE SuperBase M (ZDSB600M), công suất 1000W, dung lượng 600Wh",
    shortName: "Trạm sạc Zendure M 600Wh",
    price: 11214000,
    image: "/images/zendure-m-600.png",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Dung lượng 600Wh",
      "Công suất đầu ra 1000W",
      "Hợp cắm trại, dự phòng mất điện",
    ],
    inStock: true,
  },
  {
    slug: "tram-sac-zendure-superbase-1000m",
    name: "Trạm sạc ZENDURE SuperBase 1000M, công suất 1500W, dung lượng 976.8Wh",
    shortName: "Trạm sạc Zendure 1000M",
    price: 15120000,
    image: "/images/zendure-1000m.jpg",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Dung lượng 976.8Wh",
      "Công suất đầu ra 1500W",
      "Hợp cắm trại, dự phòng mất điện",
    ],
    inStock: true,
  },
  {
    slug: "tram-sac-zendure-superbase-pro-1500",
    name: "Trạm sạc di động cao cấp ZENDURE SuperBase Pro 1500 (ZDSBP1500)",
    shortName: "Trạm sạc Zendure Pro 1500",
    price: 18900000,
    image: "/images/zendure-pro-1500.jpg",
    category: "pin",
    warranty: "Liên hệ shop",
    features: [
      "Trạm sạc di động dòng cao cấp của Zendure",
      "Hợp cắm trại, đi phượt, dự phòng mất điện",
    ],
    note: "Ảnh minh họa.",
    inStock: true,
  },

  // ===== Củ sạc, cáp & ổ điện =====
  {
    slug: "cu-sac-voltme-revo-35-duo-c-a",
    name: "Củ sạc nhanh VOLTME Revo 35 Duo GaN 35W, 1 cổng USB-C + 1 cổng USB-A",
    shortName: "Củ sạc VOLTME 35W C+A",
    price: 150000,
    image: "/images/voltme-35w-ca.jpeg",
    category: "sac-cap",
    warranty: "Liên hệ shop",
    features: [
      "Cổng USB-C + USB-A, sạc 2 máy cùng lúc",
      "Sạc nhanh PD 3.0",
      "Công nghệ GaN nhỏ gọn",
    ],
    variants: [
      { name: "Màu sắc", options: [{ label: "Đen", image: "/images/v/cu-sac-voltme-revo-35-duo-c-a-2.jpg" }, { label: "Trắng", image: "/images/v/cu-sac-voltme-revo-35-duo-c-a-1.jpg" }] },
    ],
    inStock: true,
  },
  {
    slug: "cu-sac-voltme-revo-35-duo-lite",
    name: "Củ sạc nhanh VOLTME Revo 35 Duo Lite 35W, 2 cổng Type-C PD",
    shortName: "Củ sạc VOLTME 35W Lite",
    price: 150000,
    image: "/images/voltme-35w-lite.png",
    category: "sac-cap",
    warranty: "Liên hệ shop",
    features: ["2 cổng Type-C, sạc 2 máy cùng lúc", "Sạc nhanh PD tổng 35W"],
    variants: [
      { name: "Màu sắc", options: [{ label: "Đen", image: "/images/v/cu-sac-voltme-revo-35-duo-lite-1.jpg" }, { label: "Trắng", image: "/images/v/cu-sac-voltme-revo-35-duo-lite-2.jpg" }] },
    ],
    inStock: true,
  },
  {
    slug: "cu-sac-voltme-revo-30-mini",
    name: "Củ sạc nhanh VOLTME Revo 30 Mini 30W, công nghệ GaN III siêu nhỏ gọn",
    shortName: "Củ sạc VOLTME 30W Mini",
    price: 125000,
    image: "/images/voltme-30w-mini.png",
    category: "sac-cap",
    warranty: "Liên hệ shop",
    features: ["Sạc nhanh 30W", "Công nghệ GaN III siêu nhỏ gọn"],
    variants: [
      { name: "Màu sắc", options: [{ label: "Trắng", image: "/images/v/cu-sac-voltme-revo-30-mini-1.jpg", soldOut: true }, { label: "Đen", image: "/images/v/cu-sac-voltme-revo-30-mini-2.jpg", soldOut: true }, { label: "Xám", image: "/images/v/cu-sac-voltme-revo-30-mini-4.jpg" }, { label: "Xanh dương", image: "/images/v/cu-sac-voltme-revo-30-mini-3.jpg" }, { label: "Xanh lá", image: "/images/v/cu-sac-voltme-revo-30-mini-5.jpg" }] },
    ],
    inStock: true,
  },
  {
    slug: "cu-sac-voltme-revo-30-mini2",
    name: "Củ sạc nhanh VOLTME Revo 30 Mini2 30W, siêu nhỏ",
    shortName: "Củ sạc VOLTME 30W Mini2",
    price: 125000,
    image: "/images/voltme-30w-mini2.jpeg",
    category: "sac-cap",
    warranty: "Liên hệ shop",
    features: ["Sạc nhanh 30W", "Kích thước siêu nhỏ, bỏ túi dễ dàng"],
    variants: [
      { name: "Màu sắc", options: [{ label: "Xanh lá", image: "/images/v/cu-sac-voltme-revo-30-mini2-1.jpg" }, { label: "Vàng" }, { label: "Hồng", image: "/images/v/cu-sac-voltme-revo-30-mini2-3.jpg" }, { label: "Tím", image: "/images/v/cu-sac-voltme-revo-30-mini2-2.jpg" }, { label: "Trắng", soldOut: true }, { label: "Đen", soldOut: true }, { label: "Xanh" }] },
    ],
    inStock: true,
  },
  {
    slug: "cu-sac-voltme-revo-30-mini-chan-tron",
    name: "Củ sạc nhanh VOLTME Revo 30 Mini 30W (chân tròn), GaN III PD",
    shortName: "Củ sạc VOLTME 30W chân tròn",
    price: 125000,
    image: "/images/voltme-30w-chan-tron.webp",
    category: "sac-cap",
    warranty: "Liên hệ shop",
    features: [
      "Sạc nhanh PD 30W",
      "Công nghệ GaN III nhỏ gọn",
      "Chân tròn cắm vừa ổ điện Việt Nam",
    ],
    variants: [
      { name: "Màu sắc", options: [{ label: "Đen", image: "/images/v/cu-sac-voltme-revo-30-mini-chan-tron-1.jpg", soldOut: true }, { label: "Trắng", soldOut: true }, { label: "Xanh" }, { label: "Ghi", soldOut: true }, { label: "Xanh lá" }] },
    ],
    inStock: true,
  },
  {
    slug: "combo-2-cu-sac-voltme-revo-30",
    name: "Combo 2 củ sạc nhanh VOLTME Revo 30 GaN 30W (chân tròn)",
    shortName: "Combo 2 củ sạc VOLTME 30W",
    price: 251000,
    image: "/images/combo-2-voltme-30w.jpg",
    category: "sac-cap",
    warranty: "Liên hệ shop",
    features: [
      "Combo 2 củ, để nhà một củ, mang theo một củ",
      "Sạc nhanh 30W, công nghệ GaN nhỏ gọn",
      "Chân tròn cắm vừa ổ điện Việt Nam",
    ],
    note: "Ảnh minh họa.",
    inStock: true,
  },
  {
    slug: "combo-2-cu-sac-voltme-revo-20-duo-lite",
    name: "Combo 2 củ sạc nhanh VOLTME Revo 20 Duo Lite 20W, 2 cổng Type-C",
    shortName: "Combo 2 củ sạc VOLTME 20W",
    price: 174000,
    image: "/images/combo-2-voltme-20w.jpeg",
    category: "sac-cap",
    warranty: "Liên hệ shop",
    features: ["Combo 2 củ, mỗi củ 2 cổng Type-C", "Sạc nhanh 20W cho iPhone, Android"],
    inStock: true,
  },
  {
    slug: "hop-combo-3-cu-sac-voltme-20w",
    name: "Hộp combo 3 củ sạc nhanh VOLTME PD 20W (V1166)",
    shortName: "Combo 3 củ sạc VOLTME 20W",
    price: 251000,
    image: "/images/combo-3-voltme-20w.png",
    category: "sac-cap",
    warranty: "Liên hệ shop",
    features: ["Hộp 3 củ sạc, chia cho cả nhà", "Sạc nhanh PD 20W"],
    note: "Ảnh minh họa.",
    inStock: true,
  },
  {
    slug: "cu-sac-joyroom-45w-jr-tcg12",
    name: "Củ sạc nhanh JOYROOM 45W GaN Ultra JR-TCG12 chính hãng",
    shortName: "Củ sạc Joyroom 45W",
    price: 175000,
    image: "/images/joyroom-45w.jpg",
    category: "sac-cap",
    warranty: "Liên hệ shop",
    features: ["Sạc nhanh 45W", "Công nghệ GaN nhỏ gọn", "Hàng chính hãng Joyroom"],
    note: "Ảnh minh họa.",
    variants: [
      { name: "Màu sắc", options: [{ label: "Đen", image: "/images/v/cu-sac-joyroom-45w-jr-tcg12-1.jpg", soldOut: true }, { label: "Trắng", soldOut: true }, { label: "Hồng", image: "/images/v/cu-sac-joyroom-45w-jr-tcg12-2.jpg" }] },
    ],
    inStock: true,
  },
  {
    slug: "cu-sac-wekome-40w-wp-u14",
    name: "Củ sạc nhanh WEKOME WP-U14 40W, 2 cổng Type-C, công nghệ GaN",
    shortName: "Củ sạc Wekome 40W",
    price: 125000,
    image: "/images/wekome-40w.png",
    category: "sac-cap",
    warranty: "Liên hệ shop",
    features: ["2 cổng Type-C, sạc 2 máy cùng lúc", "Sạc nhanh 40W, công nghệ GaN"],
    note: "Hàng không hộp.",
    variants: [
      { name: "Màu sắc", options: [{ label: "Đen", image: "/images/v/cu-sac-wekome-40w-wp-u14-1.jpg" }, { label: "Trắng xanh" }] },
    ],
    inStock: true,
  },
  {
    slug: "bo-sac-toocki-67w-kem-o-ac",
    name: "Bộ sạc nhanh Toocki 67W, 2 cổng C + 1 USB + 1 ổ AC 220V (tải 2500W)",
    shortName: "Bộ sạc Toocki 67W kèm ổ AC",
    price: 276000,
    image: "/images/toocki-67w.png",
    category: "sac-cap",
    warranty: "Liên hệ shop",
    features: [
      "Sạc nhanh tổng 67W qua 2 cổng C + 1 cổng USB",
      "Kèm 1 ổ cắm AC 220V, chịu tải 2500W",
    ],
    inStock: true,
  },
  {
    slug: "o-dien-da-nang-sharoher",
    name: "Ổ điện đa năng Sharoher (hàng Amazon Mỹ): 2 ổ AC 220V, 2 cổng C 20W, 2 USB-A, sạc không dây",
    shortName: "Ổ điện đa năng Sharoher",
    price: 326000,
    image: "/images/o-dien-sharoher.jpg",
    category: "sac-cap",
    warranty: "Liên hệ shop",
    features: [
      "2 ổ AC 220V + 2 cổng Type-C 20W + 2 cổng USB-A",
      "Có đế sạc không dây",
      "Gọn gàng cho bàn làm việc, đầu giường",
    ],
    note: "Hàng Amazon. Ảnh minh họa.",
    variants: [
      { name: "Độ dài dây", options: [{ label: "1,8m", price: 251000 }, { label: "3m", price: 289000 }, { label: "6m", price: 326000 }] },
      { name: "Màu sắc", options: [{ label: "Xanh dương", image: "/images/v/o-dien-da-nang-sharoher-1.jpg" }, { label: "Xanh lá", image: "/images/v/o-dien-da-nang-sharoher-2.jpg" }, { label: "Đỏ", image: "/images/v/o-dien-da-nang-sharoher-3.jpg" }] },
    ],
    inStock: true,
  },

  // ===== Camera & gimbal =====
  {
    slug: "camera-xoay-smus-ptz108op-jg",
    name: "Camera xoay an ninh thông minh SMUS-PTZ108OP-JG",
    shortName: "Camera xoay SMUS PTZ108",
    price: 630000,
    image: "/images/camera-smus-ptz108.jpg",
    category: "camera",
    warranty: "Liên hệ shop",
    features: ["Camera xoay, quan sát nhiều góc", "Hợp gia đình, cửa hàng"],
    note: "Ảnh minh họa.",
    inStock: true,
  },
  {
    slug: "camera-xoay-sfyus-ptz2-fsk",
    name: "Camera xoay an ninh thông minh SFYUS-PTZ2-FSK",
    shortName: "Camera xoay SFYUS PTZ2",
    price: 630000,
    image: "/images/camera-sfyus-ptz2.jpg",
    category: "camera",
    warranty: "Liên hệ shop",
    features: ["Camera xoay, quan sát nhiều góc", "Hợp gia đình, cửa hàng"],
    note: "Ảnh minh họa.",
    inStock: true,
  },
  {
    slug: "camera-xoay-dcsxj-108opw-chay-pin",
    name: "Camera xoay an ninh thông minh DCSXJ-108OPW, chạy pin sạc, quay video offline",
    shortName: "Camera xoay chạy pin DCSXJ",
    price: 503000,
    image: "/images/camera-dcsxj-108opw.jpg",
    category: "camera",
    warranty: "Liên hệ shop",
    features: [
      "Chạy pin sạc, không cần đi dây điện",
      "Quay video offline, không cần mạng",
    ],
    inStock: true,
  },
  {
    slug: "camera-xiaomi-imilab-ec4",
    name: "Bộ camera Xiaomi IMILAB EC4 2.5K (bản quốc tế), pin 5200mAh, kèm Hub Gateway",
    shortName: "Camera Xiaomi IMILAB EC4",
    price: 869000,
    image: "/images/camera-imilab-ec4.png",
    category: "camera",
    warranty: "Liên hệ shop",
    features: [
      "Độ nét 2.5K, bản quốc tế",
      "Pin 5200mAh, không cần đi dây điện",
      "Kèm Hub Gateway",
    ],
    variants: [
      { name: "Phân loại", options: [{ label: "Bộ camera + Hub", image: "/images/v/camera-xiaomi-imilab-ec4-1.jpg", price: 869000 }, { label: "Tấm pin năng lượng mặt trời", image: "/images/v/camera-xiaomi-imilab-ec4-2.jpg", price: 200000 }] },
    ],
    inStock: true,
  },
  {
    slug: "camera-gimbal-xiaomi-90fun-capture-1",
    name: "Camera gimbal XIAOMI 90FUN Capture 1, quay phim 4K, chống rung 3 trục",
    shortName: "Gimbal Xiaomi 90FUN Capture 1",
    price: 3263000,
    image: "/images/gimbal-90fun.jpg",
    category: "camera",
    warranty: "Liên hệ shop",
    features: ["Quay phim 4K", "Gimbal chống rung 3 trục", "Hợp quay vlog, TikTok"],
    variants: [
      { name: "Màu sắc", options: [{ label: "Xanh", image: "/images/v/camera-gimbal-xiaomi-90fun-capture-1-1.jpg" }, { label: "Đen", image: "/images/v/camera-gimbal-xiaomi-90fun-capture-1-2.jpg", soldOut: true }] },
    ],
    inStock: true,
  },
  {
    slug: "camera-gimbal-xiaomi-morange",
    name: "Camera gimbal XIAOMI Morange, quay phim 4K, chống rung 3 trục (bản nội địa)",
    shortName: "Gimbal Xiaomi Morange",
    price: 3767000,
    image: "/images/gimbal-morange.jpg",
    category: "camera",
    warranty: "Liên hệ shop",
    features: ["Quay phim 4K", "Gimbal chống rung 3 trục", "Hợp quay vlog, TikTok"],
    note: "Bản nội địa.",
    variants: [
      { name: "Màu sắc", options: [{ label: "Đen", image: "/images/gimbal-morange.jpg" }, { label: "Xanh", soldOut: true }] },
    ],
    inStock: true,
  },

  // ===== Đồng hồ thông minh =====
  {
    slug: "dong-ho-xiaomi-haylou-rs4-plus",
    name: "Đồng hồ thông minh Xiaomi HAYLOU RS4 Plus, bản quốc tế, kèm 2 dây (màu đen)",
    shortName: "Đồng hồ Haylou RS4 Plus",
    price: 604000,
    image: "/images/dong-ho-haylou-rs4-plus.png",
    category: "dong-ho",
    warranty: "Liên hệ shop",
    features: ["Phiên bản quốc tế", "Kèm 2 dây đeo"],
    note: "Màu đen.",
    inStock: true,
  },
  {
    slug: "dong-ho-xiaomi-black-shark-watch-x",
    name: "Đồng hồ thông minh XIAOMI Black Shark Watch X, lắp SIM độc lập, có camera, định vị",
    shortName: "Đồng hồ Black Shark Watch X",
    price: 1247000,
    image: "/images/dong-ho-black-shark-x.jpg",
    category: "dong-ho",
    warranty: "Liên hệ shop",
    features: [
      "Lắp SIM, dùng độc lập không cần điện thoại",
      "Có camera",
      "Có định vị",
    ],
    inStock: true,
  },

  // ===== Tiện ích =====
  {
    slug: "router-wifi-rock-space-ac2100",
    name: "Router WiFi Rock Space AC2100 RSD0614, 4 ăng-ten, băng tần kép Gigabit, MU-MIMO 4×4",
    shortName: "Router WiFi Rock Space AC2100",
    price: 352000,
    image: "/images/router-rock-space-ac2100.png",
    category: "tien-ich",
    warranty: "Liên hệ shop",
    features: [
      "Băng tần kép, tốc độ AC2100",
      "4 ăng-ten, MU-MIMO 4×4",
      "Cổng mạng Gigabit",
    ],
    inStock: true,
  },
  {
    slug: "may-in-van-don-zlabel",
    name: "Máy in vận đơn ZLabel Solution Seller, in nhiệt bill sàn TMĐT, kết nối app điện thoại",
    shortName: "Máy in vận đơn ZLabel",
    price: 1121000,
    image: "/images/may-in-zlabel.png",
    category: "tien-ich",
    warranty: "Liên hệ shop",
    features: [
      "In nhiệt, không cần mực",
      "In bill vận đơn các sàn thương mại điện tử",
      "Kết nối app trên điện thoại",
    ],
    inStock: true,
  },
  {
    slug: "ghe-o-to-diono-radian-rxt-ii-0-22kg",
    name: "Ghế an toàn ô tô trẻ em DIONO Radian RXT II (Mỹ), cho bé 0–22kg",
    shortName: "Ghế ô tô Diono Radian RXT II 0–22kg",
    price: 2129000,
    image: "/images/ghe-diono-radian-rxt2-22kg.jpg",
    category: "ghe-o-to",
    warranty: "12 tháng",
    features: [
      "Khung thép nguyên khối, bảo vệ va chạm hai bên",
      "Lắp quay sau cho bé sơ sinh, quay trước khi bé lớn",
      "Dây đai 5 điểm, đệm ôm êm ái",
    ],
    note: "Hộp móp/xấu, sản phẩm bên trong mới.",
    inStock: true,
  },
  {
    slug: "ghe-o-to-diono-radian-rxt-ii-0-25kg",
    name: "Ghế an toàn ô tô trẻ em DIONO Radian RXT II (Mỹ), cho bé 0–25kg",
    shortName: "Ghế ô tô Diono Radian RXT II 0–25kg",
    price: 2507000,
    image: "/images/ghe-diono-radian-rxt2-25kg.jpg",
    category: "ghe-o-to",
    warranty: "12 tháng",
    features: [
      "Khung thép nguyên khối, chịu lực cao",
      "Thiết kế Slim-Fit, lắp được 3 ghế cạnh nhau",
      "Gập gọn mang đi du lịch",
    ],
    note: "Hộp móp/xấu, sản phẩm bên trong mới.",
    inStock: true,
  },
  {
    slug: "ghe-o-to-diono-cambria-15-36kg",
    name: "Ghế nâng ô tô trẻ em DIONO Cambria (Mỹ), cho bé 15–36kg",
    shortName: "Ghế ô tô Diono Cambria 15–36kg",
    price: 2507000,
    image: "/images/ghe-diono-cambria.jpg",
    category: "ghe-o-to",
    warranty: "12 tháng",
    features: [
      "2 trong 1: ghế tựa lưng hoặc tháo thành đệm nâng",
      "Đệm đầu chống va chạm hai bên, chuẩn ECE R44/04",
      "Vải lưới thoáng khí, có khay để cốc",
    ],
    note: "Hộp móp/xấu, sản phẩm bên trong mới.",
    inStock: true,
  },
  {
    slug: "ghe-o-to-diono-monterey-2-15-36kg",
    name: "Ghế nâng ô tô trẻ em DIONO Monterey 2 (Mỹ), cho bé 15–36kg",
    shortName: "Ghế ô tô Diono Monterey 2",
    price: 2129000,
    image: "/images/ghe-diono-monterey-2.jpg",
    category: "ghe-o-to",
    warranty: "12 tháng",
    features: [
      "Mở rộng chiều ngang vai, 11 nấc chỉnh tựa đầu",
      "Khoá ISOFIX/LATCH cố định chắc chắn",
      "Tháo lưng thành đệm nâng khi bé lớn",
    ],
    inStock: true,
  },
  {
    slug: "ghe-o-to-popmax-pm2102-0-36kg",
    name: "Ghế an toàn ô tô trẻ em POPMAX PM2102 (UK), cho bé 0–36kg, khoá ISOFIX",
    shortName: "Ghế ô tô POPMAX PM2102",
    price: 3150000,
    image: "/images/ghe-popmax-pm2102.jpg",
    category: "ghe-o-to",
    warranty: "1 tháng",
    features: [
      "Dùng từ sơ sinh đến khoảng 12 tuổi (0–36kg)",
      "Khoá ISOFIX, bảo vệ va chạm hai bên",
      "Vải kháng khuẩn, nhiều hoạ tiết cho bé",
    ],
    variants: [
      { name: "Mẫu", options: [{ label: "Cô Tiên", image: "/images/v/ghe-o-to-popmax-pm2102-0-36kg-2.jpg", soldOut: true }, { label: "Hươu", image: "/images/v/ghe-o-to-popmax-pm2102-0-36kg-1.jpg" }, { label: "Khủng Long", image: "/images/v/ghe-o-to-popmax-pm2102-0-36kg-3.jpg", soldOut: true }, { label: "Lợn Peppa" }] },
    ],
    inStock: true,
  },
  {
    slug: "ghe-o-to-diono-radian-3rx-hong",
    name: "Ghế an toàn ô tô trẻ em DIONO Radian 3RX (Mỹ), khung thép, gập gọn, màu hồng",
    shortName: "Ghế ô tô Diono Radian 3RX hồng",
    price: 2129000,
    image: "/images/ghe-diono-radian-3rx.jpg",
    category: "ghe-o-to",
    warranty: "3 năm",
    features: [
      "3 trong 1: quay sau, quay trước, ghế nâng",
      "Khung thép nguyên khối, Slim-Fit 43cm",
      "Gập phẳng, dùng được trên máy bay (FAA)",
    ],
    note: "Hộp móp/xấu, sản phẩm bên trong mới.",
    inStock: true,
  },
  {
    slug: "ghe-o-to-htt-lm211-0-4-tuoi",
    name: "Ghế ô tô trẻ em HTT LM211 cho bé 0–4 tuổi (không ISOFIX)",
    shortName: "Ghế ô tô HTT LM211",
    price: 1890000,
    image: "/images/ghe-htt-lm211.jpg",
    category: "ghe-o-to",
    warranty: "12 tháng",
    features: [
      "Cho bé 0–18kg, lắp được 2 chiều",
      "3 nấc ngả lưng, dây đai 5 điểm",
      "Lắp bằng dây an toàn ô tô, vải tháo giặt được",
    ],
    note: "Không có khoá ISOFIX.",
    variants: [
      { name: "Màu sắc", options: [{ label: "Đen – đỏ", image: "/images/v/ghe-o-to-htt-lm211-0-4-tuoi-1.jpg" }, { label: "Vàng – nâu", image: "/images/v/ghe-o-to-htt-lm211-0-4-tuoi-2.jpg", soldOut: true }] },
    ],
    inStock: true,
  },
  {
    slug: "ghe-o-to-cybex-aura-fix",
    name: "Ghế ô tô trẻ em Cybex CBX Aura-Fix (Đức), 9 tháng–12 tuổi",
    shortName: "Ghế ô tô Cybex Aura-Fix",
    price: 2129000,
    image: "/images/ghe-cybex-aura-fix.jpg",
    category: "ghe-o-to",
    warranty: "12 tháng",
    features: [
      "Cho bé 9–36kg, dùng từ 9 tháng đến 12 tuổi",
      "Bàn an toàn giảm lực lên cổ và cột sống",
      "Có bản khoá ISOFIX hoặc lắp bằng dây an toàn xe",
    ],
    variants: [
      { name: "Loại", options: [{ label: "Có khoá ISOFIX", price: 2885000 }, { label: "Không khoá ISOFIX", price: 2129000 }] },
      { name: "Màu sắc", options: [{ label: "Đỏ", image: "/images/v/ghe-o-to-cybex-aura-fix-2.jpg" }, { label: "Đen", image: "/images/v/ghe-o-to-cybex-aura-fix-4.jpg" }, { label: "Hồng", image: "/images/v/ghe-o-to-cybex-aura-fix-3.jpg" }, { label: "Xanh", image: "/images/ghe-cybex-aura-fix.jpg" }] },
    ],
    inStock: true,
  },
  {
    slug: "ghe-o-to-diono-radian-rxt",
    name: "Ghế an toàn ô tô trẻ em DIONO Radian RXT (Mỹ), dùng từ sơ sinh đến 12 tuổi",
    shortName: "Ghế ô tô Diono Radian RXT",
    price: 2129000,
    image: "/images/ghe-diono-radian-rxt.jpg",
    category: "ghe-o-to",
    warranty: "12 tháng",
    features: [
      "3 trong 1, cho bé 0–54kg",
      "Khung thép, đệm memory foam, tựa đầu 12 nấc",
      "Gập gọn, dùng được trên máy bay (FAA)",
    ],
    inStock: false,
  },
  {
    slug: "ghe-o-to-apramo-metro-hub-xoay-360",
    name: "Ghế an toàn ô tô trẻ em APRAMO Metro Hub (Anh), xoay 360°, khoá ISOFIX",
    shortName: "Ghế ô tô Apramo Metro Hub 360°",
    price: 3263000,
    image: "/images/ghe-apramo-metro-hub.jpg",
    category: "ghe-o-to",
    warranty: "12 tháng",
    features: [
      "Xoay 360° đưa bé ra vào xe dễ dàng",
      "Chuẩn i-Size ECE R129, khoá ISOFIX + chân chống",
      "4 nấc ngả lưng, cho bé sơ sinh đến 4 tuổi",
    ],
    variants: [
      { name: "Màu sắc", options: [{ label: "Đen xám", image: "/images/v/ghe-o-to-apramo-metro-hub-xoay-360-1.jpg" }, { label: "Đỏ cam", image: "/images/v/ghe-o-to-apramo-metro-hub-xoay-360-2.jpg" }] },
    ],
    inStock: true,
  },
];

export const categories: { id: Product["category"] | "all"; label: string; short: string }[] = [
  { id: "all", label: "Tất cả", short: "Tất cả" },
  { id: "pin", label: "Pin & trạm sạc", short: "Pin" },
  { id: "sac-cap", label: "Củ sạc, cáp & ổ điện", short: "Củ sạc" },
  { id: "camera", label: "Camera & gimbal", short: "Camera" },
  { id: "dong-ho", label: "Đồng hồ", short: "Đồng hồ" },
  { id: "am-thanh", label: "Âm thanh", short: "Âm thanh" },
  { id: "tien-ich", label: "Tiện ích", short: "Tiện ích" },
  { id: "ghe-o-to", label: "Ghế ô tô trẻ em", short: "Ghế ô tô" },
];

export function categoryLabel(id: Product["category"]) {
  return categories.find((c) => c.id === id)?.label ?? "";
}

// Sản phẩm nổi bật trên trang chủ, theo đúng thứ tự này.
export const featuredSlugs = [
  "pin-du-phong-20000mah-kem-2-cap",
  "cu-sac-voltme-revo-35-duo",
  "pin-magsafe-nohon-10000mah",
  "mic-khong-day-ugreen-mic-6",
  "pin-du-phong-energyqc-72000mah-130w",
  "may-phien-dich-enence",
  "bo-qua-baseus-limited-edition",
  "o-sac-cuky-4-cong",
];

// Nhãn hiển thị trên ảnh sản phẩm.
export function productBadge(p: Product) {
  return p.preorder ? "Hàng order" : p.badge;
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

// Giá thấp nhất / cao nhất khi có phân loại khác giá.
export function priceRange(p: Product): [number, number] {
  const prices = (p.variants ?? [])
    .flatMap((g) => g.options.filter((o) => !o.soldOut).map((o) => o.price))
    .filter((x): x is number => !!x);
  if (!prices.length) return [p.price, p.price];
  return [Math.min(...prices), Math.max(...prices)];
}

export function formatPrice(v: number) {
  return v.toLocaleString("vi-VN") + "đ";
}
