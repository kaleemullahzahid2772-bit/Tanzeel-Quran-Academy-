import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Share2,
  CheckCircle2,
  Sparkles,
  Tag,
} from "lucide-react";
import { blogPosts, BlogPost } from "@/data/blog";
import { getArticleSchema, getBreadcrumbSchema, SITE_URL } from "@/lib/schema";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Article Not Found | Al Tanzeel Quran Academy" };

  return {
    title: `${post.metaTitle} | Al Tanzeel Quran Academy`,
    description: post.metaDescription,
    keywords: [post.targetKeyword, ...post.secondaryKeywords, ...post.tags],
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.metaTitle} | Al Tanzeel Quran Academy`,
      description: post.metaDescription,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: "Al Tanzeel Quran Academy",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const articleSchema = getArticleSchema(post);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="flex flex-col w-full min-h-screen bg-[var(--color-black)] text-white">
      {/* Schema.org Article & BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Header Area */}
      <header className="relative bg-[var(--color-black-soft)] py-16 px-4 border-b border-[var(--color-border)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6">
          {/* Back to Guides Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[var(--color-accent)] transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Learning Guides</span>
          </Link>

          {/* Category Pill & Meta */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[var(--color-accent)] text-white font-bold text-xs uppercase tracking-wider shadow-sm">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Clock className="w-3.5 h-3.5 text-[var(--color-sky)]" />
              <span>{post.readTime}</span>
              <span>•</span>
              <Calendar className="w-3.5 h-3.5" />
              <span>Published {post.publishedAt}</span>
            </div>
          </div>

          {/* Main H1 Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {post.title}
          </h1>

          {/* Author Byline Box */}
          <div className="flex items-center gap-3.5 pt-2 border-t border-[var(--color-border)]">
            <div className="w-11 h-11 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-black text-base flex items-center justify-center border border-[var(--color-accent)]/30">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-white text-sm">{post.author.name}</div>
              <div className="text-gray-400 text-xs">{post.author.role}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-4xl mx-auto px-4 py-12 flex flex-col gap-10">
        {/* Featured Image */}
        <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-xl bg-[var(--color-surface)]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        {/* Introduction Paragraph */}
        <div className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal bg-[var(--color-surface)] p-6 sm:p-8 rounded-2xl border border-[var(--color-sky)]/30 shadow-md">
          {post.content.introduction}
        </div>

        {/* Structured Sections */}
        <div className="space-y-12">
          {post.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white pt-2 border-b border-[var(--color-border)] pb-3">
                {section.heading}
              </h2>

              {section.subheading && (
                <h3 className="text-lg font-bold text-[var(--color-accent)]">
                  {section.subheading}
                </h3>
              )}

              <div className="space-y-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                {section.body.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {section.listItems && section.listItems.length > 0 && (
                <ul className="space-y-2.5 my-4 pl-2">
                  {section.listItems.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.callout && (
                <div className="p-6 rounded-2xl bg-[var(--color-surface)] border-l-4 border-[var(--color-accent)] my-6 space-y-1.5 shadow-md">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
                    <span>{section.callout.title}</span>
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic">
                    {section.callout.text}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Conclusion */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-white">Final Thoughts</h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {post.content.conclusion}
          </p>
        </section>

        {/* Contextual Course CTA Card */}
        <aside className="p-8 rounded-2xl bg-gradient-to-r from-[var(--color-black-soft)] to-[var(--color-surface)] border border-[var(--color-accent)]/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider">
              Recommended Next Step
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Enroll in our {post.content.relatedCourseTitle}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm max-w-lg">
              Put this knowledge into practice with private 1-on-1 guidance from certified scholars.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 w-full sm:w-auto shrink-0">
            <a
              href="https://wa.me/923274816872"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105"
            >
              <span>Book 3-Day Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href={`/courses/${post.content.relatedCourseSlug}`}
              className="inline-flex items-center justify-center gap-1 text-xs font-bold text-[var(--color-sky)] hover:underline"
            >
              <span>View Full Course Syllabus</span> &rarr;
            </Link>
          </div>
        </aside>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[var(--color-border)]">
          <Tag className="w-4 h-4 text-gray-400" />
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-gray-300 text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles Grid */}
        <section className="pt-8 border-t border-[var(--color-border)] space-y-6">
          <h2 className="text-2xl font-black text-white">Related Learning Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.id}
                href={`/blog/${rPost.slug}`}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 flex flex-col gap-2 hover:border-[var(--color-accent)]/50 transition-all group"
              >
                <span className="text-[11px] font-bold text-[var(--color-accent)]">
                  {rPost.category}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                  {rPost.title}
                </h3>
                <span className="text-xs text-gray-400 mt-auto flex items-center gap-1 font-semibold">
                  <span>Read More</span> &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </article>
  );
}
