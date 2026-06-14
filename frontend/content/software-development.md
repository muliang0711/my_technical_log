# Software Development Log Guide

Use this guide with `rules.md` when the category is `Software Development`.

This category is for reusable technical knowledge: backend, frontend, infrastructure, databases, Linux, performance, programming, architecture, observability, and system design concepts.

## Frontmatter

Use this exact category:

```yaml
category: "Software Development"
```

Suggested tags:

- `Backend`
- `Frontend`
- `Database`
- `Linux`
- `Performance`
- `System Design`
- `Architecture`
- `Observability`
- `Node.js`
- `HTTP`

## Writing Goal

The article should teach a technical concept or workflow so the reader can reuse it later.

Do not write a diary entry. Write a technical note that explains:

- What the concept or problem means.
- Where it appears in real systems.
- How to inspect, confirm, or reason about it.
- What trade-offs matter.
- What practical workflow or decision rule should be reused.

## Default Structure

Use this structure for most software development logs:

```mdx
Opening paragraph defining the concept and why it matters.

## Short Answer

Give the direct practical summary.

## What the Problem Means

Define the concept clearly.

## How It Appears in Real Systems

Explain where the issue shows up in applications, infrastructure, databases, APIs, or deployments.

## How to Inspect It

Show commands, code, metrics, logs, diagrams, or checks that reveal the issue.

## Important Trade-Offs

Explain cost, complexity, performance, correctness, maintainability, or operational risk.

## Practical Workflow

Give the sequence of decisions or implementation steps.

## The Main Principle

End with the reusable engineering principle.
```

## Good Patterns

Use tables for comparisons:

```mdx
| Option | Good For | Risk |
| --- | --- | --- |
| Cache result | Repeated reads | Stale data |
| Add index | Query filtering | Slower writes |
| Queue work | Long tasks | More moving parts |
```

Use cards for strategies:

````mdx
<CardGrid columns={2}>
  <InfoCard title="Measure First">
    Identify the endpoint, query, process, or job responsible before changing code.
  </InfoCard>

  <InfoCard title="Bound the Work">
    Add limits, pagination, timeouts, and queue controls so one request cannot consume unlimited resources.
  </InfoCard>
</CardGrid>
````

## Quality Rules

- Explain the operating principle before listing commands.
- Prefer concrete examples over broad claims.
- If there is a command, say where to run it and what signal to look for.
- If there is code, explain the important line or data flow.
- If comparing options, state when each option is the right choice.
- End with a workflow or principle the reader can apply again.
