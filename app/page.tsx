"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  WashingMachine,
  MapPin,
  Phone,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import FeaturedCard from "@/components/FeaturedCard";
import GalleryCard from "@/components/GalleryCard";

interface OrderData {
  id: string;
  thoiGianNhan: string;
  trangThai: string;
  tongCong: string;
  ghiChu: string;
  loaiDich: string;
  imageFilename?: string;
}

interface ApiResponse {
  success: boolean;
  orders?: OrderData[];
  customerFound?: boolean;
  customerName?: string;
  error?: string;
}

type SearchState = "idle" | "loading" | "success" | "error";

export default function HomePage() {
  const [name, setName] = useState("");
  const [phoneLastThree, setPhoneLastThree] = useState("");
  const [state, setState] = useState<SearchState>("idle");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Rate limiting
  const [failCount, setFailCount] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  // Countdown timer for block
  useEffect(() => {
    if (blockedUntil <= Date.now()) return;
    setTimeLeft(Math.ceil((blockedUntil - Date.now()) / 1000));
    const timer = setInterval(() => {
      const remaining = Math.ceil((blockedUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [blockedUntil]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limit block
    if (blockedUntil > Date.now()) {
      setErrorMsg(`Quá nhiều lần thử không thành công. Vui lòng đợi ${timeLeft}s trước khi tìm lại.`);
      return;
    }

    if (!name.trim()) {
      setErrorMsg("Vui lòng nhập tên của bạn.");
      return;
    }
    if (!/^\d{3}$/.test(phoneLastThree.trim())) {
      setErrorMsg("Vui lòng nhập đúng 3 số cuối số điện thoại.");
      return;
    }

    setState("loading");
    setErrorMsg("");
    setResult(null);
    setSelectedIndex(0);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phoneLastThree: phoneLastThree.trim(),
        }),
      });
      const data: ApiResponse = await res.json();

      if (!data.success) {
        setState("error");
        setErrorMsg(data.error || "Có lỗi xảy ra. Vui lòng thử lại.");
        return;
      }

      setState("success");
      setResult(data);

      // Rate limiting: count consecutive "not found" searches
      if (!data.customerFound) {
        const newCount = failCount + 1;
        setFailCount(newCount);
        if (newCount >= 10) {
          setBlockedUntil(Date.now() + 15000);
        } else if (newCount >= 5) {
          setBlockedUntil(Date.now() + 10000);
        }
      } else {
        setFailCount(0); // reset on successful find
      }
    } catch {
      setState("error");
      setErrorMsg("Không thể kết nối. Vui lòng kiểm tra mạng và thử lại.");
    }
  };

  // Scroll to results after search succeeds
  useEffect(() => {
    if (state === "success" && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [state]);

  // Scroll active gallery card into view
  useEffect(() => {
    if (!galleryRef.current) return;
    const active = galleryRef.current.querySelector("[data-active='true']");
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedIndex]);

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setErrorMsg("");
    setName("");
    setPhoneLastThree("");
    setSelectedIndex(0);
  };

  const orders = result?.orders ?? [];
  const hasOrders = orders.length > 0;
  const selectedOrder = orders[selectedIndex];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-md shadow-sky-200">
              <WashingMachine className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Giặt Sấy Super Sạch
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Tra cứu đơn hàng trực tuyến
              </p>
            </div>
          </div>
          <a
            href="https://zalo.me/0357358582"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Zalo hỗ trợ
          </a>
        </div>
      </header>

      {/* ── Hero Banner ── */}
      <section className="bg-gradient-to-br from-sky-600 via-sky-500 to-teal-500 text-white pt-10 pb-20 px-4 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-12 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute top-8 right-1/3 w-16 h-16 rounded-full bg-white/10" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Tra cứu nhanh trong vòng 5 giây
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold leading-tight mb-3">
            Đồ Giặt Của Bạn <br className="hidden sm:block" />
            Đến Đâu Rồi? 🧺
          </h2>
          <p className="text-sky-100 text-sm sm:text-base mb-2">
            Nhập tên và 3 số cuối điện thoại để xem trạng thái đơn hàng trong{" "}
            <span className="font-semibold text-white">30 ngày gần nhất</span>
          </p>
          <div className="flex items-center justify-center gap-1.5 text-sky-200 text-xs">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            105 Đường 39, Phường Bình Trưng, TP. Hồ Chí Minh
          </div>
        </div>
      </section>

      {/* ── Search Card (overlapping hero) ── */}
      <div className="max-w-2xl mx-auto w-full px-4 -mt-10 z-10 relative">
        <div className="bg-white rounded-3xl shadow-xl shadow-sky-100 border border-slate-100 p-6 sm:p-8">
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tên
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrorMsg(""); }}
                  placeholder="VD: An, Ánh, Sang..."
                  className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm font-medium transition-colors"
                  autoComplete="name"
                  autoFocus
                />
              </div>

              {/* Phone last 3 */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  3 số cuối số điện thoại
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm select-none">
                    *** *** *
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    value={phoneLastThree}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                      setPhoneLastThree(val);
                      setErrorMsg("");
                    }}
                    placeholder="_ _ _"
                    className="w-full pl-28 pr-4 py-3.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm font-bold tracking-widest transition-colors"
                  />
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
                <p className="text-xs text-slate-400 mt-1.5 pl-1">
                  VD: SĐT 0912 345{" "}
                  <span className="font-bold text-sky-600 bg-sky-50 px-1 rounded">678</span>{" "}
                  → nhập <span className="font-bold text-sky-600">678</span>
                </p>
              </div>
            </div>

            {/* Error */}
            {errorMsg && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm mb-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={state === "loading" || timeLeft > 0}
              className="search-btn w-full bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-sky-200"
            >
              {state === "loading" ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Đang tra cứu...
                </>
              ) : timeLeft > 0 ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  Chờ {timeLeft}s để tìm lại...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Tra Cứu Đơn Hàng
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Results Section ── */}
      <div
        ref={resultsRef}
        className="max-w-2xl mx-auto w-full px-4 pt-6 pb-12 flex-1"
      >
        {/* ── Customer not found ── */}
        {state === "success" && result && !result.customerFound && (
          <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Không tìm thấy thông tin
            </h3>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">
              Không tìm thấy khách hàng với tên và số điện thoại bạn cung cấp.
              Vui lòng kiểm tra lại hoặc liên hệ tiệm để được hỗ trợ.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://zalo.me/0357358582"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-md shadow-sky-100"
              >
                <MessageCircle className="w-4 h-4" />
                Liên hệ Zalo: 0357 358 582
              </a>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Tìm lại
              </button>
            </div>
          </div>
        )}

        {/* ── No orders in 30 days ── */}
        {state === "success" && result?.customerFound && !hasOrders && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center">
            <div className="text-5xl mb-4">🧺</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Không có đơn hàng nào
            </h3>
            <p className="text-slate-500 text-sm mb-1 leading-relaxed">
              Xin chào bạn! Bạn không có đơn hàng nào trong{" "}
              <span className="font-semibold">30 ngày gần nhất</span>.
            </p>
            <p className="text-slate-400 text-sm mb-6">
              Vui lòng liên hệ Zalo{" "}
              <span className="font-bold text-sky-600">0357 358 582</span>{" "}
              để được kiểm tra chi tiết.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://zalo.me/0357358582"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-md shadow-sky-100"
              >
                <MessageCircle className="w-4 h-4" />
                Zalo: 0357 358 582
              </a>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Tìm lại
              </button>
            </div>
          </div>
        )}

        {/* ── Orders found ── */}
        {state === "success" && hasOrders && selectedOrder && (
          <div>
            {/* Greeting bar */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                  Xin chào
                </p>
                <p className="text-base font-bold text-slate-800">
                  {result?.customerName} —{" "}
                  <span className="text-sky-600">{orders.length} đơn</span> trong 30 ngày qua
                </p>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Tìm lại
              </button>
            </div>

            {/* Featured order detail card */}
            <div className="mb-4">
              {orders.length > 1 && (
                <p className="text-xs text-slate-400 font-medium mb-2 px-1">
                  {selectedIndex === 0 ? "🕐 Đơn hàng gần nhất" : `📋 Đơn hàng #${selectedIndex + 1}`}
                </p>
              )}
              <FeaturedCard order={selectedOrder} />
            </div>

            {/* Gallery – other orders */}
            {orders.length > 1 && (
              <div>
                <p className="text-xs text-slate-400 font-medium mb-3 px-1 uppercase tracking-wide">
                  Các đơn trong 30 ngày ({orders.length} đơn) — bấm để xem chi tiết
                </p>
                <div
                  ref={galleryRef}
                  className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4"
                  style={{ scrollbarWidth: "none" }}
                >
                  {orders.map((order, i) => (
                    <div
                      key={`${order.id}-${i}`}
                      data-active={i === selectedIndex ? "true" : "false"}
                    >
                      <GalleryCard
                        order={order}
                        isActive={i === selectedIndex}
                        onClick={() => setSelectedIndex(i)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom contact */}
            <div className="mt-5 bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
              <p className="text-slate-600 text-center sm:text-left text-xs">
                Cần hỗ trợ hoặc có thắc mắc về đơn hàng?
              </p>
              <a
                href="https://zalo.me/0357358582"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors whitespace-nowrap shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Zalo: 0357 358 582
              </a>
            </div>
          </div>
        )}

        {/* ── Idle hints ── */}
        {state === "idle" && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: "🔒", title: "Bảo mật", desc: "Chỉ bạn mới thấy đơn hàng của mình" },
              { icon: "⚡", title: "Nhanh chóng", desc: "Kết quả hiển thị trong vài giây" },
              { icon: "📋", title: "30 ngày gần nhất", desc: "Xem lịch sử theo thời gian thực" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-slate-100 p-4 text-center shadow-sm"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-sm font-bold text-slate-700">{item.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 mt-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center">
                <WashingMachine className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Giặt Sấy Super Sạch</p>
                <p className="text-xs">Dịch vụ giặt sấy chuyên nghiệp</p>
              </div>
            </div>
            <a
              href="https://zalo.me/0357358582"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Zalo: 0357 358 582
            </a>
          </div>
          <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              105 Đường 39, Phường Bình Trưng, TP. Hồ Chí Minh
            </div>
            <p className="text-slate-600">© 2025 Super Sạch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
