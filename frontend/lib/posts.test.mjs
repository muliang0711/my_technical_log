import test from "node:test";
import assert from "node:assert/strict";
import { getAllPosts, getTechnicalPosts } from "./posts.js";

test("technical posts include only software development content", () => {
  const posts = getTechnicalPosts();

  assert.ok(posts.length > 0);
  assert.ok(posts.length < getAllPosts().length);
  assert.ok(posts.every((post) => post.category.name === "Software Development"));
});
