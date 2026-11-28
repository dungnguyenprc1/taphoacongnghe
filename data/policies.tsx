import type { ReactNode } from "react";
import { shop, zaloUrl, prettyPhone } from "@/lib/config";

// Các trang chính sách. Mỗi mục là một trang ở /<slug>, tự hiện ở footer và sitemap.
export type Policy = { slug: string; title: string; description: string; body: ReactNode };

export const policiesUpdated = "28/11/2026";

const phone = prettyPhone(shop.phone);

// "Zalo/điện thoại 0369 680 613, fanpage hoặc email ..." — tự bỏ phần chưa điền.
function Contact() {
  return (
    <>
      Zalo/điện thoại{" "}
      {zaloUrl ? <a href={zaloUrl} target="_blank" rel="noopener noreferrer">{phone}</a> : phone},{" "}
      <a href={shop.facebook} target="_blank" rel="noopener noreferrer">fanpage</a>
      {shop.email && <> hoặc email <a href={`mailto:${shop.email}`}>{shop.email}</a></>}
    </>
  );
}

const contactInfo: Policy = {
  slug: "gioi-thieu",
  title: "Giới thiệu & liên hệ",
  description: "Thông tin liên hệ và nguồn hàng của Điện Tử Giá Kho.",
  body: (
    <>
      <h2>Thông tin liên hệ</h2>
      <ul>
        <li><b>Cửa hàng:</b> {shop.name} – {shop.domain}</li>
        {shop.owner && <li><b>Người phụ trách:</b> {shop.owner}</li>}
        <li><b>Số điện thoại / Zalo:</b> {zaloUrl ? <a href={zaloUrl} target="_blank" rel="noopener noreferrer">{phone}</a> : phone}</li>
        {shop.email && <li><b>Email:</b> <a href={`mailto:${shop.email}`}>{shop.email}</a></li>}
        {shop.address && <li><b>Địa chỉ liên hệ:</b> {shop.address}</li>}
        <li><b>Fanpage:</b> <a href={shop.facebook} target="_blank" rel="noopener noreferrer">facebook.com/{shop.facebook.split("/").pop()}</a></li>
        <li><b>Giờ hỗ trợ:</b> {shop.hours}</li>
      </ul>
      <h2>Về nguồn hàng</h2>
      <p>
        {shop.name} cung cấp phụ kiện công nghệ (sạc dự phòng, củ sạc, cáp, micro, camera…). Một số sản phẩm là hàng có sẵn
        trong nước, một số là hàng order/nhập từ các sàn quốc tế như Amazon, eBay (bản quốc tế). Mỗi sản phẩm đều ghi rõ loại
        hàng (có sẵn hay order), tình trạng (mới/đã qua sử dụng) và thời gian bảo hành trên trang sản phẩm.
      </p>
    </>
  ),
};

const shipping: Policy = {
  slug: "chinh-sach-giao-hang",
  title: "Chính sách giao hàng và kiểm hàng",
  description: "Phạm vi, thời gian, phí giao hàng, thanh toán COD và quy định kiểm hàng.",
  body: (
    <>
      <h2>Phạm vi giao hàng</h2>
      <p>Toàn quốc, qua các đơn vị vận chuyển như GHN, GHTK, Viettel Post, J&amp;T.</p>
      <h2>Thời gian giao hàng (dự kiến)</h2>
      <ul>
        <li><b>Hàng có sẵn:</b> 1–2 ngày (nội thành), 2–5 ngày (tỉnh khác).</li>
        <li><b>Hàng order:</b> 7–20 ngày tùy sản phẩm. Thời gian cụ thể được ghi trên trang sản phẩm và báo lại khi xác nhận đơn.</li>
      </ul>
      <h2>Phí vận chuyển</h2>
      <p>Hiển thị khi đặt hàng hoặc được báo khi shop gọi/nhắn xác nhận đơn.</p>
      <h2>Thanh toán</h2>
      <p>
        Thanh toán khi nhận hàng (COD). Với hàng order giá trị cao, shop có thể đề nghị đặt cọc trước một phần và sẽ báo rõ số
        tiền trước khi khách đồng ý.
      </p>
      <h2>Kiểm hàng</h2>
      <p>
        Khách được mở gói kiểm tra ngoại quan sản phẩm (đúng mẫu, đúng số lượng, không vỡ móp) trước khi thanh toán. Nếu sản
        phẩm không đúng, khách có quyền từ chối nhận và không phải trả tiền hàng.
      </p>
      <p className="policy-alert">
        <b>Lưu ý quan trọng:</b> Khách bắt buộc quay video khi mở hàng (quay liên tục, thấy rõ mã vận đơn và sản phẩm). Đây là
        căn cứ duy nhất để shop xử lý đổi trả, hoàn tiền hoặc bảo hành do thiếu, sai, hư hỏng khi giao.
      </p>
    </>
  ),
};

const returns: Policy = {
  slug: "chinh-sach-doi-tra",
  title: "Chính sách đổi trả và hoàn tiền",
  description: "Thời hạn 5 ngày, điều kiện video mở hàng, các trường hợp được và không được đổi trả, cách hoàn tiền.",
  body: (
    <>
      <h2>Thời hạn</h2>
      <p>Trong vòng 5 ngày kể từ ngày nhận hàng.</p>
      <h2>Điều kiện bắt buộc – video mở hàng</h2>
      <p className="policy-alert">
        Mọi yêu cầu đổi trả, hoàn tiền hoặc khiếu nại thiếu/sai/hư hỏng sản phẩm đều phải kèm video quay liên tục từ lúc mở
        gói hàng: thấy rõ gói hàng còn nguyên niêm phong, mã vận đơn, và toàn bộ sản phẩm bên trong. Video không bị cắt ghép.
        Shop có quyền từ chối giải quyết nếu không có video mở hàng.
      </p>
      <h2>Được đổi trả miễn phí khi</h2>
      <ul>
        <li>Giao sai mẫu, sai màu, sai số lượng so với đơn đặt.</li>
        <li>Sản phẩm lỗi từ nhà sản xuất (không lên nguồn, không sạc, không kết nối…).</li>
        <li>Sản phẩm bị hư hỏng do vận chuyển.</li>
      </ul>
      <h2>Không áp dụng đổi trả khi</h2>
      <ul>
        <li>Sản phẩm bị rơi vỡ, vào nước, cháy nổ do sử dụng sai cách.</li>
        <li>Mất hộp, phụ kiện, tem bảo hành, hoặc tem bị rách/sửa.</li>
        <li>
          Khách đổi ý sau khi đã nhận và sử dụng. (Với hàng còn nguyên seal, shop có thể hỗ trợ đổi sang sản phẩm khác; khách
          chịu phí vận chuyển hai chiều.)
        </li>
      </ul>
      <h2>Cách yêu cầu đổi trả</h2>
      <p>
        Liên hệ <Contact />, gửi mã đơn, video mở hàng và ảnh/video tình trạng sản phẩm. Shop phản hồi trong 24 giờ.
      </p>
      <h2>Hoàn tiền</h2>
      <p>
        Sau khi shop nhận lại hàng và kiểm tra, tiền được hoàn qua chuyển khoản trong 3–5 ngày làm việc. Nếu lỗi do shop, shop
        chịu toàn bộ phí vận chuyển.
      </p>
    </>
  ),
};

const warranty: Policy = {
  slug: "chinh-sach-bao-hanh",
  title: "Chính sách bảo hành",
  description: "Thời gian bảo hành theo từng sản phẩm, bảo hành 1 đổi 1, các trường hợp không bảo hành.",
  body: (
    <>
      <h2>Thời gian bảo hành</h2>
      <p>
        Ghi cụ thể trên từng trang sản phẩm (ví dụ: 15 ngày, 3 tháng, 6 tháng, 12 tháng). Thời gian tính từ ngày khách nhận
        hàng.
      </p>
      <h2>Hình thức</h2>
      <p>
        Bảo hành 1 đổi 1 với sản phẩm cùng loại (hoặc tương đương nếu hết hàng) khi lỗi do nhà sản xuất. Sau thời gian 1 đổi 1,
        shop hỗ trợ sửa chữa nếu có thể.
      </p>
      <h2>Không bảo hành khi</h2>
      <ul>
        <li>Sản phẩm bị va đập, rơi vỡ, vào nước, phồng pin do sử dụng sai cách.</li>
        <li>Tự ý tháo mở, sửa chữa.</li>
        <li>Dùng sai nguồn điện, sai bộ sạc gây hư hỏng.</li>
        <li>Hết thời gian bảo hành.</li>
      </ul>
      <h2>Cách gửi bảo hành</h2>
      <p>
        Liên hệ shop trước qua <Contact /> để được hướng dẫn, sau đó gửi sản phẩm kèm mã đơn hàng. Shop chịu phí gửi trả lại
        cho khách nếu sản phẩm được chấp nhận bảo hành.
      </p>
      <p className="policy-alert">
        <b>Lưu ý an toàn với pin và sạc dự phòng:</b> Không để gần nguồn nhiệt, không sạc qua đêm khi pin có dấu hiệu phồng,
        nóng bất thường; ngừng dùng và liên hệ shop ngay.
      </p>
    </>
  ),
};

const privacy: Policy = {
  slug: "chinh-sach-bao-mat",
  title: "Chính sách bảo mật thông tin",
  description: "Thông tin shop thu thập, mục đích sử dụng, chia sẻ, cookie và quyền của khách hàng.",
  body: (
    <>
      <h2>Thông tin shop thu thập</h2>
      <p>Họ tên, số điện thoại, địa chỉ giao hàng, email (nếu có), nội dung đơn hàng.</p>
      <h2>Mục đích sử dụng</h2>
      <ul>
        <li>Xác nhận và giao đơn hàng.</li>
        <li>Liên hệ hỗ trợ, bảo hành, đổi trả.</li>
        <li>Gửi thông tin khuyến mãi (chỉ khi khách đồng ý; khách có thể yêu cầu ngừng bất cứ lúc nào).</li>
      </ul>
      <h2>Chia sẻ thông tin</h2>
      <p>
        Shop chỉ cung cấp tên, số điện thoại, địa chỉ cho đơn vị vận chuyển để giao hàng. Shop không bán hay chia sẻ thông tin
        khách hàng cho bên thứ ba khác, trừ khi cơ quan nhà nước có thẩm quyền yêu cầu theo quy định pháp luật.
      </p>
      <h2>Cookie và quảng cáo</h2>
      <p>
        Website có thể dùng cookie và công cụ đo lường (như Facebook Pixel, Google Analytics) để thống kê lượt truy cập và
        hiển thị quảng cáo phù hợp. Khách có thể tắt cookie trong cài đặt trình duyệt.
      </p>
      <h2>Thời gian lưu trữ</h2>
      <p>Thông tin được lưu đến khi khách yêu cầu xóa hoặc khi không còn cần cho mục đích trên.</p>
      <h2>Quyền của khách hàng</h2>
      <p>
        Khách có quyền yêu cầu xem, sửa hoặc xóa thông tin cá nhân của mình bằng cách liên hệ <Contact />.
      </p>
      <h2>Bảo mật</h2>
      <p>Shop cam kết giữ bí mật thông tin khách hàng và áp dụng các biện pháp hợp lý để bảo vệ dữ liệu.</p>
    </>
  ),
};

const terms: Policy = {
  slug: "dieu-khoan-su-dung",
  title: "Điều khoản sử dụng",
  description: "Điều khoản khi truy cập và đặt hàng tại Điện Tử Giá Kho.",
  body: (
    <ul>
      <li>Khi truy cập và đặt hàng tại {shop.domain}, khách hàng đồng ý với các chính sách của cửa hàng.</li>
      <li>Giá và tình trạng hàng có thể thay đổi; giá áp dụng là giá tại thời điểm shop xác nhận đơn.</li>
      <li>Hình ảnh sản phẩm mang tính minh họa; màu sắc thực tế có thể chênh lệch nhẹ do màn hình.</li>
      <li>
        Shop có quyền từ chối hoặc hủy đơn khi phát hiện thông tin đặt hàng không chính xác, hoặc khi sản phẩm hết hàng (sẽ báo
        và hoàn tiền cọc nếu có).
      </li>
      <li>
        Tên thương hiệu và sản phẩm (Baseus, Zendure, VOLTME…) thuộc về chủ sở hữu tương ứng. {shop.name} là đơn vị bán lẻ,
        không phải đại lý chính hãng, trừ khi được ghi rõ.
      </li>
      <li>Mọi thắc mắc, khiếu nại vui lòng liên hệ <Contact />. Shop phản hồi trong 24 giờ.</li>
    </ul>
  ),
};

const howToBuy: Policy = {
  slug: "huong-dan-mua-hang",
  title: "Hướng dẫn mua hàng",
  description: "Cách đặt hàng trên website hoặc qua Messenger/Zalo.",
  body: (
    <>
      <h2>Cách 1 – Đặt trên website</h2>
      <ol>
        <li>Chọn sản phẩm, xem kỹ mô tả, loại hàng (có sẵn hay order) và thời gian bảo hành. Chọn phân loại (màu, loại…) nếu có.</li>
        <li>
          Bấm <b>Đặt hàng qua Messenger</b> hoặc <b>Chat Zalo</b>. Thông tin sản phẩm được copy sẵn — vào khung chat bấm Dán rồi
          Gửi, kèm họ tên, số điện thoại và địa chỉ nhận hàng.
        </li>
        <li>Shop gọi hoặc nhắn tin xác nhận đơn, báo tổng tiền (gồm phí ship) và thời gian giao dự kiến.</li>
        <li>Nhận hàng, quay video mở hàng, kiểm tra rồi thanh toán cho shipper.</li>
      </ol>
      <h2>Cách 2 – Đặt qua Messenger/Zalo</h2>
      <p>
        Gửi tên hoặc ảnh sản phẩm, số lượng, họ tên, số điện thoại và địa chỉ qua{" "}
        <a href={shop.messenger} target="_blank" rel="noopener noreferrer">fanpage</a> hoặc Zalo{" "}
        {zaloUrl ? <a href={zaloUrl} target="_blank" rel="noopener noreferrer">{phone}</a> : phone}. Shop sẽ xác nhận và lên đơn.
      </p>
      <h2>Lưu ý</h2>
      <ul>
        <li>Đơn chỉ được gửi đi sau khi shop xác nhận với khách.</li>
        <li>
          Muốn đổi hoặc hủy đơn, vui lòng báo trước khi shop giao cho đơn vị vận chuyển. Với hàng order đã đặt cọc, việc hủy đơn
          sẽ được thỏa thuận riêng.
        </li>
        <li>
          Vui lòng giữ máy để shipper liên hệ. Khách cố ý bỏ đơn nhiều lần có thể bị yêu cầu chuyển khoản trước cho các đơn sau.
        </li>
      </ul>
    </>
  ),
};

const complaints: Policy = {
  slug: "quy-trinh-khieu-nai",
  title: "Quy trình xử lý khiếu nại",
  description: "Các bước gửi và xử lý khiếu nại tại Điện Tử Giá Kho.",
  body: (
    <>
      <p>Shop luôn muốn giải quyết nhanh và công bằng mọi vấn đề của khách.</p>
      <ol>
        <li>
          <b>Gửi khiếu nại:</b> Liên hệ <Contact />, kèm mã đơn hàng, mô tả vấn đề và video mở hàng (bắt buộc). Video phải quay
          liên tục từ lúc mở gói, thấy rõ niêm phong, mã vận đơn và sản phẩm bên trong, không cắt ghép. Shop chỉ tiếp nhận khiếu
          nại khi có video mở hàng; không có video, shop có quyền từ chối giải quyết.
        </li>
        <li><b>Tiếp nhận:</b> Shop xác nhận đã nhận khiếu nại trong vòng 24 giờ.</li>
        <li>
          <b>Xem xét:</b> Shop kiểm tra thông tin, đối chiếu với đơn vị vận chuyển hoặc nhà cung cấp nếu cần, và trả lời hướng
          giải quyết trong 3 ngày làm việc.
        </li>
        <li><b>Giải quyết:</b> Đổi hàng, bảo hành, hoàn tiền một phần hoặc toàn bộ tùy trường hợp, theo các chính sách của shop.</li>
        <li>
          <b>Nếu chưa đồng ý:</b> Hai bên ưu tiên thương lượng. Nếu không thống nhất được, khách có thể gửi yêu cầu đến cơ quan
          bảo vệ quyền lợi người tiêu dùng hoặc cơ quan có thẩm quyền theo quy định pháp luật.
        </li>
      </ol>
      <p>Shop cam kết giữ bí mật thông tin khiếu nại và không tự ý đăng tải thông tin cá nhân của khách.</p>
    </>
  ),
};

export const policies: Policy[] = [howToBuy, shipping, returns, warranty, complaints, privacy, terms, contactInfo];

export const getPolicy = (slug: string) => policies.find((p) => p.slug === slug);
