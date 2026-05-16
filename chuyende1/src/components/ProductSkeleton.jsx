import React from 'react';

// Một thẻ Skeleton đơn lẻ
const SkeletonCard = () => {
  return (
    <div className="border rounded-lg p-2 bg-white shadow-sm animate-pulse">
      {/* Khung ảnh vuông */}
      <div className="bg-gray-200 aspect-square w-full rounded-md mb-3"></div>
      
      {/* Khung tên sản phẩm (2 dòng ngắn dài khác nhau cho tự nhiên) */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
      
      {/* Khung giá tiền */}
      <div className="h-5 bg-gray-200 rounded w-1/3 mx-auto"></div>
    </div>
  );
};

// Component Grid chứa nhiều thẻ Skeleton
export default function ProductSkeleton({ count = 8 }) {
  return (
    <div className="w-full">
      {/* Header giả lập */}
      <div className="flex justify-between items-center mb-6 animate-pulse border-b pb-4">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="h-8 bg-gray-200 rounded w-32 hidden md:block"></div>
      </div>

      {/* Lưới sản phẩm */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}