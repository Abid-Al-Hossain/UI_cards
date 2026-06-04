"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function HoverSection({ state, update }: Props) {
  return (
    <SectionCard title="Hover" subtitle="Hover behavior that remains native.">
      <Switch label="Interactive card" checked={state.interactive} onChange={(value) => update("interactive", value)} />
      <Slider label="Hover lift" value={state.hoverLift} min={0} max={24} step={1} onChange={(value) => update("hoverLift", value)} />
      <Switch label="Motion safe transition" checked={state.motion} onChange={(value) => update("motion", value)} />
    </SectionCard>
  );
}
