import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const source = readFileSync(new URL("./PostCard.jsx", import.meta.url), "utf8");

describe("PostCard", () => {
  it("uses the whole card as the post detail link", () => {
    assert.match(
      source,
      /<Link\s+className=\{`card post-card \$\{wide \? "post-card--wide" : ""\}`\}\s+href=\{`\/posts\/\$\{post\.slug\}`\}/
    );
    assert.doesNotMatch(source, /<h3>\s*<Link\s+href=\{`\/posts\/\$\{post\.slug\}`\}/);
    assert.match(source, /<SeriesBadge\s+series=\{post\.series\}\s+linked=\{false\}\s+\/>/);
  });
});
