"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Clock, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export default function UserHomePage() {
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

  const popularSearches = [
    "Paracetamol 500mg",
    "Amoxicillin 500mg",
    "Metformin 500mg",
    "Losartan 50mg",
    "Vitamin C 1000mg"
  ];

  const recentSearches = [
    { query: "Artemether 80mg", location: "Ile-Ife, Osun", time: "2 hours ago" },
    { query: "Ibuprofen 400mg", location: "Ile-Ife, Osun", time: "Yesterday" }
  ];

  return (
    <PageWrapper className="py-8 md:py-12">
      {/* Main Search Area */}
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          What medicine are you looking for?
        </h1>
        
        <form 
          onSubmit={handleSearch}
          className="w-full max-w-3xl bg-white p-2 md:p-3 rounded-2xl shadow-sm border flex flex-col md:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search e.g. Amoxicillin 500mg" 
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
          <Button type="submit" size="lg" className="h-12 px-8 rounded-xl shrink-0 text-base">
            Search
          </Button>
        </form>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-10">
          {/* Popular Searches */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <button 
                  key={search}
                  onClick={() => router.push(`/search?q=${encodeURIComponent(search)}&location=${encodeURIComponent(location)}`)}
                  className="px-4 py-2 bg-white border rounded-full text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          </section>

          {/* Recent Searches */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Searches</h2>
              <button className="text-sm font-medium text-emerald-600 hover:underline">
                Clear all
              </button>
            </div>
            
            <div className="space-y-3">
              {recentSearches.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => router.push(`/search?q=${encodeURIComponent(item.query)}&location=${encodeURIComponent(item.location)}`)}
                  className="flex items-center justify-between p-4 bg-white border rounded-xl hover:shadow-sm transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-2 rounded-lg text-gray-500">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.query}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-0.5">
                        <MapPin className="w-3 h-3 mr-1" /> {item.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="hidden sm:inline-block">{item.time}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Prescription Upload CTA */}
          <Card className="bg-emerald-50 border-emerald-100 shadow-none">
            <CardContent className="p-6">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Have a prescription?</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Upload it and MediFind will help locate pharmacies that carry the listed medicines.
              </p>
              <Link href="/prescription/upload">
                <Button className="w-full">Upload Prescription</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-2">My Saved Pharmacies</h3>
              <p className="text-sm text-gray-500 mb-4">You haven&apos;t saved any pharmacies yet.</p>
              <Button variant="outline" className="w-full text-sm h-9">
                Discover Pharmacies
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
