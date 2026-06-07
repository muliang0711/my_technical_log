import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const source = readFileSync(new URL("../../mdx-components.js", import.meta.url), "utf8");

describe("MDX component registration", () => {
  it("exposes FlowGraph to MDX posts", () => {
    assert.match(source, /import \{ FlowGraph \} from "\.\/components\/mdx\/FlowGraph"/);
    assert.match(source, /\bFlowGraph,/);
  });
});
