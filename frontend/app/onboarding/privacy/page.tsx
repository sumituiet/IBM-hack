// app/onboarding/privacy/page.tsx

"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PrivacyScreen() {
  const router = useRouter();
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleNext = () => {
    // You can handle storing the isAnonymous option here if needed
    router.push('/onboarding/health-check'); // Proceed to the next step in the onboarding flow
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-navy text-yellow px-6">
      <h1 className="text-2xl font-bold mb-8 text-center">Your Privacy Matters</h1>
      
      <p className="text-center mb-6">
        We are committed to protecting your data and giving you control over what you share with us.
      </p>
      
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-gray-700">
        <h2 className="font-semibold text-navy mb-4">Data Privacy Options</h2>
        <p className="mb-4">
          You can choose to use the app in anonymous mode. This means we won’t store any personal information, and your usage will remain private.
        </p>
        
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
            className="mr-2 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <span>Use Anonymous Mode</span>
        </label>
        
        <p className="text-sm text-gray-500">
          If you choose not to enable anonymous mode, your data will be stored securely to personalize your experience.
        </p>
      </div>

      <button
        onClick={handleNext}
        className="mt-8 w-full max-w-md py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
      >
        Continue
      </button>
    </div>
  );
}
