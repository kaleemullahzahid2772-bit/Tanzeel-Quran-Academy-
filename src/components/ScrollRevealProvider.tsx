"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Avoid animation on admin routes
    if (pathname?.startsWith("/admin")) return;

    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let scrollDirection: "down" | "up" = "down";

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        scrollDirection = "down";
      } else if (currentScrollY < lastScrollY) {
        scrollDirection = "up";
      }
      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDirection, { passive: true });

    // Select candidate elements to reveal:
    // Sections, cards, feature boxes, testimonial/teacher cards, quran banner, etc.
    const selector = [
      "main section > div",
      "main section > div > div",
      ".reveal-item",
      "[data-reveal]",
    ].join(", ");

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    // Filter out elements that are too small or utility overlays
    const targetElements = elements.filter((el) => {
      // Don't apply to hero slider inner slide track to preserve infinite slider
      if (el.closest(".hero-track") || el.closest("header") || el.closest("nav")) {
        return false;
      }
      return true;
    });

    // Check elements already visible in viewport on initial load
    const windowHeight = window.innerHeight;

    targetElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isAlreadyInView = rect.top < windowHeight * 0.95 && rect.bottom > 0;

      el.classList.add("reveal-element");

      if (isAlreadyInView) {
        // Immediate reveal for above-the-fold content (zero delay, instant LCP)
        el.classList.add("reveal-visible");
      } else {
        // Prepare for scroll reveal
        el.classList.add("reveal-init");
        el.classList.add("reveal-from-down");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            // Apply directional entrance class based on current scroll direction
            if (scrollDirection === "down") {
              el.classList.remove("reveal-from-up");
              el.classList.add("reveal-from-down");
            } else {
              el.classList.remove("reveal-from-down");
              el.classList.add("reveal-from-up");
            }

            // Small rAF to ensure transition triggers smoothly
            requestAnimationFrame(() => {
              el.classList.add("reveal-visible");
            });
          } else {
            // When scrolled far out of view, re-arm so it animates when scrolling back
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight) {
              // Scrolled past upwards -> element is now below viewport
              el.classList.remove("reveal-visible");
              el.classList.remove("reveal-from-up");
              el.classList.add("reveal-from-down");
            } else if (rect.bottom < 0) {
              // Scrolled past downwards -> element is now above viewport
              el.classList.remove("reveal-visible");
              el.classList.remove("reveal-from-down");
              el.classList.add("reveal-from-up");
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.1,
      }
    );

    targetElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
