// BrandFilter.jsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PURPLE = "#673AB7";

// Map mã brand -> label đẹp (tùy bạn, có thể bỏ nếu không cần)
const BRAND_LABELS = {
  hoka: "HOKA",
  on: "On Running",
  luna: "LUNA",
  coros: "COROS",
};

// lấy brand từ product với vài key phổ biến + brandId của bạn
const pickBrand = (p) =>
  (
    p.brandId ??          // ✅ thêm dòng này cho đúng với data của bạn
    p.brandCode ??
    p.brand_code ??
    p.brand ??
    p.brandName ??
    p.brand_name ??
    ""
  )
    .toString()
    .trim();

export default function BrandFilter({ products = [], onChange }) {
  const [expanded, setExpanded] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Hợp nhất brands từ products trong category
  const brandList = useMemo(() => {
    const set = new Set();
    for (const p of products) {
      const b = pickBrand(p);
      if (b) set.add(b);
    }
    return Array.from(set).sort((a, b) =>
      a.localeCompare(b, "vi", { sensitivity: "base" })
    );
  }, [products]);

  // Selected từ URL (hỗ trợ cả nhiều brand=... và brand=a,b,c)
  const [selected, setSelected] = useState(new Set());
  useEffect(() => {
    const multi = searchParams.getAll("brand");
    const comma = (searchParams.get("brand") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const values = new Set([...multi, ...comma]);
    const next = new Set([...values].filter((v) => brandList.includes(v)));
    setSelected(next);
  }, [searchParams, brandList]);

  const toggle = (brand) => {
    const next = new Set(selected);
    next.has(brand) ? next.delete(brand) : next.add(brand);
    setSelected(next);

    // cập nhật URL: clear brand -> append từng brand đang chọn
    const params = new URLSearchParams(searchParams);
    params.delete("brand");
    [...next].forEach((b) => params.append("brand", b));
    setSearchParams(params, { replace: true });

    onChange?.([...next]); // trả về danh sách brand đang chọn
  };

  return (
    <div className="border-t pt-6">
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded((x) => !x)}
        className="w-full flex items-center justify-between"
        aria-expanded={expanded}
      >
        <span className="font-bold text-black">THƯƠNG HIỆU</span>
        <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none">
          {expanded ? (
            <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" />
          ) : (
            <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" />
          )}
        </svg>
      </button>

      {/* Body */}
      {expanded && (
        <div className="mt-4">
          <div className="h-[190px] overflow-y-auto pr-2 brands-scroll">
            {brandList.map((brand) => {
              const active = selected.has(brand);
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => toggle(brand)}
                  className={[
                    "w-full text-left px-2 py-2 focus:outline-none transition-colors",
                    active
                      ? "bg-[#673AB7] text-white"
                      : "text-gray-800 hover:text-[#673AB7]",
                  ].join(" ")}
                >
                  {BRAND_LABELS[brand] || brand}
                </button>
              );
            })}
            {brandList.length === 0 && (
              <div className="text-sm text-gray-500 px-2 py-2">
                Chưa có thương hiệu trong danh mục này.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scrollbar tím */}
      <style>{`
        .brands-scroll::-webkit-scrollbar { width: 8px; }
        .brands-scroll::-webkit-scrollbar-thumb { background: ${PURPLE}; border-radius: 6px; }
        .brands-scroll::-webkit-scrollbar-track { background: #e5e7eb; }
        .brands-scroll { scrollbar-color: ${PURPLE} #e5e7eb; scrollbar-width: thin; }
      `}</style>
    </div>
  );
}
