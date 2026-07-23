import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

const services = [
  { label: 'Giặt sấy quần áo', href: '/dich-vu/giat-say' },
  { label: 'Giặt hấp cao cấp', href: '/dich-vu/giat-hap' },
  { label: 'Vệ sinh giày', href: '/dich-vu/ve-sinh-giay' },
  { label: 'Giao nhận tận nơi', href: '/dich-vu/giao-nhan' },
];

const quickLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Dịch vụ', href: '/dich-vu' },
  { label: 'Blog', href: '/blog' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-site py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Logo SUPER SẠCH"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-black text-white text-base">SUPER SẠCH</div>
                <div className="text-xs text-slate-400">Giặt sấy chuyên nghiệp</div>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Tiệm giặt sấy uy tín tại Quận 2, TP.HCM. Sạch — Nhanh — An toàn — Giao nhận tận nơi.
            </p>
            <div className="flex gap-3">
              <a
                href="https://zalo.me/0357358582"
                className="flex items-center gap-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                Gọi ngay
              </a>
              <a
                href="https://zalo.me/0357358582"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#0068FF] hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors"
              >
                Zalo
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Dịch vụ</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500 inline-block" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Liên kết</h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500 inline-block" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Thông tin</h3>
            <ul className="space-y-3">
              <li className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">
                  105 Đường 39, Phường Bình Trưng, Quận 2, TP.HCM
                </span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <a href="https://zalo.me/0357358582" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                  0357 358 582
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">Thứ 2 – Chủ Nhật: 7:00 – 21:30</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:supersach.q2@gmail.com" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                  supersach.q2@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Giặt Sấy SUPER SẠCH. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-xs text-slate-500">
            105 Đường 39, Phường Bình Trưng, Quận 2, TP.HCM
          </p>
        </div>
      </div>
    </footer>
  );
}
