# Website Điện Tử Giá Kho (Next.js)

Website bán hàng 10 sản phẩm: trang chủ có lọc theo loại, trang chi tiết từng sản phẩm,
nút đặt hàng qua Messenger / Zalo / gọi điện.

## Chạy trên máy

Cần Node.js 18.18 trở lên (tải ở nodejs.org).

```
npm install
npm run dev
```

Mở http://localhost:3000

## Sửa nội dung

| Muốn sửa | File |
|---|---|
| Tên shop, link Messenger, số Zalo, số điện thoại, chính sách | `lib/config.ts` |
| Sản phẩm: tên, giá, đặc điểm, bảo hành, ghi chú | `data/products.ts` |
| Ảnh sản phẩm | thư mục `public/images/` |
| Màu sắc, giao diện | `app/globals.css` |

Thêm sản phẩm: copy một khối `{ ... }` trong `data/products.ts`, đổi `slug` (không dấu, nối bằng gạch ngang),
đặt ảnh vào `public/images/` rồi sửa đường dẫn `image`.

Lưu ý: file `data/products.ts` chỉ chứa giá bán. Đừng đưa giá gốc hay link nguồn hàng vào đây,
vì ai cũng xem được code của website sau khi đăng lên.

## Đưa lên mạng miễn phí (Vercel)

1. Tạo tài khoản GitHub, tải thư mục này lên một repository mới.
2. Vào vercel.com, đăng nhập bằng GitHub, chọn **Add New → Project**, chọn repository đó, bấm **Deploy**.
3. Vài phút sau có link dạng `ten-du-an.vercel.app`. Có tên miền riêng thì gắn trong **Settings → Domains**.

Mỗi lần sửa code và đẩy lên GitHub, Vercel tự cập nhật website.
