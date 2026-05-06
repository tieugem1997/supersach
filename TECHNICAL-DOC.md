# Tài Liệu Kỹ Thuật — Hệ Thống Tra Cứu Đơn Hàng Giặt Sấy Super Sạch

> Tài liệu này dành cho cả người kỹ thuật lẫn không kỹ thuật. Mỗi phần đều có phần giải thích đơn giản trước, chi tiết kỹ thuật sau.

---

## 1. Tổng Quan Hệ Thống

### Dành cho người không kỹ thuật

Đây là một **trang web tra cứu đơn hàng** cho tiệm giặt sấy. Khách hàng vào trang, nhập tên và 3 số cuối điện thoại, hệ thống tự động tìm đơn giặt trong 30 ngày gần nhất và hiển thị trạng thái (đang xử lý, đã xong, v.v.) cùng ảnh đơn hàng nếu có.

Toàn bộ dữ liệu đơn hàng và khách hàng được quản lý trên **Google Sheets** — tiệm chỉ cần cập nhật sheet như bình thường, trang web tự lấy dữ liệu mới.

### Dành cho người kỹ thuật

- **Frontend + Backend**: Next.js 15 (App Router, TypeScript strict)
- **Dữ liệu**: Google Sheets (CSV export, không cần OAuth)
- **Ảnh**: Google Drive (API v3 + thumbnail URL)
- **Deploy**: Vercel (khuyến nghị)
- **Không có database** — dữ liệu đọc từ Sheets, cache trong RAM

---

## 2. Kiến Trúc Hệ Thống

```
Trình duyệt khách hàng
        │
        │ HTTPS
        ▼
┌─────────────────────────────────┐
│         Next.js App (Vercel)    │
│                                 │
│  /               ← Trang chính │
│  /api/orders     ← Tìm đơn     │
│  /api/image      ← Lấy ảnh     │
└────────┬────────────────┬───────┘
         │                │
         ▼                ▼
  Google Sheets      Google Drive
  (dữ liệu đơn)    (ảnh đơn hàng)
```

**Luồng hoạt động:**
1. Khách nhập Tên + 3 số điện thoại → bấm Tra Cứu
2. Trình duyệt gửi yêu cầu đến `/api/orders`
3. Server tải bảng Khách Hàng từ Google Sheets, tìm khớp
4. Nếu khớp → tải bảng Đơn Hàng, lọc 30 ngày, trả về
5. Trình duyệt hiển thị kết quả; nếu có ảnh → gọi `/api/image` để lấy URL ảnh từ Drive

---

## 3. Nguồn Dữ Liệu

### Google Sheets

| Bảng         | GID          | Mục đích                     |
|--------------|--------------|------------------------------|
| Khách hàng   | `800893288`  | Danh sách khách, số điện thoại |
| Đơn hàng     | `937436438`  | Chi tiết từng đơn giặt        |

**Cột quan trọng — Bảng Khách Hàng:**
- `Khách ID` — mã định danh duy nhất
- `Tên khách` — tên đầy đủ
- `Số điện thoại` — số điện thoại (hỗ trợ format 0xxx, +84xxx)

**Cột quan trọng — Bảng Đơn Hàng:**
- `Tên khách` — lưu giá trị `Khách ID` (dùng để join)
- `Thời gian nhận` — format `DD/MM/YYYY HH:mm:ss`
- `Trạng thái` — trạng thái đơn (xem bảng trạng thái bên dưới)
- `Tổng cộng (Total)` — tổng tiền
- `Dịch vụ khách chọn` — loại dịch vụ
- `Đặc điểm/Note` — ghi chú
- `Ảnh đính kèm` — tên file ảnh, format `Nhận hàng_Images/xxx.jpg`

### Google Drive

Folder ảnh: `1tuzB4p2tlObNzby-4YGanWT1dxf4qUI6`

Hệ thống tìm ảnh theo tên file, dùng Google Drive API v3. API key lưu trong biến môi trường `GOOGLE_DRIVE_API_KEY`.

---

## 4. Logic Tìm Kiếm Khách Hàng

### Dành cho người không kỹ thuật

Hệ thống **không so khớp chính xác tuyệt đối** mà dùng logic thông minh hơn:
- Gõ "Tai" → tìm được "Tài", "Tái" (bỏ qua dấu)
- Gõ "Cuong" → tìm được "Cường", "Cuong"
- Gõ "An" → **không** tìm "Danh" hay "Anh" (chặn khớp sai)
- Phải khớp cả Tên **và** 3 số điện thoại mới trả kết quả

### Dành cho người kỹ thuật

**Bước 1 — Lọc theo điện thoại:**
```
normalizePhone(phone).endsWith(trimmedPhone)
```
Bỏ tất cả ký tự `space - . +` rồi so đuôi 3 số.

**Bước 2 — Xác nhận tên (word-boundary + diacritic-insensitive):**
```typescript
// Chuẩn hóa: NFD decompose → bỏ combining marks → đ→d
removeDiacritics(name.toLowerCase())

// Từng "search word" phải khớp đúng 1 word của tên khách:
searchWords.every(sw =>
  customerWords.some(cw => cw === sw || cw.startsWith(sw))
)
```

Ví dụ: tìm "Tai" với số "599"
- `removeDiacritics("Tài")` = "Tai" ✓
- `removeDiacritics("tai")` = `removeDiacritics("tai")` → "tai" === "tai" ✓

Ví dụ: tìm "An" với "Danh"
- `"danh"` không bắt đầu bằng `"an"` (startsWith fail) ✗
- Kết quả: không tìm thấy ✓ (bảo vệ quyền riêng tư)

---

## 5. Trạng Thái Đơn Hàng

| Trạng thái trong sheet      | Hiển thị trên web   | Màu sắc | Ý nghĩa                        |
|-----------------------------|---------------------|---------|-------------------------------|
| Chưa xử lý / Tiếp nhận     | 📥 Chờ xử lý        | Cam     | Đơn mới, chưa giặt            |
| Đang giặt / Đang sấy        | 🫧 Đang xử lý       | Xanh    | Đang giặt                     |
| Đã xử lý                    | ✅ Đã xử lý         | Xanh lá | Xong, có thể đến lấy          |
| Hoàn thành / Sẵn sàng nhận  | ✨ Sẵn sàng nhận    | Xanh lá | Đồ sạch, có thể đến lấy       |
| Đã giao / Đã trả / Hoàn tất | 🎉 Hoàn tất         | Xám     | Đã trả đồ cho khách            |
| Hủy / Từ chối               | ❌ Đã hủy           | Đỏ      | Đơn bị hủy                    |

---

## 6. Bảo Mật (Anti-Scraping)

### Dành cho người không kỹ thuật

Hệ thống được bảo vệ để ngăn người xấu tự động truy vấn hàng loạt nhằm lấy thông tin khách hàng:

1. **Giới hạn số lần thử sai** — Client: 5 lần sai → chặn 10 giây; 10 lần → chặn 15 giây
2. **Giới hạn theo IP (server)** — Tối đa 20 yêu cầu/phút từ cùng 1 địa chỉ IP
3. **Chặn truy cập từ bên ngoài** — Chỉ chấp nhận yêu cầu xuất phát từ chính trang web, không cho gọi API trực tiếp từ tool khác
4. **Bảo vệ bằng header HTTP** — Ngăn iframe embedding, chặn clickjacking, vô hiệu hóa camera/mic

### Dành cho người kỹ thuật

| Lớp bảo vệ               | Triển khai                                                                 |
|--------------------------|----------------------------------------------------------------------------|
| Client-side rate limit   | React state: 5 fails → 10s block; 10 fails → 15s block                   |
| Server-side rate limit   | In-memory Map (IP key): 20 req/60s window → 429 + Retry-After header     |
| Origin check             | Kiểm tra `Origin`/`Referer` header khớp `host`; localhost luôn được pass  |
| Security headers         | `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-XSS-Protection` |
| Privacy by design        | Không có phone-only fallback; phải khớp cả tên + sdt mới trả dữ liệu    |

**Lưu ý:** Rate limiting dùng in-memory Map, sẽ reset khi server restart. Với quy mô tiệm nhỏ, đây là đủ dùng. Nếu scale lên nhiều server (Vercel Edge), cần migrate sang Redis.

---

## 7. Cache

| Loại dữ liệu         | TTL        | Lưu ở đâu          | Lý do                                   |
|----------------------|------------|--------------------|-----------------------------------------|
| Google Sheets data   | 5 phút     | RAM server         | Tránh gọi Sheets mỗi request            |
| Drive file ID        | 1 giờ      | RAM server         | File ID không đổi; Drive API quota hạn  |

Khi dữ liệu sheet được cập nhật, trang web sẽ tự lấy dữ liệu mới sau tối đa **5 phút**.

---

## 8. Cấu Trúc Thư Mục

```
giat-say-super-sach/
├── app/
│   ├── layout.tsx          — Layout chung (meta, title)
│   ├── page.tsx            — Trang chính (form tìm kiếm + hiển thị kết quả)
│   ├── globals.css         — CSS toàn cục + animations
│   └── api/
│       ├── orders/route.ts — API tìm đơn hàng (POST)
│       └── image/route.ts  — API lấy URL ảnh từ Drive (GET)
├── components/
│   ├── FeaturedCard.tsx    — Card chi tiết đơn hàng nổi bật (+ lightbox ảnh)
│   └── GalleryCard.tsx     — Card nhỏ trong gallery đơn hàng cũ
├── public/                 — Ảnh tĩnh (logo, favicon)
├── .env.local              — Biến môi trường (API key — KHÔNG commit lên git)
├── next.config.ts          — Cấu hình Next.js + security headers
├── CLAUDE.md               — Hướng dẫn cho AI developer
└── TECHNICAL-DOC.md        — File này
```

---

## 9. Biến Môi Trường

| Biến                     | Bắt buộc | Mô tả                                    |
|--------------------------|----------|------------------------------------------|
| `GOOGLE_DRIVE_API_KEY`   | Có       | API key Google Cloud để truy vấn Drive    |

Tạo tại: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

API cần bật: **Google Drive API v3**

---

## 10. Deploy Lên Vercel

```bash
# 1. Push code lên GitHub
git push origin main

# 2. Import repo vào Vercel
# vercel.com/new → chọn repo

# 3. Thêm biến môi trường trong Vercel dashboard:
#    GOOGLE_DRIVE_API_KEY = <your key>

# 4. Deploy tự động mỗi khi push lên main
```

Không cần cấu hình thêm — Vercel tự nhận Next.js.

---

## 11. Câu Hỏi Thường Gặp

**Tại sao trang không hiện đơn hàng mới ngay?**
Dữ liệu được cache 5 phút. Sau khi thêm đơn vào sheet, khách cần chờ tối đa 5 phút.

**Tại sao khách nhập đúng tên mà không tìm thấy?**
Kiểm tra:
1. Số điện thoại trong sheet có đúng không (đặc biệt số 0 đầu)
2. Tên trong sheet có lỗi chính tả không
3. Đơn hàng có trong 30 ngày gần nhất không

**Google Sheets cần cài đặt gì?**
Sheets phải được chia sẻ **"Anyone with the link can view"** (không cần đăng nhập).

**Ảnh không hiện?**
- Kiểm tra tên file trong cột `Ảnh đính kèm` khớp đúng với tên file trên Drive
- Drive folder `Nhận hàng_Images` phải ở trạng thái public hoặc API key có quyền đọc

---

*Cập nhật lần cuối: 2026-05-06*
