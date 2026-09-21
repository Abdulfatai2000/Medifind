import { getPharmacyById, getPharmacyInventory } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { MedicineAvailabilityCard } from "@/components/shared/MedicineAvailabilityCard";
import { Store, MapPin, Phone, ShieldCheck, Heart, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchResult } from "@/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default async function PharmacyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pharmacy = getPharmacyById(id);

  if (!pharmacy) {
    notFound();
  }

  const inventory = getPharmacyInventory(id);

  // Map to SearchResult for the card component
  const inventoryMatches: SearchResult[] = inventory.map(pm => ({
    id: `res-${pm.id}`,
    matchType: 'EXACT',
    pharmacyId: pharmacy.id,
    pharmacyName: pharmacy.name,
    verified: pharmacy.verified,
    distanceKm: 2.5, // Mock
    isOpen: true, // Mock
    address: pharmacy.location,
    medicineId: pm.medicine!.id,
    medicineName: pm.medicine!.name,
    genericName: pm.medicine!.genericName,
    brand: pm.medicine!.brand,
    strength: pm.medicine!.strength,
    dosageForm: pm.medicine!.dosageForm,
    activeIngredient: pm.medicine!.activeIngredient,
    requiresPrescription: pm.medicine!.requiresPrescription,
    price: pm.price,
    quantity: pm.quantity,
    stockStatus: pm.stockStatus,
    freshness: pm.stockFreshness,
    lastUpdated: pm.lastUpdated,
    updateMethod: pm.updateMethod,
  }));

  return (
    <PageWrapper className="py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Pharmacy Header */}
        <section className="bg-white border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start shadow-sm">
          <div className="w-24 h-24 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
            <Store className="w-10 h-10 text-emerald-600" />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{pharmacy.name}</h1>
                {pharmacy.verified && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
              </div>
              <p className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                {pharmacy.location}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button className="flex-1 sm:flex-none">
                <Phone className="w-4 h-4 mr-2" />
                Call {pharmacy.contactPhone}
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Navigation className="w-4 h-4 mr-2 text-blue-600" />
                Directions
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none" title="Save Pharmacy">
                <Heart className="w-4 h-4 mr-2 text-rose-500" />
                Save
              </Button>
            </div>
          </div>
          
          {/* Status badge */}
          <div className="shrink-0 flex items-center gap-2 font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 self-start">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Open Now
          </div>
        </section>

        {/* Inventory Section */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Available Medicines
            </h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search inventory..." 
                className="pl-9 h-9 text-sm bg-white"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {inventoryMatches.length > 0 ? (
              inventoryMatches.map(res => (
                <MedicineAvailabilityCard key={res.id} result={res} />
              ))
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500 border border-dashed">
                This pharmacy has not listed any medicines yet.
              </div>
            )}
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}
