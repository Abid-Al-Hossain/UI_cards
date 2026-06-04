"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function RadiusSection({ state, update }: Props) {
  return (
    <SectionCard title="Radius" subtitle="Corner system and shape treatment.">
      <Slider label="Radius" value={state.radius} min={0} max={56} step={1} onChange={(value) => update("radius", value)} />
    </SectionCard>
  );
}
