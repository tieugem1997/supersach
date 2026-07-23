import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyButtons from '@/components/StickyButtons';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://tieugem1997.github.io/supersach'),
  title: {
    default: 'Giặt Sấy Quận 2 | SUPER SẠCH - Nhanh · Sạch · Giao Tận Nơi',
    template: '%s | Giặt Sấy SUPER SẠCH - Quận 2 TP.HCM',
  },
  description:
    'Tiệm giặt sấy uy tín Quận 2 TP.HCM. Giặt sấy, giặt hấp cao cấp, vệ sinh giày. Giao nhận tận nơi miễn phí. Mở 7:00–21:30. Gọi ngay 0357 358 582.',
  keywords: [
    'giặt sấy quận 2',
    'tiệm giặt sấy quận 2',
    'giặt ủi gần đây',
    'vệ sinh giày quận 2',
    'giặt hấp cao cấp tphcm',
    'giặt sấy giao nhận tận nơi',
    'giặt sấy thảo điền',
    'giặt sấy an phú',
    'super sạch',
  ],
  authors: [{ name: 'Giặt Sấy SUPER SẠCH' }],
  creator: 'Giặt Sấy SUPER SẠCH',
  publisher: 'Giặt Sấy SUPER SẠCH',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://supersach.vn',
    siteName: 'Giặt Sấy SUPER SẠCH',
    title: 'Giặt Sấy Quận 2 | SUPER SẠCH - Nhanh · Sạch · Giao Tận Nơi',
    description:
      'Tiệm giặt sấy uy tín Quận 2 TP.HCM. Giặt sấy, giặt hấp cao cấp, vệ sinh giày. Giao nhận tận nơi miễn phí.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Giặt Sấy SUPER SẠCH - Quận 2 TP.HCM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giặt Sấy Quận 2 | SUPER SẠCH',
    description: 'Tiệm giặt sấy uy tín Quận 2. Giao nhận tận nơi miễn phí.',
  },
  alternates: {
    canonical: 'https://supersach.vn',
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <LocalBusinessSchema />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyButtons />
      </body>
    </html>
  );
}
