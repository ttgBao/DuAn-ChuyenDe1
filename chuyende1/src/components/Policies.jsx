import React from 'react';
import { TbTruckDelivery, TbRefresh, TbHeadphones } from "react-icons/tb";

const policyData = [
  {
    icon: <TbTruckDelivery />,
    text: "MIỄN PHÍ VẬN CHUYỂN (BILL > 1M)"
  },
  {
    icon: <TbRefresh />,
    text: "ĐỔI TRẢ TRONG VÒNG 7 NGÀY"
  },
  {
    icon: <TbHeadphones />,
    text: "SẢN PHẨM TRẢI NGHIỆM SẴN TẠI STORE"
  }
];

export default function Policies() {
  return (
    <section className="container mx-auto px-4 py-4">
      <div className="flex flex-row border-gray-200">
        {policyData.map((policy, index) => (
          <div key={index}
            className={`flex-1 p-4 flex flex-col text-center items-center md:flex-row md:justify-center 
                ${index < policyData.length - 1 ? 'md:border-r md:border-gray-200' : ''}
            `}>

            {/* Icon: Thay đổi kích thước và khoảng cách responsive */}
            <div className="text-3xl md:text-4xl text-gray-800 mb-2 md:mb-0 md:mr-4">
              {policy.icon}
            </div>

            {/* Text: Giờ là một dòng duy nhất và font chữ nhẹ hơn */}
            <p className="text-xs font-medium text-gray-700 uppercase"> {/* Thay đổi: font-medium */}
              {policy.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}