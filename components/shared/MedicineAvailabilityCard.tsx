import type { SearchResult, StockStatus } from "@/types";
import { StockFreshnessBadge } from "@/components/shared/StockFreshnessBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Phone,
  ShieldCheck,
  Info,
} from "lucide-react";

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? "" : "s"} ago`;
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString("en-NG", { day: "numeric", month: "short" }) +
    " at " +
    date.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" });
}

const STOCK_STATUS_CONFIG: Record<StockStatus, { label: string; className: string }> = {
  IN_STOCK: { label: "In Stock", className: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  LOW_STOCK: { label: "Low Stock", className: "text-amber-700 bg-amber-50 border-amber-200" },
  OUT_OF_STOCK: { label: "Out of Stock", className: "text-red-700 bg-red-50 border-red-200" },
};

interface MedicineAvailabilityCardProps {
  result: SearchResult;
}

export function MedicineAvailabilityCard({ result }: MedicineAvailabilityCardProps) {
  const stockCfg = STOCK_STATUS_CONFIG[result.stockStatus];
  const isOld = result.freshness === "OLD";
  const isOutOfStock = result.stockStatus === "OUT_OF_STOCK";

  return (
    <article
      className={cn(
        "bg-white rounded-xl border shadow-sm overflow-hidden transition-shadow hover:shadow-md",
        isOld && "border-amber-200"
      )}
      aria-label={`${result.pharmacyName} — ${result.medicineName}`}
    >
      {/* Related badge */}
      {result.matchType === "RELATED" && (
        <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 flex items-center gap-2 text-xs text-blue-700 font-medium">
          <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          Related product — same active ingredient ({result.activeIngredient})
        </div>
      )}

      {/* Stale stock warning banner */}
      {isOld && !isOutOfStock && (
        <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-center gap-2 text-xs text-amber-700">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          Availability may have changed. Calling ahead is recommended.
        </div>
      )}

      <div className="p-4 sm:p-5">
        {/* Pharmacy header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900 text-base">{result.pharmacyName}</h3>
              {result.verified && (
                <span
                  className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 font-medium"
                  title="Verified pharmacy"
                >
                  <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                {result.distanceKm} km away
              </span>
              <span
                className={cn(
                  "flex items-center gap-1 font-medium",
                  result.isOpen ? "text-emerald-600" : "text-red-500"
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    result.isOpen ? "bg-emerald-500" : "bg-red-400"
                  )}
                  aria-hidden="true"
                />
                {result.isOpen ? "Open" : "Closed"}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-bold text-emerald-700">₦{result.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Medicine info */}
        <div className="bg-gray-50 rounded-lg px-4 py-3 mb-3">
          <p className="font-semibold text-gray-900 text-sm">
            {result.genericName} {result.strength}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {result.brand} · {result.dosageForm}
            {result.requiresPrescription && (
              <span className="ml-2 text-amber-600 font-medium">· Prescription Required</span>
            )}
          </p>
        </div>

        {/* Stock info */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "text-xs font-semibold px-2.5 py-1 rounded-full border",
                stockCfg.className
              )}
              aria-label={`Stock status: ${stockCfg.label}`}
            >
              {stockCfg.label}
            </span>
            {!isOutOfStock && (
              <span className="text-sm text-gray-600">
                {result.quantity} pack{result.quantity !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <StockFreshnessBadge freshness={result.freshness} />
        </div>

        {/* Last updated */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {isOld ? (
            <span>
              Last known stock: {result.quantity} packs · Updated{" "}
              {formatTimestamp(result.lastUpdated)}
            </span>
          ) : (
            <span>Updated {formatTimestamp(result.lastUpdated)}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          {isOutOfStock ? (
            <Button
              variant="outline"
              className="flex-1 text-sm h-9 border-gray-200 text-gray-600"
              aria-label={`View ${result.pharmacyName}`}
            >
              View Pharmacy
            </Button>
          ) : isOld ? (
            <>
              <Button
                variant="outline"
                className="flex-1 text-sm h-9"
                aria-label={`View ${result.pharmacyName}`}
              >
                View Pharmacy
              </Button>
              <Button
                variant="outline"
                className="flex-1 text-sm h-9 border-amber-300 text-amber-700 hover:bg-amber-50"
                aria-label={`Ask ${result.pharmacyName} about stock`}
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                Ask Pharmacy
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="flex-1 text-sm h-9"
                aria-label={`View ${result.pharmacyName}`}
              >
                View Pharmacy
              </Button>
              <Button
                className="flex-1 text-sm h-9"
                aria-label={`Reserve ${result.medicineName} at ${result.pharmacyName}`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                Reserve
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
