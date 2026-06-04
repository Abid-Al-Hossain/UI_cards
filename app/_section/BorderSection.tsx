"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import ColorControl from "@/components/shared/color/ColorControl";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function BorderSection({ state, update }: Props) {
  return (
    <SectionCard title="Border" subtitle="Border color and weight.">
      <ColorControl label="Border" value={state.border} onChange={(value) => update("border", value)} />
      <Slider label="Border width" value={state.borderWidth} min={0} max={8} step={1} onChange={(value) => update("borderWidth", value)} />
    </SectionCard>
  );
}
