"use client";
import { useRouter } from 'next/navigation';

export default function FeaturesOverview() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/privacy'); // Proceed to the privacy screen or next step
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-navy text-yellow px-6">
      <h1 className="text-2xl font-bold mb-8 text-center">Explore Our Unique Features</h1>
      <p className="text-center mb-6">
        We’ve designed these features to support your financial journey in a way that feels personal and helpful.
      </p>

      <div className="w-full max-w-md space-y-4 text-left text-gray-200">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="font-semibold text-gray-900">Interactive Financial Tools</h2>
          <p className='text-gray-800' >Use our Budget Calculator, Savings Planner, and Spending Analyser to get a better grip on your finances.</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="font-semibold text-gray-900">Personalized Financial Health Check</h2>
          <p className='text-gray-800'>Take a quick survey to understand your financial status and receive tailored advice to improve.</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="font-semibold text-gray-900">Culturally Inclusive Financial Education</h2>
          <p className='text-gray-800'>Learn financial skills through scenarios and examples that are relevant to you and your community.</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="font-semibold text-gray-900">Safe Learning Environment</h2>
          <p className='text-gray-800'>We prioritize your privacy and offer options to control what information you share with us.</p>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="mt-8 w-full max-w-md py-2 bg-yellow text-stone-50 font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
      >
        Next
      </button>
    </div>
  );
}
