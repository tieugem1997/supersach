'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { trackEvent } from './GoogleAnalytics';

export default function StickyButtons() {
  return (
    <>
      {/* Desktop floating buttons (right side) */}
      <div className="hidden md:flex fixed right-5 bottom-8 z-50 flex-col gap-3">
        <a
          href="https://zalo.me/0357358582"
          onClick={() => trackEvent('click_zalo', { location: 'sticky_desktop' })}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1460F5] text-white shadow-lg hover:bg-blue-700 hover:scale-105 transition-all"
          aria-label="Gọi điện"
          title="Gọi ngay"
        >
          <Phone className="w-6 h-6" />
        </a>
        <a
          href="https://zalo.me/0357358582"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('click_zalo', { location: 'sticky_zalo_desktop' })}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 hover:scale-105 transition-all"
          aria-label="Zalo"
          title="Nhắn Zalo"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden sticky-bottom">
        <div className="grid grid-cols-2 gap-0">
          <a
            href="https://zalo.me/0357358582"
            onClick={() => trackEvent('click_zalo', { location: 'sticky_call_mobile' })}
            className="flex items-center justify-center gap-2 py-3.5 bg-[#1460F5] text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Gọi ngay
          </a>
          <a
            href="https://zalo.me/0357358582"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('click_zalo', { location: 'sticky_zalo_mobile' })}
            className="flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Nhắn Zalo
          </a>
        </div>
      </div>
    </>
  );
}
