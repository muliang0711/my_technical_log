import assert from "node:assert/strict";
import { describe, it } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FlowGraph } from "./FlowGraph.js";

describe("FlowGraph", () => {
  it("renders a titled flow diagram with ordered nodes and edges", () => {
    const html = renderToStaticMarkup(
      React.createElement(FlowGraph, {
        title: "RAG Answer Flow",
        nodes: [
          { id: "question", label: "User Question" },
          { id: "retrieve", label: "Retrieve Context" },
          { id: "answer", label: "Generate Answer" }
        ],
        edges: [
          ["question", "retrieve"],
          ["retrieve", "answer"]
        ]
      })
    );

    assert.match(html, /<figure[^>]*class="flow-graph"/);
    assert.match(html, /<figcaption>RAG Answer Flow<\/figcaption>/);
    assert.match(html, /<span class="flow-graph__index">1<\/span>/);
    assert.match(html, />User Question</);
    assert.match(html, />Retrieve Context</);
    assert.match(html, />Generate Answer</);
    assert.match(html, /User Question to Retrieve Context/);
    assert.match(html, /Retrieve Context to Generate Answer/);
  });

  it("renders readable fallback text for edges with missing node ids", () => {
    const html = renderToStaticMarkup(
      React.createElement(FlowGraph, {
        nodes: [{ id: "client", label: "Client" }],
        edges: [["client", "server"]]
      })
    );

    assert.match(html, /Client to server/);
  });

  it("renders nothing when no nodes are supplied", () => {
    const html = renderToStaticMarkup(React.createElement(FlowGraph, null));

    assert.equal(html, "");
  });
});
