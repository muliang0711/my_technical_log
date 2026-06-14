# Problem Logs Guide

Use this guide with `rules.md` when the category is `Problem Logs`.

This category is for real issues encountered while building, debugging, deploying, or maintaining a project.

## Frontmatter

Use this exact category:

```yaml
category: "Problem Logs"
```

Suggested tags:

- `Debugging`
- `Deployment`
- `Frontend`
- `Backend`
- `Build`
- `Next.js`
- `Cloudflare`
- `Database`
- `Root Cause`

## Writing Goal

The article should preserve the debugging story in a useful technical format.

A good problem log answers:

- What issue did we meet?
- Where did it happen?
- What did it look like?
- What did we first assume?
- What evidence changed the direction?
- What was the root cause?
- How was it solved?
- What should we remember next time?

## Default Structure

Use this structure for most problem logs:

```mdx
Opening paragraph naming the problem and context.

## Symptom

Describe what was wrong from the user, developer, build, deploy, or runtime view.

## Context

Describe the stack, environment, file, route, service, deployment target, or recent change involved.

## First Assumption

Record what seemed likely at first and why.

## Debugging Path

Show the checks, commands, logs, diffs, screenshots, or experiments that narrowed the problem.

## Root Cause

Explain the actual cause in concrete technical terms.

## Fix

Describe the change that solved the problem and why it worked.

## Prevention

Explain the test, rule, guardrail, documentation, monitoring check, or workflow that would prevent repeating it.

## The Main Principle

End with the reusable debugging lesson.
```

## Debugging Path Pattern

Use tables when the investigation had several checks:

```mdx
| Check | Result | Meaning |
| --- | --- | --- |
| Rebuilt locally | Failed with the same error | Not a production-only issue |
| Inspected route params | Slug was missing | Route generation was not producing the expected path |
| Checked content metadata | Category did not match allowlist | The post was hidden by filtering logic |
```

Use command context before commands:

````mdx
Run this from the `frontend` directory to confirm whether the static build can generate the affected route:

```bash
npm run build
```
````

## Root Cause Rules

The root cause section must be specific.

Weak:

```text
The app had a bug.
```

Better:

```text
The category page generated all category slugs, but the post query filtered visible posts separately. This allowed routes for hidden categories to exist even though their content should not appear on the frontend.
```

## Prevention Ideas

Choose the prevention that matches the issue:

- Add a regression test.
- Add a build-time validation check.
- Document a content rule.
- Rename a confusing helper.
- Add a type or schema guard.
- Add logging around the failing boundary.
- Add a deployment checklist item.

## Quality Rules

- Separate symptom, assumption, evidence, root cause, and fix.
- Include exact errors when useful, but do not paste huge logs.
- If a wrong assumption wasted time, record it.
- If the fix was small, explain why it worked.
- Do not turn the article into a reflection. Keep it useful for future debugging.
- End with what caused the problem and what was learned.
