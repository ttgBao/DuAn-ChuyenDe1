// src/components/Breadcrumb.js

import React from "react";
// ✅ 1. Thêm 'useLocation' vào
import { useParams, Link, useLocation } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";

export default function Breadcrumb() {
  const params = useParams(); 
  const location = useLocation(); 

  // ✅ 2. Thêm logic để xử lý route tĩnh
  let category = params.category; // Lấy category từ param trước
  
  // Nếu không có category param, kiểm tra xem có phải trang cart không
  if (!category && location.pathname === '/cart') {
    category = 'cart'; // Tự gán 'cart'
  }
  
  // Giữ nguyên subCategory
  const subCategory = params.subCategory;

  const categoryLabel = {
    "do-nam": "Đồ Nam",
    "do-nu": "Đồ Nữ",
    "dong-ho": "Đồng Hồ",
    "thuong-hieu": "Thương Hiệu",
    "sale": "Khuyến Mãi 10.10",
    "cart": "Giỏ hàng",
  }[category] || null;

  const subCategoryLabel = {
    ao: "Áo",
    quan: "Quần",
    "giay-chay-bo": "Giày Chạy Bộ",
    "giay-dia-hinh": "Giày Địa Hình",
    dongHo: "Đồng hồ",
    "suunto": "Đồng hồ Suunto",
    "garmin": "Đồng hồ Garmin",
    "coros": "Đồng hồ Coros",

  }[subCategory] || null;

  return (
    <>
      {/* Header */}
      <NavigationMenu/>

      {/* Breadcrumb */}
      {/* ✅ 3. Chỉ hiển thị <header> nếu có category (bao gồm cả 'cart') */}
      {category && (
        <header className="bg-gray-100 px-4 py-10">
          <nav className="max-w-7xl mx-auto flex items-center text-lg text-gray-700 select-none">
            {/* Trang chủ */}
            <Link
              to="/"
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              Trang chủ
            </Link>

            {/* Danh mục cha (Bây giờ sẽ hiển thị 'Giỏ hàng') */}
            <span className="mx-2 text-gray-400">/</span>
            <Link
              to={`/${category}`}
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              {categoryLabel}
            </Link>

            {/* Danh mục con (sẽ không hiển thị cho 'cart') */}
            {subCategory && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <Link
                  to={`/${category}/${subCategory}`}
                  className="hover:text-purple-600 transition-colors cursor-pointer"
                >
                  {subCategoryLabel}
                </Link>
              </>
            )}
          </nav>
        </header>
      )}
    </>
  );
}