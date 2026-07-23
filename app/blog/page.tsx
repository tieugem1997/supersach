import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, Tag, User } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog Giặt Sấy | Mẹo Giặt Quần Áo, Bảo Quản Đồ Cao Cấp - SUPER SẠCH',
  description:
    'Bí quyết giặt sấy, bảo quản quần áo cao cấp, cách vệ sinh giày sneaker tại nhà. Blog từ chuyên gia giặt sấy SUPER SẠCH Quận 2.',
  alternates: { canonical: 'https://supersach.vn/blog' },
};

const categories = ['Tất cả', 'Mẹo giặt sấy', 'Vệ sinh giày', 'Spa giày', 'Giặt hấp', 'Bảo quản đồ', 'Hướng dẫn'];

const categoryColor: Record<string, string> = {
  'Mẹo giặt sấy': 'bg-blue-100 text-blue-700',
  'Vệ sinh giày': 'bg-amber-100 text-amber-700',
  'Spa giày': 'bg-pink-100 text-pink-700',
  'Giặt hấp': 'bg-violet-100 text-violet-700',
  'Bảo quản đồ': 'bg-emerald-100 text-emerald-700',
  'Hướng dẫn': 'bg-sky-100 text-sky-700',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-28 pb-16">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Blog Giặt Sấy & Bảo Quản Đồ
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Mẹo giặt sấy, bí quyết bảo quản quần áo cao cấp từ đội ngũ chuyên gia SUPER SẠCH Quận 2.
          </p>
        </div>
        <div className="wave-divider mt-10">
          <svg viewBox="0 0 1440 40" fill="white" className="w-full">
            <path d="M0,20 C360,0 1080,40 1440,10 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat, i) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  i === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Featured post */}
          {featured && (
            <div className="mb-10">
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid md:grid-cols-2 gap-0 card overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                  <span
                    className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${categoryColor[featured.category] ?? 'bg-blue-100 text-blue-700'}`}
                  >
                    {featured.category}
                  </span>
                </div>
                <div className="p-7 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {featured.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {featured.readTime}
                    </span>
                    <span>{featured.date}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                    Đọc bài viết <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article key={post.slug} className="card hover:shadow-lg transition-shadow group flex flex-col">
                <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span
                    className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${categoryColor[post.category] ?? 'bg-blue-100 text-blue-700'}`}
                  >
                    {post.category}
                  </span>
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>

                  <h2 className="font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug flex-1">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-0.5 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full"
                        >
                          <Tag className="w-2.5 h-2.5" /> {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Đọc thêm <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20 text-slate-400">Chưa có bài viết nào.</div>
          )}
        </div>
      </section>
      <div className="h-16 md:h-0" />
    </>
  );
}
