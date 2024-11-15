'use client';
import Navbar from '@/components/Navbar_handing';

export default function Welcome() {
  
  return (
    <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen bg-navy text-yellow text-center px-6 scrollbar-hide">

        <h1 className="text-3xl font-bold mb-4">Welcome to Your Financial Literacy Journey</h1>
        <p className="mb-8">Empowering you to take control of your financial future with culturally inclusive tools and resources.</p>

        </div>
    </div>

  );
}
