"use client";
import Navbar from '@/components/Navbar';

export default function ProgressTracker() {
  return (
    <div>
        <Navbar/>
        <div className="p-6 bg-navy min-h-screen text-yellow">
            <h1 className="text-2xl font-bold mb-6 text-center">Progress Tracker</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
                <p>Track your progress in financial education and see how much you’ve achieved.</p>
                <ul className="list-disc pl-5 my-4">
                <li><strong>Budgeting Module:</strong> Completed</li>
                <li><strong>Debt Management Module:</strong> In Progress</li>
                <li><strong>Investing 101 Module:</strong> Not Started</li>
                </ul>
            </div>
            </div>
    </div>
    
  );
}
