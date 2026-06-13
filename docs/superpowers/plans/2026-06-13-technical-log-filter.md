# Technical Log Filter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hide non-technical MDX content from public frontend post surfaces while keeping the files in the repository and allowing the technical categories `Software Development`, `Interesting Tech Questions`, and `Problem Logs`.

**Architecture:** Centralize visibility in `frontend/lib/posts.js` with a `getTechnicalPosts()` helper. Replace public listing and route generation consumers with that helper so only the technical category allowlist is visible.

**Tech Stack:** Next.js, MDX content files, Node test runner.

---

### Task 1: Add Technical Post Query

**Files:**
- Modify: `frontend/lib/posts.js`
- Create: `frontend/lib/posts.test.mjs`

- [ ] **Step 1: Write the filter helper test**

Create `frontend/lib/posts.test.mjs` with assertions that `getTechnicalPosts()` returns posts and every returned post has a category name in the visible technical category allowlist.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --test-name-pattern technical` from `frontend`.
Expected: FAIL because `getTechnicalPosts` is not exported yet.

- [ ] **Step 3: Implement the helper**

Add a visible technical category allowlist and export `getTechnicalPosts()` from `frontend/lib/posts.js`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --test-name-pattern technical` from `frontend`.
Expected: PASS.

### Task 2: Apply Filter to Frontend Surfaces

**Files:**
- Modify: `frontend/components/logs/LogsPage.jsx`
- Modify: `frontend/components/home/HomePage.jsx`
- Modify: `frontend/lib/posts.js`
- Modify: `frontend/app/posts/[slug]/page.jsx`

- [ ] **Step 1: Replace public all-post consumers**

Use `getTechnicalPosts()` in logs and home components. Use technical posts for category counts, category detail results, post slugs, and `getPostBySlug()`.

- [ ] **Step 2: Run verification**

Run from `frontend`: `npm test`, `npm run lint`, and `npm run build`.
Expected: all commands complete successfully.
