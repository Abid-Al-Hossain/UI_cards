"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function ShadowSection({ state, update }: Props) {
  return (
    <SectionCard title="Shadow" subtitle="Depth controls that export as CSS.">
      <Slider label="Shadow" value={state.shadow} min={0} max={80} step={1} onChange={(value) => update("shadow", value)} />
    </SectionCard>
  );
}
