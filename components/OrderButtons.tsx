import { shop, zaloUrl, telUrl, orderMessage } from "@/lib/config";
import { Product } from "@/data/products";
import CopyOrderLink from "./CopyOrderLink";

export default function OrderButtons({ product }: { product: Product }) {
  const message = orderMessage(product);
  return (
    <div className="order-buttons">
      <CopyOrderLink className="btn btn-primary btn-xl" href={shop.messenger} message={message}>
        Đặt hàng qua Messenger
      </CopyOrderLink>
      <div className="order-row">
        {zaloUrl && (
          <CopyOrderLink className="btn btn-zalo btn-lg" href={zaloUrl} message={message}>
            Chat Zalo
          </CopyOrderLink>
        )}
        {telUrl && <a className="btn btn-outline btn-lg" href={telUrl}>Gọi điện</a>}
      </div>
      <p className="order-hint">
        Bấm đặt hàng là thông tin sản phẩm (kèm hình) được copy sẵn — vào khung chat chỉ cần <b>Dán</b> rồi <b>Gửi</b>.
      </p>
    </div>
  );
}
