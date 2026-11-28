"use client";

import { useEffect, useState } from "react";

// Nút mở Messenger/Zalo, đồng thời copy sẵn tên + giá + link sản phẩm.
// Khách chỉ cần Dán rồi Gửi; link sẽ tự hiện thẻ có ảnh sản phẩm trong khung chat.
export default function CopyOrderLink({ href, message, className, children }: {
  href: string;
  message: string;
  className: string;
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const copy = () => {
    // Không chặn mở link: copy chạy song song trong cùng lượt bấm.
    const done = () => setToast(true);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(message).then(done, () => fallbackCopy(message) && done());
    } else if (fallbackCopy(message)) {
      done();
    }
  };

  return (
    <>
      <a className={className} href={href} target="_blank" rel="noopener noreferrer" onClick={copy}>
        {children}
      </a>
      {toast && (
        <div className="toast" role="status">
          ✅ Đã copy thông tin sản phẩm — vào khung chat bấm <b>Dán</b> rồi <b>Gửi</b> nhé
        </div>
      )}
    </>
  );
}

function fallbackCopy(text: string) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
