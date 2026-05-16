import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearchPlus, FaRegEye } from "react-icons/fa";
import ProductPopup from "./ProductPopup";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { subcategories } from "../data/subcategories";

/** Xác định loại sản phẩm: giày / áo / quần / đồng hồ… dựa vào subcategory */
function getProductType(product) {
  if (!product) return "other";

  const subcat = subcategories.find((s) => s.id === product.subcategoryId);
  if (!subcat) return "other";

  const name = subcat.name.toLowerCase();

  if (name.includes("giày")) return "giay";
  if (name.includes("áo")) return "ao";
  if (name.includes("quần")) return "quan";

  // Các dòng đồng hồ: Suunto / Garmin / Coros
  if (
    name.includes("suunto") ||
    name.includes("garmin") ||
    name.includes("coros") ||
    name.includes("đồng hồ") ||
    name.includes("dong ho")
  ) {
    return "dongho";
  }

  return "other";
}

export default function RelatedProducts({
  currentProductId,
  currentCategory,
  allProducts,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Tìm sản phẩm hiện tại
  const currentProduct = allProducts.find(
    (p) => p.id === currentProductId
  );

  // Nếu không tìm thấy sản phẩm hiện tại thì khỏi render liên quan
  if (!currentProduct) {
    return null;
  }

  const currentType = getProductType(currentProduct);

  // Lọc sản phẩm liên quan: cùng category (Đồ Nam/Nữ/Đồng hồ) + cùng loại (giày / áo / quần / đồng hồ)
  const relatedProducts = allProducts.filter((p) => {
    if (p.id === currentProductId) return false;
    // comment điều kiện này để hiển thị gợi ý liên quan cho cả nam và nữ
    if (p.categoryId !== currentCategory) return false;
    return getProductType(p) === currentType;
  });

  const handleOpenPopup = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <div className="w-full text-center mb-10 font-medium text-4xl text-gray-700">
        Sản phẩm liên quan
      </div>

      <Swiper
        modules={[]}
        spaceBetween={24}
        slidesPerView={2}
        loop={true}
        breakpoints={{
          768: {
            slidesPerView: 4,
          },
        }}
      >
        {relatedProducts.map((p) => {
          const basePrice =
            typeof p.price === "number" ? p.price : null;
          const salePercent =
            typeof p.sale === "number" ? p.sale : 0;

          let finalPrice = basePrice;
          if (basePrice && salePercent > 0) {
            finalPrice = Math.round(
              basePrice * (1 - salePercent / 100)
            );
          }

          return (
            <SwiperSlide key={p.id}>
              <Link
                to={`/product/${p.id}`}
                className="h-auto block"
              >
                <div className="relative group">
                  <div className="w-full h-full overflow-hidden relative">
                    <img
                      src={p.imgHover}
                      alt={p.name}
                      className="object-cover w-full h-full absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10"
                    />
                    <img
                      src={p.imgMain}
                      alt={p.name}
                      className="object-cover w-full h-full group-hover:scale-0 transition-transform duration-500 ease-in-out delay-350 relative z-20"
                    />
                  </div>

                  <div className="absolute top-[10%] left-[10px]">
                    <div className="flex flex-col items-center">
                      {salePercent > 0 && (
                        <div className="relative flex items-center justify-center pb-1 bg-purple-800 text-white text-[10px] font-bold mb-6 rounded-b-full z-30 w-[33px] h-[33px] before:content-[''] before:absolute before:inset-0.5 before:border before:z-0 before:rounded-b-full">
                          -{salePercent}%
                        </div>
                      )}

                      <button
                        onClick={(e) => handleOpenPopup(e, p)}
                        className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300 hidden md:block"
                      >
                        <FaSearchPlus className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                      </button>

                      <Link
                        to={`/product/${p.id}`}
                        className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300 "
                      >
                        <FaRegEye className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                      </Link>
                    </div>
                  </div>

                  <div>
                    <div className="text-center font-medium text-[14px] md:text-lg">
                      {p.name}
                    </div>

                    <div className="text-center mt-1">
                      {salePercent > 0 && basePrice && (
                        <div className="inline-block text-gray-500 text-[13px] mr-2 relative before:content-[''] before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-gray-300 before:absolute">
                          {basePrice.toLocaleString("vi-VN")} VNĐ
                        </div>
                      )}

                      {finalPrice && (
                        <span className="text-[14px] font-semibold text-red-600">
                          {finalPrice.toLocaleString("vi-VN")} VNĐ
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {showPopup && selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}
