import React, { useState, useEffect, useRef } from "react";

export default function CategoryDescription({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // Reset state khi description thay đổi (chuyển trang)
    setIsExpanded(false);
    setNeedsTruncation(false); // Reset trước khi kiểm tra lại

    const checkHeight = () => {
      if (contentRef.current) {
        requestAnimationFrame(() => {
          if (contentRef.current) {
            const currentHeight = contentRef.current.scrollHeight;
            if (currentHeight > 400) {
              setNeedsTruncation(true);
            } else {
              setNeedsTruncation(false);
            }
          }
        });
      }
    };

    // Chạy kiểm tra chiều cao sau một khoảng delay nhỏ
    const timer = setTimeout(checkHeight, 50);

    return () => clearTimeout(timer);
  }, [description]); // Chỉ chạy lại khi description thay đổi

  if (!description) {
    return null; // Không hiển thị gì nếu không có mô tả
  }

  return (
    <div className="mt-8 md:mt-12 pt-6 border-t relative">
      {" "}
      {/* Thêm relative cho gradient */}
      <div
        ref={contentRef}
        // Thêm class `prose` (cần plugin @tailwindcss/typography)
        className={`prose prose-sm max-w-none transition-all duration-500 ease-in-out ${
          needsTruncation && !isExpanded
            ? "max-h-[400px] overflow-hidden"
            : "max-h-none"
        }`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {/* Lớp phủ gradient */}
      {needsTruncation && !isExpanded && (
        <div className="absolute bottom-10 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}
      {/* Nút "Đọc thêm" */}
      {needsTruncation && !isExpanded && (
        <div className="text-center mt-4">
          <button
            onClick={() => setIsExpanded(true)}
            className="px-6 py-2 text-xs border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
          >
            ĐỌC THÊM
          </button>
        </div>
      )}
    </div>
  );
}
