"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import Switch from "@/components/shared/input/Switch";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function ActionsSection({ state, update }: Props) {
  return (
    <SectionCard title="Actions" subtitle="Action slots and interaction affordances.">
      <div className="space-y-4">
      <Switch label="Show actions" checked={state.showActions} onChange={(value) => update("showActions", value)} />
      <Input label="Primary action" value={state.primaryAction} onChange={(value) => update("primaryAction", value)} />
      <Input label="Secondary action" value={state.secondaryAction} onChange={(value) => update("secondaryAction", value)} />
      <Select label="Action layout" value={state.actionLayout} options={[
  "row",
  "stacked",
  "split"
]} onChange={(value) => update("actionLayout", value)} />
    </div>
    </SectionCard>
  );
}
