import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Phone, MessageCircle, Clock, Star, Shirt } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Giặt Sấy Quần Áo Quận 2 | SUPER SẠCH - Sạch, Thơm, Giao Tận Nơi',
  description:
    'Dịch vụ giặt sấy quần áo chuyên nghiệp tại Quận 2 TP.HCM. Máy giặt công nghiệp, sấy khô hoàn toàn. Giao nhận miễn phí. Gọi 0357 358 582.',
  alternates: { canonical: 'https://supersach.vn/dich-vu/giat-say' },
};

export default function GiatSayPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-28 pb-16">
        <div className="container-site">
          <div className="max-w-2xl">
            <div className="badge mb-4" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              Dịch vụ giặt sấy quần áo
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Giặt Sấy Quần Áo Quận 2
              <br />
              <span className="text-cyan-300">Nhanh — Sạch — Giao Tận Nơi</span>
            </h1>
            <p className="text-sky-100 text-lg mb-8">
              Quần áo được giặt bằng máy công nghiệp, sấy khô hoàn toàn. Không phai màu, không co rút, thơm tho cả tuần.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://zalo.me/0357358582" className="btn-primary" style={{ background: 'white', color: '#0369a1' }}>
                <Phone className="w-5 h-5" /> Gọi ngay đặt lịch
              </a>
              <a href="https://zalo.me/0357358582" target="_blank" rel="noopener noreferrer" className="btn-zalo">
                <MessageCircle className="w-5 h-5" /> Nhắn Zalo
              </a>
            </div>
          </div>
        </div>
        <div className="wave-divider mt-10">
          <svg viewBox="0 0 1440 40" fill="white" className="w-full">
            <path d="M0,20 C360,0 1080,40 1440,10 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Tại Sao Chọn SUPER SẠCH Cho Giặt Sấy?
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Chúng tôi sử dụng máy giặt công nghiệp <strong>10-15kg</strong> với chế độ giặt phù hợp từng loại vải. Bột giặt và nước xả cao cấp, không gây dị ứng da nhạy cảm hay trẻ em.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Phân loại đồ theo màu (sáng/tối) trước khi giặt',
                  'Kiểm tra túi, cúc, dây kéo trước khi cho vào máy',
                  'Chế độ giặt nhẹ cho đồ delicate, mạnh cho đồ lao động',
                  'Sấy ở nhiệt độ phù hợp, không co rút vải',
                  'Gấp gọn, đóng túi ni-lông sạch',
                  'Nhắn tin Zalo khi đồ hoàn thành',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200">
                <div className="flex items-center gap-2 mb-3">
                  <Shirt className="w-5 h-5 text-sky-600" />
                  <span className="font-bold text-sky-700">Bảng giá giặt sấy</span>
                </div>
                <p className="text-sm text-slate-500 mb-3">Vui lòng liên hệ qua Zalo để được báo giá chính xác theo số lượng và loại đồ.</p>
                <a
                  href="https://zalo.me/0357358582"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Nhắn Zalo nhận báo giá
                </a>
              </div>
            </div>
            <div className="space-y-5">
              {/* Trust card */}
              <div className="card p-5">
                <h3 className="font-bold text-slate-800 mb-4">Cam Kết Chất Lượng</h3>
                <div className="space-y-3">
                  {[
                    { icon: CheckCircle, text: 'Không hư đồ — đền bù nếu có lỗi từ phía chúng tôi', color: 'text-emerald-500' },
                    { icon: Clock, text: 'Trả đúng hẹn — trả trong 24h hoặc trong ngày (gói nhanh)', color: 'text-sky-500' },
                    { icon: Star, text: 'Sạch 100% — giặt lại miễn phí nếu không hài lòng', color: 'text-amber-500' },
                  ].map((c) => (
                    <div key={c.text} className="flex items-start gap-2.5">
                      <c.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${c.color}`} />
                      <span className="text-sm text-slate-600">{c.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Book form */}
              <div className="card p-5">
                <h3 className="font-bold text-slate-800 mb-4">Đặt Lịch Nhanh</h3>
                <div className="space-y-3">
                  <a href="https://zalo.me/0357358582" className="btn-primary w-full justify-center">
                    <Phone className="w-4 h-4" /> Gọi: 0357 358 582
                  </a>
                  <a href="https://zalo.me/0357358582" target="_blank" rel="noopener noreferrer" className="btn-zalo w-full justify-center">
                    <MessageCircle className="w-4 h-4" /> Nhắn Zalo đặt lịch
                  </a>
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Mở 7:00 – 21:30, tất cả các ngày
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section-py bg-slate-50 border-t border-slate-100">
        <div className="container-site">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Dịch Vụ Liên Quan</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Giặt Hấp Cao Cấp', href: '/dich-vu/giat-hap', desc: 'Vest, sơ mi, váy đầm' },
              { title: 'Vệ Sinh Giày', href: '/dich-vu/ve-sinh-giay', desc: 'Sneaker, da, vải' },
            ].map((r) => (
              <Link key={r.href} href={r.href} className="card p-4 hover:shadow-md transition-shadow group">
                <h3 className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors mb-1">{r.title}</h3>
                <p className="text-sm text-slate-400">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="h-16 md:h-0" />
    </>
  );
}
