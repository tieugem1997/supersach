'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  Phone, MessageCircle, Star, MapPin, Clock, CheckCircle,
  Shirt, Sparkles, Footprints, Truck, ArrowRight, Shield,
  Zap, Heart, Award, Users, ThumbsUp, ChevronRight,
  Calendar, Percent, ShoppingBag, Armchair, Wrench,
} from 'lucide-react';
import SoapBubbles from '@/components/SoapBubbles';
import { useScrollAnimate } from '@/lib/useScrollAnimate';

/* ─── DATA ─── */

const services = [
  {
    icon: Shirt,
    title: 'Giặt Sấy Quần Áo',
    tagline: 'Sạch hoàn toàn — Thơm lâu — Không hư màu',
    desc: 'Máy giặt công nghiệp Electrolux/LG, bột giặt Persil cao cấp, sấy hoàn toàn ở nhiệt độ phù hợp từng loại vải. Quần áo thơm tho, phẳng phiu, không nhăn.',
    features: ['Phân loại màu & chất liệu', 'Sấy khô 100%', 'Giao về gấp gọn sạch sẽ'],
    price: 'Liên hệ',
    priceNote: '',
    href: '/dich-vu/giat-say',
    badge: 'Phổ biến nhất',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=85&auto=format&fit=crop',
    imageAlt: 'Máy giặt công nghiệp giặt sấy quần áo',
    accentColor: 'blue',
    accentHex: '#1460F5',
  },
  {
    icon: Sparkles,
    title: 'Giặt Hấp Cao Cấp',
    tagline: 'Dry Clean & Steam — Chuẩn quốc tế',
    desc: 'Dung môi giặt khô an toàn kết hợp hấp hơi nước 160°C. Bảo toàn cấu trúc vải, giữ form vest, không co rút. Phù hợp vest, lụa, cashmere, áo dài.',
    features: ['Dry cleaning dung môi hữu cơ', 'Hấp hơi nước 160°C', 'Kiểm tra nhãn mác kỹ lưỡng'],
    price: 'Liên hệ',
    priceNote: '',
    href: '/dich-vu/giat-hap',
    badge: 'Đồ cao cấp',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=85&auto=format&fit=crop',
    imageAlt: 'Vest công sở được giặt hấp phẳng phiu chuyên nghiệp',
    accentColor: 'violet',
    accentHex: '#7C3AED',
  },
  {
    icon: Footprints,
    title: 'Vệ Sinh Giày Chuyên Nghiệp',
    tagline: 'Sạch sâu từng ô lưới — Như mới xuất hộp',
    desc: 'Quy trình 5 bước chuyên biệt: tiền xử lý vết bẩn, vệ sinh siêu âm, khử mùi ozone, đánh bóng, bảo vệ bề mặt. Phục hồi cả giày trắng ố vàng lâu năm.',
    features: ['Vệ sinh siêu âm chuyên sâu', 'Khử mùi ozone 99.9%', 'Đánh bóng & bảo vệ bề mặt'],
    price: 'Liên hệ',
    priceNote: '',
    href: '/dich-vu/ve-sinh-giay',
    badge: 'Spa giày',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85&auto=format&fit=crop',
    imageAlt: 'Vệ sinh giày sneaker trắng chuyên nghiệp',
    accentColor: 'amber',
    accentHex: '#D97706',
  },
  {
    icon: ShoppingBag,
    title: 'Vệ Sinh Túi Xách',
    tagline: 'Spa túi hiệu — Phục hồi như mới',
    desc: 'Vệ sinh chuyên sâu, phục hồi màu sắc, xử lý vết bẩn cho túi xách hàng hiệu. An toàn với da, da lộn, vải canvas.',
    features: ['Làm sạch chuyên sâu từng chi tiết', 'Phục hồi màu & chống thấm', 'Bảo quản form dáng túi'],
    price: 'Liên hệ',
    priceNote: '',
    href: '/dich-vu/ve-sinh-giay',
    badge: 'Túi hiệu',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85&auto=format&fit=crop',
    imageAlt: 'Vệ sinh túi xách hàng hiệu chuyên nghiệp',
    accentColor: 'rose',
    accentHex: '#E11D48',
  },
  {
    icon: Armchair,
    title: 'Vệ Sinh Nệm, Rèm, Thảm',
    tagline: 'Sạch sâu — Diệt khuẩn 99.9%',
    desc: 'Giặt khô & hơi nước nóng cho nệm, rèm cửa, thảm. Loại bỏ bụi mịn, vi khuẩn và mạt bụi. An toàn cho gia đình và trẻ nhỏ.',
    features: ['Hơi nước nóng diệt khuẩn', 'Không hóa chất độc hại', 'Khô nhanh trong 2-4 giờ'],
    price: 'Liên hệ',
    priceNote: '',
    href: '/dich-vu/giat-say',
    badge: 'Gia đình',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=85&auto=format&fit=crop',
    imageAlt: 'Vệ sinh rèm cửa nệm thảm chuyên nghiệp',
    accentColor: 'teal',
    accentHex: '#0D9488',
  },
  {
    icon: Wrench,
    title: 'Sửa Chữa & Phục Hồi Giày',
    tagline: 'Thay đế — Đánh bóng — Tái sinh',
    desc: 'Thay đế giày bị mòn, đánh bóng lại da, sơn phục hồi bề mặt sneaker. Giày cũ thành mới, tiết kiệm chi phí mua giày mới.',
    features: ['Thay đế & gia cố đế', 'Đánh bóng & phục hồi da', 'Sơn lại bề mặt sneaker'],
    price: 'Liên hệ',
    priceNote: '',
    href: '/dich-vu/ve-sinh-giay',
    badge: 'Sửa giày',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=85&auto=format&fit=crop',
    imageAlt: 'Sửa chữa phục hồi giày chuyên nghiệp',
    accentColor: 'orange',
    accentHex: '#EA580C',
  },
  {
    icon: Shirt,
    title: 'Giặt Chăn Ga Gối',
    tagline: 'Sạch — Thơm — Không xù lông',
    desc: 'Giặt sấy chuyên dụng cho chăn, ga, gối, mền. Sấy khô hoàn toàn, diệt khuẩn ở nhiệt độ cao. Phù hợp mọi chất liệu cotton, lụa, lông vũ.',
    features: ['Giặt riêng từng bộ', 'Sấy khô diệt khuẩn 60°C', 'Gấp gọn, đóng túi sạch'],
    price: 'Liên hệ',
    priceNote: '',
    href: '/dich-vu/giat-say',
    badge: 'Chăn ga',
    image: 'https://images.unsplash.com/photo-1616627561950-9f746e330187?w=800&q=85&auto=format&fit=crop',
    imageAlt: 'Giặt chăn ga gối sạch sẽ',
    accentColor: 'indigo',
    accentHex: '#4F46E5',
  },
];

const processSteps = [
  {
    num: '01', icon: Phone, title: 'Nhắn Zalo',
    desc: 'Nhắn tin hoặc gọi qua Zalo. Báo địa chỉ, số lượng đồ và giờ muốn lấy.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Nhắn tin Zalo đặt lịch giặt sấy',
    color: '#1460F5',
  },
  {
    num: '02', icon: Truck, title: 'Nhân Viên Đến Lấy',
    desc: 'Nhân viên đến đúng hẹn, kiểm đếm từng món, lập biên bản. Đồ được đánh mã riêng.',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Nhân viên đến lấy đồ giặt tận nơi',
    color: '#0EA5E9',
  },
  {
    num: '03', icon: Sparkles, title: 'Giặt Chuyên Nghiệp',
    desc: 'Phân loại màu và chất liệu. Máy giặt công nghiệp, bột giặt cao cấp, sấy khô hoàn toàn.',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Máy giặt công nghiệp giặt quần áo',
    color: '#7C3AED',
  },
  {
    num: '04', icon: CheckCircle, title: 'Giao Tận Nhà',
    desc: 'Đồ gấp gọn, đóng túi sạch thơm. Giao đúng giờ hẹn, thanh toán khi nhận.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Giao đồ giặt sạch tận nhà',
    color: '#059669',
  },
];

const GOOGLE_MAPS_REVIEW_URL = 'https://www.google.com/maps/place/Gi%E1%BA%B7t+s%E1%BA%A5y+SUPER+S%E1%BA%A0CH+-+Ti%E1%BB%87m+gi%E1%BA%B7t+s%E1%BA%A5y+-+V%E1%BB%87+sinh+gi%C3%A0y+Super+S%E1%BA%A1ch+-+Gi%E1%BA%B7t+h%E1%BA%A5p+-+Qu%E1%BA%ADn+2+-+Giao+nh%E1%BA%ADn+t%E1%BA%ADn+n%C6%A1i/@10.7750185,106.7588497,15z/data=!4m6!3m5!1s0x317525004b7e883b:0x46d56d7dd3913cc0!8m2!3d10.7838223!4d106.7679222!16s%2Fg%2F11vww07972?entry=ttu&g_ep=EgoyMDI2MDcyMC4wIKXMDSoASAFQAw%3D%3D';

const reviews = [
  { name: 'Nguyễn Thị Lan',  area: 'An Phú, Quận 2',       rating: 5, time: '2 tuần trước',  text: 'Giặt rất sạch và thơm, áo sơ mi lụa được giặt hấp cẩn thận không bị hư chút nào. Giao nhận đúng giờ, nhân viên lịch sự. Sẽ dùng lâu dài!', avatar: 'https://i.pravatar.cc/80?u=lhnam' },
  { name: 'Trần Minh Khoa',  area: 'Thảo Điền, Quận 2',     rating: 5, time: '1 tháng trước', text: 'Mình gửi 4 đôi giày sneaker, ra về như mới mua. Giá cả hợp lý, dịch vụ chuyên nghiệp. Giao nhận tận nhà rất tiện cho người bận rộn như mình.', avatar: 'https://i.pravatar.cc/80?u=tmkhoa' },
  { name: 'Phạm Thu Hà',     area: 'Bình An, Quận 2',       rating: 5, time: '3 tuần trước',  text: 'Đặt lịch qua Zalo rất nhanh, 15 phút là có người đến lấy. Đồ giặt sạch, mùi thơm dịu. Vest công sở hấp phẳng phiu. Rất hài lòng!', avatar: 'https://i.pravatar.cc/80?u=ptha' },
  { name: 'Lê Hoàng Nam',    area: 'Cát Lái, Quận 2',       rating: 5, time: '2 tháng trước', text: 'Gia đình có con nhỏ nên đồ rất nhiều. Super Sạch giúp tiết kiệm cả buổi cuối tuần. Giặt sạch, không hư đồ, giá hợp lý. Highly recommend!', avatar: 'https://i.pravatar.cc/80?u=ntlan' },
  { name: 'Võ Thị Mai',      area: 'Bình Trưng, Quận 2',    rating: 5, time: '1 tuần trước',  text: 'Khách hàng thường xuyên hơn 1 năm. Chất lượng ổn định, chưa bao giờ mất đồ hay hư hỏng. Nhân viên nhớ sở thích của mình. Tuyệt vời!', avatar: 'https://i.pravatar.cc/80?u=dttung' },
  { name: 'Đỗ Thanh Tùng',   area: 'TP. Thủ Đức',           rating: 5, time: '3 tuần trước',  text: 'Mình ở Thủ Đức vẫn đặt được giao nhận. Áo vest và sơ mi công sở luôn được giặt hấp hoàn hảo. Giá tốt, phục vụ chuyên nghiệp.', avatar: 'https://i.pravatar.cc/80?u=vtmai' },
];

const whyUs = [
  { icon: Shield,   title: 'Không hư đồ',      desc: 'Phân loại chất liệu trước khi giặt. Cam kết đền bù nếu đồ bị hỏng do lỗi của chúng tôi.' },
  { icon: Zap,      title: 'Trả trong ngày',    desc: 'Dịch vụ nhanh: đặt buổi sáng nhận buổi chiều. Phù hợp khi cần đồ gấp.' },
  { icon: Sparkles, title: 'Sạch 100%',         desc: 'Máy giặt công nghiệp, bột giặt cao cấp, nhiệt độ đúng theo từng loại vải.' },
  { icon: Truck,    title: 'Giao nhận Free',    desc: 'Miễn phí giao nhận 2 chiều trong Quận 2 cho đơn từ 100.000đ.' },
  { icon: Heart,    title: 'Chăm sóc tận tình', desc: 'Nhớ sở thích từng khách. Tư vấn cách giặt phù hợp loại vải đặc biệt.' },
  { icon: Award,    title: 'Uy tín 5+ năm',     desc: 'Phục vụ hơn 500 gia đình/tháng tại Quận 2. Đánh giá 4.9/5 sao Google.' },
];

const stats = [
  { value: '500+',  label: 'Khách hàng/tháng', icon: Users },
  { value: '4.9★',  label: 'Google Review',    icon: Star },
  { value: '5 năm', label: 'Kinh nghiệm',      icon: Award },
  { value: '24h',   label: 'Hỗ trợ Zalo',      icon: MessageCircle },
];

const areas = [
  'Bình Trưng Đông','Bình Trưng Tây','An Phú','Thảo Điền',
  'Bình An','Cát Lái','An Khánh','Thủ Thiêm',
  'Bình Khánh','An Lợi Đông','TP. Thủ Đức','Bình Thạnh',
];

function StarRating({ count }: { count: number }) {
  return <span className="stars text-base">{'★'.repeat(count)}{'☆'.repeat(5 - count)}</span>;
}

/* ═══════════════════════════════════════════════════
   AnimatedGradient – hero background orbs
   ═══════════════════════════════════════════════════ */
function AnimatedGradient() {
  return (
    <>
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-400/25 via-blue-500/15 to-cyan-400/15 blur-3xl -translate-y-1/2 translate-x-1/4 animate-pulse pointer-events-none"
        style={{ animationDuration: '6s' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-blue-400/15 via-cyan-400/15 to-teal-400/10 blur-3xl translate-y-1/3 -translate-x-1/4 animate-pulse pointer-events-none"
        style={{ animationDuration: '8s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-300/10 to-cyan-400/10 blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse pointer-events-none"
        style={{ animationDuration: '10s' }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   Particles – floating particles in hero
   ═══════════════════════════════════════════════════ */
function Particles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    left: `${(i * 37 + 13) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    delay: `${(i * 0.3) % 5}s`,
    duration: `${3 + (i * 0.2) % 4}s`,
    opacity: 0.15 + i * 0.025,
  }));

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-white/50 rounded-full animate-float"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CountUpBadge – animated stat counter
   ═══════════════════════════════════════════════════ */
function CountUpBadge({ value, label, icon: Icon }: { value: string; label: string; icon: React.ComponentType<{ className?: string }> }) {
  const [displayVal, setDisplayVal] = useState('0');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDisplayVal(value);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div className="text-2xl md:text-3xl font-black text-blue-600 mb-1 transition-all duration-700">{displayVal}</div>
      <div className="text-sm text-slate-500 font-medium">{label}</div>
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`scroll-to-top-btn ${visible ? 'visible' : ''}`}
      aria-label="Cuộn lên đầu trang"
      title="Lên đầu trang"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

export default function HomeClient() {
  const heroRef = useScrollAnimate();
  const trustRef = useScrollAnimate();
  const promoRef = useScrollAnimate();
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1600&q=85&auto=format&fit=crop"
            alt="Tiệm giặt sấy chuyên nghiệp SUPER SẠCH Quận 2"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A3DA3]/90 via-[#1460F5]/80 to-[#1460F5]/60" />
        </div>

        {/* Background effects */}
        <AnimatedGradient />
        <Particles />
        <SoapBubbles />

        <div className="container-site relative z-10 py-32 md:py-40">
          <div ref={heroRef} className="max-w-2xl">
            {/* Location badge */}
            <div className="scroll-animate inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-sm font-semibold mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              Tiệm giặt sấy uy tín – Quận 2, TP.HCM
            </div>

            {/* H1 */}
            <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6" data-delay="1">
              Giặt Sấy{' '}
              <span className="relative">
                <span className="text-blue-200">SUPER SẠCH</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-300/50 rounded-full" />
              </span>
              <br />
              <span className="text-3xl md:text-4xl font-bold text-blue-100">
                Nhanh · Sạch · Giao Tận Nơi
              </span>
            </h1>

            <p className="scroll-animate text-lg md:text-xl text-blue-100 leading-relaxed mb-8 max-w-xl" data-delay="2">
              Bạn bận rộn? Để chúng tôi lo việc giặt giũ.{' '}
              <strong className="text-white">Đặt lịch qua Zalo</strong>, nhân viên đến lấy đồ, giặt sạch và giao tận nhà. Chỉ từ{' '}
              <strong className="text-blue-200">12.000đ/kg</strong>.
            </p>

            {/* CTAs */}
            <div className="scroll-animate flex flex-wrap gap-3 mb-10" data-delay="3">
              <a
                href="https://zalo.me/0357358582"
                className="flex items-center gap-2 px-6 py-4 rounded-xl bg-white text-blue-700 font-bold text-base hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-0.5 animate-cta-bounce"
                style={{ animationDelay: '0s' }}
              >
                <Phone className="w-5 h-5" />
                Gọi ngay: 0357 358 582
              </a>
              <a
                href="https://zalo.me/0357358582"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-4 rounded-xl bg-[#0068FF] text-white font-bold text-base hover:bg-blue-500 transition-all shadow-xl hover:-translate-y-0.5 animate-cta-bounce"
                style={{ animationDelay: '0.5s' }}
              >
                <MessageCircle className="w-5 h-5" />
                Nhắn Zalo đặt lịch
              </a>
            </div>

            {/* Trust badges */}
            <div className="scroll-animate flex flex-wrap gap-2.5" data-delay="4">
              {[
                { icon: CheckCircle, text: 'Không hư đồ' },
                { icon: Clock,       text: 'Trả trong ngày' },
                { icon: Truck,       text: 'Giao miễn phí' },
                { icon: Star,        text: '4.9★ Google' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 border border-white/20 text-white text-sm font-medium backdrop-blur-sm">
                  <b.icon className="w-3.5 h-3.5 text-blue-200" />
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none" fill="white">
            <path d="M0,40 C360,0 1080,80 1440,20 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-white py-10 border-b border-slate-100">
        <div ref={trustRef} className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="scroll-animate">
                <CountUpBadge value={s.value} label={s.label} icon={s.icon} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROMOTION SECTION ─── */}
      <section className="section-py bg-gradient-to-b from-white to-blue-50/30">
        <div ref={promoRef} className="container-site">
          {/* Section heading */}
          <div className="scroll-animate text-center mb-10" data-delay="0">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-full px-4 py-1.5 text-amber-700 text-sm font-bold mb-3">
              <Sparkles className="w-4 h-4" />
              ƯU ĐÃI ĐẶC BIỆT
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              Chương Trình{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Khuyến Mãi
              </span>{' '}
              Hấp Dẫn
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Áp dụng cho tất cả khách hàng tại Super Sạch
            </p>
          </div>

          {/* Promotion cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* ── Card 1: Giặt sấy giảm 10% ── */}
            <div className="scroll-animate card-hover group relative bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden animate-bounce-promo" data-delay="1" style={{ animationDelay: '2s', animationDuration: '3s' }}>
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-orange-400" />

              <div className="p-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🧺</span>
                </div>

                {/* Discount badge */}
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4 shadow-lg shadow-amber-200">
                  <Percent className="w-4 h-4" />
                  GIẢM 10%
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Giặt Sấy Quần Áo
                </h3>

                {/* Applicable days */}
                <div className="flex items-center gap-2.5 text-sm text-slate-600 mb-4 bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
                  <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>
                    Áp dụng <span className="font-bold text-slate-800">Thứ 3 - Thứ 6</span> hàng tuần
                  </span>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  Giảm ngay 10% cho tất cả đơn hàng giặt sấy khi gửi đồ vào các ngày đầu tuần. Tiết kiệm chi phí, đồ vẫn sạch thơm!
                </p>

                <a
                  href="https://zalo.me/0357358582"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all duration-200 group/btn shadow-lg shadow-amber-200 hover:shadow-xl hover:-translate-y-0.5 animate-pulse-ring-btn"
                >
                  <MessageCircle className="w-4 h-4" />
                  Gửi đồ ngay
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* ── Card 2: Vệ sinh giày – giặt 4 tính 3 ── */}
            <div className="scroll-animate card-hover group relative bg-white rounded-2xl border border-teal-100 shadow-md overflow-hidden animate-bounce-promo" data-delay="2" style={{ animationDelay: '3.5s', animationDuration: '3s' }}>
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 to-emerald-400" />

              <div className="p-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">✨</span>
                </div>

                {/* Discount badge */}
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4 shadow-lg shadow-teal-200">
                  <Sparkles className="w-4 h-4" />
                  GIẶT 4 TÍNH TIỀN 3
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Vệ Sinh Giày Chuyên Nghiệp
                </h3>

                {/* Package info */}
                <div className="flex items-center gap-2.5 text-sm text-slate-600 mb-4 bg-teal-50 rounded-xl px-4 py-3 border border-teal-100">
                  <Footprints className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span>
                    Gói <span className="font-bold text-slate-800">vệ sinh cao cấp 100k/đôi</span>
                  </span>
                </div>

                {/* Visual: 4 pairs */}
                <div className="flex items-center gap-1.5 mb-4">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm ${
                        n <= 3
                          ? 'bg-teal-100 text-teal-700'
                          : 'bg-gradient-to-br from-teal-400 to-emerald-400 text-white ring-2 ring-teal-200'
                      }`}
                    >
                      {n <= 3 ? '👟' : '🎁'}
                    </div>
                  ))}
                  <span className="text-sm text-slate-500 ml-2 whitespace-nowrap font-semibold">= 300k</span>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  Gửi 4 đôi giày vệ sinh cao cấp, chỉ tính tiền 3 đôi. Đôi thứ 4{' '}
                  <span className="font-bold text-teal-600">MIỄN PHÍ!</span>
                </p>

                <a
                  href="https://zalo.me/0357358582"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all duration-200 group/btn shadow-lg shadow-teal-200 hover:shadow-xl hover:-translate-y-0.5 animate-pulse-ring-btn"
                >
                  <MessageCircle className="w-4 h-4" />
                  Đặt lịch ngay
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section-py bg-white" id="dich-vu">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="badge badge-primary mx-auto mb-4">Dịch vụ của chúng tôi</div>
            <h2 className="section-title mb-4">Giải Pháp Giặt Giũ Toàn Diện</h2>
            <p className="section-subtitle max-w-xl mx-auto">Từ quần áo hằng ngày đến trang phục cao cấp — mỗi dịch vụ được thiết kế để bảo vệ đồ của bạn tốt nhất.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="group card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={svc.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
                  {/* Badge */}
                  <span
                    className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full text-white shadow-md"
                    style={{ background: svc.accentHex }}
                  >
                    {svc.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${svc.accentHex}15` }}>
                      <svc.icon className="w-5 h-5" style={{ color: svc.accentHex }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-800 leading-tight">{svc.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{svc.desc}</p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-4">
                    {svc.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: svc.accentHex }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-sm font-bold" style={{ color: svc.accentHex }}>{svc.price}</div>
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                      Xem chi tiết <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="section-py bg-slate-50">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="badge badge-primary mx-auto mb-4">Quy trình 4 bước</div>
            <h2 className="section-title mb-4">Đặt Lịch Là Xong — Chúng Tôi Lo Phần Còn Lại</h2>
            <p className="section-subtitle max-w-xl mx-auto">Chỉ 1 tin nhắn Zalo, mọi việc giặt giũ được giải quyết trong ngày.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <div key={step.num} className="relative group">
                {/* Arrow connector for desktop */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-[72px] -right-3 z-10 w-6 h-6 items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-slate-300" />
                  </div>
                )}

                <div className="card overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  {/* Photo */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
                    {/* Step badge */}
                    <div
                      className="absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg"
                      style={{ background: step.color }}
                    >
                      {i + 1}
                    </div>
                    {/* Icon */}
                    <div className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: step.color }}>
                      Bước {step.num}
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://zalo.me/0357358582"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              <MessageCircle className="w-5 h-5" />
              Nhắn Zalo đặt lịch ngay
            </a>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="section-py bg-slate-50">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="badge badge-primary mx-auto mb-4">Đánh giá khách hàng</div>
            <h2 className="section-title mb-4">Hơn 500 Gia Đình Tin Tưởng Mỗi Tháng</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <StarRating count={5} />
              <span className="font-black text-2xl text-slate-800">4.9</span>
              <span className="text-slate-400 text-sm">/ 5.0</span>
            </div>
            <p className="text-sm text-slate-500">Dựa trên 120+ đánh giá Google</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <a
                key={r.name}
                href={GOOGLE_MAPS_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-5 hover:shadow-lg transition-all bg-white cursor-pointer group/review hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-100 group-hover/review:ring-blue-300 transition-all">
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{r.name}</div>
                      <div className="text-xs text-slate-400">{r.area}</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{r.time}</span>
                </div>
                <StarRating count={r.rating} />
                <p className="text-sm text-slate-600 leading-relaxed mt-2">{r.text}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-blue-500 group-hover/review:text-blue-600 transition-colors font-medium">
                  <ThumbsUp className="w-3 h-3" /> Xem trên Google Maps →
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href={GOOGLE_MAPS_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Star className="w-4 h-4" />
              Xem tất cả đánh giá Google
            </a>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="section-py hero-gradient">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-sm font-semibold mb-4">
              Tại sao chọn chúng tôi
            </div>
            <h2 className="section-title text-white mb-4">6 Cam Kết Của SUPER SẠCH</h2>
            <p className="text-blue-100 max-w-xl mx-auto">Chúng tôi không chỉ giặt sạch quần áo — chúng tôi chăm sóc cuộc sống của bạn.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((w) => (
              <div key={w.title} className="flex gap-4 p-5 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/15 transition-colors backdrop-blur-sm">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <w.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{w.title}</h3>
                  <p className="text-sm text-blue-100 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREAS ─── */}
      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge badge-primary mb-4">Khu vực phục vụ</div>
              <h2 className="section-title mb-4">Giao Nhận Tận Nơi Tại Quận 2 Và Lân Cận</h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Phục vụ toàn bộ Quận 2 và các khu lân cận.{' '}
                <strong className="text-slate-700">Miễn phí giao nhận</strong> cho đơn từ 100.000đ nội Quận 2.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {areas.map((area) => (
                  <span key={area} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-200">
                    <MapPin className="w-3 h-3" /> {area}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a href="https://zalo.me/0357358582" className="btn-primary"><Phone className="w-4 h-4" /> Gọi đặt lịch</a>
                <a href="https://zalo.me/0357358582" target="_blank" rel="noopener noreferrer" className="btn-zalo"><MessageCircle className="w-4 h-4" /> Nhắn Zalo</a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 h-80 md:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4!2d106.7653473!3d10.7838223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525004b7e883b%3A0x46d56d7dd3913cc0!2zR2nhurdgIHPhuqV5IFNVUEVSIFJFQ0gg!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
                width="100%" height="100%"
                style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ Giặt Sấy SUPER SẠCH"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-py bg-gradient-to-r from-blue-50 to-slate-50 border-y border-blue-100">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="section-title mb-4">Hết Thời Gian Giặt Bằng Tay?</h2>
            <p className="section-subtitle mb-8">
              Tiết kiệm 3-4 giờ mỗi tuần. Đặt lịch ngay — nhân viên đến lấy đồ trong vòng{' '}
              <strong className="text-blue-600">30 phút</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://zalo.me/0357358582" className="btn-primary text-base px-8 py-4">
                <Phone className="w-5 h-5" /> Gọi ngay: 0357 358 582
              </a>
              <a href="https://zalo.me/0357358582" target="_blank" rel="noopener noreferrer" className="btn-zalo text-base px-8 py-4">
                <MessageCircle className="w-5 h-5" /> Đặt lịch qua Zalo
              </a>
            </div>
            <p className="text-sm text-slate-400 mt-5">
              <Clock className="w-4 h-4 inline mr-1.5" />
              Mở cửa 7:00 – 21:30, Thứ 2 – Chủ Nhật
            </p>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="section-py hero-gradient relative overflow-hidden" id="lien-he">
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-300/10 blur-3xl" />
        </div>

        <div className="container-site relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4 text-blue-200" />
              Liên hệ với chúng tôi
            </div>
            <h2 className="section-title text-white mb-4">Tìm Super Sạch Tại Quận 2</h2>
            <p className="text-blue-100 max-w-xl mx-auto text-lg">
              Ghé tiệm hoặc nhắn Zalo — chúng tôi luôn sẵn sàng phục vụ bạn
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left: Info + Zalo CTA */}
            <div className="space-y-5">
              {/* Address card */}
              <div className="flex gap-4 p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-blue-200 font-medium uppercase tracking-wide mb-1">Địa chỉ</div>
                  <a href="https://maps.google.com/?q=105+Đường+39+Bình+Trưng+Quận+2" target="_blank" rel="noopener noreferrer" className="text-white font-bold text-base hover:text-blue-200 transition-colors">
                    105 Đường 39, Phường Bình Trưng, Quận 2, TP.HCM
                  </a>
                </div>
              </div>

              {/* Phone card */}
              <div className="flex gap-4 p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-blue-200 font-medium uppercase tracking-wide mb-1">Điện thoại / Zalo</div>
                  <a href="https://zalo.me/0357358582" target="_blank" rel="noopener noreferrer" className="text-white font-bold text-lg hover:text-blue-200 transition-colors">
                    0357 358 582
                  </a>
                </div>
              </div>

              {/* Hours card */}
              <div className="flex gap-4 p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-blue-200 font-medium uppercase tracking-wide mb-1">Giờ mở cửa</div>
                  <div className="text-white font-bold text-base">
                    Thứ 2 – Chủ Nhật: <span className="text-blue-200">7:00 – 21:30</span>
                  </div>
                </div>
              </div>

              {/* Zalo CTA */}
              <a
                href="https://zalo.me/0357358582"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#0068FF] hover:bg-blue-500 text-white font-bold text-lg p-5 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 animate-pulse-ring-btn group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 animate-float">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-base font-extrabold">Nhắn Zalo Đặt Lịch Ngay</div>
                  <div className="text-xs text-blue-200 font-medium">Phản hồi trong 5 phút</div>
                </div>
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Right: Map */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 h-80 md:h-full min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4!2d106.7653473!3d10.7838223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525004b7e883b%3A0x46d56d7dd3913cc0!2zR2nhurdgIHPhuqV5IFNVUEVSIFJFQ0gg!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
                width="100%" height="100%"
                style={{ border: 0, minHeight: '320px' }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí tiệm Giặt Sấy SUPER SẠCH"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-0" />

      {/* ─── SCROLL TO TOP ─── */}
      <ScrollToTop />
    </>
  );
}
