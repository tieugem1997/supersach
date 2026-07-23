import type { Metadata } from 'next';
import { CheckCircle, Phone, MessageCircle, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bảng Giá Giặt Sấy Quận 2 | SUPER SẠCH - Giá Rõ Ràng, Không Phát Sinh',
  description:
    'Bảng giá giặt sấy, giặt hấp, vệ sinh giày tại SUPER SẠCH Quận 2 TP.HCM. Từ 12.000đ/kg. Giá niêm yết, không phát sinh. Giao nhận miễn phí.',
  alternates: { canonical: 'https://supersach.vn/bang-gia' },
};

const pricingTable = [
  {
    category: 'Giặt Sấy Quần Áo',
    color: 'sky',
    items: [
      { name: 'Giặt sấy thường', price: '12.000đ/kg', note: 'Tối thiểu 3kg' },
      { name: 'Giặt sấy nhanh (trả trong ngày)', price: '25.000đ/kg', note: 'Đặt trước 8:00 sáng' },
      { name: 'Giặt chăn mỏng', price: '50.000đ/cái', note: 'Dưới 2kg' },
      { name: 'Giặt chăn bông dày', price: '80.000đ/cái', note: '2-3kg' },
      { name: 'Giặt gối', price: '20.000đ/cái', note: 'Bao gối' },
      { name: 'Giặt thú nhồi bông nhỏ', price: '30.000đ/cái', note: 'Dưới 500g' },
    ],
  },
  {
    category: 'Giặt Hấp Cao Cấp',
    color: 'violet',
    items: [
      { name: 'Áo sơ mi / áo blouse', price: '35.000đ/cái', note: '' },
      { name: 'Áo vest / blazer', price: '80.000đ/cái', note: 'Cả bộ 140.000đ' },
      { name: 'Quần âu / quần tây', price: '50.000đ/cái', note: '' },
      { name: 'Váy ngắn / đầm ngắn', price: '50.000đ/cái', note: '' },
      { name: 'Váy dài / đầm dạ hội', price: '80.000đ/cái', note: 'Tùy độ phức tạp' },
      { name: 'Áo dài', price: '60.000đ/bộ', note: 'Áo + quần' },
      { name: 'Áo khoác / măng tô', price: '100.000đ/cái', note: '' },
    ],
  },
  {
    category: 'Vệ Sinh Giày',
    color: 'amber',
    items: [
      { name: 'Giày vải / canvas thường', price: '80.000đ/đôi', note: '' },
      { name: 'Giày sneaker phổ thông', price: '100.000đ/đôi', note: 'Nike, Adidas...' },
      { name: 'Giày sneaker cao cấp', price: '150.000đ/đôi', note: 'Jordan, Yeezy, Off-white...' },
      { name: 'Giày da / da lộn', price: '120.000đ/đôi', note: '' },
      { name: 'Boot / giày cao cổ', price: '130.000đ/đôi', note: '' },
      { name: 'Dép sandal', price: '50.000đ/đôi', note: '' },
      { name: 'Khử mùi đặc biệt', price: '+30.000đ', note: 'Phụ phí khi có mùi nặng' },
    ],
  },
  {
    category: 'Giao Nhận',
    color: 'emerald',
    items: [
      { name: 'Giao nhận nội Quận 2', price: 'Miễn phí', note: 'Đơn từ 100.000đ' },
      { name: 'Giao nhận TP. Thủ Đức', price: '20.000đ', note: '2 chiều' },
      { name: 'Giao nhận Bình Thạnh, Q.1', price: '30.000đ', note: '2 chiều' },
      { name: 'Giao nhận khu vực khác', price: 'Liên hệ', note: 'Tùy khoảng cách' },
    ],
  },
];

const colorMap: Record<string, { header: string; badge: string; check: string }> = {
  sky: { header: 'bg-sky-600', badge: 'bg-sky-100 text-sky-700', check: 'text-sky-500' },
  violet: { header: 'bg-violet-600', badge: 'bg-violet-100 text-violet-700', check: 'text-violet-500' },
  amber: { header: 'bg-amber-500', badge: 'bg-amber-100 text-amber-700', check: 'text-amber-500' },
  emerald: { header: 'bg-emerald-600', badge: 'bg-emerald-100 text-emerald-700', check: 'text-emerald-500' },
};

export default function BangGiaPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-28 pb-16">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Bảng Giá Giặt Sấy Quận 2
          </h1>
          <p className="text-sky-100 text-lg max-w-xl mx-auto">
            Giá niêm yết rõ ràng, báo giá chính xác trước khi nhận đồ. Không phát sinh phụ phí ẩn.
          </p>
        </div>
        <div className="wave-divider mt-10">
          <svg viewBox="0 0 1440 40" fill="white" className="w-full">
            <path d="M0,20 C360,0 1080,40 1440,10 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      {/* Price tables */}
      <section className="section-py bg-white">
        <div className="container-site">
          {/* Notice */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-sky-50 border border-sky-200 mb-10">
            <Info className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-sky-700">
              <strong>Lưu ý:</strong> Giá trên là giá tham khảo. Giá thực tế có thể thay đổi tùy chất liệu, mức độ bẩn và kích thước.
              Chúng tôi sẽ báo giá chính xác khi nhận đồ. Cam kết không phát sinh thêm nếu đã đồng ý giá.
            </div>
          </div>

          <div className="space-y-8">
            {pricingTable.map((table) => {
              const c = colorMap[table.color];
              return (
                <div key={table.category} className="card overflow-hidden">
                  <div className={`${c.header} px-6 py-4`}>
                    <h2 className="text-white font-bold text-lg">{table.category}</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600">Dịch vụ</th>
                          <th className="text-right px-6 py-3 text-sm font-semibold text-slate-600">Giá</th>
                          <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600 hidden md:table-cell">Ghi chú</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {table.items.map((item) => (
                          <tr key={item.name} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <CheckCircle className={`w-4 h-4 ${c.check} flex-shrink-0`} />
                                <span className="text-sm font-medium text-slate-700">{item.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`text-sm font-bold px-3 py-1 rounded-full ${c.badge}`}>
                                {item.price}
                              </span>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                              {item.note && (
                                <span className="text-xs text-slate-400">{item.note}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-sky-50 border-t border-sky-100">
        <div className="container-site text-center">
          <h2 className="section-title mb-4">Cần Báo Giá Chi Tiết Hơn?</h2>
          <p className="section-subtitle mb-8 max-w-lg mx-auto">
            Liên hệ ngay để được tư vấn và báo giá chính xác cho nhu cầu của bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://zalo.me/0357358582" className="btn-primary">
              <Phone className="w-5 h-5" /> Gọi: 0357 358 582
            </a>
            <a href="https://zalo.me/0357358582" target="_blank" rel="noopener noreferrer" className="btn-zalo">
              <MessageCircle className="w-5 h-5" /> Nhắn Zalo hỏi giá
            </a>
          </div>
        </div>
      </section>
      <div className="h-16 md:h-0" />
    </>
  );
}
