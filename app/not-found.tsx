import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section">
      <h1>Không tìm thấy sản phẩm</h1>
      <p><Link href="/">Về trang chủ</Link></p>
    </div>
  );
}
