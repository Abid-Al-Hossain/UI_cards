"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import Slider from "@/components/shared/input/Slider";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function MetadataSection({ state, update }: Props) {
  return (
    <SectionCard title="Metadata" subtitle="Native ids, roles, and machine-readable metadata.">
      <div className="space-y-4">
      <Input label="id" value={state.id} onChange={(value) => update("id", value)} />
      <Input label="aria-label" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} />
      <Select label="Role" value={state.role} options={[
  "article",
  "region",
  "group"
]} onChange={(value) => update("role", value)} />
      <Slider label="tabIndex" value={state.tabIndex} min={0} max={4} step={1} onChange={(value) => update("tabIndex", value)} />
    </div>
    </SectionCard>
  );
}
