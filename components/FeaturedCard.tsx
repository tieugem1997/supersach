"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, CreditCard, Package, FileText, Hash, ImageIcon, X, ZoomIn, CheckCircle } from "lucide-react";

interface OrderData {
  id: string;
  thoiGianNhan: string;
  trangThai: string;
  tongCong: string;
  ghiChu: string;
  loaiDich: string;
  imageFilename?: string;
}

interface StatusTheme {
  gradient: string;
  emoji: string;
  label: string;
  message: string;
  step: number; // 0-3 for progress tracker
}

const PROGRESS_STEPS = ["Tiếp nhận", "Đang xử lý", "Sẵn sàng", "Hoàn tất"];

function getTheme(status: string): StatusTheme {
  const s = status.toLowerCase().trim();

  if (s.includes("chưa xử lý") || s.includes("tiếp nhận") || s.includes("chờ")) {
    return {
      gradient: "from-amber-400 to-orange-500",
      emoji: "📥",
      label: status || "Đã tiếp nhận",
      message: "Đơn của bạn vừa được tiếp nhận, chờ xử lý nhé!",
      step: 0,
    };
  }
  if (s.includes("đang giặt") || s.includes("đang sấy") || s.includes("đang xử lý")) {
    return {
      gradient: "from-sky-500 to-blue-600",
      emoji: "🫧",
      label: status || "Đang xử lý",
      message: "Đơn giặt của bạn đang được xử lý cẩn thận!",
      step: 1,
    };
  }
  if (s === "đã xử lý" || s.includes("đã xử lý") || s.includes("sẵn sàng") || s.includes("hoàn thành") || s.includes("chờ nhận")) {
    return {
      gradient: "from-emerald-400 to-teal-500",
      emoji: "✅",
      label: status || "Sẵn sàng nhận",
      message: "Xong rồi! Bạn có thể đến lấy đồ bất cứ lúc nào 🎉",
      step: 2,
    };
  }
  if (s.includes("đã giao") || s.includes("đã nhận") || s.includes("đã trả") || s.includes("hoàn tất")) {
    return {
      gradient: "from-slate-500 to-slate-600",
      emoji: "🎉",
      label: status || "Hoàn tất",
      message: "Đơn đã hoàn tất. Cảm ơn bạn đã tin dùng Super Sạch!",
      step: 3,
    };
  }
  if (s.includes("hủy") || s.includes("từ chối")) {
    return {
      gradient: "from-red-500 to-rose-600",
      emoji: "❌",
      label: status || "Đã hủy",
      message: "Đơn này đã bị hủy. Liên hệ Zalo để biết thêm chi tiết.",
      step: -1,
    };
  }
  return {
    gradient: "from-sky-500 to-teal-500",
    emoji: "⏳",
    label: status || "Đang xử lý",
    message: "Đơn của bạn đang được xử lý.",
    step: 1,
  };
}

function formatCurrency(value: string): string {
  if (!value) return "";
  const num = parseFloat(value.replace(/[^\d.]/g, ""));
  if (isNaN(num) || num === 0) return "";
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(num);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const m = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})/);
  if (m) {
    const [, d, mo, y, h, min] = m;
    return `${d.padStart(2, "0")}/${mo.padStart(2, "0")}/${y} lúc ${h}:${min}`;
  }
  return dateStr;
}

// ── Progress Tracker ─────────────────────────────────────────────────────────
function StatusProgress({ step }: { step: number }) {
  if (step < 0) return null;

  return (
    <div className="flex items-center gap-0 mt-4">
      {PROGRESS_STEPS.map((label, i) => {
        const isCompleted = i < step;
        const isActive = i === step;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted ? "bg-white text-emerald-600" :
                  isActive    ? "bg-white text-sky-600 ring-2 ring-white/40" :
                                "bg-white/20 text-white/50"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className={`text-[10px] font-bold ${isActive ? "text-sky-600" : "text-white/50"}`}>
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] font-semibold mt-1 whitespace-nowrap leading-tight ${
                  isCompleted || isActive ? "text-white" : "text-white/50"
                }`}
              >
                {label}
              </span>
            </div>
            {i < PROGRESS_STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 rounded-full transition-all duration-500 mb-4 ${
                  i < step ? "bg-white" : "bg-white/25"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Image Component ──────────────────────────────────────────────────────────
function OrderImage({ filename }: { filename: string }) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!filename) return;
    setLoading(true);
    setImgError(false);
    setThumbnailUrl(null);

    fetch(`/api/image?filename=${encodeURIComponent(filename)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data?.thumbnailUrl) setThumbnailUrl(data.thumbnailUrl); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filename]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setLightboxOpen(false);
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, handleKeyDown]);

  if (loading) {
    return (
      <div className="w-full h-44 rounded-2xl shimmer flex items-center justify-center">
        <ImageIcon className="w-8 h-8 text-slate-300" />
      </div>
    );
  }

  if (!thumbnailUrl || imgError) return null;

  return (
    <>
      <div
        className="relative rounded-2xl overflow-hidden cursor-zoom-in group"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={thumbnailUrl}
          alt="Ảnh đơn hàng"
          className="w-full object-cover max-h-60 transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2.5 shadow-lg">
            <ZoomIn className="w-5 h-5 text-slate-700" />
          </div>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
          Bấm để phóng to
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={thumbnailUrl.replace("sz=w800", "sz=w1600")}
            alt="Ảnh đơn hàng phóng to"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => { (e.target as HTMLImageElement).src = thumbnailUrl; }}
          />
          <p className="absolute bottom-4 text-white/40 text-xs">Bấm ra ngoài hoặc nhấn ESC để đóng</p>
        </div>
      )}
    </>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
interface FeaturedCardProps {
  order: OrderData;
}

export default function FeaturedCard({ order }: FeaturedCardProps) {
  const theme = getTheme(order.trangThai);
  const formattedTotal = formatCurrency(order.tongCong);
  const shortId = order.id ? order.id.slice(0, 8).toUpperCase() : null;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/80 border border-slate-100/80">

      {/* Gradient header with status */}
      <div className={`bg-gradient-to-br ${theme.gradient} p-5 sm:p-6 text-white`}>
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white/60 text-[10px] font-semibold uppercase tracking-widest">Trạng thái</span>
              {shortId && (
                <span className="bg-white/20 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/20">
                  #{shortId}
                </span>
              )}
            </div>
            <p className="text-xl sm:text-2xl font-extrabold leading-tight tracking-tight">
              {theme.emoji} {theme.label}
            </p>
            <p className="text-white/80 text-xs sm:text-sm mt-1.5 leading-relaxed">
              {theme.message}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 text-3xl">
            {theme.emoji}
          </div>
        </div>

        {/* Status progress tracker */}
        <StatusProgress step={theme.step} />
      </div>

      {/* Order image */}
      {order.imageFilename && (
        <div className="px-5 pt-5">
          <OrderImage filename={order.imageFilename} />
        </div>
      )}

      {/* Order details */}
      <div className="p-5 sm:p-6 space-y-3">
        {/* Date */}
        <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Thời gian nhận đồ</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{formatDate(order.thoiGianNhan)}</p>
          </div>
        </div>

        {/* Total */}
        {formattedTotal && (
          <div className="flex items-center gap-3 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100/50">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] text-emerald-600/70 font-semibold uppercase tracking-wider">Tổng cộng</p>
              <p className="text-xl font-extrabold text-emerald-700 mt-0.5">{formattedTotal}</p>
            </div>
          </div>
        )}

        {/* Service type */}
        {order.loaiDich && (
          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Loại dịch vụ</p>
              <p className="text-sm font-bold text-slate-700 mt-0.5">{order.loaiDich}</p>
            </div>
          </div>
        )}

        {/* Note */}
        {order.ghiChu && (
          <div className="flex items-start gap-3 p-3.5 bg-amber-50 rounded-2xl border border-amber-100/50">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FileText className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] text-amber-600/70 font-semibold uppercase tracking-wider">Ghi chú</p>
              <p className="text-sm text-amber-800 mt-0.5 leading-relaxed">{order.ghiChu}</p>
            </div>
          </div>
        )}

        {/* Order ID */}
        {shortId && (
          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <Hash className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Mã đơn hàng</p>
              <p className="text-sm font-mono font-bold text-slate-600 mt-0.5">{order.id.toUpperCase()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
