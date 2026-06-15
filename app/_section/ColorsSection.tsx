"use client";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import ColorControl from "@/components/shared/color/ColorControl";
import type { CardStudioState } from "../types";

type Props = { state: CardStudioState; update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Shell" subtitle="Card container colors.">
        <ColorControl label="Background" value={state.background} onChange={(v) => update("background", v)} />
        <ColorControl label="Foreground" value={state.foreground} onChange={(v) => update("foreground", v)} />
        <ColorControl label="Accent" value={state.accent} onChange={(v) => update("accent", v)} />
        <ColorControl label="Muted" value={state.muted} onChange={(v) => update("muted", v)} />
        <ColorControl label="Border" value={state.border} onChange={(v) => update("border", v)} />
        <ColorControl label="Hover/focus border" value={state.hoverBorderColor} onChange={(v) => update("hoverBorderColor", v)} />
      </SectionCard>
      <SectionCard title="Header" subtitle="Eyebrow and badge colors.">
        <ColorControl label="Eyebrow text" value={state.eyebrowColor} onChange={(v) => update("eyebrowColor", v)} />
        <ColorControl label="Badge background" value={state.badgeBg} onChange={(v) => update("badgeBg", v)} />
        <ColorControl label="Badge text" value={state.badgeText} onChange={(v) => update("badgeText", v)} />
      </SectionCard>
      <SectionCard title="Metrics & Pills" subtitle="Stat block and metric pill colors.">
        <ColorControl label="Stat border" value={state.statBorder} onChange={(v) => update("statBorder", v)} />
        <ColorControl label="Pill border" value={state.pillBorder} onChange={(v) => update("pillBorder", v)} />
        <ColorControl label="Pill text" value={state.pillColor} onChange={(v) => update("pillColor", v)} />
      </SectionCard>
      <SectionCard title="Actions & Footer" subtitle="Button and footer colors.">
        <ColorControl label="Action background" value={state.actionBg} onChange={(v) => update("actionBg", v)} />
        <ColorControl label="Action text" value={state.actionText} onChange={(v) => update("actionText", v)} />
        <ColorControl label="Secondary background" value={state.secondaryBg} onChange={(v) => update("secondaryBg", v)} />
        <ColorControl label="Stat background" value={state.statBg} onChange={(v) => update("statBg", v)} />
        <ColorControl label="Footer text" value={state.footerColor} onChange={(v) => update("footerColor", v)} />
      </SectionCard>
      <SectionCard title="Hover, selected & media" subtitle="Hover/selected surfaces, media, and overlay.">
        <ColorControl label="Hover background" value={state.hoverBg} onChange={(v) => update("hoverBg", v)} />
        <ColorControl label="Selected background" value={state.selectedBg} onChange={(v) => update("selectedBg", v)} />
        <ColorControl label="Selected border" value={state.selectedBorder} onChange={(v) => update("selectedBorder", v)} />
        <ColorControl label="Media background" value={state.mediaBg} onChange={(v) => update("mediaBg", v)} />
        <ColorControl label="Overlay" value={state.overlayBg} onChange={(v) => update("overlayBg", v)} />
        <ColorControl label="Overlay text" value={state.overlayTextColor} onChange={(v) => update("overlayTextColor", v)} />
      </SectionCard>
      <SectionCard title="Ribbon & skeleton" subtitle="Corner ribbon and loading skeleton.">
        <ColorControl label="Ribbon background" value={state.ribbonBg} onChange={(v) => update("ribbonBg", v)} />
        <ColorControl label="Ribbon text" value={state.ribbonText} onChange={(v) => update("ribbonText", v)} />
        <ColorControl label="Skeleton base" value={state.skeletonBg} onChange={(v) => update("skeletonBg", v)} />
        <ColorControl label="Skeleton highlight" value={state.skeletonHighlight} onChange={(v) => update("skeletonHighlight", v)} />
      </SectionCard>
    </div>
  );
}
