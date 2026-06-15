import type { CardStudioState } from "../types";

export type ExportPayload = {
  fileName: string;
  mimeType: "text/plain;charset=utf-8";
  content: string;
};

const CSS_TEXT = `
.uif-card{box-sizing:border-box;display:grid;position:relative;overflow:hidden;background-clip:padding-box;-webkit-font-smoothing:antialiased;}
.uif-card *{box-sizing:border-box;}
.uif-card-media{overflow:hidden;border-style:solid;border-width:1px;}
.uif-card-media-visual{width:100%;min-height:144px;background-size:cover;background-position:center;}
.uif-card-body{display:grid;}
.uif-card-header{display:flex;align-items:center;justify-content:space-between;gap:12px;}
.uif-card-eyebrow{text-transform:uppercase;letter-spacing:.18em;font-size:12px;line-height:1.35;}
.uif-card-badge{display:inline-flex;align-items:center;border-radius:999px;padding:4px 12px;font-size:12px;font-weight:700;line-height:1.2;}
.uif-card-title{margin:0;line-height:1.1;}
.uif-card-description{margin:8px 0 0;line-height:1.55;}
.uif-card-stat{display:grid;gap:2px;border-style:solid;}
.uif-card-stat strong{line-height:1.05;}
.uif-card-stat p{margin:0;line-height:1.4;}
.uif-card-pills{display:flex;flex-wrap:wrap;gap:8px;}
.uif-card-pill{display:inline-flex;align-items:center;border-style:solid;border-width:1px;border-radius:999px;padding:4px 12px;font-size:12px;line-height:1.2;}
.uif-card-actions{display:flex;flex-wrap:wrap;gap:8px;}
.uif-card-actions[data-layout='stacked']{display:grid;}
.uif-card-actions[data-layout='split']{justify-content:space-between;}
.uif-card-button{appearance:none;border:0;border-radius:12px;padding:8px 16px;font:inherit;font-size:14px;font-weight:700;line-height:1.2;cursor:pointer;}
.uif-card-button:disabled{cursor:not-allowed;}
.uif-card-secondary{border-style:solid;border-width:1px;background:transparent;}
.uif-card-footer{margin:0;font-size:12px;line-height:1.4;}
.uif-card[data-disabled='true']{pointer-events:none;}
@media (max-width:640px){.uif-card[data-media-layout='left'],.uif-card[data-media-layout='right']{grid-template-columns:1fr!important;}}
@media (prefers-reduced-motion:reduce){.uif-card,.uif-card-button{transition-duration:.01ms!important;}}
`;

const serializeForScript = (value: unknown) =>
  JSON.stringify(value, null, 2)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

export function buildExportPayload(state: CardStudioState, fileName = "cards") : ExportPayload {
  return {
    fileName: `${fileName || "cards"}.jsx`,
    mimeType: "text/plain;charset=utf-8",
    content: buildReactCode(state),
  };
}

export function buildReactCode(state: CardStudioState) {
  return `import * as React from "react";

const CONFIG = ${serializeForScript(state)};

const CSS_TEXT = ${JSON.stringify(CSS_TEXT)};

function getPills() {
  return Array.from({ length: Math.max(0, CONFIG.itemCount) }, (_, index) => "Metric " + (index + 1));
}

function getShadow(isHovered, isFocused) {
  const baseShadow = "0 " + Math.round(CONFIG.shadow / 3) + "px " + CONFIG.shadow + "px rgba(0,0,0,.28)";
  if (isFocused) {
    return "0 0 0 " + CONFIG.focusRingWidth + "px " + CONFIG.focusRingColor + ", " + baseShadow;
  }
  if (isHovered) {
    return "0 " + Math.round(CONFIG.shadow / 2) + "px " + (CONFIG.shadow + CONFIG.hoverLift) + "px rgba(0,0,0,.36)";
  }
  return baseShadow;
}

function getCardStyle(isHovered, isFocused, isActive, isDisabled) {
  return {
    width: CONFIG.width,
    minHeight: CONFIG.minHeight,
    padding: CONFIG.padding,
    gap: CONFIG.gap,
    borderRadius: CONFIG.radius,
    border: CONFIG.borderWidth + "px " + CONFIG.borderStyle + " " + (CONFIG.selected ? CONFIG.selectedBorder : isFocused ? CONFIG.hoverBorderColor : CONFIG.border),
    boxShadow: getShadow(isHovered, isFocused),
    background: CONFIG.selected ? CONFIG.selectedBg : isHovered ? CONFIG.hoverBg : CONFIG.background,
    color: CONFIG.foreground,
    fontFamily: CONFIG.fontFamily,
    opacity: isDisabled ? 0.55 : 1,
    outline: "none",
    transform: isActive ? "translateY(1px) scale(0.99)" : isHovered && CONFIG.motion ? "translateY(-" + CONFIG.hoverLift + "px)" : "none",
    transition: CONFIG.motion ? "all 180ms ease" : "none",
    cursor: isDisabled ? "not-allowed" : CONFIG.interactive ? "pointer" : "default",
    gridTemplateColumns: CONFIG.showMedia && (CONFIG.mediaPlacement === "left" || CONFIG.mediaPlacement === "right") ? "minmax(0,.8fr) minmax(0,1fr)" : undefined,
  };
}

function Media() {
  if (!CONFIG.showMedia) return null;
  const isBackground = CONFIG.mediaPlacement === "background";

  return (
    <div
      className="uif-card-media"
      data-anatomy="media"
      style={{
        position: "relative",
        borderColor: CONFIG.border,
        borderRadius: CONFIG.mediaRadius,
        background: CONFIG.mediaBg,
        minHeight: isBackground ? "100%" : undefined,
      }}
    >
      <div
        className="uif-card-media-visual"
        role="img"
        aria-label={CONFIG.mediaAlt}
        style={{
          backgroundImage: "url(" + CONFIG.mediaUrl + ")",
          aspectRatio: isBackground ? undefined : CONFIG.mediaAspectRatio,
          minHeight: isBackground ? Math.max(120, CONFIG.minHeight - CONFIG.padding * 2) : undefined,
        }}
      />
      {isBackground ? <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: CONFIG.overlayBg, opacity: CONFIG.overlayOpacity }} /> : null}
    </div>
  );
}

function CardBody({ isDisabled, onPrimaryAction, onSecondaryAction }) {
  const pills = getPills();

  return (
    <div className="uif-card-body" data-anatomy="content" style={{ gap: CONFIG.gap }}>
      <div className="uif-card-header" data-anatomy="header">
        <span className="uif-card-eyebrow" style={{ color: CONFIG.eyebrowColor, fontSize: CONFIG.eyebrowSize, fontWeight: CONFIG.eyebrowWeight, textTransform: CONFIG.eyebrowTransform }}>
          {CONFIG.eyebrow}
        </span>
        {CONFIG.showBadge ? (
          <span className="uif-card-badge" data-anatomy="badge" style={{ background: CONFIG.badgeBg, color: CONFIG.badgeText }}>
            {CONFIG.badgeLabel}
          </span>
        ) : null}
      </div>

      <div data-anatomy="copy">
        <h3 className="uif-card-title" style={{ fontSize: CONFIG.titleSize, fontWeight: CONFIG.fontWeight }}>
          {CONFIG.title}
        </h3>
        <p className="uif-card-description" style={{ color: CONFIG.muted, fontSize: CONFIG.bodySize }}>
          {CONFIG.description}
        </p>
      </div>

      <div
        className="uif-card-stat"
        data-anatomy="stat"
        style={{
          borderColor: CONFIG.statBorder,
          background: CONFIG.statBg,
          borderRadius: Math.max(12, CONFIG.radius - 8),
          padding: Math.max(12, Math.round(CONFIG.padding * 0.65)),
        }}
      >
        <strong style={{ fontSize: CONFIG.titleSize }}>{CONFIG.statValue}</strong>
        <p style={{ color: CONFIG.muted }}>{CONFIG.statLabel}</p>
      </div>

      <div className="uif-card-pills" data-anatomy="pills">
        {pills.map((pill) => (
          <span key={pill} className="uif-card-pill" style={{ borderColor: CONFIG.pillBorder, color: CONFIG.pillColor }}>
            {pill}
          </span>
        ))}
      </div>

      {CONFIG.showActions ? (
        <div className="uif-card-actions" data-anatomy="actions" data-layout={CONFIG.actionLayout}>
          <button
            type="button"
            className="uif-card-button"
            disabled={isDisabled}
            onClick={onPrimaryAction}
            style={{ background: CONFIG.actionBg, color: CONFIG.actionText }}
          >
            {CONFIG.primaryAction}
          </button>
          <button
            type="button"
            className="uif-card-button uif-card-secondary"
            disabled={isDisabled}
            onClick={onSecondaryAction}
            style={{ background: CONFIG.secondaryBg, borderColor: CONFIG.border, color: CONFIG.foreground }}
          >
            {CONFIG.secondaryAction}
          </button>
        </div>
      ) : null}

      {CONFIG.showFooter ? (
        <p className="uif-card-footer" data-anatomy="footer" style={{ color: CONFIG.footerColor }}>
          {CONFIG.footerText}
        </p>
      ) : null}
    </div>
  );
}

export default function CardComponent({
  className = "",
  disabled = CONFIG.disabled,
  onPrimaryAction,
  onSecondaryAction,
}) {
  const forcedState = CONFIG.previewState;
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const isDisabled = Boolean(disabled || forcedState === "disabled");
  const isHovered = !isDisabled && (hovered || forcedState === "hover");
  const isFocused = !isDisabled && (focused || forcedState === "focus");
  const isActive = !isDisabled && (active || forcedState === "active");
  const rootClassName = ["uif-card", className].filter(Boolean).join(" ");
  const rootRole = CONFIG.role === "article" ? undefined : CONFIG.role;
  const tabIndex = CONFIG.interactive && !isDisabled ? CONFIG.tabIndex : undefined;
  const isLoading = forcedState === "loading";
  const ribbonPos = CONFIG.ribbonPosition === "top-left" ? { top: 12, left: 12 } : CONFIG.ribbonPosition === "bottom-left" ? { bottom: 12, left: 12 } : CONFIG.ribbonPosition === "bottom-right" ? { bottom: 12, right: 12 } : { top: 12, right: 12 };
  const skeleton = (
    <div style={{ display: "grid", gap: 12 }} aria-hidden="true">
      {[60, 90, 75, 40].map((w, i) => (
        <div key={i} style={{ height: 16, width: w + "%", borderRadius: 999, background: "linear-gradient(90deg, " + CONFIG.skeletonBg + ", " + CONFIG.skeletonHighlight + ", " + CONFIG.skeletonBg + ")" }} />
      ))}
    </div>
  );
  const body = (
    <CardBody
      isDisabled={isDisabled}
      onPrimaryAction={onPrimaryAction}
      onSecondaryAction={onSecondaryAction}
    />
  );

  return (
    <>
      <style>{CSS_TEXT}</style>
      <article
        id={CONFIG.id}
        role={rootRole}
        aria-label={CONFIG.ariaLabel}
        aria-disabled={isDisabled ? true : undefined}
        aria-invalid={forcedState === "invalid" ? true : undefined}
        tabIndex={tabIndex}
        className={rootClassName}
        data-component="cards-component"
        data-anatomy="root"
        data-state={forcedState}
        data-disabled={isDisabled ? "true" : "false"}
        data-selected={CONFIG.selectable ? String(CONFIG.selected) : undefined}
        data-media-layout={CONFIG.mediaPlacement}
        style={getCardStyle(isHovered, isFocused, isActive, isDisabled)}
        onPointerEnter={() => {
          if (!isDisabled) setHovered(true);
        }}
        onPointerLeave={() => {
          setHovered(false);
          setActive(false);
        }}
        onPointerDown={() => {
          if (!isDisabled) setActive(true);
        }}
        onPointerUp={() => setActive(false)}
        onPointerCancel={() => setActive(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setActive(false);
        }}
      >
        {CONFIG.ribbonEnabled ? <span style={{ position: "absolute", zIndex: 10, borderRadius: 999, padding: "4px 10px", fontSize: 12, fontWeight: 700, background: CONFIG.ribbonBg, color: CONFIG.ribbonText, ...ribbonPos }}>{CONFIG.ribbonLabel}</span> : null}
        {isLoading && CONFIG.skeletonEnabled ? skeleton : CONFIG.mediaPlacement === "background" ? (
          <div className="uif-card-body" style={{ gap: CONFIG.gap, color: CONFIG.overlayTextColor }}>
            <Media />
            {body}
          </div>
        ) : (
          <>
            {CONFIG.mediaPlacement === "left" ? <Media /> : null}
            <div className="uif-card-body" style={{ gap: CONFIG.gap }}>
              {CONFIG.mediaPlacement === "top" ? <Media /> : null}
              {body}
            </div>
            {CONFIG.mediaPlacement === "right" ? <Media /> : null}
          </>
        )}
      </article>
    </>
  );
}
`;
}
