# Giặt Sấy Super Sạch — Redesign Project

## Mô Tả Dự Án

Trang web tra cứu đơn hàng cho tiệm giặt sấy **Super Sạch** tại 105 Đường 39, Phường Bình Trưng, TP. Hồ Chí Minh.

Khách hàng nhập **tên** + **3 số cuối SĐT** → xem trạng thái đơn trong 30 ngày gần nhất.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + custom CSS
- **Language**: TypeScript (strict mode)
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts via CSS variables)
- **Data**: Google Sheets API + Google Drive API
- **Deployment**: Vercel

---

## Mục Tiêu Redesign (v2.0)

> Mobile-first · Professional · Modern · Fast

---

## ✅ Redesign Checklist

### 🎨 Design System & Global Styles (`globals.css`)
- [x] Thêm Inter font via `@import` CSS
- [x] CSS custom properties cho color palette mở rộng
- [x] Glassmorphism utilities (backdrop-blur, bg-white/60)
- [x] Better scroll behavior & safe-area insets (iPhone notch)
- [x] Smooth animations: fadeInUp, slideDown, pulse, shimmer
- [x] Card hover effects với colored shadows
- [x] Custom scrollbar styles (thin, branded color)

### 📐 Layout (`layout.tsx`)
- [x] Inter font loaded via Google Fonts `<link>`
- [x] Viewport meta với `viewport-fit=cover` (notch support)
- [x] Thematic color trong `<meta name="theme-color">`
- [x] Open Graph image meta tag

### 🦸 Hero Section (trong `page.tsx`)
- [x] Animated gradient background (CSS animation)
- [x] Floating badge với sparkle icon
- [x] Larger, bolder headline với highlight word
- [x] Wave/curve divider giữa hero và search card
- [x] Decorative bubbles animation

### 🔍 Search Form (trong `page.tsx`)
- [x] Card với glassmorphism + strong shadow
- [x] Input labels hiển thị rõ ràng, accessible
- [x] Focus states với branded color ring
- [x] Phone input với visual prefix "0xx xxx x"
- [x] Error alert animation (slide down)
- [x] Search button với gradient + icon + hover lift
- [x] Loading spinner tích hợp button
- [x] Rate limit countdown hiển thị rõ

### 📋 Order Results

#### FeaturedCard (`FeaturedCard.tsx`)
- [x] Status progress tracker (4 bước: Tiếp nhận → Xử lý → Xong → Giao)
- [x] Gradient header responsive hơn
- [x] Animated status emoji
- [x] Image thumbnail với zoom lightbox
- [x] Info rows với icons và color coding
- [x] Responsive spacing mobile/desktop

#### GalleryCard (`GalleryCard.tsx`)
- [x] Wider cards (160px) cho dễ tap
- [x] Service type label
- [x] Better active state animation
- [x] Smooth horizontal scroll snap

#### StatusBadge (`StatusBadge.tsx`)
- [x] Animated pulse dot cho active statuses
- [x] Better color contrast
- [x] Icon + text format

### ❌ Empty & Error States (trong `page.tsx`)
- [x] Customer not found: illustration + better CTA layout
- [x] No orders: friendly message + suggestion
- [x] Idle hints: 3 cards với icon, title, description
- [x] Network error: retry button

### 📱 Mobile UX
- [x] Touch targets tối thiểu 44px (WCAG)
- [x] Sticky bottom Zalo support bar trên mobile
- [x] Horizontal scroll gallery với `scroll-snap`
- [x] Input `inputMode="numeric"` cho phone
- [x] `autoFocus` trên name field
- [x] `autocomplete` attributes đúng
- [x] Tap highlight suppression (-webkit-tap-highlight-color)

### 🏠 Footer (`page.tsx`)
- [x] Dark gradient background
- [x] Logo + brand info
- [x] Links section
- [x] Copyright + address

### ⚡ Performance
- [x] Images lazy-loaded
- [x] No unnecessary re-renders
- [x] CSS animations prefer-reduced-motion support

### 🚀 Deployment
- [x] Git commit với message rõ ràng
- [x] Push lên GitHub (tieugem1997/supersach)
- [x] Vercel auto-deploy sau push

---

## Thông Tin Tiệm

| Field | Value |
|-------|-------|
| Tên | Giặt Sấy Super Sạch |
| Địa chỉ | 105 Đường 39, Phường Bình Trưng, TP. HCM |
| Zalo | 0357 358 582 |
| Zalo Link | https://zalo.me/0357358582 |

---

## Data Sources

| Source | ID |
|--------|-----|
| Google Sheets | `1kOASpXxcn7XxUmuF_xV4VBz5QsgHDnmS9iAMxjcxqHs` |
| Sheet Đơn Hàng | GID `937436438` |
| Sheet Khách Hàng | GID `800893288` |

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#0284c7` | Sky-600, main brand |
| `--color-primary-dark` | `#0369a1` | Hover states |
| `--color-primary-light` | `#e0f2fe` | Backgrounds |
| `--color-accent` | `#0d9488` | Teal-600, secondary |
| `--color-accent-dark` | `#0f766e` | Darker teal |
| `--color-surface` | `#ffffff` | Cards |
| `--color-bg` | `#f0f9ff` | Page bg |
| `--color-text` | `#0f172a` | Headings |
| `--color-muted` | `#64748b` | Subtext |

---

## Project Structure

```
supersach/
├── app/
│   ├── layout.tsx          # Root layout, fonts, meta
│   ├── page.tsx            # Main search page (hero, form, results)
│   ├── globals.css         # Design tokens, animations, utilities
│   └── api/
│       ├── orders/route.ts # Google Sheets lookup
│       └── image/route.ts  # Google Drive image fetch
├── components/
│   ├── FeaturedCard.tsx    # Order detail card with status tracker
│   ├── GalleryCard.tsx     # Horizontal thumbnail card
│   ├── StatusBadge.tsx     # Inline status badge
│   └── OrderCard.tsx       # (Legacy list card)
├── CLAUDE.md               # This file — project spec & checklist
├── TECHNICAL-DOC.md        # API & data architecture docs
└── next.config.ts          # Security headers, image config
```

---

*Last updated: 2026-05-08 — Redesign v2.0*
