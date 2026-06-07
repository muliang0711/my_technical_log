import assert from "node:assert/strict";
import { describe, it } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FlowGraph } from "./FlowGraph.js";

describe("FlowGraph", () => {
  it("renders a titled flow diagram with ordered nodes and no edge summary list", () => {
    const html = renderToStaticMarkup(
      React.createElement(FlowGraph, {
        title: "RAG Answer Flow",
        nodes: [
          { id: "question", label: "User Question" },
          { id: "retrieve", label: "Retrieve Context" },
          { id: "answer", label: "Generate Answer" }
        ]
      })
    );

    assert.match(html, /<figure[^>]*class="flow-graph"/);
    assert.match(html, /<figcaption>RAG Answer Flow<\/figcaption>/);
    assert.match(html, /<span class="flow-graph__index">1<\/span>/);
    assert.match(html, />User Question</);
    assert.match(html, />Retrieve Context</);
    assert.match(html, />Generate Answer</);
    assert.doesNotMatch(html, /flow-graph__edges/);
    assert.doesNotMatch(html, /User Question to Retrieve Context/);
  });

  it("does not render a separate edge summary area", () => {
    const html = renderToStaticMarkup(
      React.createElement(FlowGraph, {
        nodes: [{ id: "client", label: "Client" }]
      })
    );

    assert.match(html, />Client</);
    assert.doesNotMatch(html, /flow-graph__edges/);
  });

  it("renders nothing when no nodes are supplied", () => {
    const html = renderToStaticMarkup(React.createElement(FlowGraph, null));

    assert.equal(html, "");
  });
});
