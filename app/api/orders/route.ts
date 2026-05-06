import { NextRequest, NextResponse } from "next/server";

const SHEETS_ID = "1kOASpXxcn7XxUmuF_xV4VBz5QsgHDnmS9iAMxjcxqHs";
const ORDERS_GID = "937436438";
const CUSTOMERS_GID = "800893288";

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  return lines
    .slice(1)
    .map((line) => {
      const values = parseCSVLine(line);
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        if (header) obj[header] = values[i] ?? "";
      });
      return obj;
    })
    .filter((row) => Object.values(row).some((v) => v !== ""));
}

// Handles: DD/MM/YYYY HH:mm:ss  |  DD/MM/YYYY HH:mm  |  DD/MM/YYYY  |  ISO
function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const vnMatch = dateStr.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/
  );
  if (vnMatch) {
    const [, day, month, year, hours = "0", mins = "0", secs = "0"] = vnMatch;
    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(mins),
      parseInt(secs)
    );
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-\.\+]/g, "");
}

function removeDiacritics(str: string): string {
  return str.normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}

// ── Server-side rate limiting ────────────────────────────────────────────────
// Keyed by IP. 20 requests/min window; after that → 429 for 60s.
interface RateEntry {
  count: number;
  windowStart: number;
  blockedUntil: number;
}
const rateMap = new Map<string, RateEntry>();
const RATE_WINDOW = 60 * 1000;   // 1 min sliding window
const RATE_LIMIT   = 20;          // max requests per window
const RATE_BLOCK   = 60 * 1000;  // block duration after limit hit

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): { blocked: boolean; retryAfter?: number } {
  const now = Date.now();
  let entry = rateMap.get(ip);

  if (!entry) {
    entry = { count: 1, windowStart: now, blockedUntil: 0 };
    rateMap.set(ip, entry);
    return { blocked: false };
  }

  if (entry.blockedUntil > now) {
    return { blocked: true, retryAfter: Math.ceil((entry.blockedUntil - now) / 1000) };
  }

  if (now - entry.windowStart > RATE_WINDOW) {
    entry.count = 1;
    entry.windowStart = now;
    entry.blockedUntil = 0;
  } else {
    entry.count++;
    if (entry.count > RATE_LIMIT) {
      entry.blockedUntil = now + RATE_BLOCK;
      return { blocked: true, retryAfter: Math.ceil(RATE_BLOCK / 1000) };
    }
  }
  return { blocked: false };
}

// ── In-memory cache (5 min TTL) ──────────────────────────────────────────────
const cache: {
  customers?: { data: Record<string, string>[]; timestamp: number };
  orders?: { data: Record<string, string>[]; timestamp: number };
} = {};
const CACHE_TTL = 5 * 60 * 1000;

async function fetchSheet(gid: string): Promise<Record<string, string>[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEETS_ID}/export?format=csv&gid=${gid}`;
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "Mozilla/5.0" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(
      `Không thể tải dữ liệu (HTTP ${res.status}). Vui lòng đảm bảo Google Sheets đã được chia sẻ công khai.`
    );
  }
  return parseCSV(await res.text());
}

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const host = req.headers.get("host");
  if (!host) return true; // can't determine, allow

  // In dev (localhost) always allow
  if (host.startsWith("localhost") || host.startsWith("127.")) return true;

  if (origin) return origin.includes(host);
  if (referer) return referer.includes(host);
  // No origin/referer = direct API call from non-browser; block
  return false;
}

export async function POST(req: NextRequest) {
  // Origin check — block cross-site / direct scraper calls
  if (!isSameOrigin(req)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  // Server-side rate limiting
  const ip = getIp(req);
  const rate = checkRateLimit(ip);
  if (rate.blocked) {
    return NextResponse.json(
      { success: false, error: `Quá nhiều yêu cầu. Vui lòng thử lại sau ${rate.retryAfter} giây.` },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } }
    );
  }

  try {
    const { name, phoneLastThree } = await req.json();

    const trimmedName = (name || "").trim();
    const trimmedPhone = (phoneLastThree || "").replace(/\D/g, "").trim();

    if (!trimmedName) {
      return NextResponse.json({ success: false, error: "Vui lòng nhập tên của bạn." });
    }
    if (trimmedPhone.length !== 3) {
      return NextResponse.json({ success: false, error: "Vui lòng nhập đúng 3 số cuối số điện thoại." });
    }

    const now = Date.now();

    // ── Fetch customers ──
    if (!cache.customers || now - cache.customers.timestamp > CACHE_TTL) {
      cache.customers = { data: await fetchSheet(CUSTOMERS_GID), timestamp: now };
    }
    const customers = cache.customers.data;

    // Match by phone last-3 digits
    // Column names confirmed: "Khách ID", "Tên khách", "Số điện thoại"
    const matchingCustomers = customers.filter((c) => {
      const phone = normalizePhone(c["Số điện thoại"] || "");
      if (!phone) return false;
      // phone may be stored as only 3 digits already, or full number
      return phone === trimmedPhone || phone.endsWith(trimmedPhone);
    });

    if (matchingCustomers.length === 0) {
      return NextResponse.json({ success: true, orders: [], customerFound: false });
    }

    // Name verification: exact word boundary match (prevents "An" matching "Danh")
    // Both sides are lowercased + diacritics stripped so "Tai"→"tai" matches "Tài"→"tai"
    const nameVerified = matchingCustomers.filter((c) => {
      const customerName = removeDiacritics((c["Tên khách"] || "").toLowerCase().trim());
      if (!customerName) return true;
      const customerWords = customerName.split(/\s+/);
      const searchWords: string[] = removeDiacritics(trimmedName.toLowerCase()).split(/\s+/).filter((w: string) => w.length > 1);
      if (searchWords.length === 0) return true;
      // Every search word must match at least one customer word exactly
      return searchWords.every((sw: string) =>
        customerWords.some((cw) => cw === sw || cw.startsWith(sw))
      );
    });

    // No name match → not found (no phone-only fallback to protect privacy)
    if (nameVerified.length === 0) {
      return NextResponse.json({ success: true, orders: [], customerFound: false });
    }
    const matched = nameVerified;

    const customerIds = [...new Set(matched.map((c) => (c["Khách ID"] || "").trim()).filter(Boolean))];
    const displayName = (matched[0]["Tên khách"] || trimmedName).trim();

    // ── Fetch orders ──
    if (!cache.orders || now - cache.orders.timestamp > CACHE_TTL) {
      cache.orders = { data: await fetchSheet(ORDERS_GID), timestamp: now };
    }
    const orders = cache.orders.data;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    // Column confirmed: "Tên khách" in orders = Khách ID value
    const filtered = orders.filter((order) => {
      const tenKhach = (order["Tên khách"] || "").trim();
      const customerMatch = customerIds.some(
        (id) => tenKhach === id || tenKhach.includes(id) || id.includes(tenKhach)
      );
      if (!customerMatch) return false;

      const orderDate = parseDate(order["Thời gian nhận"] || "");
      return orderDate !== null && orderDate >= thirtyDaysAgo;
    });

    // Sort descending by receive time
    filtered.sort((a, b) => {
      const dA = parseDate(a["Thời gian nhận"] || "")?.getTime() ?? 0;
      const dB = parseDate(b["Thời gian nhận"] || "")?.getTime() ?? 0;
      return dB - dA;
    });

    const result = filtered.map((order) => {
      // Extract just the filename from "Nhận hàng_Images/xxx.jpg"
      const rawImage = order["Ảnh đính kèm"] || "";
      const imageFilename = rawImage.includes("/")
        ? rawImage.split("/").pop() ?? ""
        : rawImage;

      return {
        id: order["Số hóa đơn"] || "",
        thoiGianNhan: order["Thời gian nhận"] || "",
        trangThai: order["Trạng thái"] || "",
        tongCong: order["Tổng cộng (Total)"] || order["Tổng tiền"] || "",
        loaiDich: order["Dịch vụ khách chọn"] || "",
        ghiChu: order["Đặc điểm/Note"] || "",
        imageFilename,
      };
    });

    return NextResponse.json({
      success: true,
      orders: result,
      customerFound: true,
      customerName: displayName,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi không xác định";
    return NextResponse.json({ success: false, error: message });
  }
}
