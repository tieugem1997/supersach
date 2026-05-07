"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  WashingMachine,
  MapPin,
  Phone,
  AlertCircle,
  RefreshCw,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Shield,
  Zap,
  Clock,
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
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Rate limiting
  const [failCount, setFailCount] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

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

    if (blockedUntil > Date.now()) {
      setErrorMsg(`Quá nhiều lần thử. Vui lòng đợi ${timeLeft}s trước khi tìm lại.`);
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
        body: JSON.stringify({ name: name.trim(), phoneLastThree: phoneLastThree.trim() }),
      });
      const data: ApiResponse = await res.json();

      if (!data.success) {
        setState("error");
        setErrorMsg(data.error || "Có lỗi xảy ra. Vui lòng thử lại.");
        return;
      }

      setState("success");
      setResult(data);

      if (!data.customerFound) {
        const newCount = failCount + 1;
        setFailCount(newCount);
        if (newCount >= 10) setBlockedUntil(Date.now() + 15000);
        else if (newCount >= 5) setBlockedUntil(Date.now() + 10000);
      } else {
        setFailCount(0);
      }
    } catch {
      setState("error");
      setErrorMsg("Không thể kết nối. Vui lòng kiểm tra mạng và thử lại.");
    }
  };

  useEffect(() => {
    if (state === "success" && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [state]);

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
    setTimeout(() => nameInputRef.current?.focus(), 100);
  };

  const orders = result?.orders ?? [];
  const hasOrders = orders.length > 0;
  const selectedOrder = orders[selectedIndex];

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="glass border-b border-sky-100/60 sticky top-0 z-40 shadow-sm shadow-sky-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-md shadow-sky-200">
              <WashingMachine className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight tracking-tight">
                Giặt Sấy Super Sạch
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block font-medium">
                Tra cứu đơn hàng trực tuyến
              </p>
            </div>
          </div>
          <a
            href="https://zalo.me/0357358582"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-white bg-sky-50 hover:bg-sky-600 px-3 py-2 rounded-xl transition-all duration-200 min-h-[36px]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Zalo hỗ trợ</span>
            <span className="xs:hidden">Zalo</span>
          </a>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="hero-gradient text-white pt-10 pb-24 px-4 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-xl" />
        <div className="absolute -bottom-24 -left-16 w-96 h-96 rounded-full bg-white/5 blur-xl" />
        <div className="absolute top-10 right-[20%] w-20 h-20 rounded-full bg-white/10 animate-float" />
        <div className="absolute bottom-16 left-[15%] w-10 h-10 rounded-full bg-white/10 animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-semibold mb-6 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Tra cứu nhanh trong vòng 5 giây
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
            Đồ Giặt Của Bạn
            <br />
            <span className="text-yellow-300">Đến Đâu Rồi?</span> 🧺
          </h2>

          <p className="text-sky-100 text-sm sm:text-base mb-3 leading-relaxed max-w-md mx-auto">
            Nhập tên và 3 số cuối điện thoại để xem trạng thái đơn hàng trong{" "}
            <span className="font-bold text-white bg-white/15 px-1.5 py-0.5 rounded-md">30 ngày gần nhất</span>
          </p>

          <div className="flex items-center justify-center gap-1.5 text-sky-200/80 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-sky-300" />
            105 Đường 39, Phường Bình Trưng, TP. Hồ Chí Minh
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="relative -mt-1 z-10">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-10 block" fill="#f0f9ff">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" />
        </svg>
      </div>

      {/* ── Search Card ───────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto w-full px-4 -mt-8 z-20 relative">
        <div className="bg-white rounded-3xl shadow-2xl shadow-sky-100/60 border border-sky-100/50 p-6 sm:p-8 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center">
              <Search className="w-4 h-4 text-sky-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Tra Cứu Đơn Hàng</h3>
              <p className="text-xs text-slate-400">Nhập thông tin bên dưới để tìm đơn của bạn</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4 mb-5">
              {/* Name input */}
              <div>
                <label htmlFor="customer-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Tên khách hàng <span className="text-red-400">*</span>
                </label>
                <input
                  id="customer-name"
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrorMsg(""); }}
                  placeholder="Ví dụ: Ánh, Sang, Nam..."
                  className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-300 text-sm font-medium transition-all duration-200 bg-slate-50/50 hover:border-sky-200 hover:bg-white"
                  autoComplete="given-name"
                  autoFocus
                />
              </div>

              {/* Phone input */}
              <div>
                <label htmlFor="phone-last-three" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  3 số cuối số điện thoại <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none select-none">
                    <Phone className="w-4 h-4 text-slate-300" />
                    <span className="text-slate-300 font-mono text-sm font-bold tracking-wider">0xx xxx x</span>
                  </div>
                  <input
                    id="phone-last-three"
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
                    className="w-full pl-36 pr-4 py-3.5 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-300 text-sm font-bold tracking-[0.3em] transition-all duration-200 bg-slate-50/50 hover:border-sky-200 hover:bg-white"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1.5 pl-0.5">
                  VD: SĐT{" "}
                  <span className="font-mono">0912 345 <span className="font-bold text-sky-600 bg-sky-50 px-1 rounded">678</span></span>{" "}
                  → nhập <span className="font-bold text-sky-600 font-mono">678</span>
                </p>
              </div>
            </div>

            {/* Error message */}
            {errorMsg && (
              <div className="flex items-center gap-2.5 text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm mb-5 animate-slide-down">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={state === "loading" || timeLeft > 0}
              className="search-btn w-full bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 text-sm sm:text-base shadow-lg shadow-sky-200 min-h-[52px]"
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

      {/* ── Results Section ───────────────────────────────────────────────── */}
      <div ref={resultsRef} className="max-w-2xl mx-auto w-full px-4 pt-6 pb-24 sm:pb-12 flex-1">

        {/* Customer not found */}
        {state === "success" && result && !result.customerFound && (
          <div className="bg-white rounded-3xl border border-amber-100 shadow-md shadow-amber-50 p-8 text-center animate-fade-in-up">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Không tìm thấy khách hàng</h3>
            <p className="text-slate-500 text-sm mb-1 leading-relaxed">
              Không tìm thấy khách hàng với tên và số điện thoại bạn cung cấp.
            </p>
            <p className="text-slate-400 text-xs mb-6">
              Vui lòng kiểm tra lại hoặc liên hệ tiệm để được hỗ trợ.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://zalo.me/0357358582"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-3 rounded-2xl text-sm transition-colors shadow-md shadow-sky-100 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                Zalo: 0357 358 582
              </a>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-semibold px-5 py-3 rounded-2xl text-sm transition-colors min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" />
                Tìm lại
              </button>
            </div>
          </div>
        )}

        {/* No orders in 30 days */}
        {state === "success" && result?.customerFound && !hasOrders && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-8 text-center animate-fade-in-up">
            <div className="text-5xl mb-4">🧺</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Chưa có đơn hàng</h3>
            <p className="text-slate-500 text-sm mb-1 leading-relaxed">
              Xin chào bạn! Không có đơn hàng nào trong{" "}
              <span className="font-semibold text-slate-700">30 ngày gần nhất</span>.
            </p>
            <p className="text-slate-400 text-xs mb-6">
              Liên hệ Zalo <span className="font-bold text-sky-600">0357 358 582</span> để được kiểm tra chi tiết.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://zalo.me/0357358582"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-3 rounded-2xl text-sm transition-colors shadow-md shadow-sky-100 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                Zalo: 0357 358 582
              </a>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-semibold px-5 py-3 rounded-2xl text-sm transition-colors min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" />
                Tìm lại
              </button>
            </div>
          </div>
        )}

        {/* Orders found */}
        {state === "success" && hasOrders && selectedOrder && (
          <div className="animate-fade-in-up">
            {/* Greeting bar */}
            <div className="flex items-center justify-between mb-5 px-1">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-0.5">Xin chào</p>
                <p className="text-base font-bold text-slate-800">
                  {result?.customerName}
                  {" — "}
                  <span className="text-sky-600">{orders.length} đơn</span>
                  <span className="text-slate-400 font-normal text-sm"> trong 30 ngày</span>
                </p>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors min-h-[36px]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Tìm lại
              </button>
            </div>

            {/* Featured order */}
            <div className="mb-5">
              {orders.length > 1 && (
                <p className="text-xs text-slate-400 font-semibold mb-2 px-1 uppercase tracking-wide">
                  {selectedIndex === 0 ? "🕐 Đơn hàng gần nhất" : `📋 Đơn hàng #${selectedIndex + 1}`}
                </p>
              )}
              <FeaturedCard order={selectedOrder} />
            </div>

            {/* Gallery – other orders */}
            {orders.length > 1 && (
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-3 px-1 uppercase tracking-wide">
                  Tất cả đơn hàng ({orders.length} đơn) — bấm để xem chi tiết
                </p>
                <div
                  ref={galleryRef}
                  className="gallery-scroll flex gap-3 overflow-x-auto pb-3 -mx-4 px-4"
                >
                  {orders.map((order, i) => (
                    <div key={`${order.id}-${i}`} data-active={i === selectedIndex ? "true" : "false"} className="gallery-item">
                      <GalleryCard order={order} isActive={i === selectedIndex} onClick={() => setSelectedIndex(i)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom contact strip */}
            <div className="mt-5 bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold text-slate-600">Cần hỗ trợ về đơn hàng?</p>
                <p className="text-xs text-slate-400 mt-0.5">Liên hệ tiệm qua Zalo để được giải đáp nhanh</p>
              </div>
              <a
                href="https://zalo.me/0357358582"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors whitespace-nowrap shadow-sm min-h-[40px]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Zalo: 0357 358 582
              </a>
            </div>
          </div>
        )}

        {/* Idle hints */}
        {(state === "idle" || state === "error") && (
          <div className="mt-8 grid grid-cols-3 gap-3 animate-fade-in-up-delay">
            {[
              { icon: Shield, iconColor: "text-sky-500", bg: "bg-sky-50", title: "Bảo mật", desc: "Chỉ bạn mới thấy đơn hàng của mình" },
              { icon: Zap, iconColor: "text-amber-500", bg: "bg-amber-50", title: "Nhanh chóng", desc: "Kết quả trong vài giây" },
              { icon: Clock, iconColor: "text-emerald-500", bg: "bg-emerald-50", title: "30 ngày", desc: "Xem lịch sử đơn hàng gần nhất" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-slate-100 p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mx-auto mb-2`}>
                  <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <p className="text-xs font-bold text-slate-700 mb-0.5">{item.title}</p>
                <p className="text-[10px] text-slate-400 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 mt-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg">
                <WashingMachine className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm tracking-tight">Giặt Sấy Super Sạch</p>
                <p className="text-xs text-slate-500 mt-0.5">Dịch vụ giặt sấy chuyên nghiệp</p>
              </div>
            </div>
            <a
              href="https://zalo.me/0357358582"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-semibold transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-400/10 group-hover:bg-sky-400/20 flex items-center justify-center transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              0357 358 582
            </a>
          </div>

          <div className="border-t border-slate-800 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
              105 Đường 39, Phường Bình Trưng, TP. Hồ Chí Minh
            </div>
            <p className="text-slate-700 font-medium">© 2025 Super Sạch.</p>
          </div>
        </div>
      </footer>

      {/* ── Sticky Mobile Bottom Bar ──────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden pb-safe">
        <div className="bg-white/90 backdrop-blur-lg border-t border-sky-100 px-4 py-3">
          <a
            href="https://zalo.me/0357358582"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 text-white font-bold py-3.5 px-6 rounded-2xl text-sm shadow-lg shadow-sky-200 w-full"
          >
            <MessageCircle className="w-4 h-4" />
            Liên hệ Zalo hỗ trợ: 0357 358 582
          </a>
        </div>
      </div>
    </div>
  );
}
