import assert from "node:assert/strict";
import { describe, it } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CodeTab, CodeTabs } from "./CodeTabs.js";

describe("CodeTabs", () => {
  it("renders language tab buttons and keeps only the first panel selected by default", () => {
    const html = renderToStaticMarkup(
      React.createElement(
        CodeTabs,
        null,
        React.createElement(CodeTab, { label: "Java" }, React.createElement("pre", null, "java log")),
        React.createElement(CodeTab, { label: "Go" }, React.createElement("pre", null, "go log")),
        React.createElement(CodeTab, { label: "Node.js" }, React.createElement("pre", null, "node log"))
      )
    );

    assert.match(html, /role="tablist"/);
    assert.match(html, /aria-label="Code language examples"/);
    assert.match(html, />Java</);
    assert.match(html, />Go</);
    assert.match(html, />Node\.js</);
    assert.match(html, /aria-selected="true"[^>]*>Java</);
    assert.match(html, /aria-selected="false"[^>]*>Go</);
    assert.match(html, /hidden=""/);
  });

  it("ignores empty children so MDX whitespace does not create blank tabs", () => {
    const html = renderToStaticMarkup(
      React.createElement(
        CodeTabs,
        null,
        "\n",
        React.createElement(CodeTab, { label: "Go" }, React.createElement("pre", null, "go log")),
        null
      )
    );

    const tabCount = html.match(/role="tab"/g)?.length ?? 0;

    assert.equal(tabCount, 1);
    assert.match(html, />Go</);
  });
});
