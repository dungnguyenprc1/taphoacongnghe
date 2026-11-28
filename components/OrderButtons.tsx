import { shop, zaloUrl, telUrl } from "@/lib/config";

export default function OrderButtons({ productName }: { productName?: string }) {
  return (
    <div className="order-buttons">
      <a className="btn btn-primary btn-xl" href={shop.messenger} target="_blank" rel="noopener noreferrer">
        Đặt hàng qua Messenger
      </a>
      <div className="order-row">
        {zaloUrl && (
          <a className="btn btn-zalo btn-lg" href={zaloUrl} target="_blank" rel="noopener noreferrer">Chat Zalo</a>
        )}
        {telUrl && <a className="btn btn-outline btn-lg" href={telUrl}>Gọi điện</a>}
      </div>
      {productName && (
        <p className="order-hint">
          Nhắn tên sản phẩm “{productName}” để được báo phí ship và chốt đơn.
        </p>
      )}
    </div>
  );
}
