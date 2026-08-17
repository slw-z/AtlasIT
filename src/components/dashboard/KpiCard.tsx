import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function KpiCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  delta: number;
  hint: string;
  icon: LucideIcon;
  tone?: "primary" | "accent" | "warning" | "success";
}) {
  const toneRing = {
    primary: "bg-primary/15 text-primary ring-primary/30",
    accent: "bg-accent/15 text-accent ring-accent/30",
    warning: "bg-warning/15 text-warning ring-warning/30",
    success: "bg-success/15 text-success ring-success/30",
  }[tone];

  const positive = delta >= 0;

  return (
    <div className="panel p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className={`grid size-9 place-items-center rounded-lg ring-1 ${toneRing}`}>
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-semibold tracking-tight">{value}</p>
      <div className="mt-3 flex items-center gap-2 text-xs">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
            positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
          }`}
        >
          {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
          {positive ? "+" : ""}
          {delta}%
        </span>
        <span className="text-muted-foreground">{hint}</span>
      </div>
    </div>
  );
}
