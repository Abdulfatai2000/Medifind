"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  isMedicineSaved,
  saveMedicine,
  removeSavedMedicine,
  isPharmacySaved,
  savePharmacy,
  removeSavedPharmacy,
} from "@/lib/store";

// ── Save Medicine Button ──────────────────────────────────────────────────────

interface SaveMedicineButtonProps {
  medicineId: string;
  medicineName: string;
  brand: string;
  strength: string;
  dosageForm: string;
  className?: string;
  size?: "sm" | "md";
}

export function SaveMedicineButton({
  medicineId,
  medicineName,
  brand,
  strength,
  dosageForm,
  className,
  size = "md",
}: SaveMedicineButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isMedicineSaved(medicineId));
  }, [medicineId]);

  function toggle() {
    if (saved) {
      removeSavedMedicine(medicineId);
      setSaved(false);
    } else {
      saveMedicine({ medicineId, medicineName, brand, strength, dosageForm });
      setSaved(true);
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? `Remove ${medicineName} from saved` : `Save ${medicineName}`}
      aria-pressed={saved}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        size === "sm" ? "w-8 h-8" : "w-10 h-10",
        saved
          ? "text-rose-500 bg-rose-50 hover:bg-rose-100"
          : "text-gray-400 bg-gray-100 hover:text-rose-400 hover:bg-rose-50",
        className
      )}
    >
      <Heart
        className={cn(size === "sm" ? "w-4 h-4" : "w-5 h-5", saved && "fill-current")}
        aria-hidden="true"
      />
    </button>
  );
}

// ── Save Pharmacy Button ──────────────────────────────────────────────────────

interface SavePharmacyButtonProps {
  pharmacyId: string;
  pharmacyName: string;
  verified: boolean;
  address: string;
  distanceKm?: number;
  isOpen?: boolean;
  className?: string;
  size?: "sm" | "md";
  label?: boolean;
}

export function SavePharmacyButton({
  pharmacyId,
  pharmacyName,
  verified,
  address,
  distanceKm,
  isOpen,
  className,
  size = "md",
  label = false,
}: SavePharmacyButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isPharmacySaved(pharmacyId));
  }, [pharmacyId]);

  function toggle() {
    if (saved) {
      removeSavedPharmacy(pharmacyId);
      setSaved(false);
    } else {
      savePharmacy({ pharmacyId, pharmacyName, verified, address, distanceKm, isOpen });
      setSaved(true);
    }
  }

  if (label) {
    return (
      <button
        onClick={toggle}
        aria-label={saved ? `Remove ${pharmacyName} from saved` : `Save ${pharmacyName}`}
        aria-pressed={saved}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
          saved
            ? "border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100"
            : "border-gray-200 text-gray-600 bg-white hover:border-rose-200 hover:text-rose-500",
          className
        )}
      >
        <Heart
          className={cn("w-4 h-4", saved && "fill-current")}
          aria-hidden="true"
        />
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? `Remove ${pharmacyName} from saved` : `Save ${pharmacyName}`}
      aria-pressed={saved}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        size === "sm" ? "w-8 h-8" : "w-10 h-10",
        saved
          ? "text-rose-500 bg-rose-50 hover:bg-rose-100"
          : "text-gray-400 bg-gray-100 hover:text-rose-400 hover:bg-rose-50",
        className
      )}
    >
      <Heart
        className={cn(size === "sm" ? "w-4 h-4" : "w-5 h-5", saved && "fill-current")}
        aria-hidden="true"
      />
    </button>
  );
}
