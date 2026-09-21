"use client";

import { useState, useEffect } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { getMyReservations, cancelReservation } from "@/lib/mock-data";
import { Reservation, ReservationStatus } from "@/types";
import { ReservationStatusBadge } from "@/components/shared/ReservationStatusBadge";
import { ReservationTimeline } from "@/components/shared/ReservationTimeline";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Store, Pill, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "READY" | "COMPLETED" | "CANCELLED">("ACTIVE");
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);

  // Load on mount (to handle any created during this session)
  // Using initial state from getMyReservations
  useEffect(() => {
    // A fetch would normally happen here, but we set it on mount only if it were empty.
    // Since mock data can change, we'll just ignore the lint warning or not use effect for it.
    // For now, let's just use it outside or safely inside.
    const loadData = () => {
      setReservations(getMyReservations());
    };
    loadData();
  }, []);

  function handleCancel(id: string) {
    cancelReservation(id);
    setReservations(getMyReservations());
    setSelectedRes(null);
  }

  const filtered = reservations.filter(r => {
    switch (activeTab) {
      case "ACTIVE":
        return r.status === "PENDING_CONFIRMATION" || r.status === "CONFIRMED";
      case "READY":
        return r.status === "READY_FOR_PICKUP";
      case "COMPLETED":
        return r.status === "COMPLETED";
      case "CANCELLED":
        return r.status === "CANCELLED" || r.status === "REJECTED" || r.status === "EXPIRED";
      default:
        return true;
    }
  });

  return (
    <PageWrapper className="py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Reservations</h1>
          <Button asChild>
            <Link href="/search">Find Medicine</Link>
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 border-b border-gray-200 pb-px">
          {(
            [
              { id: "ACTIVE", label: "Active" },
              { id: "READY", label: "Ready for Pickup" },
              { id: "COMPLETED", label: "Completed" },
              { id: "CANCELLED", label: "Cancelled" },
            ] as { id: "ACTIVE" | "READY" | "COMPLETED" | "CANCELLED"; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((res) => (
              <div 
                key={res.id}
                onClick={() => setSelectedRes(res)}
                className="bg-white rounded-xl border p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col sm:flex-row justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {res.medicine?.name || "Unknown Medicine"}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                        <Store className="w-4 h-4 text-gray-400" />
                        {res.pharmacy?.name || "Unknown Pharmacy"}
                      </p>
                    </div>
                    {/* Mobile status */}
                    <div className="sm:hidden">
                      <ReservationStatusBadge status={res.status} />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                    <p><span className="font-medium text-gray-900">Qty:</span> {res.quantity}</p>
                    <p><span className="font-medium text-gray-900">Total:</span> ₦{res.totalPrice.toLocaleString()}</p>
                    <p className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(res.requestedAt).toLocaleDateString("en-NG", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end justify-between shrink-0">
                  <ReservationStatusBadge status={res.status} />
                  <span className="text-sm text-emerald-600 font-medium mt-4 group-hover:underline">View Details</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-50 border border-dashed rounded-xl py-12 flex flex-col items-center justify-center text-center px-4">
              <Pill className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">No reservations found</h3>
              <p className="text-gray-500 mt-1 max-w-sm">
                You don&apos;t have any reservations in this category. Use the search to find and reserve medicines.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedRes} onOpenChange={(open) => !open && setSelectedRes(null)}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedRes && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Reservation Details</DialogTitle>
                <p className="text-xs text-gray-400 font-mono">Ref: {selectedRes.id.toUpperCase()}</p>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border">
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedRes.medicine?.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedRes.quantity} {selectedRes.quantity === 1 ? 'unit' : 'units'} · ₦{selectedRes.totalPrice.toLocaleString()}
                    </p>
                  </div>
                  <ReservationStatusBadge status={selectedRes.status} />
                </div>

                <div className="space-y-3 px-1">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Pharmacy</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{selectedRes.pharmacy?.name}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{selectedRes.pharmacy?.location}</p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/pharmacy/${selectedRes.pharmacy?.id}`}>View</Link>
                    </Button>
                  </div>
                </div>

                {selectedRes.status === "PENDING_CONFIRMATION" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>
                      The pharmacy has been notified. Please wait for them to confirm availability before visiting.
                    </p>
                  </div>
                )}

                <div className="space-y-3 px-1 pt-2 border-t">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Timeline</h4>
                  <ReservationTimeline reservation={selectedRes} />
                </div>

              </div>
              
              <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2 border-t pt-4">
                {(selectedRes.status === "PENDING_CONFIRMATION" || selectedRes.status === "CONFIRMED") ? (
                  <>
                    <Button variant="destructive" onClick={() => handleCancel(selectedRes.id)}>
                      Cancel Request
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`tel:${selectedRes.pharmacy?.contactPhone}`}>Call Pharmacy</Link>
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="w-full sm:w-auto" onClick={() => setSelectedRes(null)}>
                    Close
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}
