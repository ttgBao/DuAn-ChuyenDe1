import { Link } from "react-router-dom";
import { FaSearchPlus, FaRegEye } from "react-icons/fa";

export default function ProductCard({ product, onQuickView, hideSale }) {
  const { id, name, price, imgMain, imgHover, sale } = product;

  return (
    <div className="h-auto md:w-[233px] w-full flex-shrink-0 lg:w-[300px] xl:w-[233px]">
      <div className="relative group">
        <Link to={`/product/${id}`}>
          <div className="w-full h-[320px] overflow-hidden relative bg-gray-100">
            <img
              src={imgHover}
              alt={name}
              className="
      absolute inset-0
      w-full h-full
      object-contain
      -translate-x-full group-hover:translate-x-0
      transition-transform duration-500 ease-in-out
      z-10
    "
            />

            <img
              src={imgMain}
              alt={name}
              className="
      absolute inset-0
      w-full h-full
      object-contain
      group-hover:scale-0
      transition-transform duration-500 ease-in-out delay-350
      z-20
    "
            />
          </div>
        </Link>

        <div className="absolute top-[10%] left-[10px]">
          <div className="flex flex-col items-center">
            {!hideSale && sale && (
              <div className="relative flex items-center justify-center pb-1 bg-purple-800 text-white text-[10px] font-bold mb-6 rounded-b-full z-30 w-[33px] h-[33px] before:content-[''] before:absolute before:inset-0.5 before:border before:z-0 before:rounded-b-full">
                {sale}%
              </div>
            )}

            {/* Quick view: dùng button, tránh Link lồng Link */}
            <button
              type="button"
              onClick={() => onQuickView?.(product)}
              className="
    bg-white p-4 rounded-md mb-4
    hover:bg-purple-800 hover:text-white
    transition-all duration-300
    opacity-0 group-hover:opacity-100
    z-10 hidden md:block
  "
            >
              <FaSearchPlus className="text-[12px]" />
            </button>

            <Link
              to={`/product/${id}`}
              className="
    bg-white p-4 rounded-md
    hover:bg-purple-800 hover:text-white
    transition-all duration-300
    opacity-0 group-hover:opacity-100
    z-10
  "
            >
              <FaRegEye className="text-[12px]" />
            </Link>
          </div>
        </div>
        <div className="mt-2">
          {/* NAME */}
          <div className="text-center font-semibold text-[16px] md:text-[24px]">
            {name &&
              (() => {
                const words = name.trim().split(/\s+/);
                return words.length > 7
                  ? words.slice(0, 8).join(" ") + "..."
                  : name;
              })()}
          </div>

          {/* PRICE */}
          <div className="text-center mt-1">
            {sale ? (
              <div className="flex items-center justify-center gap-2">
                {/* Giá gốc – bên trái */}
                <span className="text-gray-400 text-sm line-through">
                  {price.toLocaleString("vi-VN")} VNĐ
                </span>

                {/* Giá sau sale – bên phải */}
                <span className="text-orange-600 font-semibold text-xl">
                  {Math.round(price * (1 - sale / 100)).toLocaleString("vi-VN")}{" "}
                  VNĐ
                </span>
              </div>
            ) : (
              <span className="text-gray-800 font-medium">
                {price.toLocaleString("vi-VN")} VNĐ
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
