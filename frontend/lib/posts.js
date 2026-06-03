import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { categoryDefinitions, getCategoryDefinition } from "./categories";

const contentDirectory = path.join(process.cwd(), "content");

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(value));
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

export function getCategoriesWithCounts() {
  const posts = getAllPosts();

  return categoryDefinitions.map((category) => ({
    ...category,
    posts: posts.filter((post) => post.category.name === category.name).length
  }));
}
