// src/components/Grid.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import GridHeader from "./GridHeader";
import ProductPopup from "./ProductPopup";

// 👉 Dữ liệu sản phẩm dùng chung
import { products as PRODUCT_DATA } from "../data/products.mock";

export default function Grid({ products: productsProp }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [goToPageInput, setGoToPageInput] = useState("");
  const ITEMS_PER_PAGE = 15;

  // Nếu component cha không truyền prop thì dùng data chung
  const products = productsProp ?? PRODUCT_DATA;
  const TOTAL_PAGES = Math.ceil(products.length / ITEMS_PER_PAGE);

  // 👉 Giá gốc: ưu tiên oldPrice nếu có, không thì dùng price
  const getOldPrice = (p) => {
    return typeof p.oldPrice === "number" ? p.oldPrice : p.price;
  };

  // 👉 Giá sau giảm theo % sale (nếu có)
  const getSalePrice = (p) => {
    const oldPrice = getOldPrice(p);
    if (!p.sale || p.sale <= 0) return oldPrice;
    const discounted = oldPrice * (1 - p.sale / 100);
    return Math.round(discounted);
  };

  // Format giá tiền
  const formatPrice = (price) =>
    Number(price).toLocaleString("vi-VN") + " VNĐ";

  // Phân trang
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const pagesToShow = useMemo(() => {
    const maxPages = 4; // Hiển thị tối đa 4 nút số

    // Nếu tổng số trang ít hơn hoặc bằng 4, hiển thị tất cả
    if (TOTAL_PAGES <= maxPages) {
      return Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
    }

    // Nếu tổng số trang nhiều hơn 4
    let startPage = 1;

    if (currentPage <= 2) {
      // Trang 1, 2: Hiển thị [1, 2, 3, 4]
      startPage = 1;
    } else if (currentPage >= TOTAL_PAGES - 1) {
      // Trang cuối, kế cuối: Hiển thị [..., TOTAL-3, TOTAL-2, TOTAL-1, TOTAL]
      startPage = TOTAL_PAGES - (maxPages - 1);
    } else {
      // Các trang ở giữa: Trang hiện tại sẽ ở vị trí thứ 2
      startPage = currentPage - 1;
    }

    // Tạo mảng 4 số từ startPage
    return Array.from({ length: maxPages }, (_, i) => startPage + i);
  }, [currentPage, TOTAL_PAGES]);

  // Xử lý xem nhanh
  const handleQuickView = (product) => setQuickViewProduct(product);
  const handleCloseQuickView = () => setQuickViewProduct(null);

  // Chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(goToPageInput, 10);

    // Kiểm tra xem số nhập vào có hợp lệ không
    if (pageNum >= 1 && pageNum <= TOTAL_PAGES) {
      handlePageChange(pageNum); // Nếu hợp lệ thì nhảy trang
      setGoToPageInput(""); // Xóa input sau khi nhảy
    } else {
      alert(`Trang không tồn tại! Vui lòng chỉ nhập số từ 1 đến ${TOTAL_PAGES}.`);
      setGoToPageInput(""); // Vẫn xóa input đi cho sạch
    }
  };

  // HÀM MỚI: Xử lý khi bấm "Enter" trong ô input
  const handleGoToPageKey = (e) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  return (
    <div className="container mx-auto py-5">
      <GridHeader totalProducts={products.length} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {paginatedProducts.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            state={{ product: p }}
            className="group relative block rounded-lg overflow-hidden text-center bg-white transform transition-all duration-300 hover:shadow-xl"
          >
            {/* Vùng ảnh sản phẩm */}
            <div className="relative group">
              <div className="w-full h-full aspect-square overflow-hidden relative">
                <img
                  src={p.imgHover || p.imgMain}
                  alt={p.name}
                  className="object-cover w-full h-full absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10"
                />
                <img
                  src={p.imgMain}
                  alt={p.name}
                  className="object-cover w-full h-full group-hover:scale-0 transition-transform duration-500 ease-in-out delay-350 relative z-20"
                />
              </div>

              {/* --- BADGES --- */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                {/* Giảm giá góc trái */}
                {p.sale && (
                  <span className="absolute top-2 left-2 bg-purple-700 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                    {p.sale}%
                  </span>
                )}

                {/* Hộp quà chính giữa ảnh */}
                {p.gift && (
                  <span className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black text-xs px-3 py-2 rounded-md shadow-md">
                    🎁
                  </span>
                )}

                {/* BEST SELLER góc phải */}
                {p.bestseller && (
                  <span className="absolute top-3 right-[-30px] bg-red-600 text-white text-[10px] font-bold px-6 py-1 rotate-45 shadow-md">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* --- ICONS: Xem nhanh / Xem chi tiết --- */}
              <div className="absolute top-[10%] left-[10px] z-40 flex flex-col items-center">
                {/* Xem nhanh */}
                <div className="relative group/zoom">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleQuickView(p);
                    }}
                    className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300 hidden md:block"
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity"
                    />
                  </button>
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-40">
                    Xem nhanh
                  </span>
                </div>

                {/* Xem chi tiết */}
                <div className="relative group/eye">
                  <Link
                    to={`/product/${p.id}`}
                    state={{ product: p }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300"
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity"
                    />
                  </Link>
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover/eye:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-40">
                    Xem chi tiết
                  </span>
                </div>
              </div>
            </div>

            {/* --- THÔNG TIN SẢN PHẨM --- */}
            <div className="mt-2 p-3 text-center">
              <div className="font-medium text-[14px] md:text-lg">{p.name}</div>
              <div className="flex flex-col items-center mt-1">
                {/* Giá mới sau giảm hoặc giá hiện tại nếu không có sale */}
                <div className="text-red-600 font-bold text-base">
                  {formatPrice(getSalePrice(p))}
                </div>

                {/* Giá cũ (gạch ngang) – chỉ hiện nếu có sale */}
                {p.sale && p.sale > 0 && (
                  <div className="text-gray-500 text-sm line-through mt-0.5">
                    {formatPrice(getOldPrice(p))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* --- PHÂN TRANG --- */}
      <div className="flex flex-wrap justify-center items-center mt-6 gap-4">
        {/* Cụm điều hướng chính */}
        <div className="flex items-center">
          {/* Nút Trang Trước - Ẩn khi ở trang 1 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-1.5 border rounded-l-md text-sm font-medium hover:bg-gray-100 ${
              currentPage === 1 ? "invisible" : ""
            }`}
          >
            &lt;
          </button>

          {/* Các nút số trang (tính toán từ logic pagesToShow) */}
          {pagesToShow.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              className={`px-4 py-1.5 border-t border-b border-l-0 text-sm font-medium ${
                currentPage === page
                  ? "bg-gray-900 text-white cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Nút Trang Sau - Ẩn khi ở trang cuối */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-1.5 border border-l-0 rounded-r-md text-sm font-medium hover:bg-gray-100 ${
              currentPage === TOTAL_PAGES ? "invisible" : ""
            }`}
          >
            &gt;
          </button>
        </div>

        {/* Box nhảy đến trang */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={goToPageInput}
            onChange={(e) => setGoToPageInput(e.target.value)}
            onKeyDown={handleGoToPageKey}
            className="w-20 px-2 py-1.5 border rounded-md text-sm text-center"
            placeholder="Đi đến..."
            min="1"
            max={TOTAL_PAGES}
          />
          <button
            onClick={handleGoToPage}
            className="px-4 py-1.5 border rounded-md text-sm font-medium bg-gray-700 text-white hover:bg-gray-900 transition-colors"
          >
            Đi
          </button>
        </div>
      </div>

      {/* Popup xem nhanh */}
      {quickViewProduct && (
        <ProductPopup product={quickViewProduct} onClose={handleCloseQuickView} />
      )}
    </div>
  );
}
