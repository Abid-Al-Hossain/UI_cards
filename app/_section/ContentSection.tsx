"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Slider from "@/components/shared/input/Slider";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function ContentSection({ state, update }: Props) {
  return (
    <SectionCard title="Content" subtitle="Text, labels, and visible content structure.">
      <div className="space-y-4">
      <Input label="Description" value={state.description} onChange={(value) => update("description", value)} />
      <Input label="Stat label" value={state.statLabel} onChange={(value) => update("statLabel", value)} />
      <Input label="Footer text" value={state.footerText} onChange={(value) => update("footerText", value)} />
      <Slider label="Metadata pills" value={state.itemCount} min={1} max={6} step={1} onChange={(value) => update("itemCount", value)} />
    </div>
    </SectionCard>
  );
}
