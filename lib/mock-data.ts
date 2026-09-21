import type { 
  SearchResult, 
  Medicine, 
  Pharmacy, 
  PharmacyMedicine, 
  Reservation 
} from "@/types";

// ── MEDICINES ─────────────────────────────────────────────────────────────
export const MOCK_MEDICINES: Medicine[] = [
  {
    id: "med-1",
    name: "Amoxicillin 500mg Capsules",
    genericName: "Amoxicillin",
    brand: "Emzor",
    strength: "500mg",
    dosageForm: "Capsule",
    activeIngredient: "Amoxicillin Trihydrate",
    category: "Antibiotics",
    requiresPrescription: true,
    description: "Used to treat a wide variety of bacterial infections. It is a penicillin-type antibiotic."
  },
  {
    id: "med-2",
    name: "Amoxicillin 500mg Capsules",
    genericName: "Amoxicillin",
    brand: "M&B",
    strength: "500mg",
    dosageForm: "Capsule",
    activeIngredient: "Amoxicillin Trihydrate",
    category: "Antibiotics",
    requiresPrescription: true,
    description: "Used to treat a wide variety of bacterial infections."
  },
  {
    id: "med-3",
    name: "Amoxicillin 500mg Capsules",
    genericName: "Amoxicillin",
    brand: "Bayer",
    strength: "500mg",
    dosageForm: "Capsule",
    activeIngredient: "Amoxicillin Trihydrate",
    category: "Antibiotics",
    requiresPrescription: true,
    description: "High quality amoxicillin for bacterial infections."
  }
];

// ── PHARMACIES ────────────────────────────────────────────────────────────
export const MOCK_PHARMACIES: Pharmacy[] = [
  {
    id: "ph-1",
    name: "Grace Pharmacy",
    location: "12 Oluwo Road, Ile-Ife",
    contactEmail: "contact@gracepharmacy.com",
    contactPhone: "08012345678",
    verified: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "ph-2",
    name: "HealthPlus Pharmacy",
    location: "Oduduwa Way, Ile-Ife",
    contactEmail: "hello@healthplus.com",
    contactPhone: "08123456789",
    verified: true,
    createdAt: "2023-05-10T00:00:00Z"
  },
  {
    id: "ph-3",
    name: "Alpha Pharma",
    location: "Lagere, Ile-Ife",
    contactEmail: "info@alphapharma.com",
    contactPhone: "07098765432",
    verified: false,
    createdAt: "2024-06-15T00:00:00Z"
  },
  {
    id: "ph-4",
    name: "Medifield Pharmacy",
    location: "OAU Teaching Hospital Road, Ile-Ife",
    contactEmail: "contact@medifield.com",
    contactPhone: "09011223344",
    verified: true,
    createdAt: "2022-11-20T00:00:00Z"
  },
  {
    id: "ph-5",
    name: "RxPoint Pharmacy",
    location: "Stadium Area, Ile-Ife",
    contactEmail: "rxpoint@gmail.com",
    contactPhone: "08033445566",
    verified: true,
    createdAt: "2024-02-14T00:00:00Z"
  },
  {
    id: "ph-6",
    name: "Obanla Pharmacy",
    location: "Obanla Junction, Ile-Ife",
    contactEmail: "obanla@yahoo.com",
    contactPhone: "08199887766",
    verified: false,
    createdAt: "2023-09-09T00:00:00Z"
  }
];

// ── PHARMACY INVENTORY ───────────────────────────────────────────────────
export const MOCK_PHARMACY_MEDICINES: PharmacyMedicine[] = [
  {
    id: "pm-1",
    pharmacyId: "ph-1",
    medicineId: "med-1",
    price: 2500,
    quantity: 18,
    stockStatus: "IN_STOCK",
    stockFreshness: "LIVE",
    lastUpdated: new Date(Date.now() - 5 * 60000).toISOString(), // 5 mins ago
    updateMethod: "API_SYNC"
  },
  {
    id: "pm-2",
    pharmacyId: "ph-2",
    medicineId: "med-1",
    price: 2800,
    quantity: 5,
    stockStatus: "LOW_STOCK",
    stockFreshness: "FRESH",
    lastUpdated: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
    updateMethod: "MANUAL_UPDATE"
  },
  {
    id: "pm-3",
    pharmacyId: "ph-3",
    medicineId: "med-1",
    price: 2200,
    quantity: 40,
    stockStatus: "IN_STOCK",
    stockFreshness: "RECENT",
    lastUpdated: new Date(Date.now() - 12 * 3600000).toISOString(), // 12 hours ago
    updateMethod: "PHARMACY_CONFIRM"
  },
  {
    id: "pm-4",
    pharmacyId: "ph-4",
    medicineId: "med-1",
    price: 3000,
    quantity: 40,
    stockStatus: "IN_STOCK",
    stockFreshness: "OLD",
    lastUpdated: new Date(Date.now() - 48 * 3600000).toISOString(), // 2 days ago
    updateMethod: "MANUAL_UPDATE"
  },
  {
    id: "pm-5",
    pharmacyId: "ph-5",
    medicineId: "med-1",
    price: 2600,
    quantity: 0,
    stockStatus: "OUT_OF_STOCK",
    stockFreshness: "FRESH",
    lastUpdated: new Date(Date.now() - 4 * 3600000).toISOString(), // 4 hours ago
    updateMethod: "MANUAL_UPDATE"
  },
  {
    id: "pm-6",
    pharmacyId: "ph-1",
    medicineId: "med-2",
    price: 2100,
    quantity: 25,
    stockStatus: "IN_STOCK",
    stockFreshness: "LIVE",
    lastUpdated: new Date(Date.now() - 5 * 60000).toISOString(), // 5 mins ago
    updateMethod: "API_SYNC"
  },
  {
    id: "pm-7",
    pharmacyId: "ph-6",
    medicineId: "med-3",
    price: 3200,
    quantity: 10,
    stockStatus: "LOW_STOCK",
    stockFreshness: "RECENT",
    lastUpdated: new Date(Date.now() - 15 * 3600000).toISOString(), // 15 hours ago
    updateMethod: "PHARMACY_CONFIRM"
  }
];

// ── RESERVATIONS (Mutable for frontend demo) ─────────────────────────────
export let MOCK_RESERVATIONS: Reservation[] = [
  {
    id: "resv-101",
    userId: "user-1",
    pharmacyMedicineId: "pm-1",
    quantity: 2,
    unitPrice: 2500,
    totalPrice: 5000,
    status: "READY_FOR_PICKUP",
    requestedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    confirmedAt: new Date(Date.now() - 23 * 3600000).toISOString(),
    pickupDeadline: new Date(Date.now() + 24 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 23 * 3600000).toISOString()
  },
  {
    id: "resv-102",
    userId: "user-1",
    pharmacyMedicineId: "pm-2",
    quantity: 1,
    unitPrice: 2800,
    totalPrice: 2800,
    status: "COMPLETED",
    requestedAt: new Date(Date.now() - 7 * 24 * 3600000).toISOString(),
    confirmedAt: new Date(Date.now() - 6.5 * 24 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 24 * 3600000).toISOString()
  }
];

// ── HELPERS ───────────────────────────────────────────────────────────────

export function getMedicineById(id: string): Medicine | undefined {
  return MOCK_MEDICINES.find(m => m.id === id);
}

export function getPharmacyById(id: string): Pharmacy | undefined {
  return MOCK_PHARMACIES.find(p => p.id === id);
}

export function getPharmacyInventory(pharmacyId: string) {
  return MOCK_PHARMACY_MEDICINES.filter(pm => pm.pharmacyId === pharmacyId).map(pm => ({
    ...pm,
    medicine: getMedicineById(pm.medicineId),
    pharmacy: getPharmacyById(pm.pharmacyId)
  }));
}

export function getMedicineAvailability(medicineId: string) {
  return MOCK_PHARMACY_MEDICINES.filter(pm => pm.medicineId === medicineId).map(pm => ({
    ...pm,
    medicine: getMedicineById(pm.medicineId),
    pharmacy: getPharmacyById(pm.pharmacyId)
  }));
}

export function getRelatedAvailability(medicineId: string) {
  const targetMedicine = getMedicineById(medicineId);
  if (!targetMedicine) return [];
  
  return MOCK_PHARMACY_MEDICINES.filter(pm => {
    const med = getMedicineById(pm.medicineId);
    if (!med || med.id === targetMedicine.id) return false;
    // Must match active ingredient, strength, and form exactly
    return (
      med.activeIngredient === targetMedicine.activeIngredient &&
      med.strength === targetMedicine.strength &&
      med.dosageForm === targetMedicine.dosageForm
    );
  }).map(pm => ({
    ...pm,
    medicine: getMedicineById(pm.medicineId),
    pharmacy: getPharmacyById(pm.pharmacyId)
  }));
}

export function getMyReservations(): Reservation[] {
  return MOCK_RESERVATIONS.map(r => {
    const pm = MOCK_PHARMACY_MEDICINES.find(p => p.id === r.pharmacyMedicineId);
    return {
      ...r,
      medicine: pm ? getMedicineById(pm.medicineId) : undefined,
      pharmacy: pm ? getPharmacyById(pm.pharmacyId) : undefined
    };
  }).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function createReservation(payload: Partial<Reservation>): Reservation {
  const newReservation: Reservation = {
    id: `resv-${Date.now()}`,
    userId: payload.userId || "user-1",
    pharmacyMedicineId: payload.pharmacyMedicineId!,
    quantity: payload.quantity || 1,
    unitPrice: payload.unitPrice || 0,
    totalPrice: payload.totalPrice || 0,
    status: "PENDING_CONFIRMATION",
    requestedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  MOCK_RESERVATIONS = [newReservation, ...MOCK_RESERVATIONS];
  return newReservation;
}

export function cancelReservation(id: string) {
  MOCK_RESERVATIONS = MOCK_RESERVATIONS.map(r => {
    if (r.id === id) {
      return { ...r, status: "CANCELLED", updatedAt: new Date().toISOString() };
    }
    return r;
  });
}

/**
 * Maps the relational mock data into the flat SearchResult format used by the /search page
 */
export function getMockSearchResults(): SearchResult[] {
  // Let's pretend the user searched for Amoxicillin 500mg
  const exactMedicineId = "med-1";
  
  const results: SearchResult[] = [];
  
  MOCK_PHARMACY_MEDICINES.forEach(pm => {
    const medicine = getMedicineById(pm.medicineId);
    const pharmacy = getPharmacyById(pm.pharmacyId);
    if (!medicine || !pharmacy) return;
    
    // Exact match if it's the target medicine, else check if it's related
    let matchType: 'EXACT' | 'RELATED' | null = null;
    
    if (medicine.id === exactMedicineId) {
      matchType = 'EXACT';
    } else {
      const targetMed = getMedicineById(exactMedicineId);
      if (
        targetMed &&
        medicine.activeIngredient === targetMed.activeIngredient &&
        medicine.strength === targetMed.strength &&
        medicine.dosageForm === targetMed.dosageForm
      ) {
        matchType = 'RELATED';
      }
    }
    
    if (matchType) {
      // Generate some fake distances/open statuses for the search view
      const distanceMap: Record<string, number> = {
        "ph-1": 1.2, "ph-2": 2.1, "ph-3": 3.4, "ph-4": 4.8, "ph-5": 5.5, "ph-6": 2.7
      };
      const openMap: Record<string, boolean> = {
        "ph-1": true, "ph-2": true, "ph-3": false, "ph-4": true, "ph-5": true, "ph-6": true
      };
      
      results.push({
        id: `res-${pm.id}`,
        matchType,
        pharmacyId: pharmacy.id,
        pharmacyName: pharmacy.name,
        verified: pharmacy.verified,
        distanceKm: distanceMap[pharmacy.id] || 2.5,
        isOpen: openMap[pharmacy.id] ?? true,
        address: pharmacy.location,
        medicineId: medicine.id,
        medicineName: medicine.name,
        genericName: medicine.genericName,
        brand: medicine.brand,
        strength: medicine.strength,
        dosageForm: medicine.dosageForm,
        activeIngredient: medicine.activeIngredient,
        requiresPrescription: medicine.requiresPrescription,
        price: pm.price,
        quantity: pm.quantity,
        stockStatus: pm.stockStatus,
        freshness: pm.stockFreshness,
        lastUpdated: pm.lastUpdated,
        updateMethod: pm.updateMethod,
      });
    }
  });
  
  return results;
}
