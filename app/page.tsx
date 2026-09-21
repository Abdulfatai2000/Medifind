"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, ShieldCheck, Clock, CheckCircle, Activity, ShoppingBag, ArrowRight, Store } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Ile-Ife, Osun");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-emerald-50/50 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <Badge variant="FRESH" className="px-3 py-1 text-sm mb-2 rounded-full font-medium">
              Now active in Ile-Ife, Osun State
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Find the medicine you need. <br className="hidden md:block" />
              <span className="text-emerald-600">Know it&apos;s available before you leave home.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              MediFind connects you with verified nearby pharmacies. Check medicine availability, compare prices, and see when stock was last updated.
            </p>
            
            {/* Search Controls */}
            <form 
              onSubmit={handleSearch}
              className="w-full max-w-2xl bg-white p-2 md:p-3 rounded-2xl shadow-sm border mt-8 flex flex-col md:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="e.g. Amoxicillin 500mg"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 h-12 border-0 bg-gray-50 focus-visible:ring-1 text-base rounded-xl"
                />
              </div>
              <div className="relative md:w-1/3">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 border-0 bg-gray-50 focus-visible:ring-1 text-base rounded-xl"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8 rounded-xl shrink-0">
                Find Medicine
              </Button>
            </form>
            
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
              <span>Have a prescription?</span>
              <Button variant="outline" className="rounded-full shadow-sm">
                Upload Prescription
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">How MediFind Works</h2>
            <p className="text-gray-500 mt-4 text-lg">Three simple steps to get your medication faster.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">1. Search Medicine</h3>
              <p className="text-gray-600">Enter the name of your medicine and your location to see nearby availability.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">2. Compare Pharmacies</h3>
              <p className="text-gray-600">Compare prices, distance, and see exactly when stock was last confirmed.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-2">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">3. Reserve & Pick Up</h3>
              <p className="text-gray-600">Reserve the medicine online and pick it up at the pharmacy without the wait.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Trust Section */}
      <section className="py-20 bg-gray-50 border-y">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Trust the stock status.</h2>
              <p className="text-gray-600 text-lg mb-6">
                Our Hybrid Stock system tells you exactly how reliable the availability data is, so you don&apos;t waste trips.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Badge variant="LIVE" className="mt-1 shrink-0 w-20 justify-center">LIVE</Badge>
                  <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Live API Sync:</span> Synced directly from the pharmacy&apos;s inventory system in real-time.</p>
                </div>
                <div className="flex items-start gap-4">
                  <Badge variant="FRESH" className="mt-1 shrink-0 w-20 justify-center">FRESH</Badge>
                  <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Recently Confirmed:</span> Pharmacy staff confirmed availability manually very recently.</p>
                </div>
                <div className="flex items-start gap-4">
                  <Badge variant="RECENT" className="mt-1 shrink-0 w-20 justify-center">RECENT</Badge>
                  <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Updated Today:</span> The stock was updated at some point today.</p>
                </div>
                <div className="flex items-start gap-4">
                  <Badge variant="OLD" className="mt-1 shrink-0 w-20 justify-center">OLD</Badge>
                  <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Last Known Stock:</span> Availability hasn&apos;t been confirmed recently; calling ahead recommended.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="p-4 border rounded-xl flex justify-between items-center bg-gray-50/50">
                  <div>
                    <p className="font-semibold text-gray-900">Amartem 80/480mg</p>
                    <p className="text-xs text-gray-500">HealthPlus Pharmacy</p>
                  </div>
                  <Badge variant="LIVE">LIVE</Badge>
                </div>
                <div className="p-4 border rounded-xl flex justify-between items-center bg-gray-50/50">
                  <div>
                    <p className="font-semibold text-gray-900">Panadol Extra</p>
                    <p className="text-xs text-gray-500">MedPlus Pharmacy</p>
                  </div>
                  <Badge variant="FRESH">FRESH</Badge>
                </div>
                <div className="p-4 border rounded-xl flex justify-between items-center bg-gray-50/50">
                  <div>
                    <p className="font-semibold text-gray-900">Vitamin C 1000mg</p>
                    <p className="text-xs text-gray-500">Alpha Pharmacy</p>
                  </div>
                  <Badge variant="RECENT">RECENT</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Why use MediFind?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="p-6 border rounded-2xl bg-gray-50">
              <ShieldCheck className="w-10 h-10 text-emerald-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Avoid Unnecessary Trips</h3>
              <p className="text-sm text-gray-600">Stop driving from pharmacy to pharmacy. Know who has it before you go.</p>
            </div>
            <div className="p-6 border rounded-2xl bg-gray-50">
              <Activity className="w-10 h-10 text-emerald-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Compare Nearby</h3>
              <p className="text-sm text-gray-600">Compare medicine availability and prices across multiple local pharmacies.</p>
            </div>
            <div className="p-6 border rounded-2xl bg-gray-50">
              <CheckCircle className="w-10 h-10 text-emerald-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Discover Alternatives</h3>
              <p className="text-sm text-gray-600">Find related products or generics when exact brands are unavailable.</p>
            </div>
            <div className="p-6 border rounded-2xl bg-gray-50">
              <Clock className="w-10 h-10 text-emerald-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Reserve Ahead</h3>
              <p className="text-sm text-gray-600">Reserve your medication online before travelling to guarantee it&apos;s waiting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pharmacy CTA */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-300 font-medium mb-2">
                <Store className="w-5 h-5" />
                <span>For Pharmacies</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white">Own a pharmacy? Join MediFind.</h2>
              <p className="text-emerald-100 text-lg">
                Reach nearby customers, manage your medicine availability online, receive reservation requests, and understand local medicine demand.
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/pharmacy/register">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-gray-100 border-0 text-base h-12 px-8 rounded-full shadow-lg">
                  Register Your Pharmacy
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
