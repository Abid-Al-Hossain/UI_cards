"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function SizingSection({ state, update }: Props) {
  return (
    <SectionCard title="Sizing" subtitle="Width, height, and scale controls.">
      <div className="space-y-4">
      <Slider label="Width" value={state.width} min={260} max={720} step={1} onChange={(value) => update("width", value)} />
      <Slider label="Min height" value={state.minHeight} min={160} max={560} step={1} onChange={(value) => update("minHeight", value)} />
    </div>
    </SectionCard>
  );
}
