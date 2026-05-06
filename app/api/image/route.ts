import { NextRequest, NextResponse } from "next/server";

const FOLDER_ID = "1tuzB4p2tlObNzby-4YGanWT1dxf4qUI6";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour – file IDs don't change

const fileCache: Record<string, { fileId: string; timestamp: number }> = {};

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const host = req.headers.get("host");
  if (!host) return true;
  if (host.startsWith("localhost") || host.startsWith("127.")) return true;
  if (origin) return origin.includes(host);
  if (referer) return referer.includes(host);
  return false;
}

export async function GET(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const filename = req.nextUrl.searchParams.get("filename");
  if (!filename) {
    return NextResponse.json({ error: "No filename" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Drive API not configured" }, { status: 503 });
  }

  const now = Date.now();
  const cached = fileCache[filename];
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${cached.fileId}&sz=w800`,
      fileId: cached.fileId,
    });
  }

  try {
    const query = encodeURIComponent(`name='${filename}' and '${FOLDER_ID}' in parents`);
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&key=${apiKey}&fields=files(id,name)&spaces=drive`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: `Drive API error ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    const file = data.files?.[0];
    if (!file?.id) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    fileCache[filename] = { fileId: file.id, timestamp: now };

    return NextResponse.json({
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w800`,
      fileId: file.id,
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
