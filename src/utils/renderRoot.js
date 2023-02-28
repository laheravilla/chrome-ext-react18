import React from "react";
import { createRoot } from "react-dom/client";

export default function renderRoot (component, rootId) {
  const container = document.createElement("div");
  const id = `${rootId}-root`;
  container.id = id;
  document.body.appendChild(container);
  const root = createRoot(container);

  return root.render(component);
};