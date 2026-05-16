import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSearch, FaBars } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { IoMdCart } from "react-icons/io";
import logo from "../assets/logoImSport.png";
import vn from "../assets/vn.png";
import eng from "../assets/eng.png";

export default function BT({ onMenuToggle }) {
  const [showSearch, setShowSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userName, setUserName] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const savedCount = Number(localStorage.getItem("cartCount")) || 0;
    setCartCount(savedCount);
  });

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name);
  }, []);

  // 🔁 Theo dõi thay đổi (khi component khác update)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(updatedCart.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="w-full mt-5">
      <div className={`md:px-12 md:mt-7 pb-8 w-full px-2`}>
        <div className="flex justify-between items-center ">
          <div className="block md:hidden">
            <button onClick={onMenuToggle}>
              <FaBars className="text-2xl hover:text-purple-600" />
            </button>
          </div>

          <div className="">
            <a href="/">
              {" "}
              <img
                className="w-full h-[26px] sm:w-[180px] sm:h-[34px]"
                src={logo}
                alt=""
              />{" "}
            </a>
          </div>

          <div className="flex items-center gap-1 ">
            <form action="" className="relative">
              <input
                type="text"
                className="hidden md:block w-[260px] h-[34px] pl-2 border border-gray-400"
                placeholder="Tìm..."
              />
              <FaSearch
                className="absolute right-2 top-1/2 -translate-y-1/2 lg:text-xl cursor-pointer"
                onClick={() => setShowSearch(!showSearch)}
              />
            </form>

            {userName ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center gap-1 font-semibold text-blue-400 hover:text-purple-700"
                >
                  Hi, {userName}
                </button>

                {openDropdown && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-32 text-center">
                    <button
                      className="w-full py-2 text-red-500 hover:bg-gray-100"
                      onClick={() => {
                        localStorage.removeItem("userName");
                        localStorage.removeItem("token");
                        setUserName(null);
                        setOpenDropdown(false);
                      }}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <FaUser className="hidden md:block mb-1 hover:text-purple-500 ml-3" />
              </Link>
            )}

            <Link to="/cart" className="relative">
              <HiShoppingBag className="ml-3 text-xl lg:mb-1 hover:text-purple-500 hidden md:block" />
              <IoMdCart className="text-xl lg:mb-1 block md:hidden" />
              {cartCount > 0 && (
                <span className="absolute -right-4 -top-3 bg-red-500 text-white px-[8px] py-[2px] text-[12px] rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="pl-3">
              <Link>
                <img
                  className="md:w-[24px] md:h-[24px] w-[18px] h-[18px] "
                  src={vn}
                  alt=""
                />
              </Link>
            </div>

            <div className="border-l border-black pl-2">
              <Link>
                <img
                  className="md:w-[20px] md:h-[20px] w-[16px] h-[16px]"
                  src={eng}
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`z-30 md:hidden absolute right-0 bg-gray-400  shadow-md overflow-hidden  transition-all duration-500 ease-in-out ${
          showSearch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <form action="">
          <input
            type="text"
            className="w-[280px] h-[34px] pl-2 border-none bg-gray-200 relative  "
            placeholder="Tìm kiếm..."
          />
          <Link>
            <FaSearch
              className="absolute bottom-2 right-1"
              onClick={() => setShowSearch(!showSearch)}
            />
          </Link>
        </form>
      </div>
    </div>
  );
}
