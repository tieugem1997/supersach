import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Giặt Sấy Quận 2 | SUPER SẠCH - Nhanh · Sạch · Giao Tận Nơi',
  description:
    'Tiệm giặt sấy SUPER SẠCH Quận 2 TP.HCM. Chuyên giặt sấy, giặt hấp cao cấp, vệ sinh giày. Giao nhận tận nơi miễn phí nội Quận 2. Mở 7:00–21:30 hàng ngày. Gọi ngay 0357 358 582.',
};

export default function Page() {
  return <HomeClient />;
}
