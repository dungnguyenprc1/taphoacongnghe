import Form from "next/form";
import { Search } from "./Icons";

// Ô tìm kiếm: gửi ?q=... về trang chủ, danh sách sản phẩm tự lọc theo từ khoá.
export default function SearchBox({ className, placeholder }: { className: string; placeholder: string }) {
  return (
    <Form action="/" className={className} role="search">
      <Search className="search-icon" />
      <input name="q" type="search" placeholder={placeholder} aria-label="Tìm sản phẩm" />
    </Form>
  );
}
