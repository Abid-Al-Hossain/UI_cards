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

export default function MediaSection({ state, update }: Props) {
  return (
    <SectionCard title="Media" subtitle="Image/media slots that stay preview and export honest.">
      <Switch label="Show media" checked={state.showMedia} onChange={(value) => update("showMedia", value)} />
      <Select label="Media placement" value={state.mediaPlacement} options={[
  "top",
  "left",
  "right",
  "background"
]} onChange={(value) => update("mediaPlacement", value)} />
      <Input label="Media URL" value={state.mediaUrl} onChange={(value) => update("mediaUrl", value)} />
      <Input label="Media alt" value={state.mediaAlt} onChange={(value) => update("mediaAlt", value)} />
    </SectionCard>
  );
}
