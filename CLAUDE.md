# Giặt Sấy Super Sạch - Tra Cứu Đơn Hàng

## Mô Tả Dự Án

Trang web tra cứu đơn hàng cho tiệm giặt sấy **Super Sạch** tại 105 đường 39, Phường Bình Trưng, TP. Hồ Chí Minh.

Khách hàng có thể tra cứu đơn hàng của mình trong 30 ngày gần nhất bằng cách nhập:
- **Tên** của mình
- **3 số cuối** số điện thoại

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Icons**: Lucide React
- **Deployment**: Vercel

---

## Dữ Liệu Nguồn

### Google Sheets
- **Spreadsheet ID**: `1kOASpXxcn7XxUmuF_xV4VBz5QsgHDnmS9iAMxjcxqHs`
- **Sheet Đơn Hàng** (GID: `937436438`): Chứa thông tin đơn hàng
- **Sheet Khách Hàng** (GID: `800893288`): Chứa thông tin khách hàng

### ⚠️ Yêu Cầu Quan Trọng - Publish Google Sheets

Để trang web hoạt động, cần **public** Google Sheets:
1. Mở Google Sheets → Click **File** → **Share** → **Share with others**
2. Chọn **Anyone with the link** → **Viewer**
3. Hoặc: **File** → **Publish to web** → chọn từng sheet → **Publish**

### Cấu Trúc Dữ Liệu (Dự Kiến)

**Sheet Đơn Hàng:**
| Cột | Mô tả |
|-----|--------|
| Tên khách | Mã khách hàng (Khách ID) |
| Thời gian nhận | Ngày giờ nhận đồ |
| Trạng thái | Trạng thái đơn hàng |
| Tổng cộng | Tổng tiền đơn hàng |

**Sheet Khách Hàng:**
| Cột | Mô tả |
|-----|--------|
| Khách ID | Mã định danh khách hàng |
| Tên | Tên khách hàng |
| Số điện thoại | Số điện thoại (dùng để tra cứu) |

---

## Luồng Tra Cứu

1. Khách nhập **tên** + **3 số cuối SĐT**
2. Hệ thống tìm khách hàng trong Sheet Khách Hàng theo SĐT kết thúc bằng 3 số cuối
3. Lấy **Khách ID** tương ứng
4. Tìm đơn hàng trong Sheet Đơn Hàng theo Khách ID và lọc 30 ngày gần nhất
5. Sắp xếp theo thời gian giảm dần
6. Hiển thị kết quả hoặc thông báo không có đơn

---

## Design System

### Màu sắc
- **Primary Blue**: `#0284c7` (sky-600)
- **Accent Teal**: `#0d9488` (teal-600)
- **Background**: `#f0f9ff` (sky-50)
- **White**: `#ffffff`
- **Text**: `#0f172a` (slate-900)
- **Muted**: `#64748b` (slate-500)

### Status Badges
- Đang giặt / Đang xử lý → Blue
- Sẵn sàng nhận / Hoàn thành → Green
- Đã nhận → Gray
- Đã hủy → Red

---

## Thông Tin Tiệm

- **Tên**: Giặt Sấy Super Sạch
- **Địa chỉ**: 105 Đường 39, Phường Bình Trưng, TP. Hồ Chí Minh
- **Zalo hỗ trợ**: 0357 358 582

---

## Cấu Trúc Project

```
giat-say-super-sach/
├── app/
│   ├── layout.tsx
│   ├── page.tsx          # Trang tra cứu chính
│   ├── globals.css
│   └── api/
│       └── orders/
│           └── route.ts  # API fetch & xử lý Google Sheets
├── components/
│   ├── SearchForm.tsx
│   ├── OrderCard.tsx
│   └── StatusBadge.tsx
├── CLAUDE.md
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## Môi Trường

```env
NEXT_PUBLIC_SITE_URL=https://supersach.vercel.app
```

---

*Last updated: 2026-05-03*
