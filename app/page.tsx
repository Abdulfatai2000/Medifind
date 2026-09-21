import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <PageWrapper>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">MediFind Design System</h1>
        <p className="text-gray-500">Phase 1: Frontend Foundation Showcase</p>
      </div>

      <div className="space-y-12">
        {/* Buttons */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Buttons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link Style</Button>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Inputs</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Standard Input</label>
              <Input placeholder="Enter your email..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Input</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search medicines..." className="pl-9" />
              </div>
            </div>
          </div>
        </section>

        {/* Badges / Stock Status */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Badges & Stock Status</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="LIVE">LIVE</Badge>
            <Badge variant="FRESH">FRESH</Badge>
            <Badge variant="RECENT">RECENT</Badge>
            <Badge variant="OLD">OLD</Badge>
            <Badge variant="IN_STOCK">IN_STOCK</Badge>
            <Badge variant="LOW_STOCK">LOW_STOCK</Badge>
            <Badge variant="OUT_OF_STOCK">OUT_OF_STOCK</Badge>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Cards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="IN_STOCK">In Stock</Badge>
                  <span className="text-lg font-bold text-emerald-600">₦2,500</span>
                </div>
                <CardTitle className="text-lg">Paracetamol 500mg</CardTitle>
                <CardDescription>Pain relief & fever reducer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">Available at: <span className="font-medium text-gray-900">HealthPlus Pharmacy</span></p>
                <div className="flex items-center text-xs text-gray-500">
                  <Badge variant="FRESH" className="mr-2">Fresh</Badge>
                  Updated 2 hours ago
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Reserve Medicine</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* App States */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">App States</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">Loading State</h3>
              <div className="border rounded-lg bg-white overflow-hidden">
                <LoadingState />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">Skeleton Loading</h3>
              <div className="border rounded-lg bg-white p-6 space-y-4 h-[200px]">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">Empty State</h3>
              <EmptyState 
                action={<Button variant="outline">Clear Filters</Button>} 
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">Error State</h3>
              <ErrorState onRetry={() => {}} />
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
