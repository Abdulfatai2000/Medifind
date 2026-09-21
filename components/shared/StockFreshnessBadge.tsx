import { cn } from "@/lib/utils";
import type { StockFreshness } from "@/types";

const CONFIG: Record<StockFreshness, { label: string; className: string; dot: string }> = {
  LIVE: {
    label: "LIVE",
    className: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    dot: "bg-emerald-500 animate-pulse",
  },
  FRESH: {
    label: "FRESH",
    className: "bg-green-100 text-green-800 border border-green-200",
    dot: "bg-green-500",
  },
  RECENT: {
    label: "RECENT",
    className: "bg-amber-100 text-amber-800 border border-amber-200",
    dot: "bg-amber-500",
  },
  OLD: {
    label: "OLD",
    className: "bg-gray-100 text-gray-700 border border-gray-200",
    dot: "bg-gray-400",
  },
};

interface StockFreshnessBadgeProps {
  freshness: StockFreshness;
  className?: string;
  showDot?: boolean;
}

export function StockFreshnessBadge({
  freshness,
  className,
  showDot = true,
}: StockFreshnessBadgeProps) {
  const cfg = CONFIG[freshness];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        cfg.className,
        className
      )}
      aria-label={`Stock freshness: ${cfg.label}`}
    >
      {showDot && (
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cfg.dot)} aria-hidden="true" />
      )}
      {cfg.label}
    </span>
  );
}
