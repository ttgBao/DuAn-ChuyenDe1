import React, { useState, useEffect } from "react";
import NavigationMenu from "./NavigationMenu";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import ScrollTest from "../ScrollTest";
import Panel from "./Panel";
import { getProducts } from "../services/productApi";

const CartItem = ({
  item,
  stock,
  onQuantityChange,
  onRemove,
  formatCurrency,
}) => {
  // Hàm xử lý tăng/giảm
  const increment = () =>
    onQuantityChange(item.id, item.size, item.quantity + 1);

  const decrement = () =>
    onQuantityChange(
      item.id,
      item.size,
      item.quantity > 1 ? item.quantity - 1 : 1
    );

  // Hàm xử lý khi nhập số lượng trực tiếp
  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    onQuantityChange(item.id, item.size, newQuantity > 0 ? newQuantity : 1);
  };

  return (
    <div className="border-b py-6">
      {/* === Bố cục Mobile === */}
      <div className="md:hidden grid grid-cols-[auto_1fr_auto] grid-rows-1 gap-x-4">
        {/* Cột 1: Ảnh */}
        {/* ✅ Bỏ row-span-3 và self-start */}
        <img src={item.image} alt={item.name} className="w-20 h-auto" />

        {/* Cột 2: Thông tin (Tên, Size, Giá) */}
        {/* ✅ Nhóm Tên, Size, Giá vào một flex-col */}
        <div className="flex flex-col col-start-2">
          <p className="font-semibold">{item.name}</p>
          {item.size && (
            <p className="text-gray-500 text-sm mt-1">Size: {item.size}</p>
          )}

          <p className="text-gray-700 mt-1">
            {" "}
            {/* Thêm 1 chút margin-top nếu muốn */}
            {formatCurrency(item.price)}
          </p>
        </div>

        {/* Cột 3: Hành động (Số lượng, Xóa) */}
        <div className="flex flex-col col-start-3 justify-between items-end">
          {/* Nhóm số lượng (căn lề phải) */}
          <div className="flex items-center self-end">
            <input
              type="number"
              min={1}
              max={stock}
              value={item.quantity}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (isNaN(val)) val = 1;
                if (val < 1) val = 1;
                if (val > stock) val = stock;

                onQuantityChange(item.id, item.size, val);
              }}
            />
          </div>
          {/* Nút Xóa (căn lề phải và đẩy xuống dưới) */}
          <div className="flex justify-end">
            <button
              onClick={() => onRemove(item.id, item.size)}
              className="text-gray-500 hover:text-red-600 text-sm"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>

      {/* === Bố cục Desktop === */}
      <div className="hidden md:grid md:grid-cols-[100px_3fr_1.5fr_1fr_1.5fr_100px] gap-4 items-center">
        <img src={item.image} alt={item.name} className="w-20 h-auto" />

        <div className="text-left">
          <p className="font-semibold">{item.name}</p>
          {item.size && (
            <p className="text-sm text-gray-500">Size: {item.size}</p>
          )}{" "}
          {/* ✅ Hiển thị size */}
        </div>

        <p className="text-center">{formatCurrency(item.price)}</p>

        <div className="flex justify-center items-center">
          <input
            type="number"
            value={item.quantity}
            onChange={handleInputChange}
            className="h-[36px] w-[100px] rounded-[18px] px-[10px] py-[4px] border border-[#ccc] bg-white text-center text-[14px] text-[#898989] outline-none transition-colors duration-200 ease-in"
          />
        </div>

        <p className="text-center font-bold">
          {formatCurrency(item.price * item.quantity)}
        </p>

        <div className="text-center">
          {/* ✅ Cập nhật onRemove để bao gồm cả size */}
          <button
            onClick={() => onRemove(item.id, item.size)}
            className="text-gray-500 hover:text-red-600"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CartPage() {
  const [productStocks, setProductStocks] = useState({});

  useEffect(() => {
    getProducts().then((products) => {
      const stockMap = {};
      products.forEach((p) => {
        stockMap[p.id] = Number(p.quantity ?? 0);
      });
      setProductStocks(stockMap);
    });
  }, []);

  // ✅ 3. THAY ĐỔI QUAN TRỌNG: Đọc state từ localStorage
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // ✅ 4. Cần useEffect để cập nhật lại state nếu localStorage thay đổi (ví dụ: từ tab khác)
  useEffect(() => {
    const handleStorageChange = () => {
      setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
    };

    // Lắng nghe sự kiện 'storage' mà ProductPopup đã dispatch
    window.addEventListener("storage", handleStorageChange);

    // Dọn dẹp listener khi component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Chạy 1 lần duy nhất khi component mount

  // Hàm helper để format tiền tệ
  const formatCurrency = (amount) => {
    return `${new Intl.NumberFormat("vi-VN").format(amount)} VNĐ`;
  };

  // hàm cập nhật số lượng
  const handleQuantityChange = (id, size, newQuantity) => {
    const stock = productStocks[id] ?? 0;

    let safeQuantity = newQuantity;
    if (safeQuantity < 1) safeQuantity = 1;
    if (safeQuantity > stock) safeQuantity = stock;

    const updatedCart = cartItems.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: safeQuantity }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ 6. Sửa hàm xóa sản phẩm (thêm 'size')
  const handleRemoveItem = (id, size) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === id && item.size === size)
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Cập nhật badge khi xóa
    localStorage.setItem("cartCount", updatedCart.length);
    window.dispatchEvent(new Event("storage"));
  };

  // Tính tổng tiền
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="">
      <Breadcrumb />
      <div className="max-w-6xl mx-auto bg-white p-6 md:p-8 shadow-sm">
        {/* === TITLE === */}
        <h1 className="text-3xl font-bold mb-2 text-left">GIỎ HÀNG</h1>
        <p className="md:hidden mb-6 text-gray-600">Giỏ hàng của bạn</p>

        {/* === HEADER CỦA BẢNG (DESKTOP) === */}
        <div className="hidden md:grid md:grid-cols-[100px_3fr_1.5fr_1fr_1.5fr_100px] gap-4 items-center font-bold uppercase text-sm mb-4 border-b pb-4">
          <span className="text-center">Hình ảnh</span>
          <span className="text-left">Tên sản phẩm</span>
          <span className="text-center">Đơn giá</span>
          <span className="text-center">Số lượng</span>
          <span className="text-center">Thành tiền</span>
          <span className="text-center">Xóa</span>
        </div>

        {/* === DANH SÁCH SẢN PHẨM === */}
        <div className="space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={`${item.id}-${item.size}`}
                item={item}
                stock={productStocks[item.id] ?? 0}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                formatCurrency={formatCurrency}
              />
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">
              Giỏ hàng của bạn đang trống.
            </p>
          )}
        </div>

        {/* === TỔNG TIỀN & NÚT HÀNH ĐỘNG === */}
        <div className="mt-8">
          {/* --- Bố cục Desktop --- */}
          <div className="hidden md:block">
            <div className="flex justify-end items-center mb-4">
              <span className="text-xl font-bold">Tổng tiền:</span>
              <span className="text-xl font-bold text-purple-600 ml-4">
                {formatCurrency(total)}
              </span>
            </div>
            <div className="flex justify-end items-center space-x-4">
              <Link
                to="/"
                title="Tiếp tục mua hàng"
                className="inline-block px-8 py-3 bg-gray-200 text-black text-base font-semibold rounded-full shadow "
                onClick={() => window.scrollTo(0, 0)}
              >
                Tiếp tục mua hàng
              </Link>

              <Link
                to="/checkout"
                title="Tiến hành đặt hàng"
                className="inline-block px-8 py-3 bg-purple-600 text-white text-base font-semibold rounded-full shadow"
              >
                Đặt hàng
              </Link>
            </div>
          </div>

          {/* --- Bố cục Mobile --- */}
          <div className="md:hidden space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold text-black">Tổng tiền</span>
              <span className="font-bold text-purple-600">
                {formatCurrency(total)}
              </span>
            </div>

            <Link
              to="/checkout"
              title="Tiến hành thanh toán"
              className="flex items-center justify-center w-full px-8 py-3 bg-purple-600 text-white text-base font-semibold rounded-full shadow hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Tiến hành thanh toán
            </Link>

            <Link
              to="/"
              title="Tiếp tục mua hàng"
              className="flex items-center justify-center w-full px-8 py-3 bg-gray-200 text-black text-base font-semibold rounded-full shadow hover:bg-gray-300 transition duration-300 ease-in-out"
            >
              Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollTest />
      <Panel />
    </div>
  );
}
