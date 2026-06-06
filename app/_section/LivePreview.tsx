"use client";

import type { CSSProperties } from "react";
import type { CardStudioState } from "../types";

function cardStyle(state: CardStudioState): CSSProperties {
  const forced = state.previewState;
  const isDisabled = state.disabled || forced === "disabled";
  const isHovered = forced === "hover";
  const isFocused = forced === "focus";
  const isActive = forced === "active";
  return {
    width: state.width,
    minHeight: state.minHeight,
    padding: state.padding,
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${isFocused || state.selected ? state.accent : state.border}`,
    boxShadow: isFocused
      ? `0 0 0 ${state.focusRing}px ${state.accent}, 0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`
      : isHovered
        ? `0 ${Math.round(state.shadow / 2)}px ${state.shadow + state.hoverLift}px rgba(0,0,0,.36)`
        : `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: isDisabled ? 0.55 : 1,
    outline: "none",
    transform: isActive
      ? "translateY(1px) scale(0.99)"
      : isHovered && state.motion
        ? `translateY(-${state.hoverLift}px)`
        : "none",
    transition: state.motion ? "all 180ms ease" : "none",
    cursor: isDisabled ? "not-allowed" : state.interactive ? "pointer" : "default",
    pointerEvents: isDisabled ? "none" : "auto",
  };
}

function mediaStyle(state: CardStudioState): CSSProperties {
  return {
    borderColor: state.border,
    minHeight: state.mediaPlacement === "background" ? "100%" : undefined,
  };
}

function mediaNode(state: CardStudioState) {
  if (!state.showMedia) return null;

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      data-audit="card-media"
      data-testid="card-media"
      style={mediaStyle(state)}
    >
      <div
        role="img"
        aria-label={state.mediaAlt}
        className="h-36 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${state.mediaUrl})`,
          minHeight: state.mediaPlacement === "background" ? state.minHeight - state.padding * 2 : undefined,
        }}
      />
    </div>
  );
}

export default function LivePreview({ state }: { state: CardStudioState }) {
  const pills = Array.from({ length: state.itemCount }, (_, index) => `Metric ${index + 1}`);
  const media = mediaNode(state);
  const content = (
    <div className="grid gap-3" data-audit="card-content" data-testid="card-content">
      <div className="flex items-center justify-between gap-3" data-audit="card-header">
        <span className="text-xs uppercase tracking-[0.18em]" style={{ color: state.muted }}>{state.eyebrow}</span>
        {state.showBadge && <span className="rounded-full px-3 py-1 text-xs font-bold" data-audit="card-badge" data-testid="card-badge" style={{ background: state.accent, color: "#020617" }}>{state.badgeLabel}</span>}
      </div>
      <div data-audit="card-copy">
        <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </div>
      <div className="rounded-2xl border p-4" data-audit="card-stat" data-testid="card-stat" style={{ borderColor: state.border }}>
        <strong style={{ fontSize: state.titleSize }}>{state.statValue}</strong>
        <p style={{ color: state.muted }}>{state.statLabel}</p>
      </div>
      <div className="flex flex-wrap gap-2" data-audit="card-pills" data-testid="card-pills">
        {pills.map((pill) => <span key={pill} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: state.border, color: state.accent }}>{pill}</span>)}
      </div>
      {state.showActions && (
        <div
          className={state.actionLayout === "stacked" ? "grid gap-2" : state.actionLayout === "split" ? "flex flex-wrap justify-between gap-2" : "flex flex-wrap gap-2"}
          data-audit="card-actions"
          data-testid="card-actions"
        >
          <button type="button" disabled={state.disabled || state.previewState === "disabled"} className="rounded-xl px-4 py-2 text-sm font-bold disabled:cursor-not-allowed" style={{ background: state.accent, color: "#020617" }}>{state.primaryAction}</button>
          <button type="button" disabled={state.disabled || state.previewState === "disabled"} className="rounded-xl border px-4 py-2 text-sm font-bold disabled:cursor-not-allowed" style={{ borderColor: state.border, color: state.foreground }}>{state.secondaryAction}</button>
        </div>
      )}
      {state.showFooter && <p className="text-xs" data-audit="card-footer" data-testid="card-footer" style={{ color: state.muted }}>{state.footerText}</p>}
    </div>
  );
  const isSplitMedia = state.showMedia && (state.mediaPlacement === "left" || state.mediaPlacement === "right");

  return (
    <article
      id={state.id}
      role={state.role === "article" ? undefined : state.role}
      aria-label={state.ariaLabel}
      aria-disabled={state.disabled || state.previewState === "disabled" ? true : undefined}
      tabIndex={state.interactive && !(state.disabled || state.previewState === "disabled") ? state.tabIndex : undefined}
      data-audit="live-preview-card"
      data-testid="live-preview-card"
      data-selected={state.selectable ? String(state.selected) : undefined}
      style={cardStyle(state)}
      className={isSplitMedia ? "grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]" : "grid"}
    >
      {state.mediaPlacement === "background" ? (
        <div className="grid gap-4">
          {media}
          {content}
        </div>
      ) : (
        <>
          {state.mediaPlacement === "left" && media}
          <div className="grid gap-4">
            {state.mediaPlacement === "top" && media}
            {content}
          </div>
          {state.mediaPlacement === "right" && media}
        </>
      )}
    </article>
  );
}
