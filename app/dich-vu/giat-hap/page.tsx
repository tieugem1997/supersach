import type { Metadata } from 'next';
import { CheckCircle, Phone, MessageCircle, Clock, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Giặt Hấp Cao Cấp Quận 2 | SUPER SẠCH - Vest, Sơ Mi, Váy Đầm',
  description:
    'Giặt hấp cao cấp chuyên nghiệp tại Quận 2 TP.HCM. Vest, áo sơ mi, váy đầm, áo dài. An toàn lụa, len, cashmere. Giao nhận tận nơi.',
  alternates: { canonical: 'https://supersach.vn/dich-vu/giat-hap' },
};

export default function GiatHapPage() {
  return (
    <>
      <section className="hero-gradient pt-28 pb-16">
        <div className="container-site">
          <div className="max-w-2xl">
            <div className="badge mb-4" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              Giặt hấp cao cấp
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Giặt Hấp Cao Cấp Quận 2
              <br />
              <span className="text-cyan-300">Phẳng Mịn — An Toàn Vải Quý</span>
            </h1>
            <p className="text-sky-100 text-lg mb-8">
              Công nghệ hấp hơi nước 160°C kết hợp giặt khô chuyên nghiệp. Phù hợp vest, lụa, len, cashmere — những thứ không thể giặt máy thông thường.
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
                Khi Nào Cần Giặt Hấp?
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Giặt hấp là lựa chọn bắt buộc với những loại đồ mà máy giặt thông thường có thể làm hỏng form dáng, phai màu hoặc co rút.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Vest, blazer, áo khoác công sở — giữ form chuẩn',
                  'Áo sơ mi lụa, cotton cao cấp — không bị nhàu, phai',
                  'Váy đầm dạ hội, váy lụa — bảo toàn kết cấu vải',
                  'Áo dài truyền thống — phẳng phiu, sáng màu',
                  'Đồ len, cashmere, wool — không co rút, không xù',
                  'Đồ hiệu có tag "Dry Clean Only"',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600 list-none">
                    <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-violet-50 border border-violet-200">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  <span className="font-bold text-violet-700">Bảng giá giặt hấp</span>
                </div>
                <p className="text-sm text-slate-500 mb-3">Vui lòng liên hệ qua Zalo để được báo giá chính xác theo loại đồ và số lượng.</p>
                <a
                  href="https://zalo.me/0357358582"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Nhắn Zalo nhận báo giá
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <div className="card p-5">
                <h3 className="font-bold text-slate-800 mb-4">Ưu Điểm Giặt Hấp So Với Giặt Máy</h3>
                <div className="space-y-3">
                  {[
                    { vs: 'Máy giặt thông thường', hap: 'Giặt hấp' },
                  ].map(() => null)}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th className="text-left py-2 font-semibold text-slate-500 text-xs">Tiêu chí</th>
                          <th className="text-center py-2 font-semibold text-slate-400 text-xs">Máy giặt</th>
                          <th className="text-center py-2 font-semibold text-violet-600 text-xs">Giặt hấp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[
                          ['Giữ form dáng', '❌', '✅'],
                          ['An toàn với lụa', '❌', '✅'],
                          ['Không co rút len', '❌', '✅'],
                          ['Phẳng không cần là', '❌', '✅'],
                          ['Diệt khuẩn 100%', '⚠️', '✅'],
                        ].map(([criteria, machine, steam]) => (
                          <tr key={criteria}>
                            <td className="py-2 text-slate-600">{criteria}</td>
                            <td className="py-2 text-center">{machine}</td>
                            <td className="py-2 text-center">{steam}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="card p-5">
                <h3 className="font-bold text-slate-800 mb-4">Đặt Lịch Giặt Hấp</h3>
                <div className="space-y-3">
                  <a href="https://zalo.me/0357358582" className="btn-primary w-full justify-center">
                    <Phone className="w-4 h-4" /> Gọi: 0357 358 582
                  </a>
                  <a href="https://zalo.me/0357358582" target="_blank" rel="noopener noreferrer" className="btn-zalo w-full justify-center">
                    <MessageCircle className="w-4 h-4" /> Nhắn Zalo
                  </a>
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Nhận đồ và giao lại trong 24–48 giờ
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
