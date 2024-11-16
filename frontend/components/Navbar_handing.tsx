// components/Navbar.tsx

"use client";
import Link from 'next/link';

export default function Navbar() {

  return (
    <nav className="bg-navy text-yellow px-6 py-4 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">
          <Link href="/">Moola</Link>
        </h1>
        {/* <div className="space-x-6">
          <Link href="/" className="hover:text-blue-300 transition duration-200">Home</Link>
          <Link href="/login" className="hover:text-blue-300 transition duration-200">Login</Link>
            <Link href="/signup" className="hover:text-blue-300 transition duration-200">Signup</Link>

        </div> */}
      </div>
    </nav>
  );
}
