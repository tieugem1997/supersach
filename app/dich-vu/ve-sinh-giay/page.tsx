import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Phone, MessageCircle, Clock, Footprints } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vệ Sinh Giày Quận 2 | SUPER SẠCH - Sneaker, Da, Vải - Sạch Như Mới',
  description:
    'Vệ sinh giày chuyên nghiệp tại Quận 2 TP.HCM. Sneaker, giày da, giày vải. Trắng sáng như mới. Giao nhận tận nơi. Gọi 0357 358 582.',
  alternates: { canonical: 'https://supersach.vn/dich-vu/ve-sinh-giay' },
};

export default function VeSinhGiayPage() {
  return (
    <>
      <section className="hero-gradient pt-28 pb-16">
        <div className="container-site">
          <div className="max-w-2xl">
            <div className="badge mb-4" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              Dịch vụ vệ sinh giày
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Vệ Sinh Giày Quận 2
              <br />
              <span className="text-cyan-300">Trắng Sáng Như Mới</span>
            </h1>
            <p className="text-sky-100 text-lg mb-8">
              Sneaker, giày da, giày vải — chúng tôi phục hồi màu sắc và vẻ đẹp ban đầu. Không hư chất liệu, không bạc màu.
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

      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Quy Trình Vệ Sinh Giày Chuyên Nghiệp
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Không phải chỉ là rửa giày — chúng tôi áp dụng quy trình chuyên nghiệp 6 bước để phục hồi toàn diện cho đôi giày của bạn.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { step: '01', title: 'Kiểm tra & đánh giá', desc: 'Xác định chất liệu, mức độ bẩn, vết ố để chọn phương pháp phù hợp.' },
                  { step: '02', title: 'Tháo dây giày', desc: 'Tháo và giặt riêng dây giày, đảm bảo trắng đều.' },
                  { step: '03', title: 'Vệ sinh bề mặt', desc: 'Dùng hóa chất chuyên dụng làm sạch toàn bộ bề mặt giày.' },
                  { step: '04', title: 'Tẩy đế & viền', desc: 'Tẩy sạch đế và viền midsole, phục hồi màu trắng ban đầu.' },
                  { step: '05', title: 'Khử mùi & diệt khuẩn', desc: 'Xử lý mùi hôi bên trong, diệt vi khuẩn gây hại.' },
                  { step: '06', title: 'Đánh bóng & bảo quản', desc: 'Đánh bóng (với giày da), bọc giấy bảo quản, đóng gói cẩn thận.' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-black flex-shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700 text-sm">{s.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                  <Footprints className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-amber-700">Bảng giá vệ sinh giày</span>
                </div>
                <p className="text-sm text-slate-500 mb-3">Vui lòng gửi ảnh giày qua Zalo để được báo giá chính xác theo loại và tình trạng.</p>
                <a
                  href="https://zalo.me/0357358582"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Gửi ảnh nhận báo giá
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <div className="card p-5">
                <h3 className="font-bold text-slate-800 mb-4">Chúng Tôi Làm Được Với</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Nike', 'Adidas', 'Converse', 'Vans', 'Jordan', 'Yeezy', 'New Balance', 'Puma', 'Reebok', 'Off-White', 'Balenciaga', 'Gucci'].map((brand) => (
                    <div key={brand} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      {brand}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-5">
                <h3 className="font-bold text-slate-800 mb-4">Đặt Lịch Vệ Sinh Giày</h3>
                <div className="space-y-3">
                  <a href="https://zalo.me/0357358582" className="btn-primary w-full justify-center">
                    <Phone className="w-4 h-4" /> Gọi: 0357 358 582
                  </a>
                  <a href="https://zalo.me/0357358582" target="_blank" rel="noopener noreferrer" className="btn-zalo w-full justify-center">
                    <MessageCircle className="w-4 h-4" /> Gửi ảnh giày qua Zalo
                  </a>
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Gửi ảnh giày qua Zalo để báo giá nhanh nhất
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="h-16 md:h-0" />
    </>
  );
}
