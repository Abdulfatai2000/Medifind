import { getMedicineById, getMedicineAvailability, getRelatedAvailability } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { MedicineAvailabilityCard } from "@/components/shared/MedicineAvailabilityCard";
import { Pill, AlertTriangle, ShieldAlert } from "lucide-react";
import { SearchResult } from "@/types";

export default async function MedicineDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const medicine = getMedicineById(id);

  if (!medicine) {
    notFound();
  }

  // Get availability
  const inventory = getMedicineAvailability(id);
  const relatedInventory = getRelatedAvailability(id);

  // Map to SearchResult for the card component
  const exactMatches: SearchResult[] = inventory.map(pm => ({
    id: `res-${pm.id}`,
    matchType: 'EXACT',
    pharmacyId: pm.pharmacy!.id,
    pharmacyName: pm.pharmacy!.name,
    verified: pm.pharmacy!.verified,
    distanceKm: 2.5, // Mock
    isOpen: true, // Mock
    address: pm.pharmacy!.location,
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
  }));

  const relatedMatches: SearchResult[] = relatedInventory.map(pm => ({
    id: `res-${pm.id}`,
    matchType: 'RELATED',
    pharmacyId: pm.pharmacy!.id,
    pharmacyName: pm.pharmacy!.name,
    verified: pm.pharmacy!.verified,
    distanceKm: 3.0, // Mock
    isOpen: true, // Mock
    address: pm.pharmacy!.location,
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
        
        {/* Medicine Header Info */}
        <section className="bg-white border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 border">
            {medicine.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={medicine.imageUrl} alt={medicine.name} className="w-full h-full object-contain rounded-xl" />
            ) : (
              <Pill className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{medicine.name}</h1>
              <p className="text-gray-500 font-medium text-sm mt-1">
                Generic: {medicine.genericName}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
              <p><span className="text-gray-500">Brand:</span> {medicine.brand}</p>
              <p><span className="text-gray-500">Strength:</span> {medicine.strength}</p>
              <p><span className="text-gray-500">Form:</span> {medicine.dosageForm}</p>
              <p><span className="text-gray-500">Active Ingredient:</span> {medicine.activeIngredient}</p>
            </div>
            
            {medicine.description && (
              <p className="text-gray-600 text-sm leading-relaxed max-w-2xl border-t pt-3 mt-3">
                {medicine.description}
              </p>
            )}

            {medicine.requiresPrescription && (
              <div className="bg-amber-50 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 mt-2">
                <AlertTriangle className="w-4 h-4" />
                Prescription Required
              </div>
            )}
          </div>
        </section>

        {/* Medical Disclaimer */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 text-sm text-blue-800">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" />
          <p>
            <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not substitute professional medical advice. Do not self-diagnose or self-prescribe. Always consult a pharmacist or doctor before taking new medication.
          </p>
        </div>

        {/* Availability */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
            Available at {exactMatches.length} {exactMatches.length === 1 ? "pharmacy" : "pharmacies"}
          </h2>
          {exactMatches.length > 0 ? (
            <div className="space-y-4">
              {exactMatches.map(res => (
                <MedicineAvailabilityCard key={res.id} result={res} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500 border border-dashed">
              No pharmacies currently have this specific brand in stock near you.
            </div>
          )}
        </section>

        {/* Related Products */}
        {relatedMatches.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              Related Products
            </h2>
            <div className="space-y-4">
              {relatedMatches.map(res => (
                <MedicineAvailabilityCard key={res.id} result={res} />
              ))}
            </div>
          </section>
        )}

      </div>
    </PageWrapper>
  );
}
