"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import Switch from "@/components/shared/input/Switch";
import Slider from "@/components/shared/input/Slider";
import type { CardStudioState } from "../types";

type Props = {
  state: CardStudioState;
  update: <K extends keyof CardStudioState>(key: K, value: CardStudioState[K]) => void;
};

export default function MediaSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Media" subtitle="Image/media slots that stay preview and export honest.">
        <Switch label="Show media" checked={state.showMedia} onChange={(value) => update("showMedia", value)} />
        <Select label="Media placement" value={state.mediaPlacement} options={["top", "left", "right", "background"]} onChange={(value) => update("mediaPlacement", value)} />
        <Input label="Media URL" value={state.mediaUrl} onChange={(value) => update("mediaUrl", value)} />
        <Input label="Media alt" value={state.mediaAlt} onChange={(value) => update("mediaAlt", value)} />
        <Slider label="Media radius" value={state.mediaRadius} min={0} max={32} step={1} onChange={(value) => update("mediaRadius", value)} />
        <Select label="Aspect ratio" value={state.mediaAspectRatio} options={["16/9", "4/3", "1/1", "3/2"]} onChange={(value) => update("mediaAspectRatio", value as CardStudioState["mediaAspectRatio"])} />
        <Slider label="Overlay opacity" value={state.overlayOpacity} min={0} max={1} step={0.01} onChange={(value) => update("overlayOpacity", value)} />
      </SectionCard>
      <SectionCard title="Eyebrow typography" subtitle="Eyebrow label sizing and casing.">
        <Slider label="Eyebrow size" value={state.eyebrowSize} min={9} max={18} step={1} onChange={(value) => update("eyebrowSize", value)} />
        <Slider label="Eyebrow weight" value={state.eyebrowWeight} min={400} max={900} step={100} onChange={(value) => update("eyebrowWeight", value)} />
        <Select label="Eyebrow transform" value={state.eyebrowTransform} options={["none", "uppercase", "lowercase"]} onChange={(value) => update("eyebrowTransform", value as CardStudioState["eyebrowTransform"])} />
      </SectionCard>
      <SectionCard title="Ribbon & skeleton" subtitle="Corner ribbon and loading skeleton.">
        <Switch label="Show ribbon" checked={state.ribbonEnabled} onChange={(value) => update("ribbonEnabled", value)} />
        <Input label="Ribbon label" value={state.ribbonLabel} onChange={(value) => update("ribbonLabel", value)} />
        <Select label="Ribbon position" value={state.ribbonPosition} options={["top-left", "top-right", "bottom-left", "bottom-right"]} onChange={(value) => update("ribbonPosition", value as CardStudioState["ribbonPosition"])} />
        <Switch label="Loading skeleton" checked={state.skeletonEnabled} onChange={(value) => update("skeletonEnabled", value)} />
      </SectionCard>
    </div>
  );
}
