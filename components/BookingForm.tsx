'use client';

import { MessageCircle } from 'lucide-react';

export default function BookingForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.open('https://zalo.me/0357358582', '_blank');
      }}
      className="space-y-4"
    >
      <div>
        <label className="text-sm font-medium text-slate-700 block mb-1.5">Họ tên</label>
        <input
          type="text"
          placeholder="Nguyễn Văn A"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 block mb-1.5">Số điện thoại</label>
        <input
          type="tel"
          placeholder="0357 358 582"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 block mb-1.5">Dịch vụ cần</label>
        <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all bg-white">
          <option>Giặt sấy quần áo</option>
          <option>Giặt hấp cao cấp</option>
          <option>Vệ sinh giày</option>
          <option>Giao nhận tận nơi</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 block mb-1.5">Địa chỉ nhận đồ</label>
        <input
          type="text"
          placeholder="Số nhà, đường, phường, quận..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
        />
      </div>
      <button type="submit" className="btn-primary w-full justify-center">
        <MessageCircle className="w-4 h-4" />
        Nhắn Zalo đặt lịch
      </button>
    </form>
  );
}
