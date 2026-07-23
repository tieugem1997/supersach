import type { Metadata } from 'next';
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Liên Hệ Giặt Sấy SUPER SẠCH | Quận 2 TP.HCM - 0357 358 582',
  description:
    'Liên hệ giặt sấy SUPER SẠCH Quận 2. Địa chỉ: 105 Đường 39, Bình Trưng, Quận 2. Điện thoại: 0357 358 582. Zalo hỗ trợ 24/7. Mở cửa 7:00-21:30.',
  alternates: { canonical: 'https://supersach.vn/lien-he' },
};

export default function LienHePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-28 pb-16">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Liên Hệ Đặt Lịch
          </h1>
          <p className="text-sky-100 text-lg max-w-lg mx-auto">
            Chúng tôi sẵn sàng phục vụ bạn 7 ngày trong tuần, từ 7:00 đến 21:30.
          </p>
        </div>
        <div className="wave-divider mt-10">
          <svg viewBox="0 0 1440 40" fill="white" className="w-full">
            <path d="M0,20 C360,0 1080,40 1440,10 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Thông Tin Liên Hệ</h2>
              <div className="space-y-5">
                {[
                  {
                    icon: Phone,
                    label: 'Điện thoại / Zalo',
                    value: '0357 358 582',
                    link: 'https://zalo.me/0357358582',
                    desc: 'Gọi hoặc nhắn tin qua Zalo, phản hồi ngay',
                    color: 'sky',
                  },
                  {
                    icon: MessageCircle,
                    label: 'Zalo',
                    value: 'Nhắn tin Zalo',
                    link: 'https://zalo.me/0357358582',
                    desc: 'Hỗ trợ 24/7 qua Zalo',
                    color: 'blue',
                  },
                  {
                    icon: MapPin,
                    label: 'Địa chỉ cửa hàng',
                    value: '105 Đường 39, Phường Bình Trưng, Quận 2, TP.HCM',
                    link: 'https://maps.google.com/?q=105+Đường+39+Bình+Trưng+Quận+2',
                    desc: 'Gần chung cư Bình Trưng, Quận 2',
                    color: 'emerald',
                  },
                  {
                    icon: Clock,
                    label: 'Giờ mở cửa',
                    value: 'Thứ 2 – Chủ Nhật: 7:00 – 21:30',
                    link: null,
                    desc: 'Mở cửa tất cả các ngày trong tuần',
                    color: 'amber',
                  },
                ].map((c) => {
                  const bgMap: Record<string, string> = {
                    sky: 'bg-sky-50 text-sky-600', blue: 'bg-blue-50 text-blue-600',
                    emerald: 'bg-emerald-50 text-emerald-600', amber: 'bg-amber-50 text-amber-600',
                  };
                  return (
                    <div key={c.label} className="flex gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${bgMap[c.color]}`}>
                        <c.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{c.label}</div>
                        {c.link ? (
                          <a href={c.link} className="font-semibold text-slate-800 hover:text-sky-600 transition-colors block">
                            {c.value}
                          </a>
                        ) : (
                          <div className="font-semibold text-slate-800">{c.value}</div>
                        )}
                        <div className="text-sm text-slate-400 mt-0.5">{c.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick CTA */}
              <div className="mt-8 flex gap-3">
                <a href="https://zalo.me/0357358582" className="btn-primary flex-1 justify-center">
                  <Phone className="w-4 h-4" /> Gọi ngay
                </a>
                <a href="https://zalo.me/0357358582" target="_blank" rel="noopener noreferrer" className="btn-zalo flex-1 justify-center">
                  <MessageCircle className="w-4 h-4" /> Zalo
                </a>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Tìm Chúng Tôi Trên Bản Đồ</h2>
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg mb-4" style={{ height: '380px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4!2d106.7653473!3d10.7838223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525004b7e883b%3A0x46d56d7dd3913cc0!2zR2nhurdgIHPhuqV5IFNVUEVSIFJFQ0gg!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ Giặt Sấy SUPER SẠCH"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Gi%E1%BA%B7t+s%E1%BA%A5y+SUPER+S%E1%BA%A0CH+-+Ti%E1%BB%87m+gi%E1%BA%B7t+s%E1%BA%A5y+-+V%E1%BB%87+sinh+gi%C3%A0y+Super+S%E1%BA%A1ch+-+Gi%E1%BA%B7t+h%E1%BA%A5p+-+Qu%E1%BA%ADn+2+-+Giao+nh%E1%BA%ADn+t%E1%BA%ADn+n%C6%A1i/@10.7750185,106.7588497,15z/data=!4m6!3m5!1s0x317525004b7e883b:0x46d56d7dd3913cc0!8m2!3d10.7838223!4d106.7679222!16s%2Fg%2F11vww07972?entry=ttu&g_ep=EgoyMDI2MDcyMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium"
              >
                <MapPin className="w-4 h-4 text-sky-500" />
                Xem trên Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="h-16 md:h-0" />
    </>
  );
}
