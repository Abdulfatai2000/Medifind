import Link from "next/link";
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl text-emerald-600">MediFind</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
              Home
            </Link>
            <Link href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
              Find Medicine
            </Link>
            <Link href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
              Upload Prescription
            </Link>
            <Link href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
              My Reservations
            </Link>
            <Link href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
              Saved
            </Link>
            <Link href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
              Help
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center text-sm text-gray-500 mr-4">
            <span className="truncate max-w-[150px]">Lagos, Nigeria</span>
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Account</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
