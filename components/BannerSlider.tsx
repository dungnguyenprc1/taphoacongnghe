"use client";
import { useEffect, useState } from "react";

const slides = [
  { title: "Nova X15 Series", sub: "Giảm đến 4 triệu · Trả góp 0%", bg: "linear-gradient(120deg,#1e3c72,#2a5298)", icon: "📱" },
  { title: "Laptop Back to School", sub: "Tặng balo + chuột · Giảm thêm 500K", bg: "linear-gradient(120deg,#ff512f,#dd2476)", icon: "💻" },
  { title: "Tuần lễ Phụ kiện", sub: "Đồng giá từ 99K", bg: "linear-gradient(120deg,#11998e,#38ef7d)", icon: "🎧" },
  { title: "Đồng hồ thông minh", sub: "Mua 1 tặng 1 dây đeo", bg: "linear-gradient(120deg,#8e2de2,#4a00e0)", icon: "⌚" },
];

export default function BannerSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="banner-wrap">
      <div className="slider">
        {slides.map((s, idx) => (
          <div key={idx} className={`slide ${idx === i ? "active" : ""}`} style={{ background: s.bg }}>
            <div>
              <h2>{s.title}</h2>
              <p>{s.sub}</p>
              <button className="btn-white">Mua ngay</button>
            </div>
            <span className="slide-icon">{s.icon}</span>
          </div>
        ))}
        <button className="arrow left" onClick={() => setI((i - 1 + slides.length) % slides.length)}>‹</button>
        <button className="arrow right" onClick={() => setI((i + 1) % slides.length)}>›</button>
        <div className="dots">
          {slides.map((_, idx) => (
            <span key={idx} className={idx === i ? "on" : ""} onClick={() => setI(idx)} />
          ))}
        </div>
      </div>
      <div className="side-banners">
        <div style={{ background: "linear-gradient(120deg,#f7971e,#ffd200)" }}>Thu cũ đổi mới<br /><small>Trợ giá 3 triệu</small></div>
        <div style={{ background: "linear-gradient(120deg,#00c6ff,#0072ff)" }}>Sim số đẹp<br /><small>Chỉ từ 50K</small></div>
      </div>
    </section>
  );
}
