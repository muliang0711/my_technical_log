import test from "node:test";
import assert from "node:assert/strict";
import { getAllPosts, getCategoriesWithCounts, getTechnicalPosts } from "./posts.js";

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
