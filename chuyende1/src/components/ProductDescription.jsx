export default function ProductDescription({
  descriptionHtml,
  imgUrl,
  sizes = [],
}) {
  return (
    <div className="text-gray-700">
      {/* 1. Mô tả chi tiết */}
      <div
        className="prose prose-sm max-w-none mb-6 text-justify"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />

      {/* 2. Ảnh minh họa */}
      {imgUrl && (
        <div className="w-full mb-8">
          <img
            src={imgUrl}
            alt=""
            className="w-full h-auto rounded-lg object-contain"
          />
        </div>
      )}

      {/* 3. BẢNG SIZE (TỪ AWS sizes[]) */}
      {Array.isArray(sizes) && sizes.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-base font-bold text-gray-900 mb-4 uppercase">
            Bảng size
          </h3>

          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-center">Size</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((size, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 text-center">
                      {size}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-2 text-xs text-gray-400 italic">
            * Size có thể chênh lệch 1–2cm tùy đợt sản xuất.
          </p>
        </div>
      )}
    </div>
  );
}
