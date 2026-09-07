"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import { BlogPost } from "@/data/blog";

interface BlogClientProps {
  posts: BlogPost[];
}

const categories = [
  "All",
  "Quran Learning",
  "Tajweed",
  "Quran for Kids",
  "Quran Memorization",
  "Noorani Qaida",
  "Adult Learning",
] as const;

export default function BlogClient({ posts }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 py-12">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent)]/20"
                  : "bg-[var(--color-surface)] text-gray-300 border border-[var(--color-border)] hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guides & articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden flex flex-col hover:border-[var(--color-accent)]/40 transition-all duration-300 hover:shadow-xl group"
            >
              {/* Featured Image */}
              <Link
                href={`/blog/${post.slug}`}
                className="relative h-48 w-full overflow-hidden block bg-[var(--color-black-soft)]"
              >
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-[var(--color-black)]/80 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-[var(--color-accent)] border border-[var(--color-border)]">
                  {post.category}
                </div>
              </Link>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <Clock className="w-3.5 h-3.5 text-[var(--color-sky)]" />
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.publishedAt}</span>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-[var(--color-accent)] transition-colors leading-snug line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Author Info & Read Link */}
                <div className="mt-auto pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-bold text-xs flex items-center justify-center">
                      {post.author.name.charAt(0)}
                    </div>
                    <span className="text-xs text-gray-300 font-medium">
                      {post.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-accent)] hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
          <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No articles found</h3>
          <p className="text-gray-400 text-xs mt-1">
            Try adjusting your search keywords or selecting a different category.
          </p>
        </div>
      )}
    </div>
  );
}
