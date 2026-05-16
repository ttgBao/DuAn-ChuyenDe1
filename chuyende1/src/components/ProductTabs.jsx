import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// ✅ Tabs cố định
const tabs = [
  { id: "description", label: "Mô tả chi tiết" },
  { id: "composition", label: "Thành phần" },
];

export default function ProductTabs({
  descriptionContent,
  compositionContent,
}) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="w-full mt-10">
      {/* ========== MOBILE (Accordion) ========== */}
      <div className="md:hidden space-y-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <div key={tab.id} className="border-t border-gray-200">
              <button
                onClick={() => setActiveTab(isActive ? null : tab.id)}
                className={`flex justify-between items-center w-full py-3 px-2 font-medium text-sm ${
                  isActive ? "text-[#673AB7]" : "text-gray-700"
                }`}
              >
                <span>{tab.label}</span>
                {!isActive && (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {isActive && (
                <div className="py-4 px-2 animate-fade-in">
                  {tab.id === "description" && descriptionContent}
                  {tab.id === "composition" && compositionContent}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========== DESKTOP (Tabs) ========== */}
      <div className="hidden md:block">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-6 text-sm font-medium border-l border-t border-r -mb-px rounded-t-md
                ${
                  activeTab === tab.id
                    ? "bg-[#673AB7] text-white border-[#673AB7]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="border-t border-gray-200" />

        <div className="py-6">
          {activeTab === "description" && descriptionContent}
          {activeTab === "composition" && compositionContent}
        </div>
      </div>
    </div>
  );
}
