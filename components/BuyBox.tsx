"use client";

import { useState } from "react";
import { Product, formatPrice, priceRange } from "@/data/products";
import { shop, zaloUrl, telUrl, orderMessage } from "@/lib/config";
import CopyOrderLink from "./CopyOrderLink";
import { GALLERY_EVENT } from "./ProductGallery";
import { CartPlus } from "./Icons";

// Giá + chọn phân loại + nút đặt hàng. children = phần mô tả nằm giữa giá và nút.
export default function BuyBox({ product, children }: { product: Product; children: React.ReactNode }) {
  const groups = product.variants ?? [];
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [missing, setMissing] = useState<string[]>([]);

  const chosen = groups.map((g) => g.options.find((o) => o.label === picked[g.name]));
  const optionPrice = chosen.find((o) => o?.price)?.price;
  const [min, max] = priceRange(product);
  const priceText =
    optionPrice ? formatPrice(optionPrice) : min !== max ? `${formatPrice(min)} – ${formatPrice(max)}` : formatPrice(product.price);

  const variantText = groups.map((g) => picked[g.name] && `${g.name}: ${picked[g.name]}`).filter(Boolean).join(", ");
  const message = orderMessage({ ...product, price: optionPrice ?? (min !== max ? min : product.price) }, variantText);

  const canOrder = () => {
    const miss = groups.filter((g) => !picked[g.name]).map((g) => g.name);
    setMissing(miss);
    return miss.length === 0;
  };

  const pick = (group: string, label: string) => {
    const turningOn = picked[group] !== label;
    setPicked((p) => ({ ...p, [group]: turningOn ? label : "" }));
    setMissing((m) => m.filter((x) => x !== group));
    const img = groups.find((g) => g.name === group)?.options.find((o) => o.label === label)?.image;
    if (turningOn && img) window.dispatchEvent(new CustomEvent(GALLERY_EVENT, { detail: img }));
  };

  return (
    <>
      <p className="price big">{priceText}</p>
      {children}
      {groups.length > 0 && (
        <div className="variants">
          {groups.map((g) => (
            <div key={g.name} className={`variant-group ${missing.includes(g.name) ? "variant-missing" : ""}`}>
              <p className="variant-name">{g.name}</p>
              <div className="variant-options">
                {g.options.map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    className={`variant-opt ${picked[g.name] === o.label ? "active" : ""}`}
                    disabled={o.soldOut}
                    aria-pressed={picked[g.name] === o.label}
                    onClick={() => pick(g.name, o.label)}
                  >
                    {o.label}
                    {o.soldOut && <small> (hết)</small>}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {missing.length > 0 && <p className="variant-error">Vui lòng chọn {missing.join(", ").toLowerCase()} trước khi đặt hàng.</p>}
        </div>
      )}
      <div className="order-buttons">
        <CopyOrderLink className="btn btn-primary btn-xl" href={shop.messenger} message={message} canOrder={canOrder}>
          <CartPlus size={22} /> Đặt hàng qua Messenger
        </CopyOrderLink>
        <div className="order-row">
          {zaloUrl && (
            <CopyOrderLink className="btn btn-zalo btn-lg" href={zaloUrl} message={message} canOrder={canOrder}>
              Chat Zalo
            </CopyOrderLink>
          )}
          {telUrl && <a className="btn btn-outline btn-lg" href={telUrl}>Gọi điện</a>}
        </div>
        <p className="order-hint">
          Bấm đặt hàng là thông tin sản phẩm (kèm hình{groups.length ? " và phân loại bạn chọn" : ""}) được copy sẵn — vào khung chat chỉ cần <b>Dán</b> rồi <b>Gửi</b>.
        </p>
      </div>
    </>
  );
}
