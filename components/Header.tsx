'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X } from 'lucide-react';
import BASE_PATH from '@/lib/config';

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Dịch vụ', href: '/dich-vu' },
  { label: 'Blog', href: '/blog' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src={`${BASE_PATH}/logo.png`}
                alt="Logo Giặt Sấy SUPER SẠCH"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="leading-tight">
              <div
                className={`font-black text-base tracking-tight transition-colors ${
                  scrolled ? 'text-blue-700' : 'text-white'
                }`}
              >
                SUPER SẠCH
              </div>
              <div
                className={`text-xs font-medium transition-colors ${
                  scrolled ? 'text-slate-400' : 'text-blue-100'
                }`}
              >
                Giặt sấy chuyên nghiệp
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://zalo.me/0357358582"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                scrolled
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                  : 'bg-white/15 border border-white/25 text-white hover:bg-white/25 backdrop-blur-sm'
              }`}
            >
              <Phone className="w-4 h-4" />
              0357 358 582
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl animate-fade-in">
          <nav className="container-site py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a href="https://zalo.me/0357358582" className="btn-primary justify-center">
                <Phone className="w-4 h-4" />
                Gọi ngay: 0357 358 582
              </a>
              <a
                href="https://zalo.me/0357358582"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-zalo justify-center"
              >
                Nhắn Zalo ngay
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
