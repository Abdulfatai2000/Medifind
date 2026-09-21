/**
 * lib/store.ts
 *
 * Client-side persistence layer for MediFind frontend prototype.
 * All data is persisted to localStorage with structured keys.
 *
 * Designed so Developer 2 can replace each function with API calls
 * without touching any component code.
 */

import type { SavedMedicine, SavedPharmacy, Reservation } from "@/types";

// ── Storage Keys ──────────────────────────────────────────────────────────────

const KEYS = {
  SAVED_MEDICINES: "medifind_saved_medicines",
  SAVED_PHARMACIES: "medifind_saved_pharmacies",
  RESERVATIONS: "medifind_reservations",
} as const;

// ── Generic helpers ───────────────────────────────────────────────────────────

function readStore<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeStore<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Storage quota exceeded or private mode — fail silently
  }
}

// ── Saved Medicines ───────────────────────────────────────────────────────────

export function getSavedMedicines(): SavedMedicine[] {
  return readStore<SavedMedicine>(KEYS.SAVED_MEDICINES);
}

export function isMedicineSaved(medicineId: string): boolean {
  return getSavedMedicines().some((m) => m.medicineId === medicineId);
}

export function saveMedicine(medicine: Omit<SavedMedicine, "id" | "savedAt">): void {
  const existing = getSavedMedicines();
  if (existing.some((m) => m.medicineId === medicine.medicineId)) return;
  const entry: SavedMedicine = {
    ...medicine,
    id: `saved-med-${Date.now()}`,
    savedAt: new Date().toISOString(),
  };
  writeStore(KEYS.SAVED_MEDICINES, [entry, ...existing]);
}

export function removeSavedMedicine(medicineId: string): void {
  const updated = getSavedMedicines().filter((m) => m.medicineId !== medicineId);
  writeStore(KEYS.SAVED_MEDICINES, updated);
}

// ── Saved Pharmacies ──────────────────────────────────────────────────────────

export function getSavedPharmacies(): SavedPharmacy[] {
  return readStore<SavedPharmacy>(KEYS.SAVED_PHARMACIES);
}

export function isPharmacySaved(pharmacyId: string): boolean {
  return getSavedPharmacies().some((p) => p.pharmacyId === pharmacyId);
}

export function savePharmacy(pharmacy: Omit<SavedPharmacy, "id" | "savedAt">): void {
  const existing = getSavedPharmacies();
  if (existing.some((p) => p.pharmacyId === pharmacy.pharmacyId)) return;
  const entry: SavedPharmacy = {
    ...pharmacy,
    id: `saved-ph-${Date.now()}`,
    savedAt: new Date().toISOString(),
  };
  writeStore(KEYS.SAVED_PHARMACIES, [entry, ...existing]);
}

export function removeSavedPharmacy(pharmacyId: string): void {
  const updated = getSavedPharmacies().filter((p) => p.pharmacyId !== pharmacyId);
  writeStore(KEYS.SAVED_PHARMACIES, updated);
}

// ── Reservations (persisted) ──────────────────────────────────────────────────

export function getPersistedReservations(): Reservation[] {
  return readStore<Reservation>(KEYS.RESERVATIONS);
}

export function persistReservation(reservation: Reservation): void {
  const existing = getPersistedReservations().filter((r) => r.id !== reservation.id);
  writeStore(KEYS.RESERVATIONS, [reservation, ...existing]);
}

export function updatePersistedReservation(id: string, updates: Partial<Reservation>): void {
  const updated = getPersistedReservations().map((r) =>
    r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
  );
  writeStore(KEYS.RESERVATIONS, updated);
}

export function cancelPersistedReservation(id: string): void {
  updatePersistedReservation(id, { status: "CANCELLED" });
}
