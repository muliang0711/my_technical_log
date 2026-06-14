import test from "node:test";
import assert from "node:assert/strict";
import {
  getAllPosts,
  getCategoriesWithCounts,
  getPostsByCategoryAndSeriesSlug,
  getSeriesByCategorySlug,
  getTechnicalPosts
} from "./posts.js";

test("technical posts include only visible technical categories", () => {
  const posts = getTechnicalPosts();
  const visibleCategories = new Set([
    "Software Development",
    "Interesting Tech Questions",
    "Problem Logs"
  ]);

  assert.ok(posts.length > 0);
  assert.ok(posts.length < getAllPosts().length);
  assert.ok(posts.every((post) => visibleCategories.has(post.category.name)));
});

test("category counts expose the technical category set", () => {
  assert.deepEqual(
    getCategoriesWithCounts().map((category) => category.name),
    ["Software Development", "Interesting Tech Questions", "Problem Logs"]
  );
});

test("category series groups include real series and standalone logs", () => {
  const series = getSeriesByCategorySlug("software");

  assert.ok(series.some((item) => item.slug === "step-by-step-build-your-rag"));
  assert.ok(series.some((item) => item.slug === "standalone"));
  assert.ok(series.every((item) => item.posts.every((post) => post.category.slug === "software")));
});

test("category and series lookup only returns posts matching both scopes", () => {
  const posts = getPostsByCategoryAndSeriesSlug("software", "step-by-step-build-your-rag");

  assert.ok(posts.length > 0);
  assert.ok(posts.every((post) => post.category.slug === "software"));
  assert.ok(posts.every((post) => post.series?.slug === "step-by-step-build-your-rag"));
});
