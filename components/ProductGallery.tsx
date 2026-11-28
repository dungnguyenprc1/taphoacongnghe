"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Sự kiện để BuyBox đổi ảnh chính khi khách chọn phân loại có ảnh riêng.
export const GALLERY_EVENT = "product-gallery-show";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(images[0]);

  useEffect(() => {
    const onShow = (e: Event) => {
      const src = (e as CustomEvent<string>).detail;
      if (src) setCurrent(src);
    };
    window.addEventListener(GALLERY_EVENT, onShow);
    return () => window.removeEventListener(GALLERY_EVENT, onShow);
  }, []);

  return (
    <div className="detail-media">
      <div className="detail-img">
        <Image
          key={current}
          src={current}
          alt={alt}
          fill
          priority
          unoptimized={current.endsWith(".svg")}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <div className="thumbs">
          {images.map((src) => (
            <button
              key={src}
              type="button"
              className={`thumb ${src === current ? "active" : ""}`}
              onClick={() => setCurrent(src)}
              aria-label="Xem ảnh"
            >
              <Image src={src} alt="" fill sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
