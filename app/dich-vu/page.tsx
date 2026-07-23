import type { Metadata } from 'next';
import Link from 'next/link';
import { Shirt, Sparkles, Footprints, ShoppingBag, Armchair, Wrench, ChevronRight, CheckCircle, Phone, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dịch Vụ Giặt Sấy Quận 2 | Giặt Hấp, Vệ Sinh Giày, Túi Xách, Nệm Rèm | SUPER SẠCH',
  description:
    'Giặt sấy quần áo, giặt hấp cao cấp, vệ sinh giày, túi xách, sofa nệm rèm, sửa giày, giặt chăn ga gối tại Quận 2 TP.HCM. SUPER SẠCH - Uy tín 5 năm. Gọi 0357 358 582.',
  alternates: { canonical: 'https://supersach.vn/dich-vu' },
};

const services = [
  {
    icon: Shirt,
    title: 'Giặt Sấy Quần Áo',
    slug: 'giat-say',
    keyword: 'giặt sấy quận 2',
    desc: 'Giặt máy công nghiệp hiện đại, sấy khô hoàn toàn. Quần áo sạch, thơm, không nhăn. Phù hợp cho cả gia đình.',
    features: [
      'Phân loại màu sắc trước khi giặt',
      'Máy giặt công nghiệp 10-15kg',
      'Bột giặt & nước xả cao cấp',
      'Sấy khô 100%, gấp gọn',
      'Tối thiểu 3kg/lần',
    ],
    price: 'Liên hệ',
    bg: 'bg-sky-50',
    iconBg: 'bg-sky-100 text-sky-600',
    border: 'border-sky-200',
  },
  {
    icon: Sparkles,
    title: 'Giặt Hấp Cao Cấp',
    slug: 'giat-hap',
    keyword: 'giặt hấp cao cấp tphcm',
    desc: 'Công nghệ hấp hơi nước kết hợp giặt khô chuyên nghiệp. An toàn với lụa, len, cashmere, vest công sở.',
    features: [
      'Hấp hơi nước 160°C diệt khuẩn',
      'Phẳng phiu không cần là thêm',
      'An toàn mọi chất liệu cao cấp',
      'Vest, sơ mi, váy đầm, áo dài',
      'Bảo tồn màu sắc & form dáng',
    ],
    price: 'Liên hệ',
    bg: 'bg-violet-50',
    iconBg: 'bg-violet-100 text-violet-600',
    border: 'border-violet-200',
  },
  {
    icon: Footprints,
    title: 'Vệ Sinh Giày',
    slug: 've-sinh-giay',
    keyword: 'vệ sinh giày quận 2',
    desc: 'Vệ sinh chuyên sâu, phục hồi màu sắc và độ bền cho giày sneaker, da, vải. Trắng sáng như mới mua.',
    features: [
      'Vệ sinh toàn bộ bề mặt & đế',
      'Tẩy vết ố vàng, bẩn cứng đầu',
      'Phục hồi màu sắc, khử mùi',
      'Đánh bóng da, chống nấm mốc',
      'Đóng gói bảo quản sau khi vệ sinh',
    ],
    price: 'Liên hệ',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100 text-amber-600',
    border: 'border-amber-200',
  },
  {
    icon: ShoppingBag,
    title: 'Vệ Sinh Túi Xách',
    slug: 've-sinh-giay',
    keyword: 'vệ sinh túi xách quận 2',
    desc: 'Vệ sinh chuyên sâu, phục hồi màu sắc, xử lý vết bẩn cho túi xách hàng hiệu. An toàn với da, da lộn, vải canvas.',
    features: [
      'Làm sạch chuyên sâu từng chi tiết',
      'Phục hồi màu & chống thấm',
      'Bảo quản form dáng túi',
    ],
    price: 'Liên hệ',
    bg: 'bg-rose-50',
    iconBg: 'bg-rose-100 text-rose-600',
    border: 'border-rose-200',
  },
  {
    icon: Armchair,
    title: 'Vệ Sinh Nệm, Rèm, Thảm',
    slug: 'giat-say',
    keyword: 'vệ sinh nệm rèm thảm quận 2',
    desc: 'Giặt khô & hơi nước nóng cho nệm, rèm cửa, thảm. Loại bỏ bụi mịn, vi khuẩn và mạt bụi. An toàn cho gia đình và trẻ nhỏ.',
    features: [
      'Hơi nước nóng diệt khuẩn',
      'Không hóa chất độc hại',
      'Khô nhanh trong 2-4 giờ',
    ],
    price: 'Liên hệ',
    bg: 'bg-teal-50',
    iconBg: 'bg-teal-100 text-teal-600',
    border: 'border-teal-200',
  },
  {
    icon: Wrench,
    title: 'Sửa Chữa & Phục Hồi Giày',
    slug: 've-sinh-giay',
    keyword: 'sửa chữa giày quận 2',
    desc: 'Thay đế giày bị mòn, đánh bóng lại da, sơn phục hồi bề mặt sneaker. Giày cũ thành mới, tiết kiệm chi phí mua giày mới.',
    features: [
      'Thay đế & gia cố đế',
      'Đánh bóng & phục hồi da',
      'Sơn lại bề mặt sneaker',
    ],
    price: 'Liên hệ',
    bg: 'bg-orange-50',
    iconBg: 'bg-orange-100 text-orange-600',
    border: 'border-orange-200',
  },
  {
    icon: Shirt,
    title: 'Giặt Chăn Ga Gối',
    slug: 'giat-say',
    keyword: 'giặt chăn ga gối quận 2',
    desc: 'Giặt sấy chuyên dụng cho chăn, ga, gối, mền. Sấy khô hoàn toàn, diệt khuẩn ở nhiệt độ cao. Phù hợp mọi chất liệu cotton, lụa, lông vũ.',
    features: [
      'Giặt riêng từng bộ',
      'Sấy khô diệt khuẩn 60°C',
      'Gấp gọn, đóng túi sạch',
    ],
    price: 'Liên hệ',
    bg: 'bg-indigo-50',
    iconBg: 'bg-indigo-100 text-indigo-600',
    border: 'border-indigo-200',
  },
];

export default function DichVuPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-28 pb-16">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Dịch Vụ Giặt Sấy Quận 2
          </h1>
          <p className="text-sky-100 text-lg max-w-xl mx-auto mb-6">
            Từ giặt sấy thường ngày đến đồ cao cấp — SUPER SẠCH chăm sóc tất cả với chất lượng chuyên nghiệp.
          </p>
          <a href="https://zalo.me/0357358582" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-sky-700 font-bold hover:bg-sky-50 transition-all shadow-lg">
            <Phone className="w-5 h-5" />
            Gọi ngay tư vấn
          </a>
        </div>
        <div className="wave-divider mt-10">
          <svg viewBox="0 0 1440 40" fill="white" className="w-full">
            <path d="M0,20 C360,0 1080,40 1440,10 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      {/* Services */}
      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc) => (
              <div key={svc.slug} className={`card border ${svc.border} hover:shadow-lg transition-shadow`}>
                <div className={`${svc.bg} p-6`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${svc.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <svc.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">{svc.title}</h2>
                      <div className="text-sm font-bold text-slate-600 mt-0.5">{svc.price}</div>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-5">{svc.desc}</p>
                  <ul className="space-y-2 mb-5">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/dich-vu/${svc.slug}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-sm text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    Xem chi tiết <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-sky-50 border-t border-sky-100">
        <div className="container-site text-center">
          <h2 className="section-title mb-4">Sẵn Sàng Đặt Lịch?</h2>
          <p className="section-subtitle mb-8 max-w-lg mx-auto">
            Liên hệ ngay để được tư vấn dịch vụ phù hợp và nhận báo giá chính xác.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://zalo.me/0357358582" className="btn-primary">
              <Phone className="w-5 h-5" /> Gọi: 0357 358 582
            </a>
            <a href="https://zalo.me/0357358582" target="_blank" rel="noopener noreferrer" className="btn-zalo">
              <MessageCircle className="w-5 h-5" /> Nhắn Zalo
            </a>
          </div>
        </div>
      </section>
      <div className="h-16 md:h-0" />
    </>
  );
}
