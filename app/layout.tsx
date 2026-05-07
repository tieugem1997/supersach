import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tra Cứu Đơn Hàng — Giặt Sấy Super Sạch",
  description:
    "Tra cứu trạng thái đơn giặt sấy của bạn tại Giặt Sấy Super Sạch — 105 Đường 39, Phường Bình Trưng, TP. Hồ Chí Minh. Nhanh chóng, bảo mật, tiện lợi.",
  keywords: "giặt sấy, tra cứu đơn hàng, super sạch, bình trưng, hồ chí minh",
  authors: [{ name: "Giặt Sấy Super Sạch" }],
  openGraph: {
    title: "Tra Cứu Đơn Hàng — Giặt Sấy Super Sạch",
    description: "Tra cứu trạng thái đơn giặt sấy của bạn — nhanh chóng và bảo mật",
    locale: "vi_VN",
    type: "website",
    siteName: "Giặt Sấy Super Sạch",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0284c7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
