"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Select from "@/components/shared/input/Select";
import Slider from "@/components/shared/input/Slider";
import { SegmentedControl } from "@/components/shared/input/SegmentedControl";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function LayoutSection({ state, update }: Props) {
  return (
    <SectionCard title="Layout" subtitle="Component-native layout rhythm.">
      <div className="space-y-4">
      <Select label="Card mode" value={state.cardMode} options={[
  "article",
  "metric",
  "media",
  "commerce",
  "profile"
]} onChange={(value) => update("cardMode", value)} />
      <SegmentedControl label="Density" value={state.contentDensity} options={[
  {
    "value": "compact",
    "label": "Compact"
  },
  {
    "value": "balanced",
    "label": "Balanced"
  },
  {
    "value": "spacious",
    "label": "Spacious"
  }
]} onChange={(value) => update("contentDensity", value)} />
      <Slider label="Gap" value={state.gap} min={4} max={40} step={1} onChange={(value) => update("gap", value)} />
      <Slider label="Padding" value={state.padding} min={12} max={48} step={1} onChange={(value) => update("padding", value)} />
    </div>
    </SectionCard>
  );
}
