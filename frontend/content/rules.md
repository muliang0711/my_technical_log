# Knowledge Log LLM Response Rules

Use this file as the base prompt context when asking an LLM to create a new log for this project.

This file defines what the LLM response must look like. Category-specific writing style lives in separate files:

- `software-development.md`
- `interesting-tech-questions.md`
- `problem-logs.md`

The goal is not to write a generic blog post. The goal is to produce one practical, readable `.mdx` knowledge log that can be saved directly into `frontend/content/`.

## LLM Task Contract

When asked to create a log, generate exactly one complete MDX article.

The response must include only:

1. A suggested filename in lowercase kebab-case.
2. The full `.mdx` source.

Do not add commentary, explanations, summaries, or extra notes outside the required response format.

## Strict Response Format

The final answer must follow this exact shape:

`````text
Filename: article-name.mdx

````mdx
---
title: "Clear Article Title"
category: "Software Development"
createdAt: "2026-06-14"
summary: "One concise sentence explaining what the article teaches."
readTime: "8 min read"
tags:
  - "Backend"
  - "System Design"
  - "Performance"
featured: false
---

<Lang lang="en">

Opening paragraph.

## Short Answer

Direct answer.

## The Main Principle

Practical takeaway.

</Lang>

<Lang lang="zh">

Chinese opening paragraph.

## Short Answer

Chinese direct answer.

## The Main Principle

Chinese practical takeaway.

</Lang>
````
`````

Rules:

- The first line outside the code block must be `Filename: <filename>.mdx`.
- The MDX article must be inside one outer fenced code block labelled `mdx`.
- The outer MDX fence must use four backticks.
- If the MDX article contains inner code blocks, use normal triple-backtick fences inside the outer fence.
- Do not render any part of the article as normal Markdown outside the MDX code block.
- Do not use canvas, document blocks, rich text blocks, or split code blocks.

## File Naming

Use lowercase kebab-case filenames:

```text
server-performance-analysis.mdx
long-polling-vs-short-polling.mdx
sql-vs-nosql.mdx
```

Rules:

- Use `.mdx`, not `.md`.
- The filename becomes the URL slug.
- Keep filenames short but clear.
- Do not include dates unless the date is part of the topic.

## Required Frontmatter

Every log must start at line 1 with YAML frontmatter.

Required shape:

```mdx
---
title: "Clear Article Title"
category: "Software Development"
createdAt: "2026-06-14"
summary: "One concise sentence explaining what the article teaches."
readTime: "8 min read"
tags:
  - "Tag One"
  - "Tag Two"
  - "Tag Three"
featured: false
---
```

Rules:

- The first line of the MDX must be `---`.
- Use exactly one opening `---` and one closing `---` for frontmatter.
- `title`, `category`, `createdAt`, `summary`, `readTime`, `tags`, and `featured` are required.
- `createdAt` must use `YYYY-MM-DD`.
- `readTime` must look like `"6 min read"`.
- `featured` is usually `false`.
- Do not include an H1 in the body. The app renders the title from frontmatter.
- Do not add a blank frontmatter block.

## Category Selection

Use one exact category name:

- `Software Development`
- `Interesting Tech Questions`
- `Problem Logs`

Category guide files:

| Category | Guide File | Use When |
| --- | --- | --- |
| `Software Development` | `software-development.md` | The log explains a reusable technical concept, architecture pattern, implementation guide, infrastructure topic, or performance technique |
| `Interesting Tech Questions` | `interesting-tech-questions.md` | The log records an interview question, system-design prompt, tricky technical question, or worked solution |
| `Problem Logs` | `problem-logs.md` | The log records a real problem encountered during development, debugging, deployment, or maintenance |

Frontend visibility rule:

- The public frontend shows only the three categories above.
- Non-technical files may remain in `frontend/content/`, but new visible logs should use one of the three categories above.

## YAML Rules

Inside frontmatter, lists must use YAML hyphens, not Markdown asterisks.

Correct:

```yaml
tags:
  - "Backend"
  - "HTTP"
  - "Node.js"
featured: false
```

Wrong:

```yaml
tags:
* "Backend"
* "HTTP"
* "Node.js"
  featured: false
```

Rules:

- Do not add a blank line after `tags:`.
- `tags` must be a YAML list.
- Use three to five tags.
- Every tag item must start with exactly two spaces, then `-`, for example `  - "Backend"`.
- `featured: false` must be aligned with `tags:`, not indented under `tags`.
- Never use Markdown bullets such as `* "Backend"` inside frontmatter.

## Optional Series Frontmatter

Use `series` only when the log belongs to an ordered learning sequence.

```yaml
series:
  title: "Server Performance"
  slug: "server-performance"
  order: 1
```

Series rules:

- Use the same `series.title` and `series.slug` for every log in the same sequence.
- Use `series.order` to control previous and next navigation.
- Start `series.order` at `1`.
- Increase the order by one for each next log.
- Omit the entire `series` block for standalone logs.

## Bilingual Requirement

Every new log must include two body versions:

- English: `<Lang lang="en">`
- Chinese: `<Lang lang="zh">`

The frontmatter is written once at the top. Do not duplicate frontmatter for each language.

Required body shape:

````mdx
<Lang lang="en">

English opening paragraph.

## Short Answer

English section content.

## The Main Principle

English takeaway.

</Lang>

<Lang lang="zh">

Chinese opening paragraph.

## Short Answer

Chinese section content.

## The Main Principle

Chinese takeaway.

</Lang>
````

Bilingual rules:

- Do not put `<Lang>` inside frontmatter.
- Do not write English and Chinese paragraphs mixed together in the same section.
- The English version must be complete.
- The Chinese version must be complete.
- The Chinese version should be natural Chinese, not word-by-word translation.
- Both versions must have similar section structure.
- Both versions must include at least four `##` headings.
- Do not add a manual `## Contents` or `## Table of Contents` section.

## MDX Component Rules

Available MDX components:

- `<Lang lang="en">...</Lang>`
- `<Lang lang="zh">...</Lang>`
- `<CardGrid columns={2}>...</CardGrid>`
- `<CardGrid columns={3}>...</CardGrid>`
- `<InfoCard title="...">...</InfoCard>`
- `<CodeTabs>...</CodeTabs>`
- `<CodeTab label="Java">...</CodeTab>`
- `<CodeTab label="Go">...</CodeTab>`
- `<CodeTab label="Node.js">...</CodeTab>`
- `<FlowGraph title="..." nodes={[...]}/>`

Rules:

- Use `CardGrid` only for groups of strategies, checks, principles, or trade-offs.
- Use `FlowGraph` only when a sequence, request path, lifecycle, or architecture flow is clearer visually.
- If the English version uses a `FlowGraph`, the Chinese version must include an equivalent Chinese `FlowGraph`.
- Do not put large code blocks inside cards.

## Code And Command Rules

Every command block must have a context sentence immediately before it.

The context sentence must explain:

- Where to run the command.
- Why to run it.
- What it should reveal.

Good:

````mdx
Run this from the `frontend` directory to build the static site and catch MDX compile errors:

```bash
npm run build
```
````

Bad:

- `Run:`
- `Use this command:`
- A command block with no explanation before it.

Code fence labels:

- Shell commands: `bash`
- SQL: `sql`
- JavaScript: `javascript`
- TypeScript: `typescript`
- JSON: `json`
- Logs or terminal output: `text`
- Config snippets: use the closest matching language, or `text`

Rules:

- Close every code fence.
- Do not put command output in a `bash` block; use `text`.
- Keep code blocks short and focused.

## Structure Rules

Rules:

- Use `##` for main sections.
- Use `###` only for subsections.
- Every article must include at least four `##` headings.
- Practical technical articles should usually include five to eight `##` headings.
- Do not write more than three paragraphs in a row without a `##` or `###` heading.
- Start the body with a strong opening paragraph.
- End with a practical takeaway, not a vague conclusion.

## Voice Rules

Write like a practical engineering notebook.

Tone:

- Direct, calm, and specific.
- Explain the operating principle before giving fixes.
- Prefer concrete diagnostics over vague advice.
- Avoid hype, motivational filler, jokes, and marketing language.
- Avoid overpromising. Say what a command or signal suggests, not what it proves.

Reader experience:

- Make the article easy to scan.
- Keep paragraphs short.
- Use sections, tables, cards, and examples to reduce dense text.
- Teach the reader how to think, not only what command to run.

## Final Validation Checklist

Before returning the MDX, verify:

- The first line is `---`.
- Frontmatter has exactly one opening and one closing `---`.
- `title`, `category`, `createdAt`, `summary`, `readTime`, `tags`, and `featured` exist.
- `category` exactly matches one allowed category.
- `tags` is a YAML list with three to five tags.
- There is no blank line between `tags:` and the first tag.
- Every tag line starts with exactly two spaces and a hyphen.
- `featured` is not inside `tags`.
- If `series` exists, it has `title`, `slug`, and `order`.
- The body does not include an H1.
- The body has one `<Lang lang="en">` block and one `<Lang lang="zh">` block.
- Each language block is complete and has at least four `##` headings.
- Commands have context sentences before them.
- Code fences have language labels and are closed.
- Tables are short and readable.
- Cards use only `CardGrid` and `InfoCard`.
- The article ends with a practical takeaway.
