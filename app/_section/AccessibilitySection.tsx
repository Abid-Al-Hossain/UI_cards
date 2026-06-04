"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function AccessibilitySection({ state, update }: Props) {
  return (
    <SectionCard title="Accessibility" subtitle="ARIA, labels, language, and semantic guidance.">
      <Input label="Accessible label" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} />
      <Input label="Media alternative text" value={state.mediaAlt} onChange={(value) => update("mediaAlt", value)} />
      <Select label="Semantic role" value={state.role} options={[
  "article",
  "region",
  "group",
  "presentation"
]} onChange={(value) => update("role", value)} />
    </SectionCard>
  );
}
