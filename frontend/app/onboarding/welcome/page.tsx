'use client';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-navy text-yellow text-center px-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Financial Literacy Journey</h1>
      <p className="mb-8">Empowering you to take control of your financial future with culturally inclusive tools and resources.</p>
      <button 
        onClick={() => router.push('/onboarding/goal-setting')}
        className="bg-yellow text-navy px-4 py-2 rounded-md"
      >
        Get Started
      </button>
    </div>
  );
}
