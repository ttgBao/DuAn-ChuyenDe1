import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function GridHeader({ totalProducts }) {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
const categories = [
  {
    name: 'Đồ Nam',
    path: '/do-nam', 
    description: `
      Miêu tả  `, 
   subcategories: [
      { name: 'Áo', path: '/do-nam/ao' }, 
      { name: 'Quần', path: '/do-nam/quan' },
      { name: 'Giày Chạy Bộ Nam', path: '/do-nam/giay-chay-bo' }, 
      { name: 'Giày Địa Hình Nam', path: '/do-nam/giay-dia-hinh' },
    ],
  },
  {
    name: 'Đồ Nữ',
    path: '/do-nu', 
    subcategories: [
      { name: 'Áo', path: '/do-nu/ao' }, 
      { name: 'Quần', path: '/do-nu/quan' },
      { name: 'Giày Chạy Bộ Nữ', path: '/do-nu/giay-chay-bo' }, 
      { name: 'Giày Địa Hình Nữ', path: '/do-nu/giay-dia-hinh' },
    ],
  },
  { name: 'Running Gears', path: '/running-gears' }, 
  { name: 'Triathlon', path: '/triathlon' },
  { name: 'Đồng Hồ', path: '/dong-ho' },
];
  const getPageTitle = (pathname) => {
    for (const cat of categories) {
      if (cat.path === pathname) return cat.name;
      if (cat.subcategories) {
        const sub = cat.subcategories.find(s => s.path === pathname);
        if (sub) return sub.name;
      }
    }
    return "Sản phẩm"; 
  };
  const pageTitle = getPageTitle(location.pathname);
  return (
<div className="w-full border-b">
      {/* ===== Header ===== */}
      {/* THÊM 'pb-4' VÀO DÒNG DƯỚI ĐỂ TẠO KHOẢNG CÁCH VỚI CÁI border-b
      */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4">
        {/* Title + Total products (chỉ hiện ở desktop) */}
        <div className="flex items-baseline gap-2">
          {/* <h1 className="text-xl md:text-3xl font-bold uppercase text-gray-900">
            ĐỒ NAM
          </h1> */}
          <h1 className="text-xl md:text-2xl font-semibold uppercase text-gray-800 tracking-wide">{pageTitle}</h1>
          <span className="hidden md:inline text-sm text-gray-600">
            ({totalProducts} Sản phẩm)
          </span>
        </div>

        {/* Dropdown */}
        <div className="w-40 sm:w-52 md:w-auto">
          <select
            name="sort-by"
            value={sortOption}
            onChange={handleSortChange}
            className="w-full border border-gray-300 rounded-md bg-white py-1.5 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Sắp xếp sản phẩm"
          >
            <option value="">-- Sắp xếp theo --</option>
            <option value="newest">Sản phẩm mới nhất</option>
            <option value="price_desc">Giá giảm dần</option>
            <option value="price_asc">Giá tăng dần</option>
            <option value="sale">Giảm giá</option>
          </select>
        </div>
      </div>
    </div>
  );
}