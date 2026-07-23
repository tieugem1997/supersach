import type { Metadata } from 'next';
import { CheckCircle, Phone, MessageCircle, MapPin, Clock, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Giặt Sấy Giao Nhận Tận Nơi Quận 2 | SUPER SẠCH - Miễn Phí',
  description:
    'Dịch vụ giao nhận đồ giặt tận nơi tại Quận 2 TP.HCM. Miễn phí giao nhận đơn từ 100.000đ. Đặt lịch qua Zalo, nhân viên đến trong 30 phút.',
  alternates: { canonical: 'https://supersach.vn/dich-vu/giao-nhan' },
};

const areas = [
  { name: 'Bình Trưng Đông', free: true },
  { name: 'Bình Trưng Tây', free: true },
  { name: 'An Phú', free: true },
  { name: 'Thảo Điền', free: true },
  { name: 'Bình An', free: true },
  { name: 'Cát Lái', free: true },
  { name: 'An Khánh', free: true },
  { name: 'Thủ Thiêm', free: true },
  { name: 'TP. Thủ Đức', free: false },
  { name: 'Bình Thạnh', free: false },
  { name: 'Quận 1', free: false },
  { name: 'Quận 9', free: false },
];

export default function GiaoNhanPage() {
  return (
    <>
      <section className="hero-gradient pt-28 pb-16">
        <div className="container-site">
          <div className="max-w-2xl">
            <div className="badge mb-4" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              Giao nhận tận nơi
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Giao Nhận Đồ Giặt Tận Nơi
              <br />
              <span className="text-cyan-300">Miễn Phí — Nhanh 30 Phút</span>
            </h1>
            <p className="text-sky-100 text-lg mb-8">
              Không cần ra khỏi nhà. Đặt lịch → chúng tôi đến lấy → giặt xong giao lại tận cửa. Miễn phí nội Quận 2 từ 100.000đ.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://zalo.me/0357358582" className="btn-primary" style={{ background: 'white', color: '#0369a1' }}>
                <Phone className="w-5 h-5" /> Đặt lịch ngay
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
                Quy Trình Giao Nhận Đơn Giản
              </h2>
              <div className="space-y-5 mb-8">
                {[
                  {
                    num: '1',
                    title: 'Đặt lịch qua Zalo hoặc điện thoại',
                    desc: 'Báo địa chỉ, giờ muốn nhận đồ và số lượng ước tính. Chúng tôi xác nhận trong vòng 5 phút.',
                  },
                  {
                    num: '2',
                    title: 'Nhân viên đến trong 30 phút',
                    desc: 'Đội giao nhận đến đúng giờ hẹn. Kiểm đếm đồ, lập biên bản nhận hàng. Đồ được đánh số theo mã khách.',
                  },
                  {
                    num: '3',
                    title: 'Giặt sạch & thông báo',
                    desc: 'Sau khi giặt xong, chúng tôi nhắn Zalo thông báo và hẹn giờ giao lại cho bạn.',
                  },
                  {
                    num: '4',
                    title: 'Giao đồ, thanh toán khi nhận',
                    desc: 'Thanh toán tiền mặt hoặc chuyển khoản khi nhận đồ. Kiểm tra đồ tại chỗ trước khi thanh toán.',
                  },
                ].map((s) => (
                  <div key={s.num} className="flex gap-4">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-sm flex-shrink-0">
                      {s.num}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">{s.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-emerald-700">Phí giao nhận</span>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    ['Nội Quận 2 (đơn từ 100.000đ)', 'Miễn phí'],
                    ['Nội Quận 2 (đơn dưới 100.000đ)', '15.000đ'],
                    ['TP. Thủ Đức, Quận 9', '20.000đ'],
                    ['Bình Thạnh, Quận 1', '30.000đ'],
                    ['Khu vực khác', 'Liên hệ'],
                  ].map(([area, price]) => (
                    <div key={area} className="flex justify-between">
                      <span className="text-slate-600">{area}</span>
                      <span className={`font-bold ${price === 'Miễn phí' ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="card p-5">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sky-500" />
                  Khu Vực Phục Vụ
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {areas.map((area) => (
                    <div key={area.name} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${area.free ? 'text-emerald-500' : 'text-sky-400'}`} />
                      <span className="text-slate-600">{area.name}</span>
                      {area.free && <span className="text-xs text-emerald-500 font-medium">Free</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-5">
                <h3 className="font-bold text-slate-800 mb-4">Đặt Lịch Ngay</h3>
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
                  Nhân viên đến trong 30 phút sau khi đặt lịch
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
