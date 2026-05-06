"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, CreditCard, Package, FileText, Hash, ImageIcon, X, ZoomIn } from "lucide-react";

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
}

function getTheme(status: string): StatusTheme {
  const s = status.toLowerCase().trim();

  if (s.includes("chưa xử lý") || s.includes("tiếp nhận")) {
    return {
      gradient: "from-amber-500 to-orange-500",
      emoji: "📥",
      label: status || "Chờ xử lý",
      message: "Đơn của bạn vừa được tiếp nhận, chờ xử lý nhé!",
    };
  }
  if (s.includes("đang giặt") || s.includes("đang sấy") || s.includes("đang xử lý")) {
    return {
      gradient: "from-sky-500 to-blue-600",
      emoji: "🫧",
      label: status || "Đang xử lý",
      message: "Đơn giặt của bạn đang được xử lý cẩn thận!",
    };
  }
  // "Đã xử lý" = processing done → ready to pick up
  if (s === "đã xử lý" || s.includes("đã xử lý")) {
    return {
      gradient: "from-emerald-500 to-teal-500",
      emoji: "✅",
      label: status || "Đã xử lý",
      message: "Xong rồi! Bạn có thể đến lấy bất cứ lúc nào 🎉",
    };
  }
  if (s.includes("hoàn thành") || s.includes("sẵn sàng nhận") || s.includes("sẵn sàng") || s.includes("chờ nhận")) {
    return {
      gradient: "from-emerald-500 to-teal-500",
      emoji: "✨",
      label: status || "Sẵn sàng nhận",
      message: "Đồ sạch rồi! Bạn có thể đến lấy bất cứ lúc nào 🎉",
    };
  }
  if (s.includes("đã giao") || s.includes("đã nhận") || s.includes("đã trả") || s.includes("hoàn tất")) {
    return {
      gradient: "from-slate-500 to-slate-600",
      emoji: "🎉",
      label: status || "Hoàn tất",
      message: "Đơn đã hoàn tất. Cảm ơn bạn đã tin dùng Super Sạch!",
    };
  }
  if (s.includes("hủy") || s.includes("từ chối")) {
    return {
      gradient: "from-red-500 to-rose-600",
      emoji: "❌",
      label: status || "Đã hủy",
      message: "Đơn này đã bị hủy. Liên hệ Zalo để biết thêm chi tiết.",
    };
  }
  // default – treat unknown as "in progress"
  return {
    gradient: "from-sky-500 to-teal-500",
    emoji: "⏳",
    label: status || "Đang xử lý",
    message: "Đơn của bạn đang được xử lý.",
  };
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
  const m = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})/);
  if (m) {
    const [, d, mo, y, h, min] = m;
    return `${d.padStart(2, "0")}/${mo.padStart(2, "0")}/${y} lúc ${h}:${min}`;
  }
  return dateStr;
}

// ── Image section with lazy Drive fetch ──────────────────────────────────────
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
      .then((data) => {
        if (data?.thumbnailUrl) setThumbnailUrl(data.thumbnailUrl);
      })
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
      <div className="w-full h-40 bg-slate-100 rounded-2xl flex items-center justify-center animate-pulse">
        <ImageIcon className="w-8 h-8 text-slate-300" />
      </div>
    );
  }

  if (!thumbnailUrl || imgError) return null;

  return (
    <>
      {/* Thumbnail */}
      <div
        className="relative rounded-2xl overflow-hidden cursor-zoom-in group"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={thumbnailUrl}
          alt="Ảnh đơn hàng"
          className="w-full object-cover max-h-56 transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        {/* Zoom hint overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2 shadow-lg">
            <ZoomIn className="w-5 h-5 text-slate-700" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          Bấm để phóng to
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Full image */}
          <img
            src={thumbnailUrl.replace("sz=w800", "sz=w1600")}
            alt="Ảnh đơn hàng phóng to"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              // Fallback to original size if w1600 fails
              (e.target as HTMLImageElement).src = thumbnailUrl;
            }}
          />

          <p className="absolute bottom-4 text-white/50 text-xs">
            Bấm ra ngoài hoặc nhấn ESC để đóng
          </p>
        </div>
      )}
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface FeaturedCardProps {
  order: OrderData;
}

export default function FeaturedCard({ order }: FeaturedCardProps) {
  const theme = getTheme(order.trangThai);
  const formattedTotal = formatCurrency(order.tongCong);
  const shortId = order.id ? order.id.slice(0, 8).toUpperCase() : null;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200 border border-slate-100">
      {/* Gradient header */}
      <div className={`bg-gradient-to-r ${theme.gradient} p-5 text-white`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white/70 text-xs font-medium uppercase tracking-widest">
                Trạng thái
              </span>
              {shortId && (
                <span className="bg-white/20 text-white text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                  #{shortId}
                </span>
              )}
            </div>
            <p className="text-xl sm:text-2xl font-bold leading-tight">
              {theme.emoji} {theme.label}
            </p>
            <p className="text-white/80 text-xs sm:text-sm mt-1.5 leading-relaxed">
              {theme.message}
            </p>
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 text-2xl sm:text-3xl">
            {theme.emoji}
          </div>
        </div>
      </div>

      {/* Order image */}
      {order.imageFilename && (
        <div className="px-5 pt-4">
          <OrderImage filename={order.imageFilename} />
        </div>
      )}

      {/* Details */}
      <div className="p-5 space-y-3">
        {/* Date */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
          <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Thời gian nhận đồ</p>
            <p className="text-sm font-bold text-slate-800">{formatDate(order.thoiGianNhan)}</p>
          </div>
        </div>

        {/* Total */}
        {formattedTotal && (
          <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-emerald-600/70 font-medium">Tổng cộng</p>
              <p className="text-lg font-extrabold text-emerald-700">{formattedTotal}</p>
            </div>
          </div>
        )}

        {/* Service */}
        {order.loaiDich && (
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Dịch vụ</p>
              <p className="text-sm font-bold text-slate-700">{order.loaiDich}</p>
            </div>
          </div>
        )}

        {/* Note */}
        {order.ghiChu && (
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FileText className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-amber-600/70 font-medium">Ghi chú</p>
              <p className="text-sm text-amber-800">{order.ghiChu}</p>
            </div>
          </div>
        )}

        {/* Order ID */}
        {shortId && (
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <Hash className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Mã đơn hàng</p>
              <p className="text-sm font-mono font-bold text-slate-600">{order.id.toUpperCase()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
