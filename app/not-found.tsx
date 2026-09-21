import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageWrapper className="justify-center items-center py-20">
        <div className="bg-emerald-50 text-emerald-600 p-6 rounded-full mb-6">
          <Search className="w-16 h-16" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page not found</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          Sorry, we could not find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <Link href="/">
          <Button size="lg">Return to Home</Button>
        </Link>
      </PageWrapper>
      <Footer />
    </div>
  );
}
