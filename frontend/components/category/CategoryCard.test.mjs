import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const css = readFileSync(new URL("../../app/globals.css", import.meta.url), "utf8");

describe("CategoryCard layout", () => {
  it("stretches linked category cards to a consistent grid row height", () => {
    assert.match(css, /\.grid\s*{[^}]*align-items:\s*stretch;/s);
    assert.match(css, /\.category-card-link\s*{[^}]*display:\s*block;[^}]*height:\s*100%;/s);
    assert.match(css, /\.category-card\s*{[^}]*height:\s*100%;/s);
  });
});
