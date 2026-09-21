export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
export type StockFreshness = 'LIVE' | 'FRESH' | 'RECENT' | 'OLD';
export type UpdateMethod = 'API_SYNC' | 'MANUAL_UPDATE' | 'PHARMACY_CONFIRM';
export type MatchType = 'EXACT' | 'RELATED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'PHARMACY' | 'ADMIN';
  createdAt: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  verified: boolean;
  createdAt: string;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  brand: string;
  strength: string;
  dosageForm: string;
  activeIngredient: string;
  description?: string;
  category: string;
  requiresPrescription: boolean;
  imageUrl?: string;
}

export interface PharmacyMedicine {
  id: string;
  pharmacyId: string;
  medicineId: string;
  price: number;
  stockStatus: StockStatus;
  stockFreshness: StockFreshness;
  quantity: number;
  lastUpdated: string;
  updateMethod: UpdateMethod;
  pharmacy?: Pharmacy;
  medicine?: Medicine;
}

/** Flat search result object used in search views */
export interface SearchResult {
  id: string;
  matchType: MatchType;
  // Pharmacy
  pharmacyId: string;
  pharmacyName: string;
  verified: boolean;
  distanceKm: number;
  isOpen: boolean;
  address: string;
  // Medicine
  medicineId: string;
  medicineName: string;
  genericName: string;
  brand: string;
  strength: string;
  dosageForm: string;
  activeIngredient: string;
  requiresPrescription: boolean;
  // Stock
  price: number;
  quantity: number;
  stockStatus: StockStatus;
  freshness: StockFreshness;
  lastUpdated: string;
  updateMethod: UpdateMethod;
}

export interface SearchFilters {
  maxDistanceKm: number | null;
  maxPrice: number | null;
  freshness: StockFreshness[];
  openNow: boolean;
  inStockOnly: boolean;
}

export type SortOption = 'nearest' | 'lowest_price' | 'freshest' | 'highest_quantity';

export type ReservationStatus = 
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'READY_FOR_PICKUP'
  | 'REJECTED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'EXPIRED';

export interface Reservation {
  id: string;
  userId: string;
  pharmacyMedicineId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: ReservationStatus;
  requestedAt: string;
  confirmedAt?: string;
  pickupDeadline?: string;
  updatedAt: string;
  // Included for frontend mock rendering convenience
  medicine?: Medicine;
  pharmacy?: Pharmacy;
}

export interface Prescription {
  id: string;
  userId: string;
  imageUrl: string;
  status: 'PENDING' | 'REVIEWED' | 'REJECTED';
  notes?: string;
  createdAt: string;
}

// ── Prescription Flow Types ───────────────────────────────────────────────

export type PrescriptionStatus =
  | 'IDLE'
  | 'SELECTED'
  | 'UPLOADING'
  | 'PROCESSING'
  | 'PROCESSED'
  | 'ERROR';

export interface PrescriptionMedicine {
  id: string;
  name: string;
  strength: string;
  dosageForm: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface PrescriptionPharmacyMedicineMatch {
  medicine: PrescriptionMedicine;
  price: number;
  freshness: StockFreshness;
  lastUpdated: string;
  available: boolean;
}

export interface PrescriptionMatch {
  pharmacyId: string;
  pharmacyName: string;
  verified: boolean;
  distanceKm: number;
  isOpen: boolean;
  address: string;
  contactPhone: string;
  availableCount: number;
  totalCount: number;
  estimatedTotal: number;
  medicines: PrescriptionPharmacyMedicineMatch[];
}

export interface LowestCostCombination {
  pharmacies: {
    pharmacyId: string;
    pharmacyName: string;
    medicines: PrescriptionPharmacyMedicineMatch[];
    subtotal: number;
  }[];
  grandTotal: number;
}

// ── Saved Items Types ─────────────────────────────────────────────────────

export interface SavedMedicine {
  id: string;
  medicineId: string;
  medicineName: string;
  brand: string;
  strength: string;
  dosageForm: string;
  savedAt: string;
}

export interface SavedPharmacy {
  id: string;
  pharmacyId: string;
  pharmacyName: string;
  verified: boolean;
  address: string;
  distanceKm?: number;
  isOpen?: boolean;
  savedAt: string;
}

