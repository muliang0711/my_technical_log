import React from "react";

function edgeEndpointLabel(nodesById, endpoint) {
  return nodesById.get(endpoint)?.label ?? endpoint;
}

function normalizeEdges(edges) {
  return edges.map((edge) => {
    if (Array.isArray(edge)) {
      return { from: edge[0], to: edge[1], label: edge[2] };
    }

    return edge;
  });
}

export function FlowGraph({ title, nodes = [], edges = [] }) {
  if (nodes.length === 0) {
    return null;
  }

  const nodesById = new Map(nodes.map((node) => [node.id, node]));
  const normalizedEdges = normalizeEdges(edges).filter((edge) => edge?.from && edge?.to);

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
      ),
      normalizedEdges.length > 0
        ? React.createElement(
          "ul",
          { "aria-label": "Flow connections", className: "flow-graph__edges" },
          normalizedEdges.map((edge) => {
            const fromLabel = edgeEndpointLabel(nodesById, edge.from);
            const toLabel = edgeEndpointLabel(nodesById, edge.to);

            return React.createElement(
              "li",
              { key: `${edge.from}-${edge.to}-${edge.label ?? ""}` },
              React.createElement("span", null, `${fromLabel} to ${toLabel}`),
              edge.label ? React.createElement("small", null, edge.label) : null
            );
          })
        )
        : null
    )
  );
}
