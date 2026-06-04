"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function FocusSection({ state, update }: Props) {
  return (
    <SectionCard title="Focus" subtitle="Focus and selected-state affordances.">
      <Slider label="Focus ring" value={state.focusRing} min={0} max={8} step={1} onChange={(value) => update("focusRing", value)} />
      <Switch label="Selectable" checked={state.selectable} onChange={(value) => update("selectable", value)} />
      <Switch label="Selected state" checked={state.selected} onChange={(value) => update("selected", value)} />
    </SectionCard>
  );
}
