import { Calendar, CreditCard, Package, FileText } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface OrderData {
  id: string;
  thoiGianNhan: string;
  trangThai: string;
  tongCong: string;
  ghiChu: string;
  loaiDich: string;
}

interface OrderCardProps {
  order: OrderData;
  index: number;
}

function formatCurrency(value: string): string {
  if (!value) return "";
  const num = parseFloat(value.replace(/[^\d.]/g, ""));
  if (isNaN(num) || num === 0) return "";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(num);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  // DD/MM/YYYY HH:mm:ss → "09/05/2024 lúc 20:05"
  const m = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})/);
  if (m) {
    const [, d, mo, y, h, min] = m;
    return `${d.padStart(2,"0")}/${mo.padStart(2,"0")}/${y} lúc ${h}:${min}`;
  }
  return dateStr;
}

export default function OrderCard({ order, index }: OrderCardProps) {
  const formattedTotal = formatCurrency(order.tongCong);
  const shortId = order.id ? order.id.slice(0, 8).toUpperCase() : null;

  return (
    <div
      className="order-card bg-white rounded-2xl border border-slate-100 p-5 shadow-sm animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms`, opacity: 0 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Đơn hàng</p>
            <p className="text-sm font-bold text-slate-800 font-mono">
              {shortId ? `#${shortId}` : "—"}
            </p>
          </div>
        </div>
        <StatusBadge status={order.trangThai} />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Date */}
        <div className="flex items-center gap-2.5 bg-slate-50 rounded-xl px-3 py-2.5">
          <Calendar className="w-4 h-4 text-sky-500 flex-shrink-0" />
          <div>
            <p className="text-xs text-slate-400">Thời gian nhận</p>
            <p className="text-sm font-semibold text-slate-700">{formatDate(order.thoiGianNhan)}</p>
          </div>
        </div>

        {/* Total */}
        {formattedTotal && (
          <div className="flex items-center gap-2.5 bg-green-50 rounded-xl px-3 py-2.5">
            <CreditCard className="w-4 h-4 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-green-600/70">Tổng cộng</p>
              <p className="text-sm font-bold text-green-700">{formattedTotal}</p>
            </div>
          </div>
        )}

        {/* Service */}
        {order.loaiDich && (
          <div className="flex items-center gap-2.5 bg-slate-50 rounded-xl px-3 py-2.5">
            <Package className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Dịch vụ</p>
              <p className="text-sm font-semibold text-slate-700">{order.loaiDich}</p>
            </div>
          </div>
        )}

        {/* Note */}
        {order.ghiChu && (
          <div className="flex items-start gap-2.5 bg-amber-50 rounded-xl px-3 py-2.5 sm:col-span-2">
            <FileText className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-amber-600/70">Ghi chú</p>
              <p className="text-sm text-amber-700">{order.ghiChu}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
