import { shop } from "@/lib/config";

export default function OrderButtons({ productName }: { productName?: string }) {
  const zaloNumber = shop.zalo.replace(/\D/g, "");
  return (
    <div className="order-buttons">
      <a className="btn btn-primary" href={shop.messenger} target="_blank" rel="noopener noreferrer">
        Đặt hàng qua Messenger
      </a>
      {zaloNumber && (
        <a className="btn btn-zalo" href={`https://zalo.me/${zaloNumber}`} target="_blank" rel="noopener noreferrer">
          Chat Zalo
        </a>
      )}
      {shop.phone && (
        <a className="btn btn-outline" href={`tel:${shop.phone.replace(/\s/g, "")}`}>
          Gọi {shop.phone}
        </a>
      )}
      {productName && (
        <p className="order-hint">
          Nhắn tên sản phẩm <strong>“{productName}”</strong> để được báo giá ship và chốt đơn.
        </p>
      )}
    </div>
  );
}
