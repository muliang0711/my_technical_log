import React from "react";

export function FlowGraph({ title, nodes = [] }) {
  if (nodes.length === 0) {
    return null;
  }

  return React.createElement(
    "figure",
    { "aria-label": title ?? "Flow diagram", className: "flow-graph" },
    title ? React.createElement("figcaption", null, title) : null,
    React.createElement(
      "div",
      {
        className: "flow-graph__canvas",
        style: { "--flow-node-count": Math.max(nodes.length, 1) }
      },
      React.createElement(
        "ol",
        { className: "flow-graph__nodes" },
        nodes.map((node, index) =>
          React.createElement(
            "li",
            { className: "flow-graph__node", key: node.id },
            React.createElement("span", { className: "flow-graph__index" }, index + 1),
            React.createElement("span", { className: "flow-graph__label" }, node.label),
            node.detail ? React.createElement("small", null, node.detail) : null
          )
        )
      )
    )
  );
}
