"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, User, Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isDashboardRoute =
    pathname?.startsWith("/home") ||
    pathname?.startsWith("/prescription") ||
    pathname?.startsWith("/reservations") ||
    pathname?.startsWith("/saved");



  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    if (mobileOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    if (mobileOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  const publicLinks = [
    { href: "/search", label: "Find Medicine" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/pharmacy/register", label: "For Pharmacies" },
    { href: "/help", label: "Help" },
  ];

  const dashboardLinks = [
    { href: "/home", label: "Find Medicine" },
    { href: "/prescription/upload", label: "Upload Prescription" },
    { href: "/reservations", label: "My Reservations" },
    { href: "/saved", label: "Saved" },
    { href: "/help", label: "Help" },
  ];

  const navLinks = isDashboardRoute ? dashboardLinks : publicLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div ref={menuRef} className="container mx-auto flex h-16 items-center px-4 md:px-6">
        {/* Logo */}
        <div className="flex gap-6 md:gap-10 flex-1">
          <Link
            href={isDashboardRoute ? "/home" : "/"}
            className="flex items-center space-x-1 shrink-0"
          >
            <span className="font-bold text-xl text-emerald-600">MediFind</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-emerald-600"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Right side */}
        <div className="hidden md:flex items-center space-x-2 md:space-x-4">
          {isDashboardRoute ? (
            <>
              <div className="flex items-center text-sm text-gray-500 mr-2 border-r pr-4">
                <span className="truncate max-w-[150px]">Ile-Ife, Osun</span>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-emerald-600">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="shadow-sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile: Search icon (dashboard) + Hamburger */}
        <div className="flex md:hidden items-center space-x-1 ml-auto">
          {isDashboardRoute && (
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
          className="md:hidden border-t bg-white shadow-lg"
        >
          <nav className="flex flex-col p-4 space-y-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile auth links */}
            {!isDashboardRoute && (
              <div className="flex flex-col gap-2 pt-4 border-t mt-2">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
