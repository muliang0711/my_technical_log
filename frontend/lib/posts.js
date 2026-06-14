import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { categoryDefinitions, getCategoryDefinition } from "./categories.js";

const contentDirectory = path.join(process.cwd(), "content");
const VISIBLE_TECHNICAL_CATEGORY_NAMES = new Set([
  "Software Development",
  "Interesting Tech Questions",
  "Problem Logs"
]);
const STANDALONE_SERIES = {
  title: "Standalone Logs",
  slug: "standalone",
  order: 0
};

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

function extractHeadings(content) {
  const slugger = new GithubSlugger();
  const headings = {
    en: [],
    zh: []
  };
  let activeLanguage = "en";
  let hasLanguageBlocks = false;

  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    const languageMatch = trimmed.match(/^<Lang\s+lang=["'](en|zh)["']\s*>$/);

    if (languageMatch) {
      activeLanguage = languageMatch[1];
      hasLanguageBlocks = true;
      return;
    }

    if (trimmed === "</Lang>") {
      activeLanguage = "en";
      return;
    }

    const headingMatch = line.trimEnd().match(/^##\s+(.+)$/);

    if (!headingMatch) {
      return;
    }

    const text = headingMatch[1].replace(/[*_`]/g, "").trim();
    const heading = {
      id: slugger.slug(text),
      text
    };

    headings[activeLanguage].push(heading);
  });

  return {
    en: headings.en,
    zh: headings.zh,
    defaultLanguage: hasLanguageBlocks ? "en" : "en",
    hasLanguageBlocks
  };
}

function normalizePost(filename) {
  const slug = filename.replace(/\.mdx$/, "");
  const fullPath = path.join(contentDirectory, filename);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);
  const category = getCategoryDefinition(data.category);
  const headings = extractHeadings(content);

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

export function getTechnicalPosts() {
  return getAllPosts().filter((post) => VISIBLE_TECHNICAL_CATEGORY_NAMES.has(post.category.name));
}

export function getFeaturedPosts() {
  return getTechnicalPosts().filter((post) => post.featured);
}

export function getPostBySlug(slug) {
  return getTechnicalPosts().find((post) => post.slug === slug);
}

export function getPostSlugs() {
  return getTechnicalPosts().map((post) => post.slug);
}

export function getPostsByCategorySlug(slug) {
  return getTechnicalPosts().filter((post) => post.category.slug === slug);
}

function sortSeriesPosts(posts) {
  return [...posts].sort((a, b) => {
    const orderDelta = (a.series?.order ?? 0) - (b.series?.order ?? 0);

    if (orderDelta !== 0) {
      return orderDelta;
    }

    return new Date(a.createdAt) - new Date(b.createdAt);
  });
}

function toSeriesGroup(series, posts) {
  const sortedPosts = sortSeriesPosts(posts);

  return {
    ...series,
    posts: sortedPosts,
    count: sortedPosts.length
  };
}

export function getPostsBySeriesSlug(slug) {
  return getTechnicalPosts()
    .filter((post) => post.series?.slug === slug)
    .sort((a, b) => {
      const orderDelta = a.series.order - b.series.order;

      if (orderDelta !== 0) {
        return orderDelta;
      }

      return new Date(a.createdAt) - new Date(b.createdAt);
    });
}

export function getSeriesByCategorySlug(categorySlug) {
  const posts = getPostsByCategorySlug(categorySlug);
  const groups = new Map();

  posts.forEach((post) => {
    const series = post.series ?? STANDALONE_SERIES;
    const group = groups.get(series.slug) ?? {
      series,
      posts: []
    };

    group.posts.push(post);
    groups.set(series.slug, group);
  });

  return Array.from(groups.values())
    .map((group) => toSeriesGroup(group.series, group.posts))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getCategorySeriesBySlug(categorySlug, seriesSlug) {
  return getSeriesByCategorySlug(categorySlug).find((series) => series.slug === seriesSlug) ?? null;
}

export function getPostsByCategoryAndSeriesSlug(categorySlug, seriesSlug) {
  return getCategorySeriesBySlug(categorySlug, seriesSlug)?.posts ?? [];
}

export function getSeriesSlugs() {
  return Array.from(
    new Set(getTechnicalPosts().map((post) => post.series?.slug).filter(Boolean))
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
  const posts = getTechnicalPosts();

  return categoryDefinitions
    .filter((category) => VISIBLE_TECHNICAL_CATEGORY_NAMES.has(category.name))
    .map((category) => ({
      ...category,
      posts: posts.filter((post) => post.category.name === category.name).length
    }));
}
