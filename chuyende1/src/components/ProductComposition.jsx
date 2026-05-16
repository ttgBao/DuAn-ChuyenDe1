import React from "react";

export default function ProductComposition({ product }) {
  if (!product) return null;

  const {
    name,
    brand,
    sizes,
    specifications,
  } = product;

  const rows = [
    {
      label: "Tên sản phẩm",
      value: name,
    },
    {
      label: "Thương hiệu",
      value: brand || "Đang cập nhật",
    },
    {
      label: "Size",
      value:
        Array.isArray(sizes) && sizes.length > 0
          ? sizes.join(", ")
          : "Free size",
    },
    {
      label: "Thành phần",
      value: specifications || "Đang cập nhật",
      isList: Array.isArray(specifications),
    },
  ];

  return (
    <div className="text-sm text-gray-700">
      {/* --- Mobile --- */}
      <div className="md:hidden space-y-6">
        {rows.map((item, index) => (
          <div key={index} className="border-b pb-4 last:border-0">
            <h4 className="font-semibold text-gray-900 mb-1">
              {item.label}
            </h4>

            {item.isList ? (
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {item.value.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">{item.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* --- Desktop --- */}
      <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 font-semibold text-gray-800 bg-gray-50 w-1/3 align-top">
                  {item.label}
                </td>

                <td className="px-6 py-4 align-top text-gray-600">
                  {item.isList ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {item.value.map((v, i) => (
                        <li key={i}>{v}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
