# Technical Log Filter Design

## Goal

Only visible technical categories should appear on the public frontend log surfaces. The visible categories are `Software Development`, `Interesting Tech Questions`, and `Problem Logs`. Other content files remain in `frontend/content` but are hidden from the visible post archive, recent posts, category pages, and generated post routes.

## Approach

Add one centralized helper in `frontend/lib/posts.js` that returns only posts whose normalized category name is in the visible technical category allowlist. Update public frontend consumers to use this helper where they currently use every post.

## Affected Surfaces

- `/logs` should show only visible technical logs.
- The home page recent posts section should use only technical logs.
- Category counts and category detail pages should expose the visible technical category set, including empty technical categories, but should not expose hidden non-technical posts.
- Static post route generation should only generate routes for visible technical posts.

## Verification

Add a small Node test for the post helper so the allowlist filtering rule is enforced independently of the UI. Run the existing test suite, lint, and production build.
