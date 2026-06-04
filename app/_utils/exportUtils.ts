import type { CardStudioState } from "../types";

export type ExportPayload = {
  fileName: string;
  mimeType: "text/plain;charset=utf-8";
  content: string;
};

export function buildExportPayload(state: CardStudioState, fileName = "cards") : ExportPayload {
  return {
    fileName: `${fileName || "cards"}.jsx`,
    mimeType: "text/plain;charset=utf-8",
    content: buildReactCode(state),
  };
}

export function buildReactCode(state: CardStudioState) {
  return [
    "import * as React from \"react\";",
    "",
    "const state = " + JSON.stringify(state, null, 2) + ";",
    "",
    "export default function CardComponent() {",
    "  return (",
        "    <article",
    "      id={state.id}",
    "      aria-label={state.ariaLabel}",
    "      tabIndex={state.interactive ? state.tabIndex : undefined}",
    "      style={{ width: state.width, minHeight: state.minHeight, padding: state.padding, borderRadius: state.radius, border: `${state.borderWidth}px solid ${state.border}`, boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`, background: state.background, color: state.foreground, fontFamily: state.fontFamily }}",
    "    >",
    "      {state.showBadge && <span style={{ background: state.accent, color: \"#020617\", borderRadius: 999, padding: \"4px 10px\" }}>{state.badgeLabel}</span>}",
    "      <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>",
    "      <p>{state.description}</p>",
    "      <strong>{state.statValue}</strong>",
    "      <p>{state.statLabel}</p>",
    "      {state.showActions && <button type=\"button\">{state.primaryAction}</button>}",
    "    </article>",
    "  );",
    "}",
    "",
  ].join("\n");
}
