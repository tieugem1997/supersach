"use client";

interface OrderData {
  id: string;
  thoiGianNhan: string;
  trangThai: string;
  tongCong: string;
  ghiChu: string;
  loaiDich: string;
}

interface GalleryCardProps {
  order: OrderData;
  isActive: boolean;
  onClick: () => void;
}

function getStatusColor(status: string): { dot: string; bg: string; text: string; ring: string } {
  const s = status.toLowerCase();
  if (s.includes("đã xử lý") || s.includes("sẵn sàng") || s.includes("hoàn thành")) {
    return { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-400" };
  }
  if (s.includes("đang") || s.includes("xử lý")) {
    return { dot: "bg-sky-500", bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-400" };
  }
  if (s.includes("đã giao") || s.includes("đã nhận") || s.includes("đã trả") || s.includes("hoàn tất")) {
    return { dot: "bg-slate-400", bg: "bg-slate-100", text: "text-slate-600", ring: "ring-slate-400" };
  }
  if (s.includes("hủy")) {
    return { dot: "bg-red-500", bg: "bg-red-50", text: "text-red-600", ring: "ring-red-400" };
  }
  if (s.includes("chưa") || s.includes("chờ") || s.includes("tiếp nhận")) {
    return { dot: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-400" };
  }
  return { dot: "bg-sky-400", bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-400" };
}

function isActiveStatus(status: string): boolean {
  const s = status.toLowerCase();
  return s.includes("đang") || s.includes("xử lý") || s.includes("tiếp nhận") || s.includes("chờ");
}

function shortDate(dateStr: string): string {
  if (!dateStr) return "—";
  const m = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return `${m[1].padStart(2, "0")}/${m[2].padStart(2, "0")}`;
  return dateStr.slice(0, 5);
}

function formatAmount(value: string): string {
  if (!value) return "";
  const num = parseFloat(value.replace(/[^\d.]/g, ""));
  if (isNaN(num) || num === 0) return "";
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${Math.round(num / 1000)}k`;
  return `${num}`;
}

export default function GalleryCard({ order, isActive, onClick }: GalleryCardProps) {
  const sc = getStatusColor(order.trangThai);
  const amount = formatAmount(order.tongCong);
  const pulse = isActiveStatus(order.trangThai);

  return (
    <button
      onClick={onClick}
      className={`
        flex-shrink-0 w-[155px] rounded-2xl p-4 text-left transition-all duration-200 border-2 cursor-pointer select-none
        ${isActive
          ? `border-sky-500 bg-sky-50 shadow-lg shadow-sky-100`
          : "border-slate-100 bg-white hover:border-sky-200 hover:shadow-sm hover:-translate-y-0.5"
        }
      `}
    >
      {/* Date */}
      <p className={`text-xs font-bold mb-2.5 ${isActive ? "text-sky-700" : "text-slate-500"}`}>
        📅 {shortDate(order.thoiGianNhan)}
      </p>

      {/* Status badge */}
      <div className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 mb-3 ${sc.bg}`}>
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sc.dot} ${pulse ? "status-dot-pulse" : ""}`}
        />
        <span className={`text-[10px] font-semibold leading-tight truncate max-w-[100px] ${sc.text}`}>
          {order.trangThai || "Đang xử lý"}
        </span>
      </div>

      {/* Amount */}
      {amount && (
        <p className={`text-base font-extrabold tracking-tight ${isActive ? "text-sky-700" : "text-slate-700"}`}>
          {amount}
          <span className="text-xs font-semibold ml-0.5">₫</span>
        </p>
      )}

      {/* Service type */}
      {order.loaiDich && (
        <p className={`text-[10px] font-medium mt-1.5 truncate ${isActive ? "text-sky-500" : "text-slate-400"}`}>
          {order.loaiDich}
        </p>
      )}

      {/* Active indicator */}
      {isActive && (
        <div className="mt-2.5 flex justify-center">
          <div className="w-5 h-1 rounded-full bg-sky-500" />
        </div>
      )}
    </button>
  );
}
