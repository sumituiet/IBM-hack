// components/Navbar.tsx

"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../app/_lib/supabaseClient';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login'); // Redirect to login after logout
  };

  return (
    <nav className="bg-navy text-yellow px-6 py-4 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link href="/dashboard">Financial App</Link>
        </h1>

        {/* Links */}
        <div className="space-x-6">
          <Link href="/dashboard" className="hover:text-blue-300 transition duration-200">Dashboard</Link>
          <Link href="/financial-tools" className="hover:text-blue-300 transition duration-200">Tools</Link>
          <Link href="/education-modules" className="hover:text-blue-300 transition duration-200">Education</Link>
          <Link href="/health-check-summary" className="hover:text-blue-300 transition duration-200">Health Check</Link>
          <Link href="/connect-advisors" className="hover:text-blue-300 transition duration-200">Advisors</Link>
          <Link href="/community-resources" className="hover:text-blue-300 transition duration-200">Resources</Link>
          <Link href="/progress-tracker" className="hover:text-blue-300 transition duration-200">Progress</Link>
          <button
            onClick={handleLogout}
            className="bg-yellow text-navy font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
