# Technical Log Filter Design

## Goal

Only `Software Development` content should appear on the public frontend log surfaces. Other content files remain in `frontend/content` but are hidden from the visible post archive, recent posts, category counts, category pages, and generated post routes.

## Approach

Add one centralized helper in `frontend/lib/posts.js` that returns only posts whose normalized category name is `Software Development`. Update public frontend consumers to use this helper where they currently use every post.

## Affected Surfaces

- `/logs` should show only technical logs.
- The home page recent posts section should use only technical logs.
- Category counts and category detail pages should not expose hidden non-technical posts.
- Static post route generation should only generate routes for visible technical posts.

## Verification

Add a small Node test for the post helper so the filtering rule is enforced independently of the UI. Run the existing test suite, lint, and production build.
