# Interesting Tech Questions Log Guide

Use this guide with `rules.md` when the category is `Interesting Tech Questions`.

This category is for interview questions, tricky technical prompts, system design questions, algorithm questions, backend/frontend questions, database questions, and worked solutions.

## Frontmatter

Use this exact category:

```yaml
category: "Interesting Tech Questions"
```

Suggested tags:

- `Interview`
- `System Design`
- `Backend`
- `Scalability`
- `Database`
- `Architecture`
- `Algorithms`
- `Trade-Offs`

## Writing Goal

The article should record the question and teach the reasoning path.

Do not only give the final answer. The value is in showing how to think:

- What is the real question?
- What assumptions must be clarified?
- Why is the naive answer weak?
- What constraints change the design?
- What better strategies exist?
- What answer would be strong in an interview?

## Default Structure

Use this structure for most question logs:

```mdx
Opening paragraph explaining why this question is interesting and what it tests.

## The Question

State the question clearly.

## Short Answer

Give the direct answer first.

## Clarify the Constraints

List the assumptions, traffic scale, data shape, consistency needs, latency target, cost limit, or failure model.

## Naive Strategy

Explain the first obvious answer.

## Why the Naive Strategy Breaks

Explain the bottleneck, correctness problem, operational problem, cost problem, or scaling limit.

## Better Strategy

Present a stronger design or solution.

## Trade-Offs

Compare options and explain what each one sacrifices.

## Interview Takeaway

Explain what the question is really testing.
```

## System Design Question Pattern

For prompts like `How do you build a server to handle massive traffic?`, use this flow:

```mdx
## The Question

How would you design a server-side system to handle extremely large traffic?

## Short Answer

You do not solve massive traffic with one server. You reduce work per request, distribute load, cache hot paths, isolate slow work, protect dependencies, and observe bottlenecks.

## Clarify the Scale

Define request rate, read/write ratio, payload size, latency target, consistency needs, global regions, and failure tolerance.

## Naive Strategy

Explain why simply buying a bigger server, adding more CPU, or increasing database size is only a temporary fix.

## Why It Breaks

Discuss connection limits, database bottlenecks, cache stampedes, hot keys, network limits, deployment risk, and operational visibility.

## Better Strategy

Show layered design: CDN, load balancer, stateless app servers, caching, queues, database partitioning, read replicas, rate limits, backpressure, and observability.

## Trade-Offs

Compare consistency, latency, cost, complexity, and failure recovery.

## Interview Takeaway

The interviewer is testing whether you can break an impossible scale number into constraints, bottlenecks, and staged architecture.
```

## Reasoning Style

Use this pattern when explaining why a strategy is weak:

```mdx
| Strategy | Why It Looks Good | Why It Breaks | Better Direction |
| --- | --- | --- | --- |
| Bigger server | Simple and fast to try | Still has one failure domain and hard limits | Horizontal scaling and load distribution |
| Cache everything | Reduces database reads | Can serve stale data and cause invalidation bugs | Cache only hot, safe, well-owned data |
| Direct database writes | Simple data path | Fails under bursts and slow downstream calls | Queue writes or isolate expensive work |
```

## Quality Rules

- Start from the question, not from the final architecture.
- Make assumptions explicit.
- Include the naive solution and why it is not enough.
- Use constraints to justify the better solution.
- For system design questions, mention bottlenecks and failure modes.
- For coding questions, show edge cases and complexity.
- End with what the question is testing.
