export type SectionId = "presets" | "basics" | "metadata" | "content" | "media" | "actions" | "layout" | "sizing" | "colors" | "border" | "radius" | "shadow" | "typography" | "hover" | "focus" | "states" | "accessibility";

export type CardStudioState = {
  title: string;
  eyebrow: string;
  description: string;
  footerText: string;
  badgeLabel: string;
  statValue: string;
  statLabel: string;
  mediaUrl: string;
  mediaAlt: string;
  primaryAction: string;
  secondaryAction: string;
  id: string;
  ariaLabel: string;
  role: "article" | "region" | "group" | "presentation";
  tabIndex: number;
  cardMode: "article" | "metric" | "media" | "commerce" | "profile";
  contentDensity: "compact" | "balanced" | "spacious";
  actionLayout: "row" | "stacked" | "split";
  mediaPlacement: "top" | "left" | "right" | "background";
  showMedia: boolean;
  showBadge: boolean;
  showFooter: boolean;
  showActions: boolean;
  selectable: boolean;
  selected: boolean;
  disabled: boolean;
  interactive: boolean;
  itemCount: number;
  width: number;
  minHeight: number;
  padding: number;
  gap: number;
  radius: number;
  borderWidth: number;
  shadow: number;
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
  fontFamily: string;
  titleSize: number;
  bodySize: number;
  fontWeight: number;
  hoverLift: number;
  focusRing: number;
  motion: boolean;
  previewState: "default" | "hover" | "focus" | "active" | "disabled" | "invalid" | "loading" | "empty";
};

export type StudioPreset = {
  id: string;
  family: string;
  archetype: string;
  variant: string;
  size: string;
  tags: string[];
  state: CardStudioState;
};

export const SECTIONS: Array<{ id: SectionId; label: string }> = [
  {
    "id": "presets",
    "label": "Presets"
  },
  {
    "id": "basics",
    "label": "Basics"
  },
  {
    "id": "metadata",
    "label": "Metadata"
  },
  {
    "id": "content",
    "label": "Content"
  },
  {
    "id": "media",
    "label": "Media"
  },
  {
    "id": "actions",
    "label": "Actions"
  },
  {
    "id": "layout",
    "label": "Layout"
  },
  {
    "id": "sizing",
    "label": "Sizing"
  },
  {
    "id": "colors",
    "label": "Colors"
  },
  {
    "id": "border",
    "label": "Border"
  },
  {
    "id": "radius",
    "label": "Radius"
  },
  {
    "id": "shadow",
    "label": "Shadow"
  },
  {
    "id": "typography",
    "label": "Typography"
  },
  {
    "id": "hover",
    "label": "Hover"
  },
  {
    "id": "focus",
    "label": "Focus"
  },
  {
    "id": "states",
    "label": "State Preview"
  },
  {
    "id": "accessibility",
    "label": "Accessibility"
  }
];
