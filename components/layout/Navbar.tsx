"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  
  // Simple heuristic for logged-in UI vs public UI for Phase 2 frontend
  const isDashboardRoute = pathname?.startsWith("/home") || pathname?.startsWith("/prescription") || pathname?.startsWith("/reservations");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="flex gap-6 md:gap-10">
          <Link href={isDashboardRoute ? "/home" : "/"} className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl text-emerald-600">MediFind</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {isDashboardRoute ? (
              <>
                <Link href="/home" className={`flex items-center text-sm font-medium ${pathname === '/home' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}>
                  Find Medicine
                </Link>
                <Link href="/prescription/upload" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
                  Upload Prescription
                </Link>
                <Link href="/reservations" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
                  My Reservations
                </Link>
                <Link href="/saved" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
                  Saved
                </Link>
                <Link href="/help" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
                  Help
                </Link>
              </>
            ) : (
              <>
                <Link href="/search" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
                  Find Medicine
                </Link>
                <Link href="#how-it-works" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
                  How It Works
                </Link>
                <Link href="/pharmacy/register" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
                  For Pharmacies
                </Link>
                <Link href="/help" className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600">
                  Help
                </Link>
              </>
            )}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          {isDashboardRoute ? (
            <>
              <div className="hidden md:flex items-center text-sm text-gray-500 mr-2 border-r pr-4">
                <span className="truncate max-w-[150px]">Ile-Ife, Osun</span>
              </div>
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-gray-600">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-600 hover:text-emerald-600">Log In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="shadow-sm">Sign Up</Button>
                </Link>
              </div>
            </>
          )}
          
          {/* Mobile Search - only show if dashboard route or if requested */}
          {isDashboardRoute && (
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5 text-gray-600" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
