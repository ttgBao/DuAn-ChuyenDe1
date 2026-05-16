import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MIN_CAP = 0;
const MAX_CAP = 2_000_000_0; // max mặc định
const STEP = 10_000;

export default function PriceFilter({ onSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [expanded, setExpanded] = useState(true);
  const [minVal, setMinVal] = useState(MIN_CAP);
  const [maxVal, setMaxVal] = useState(MAX_CAP);
  const [minInput, setMinInput] = useState(String(MIN_CAP));
  const [maxInput, setMaxInput] = useState(String(MAX_CAP));
  const [error, setError] = useState("");

  // Đọc giá từ URL nếu có (?price=min:max)
  useEffect(() => {
    const p = searchParams.get("price");
    if (!p) return;
    const [pmin, pmax] = p.split(":").map((n) => Number(n));
    if (Number.isFinite(pmin) && Number.isFinite(pmax)) {
      const clampMin = Math.max(MIN_CAP, Math.min(pmin, MAX_CAP));
      const clampMax = Math.max(MIN_CAP, Math.min(pmax, MAX_CAP));
      setMinVal(clampMin);
      setMaxVal(clampMax);
      setMinInput(String(clampMin));
      setMaxInput(String(clampMax));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // % cho highlight giữa 2 đầu trượt
  const leftPct = useMemo(
    () => ((minVal - MIN_CAP) / (MAX_CAP - MIN_CAP)) * 100,
    [minVal]
  );
  const rightPct = useMemo(
    () => 100 - ((maxVal - MIN_CAP) / (MAX_CAP - MIN_CAP)) * 100,
    [maxVal]
  );

  // ===== Handlers: Slider =====
  const handleMinSlide = (v) => {
    const n = Math.min(Number(v), maxVal); // không cho vượt max
    setMinVal(n);
    setMinInput(String(n));
    setError("");
  };
  const handleMaxSlide = (v) => {
    const n = Math.max(Number(v), minVal); // không cho nhỏ hơn min
    setMaxVal(n);
    setMaxInput(String(n));
    setError("");
  };

  // ===== Handlers: Input số (chặn chữ tuyệt đối) =====
  const onlyDigitsBeforeInput = (e) => {
    // Cho phép xóa (null) khi IME composition
    if (e.data == null) return;
    if (!/^[0-9]$/.test(e.data)) e.preventDefault();
  };
  const onlyDigitsOnPaste = (e) => {
    const t = e.clipboardData.getData("text");
    if (!/^\d+$/.test(t)) e.preventDefault();
  };

  const commitMinInput = (raw) => {
    if (raw === "") {
      setMinInput("0");
      setMinVal(0);
      return;
    }
    let n = Number(raw);
    if (!Number.isFinite(n)) return;
    n = Math.max(MIN_CAP, Math.min(n, maxVal)); // clamp và không vượt max hiện tại
    setMinInput(String(n));
    setMinVal(n);
    setError("");
  };

  const commitMaxInput = (raw) => {
    if (raw === "") {
      setMaxInput(String(MAX_CAP));
      setMaxVal(MAX_CAP);
      return;
    }
    let n = Number(raw);
    if (!Number.isFinite(n)) return;
    n = Math.min(MAX_CAP, Math.max(n, minVal)); // clamp và không nhỏ hơn min hiện tại
    setMaxInput(String(n));
    setMaxVal(n);
    setError("");
  };

  const handleSearch = () => {
    const minN = Number(minInput);
    const maxN = Number(maxInput);
    if (minN > maxN) {
      setError("Giá tối thiểu không được lớn hơn giá tối đa.");
      return;
    }
    setError("");

    // Cập nhật URL param (không reload)
    const params = new URLSearchParams(searchParams);
    params.set("price", `${minN}:${maxN}`);
    setSearchParams(params, { replace: true });

    // Callback tìm kiếm (nếu truyền vào)
    onSearch?.(minN, maxN);
  };

  return (
    <div className="border-t pt-4">
      <button
        type="button"
        onClick={() => setExpanded((x) => !x)}
        className="w-full flex items-center justify-between"
        aria-expanded={expanded}
      >
        <span className="font-bold text-black tracking-wide">GIÁ</span>
        <svg
          className="w-6 h-6 text-black"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          {expanded ? (
            <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" />
          ) : (
            <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" />
          )}
        </svg>
      </button>

      {/* Body (collapsible) */}
      {expanded && (
        <div className="mt-4">
          {/* Slider với 2 đầu kéo */}
          <div className="relative py-4">
            {/* Track */}
             <div className="absolute h-[3px] bg-gray-400 rounded-sm left-0 right-0 top-0" />
            {/* Highlight giữa min-max (tùy thích) */}
            <div
              className="absolute left-0 right-0 top-0  h-[3px] bg-black"
              style={{
                left: `${leftPct}%`,
                right: `${rightPct}%`,
              }}
            />
            {/* Double inputs range chồng nhau */}
            <input
              type="range"
              min={MIN_CAP}
              max={MAX_CAP}
              step={STEP}
              value={minVal}
              onChange={(e) => handleMinSlide(e.target.value)}
              className="range-thumb absolute left-0 -top-2 -translate-y-1/2 w-full"
              aria-label="Min price"
            />
            <input
              type="range"
              min={MIN_CAP}
              max={MAX_CAP}
              step={STEP}
              value={maxVal}
              onChange={(e) => handleMaxSlide(e.target.value)}
              className="range-thumb absolute left-0 -top-2 -translate-y-1/2 w-full"
              aria-label="Max price"
            />

       {/* Nhãn 2 đầu (theo giá đang chọn) */}
<div className="flex justify-between text-sm text-gray-700 mt-2">
  <span>
    {minVal.toLocaleString("vi-VN")}đ
  </span>
  <span>
    {maxVal.toLocaleString("vi-VN")}đ
  </span>
</div>
          </div>

          {/* Inputs */}
          <div className="space-y-2">
            <input
              type="text"
              inputMode="numeric"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              onBeforeInput={onlyDigitsBeforeInput}
              onPaste={onlyDigitsOnPaste}
              onDrop={(e) => e.preventDefault()}
              onBlur={(e) => commitMinInput(e.target.value)}
              onFocus={(e) => {
                // nếu đang là "0" thì xóa để gõ luôn
                if (e.target.value === "0") setMinInput("");
              }}
              className="w-full border px-3 py-2 outline-none"
              aria-label="Giá tối thiểu"
            />
            <div className="text-center text-gray-600">-</div>
            <input
              type="text"
              inputMode="numeric"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              onBeforeInput={onlyDigitsBeforeInput}
              onPaste={onlyDigitsOnPaste}
              onDrop={(e) => e.preventDefault()}
              onBlur={(e) => commitMaxInput(e.target.value)}
              className="w-full border px-3 py-2 outline-none"
              aria-label="Giá tối đa"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="mt-2 text-red-600 text-sm" role="alert">
              {error}
            </p>
          )}

          {/* Search button */}
          <button
            type="button"
            onClick={handleSearch}
            className="mt-4 w-full border border-black bg-white text-black px-4 py-3 uppercase hover:bg-black hover:text-white rounded-none"
          >
            Search
          </button>
        </div>
      )}

      {/* CSS riêng cho thumb của range */}
      <style>{`
        .range-thumb {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          pointer-events: none; /* chỉ cho thumb nhận event */
        }
        .range-thumb::-webkit-slider-runnable-track {
          height: 0; background: transparent;
        }
        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 12px;
          background: #ffffff;
          border: 1px solid #9ca3af; /* gray-400 */
          border-radius: 3px;
          pointer-events: auto;
          cursor: pointer;
        }
        .range-thumb::-moz-range-track {
          height: 0; background: transparent;
        }
        .range-thumb::-moz-range-thumb {
          height: 18px;
          width: 12px;
          background: #ffffff;
          border: 1px solid #9ca3af;
          border-radius: 3px;
          pointer-events: auto;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
