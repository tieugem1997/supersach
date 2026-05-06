import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent this site from being embedded in an iframe on other domains (clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevent browsers from sniffing content types
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't send Referer header to external sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Only allow API calls from the same origin (enforced by browser fetch)
  { key: "Access-Control-Allow-Origin", value: "same-origin" },
  // Basic XSS protection for older browsers
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Disable browser features not needed (camera, microphone, etc.)
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
