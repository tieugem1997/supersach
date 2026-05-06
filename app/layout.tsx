import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tra Cứu Đơn Hàng - Giặt Sấy Super Sạch",
  description:
    "Tra cứu trạng thái đơn giặt sấy của bạn tại Giặt Sấy Super Sạch - 105 Đường 39, Phường Bình Trưng, TP. Hồ Chí Minh",
  keywords: "giặt sấy, tra cứu đơn hàng, super sạch, bình trưng",
  openGraph: {
    title: "Tra Cứu Đơn Hàng - Giặt Sấy Super Sạch",
    description: "Tra cứu trạng thái đơn giặt sấy của bạn",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
