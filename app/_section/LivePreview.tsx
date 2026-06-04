"use client";

import type { CSSProperties } from "react";
import type { CardStudioState } from "../types";

function cardStyle(state: CardStudioState): CSSProperties {
  const forced = state.previewState;
  return {
    width: state.width,
    minHeight: state.minHeight,
    padding: state.padding,
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${forced === "focus" ? state.accent : state.border}`,
    boxShadow: forced === "hover" ? `0 ${Math.round(state.shadow / 2)}px ${state.shadow + state.hoverLift}px rgba(0,0,0,.36)` : `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: state.disabled || forced === "disabled" ? 0.55 : 1,
    outline: forced === "focus" ? `${state.focusRing}px solid ${state.accent}` : "none",
    transform: forced === "hover" && state.motion ? `translateY(-${state.hoverLift}px)` : "none",
    transition: state.motion ? "all 180ms ease" : "none",
  };
}

export default function LivePreview({ state }: { state: CardStudioState }) {
  const pills = Array.from({ length: state.itemCount }, (_, index) => `Metric ${index + 1}`);
  const media = state.showMedia ? (
    <div className="overflow-hidden rounded-2xl border" style={{ borderColor: state.border }}>
      <div role="img" aria-label={state.mediaAlt} className="h-36 w-full bg-cover bg-center" style={{ backgroundImage: `url(${state.mediaUrl})` }} />
    </div>
  ) : null;

  return (
    <article id={state.id} role={state.role === "article" ? undefined : state.role} aria-label={state.ariaLabel} tabIndex={state.interactive ? state.tabIndex : undefined} style={cardStyle(state)} className="grid">
      {state.mediaPlacement === "top" && media}
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.18em]" style={{ color: state.muted }}>{state.eyebrow}</span>
          {state.showBadge && <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: state.accent, color: "#020617" }}>{state.badgeLabel}</span>}
        </div>
        <div>
          <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
          <p style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
        </div>
        <div className="rounded-2xl border p-4" style={{ borderColor: state.border }}>
          <strong style={{ fontSize: state.titleSize }}>{state.statValue}</strong>
          <p style={{ color: state.muted }}>{state.statLabel}</p>
        </div>
        <div className="flex flex-wrap gap-2">{pills.map((pill) => <span key={pill} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: state.border, color: state.accent }}>{pill}</span>)}</div>
        {state.showActions && <div className={state.actionLayout === "stacked" ? "grid gap-2" : "flex flex-wrap gap-2"}><button type="button" className="rounded-xl px-4 py-2 text-sm font-bold" style={{ background: state.accent, color: "#020617" }}>{state.primaryAction}</button><button type="button" className="rounded-xl border px-4 py-2 text-sm font-bold" style={{ borderColor: state.border, color: state.foreground }}>{state.secondaryAction}</button></div>}
        {state.showFooter && <p className="text-xs" style={{ color: state.muted }}>{state.footerText}</p>}
      </div>
    </article>
  );
}
