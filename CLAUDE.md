# CLAUDE.md — Giặt Sấy SUPER SẠCH Website

## Tổng quan dự án
Website marketing SEO-optimized cho tiệm giặt sấy SUPER SẠCH tại Quận 2, TP.HCM.

## Thông tin doanh nghiệp
- **Tên**: Giặt sấy SUPER SẠCH
- **Địa chỉ**: 105 Đường 39, Phường Bình Trưng, Quận 2, TP.HCM
- **Điện thoại**: 0357 358 582
- **Zalo**: https://zalo.me/0357358582
- **Google Maps**: https://www.google.com/maps/place/Giặt+sấy+SUPER+SẠCH
- **Giờ mở cửa**: 7:00 - 21:00, Thứ 2 - Chủ Nhật

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)
- **SEO**: next/head metadata, JSON-LD schema
- **Maps**: Google Maps Embed API (no key required for basic embed)

## Màu sắc thương hiệu
- Primary: `#0284c7` (sky-600) — xanh dương
- Primary Dark: `#0369a1` (sky-700)
- Primary Light: `#e0f2fe` (sky-100)
- Accent: `#06b6d4` (cyan-500) — tươi sáng
- Success: `#10b981` (emerald-500) — tin cậy
- White: `#ffffff`
- Text: `#0f172a` (slate-900)
- Muted: `#64748b` (slate-500)

## Cấu trúc trang
```
/                   → Trang chủ (Home)
/gioi-thieu         → Giới thiệu
/dich-vu            → Dịch vụ (overview)
/dich-vu/giat-say   → Giặt sấy quần áo
/dich-vu/giat-hap   → Giặt hấp cao cấp
/dich-vu/ve-sinh-giay → Vệ sinh giày
/dich-vu/giao-nhan  → Giao nhận tận nơi
/bang-gia           → Bảng giá
/blog               → Blog SEO
/lien-he            → Liên hệ
```

## Dịch vụ & Bảng giá
| Dịch vụ | Giá | Ghi chú |
|---------|-----|---------|
| Giặt sấy thường | 15.000đ/kg | Tối thiểu 3kg |
| Giặt sấy nhanh | 25.000đ/kg | Trả trong ngày |
| Giặt hấp sơ mi/áo | 35.000đ/cái | |
| Giặt hấp vest/áo khoác | 80.000đ/cái | |
| Giặt hấp váy/đầm | 60.000đ/cái | |
| Vệ sinh giày thường | 80.000đ/đôi | |
| Vệ sinh giày da cao cấp | 150.000đ/đôi | |
| Giao nhận | Miễn phí | Đơn từ 100k, nội Quận 2 |

## Khu vực phục vụ
- Quận 2 (chính): Bình Trưng, An Phú, Thảo Điền, Bình An, Cát Lái
- Quận 9 / TP. Thủ Đức (giao nhận)
- Bình Thạnh (giao nhận)

## Từ khóa SEO mục tiêu
**Từ khóa chính:**
- giặt sấy quận 2
- tiệm giặt sấy quận 2
- giặt ủi gần đây quận 2

**Từ khóa phụ:**
- vệ sinh giày quận 2
- giặt hấp cao cấp tphcm
- giặt sấy giao nhận tận nơi
- giặt sấy thảo điền
- giặt sấy an phú quận 2
- giặt sấy bình trưng

## Cấu trúc Schema.org
```json
{
  "@type": "LaundryOrDryCleaning",
  "name": "Giặt Sấy SUPER SẠCH",
  "telephone": "+84357358582",
  "address": "105 Đường 39, Phường Bình Trưng, Quận 2, TP.HCM",
  "geo": { "latitude": 10.7838223, "longitude": 106.7679222 },
  "openingHours": "Mo-Su 07:00-21:00",
  "priceRange": "$$"
}
```

## Sections trang chủ (theo thứ tự)
1. **Header** — Logo, Nav, CTA "Gọi ngay"
2. **Hero** — Headline, subtitle, 2 CTA buttons, trust badges
3. **TrustBar** — Thống kê: 500+ khách, 5 năm, 4.9★ Google, 24h giao
4. **Services** — 4 dịch vụ với icon + mô tả + link
5. **Process** — 4 bước: Đặt lịch → Nhận đồ → Giặt sạch → Giao tận nhà
6. **Pricing** — Bảng giá đơn giản, rõ ràng
7. **Reviews** — 6 đánh giá Google (5 sao)
8. **WhyUs** — 6 điểm cam kết: sạch, nhanh, không hư hại, uy tín, bảo mật
9. **ServiceAreas** — Khu vực phục vụ với map
10. **CTASection** — Kêu gọi đặt lịch mạnh
11. **Contact** — Google Maps embed + form liên hệ + thông tin
12. **Footer** — Links, địa chỉ, giờ mở cửa

## SEO Checklist
- [x] Meta title format: "[Từ khóa] | Giặt Sấy SUPER SẠCH - Quận 2 TP.HCM"
- [x] Meta description 150-160 ký tự, có CTA
- [x] H1 duy nhất per page, chứa từ khóa chính
- [x] H2, H3 cấu trúc hợp lý
- [x] Alt text cho tất cả ảnh
- [x] URL slug tiếng Việt không dấu
- [x] JSON-LD LocalBusiness schema
- [x] Canonical URL
- [x] Open Graph tags
- [x] Sitemap.xml
- [x] robots.txt
- [x] Google Maps embed

## Performance
- Tối ưu images với next/image
- Font display: swap
- Preload critical CSS
- Lazy load sections dưới fold
- Target LCP < 2.5s, CLS < 0.1, FID < 100ms

## UX Mobile
- Sticky bottom bar: Gọi ngay + Zalo
- Font size min 16px
- Touch targets min 44px
- Safe area padding cho notch
- No horizontal scroll

## Deployment
- Platform: Vercel (recommended)
- Domain: supersach.vn (suggested)
- Analytics: Google Analytics 4
- Search Console: submit sitemap
