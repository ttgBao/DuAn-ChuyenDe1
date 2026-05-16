// SizeFilter.jsx
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PURPLE = "#673AB7"; // tím
/**
 * products: [
 *  { code?: string, sku?: string, id?: string, sizes: string[] }
 * ]
 */
export default function SizeFilter({ products = [], onChange }) {
  const [expanded, setExpanded] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Map kích cỡ -> danh sách mã sản phẩm có size đó
  const { sizeList, sizeToCodes } = useMemo(() => {
    const m = new Map(); // size -> Set(codes)
    const codeOf = (p) => p.code || p.sku || String(p.id ?? "");
    for (const p of products) {
      const code = codeOf(p);
      if (!code) continue;
      (p.sizes || []).forEach((s) => {
        const key = String(s).trim();
        if (!m.has(key)) m.set(key, new Set());
        m.get(key).add(code);
      });
    }
    // sort tự nhiên: 38 < 38 2/3 < 39 < 39.5 ...
    const parseSize = (s) => {
      // "38 2/3" -> 38 + 2/3, "40.5" -> 40.5
      const m = String(s).match(/^(\d+(?:\.\d+)?)(?:\s+(\d)\/(\d))?$/);
      if (!m) return Number.MAX_SAFE_INTEGER;
      const base = parseFloat(m[1]);
      if (m[2] && m[3]) return base + Number(m[2]) / Number(m[3]);
      return base;
    };
    const list = Array.from(m.keys()).sort((a, b) => parseSize(a) - parseSize(b));
    return { sizeList: list, sizeToCodes: m };
  }, [products]);

  const [selected, setSelected] = useState(() => new Set());

  const toggleSize = (size) => {
    const next = new Set(selected);
    next.has(size) ? next.delete(size) : next.add(size);
    setSelected(next);

    // Tập hợp mã sản phẩm từ các size đã chọn
    const codes = new Set();
    next.forEach((s) => sizeToCodes.get(s)?.forEach((c) => codes.add(c)));

    // Cập nhật URL: clear hết i5 rồi append từng mã
    const params = new URLSearchParams(searchParams);
    params.delete("i5");
    Array.from(codes).forEach((code) => params.append("i5", code));
    setSearchParams(params, { replace: true });

    onChange?.(Array.from(next), Array.from(codes));
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
        <span className="font-bold text-black">KÍCH CỠ</span>
        <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none">
          {expanded ? (
            <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" />
          ) : (
            <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" />
          )}
        </svg>
      </button>

      {expanded && (
        <div className="mt-4">
          {/* List 2 cột, cao 190px, scroll thanh tím */}
          <div className="grid grid-cols-2 gap-3 h-[190px] overflow-y-auto sizes-scroll pr-2">
            {sizeList.map((size) => {
              const isActive = selected.has(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={[
                    "h-[48px] border border-black w-full",
                    "flex items-center justify-center",
                    "text-sm uppercase select-none",
                    "transition-colors",
                    // không border-radius
                    isActive
                      ? "bg-[#673AB7] text-white [box-shadow:inset_0_0_0_2px_#fff]"
                      : "bg-white text-black hover:bg-[#673AB7] hover:text-white hover:[box-shadow:inset_0_0_0_2px_#fff]",
                  ].join(" ")}
                  style={{}}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* CSS riêng cho scrollbar và hiệu ứng viền trong */}
      <style>{`
        .sizes-scroll::-webkit-scrollbar { width: 8px; }
        .sizes-scroll::-webkit-scrollbar-thumb { background: ${PURPLE}; }
        .sizes-scroll::-webkit-scrollbar-track { background: #e5e7eb; } /* gray-200 */
        /* Firefox */
        .sizes-scroll { scrollbar-color: ${PURPLE} #e5e7eb; scrollbar-width: thin; }
      `}</style>
    </div>
  );
}
