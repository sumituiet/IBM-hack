"use client";
import { useRouter } from 'next/navigation';

export default function GetStarted() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard'); // Navigate to the main dashboard or app home page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-navy text-yellow px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">You're All Set!</h1>
      <p className="text-center mb-8">
        Welcome aboard! You’re now ready to start exploring your personalized financial tools, resources, and advice.
      </p>

      <button
        onClick={handleGetStarted}
        className="w-full max-w-md py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
