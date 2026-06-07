# Knowledge Log Frontend

Dark personal knowledge blog frontend matching the provided Figma-style reference.

## Writing Posts

Create a new `.mdx` file in `content/`:

```mdx
---
title: "Long Polling vs Short Polling"
category: "Software Development"
createdAt: "2026-06-03"
summary: "Understanding how clients receive status updates."
readTime: "6 min read"
tags:
  - "Backend"
  - "HTTP"
featured: false
---

Your article content here.
```

The filename becomes the URL slug. For example:

`content/long-polling-vs-short-polling.mdx` becomes `/posts/long-polling-vs-short-polling`.

### Flow Diagrams

Use `FlowGraph` when a log needs a simple process or architecture flow. Keep diagrams short: 3-6 nodes usually reads best.

```mdx
<FlowGraph
  title="RAG Answer Flow"
  nodes={[
    { id: "question", label: "User Question", detail: "What the user asks" },
    { id: "retrieve", label: "Retrieve Context", detail: "Find relevant chunks" },
    { id: "answer", label: "Generate Answer", detail: "Use context to respond" }
  ]}
  edges={[
    ["question", "retrieve"],
    ["retrieve", "answer"]
  ]}
/>
```

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run lint
npm run build
npm audit
```

`npm run build` uses Next static export and writes deployable HTML/CSS/JS files to `out/`.
