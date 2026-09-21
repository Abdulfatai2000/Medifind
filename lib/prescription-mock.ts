/**
 * lib/prescription-mock.ts
 *
 * Mock prescription processing logic.
 * Isolated from components — replace processPrescription() with a real API call later.
 */

import type {
  PrescriptionMedicine,
  PrescriptionMatch,
  PrescriptionPharmacyMedicineMatch,
  LowestCostCombination,
} from "@/types";
import { MOCK_PHARMACIES } from "@/lib/mock-data";

// ── Accepted file types ───────────────────────────────────────────────────────

export const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export type FileValidationError =
  | "INVALID_TYPE"
  | "FILE_TOO_LARGE"
  | "EMPTY_FILE"
  | null;

export function validatePrescriptionFile(file: File): FileValidationError {
  if (file.size === 0) return "EMPTY_FILE";
  if (!ACCEPTED_TYPES.includes(file.type)) return "INVALID_TYPE";
  if (file.size > MAX_FILE_SIZE_BYTES) return "FILE_TOO_LARGE";
  return null;
}

export function getFileValidationMessage(error: FileValidationError): string {
  switch (error) {
    case "INVALID_TYPE":
      return "Only JPG, PNG, and PDF files are accepted.";
    case "FILE_TOO_LARGE":
      return `File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`;
    case "EMPTY_FILE":
      return "The selected file appears to be empty.";
    default:
      return "An unknown error occurred.";
  }
}

// ── Mock extracted medicines ──────────────────────────────────────────────────

const MOCK_EXTRACTED: PrescriptionMedicine[] = [
  {
    id: "pm-ext-1",
    name: "Amoxicillin",
    strength: "500mg",
    dosageForm: "Capsule",
    confidence: "HIGH",
  },
  {
    id: "pm-ext-2",
    name: "Metronidazole",
    strength: "400mg",
    dosageForm: "Tablet",
    confidence: "HIGH",
  },
  {
    id: "pm-ext-3",
    name: "Paracetamol",
    strength: "500mg",
    dosageForm: "Tablet",
    confidence: "MEDIUM",
  },
  {
    id: "pm-ext-4",
    name: "Omeprazole",
    strength: "20mg",
    dosageForm: "Capsule",
    confidence: "LOW",
  },
];

/**
 * Simulates prescription OCR processing.
 * Returns extracted medicines after a realistic delay.
 * Replace with: POST /api/prescriptions/process
 */
export async function processPrescription(
  _file: File
): Promise<PrescriptionMedicine[]> {
  await new Promise((resolve) => setTimeout(resolve, 2200));
  return MOCK_EXTRACTED.map((m) => ({ ...m }));
}

// ── Mock pharmacy match data ──────────────────────────────────────────────────

/**
 * Returns which pharmacies can fulfill a given list of medicines.
 * Replace with: POST /api/prescriptions/matches
 */
export function getPrescriptionPharmacyMatches(
  medicines: PrescriptionMedicine[]
): PrescriptionMatch[] {
  const total = medicines.length;

  // Mocked availability per pharmacy
  const pharmacyAvailability: Record<string, boolean[]> = {
    "ph-1": [true, true, true, true],   // all 4
    "ph-2": [true, true, true, false],  // 3/4
    "ph-3": [true, false, true, false], // 2/4
    "ph-4": [true, true, false, false], // 2/4
  };

  const pharmacyPrices: Record<string, number[]> = {
    "ph-1": [2500, 1200, 800, 950],
    "ph-2": [2800, 1100, 850, 0],
    "ph-3": [2300, 0, 780, 0],
    "ph-4": [2600, 1300, 0, 0],
  };

  const distanceMap: Record<string, number> = {
    "ph-1": 1.2,
    "ph-2": 2.1,
    "ph-3": 3.4,
    "ph-4": 4.8,
  };

  const results: PrescriptionMatch[] = [];

  for (const ph of MOCK_PHARMACIES.slice(0, 4)) {
    const availability = pharmacyAvailability[ph.id] ?? [];
    const prices = pharmacyPrices[ph.id] ?? [];

    const medicineMatches: PrescriptionPharmacyMedicineMatch[] = medicines.map(
      (med, idx) => ({
        medicine: med,
        price: prices[idx] ?? 0,
        freshness: idx === 0 ? "LIVE" : idx === 1 ? "FRESH" : "RECENT",
        lastUpdated: new Date(Date.now() - (idx + 1) * 3600000).toISOString(),
        available: availability[idx] ?? false,
      })
    );

    const availableMatches = medicineMatches.filter((m) => m.available);
    const estimatedTotal = availableMatches.reduce((sum, m) => sum + m.price, 0);

    results.push({
      pharmacyId: ph.id,
      pharmacyName: ph.name,
      verified: ph.verified,
      distanceKm: distanceMap[ph.id] ?? 3.0,
      isOpen: ph.id !== "ph-3",
      address: ph.location,
      contactPhone: ph.contactPhone,
      availableCount: availableMatches.length,
      totalCount: total,
      estimatedTotal,
      medicines: medicineMatches,
    });
  }

  // Sort: most available first, then by distance
  return results.sort((a, b) => {
    if (b.availableCount !== a.availableCount)
      return b.availableCount - a.availableCount;
    return a.distanceKm - b.distanceKm;
  });
}

/**
 * Computes the lowest-cost combination of pharmacies to fill all medicines.
 * Pure function — no side effects.
 */
export function getLowestCostCombination(
  matches: PrescriptionMatch[]
): LowestCostCombination {
  // Greedy: assign each medicine to cheapest available pharmacy
  const allMedicineIds = matches[0]?.medicines.map((m) => m.medicine.id) ?? [];

  const assignments: Record<
    string,
    {
      pharmacyId: string;
      pharmacyName: string;
      medicine: PrescriptionPharmacyMedicineMatch;
    }
  > = {};

  for (const medId of allMedicineIds) {
    let cheapest: {
      pharmacyId: string;
      pharmacyName: string;
      medicine: PrescriptionPharmacyMedicineMatch;
    } | null = null;

    for (const ph of matches) {
      const medMatch = ph.medicines.find(
        (m) => m.medicine.id === medId && m.available
      );
      if (!medMatch) continue;
      if (!cheapest || medMatch.price < cheapest.medicine.price) {
        cheapest = {
          pharmacyId: ph.pharmacyId,
          pharmacyName: ph.pharmacyName,
          medicine: medMatch,
        };
      }
    }

    if (cheapest) {
      assignments[medId] = cheapest;
    }
  }

  // Group by pharmacy
  const grouped: Record<
    string,
    {
      pharmacyId: string;
      pharmacyName: string;
      medicines: PrescriptionPharmacyMedicineMatch[];
      subtotal: number;
    }
  > = {};

  for (const assignment of Object.values(assignments)) {
    if (!grouped[assignment.pharmacyId]) {
      grouped[assignment.pharmacyId] = {
        pharmacyId: assignment.pharmacyId,
        pharmacyName: assignment.pharmacyName,
        medicines: [],
        subtotal: 0,
      };
    }
    grouped[assignment.pharmacyId].medicines.push(assignment.medicine);
    grouped[assignment.pharmacyId].subtotal += assignment.medicine.price;
  }

  const pharmacies = Object.values(grouped);
  const grandTotal = pharmacies.reduce((sum, p) => sum + p.subtotal, 0);

  return { pharmacies, grandTotal };
}
