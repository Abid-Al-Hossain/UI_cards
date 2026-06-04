"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Select from "@/components/shared/input/Select";
import Switch from "@/components/shared/input/Switch";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function StatesSection({ state, update }: Props) {
  return (
    <SectionCard title="State Preview" subtitle="Forced preview states for QA.">
      <Select label="Preview state" value={state.previewState} options={[
  "default",
  "hover",
  "focus",
  "active",
  "disabled",
  "invalid",
  "loading",
  "empty"
]} onChange={(value) => update("previewState", value)} />
      <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      <Switch label="Show badge" checked={state.showBadge} onChange={(value) => update("showBadge", value)} />
      <Switch label="Show footer" checked={state.showFooter} onChange={(value) => update("showFooter", value)} />
    </SectionCard>
  );
}
