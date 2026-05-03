import React from "react";

function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* SPINNER */}
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

        {/* TEXT */}
        <p className="text-sm text-gray-600">جاري التحميل...</p>
      </div>
    </div>
  );
}

export default Loading;
