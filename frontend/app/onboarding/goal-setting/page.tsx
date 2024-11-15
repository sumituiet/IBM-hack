// app/onboarding/goals-setup/page.tsx

"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function GoalsSetup() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prevGoals) =>
      prevGoals.includes(goal)
        ? prevGoals.filter((g) => g !== goal)
        : [...prevGoals, goal]
    );
  };

  const handleNext = () => {
    // Perform any action with selected goals, such as storing them or sending them to an API
    router.push('/onboarding/features-overview');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-navy text-yellow px-6">
      <h1 className="text-2xl font-bold mb-8 text-center">What are Your Financial Goals?</h1>
      <p className="text-center mb-6">Select one or more goals to personalize your experience.</p>

      <div className="w-full max-w-md grid grid-cols-1 gap-4">
        {['Save for a Big Purchase', 'Debt Management', 'Budgeting and Saving', 'Investing'].map((goal) => (
          <button
            key={goal}
            onClick={() => toggleGoal(goal)}
            className={`px-4 py-2 border rounded-md ${
              selectedGoals.includes(goal) ? 'bg-yellow text-navy' : 'bg-white text-gray-700'
            } hover:bg-yellow hover:text-navy transition duration-200`}
          >
            {goal}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedGoals.length === 0}
        className="mt-8 w-full max-w-md py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
