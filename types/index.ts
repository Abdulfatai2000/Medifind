export type StockStatus = 'LIVE' | 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
export type StockFreshness = 'FRESH' | 'RECENT' | 'OLD';

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
  lastUpdated: string;
  pharmacy?: Pharmacy;
  medicine?: Medicine;
}

export interface Reservation {
  id: string;
  userId: string;
  pharmacyMedicineId: string;
  quantity: number;
  status: 'PENDING' | 'CONFIRMED' | 'FULFILLED' | 'CANCELLED';
  createdAt: string;
}

export interface Prescription {
  id: string;
  userId: string;
  imageUrl: string;
  status: 'PENDING' | 'REVIEWED' | 'REJECTED';
  notes?: string;
  createdAt: string;
}
