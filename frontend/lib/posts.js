import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { categoryDefinitions, getCategoryDefinition } from "./categories";

const contentDirectory = path.join(process.cwd(), "content");

function slugify(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(value));
}

function normalizeSeries(series) {
  if (!series) {
    return null;
  }

  if (typeof series === "string") {
    return {
      title: series,
      slug: slugify(series),
      order: 0
    };
  }

  const title = series.title ?? series.name;

  if (!title) {
    return null;
  }

  return {
    title,
    slug: series.slug ?? slugify(title),
    order: Number(series.order ?? 0)
  };
}

function normalizePost(filename) {
  const slug = filename.replace(/\.mdx$/, "");
  const fullPath = path.join(contentDirectory, filename);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);
  const category = getCategoryDefinition(data.category);
  const slugger = new GithubSlugger();
  const headings = content
    .split("\n")
    .map((line) => line.match(/^##\s+(.+)$/))
    .filter(Boolean)
    .map((match) => {
      const text = match[1].replace(/[*_`]/g, "").trim();
      return {
        id: slugger.slug(text),
        text
      };
    });

  return {
    slug,
    title: data.title,
    category,
    createdAt: data.createdAt,
    date: formatDate(data.createdAt),
    summary: data.summary,
    readTime: data.readTime,
    tags: data.tags ?? [],
    featured: Boolean(data.featured),
    series: normalizeSeries(data.series),
    headings
  };
}

export function getAllPosts() {
  return fs
    .readdirSync(contentDirectory)
    .filter((filename) => filename.endsWith(".mdx"))
    .map(normalizePost)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostSlugs() {
  return getAllPosts().map((post) => post.slug);
}

export function getPostsByCategorySlug(slug) {
  return getAllPosts().filter((post) => post.category.slug === slug);
}

export function getPostsBySeriesSlug(slug) {
  return getAllPosts()
    .filter((post) => post.series?.slug === slug)
    .sort((a, b) => {
      const orderDelta = a.series.order - b.series.order;

      if (orderDelta !== 0) {
        return orderDelta;
      }

      return new Date(a.createdAt) - new Date(b.createdAt);
    });
}

export function getSeriesSlugs() {
  return Array.from(
    new Set(getAllPosts().map((post) => post.series?.slug).filter(Boolean))
  );
}

export function getSeriesBySlug(slug) {
  const posts = getPostsBySeriesSlug(slug);

  if (posts.length === 0) {
    return null;
  }

  return {
    ...posts[0].series,
    posts,
    count: posts.length
  };
}

export function getAllSeries() {
  return getSeriesSlugs()
    .map(getSeriesBySlug)
    .filter(Boolean)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getSeriesNavigation(post) {
  if (!post.series) {
    return null;
  }

  const posts = getPostsBySeriesSlug(post.series.slug);
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);

  if (currentIndex === -1 || posts.length < 2) {
    return null;
  }

  return {
    series: post.series,
    index: currentIndex + 1,
    total: posts.length,
    previous: posts[currentIndex - 1] ?? null,
    next: posts[currentIndex + 1] ?? null
  };
}

export function getCategoriesWithCounts() {
  const posts = getAllPosts();

  return categoryDefinitions.map((category) => ({
    ...category,
    posts: posts.filter((post) => post.category.name === category.name).length
  }));
}
