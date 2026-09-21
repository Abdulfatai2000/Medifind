"use client";

import { useState } from "react";
import { SearchResult } from "@/types";
import { StockFreshnessBadge } from "@/components/shared/StockFreshnessBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { AlertTriangle, MapPin, Store, Plus, Minus, Info } from "lucide-react";
import { createReservation } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

interface ReservationModalProps {
  result: SearchResult;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReservationModal({ result, open, onOpenChange }: ReservationModalProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isOld = result.freshness === "OLD";
  const maxQty = result.stockStatus !== "OUT_OF_STOCK" && result.quantity > 0 ? result.quantity : 10; // Allow 10 if stock unknown
  
  function handleQuantityChange(delta: number) {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > maxQty) return maxQty;
      return next;
    });
  }

  function handleSubmit() {
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      createReservation({
        // Extract PM ID from "res-pm-1" or fake it if it's not a direct map
        pharmacyMedicineId: result.id.replace('res-', ''), 
        quantity,
        unitPrice: result.price,
        totalPrice: result.price * quantity,
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  }

  function handleClose() {
    onOpenChange(false);
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
        setQuantity(1);
      }, 300);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
              <Info className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl font-bold">Reservation request sent</DialogTitle>
            <DialogDescription className="text-base">
              The pharmacy needs to confirm that the medicine is still available.
            </DialogDescription>
            <div className="flex items-center gap-2 font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-6">
              Status: Pending Confirmation
            </div>
            <div className="w-full space-y-2 mt-4">
              <Button className="w-full" onClick={() => router.push("/reservations")}>
                View My Reservations
              </Button>
              <Button variant="outline" className="w-full" onClick={handleClose}>
                Continue Searching
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Reservation Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Medicine & Pharmacy Info */}
              <div className="space-y-2 border rounded-xl p-4 bg-gray-50/50">
                <div>
                  <h3 className="font-semibold text-gray-900">{result.medicineName}</h3>
                  <p className="text-sm text-gray-500">{result.genericName} {result.strength} · {result.dosageForm}</p>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Store className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{result.pharmacyName}</span>
                  </div>
                  <StockFreshnessBadge freshness={result.freshness} />
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {result.address} ({result.distanceKm} km away)
                </div>
              </div>

              {/* Warning for OLD stock */}
              {isOld && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>
                    This stock information is old and availability may have changed. The pharmacy will confirm your request before it becomes reserved.
                  </p>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-gray-700">Quantity</span>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-6 text-center font-semibold text-gray-900" aria-live="polite">
                      {quantity}
                    </span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= maxQty}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-gray-700">Unit Price</span>
                  <span className="font-semibold">₦{result.price.toLocaleString()}</span>
                </div>
                
                <div className="h-px bg-gray-200" />
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">Estimated Total</span>
                  <span className="font-bold text-emerald-700 text-lg">₦{(result.price * quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Reservation Request"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
