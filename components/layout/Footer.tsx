import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-emerald-600">MediFind</p>
            <p className="text-sm text-gray-500 mt-1">
              Find medicines in pharmacies across Nigeria.
            </p>
          </div>
          <div className="flex gap-4 text-sm text-gray-600">
            <Link href="#" className="hover:text-emerald-600">About</Link>
            <Link href="#" className="hover:text-emerald-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-emerald-600">Terms of Service</Link>
            <Link href="#" className="hover:text-emerald-600">Contact</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} MediFind. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
