// app/onboarding/health-check/page.tsx

"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HealthCheck() {
  const router = useRouter();
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');

  const handleNext = () => {
    // Handle storing or processing data here if needed
    router.push('/onboarding/get-started'); // Proceed to the final onboarding step
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-navy text-yellow px-6">
      <h1 className="text-2xl font-bold mb-8 text-center">Financial Health Check</h1>
      
      <p className="text-center mb-6">
        Answer a few quick questions to help us personalize your experience and provide the most relevant advice.
      </p>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-gray-700 space-y-4">
        <div>
          <label className="block font-semibold text-navy mb-2">Monthly Income</label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            placeholder="Enter your monthly income"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-navy mb-2">Monthly Expenses</label>
          <input
            type="number"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
            placeholder="Enter your monthly expenses"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-navy mb-2">Savings Goal</label>
          <input
            type="text"
            value={savingsGoal}
            onChange={(e) => setSavingsGoal(e.target.value)}
            placeholder="Enter your savings goal (e.g., save $5000)"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
