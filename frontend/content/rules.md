# Knowledge Log MDX Writing Rules

Use this file as prompt context when asking an AI to create a new log for this project.

The goal is not to write a generic blog post. The goal is to produce a practical, readable knowledge log that can be saved directly as an `.mdx` file in `frontend/content/`.

## AI Task

When asked to create a log, generate exactly one complete MDX article.

The answer should include:

- A suggested filename in lowercase kebab-case.
- The full `.mdx` content.
- No extra commentary inside the MDX file.

The MDX must be ready to paste into `frontend/content/<filename>.mdx`.

## Bilingual Requirement

Every new log must include two body versions:

- English: `<Lang lang="en">`
- Chinese: `<Lang lang="zh">`

The frontmatter is written once at the top. Do not duplicate frontmatter for each language.

Use this exact body structure after the closing frontmatter `---`:

````mdx
<Lang lang="en">

English opening paragraph.

## Short Answer

English section content.

## The Main Principle

English takeaway.

</Lang>

<Lang lang="zh">

中文开头段落。

## 简短答案

中文章节内容。

## 核心原则

中文总结。

</Lang>
````

Bilingual rules:

- Do not put `<Lang>` inside frontmatter.
- Do not write English and Chinese paragraphs mixed together in the same section.
- The English version must be complete.
- The Chinese version must be complete.
- The Chinese version should be a natural Chinese explanation, not a word-by-word translation.
- Both versions must have a similar section structure.
- Both versions must include at least four `##` headings.
- The website automatically shows a language switcher when both versions exist.
- The Contents sidebar is generated from the selected language's `##` headings.
- Do not add a manual `## Contents` or `## Table of Contents` section.

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
- Do not include dates in filenames unless the date is part of the topic.

## Required Frontmatter

Every log must start at line 1 with YAML frontmatter.

Use this exact shape:

```mdx
---
title: "Clear Article Title"
category: "Software Development"
createdAt: "2026-06-03"
summary: "One concise sentence explaining what the article teaches."
readTime: "8 min read"
tags:
  - "Tag One"
  - "Tag Two"
  - "Tag Three"
featured: false
---
```

For technical backend logs, copy this exact tag block format:

```yaml
tags:
  - "Backend"
  - "HTTP"
  - "Node.js"
  - "System Design"
featured: false
---
```

Critical YAML rule:

Inside frontmatter, lists must use YAML hyphens, not Markdown asterisks.

Correct:

```yaml
tags:
  - "Backend"
  - "HTTP"
  - "Node.js"
  - "System Design"
featured: false
```

Wrong:

```yaml
tags:
* "Backend"
* "HTTP"
* "Node.js"
* "System Design"
  featured: false
```

Rules:

- The first line must be `---`.
- There must be exactly one opening `---` and one closing `---` for frontmatter.
- Do not add a blank frontmatter block.
- Do not add a blank line after `tags:`.
- Do not put `featured` inside `tags`.
- `tags` must be a YAML list.
- Every tag item must start with two spaces, then `-`, for example `  - "Backend"`.
- Follow this exact tag indentation: `tags:` on one line, then `  - "Tag"` on the next lines.
- Never use Markdown bullets such as `* "Backend"` inside frontmatter.
- `featured: false` must be aligned with `tags:`, not indented under `tags`.
- `featured` is usually `false`.
- `createdAt` must use `YYYY-MM-DD`.
- `readTime` must look like `"6 min read"`.
- Do not include an H1 in the body. The app renders the title from frontmatter.

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

Full frontmatter example with series:

```mdx
---
title: "How to Diagnose Server Performance: CPU vs I/O Overhead"
category: "Software Development"
createdAt: "2026-06-03"
summary: "A practical Linux workflow for identifying whether server slowness comes from CPU execution or storage I/O waits."
readTime: "6 min read"
tags:
  - "Linux"
  - "Performance"
  - "Observability"
featured: false
series:
  title: "Server Performance"
  slug: "server-performance"
  order: 1
---
```

## Allowed Categories

Use one exact category name:

- `Software Development`
- `Fitness & Health`
- `Finance`
- `Travel`
- `Life Reflections`
- `Learning`

Category guidance:

- Backend, frontend, infrastructure, database, Linux, performance, programming, architecture: `Software Development`
- Exercise, nutrition, sleep, habits, wellness: `Fitness & Health`
- Investing, budgeting, income, financial planning: `Finance`
- Destinations, culture, travel planning, trip reflections: `Travel`
- Personal growth, philosophy, productivity, reflection: `Life Reflections`
- Study systems, books, courses, note-taking, learning methods: `Learning`

## Writing Voice

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

## Article Structure

Most technical logs should follow this order:

1. Define the concept or problem.
2. Explain how it appears in real systems.
3. Show how to confirm or inspect it.
4. Explain the important signals.
5. Present practical strategies or fixes.
6. End with the main principle or workflow.

Recommended section patterns:

```mdx
## What the Problem Means

## How It Appears in Production

## Confirm the Bottleneck

## Step 1: Identify the Expensive Process

## Step 2: Find the Expensive Query

## Strategy 1: Reduce Unnecessary Work

## Strategy 2: Bound the Request

## A Practical Resolution Workflow

## The Main Principle
```

Rules:

- Use `##` for main sections.
- Use `###` only for subsections.
- The app builds the table of contents from `##` headings.
- Do not add a manual `## Contents` or `## Table of Contents` section inside the MDX.
- The frontend automatically renders the right-side Contents panel from the article's `##` headings.
- Every article must include at least four `##` headings.
- Practical technical articles should usually include five to eight `##` headings.
- Do not write more than three paragraphs in a row without a `##` or `###` heading.
- Do not hide important ideas inside one long paragraph. Turn them into named sections.
- Do not start the body with `# Title`.
- Start the body with a strong opening paragraph.
- End with a practical takeaway, not a vague conclusion.

Bad structure:

```mdx
Opening paragraph...

Long paragraph...

Another long paragraph...

More explanation...
```

Good structure:

```mdx
Opening paragraph...

## What Polling Means

Explain the concept.

## Why Short Polling Creates Waste

Explain the problem.

## How Long Polling Changes the Flow

Explain the alternative.

## When to Use Each Approach

Give a decision rule.
```

## Technical Command Rules

Every command block must have a context sentence immediately before it.

The context sentence must explain:

- Where to run the command.
- Why to run it.
- What it should reveal.

Good pattern:

````mdx
Run this on the affected Linux server to check whether processes are waiting on disk I/O:

```bash
iostat -xz 1 5
```
````

Bad patterns:

- `Run:`
- `Use this command:`
- `Check this:`
- A command block with no explanation before it.

For project commands:

````mdx
Run this from the `frontend` directory to build the static site and catch MDX compile errors:

```bash
npm run build
```
````

For database commands:

````mdx
Run this in PostgreSQL to identify queries with the highest total execution time:

```sql
SELECT
  calls,
  total_exec_time,
  query
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 5;
```
````

After example output, explain the signal:

````mdx
Example output:

```text
CPU   %usr  %sys  %iowait  %idle
all   84.1  10.4      0.3    4.5
```

This suggests CPU pressure because `%usr` is high, `%idle` is low, and `%iowait` is not the dominant value.
````

## Code Fence Rules

Use language labels:

- Shell commands: `bash`
- SQL: `sql`
- JavaScript: `javascript`
- TypeScript: `typescript`
- JSON: `json`
- Logs or terminal output: `text`
- Config snippets: use the closest matching language, or `text`

Rules:

- Close every code fence.
- Do not put very large code blocks in the article.
- Prefer short examples that teach the point.
- Do not put command output in a `bash` block; use `text`.

## Tabbed Code and Log Examples

Use tabbed examples when the same concept needs to be shown in multiple programming languages, such as Java, Go, and Node.js. This keeps the article compact while still giving readers language-specific examples.

Available tab components:

- `<CodeTabs>...</CodeTabs>`
- `<CodeTab label="Java">...</CodeTab>`
- `<CodeTab label="Go">...</CodeTab>`
- `<CodeTab label="Node.js">...</CodeTab>`

Preferred pattern:

````mdx
<CodeTabs>
  <CodeTab label="Java">

```java
logger.info("orderId={} status={}", orderId, status);
```

  </CodeTab>

  <CodeTab label="Go">

```go
log.Printf("orderId=%s status=%s", orderID, status)
```

  </CodeTab>

  <CodeTab label="Node.js">

```javascript
console.log({ orderId, status });
```

  </CodeTab>
</CodeTabs>
````

Tabbed example rules:

- Use tabs only when the examples teach the same idea in different languages or frameworks.
- Keep every tab short and equivalent in purpose.
- Do not use tabs for unrelated examples.
- Put only one code fence inside each `<CodeTab>` unless the comparison genuinely needs more.
- Use accurate code fence labels, for example `java`, `go`, `javascript`, `typescript`, or `text`.
- If the example is log output rather than source code, use `text` inside every tab.
- Do not duplicate a long explanation inside every tab. Explain the principle before or after the tabbed block.

## Table Style

Use normal Markdown tables. The frontend renders them with a styled table component automatically.

Use tables for:

- Comparisons.
- Symptom-to-cause mappings.
- Command output interpretation.
- Trade-off summaries.
- Decision matrices.

Example:

```mdx
| Observation | Likely Direction | Next Check |
| --- | --- | --- |
| High `%usr`, low `%idle` | CPU-bound work | Profile the application process |
| High `%iowait`, high disk latency | I/O-bound work | Inspect database queries and storage |
| Low CPU, slow requests | External waits or locks | Check downstream calls and lock waits |
```

Table rules:

- Keep cells short.
- Do not put long paragraphs inside table cells.
- Explain the important interpretation after the table.
- Use tables to compress repeated patterns, not to decorate the article.

## Card Style

Use cards when a section has several strategies, checks, principles, or trade-offs that should be scanned quickly.

Available MDX components:

- `<Lang lang="en">...</Lang>`
- `<Lang lang="zh">...</Lang>`
- `<CardGrid columns={2}>`
- `<CardGrid columns={3}>`
- `<InfoCard title="...">...</InfoCard>`
- `<CodeTabs>...</CodeTabs>`
- `<CodeTab label="Java">...</CodeTab>`

Preferred strategy pattern:

````mdx
<CardGrid columns={2}>
  <InfoCard title="1. Measure First">
    Identify the process, endpoint, query, or job responsible before changing code.
  </InfoCard>

  <InfoCard title="2. Remove Waste">
    Eliminate duplicate loops, unnecessary transformations, oversized responses, and noisy logging.
  </InfoCard>

  <InfoCard title="3. Bound Work">
    Add pagination, request limits, timeouts, and queue controls so one request cannot consume unlimited resources.
  </InfoCard>

  <InfoCard title="4. Reuse Results">
    Cache or precompute only when freshness, invalidation, and ownership are understood.
  </InfoCard>
</CardGrid>
````

Card rules:

- Use two columns for most articles.
- Use three columns only when card text is very short.
- Give every card a clear title.
- Keep card bodies to one to three sentences.
- Do not put large code blocks inside cards.
- Use cards for summaries; put deep explanation in normal sections.

## Readability Rules

Use these rules to make the log readable:

- Prefer one to three sentences per paragraph.
- Use bullet lists for symptoms, causes, checks, and fixes.
- Use tables when multiple rows share the same shape.
- Use cards when five or more strategies would create too much vertical text.
- Avoid giant sections. Split them with `##` or `###`.
- Avoid repeating the same sentence pattern too many times.
- Do not overuse bold text.
- Keep the opening paragraph concise and useful.

## Common Article Templates

### Diagnostic Technical Log

Use this when the article teaches how to identify a system problem:

```mdx
Opening definition and why the issue matters.

## How the Problem Appears

Symptoms and common false assumptions.

## Confirm the Diagnosis

Commands, metrics, or checks.

## Interpret the Signals

Table or bullets explaining what each signal means.

## Fix the Highest-Impact Cause

Strategies ordered from safest to most invasive.

## The Main Principle

One practical takeaway.
```

### Concept Comparison Log

Use this when comparing two or more ideas:

```mdx
Opening paragraph explaining why the comparison matters.

## Short Answer

Direct practical summary.

## Core Difference

Table comparing the concepts.

## When to Use Each

Bullets or cards.

## Common Mistakes

Warnings and edge cases.

## Decision Rule

Simple selection framework.
```

### Strategy Log

Use this when explaining multiple ways to improve something:

```mdx
Opening paragraph defining the goal.

## What Good Looks Like

Describe the target state.

## Constraints

Explain cost, risk, trade-offs, or prerequisites.

## Strategies

Use cards for quick scanning.

## Implementation Order

Recommended sequence.

## The Main Principle

Final takeaway.
```

## Article Length

Recommended length:

- Short concept note: 700-1,200 words.
- Practical engineering guide: 1,500-2,500 words.
- Deep diagnostic article: 2,500-4,000 words.

If the user asks for a short log, prioritize clarity over completeness.

## Bad Frontmatter Examples

Do not produce these:

```yaml
---

---
title: "Bad Extra Frontmatter Block"
```

```yaml
tags:
  - "Linux"
  featured: false
```

```yaml
tags:
* "Backend"
* "HTTP"
* "Node.js"
* "System Design"
  featured: false
```

Why this is wrong:

- `*` is not valid YAML list syntax here. YAML treats it as an alias marker.
- `featured: false` is incorrectly nested under `tags`.
- There is no two-space indentation before each tag item.
- The correct YAML list marker is `-`, not `*`.

Correct version:

```yaml
tags:
  - "Backend"
  - "HTTP"
  - "Node.js"
  - "System Design"
featured: false
---
```

```mdx
title: "Missing Opening Delimiter"
---
```

## Final Validation Checklist

Before returning the MDX, verify:

- The first line is `---`.
- Frontmatter has exactly one opening and one closing `---`.
- `title`, `category`, `createdAt`, `summary`, `readTime`, `tags`, and `featured` exist.
- `category` exactly matches one allowed category.
- `tags` is a YAML list with three to five tags.
- There is no blank line between `tags:` and the first tag.
- Every tag line starts with exactly two spaces and a hyphen: `  - "Tag"`.
- `featured` is not inside `tags`.
- `featured: false` is aligned with `tags:`.
- If `series` exists, it has `title`, `slug`, and `order`.
- The body does not include an H1.
- The body has one `<Lang lang="en">` block and one `<Lang lang="zh">` block.
- Each language block is complete and has at least four `##` headings.
- Main sections use `##`.
- Commands have context sentences before them.
- Code fences have language labels and are closed.
- Multi-language examples use `CodeTabs` when tabs save space.
- Tables are short and readable.
- Cards use only `CardGrid` and `InfoCard`.
- The article ends with a practical takeaway.

## Raw MDX Output Preservation Rule

- When generating a complete .mdx article for the user to copy into frontend/content/, the MDX source must be returned inside a single outer fenced code block labelled mdx.
- Do not place the complete MDX article inside a rendered document block, rich-text block, canvas-style block, or any format that may interpret or transform YAML, Markdown, JSX, indentation, or code fences.
