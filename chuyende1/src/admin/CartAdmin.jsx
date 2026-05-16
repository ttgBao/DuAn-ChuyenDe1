import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartAdmin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Lấy danh sách tất cả đơn hàng từ localStorage
    const data = JSON.parse(localStorage.getItem("allOrders")) || [];
    setOrders(data);
  }, []);

  // Hàm render trạng thái cho đẹp
  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">Chờ xử lý</span>;
      case "completed":
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Hoàn thành</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-bold">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">📦 Quản lý đơn hàng</h1>
          <p className="text-sm text-gray-500">Xem thông tin khách hàng và sản phẩm đã đặt</p>
        </div>
        <Link
          to="/admin"
          className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-zinc-800 transition"
        >
          ← Quay lại
        </Link>
      </div>

      {/* DANH SÁCH ĐƠN HÀNG */}
      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border shadow-sm">
            <p className="text-gray-400">Chưa có đơn hàng nào.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              
              {/* 1. Header của Đơn hàng (Thông tin tóm tắt) */}
              <div className="bg-zinc-50 px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg text-blue-600">#{order.id}</span>
                    {renderStatus(order.status)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Ngày đặt: {order.date}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium">Tổng thanh toán</p>
                    <p className="text-xl font-bold text-red-500">{order.total?.toLocaleString("vi-VN")} ₫</p>
                </div>
              </div>

              {/* 2. Nội dung chi tiết (Chia 2 cột: Thông tin khách & Sản phẩm) */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Cột trái: Thông tin khách hàng */}
                <div className="lg:col-span-1 space-y-4">
                  <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider border-b pb-2">Thông tin khách hàng</h3>
                  
                  <div className="text-sm space-y-3">
                    <div>
                      <span className="block text-gray-500 text-xs">Họ và tên</span>
                      <span className="font-medium">{order.customerInfo?.fullName}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-xs">Số điện thoại</span>
                      <span className="font-medium">{order.customerInfo?.phone}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-xs">Email</span>
                      <span className="text-blue-600">{order.customerInfo?.email}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-xs">Địa chỉ giao hàng</span>
                      <span className="font-medium">
                        {order.customerInfo?.address} <br /> ({order.customerInfo?.ward}, {order.customerInfo?.district}, {order.customerInfo?.province})
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-xs">Ghi chú</span>
                      <span className="italic text-gray-600">{order.customerInfo?.note || "Không có"}</span>
                    </div>
                    <div>
                        <span className="block text-gray-500 text-xs">Thanh toán</span>
                        <span className="font-medium capitalize">{order.paymentMethod === 'cod' ? 'Tiền mặt (COD)' : 'Chuyển khoản'}</span>
                    </div>
                  </div>
                </div>

                {/* Cột phải: Danh sách sản phẩm */}
                <div className="lg:col-span-2">
                    <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider border-b pb-2 mb-4">Sản phẩm đã mua ({order.products?.length || 0})</h3>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 bg-gray-50 uppercase">
                                <tr>
                                    <th className="px-4 py-2">Sản phẩm</th>
                                    <th className="px-4 py-2 text-center">Size</th>
                                    <th className="px-4 py-2 text-center">SL</th>
                                    <th className="px-4 py-2 text-right">Giá</th>
                                    <th className="px-4 py-2 text-right">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {order.products && order.products.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-900">
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-3 text-center">{item.size || "-"}</td>
                                        <td className="px-4 py-3 text-center font-bold">{item.quantity}</td>
                                        <td className="px-4 py-3 text-right text-gray-500">{item.price?.toLocaleString("vi-VN")}₫</td>
                                        <td className="px-4 py-3 text-right font-medium">
                                            {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

              </div>
              
              {/* Footer của Card (Các nút hành động) */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-end gap-2">
                 <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-100">In hóa đơn</button>
                 <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700">Xác nhận đơn</button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}