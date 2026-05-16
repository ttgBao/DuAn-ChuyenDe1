import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaArrowUp, FaBox, FaTag, FaShoppingCart, FaGift } from "react-icons/fa";



function Panel() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#c0c0c1]/[0.84] flex justify-around items-center py-2 text-black md:hidden z-50">
      <button className="flex flex-col items-center hover:text-gray-700 transition-colors duration-200">
        <FaTag size={20} />
        <span className="text-sm mt-1">Hàng mới</span>
      </button>

      <button className="flex flex-col items-center hover:text-gray-700 transition-colors duration-200">
        <FaGift size={20} />
        <span className="text-sm mt-1">Khuyến mại</span>
      </button>

      <button className="flex flex-col items-center hover:text-gray-700 transition-colors duration-200">
        <FaShoppingCart size={20} />
        <span className="text-sm mt-1">Giỏ hàng</span>
      </button>
    </div>
  );
}
export default Panel;