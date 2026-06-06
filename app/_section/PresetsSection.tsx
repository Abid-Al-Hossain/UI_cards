"use client";

import { useMemo, useState } from "react";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { CARD_PRESETS } from "../_data/CardPresets";
import type { StudioPreset } from "../types";

const PAGE_SIZE = 12;

type Props = {
  activePresetId: string | null;
  onApply: (preset: StudioPreset) => void;
};

export default function PresetsSection({ activePresetId, onApply }: Props) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [variant, setVariant] = useState("all");
  const [archetype, setArchetype] = useState("all");
  const [size, setSize] = useState("all");
  const [page, setPage] = useState(0);

  const families = useMemo(() => ["all", ...Array.from(new Set(CARD_PRESETS.map((preset) => preset.family)))], []);
  const variants = useMemo(() => ["all", ...Array.from(new Set(CARD_PRESETS.map((preset) => preset.variant)))], []);
  const archetypes = useMemo(() => ["all", ...Array.from(new Set(CARD_PRESETS.map((preset) => preset.archetype)))], []);
  const sizes = useMemo(() => ["all", ...Array.from(new Set(CARD_PRESETS.map((preset) => preset.size)))], []);
  const search = query.trim().toLowerCase();
  const filtered = useMemo(() => CARD_PRESETS.filter((preset) => {
    if (family !== "all" && preset.family !== family) return false;
    if (variant !== "all" && preset.variant !== variant) return false;
    if (archetype !== "all" && preset.archetype !== archetype) return false;
    if (size !== "all" && preset.size !== size) return false;
    if (!search) return true;

    const haystack = [preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags].join(" ").toLowerCase();
    return haystack.includes(search);
  }), [archetype, family, search, size, variant]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const hasActiveFilters = Boolean(search) || family !== "all" || variant !== "all" || archetype !== "all" || size !== "all";
  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "match" : "matches"}`;

  const resetPage = () => setPage(0);
  const resetFilters = () => {
    setQuery("");
    setFamily("all");
    setVariant("all");
    setArchetype("all");
    setSize("all");
    setPage(0);
  };

  const surprise = () => {
    const source = filtered.length ? filtered : CARD_PRESETS;
    onApply(source[Math.floor(Math.random() * source.length)]);
  };

  return (
    <SectionCard title="Presets" subtitle="Structured full-state presets with search, filters, surprise, pagination, and applied-state highlighting.">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Search presets"
          value={query}
          placeholder="Search family, archetype, variant, or tag"
          onChange={(value) => {
            setQuery(value);
            resetPage();
          }}
        />
        <div className="grid content-end text-xs" style={{ color: "var(--muted)" }} data-audit="preset-result-count" data-testid="preset-result-count">
          {resultLabel} across {CARD_PRESETS.length} presets
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <Select label="Family" value={family} options={families} onChange={(value) => {
          setFamily(value);
          resetPage();
        }} />
        <Select label="Variant" value={variant} options={variants} onChange={(value) => {
          setVariant(value);
          resetPage();
        }} />
        <Select label="Archetype" value={archetype} options={archetypes} onChange={(value) => {
          setArchetype(value);
          resetPage();
        }} />
        <Select label="Size" value={size} options={sizes} onChange={(value) => {
          setSize(value);
          resetPage();
        }} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={resetFilters}
          disabled={!hasActiveFilters}
          className="rounded-xl border px-4 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          data-audit="preset-reset-filters"
          data-testid="preset-reset-filters"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          Reset filters
        </button>
        <button
          type="button"
          onClick={surprise}
          className="rounded-xl border px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
          data-audit="preset-surprise-button"
          data-testid="preset-surprise-button"
          style={{
            borderColor: "color-mix(in oklab, var(--primary) 60%, var(--border))",
            background: "color-mix(in oklab, var(--primary) 16%, transparent)",
            color: "var(--text)",
          }}
        >
          Surprise me
        </button>
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          Presets apply a complete editable state snapshot.
        </span>
      </div>

      <div className="grid gap-3" data-audit="preset-grid" data-testid="preset-grid">
        {visible.length === 0 ? (
          <div
            className="rounded-2xl border p-5 text-sm"
            data-audit="preset-empty-state"
            data-testid="preset-empty-state"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--card) 65%, transparent)",
              color: "var(--muted)",
            }}
          >
            No card presets match the current filters. Reset filters or use Surprise me to jump to a full-state preset.
          </div>
        ) : visible.map((preset) => {
          const isApplied = activePresetId === preset.id;
          return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onApply(preset)}
            aria-pressed={isApplied}
            data-audit="preset-apply-button"
            data-preset-id={preset.id}
            data-applied={isApplied ? "true" : "false"}
            data-testid={`preset-apply-${preset.id}`}
            className="rounded-2xl border p-4 text-left transition hover:bg-white/10"
            style={{
              borderColor: isApplied ? "var(--primary)" : "var(--border)",
              background: isApplied ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)",
              color: "var(--text)",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex flex-wrap items-center gap-2">
              <strong>{preset.archetype}</strong>
              <span className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{preset.variant} / {preset.size}</span>
              </span>
              {isApplied ? <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>Applied</span> : null}
            </div>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{preset.tags.join(", ")}</p>
          </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3" data-audit="preset-pagination" data-testid="preset-pagination">
        <div className="text-xs" style={{ color: "var(--muted)" }}>
          Page {safePage + 1} of {pageCount}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={safePage === 0}
            onClick={() => setPage(Math.max(0, safePage - 1))}
            className="rounded-xl border px-3 py-2 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            data-testid="preset-page-previous"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage(Math.min(pageCount - 1, safePage + 1))}
            className="rounded-xl border px-3 py-2 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            data-testid="preset-page-next"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            Next
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
