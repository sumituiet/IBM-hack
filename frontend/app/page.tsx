'use client';
import Navbar from '@/components/Navbar_handing';
import Link from 'next/link';
export default function Welcome() {
  
  return (
    <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen bg-navy text-yellow text-center px-6 scrollbar-hide">

        <h1 className="text-6xl font-bold mb-4">Welcome to Your Financial Literacy Journey</h1>
        <p className="mb-8 italic text-2xl">Empowering you to take control of your financial future with culturally inclusive tools and resources.</p>
        
        <div className="flex space-x-4 ">
          <Link href="/signup">
            <button className="bg-yellow text-navy font-bold py-2 px-4 rounded-lg border  hover:border-orange-500 hover:text-lg hover:text-orange-500">Sign In</button>
          </Link>
          <Link href="/login">
            <button className="bg-yellow text-navy font-bold py-2 px-4 rounded-lg border hover:border-orange-500 hover:text-lg hover:text-amber-600">Login</button>
          </Link>
        </div>

        </div>
    </div>

  );
}
