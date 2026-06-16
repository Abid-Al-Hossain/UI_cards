"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function BasicsSection({ state, update }: Props) {
  return (
    <SectionCard title="Basics" subtitle="Core identity and buyer-facing copy.">
      <div className="space-y-4">
      <Input label="Title" value={state.title} onChange={(value) => update("title", value)} />
      <Input label="Eyebrow" value={state.eyebrow} onChange={(value) => update("eyebrow", value)} />
      <Input label="Badge label" value={state.badgeLabel} onChange={(value) => update("badgeLabel", value)} />
      <Input label="Stat value" value={state.statValue} onChange={(value) => update("statValue", value)} />
    </div>
    </SectionCard>
  );
}
