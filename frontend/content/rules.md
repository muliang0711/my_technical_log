# Knowledge Log MDX Writing Rules

Use this file as the prompt context when asking an AI to generate a new blog post for this project.

## Output Format

Generate exactly one `.mdx` blog post.

The file must start with YAML frontmatter:

```mdx
---
title: "Clear Article Title"
category: "Software Development"
createdAt: "2026-06-03"
summary: "One concise sentence explaining what the article teaches."
readTime: "10 min read"
tags:
  - "Tag One"
  - "Tag Two"
  - "Tag Three"
featured: false
---

Opening paragraph goes here.
```

Rules:

- The first line must be `---`.
- There must be exactly one opening `---` and one closing `---` for frontmatter.
- Do not add blank frontmatter blocks.
- Do not put `featured` inside `tags`.
- Use `.mdx` as the file extension.
- Use lowercase kebab-case filenames, for example `server-performance-analysis.mdx`.
- The filename becomes the URL slug.
- Do not include an H1 (`# Title`) in the body. The app already renders the title from frontmatter.
- Start the body with a strong introductory paragraph.
- Use `##` headings for main sections. These headings become the Table of Contents.
- Use `###` headings only for subsections.
- Use fenced code blocks with language labels where useful.
- Keep all text as normal Markdown/MDX. Do not wrap the article in a React component.
- Use custom MDX components only where they improve scanning: Markdown tables for comparisons, `<CardGrid>` and `<InfoCard>` for compact strategy summaries.

## Allowed Categories

Use one of these exact category names:

- `Software Development`
- `Fitness & Health`
- `Finance`
- `Travel`
- `Life Reflections`
- `Learning`

For technical backend, infrastructure, database, Linux, performance, or programming posts, use:

```yaml
category: "Software Development"
```

## Frontmatter Requirements

Required fields:

- `title`: Clear, specific, title case.
- `category`: One exact category from the allowed list.
- `createdAt`: Date in `YYYY-MM-DD` format.
- `summary`: One sentence, useful for card previews.
- `readTime`: Estimate such as `"8 min read"`.
- `tags`: Three to five short tags.
- `featured`: Usually `false`.

Good example:

```yaml
---
title: "How to Diagnose Server Performance: CPU vs I/O Overhead"
category: "Software Development"
createdAt: "2026-06-03"
summary: "A practical Linux workflow for deciding whether a slow server is limited by CPU processing, disk I/O, or something else."
readTime: "10 min read"
tags:
  - "Linux"
  - "Performance"
  - "Observability"
featured: false
---
```

Bad examples:

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

```mdx
title: "Missing Opening Delimiter"
---
```

## Writing Style

Write in a practical engineering knowledge-log style.

Tone:

- Direct, calm, and technical.
- Explain the operating principle before giving fixes.
- Prefer concrete diagnostics over vague advice.
- Avoid hype, marketing language, and motivational filler.
- Avoid jokes and casual fluff.

Structure:

1. Start with a concise definition of the concept.
2. Explain how the issue appears in production.
3. Show how to confirm the diagnosis with commands, metrics, or examples.
4. Break solutions into numbered or named strategies.
5. Include practical command examples where relevant.
6. Include interpretation notes after command output.
7. End with a clear main principle or workflow.

Preferred section patterns:

```mdx
## Confirm the Bottleneck

## Step 1: Identify the Expensive Process

## Step 2: Find the Expensive Query

## Strategy 1: Reduce Unnecessary Work

## Strategy 2: Bound the Request

## A Practical Resolution Workflow

## The Main Principle
```

## Technical Content Rules

When writing technical posts:

- Use real command names and realistic example output.
- Put shell commands in fenced `bash` blocks.
- Put SQL in fenced `sql` blocks.
- Put JavaScript in fenced `javascript` blocks.
- Put logs or terminal output in fenced `text` blocks.
- After every example output, explain what signals matter.
- Prefer bullet lists for symptoms, causes, and fixes.
- Use tables for comparisons.
- Use cards for strategy lists when five or more strategies would otherwise create too much vertical text.
- Do not claim a tool or command proves more than it actually proves.
- Make diagnosis come before solution.

Example:

````mdx
## Check CPU Utilization

Run:

```bash
mpstat -P ALL 1 5
```

Example output:

```text
CPU   %usr  %sys  %iowait  %idle
all   84.1  10.4      0.3    4.5
```

This suggests CPU pressure because `%usr` is high, `%idle` is low, and `%iowait` is not the dominant value.
````

## Table Style

Use normal Markdown tables. The frontend automatically renders them with the project table style.

Use tables for:

- CPU vs I/O comparisons.
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
| Low CPU, slow requests | External wait or locks | Check downstream calls and lock waits |
```

Rules:

- Keep table cells short.
- Do not put long paragraphs inside table cells.
- Use a paragraph after the table to explain the important interpretation.

## Card Style

Use cards when a section has several related strategies, principles, or checks and the reader should scan them quickly.

Available components:

- `<CardGrid columns={2}>`
- `<CardGrid columns={3}>`
- `<InfoCard title="...">...</InfoCard>`

Preferred pattern for strategy summaries:

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

Rules:

- Use two columns for most technical articles.
- Use three columns only when card text is very short.
- Each card should have a clear title.
- Keep each card body to one to three sentences.
- Do not put large code blocks inside cards.
- Use cards to summarize; put detailed explanation in normal sections before or after the card grid.

## Article Length

Recommended length:

- Short concept note: 700-1,200 words.
- Practical engineering guide: 1,500-2,500 words.
- Deep diagnostic article: 2,500-4,000 words.

Keep paragraphs short. Most paragraphs should be one to three sentences.

## Final Checklist

Before returning the MDX file, verify:

- Frontmatter starts at line 1.
- Frontmatter closes before the article body.
- `title`, `category`, `createdAt`, `summary`, `readTime`, `tags`, and `featured` exist.
- `category` exactly matches an allowed category.
- `tags` is a YAML list.
- The body does not repeat the title as an H1.
- All main sections use `##`.
- Code fences are closed.
- The article ends with a practical takeaway.
