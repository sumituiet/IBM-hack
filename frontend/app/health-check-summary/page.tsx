"use client";
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function HealthCheckSummary() {
  return (
    <div>
        <Navbar/>
        <div className="p-6 bg-navy min-h-screen text-yellow">
            <h1 className="text-2xl font-bold mb-6 text-center">Financial Health Summary</h1>
            
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-navy mb-4">Your Financial Status</h2>
                <p>Based on your input, here’s a snapshot of your financial health and some tips to improve:</p>
                
                <ul className="list-disc pl-5 my-4">
                <li><strong>Monthly Income:</strong> $3,500</li>
                <li><strong>Monthly Expenses:</strong> $2,200</li>
                <li><strong>Savings Goal:</strong> $5,000</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-navy mt-6">Personalized Tips</h3>
                <p>Consider reducing discretionary spending to save more each month. Aim to increase your savings rate by 10% to reach your goal faster.</p>
                
                <Link href="/dashboard">
                <button className="mt-6 py-2 px-4 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200">
                    Back to Dashboard
                </button>
                </Link>
            </div>
            </div>
    </div>
    
  );
}
