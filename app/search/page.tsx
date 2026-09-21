"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import { Search, MapPin, SlidersHorizontal, Map, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MedicineAvailabilityCard } from "@/components/shared/MedicineAvailabilityCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { Skeleton } from "@/components/ui/skeleton";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { getMockSearchResults } from "@/lib/mock-data";
import type { SearchResult, SearchFilters, SortOption, StockFreshness } from "@/types";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info } from "lucide-react";

// ── Filtering + Sorting logic ────────────────────────────────────────────────

function applyFilters(results: SearchResult[], filters: SearchFilters): SearchResult[] {
  return results.filter((r) => {
    if (filters.inStockOnly && r.stockStatus === "OUT_OF_STOCK") return false;
    if (filters.openNow && !r.isOpen) return false;
    if (filters.maxDistanceKm !== null && r.distanceKm > filters.maxDistanceKm) return false;
    if (filters.maxPrice !== null && r.price > filters.maxPrice) return false;
    if (filters.freshness.length > 0 && !filters.freshness.includes(r.freshness)) return false;
    return true;
  });
}

const FRESHNESS_ORDER: Record<StockFreshness, number> = {
  LIVE: 0,
  FRESH: 1,
  RECENT: 2,
  OLD: 3,
};

function applySort(results: SearchResult[], sort: SortOption): SearchResult[] {
  return [...results].sort((a, b) => {
    switch (sort) {
      case "nearest": return a.distanceKm - b.distanceKm;
      case "lowest_price": return a.price - b.price;
      case "freshest": return FRESHNESS_ORDER[a.freshness] - FRESHNESS_ORDER[b.freshness];
      case "highest_quantity": return b.quantity - a.quantity;
      default: return 0;
    }
  });
}

// ── Sub-components ──────────────────────────────────────────────────────────

function ResultSkeleton() {
  return (
    <div className="bg-white rounded-xl border p-5 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-7 w-20" />
      </div>
      <Skeleton className="h-16 w-full rounded-lg" />
      <div className="flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </div>
    </div>
  );
}

interface FilterPanelProps {
  filters: SearchFilters;
  sort: SortOption;
  onFiltersChange: (f: SearchFilters) => void;
  onSortChange: (s: SortOption) => void;
}

function FilterPanel({ filters, sort, onFiltersChange, onSortChange }: FilterPanelProps) {
  const freshnesOptions: StockFreshness[] = ["LIVE", "FRESH", "RECENT", "OLD"];

  function toggleFreshness(f: StockFreshness) {
    const current = filters.freshness;
    const next = current.includes(f) ? current.filter((x) => x !== f) : [...current, f];
    onFiltersChange({ ...filters, freshness: next });
  }

  return (
    <div className="space-y-5">
      {/* Sort */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Sort By</p>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { value: "nearest", label: "Nearest" },
              { value: "lowest_price", label: "Lowest Price" },
              { value: "freshest", label: "Freshest Stock" },
              { value: "highest_quantity", label: "Most Stock" },
            ] as { value: SortOption; label: string }[]
          ).map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className={cn(
                "px-3 py-2 text-sm rounded-lg border font-medium text-left transition-colors",
                sort === opt.value
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-emerald-400"
              )}
              aria-pressed={sort === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Freshness */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Stock Freshness
        </p>
        <div className="flex flex-wrap gap-2">
          {freshnesOptions.map((f) => (
            <button
              key={f}
              onClick={() => toggleFreshness(f)}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors",
                filters.freshness.includes(f)
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-emerald-400"
              )}
              aria-pressed={filters.freshness.includes(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        {[
          { key: "openNow", label: "Open Now" },
          { key: "inStockOnly", label: "In Stock Only" },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-3 cursor-pointer group">
            <div
              className={cn(
                "relative w-10 h-5 rounded-full transition-colors",
                filters[key as keyof SearchFilters] ? "bg-emerald-600" : "bg-gray-200"
              )}
              onClick={() =>
                onFiltersChange({
                  ...filters,
                  [key]: !filters[key as keyof SearchFilters],
                })
              }
              role="switch"
              aria-checked={!!filters[key as keyof SearchFilters]}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  onFiltersChange({ ...filters, [key]: !filters[key as keyof SearchFilters] });
                }
              }}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform",
                  filters[key as keyof SearchFilters] && "translate-x-5"
                )}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </label>
        ))}
      </div>

      {/* Distance */}
      <div>
        <label
          htmlFor="distance-filter"
          className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block"
        >
          Max Distance: {filters.maxDistanceKm ? `${filters.maxDistanceKm} km` : "Any"}
        </label>
        <input
          id="distance-filter"
          type="range"
          min={1}
          max={20}
          step={1}
          value={filters.maxDistanceKm ?? 20}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              maxDistanceKm: Number(e.target.value) === 20 ? null : Number(e.target.value),
            })
          }
          className="w-full accent-emerald-600"
          aria-valuemin={1}
          aria-valuemax={20}
          aria-valuenow={filters.maxDistanceKm ?? 20}
        />
      </div>
    </div>
  );
}

// ── Mobile Filter Drawer ────────────────────────────────────────────────────

interface MobileFilterDrawerProps extends FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
}

function MobileFilterDrawer({
  isOpen,
  onClose,
  resultCount,
  ...panelProps
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Filters"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative ml-auto w-full max-w-sm bg-white h-full flex flex-col shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-gray-900 text-lg">Filters & Sort</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close filters">
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <FilterPanel {...panelProps} />
        </div>
        <div className="p-4 border-t">
          <Button className="w-full" onClick={onClose}>
            Show {resultCount} result{resultCount !== 1 ? "s" : ""}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Empty States ────────────────────────────────────────────────────────────

function NoExactMatch({ query }: { query: string }) {
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-6 flex items-start gap-3">
      <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="font-semibold text-amber-900">
          We couldn&apos;t find the exact brand near you.
        </p>
        <p className="text-sm text-amber-700 mt-1">
          Showing related products with the same active ingredient as <strong>{query}</strong>.
        </p>
      </div>
    </div>
  );
}

function NoResults({
  query,
  location,
  onReset,
}: {
  query: string;
  location: string;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6 max-w-md mx-auto">
      <div className="bg-gray-100 p-5 rounded-full mb-5">
        <Search className="w-10 h-10 text-gray-400" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">No results found</h2>
      <p className="text-gray-500 mb-2">
        We couldn&apos;t find <strong>{query}</strong> near{" "}
        <strong>{location || "your location"}</strong>.
      </p>
      <p className="text-gray-400 text-sm mb-8">
        Try changing your location, broadening the distance, or searching for a generic name.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button variant="outline" className="flex-1" onClick={onReset}>
          Try Another Search
        </Button>
        <Button className="flex-1">Ask Nearby Pharmacies</Button>
      </div>
    </div>
  );
}

// ── Map Placeholder ─────────────────────────────────────────────────────────

function MapPlaceholder() {
  return (
    <div className="bg-gray-100 rounded-xl flex flex-col items-center justify-center h-full min-h-[400px] text-center p-6 border border-dashed border-gray-300">
      <Map className="w-12 h-12 text-gray-300 mb-3" aria-hidden="true" />
      <p className="text-gray-500 font-medium text-sm">Map view</p>
      <p className="text-gray-400 text-xs mt-1">Available in a future update</p>
    </div>
  );
}

// ── Main Search Page Content ─────────────────────────────────────────────────

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQ = searchParams.get("q") ?? "";
  const initialLocation = searchParams.get("location") ?? "Ile-Ife, Osun";

  const [query, setQuery] = useState(initialQ);
  const [location, setLocation] = useState(initialLocation);
  const [isLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("nearest");
  const [filters, setFilters] = useState<SearchFilters>({
    maxDistanceKm: null,
    maxPrice: null,
    freshness: [],
    openNow: false,
    inStockOnly: false,
  });

  const allResults = useMemo(
    () => getMockSearchResults(),
    [initialQ, initialLocation]
  );

  const filteredResults = useMemo(
    () => applySort(applyFilters(allResults, filters), sort),
    [allResults, filters, sort]
  );

  const exactMatches = filteredResults.filter((r) => r.matchType === "EXACT");
  const relatedMatches = filteredResults.filter((r) => r.matchType === "RELATED");
  const hasExactMatches = exactMatches.length > 0;
  const hasAnyResults = filteredResults.length > 0;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    router.push(`/search?${params.toString()}`);
  }

  function handleReset() {
    setQuery("");
    setLocation("Ile-Ife, Osun");
  }

  // Count active filters
  const activeFilterCount =
    (filters.openNow ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.maxDistanceKm !== null ? 1 : 0) +
    filters.freshness.length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-2"
            role="search"
            aria-label="Medicine search"
          >
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              <Input
                id="search-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Medicine name..."
                className="pl-9 h-10 bg-gray-50 text-sm"
                aria-label="Medicine name"
              />
            </div>
            <div className="relative sm:w-48">
              <MapPin
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              <Input
                id="search-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="pl-9 h-10 bg-gray-50 text-sm"
                aria-label="Location"
              />
            </div>
            <Button type="submit" className="h-10 px-6 shrink-0">
              Search
            </Button>
          </form>

          {/* Result count + filter bar */}
          <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
            <div>
              {initialQ ? (
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">{filteredResults.length}</span>{" "}
                  result{filteredResults.length !== 1 ? "s" : ""} for{" "}
                  <span className="font-semibold">
                    &ldquo;{initialQ}&rdquo;
                  </span>{" "}
                  near <span className="font-medium">{initialLocation}</span>
                </p>
              ) : (
                <p className="text-sm text-gray-500">Enter a medicine to search</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Mobile filters button */}
              <Button
                variant="outline"
                size="sm"
                className="md:hidden flex items-center gap-1.5 h-8 text-xs"
                onClick={() => setMobileFiltersOpen(true)}
                aria-label={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount} active)` : ""}`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-0.5 bg-emerald-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              {/* Mobile map toggle */}
              <Button
                variant="outline"
                size="sm"
                className="sm:hidden flex items-center gap-1.5 h-8 text-xs"
                onClick={() => setShowMap((s) => !s)}
              >
                <Map className="w-3.5 h-3.5" aria-hidden="true" />
                {showMap ? "List" : "Map"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PageWrapper className="py-6 flex-1">
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <aside
            className="hidden md:block w-56 shrink-0"
            aria-label="Search filters"
          >
            <div className="bg-white rounded-xl border p-4 sticky top-32">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 text-sm">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    className="text-xs text-emerald-600 hover:underline"
                    onClick={() =>
                      setFilters({
                        maxDistanceKm: null,
                        maxPrice: null,
                        freshness: [],
                        openNow: false,
                        inStockOnly: false,
                      })
                    }
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FilterPanel
                filters={filters}
                sort={sort}
                onFiltersChange={setFilters}
                onSortChange={setSort}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <ResultSkeleton key={i} />
                ))}
              </div>
            ) : !initialQ ? (
              <div className="flex flex-col items-center text-center py-16 text-gray-500">
                <Search className="w-12 h-12 text-gray-200 mb-4" aria-hidden="true" />
                <p className="font-medium text-gray-700">Search for a medicine above</p>
                <p className="text-sm mt-1 text-gray-400">
                  Enter a medicine name to find nearby pharmacies
                </p>
              </div>
            ) : !hasAnyResults ? (
              <NoResults query={initialQ} location={initialLocation} onReset={handleReset} />
            ) : (
              <div
                className={cn(
                  "flex gap-6",
                  showMap && "flex-col sm:flex-row"
                )}
              >
                {/* Results column */}
                <div className={cn("flex-1 min-w-0", showMap && "sm:w-1/2")}>
                  {/* Exact Matches */}
                  {hasExactMatches ? (
                    <section aria-label="Exact matches">
                      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Exact Matches ({exactMatches.length})
                      </h2>
                      <div className="space-y-4 mb-8">
                        {exactMatches.map((r) => (
                          <MedicineAvailabilityCard key={r.id} result={r} />
                        ))}
                      </div>
                    </section>
                  ) : (
                    <NoExactMatch query={initialQ} />
                  )}

                  {/* Related Products */}
                  {relatedMatches.length > 0 && (
                    <section aria-label="Related products">
                      <div className="flex items-center gap-2 mb-3">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                          Related Products ({relatedMatches.length})
                        </h2>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 text-xs text-blue-700 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>
                          Confirm any medicine substitution with a pharmacist before purchase.
                        </span>
                      </div>
                      <div className="space-y-4">
                        {relatedMatches.map((r) => (
                          <MedicineAvailabilityCard key={r.id} result={r} />
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* Desktop Map Panel */}
                <div className="hidden lg:block w-80 shrink-0">
                  <div className="sticky top-32">
                    <MapPlaceholder />
                  </div>
                </div>

                {/* Mobile Map Toggle */}
                {showMap && (
                  <div className="sm:w-1/2 sm:block hidden">
                    <MapPlaceholder />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </PageWrapper>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        sort={sort}
        onFiltersChange={setFilters}
        onSortChange={setSort}
        resultCount={filteredResults.length}
      />
    </div>
  );
}

// Wrap in Suspense because useSearchParams() requires it
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <PageWrapper className="py-10">
          <LoadingState text="Loading search..." />
        </PageWrapper>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
