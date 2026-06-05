"use client";

import React, { useId, useMemo, useState } from "react";

function normalizeId(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getTabs(children) {
  return React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child, index) => {
      const label = child.props.label ?? child.props.language ?? `Example ${index + 1}`;

      return {
        key: child.key ?? `${label}-${index}`,
        label,
        content: child.props.children
      };
    });
}

export function CodeTab({ children }) {
  return React.createElement(React.Fragment, null, children);
}

export function CodeTabs({ children, ariaLabel = "Code language examples" }) {
  const generatedId = useId();
  const tabs = useMemo(() => getTabs(children), [children]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (tabs.length === 0) {
    return null;
  }

  const boundedActiveIndex = Math.min(activeIndex, tabs.length - 1);

  function focusTab(nextIndex) {
    const tabId = `${generatedId}-${nextIndex}-tab`;
    document.getElementById(tabId)?.focus();
    setActiveIndex(nextIndex);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusTab((boundedActiveIndex + 1) % tabs.length);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab((boundedActiveIndex - 1 + tabs.length) % tabs.length);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusTab(tabs.length - 1);
    }
  }

  return React.createElement(
    "div",
    { className: "mdx-code-tabs" },
    React.createElement(
      "div",
      {
        "aria-label": ariaLabel,
        className: "mdx-code-tabs__tablist",
        onKeyDown: handleKeyDown,
        role: "tablist"
      },
      tabs.map((tab, index) => {
        const selected = index === boundedActiveIndex;
        const safeLabel = normalizeId(tab.label) || `example-${index + 1}`;

        return React.createElement(
          "button",
          {
            "aria-controls": `${generatedId}-${safeLabel}-panel`,
            "aria-selected": selected,
            className: selected
              ? "mdx-code-tabs__tab mdx-code-tabs__tab--active"
              : "mdx-code-tabs__tab",
            id: `${generatedId}-${index}-tab`,
            key: tab.key,
            onClick: () => setActiveIndex(index),
            role: "tab",
            tabIndex: selected ? 0 : -1,
            type: "button"
          },
          tab.label
        );
      })
    ),
    tabs.map((tab, index) => {
      const selected = index === boundedActiveIndex;
      const safeLabel = normalizeId(tab.label) || `example-${index + 1}`;

      return React.createElement(
        "div",
        {
          "aria-labelledby": `${generatedId}-${index}-tab`,
          className: "mdx-code-tabs__panel",
          hidden: !selected,
          id: `${generatedId}-${safeLabel}-panel`,
          key: tab.key,
          role: "tabpanel",
          tabIndex: 0
        },
        tab.content
      );
    })
  );
}
