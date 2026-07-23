import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Heart, Users, Award, Clock, MapPin, Phone, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Giới Thiệu | Giặt Sấy SUPER SẠCH - Quận 2 TP.HCM',
  description:
    'Tìm hiểu về Giặt Sấy SUPER SẠCH - tiệm giặt sấy uy tín 5 năm tại Quận 2 TP.HCM. Sứ mệnh: mang lại sự sạch sẽ và tiện lợi cho mọi gia đình.',
  alternates: { canonical: 'https://supersach.vn/gioi-thieu' },
};

export default function GioiThieuPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-28 pb-16">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Về Chúng Tôi
          </h1>
          <p className="text-sky-100 text-lg max-w-xl mx-auto">
            5 năm phục vụ hàng trăm gia đình tại Quận 2 — chúng tôi hiểu nỗi khổ của người bận rộn.
          </p>
        </div>
        <div className="wave-divider mt-10">
          <svg viewBox="0 0 1440 40" fill="white" className="w-full">
            <path d="M0,20 C360,0 1080,40 1440,10 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      {/* Story */}
      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge badge-primary mb-4">Câu chuyện của chúng tôi</div>
              <h2 className="section-title mb-6">
                Từ Nỗi Khổ Giặt Tay Đến Thương Hiệu Uy Tín
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Năm 2019, chúng tôi ra đời từ một ý tưởng đơn giản: <strong className="text-slate-800">người Quận 2 xứng đáng có một tiệm giặt sấy chuyên nghiệp</strong> — không chỉ giặt sạch mà còn tiện lợi, đáng tin cậy.
                </p>
                <p>
                  Chúng tôi thấy rõ nỗi khổ của những gia đình bận rộn: hai vợ chồng đi làm, con nhỏ, cuối tuần phải dành cả buổi cho đống quần áo. Với người độc thân hay expat nước ngoài, việc tìm tiệm giặt sấy chất lượng càng khó hơn.
                </p>
                <p>
                  <strong className="text-slate-800">SUPER SẠCH</strong> ra đời để giải quyết đúng vấn đề đó. Từ 10 khách hàng đầu tiên, đến nay chúng tôi phục vụ hơn 500 gia đình mỗi tháng với sự tin tưởng tuyệt đối.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2019', label: 'Năm thành lập', icon: Award },
                { value: '500+', label: 'Khách hàng/tháng', icon: Users },
                { value: '4.9★', label: 'Đánh giá Google', icon: Heart },
                { value: '7/7', label: 'Ngày phục vụ', icon: Clock },
              ].map((s) => (
                <div key={s.label} className="card p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="text-2xl font-black text-sky-600 mb-1">{s.value}</div>
                  <div className="text-sm text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-py bg-sky-50">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="section-title mb-4">Sứ Mệnh & Giá Trị</h2>
            <p className="section-subtitle">Mỗi bộ quần áo chúng tôi giặt đều mang theo cam kết về sự chăm chút và tin cậy.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: CheckCircle,
                title: 'Sạch Tuyệt Đối',
                desc: 'Không chỉ sạch bụi bẩn — chúng tôi diệt khuẩn, khử mùi, bảo vệ sức khỏe gia đình bạn.',
              },
              {
                icon: Heart,
                title: 'Tận Tâm Chăm Sóc',
                desc: 'Mỗi món đồ được xử lý như đồ của chính chúng tôi. Không vội vàng, không qua loa.',
              },
              {
                icon: Award,
                title: 'Uy Tín Dài Lâu',
                desc: '5 năm không mất một khách hàng do lỗi chất lượng. Đó là niềm tự hào lớn nhất.',
              },
              {
                icon: Users,
                title: 'Thân Thiện Tư Vấn',
                desc: 'Tư vấn miễn phí cách giặt, bảo quản từng loại vải. Chúng tôi là bạn đồng hành.',
              },
              {
                icon: Clock,
                title: 'Đúng Hẹn Luôn',
                desc: 'Cam kết giao đúng giờ. Nếu trễ, chúng tôi hoàn lại phí giao nhận.',
              },
              {
                icon: MapPin,
                title: 'Gần Gũi Quận 2',
                desc: 'Hiểu rõ từng con đường Quận 2. Giao nhận nhanh, đúng địa điểm, không nhầm nhà.',
              },
            ].map((v) => (
              <div key={v.title} className="card p-5">
                <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-white border-t border-slate-100">
        <div className="container-site text-center">
          <h2 className="section-title mb-4">Trải Nghiệm Ngay Hôm Nay</h2>
          <p className="section-subtitle mb-8 max-w-lg mx-auto">
            Lần đầu sử dụng? Chúng tôi giảm 10% đơn giặt sấy thường cho khách hàng mới.
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
