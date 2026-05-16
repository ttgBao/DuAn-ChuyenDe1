import React from 'react';
import { Link } from 'react-router-dom';

// --- TRẠNG THÁI TRỐNG (Khi tìm kiếm/lọc không ra kết quả) ---
export const EmptyState = ({ message = "Không tìm thấy sản phẩm nào." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center">
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">Chưa có dữ liệu</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">{message}</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-black transition transform active:scale-95"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
};

// --- TRẠNG THÁI LỖI (Khi mất mạng hoặc Server sập) ---
export const ErrorState = ({ message = "Đã có lỗi xảy ra khi tải dữ liệu.", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-4 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Có lỗi rồi</h3>
      <p className="text-red-600 mb-6 bg-red-50 px-4 py-2 rounded border border-red-100">
        {message}
      </p>
      <button 
        onClick={onRetry} 
        className="px-6 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition shadow-lg shadow-red-200"
      >
        Thử tải lại trang
      </button>
    </div>
  );
};