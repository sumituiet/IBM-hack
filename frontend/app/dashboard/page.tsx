"use client";
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
        <Navbar />
        <div className="p-6 bg-navy min-h-screen text-yellow">
            <h1 className="text-3xl font-bold mb-8 text-center">Welcome to Your Financial Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Financial Health Check Summary */}
                <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
                <h2 className="text-xl font-semibold text-navy mb-4">Financial Health Check</h2>
                <p className="mb-4">See an overview of your financial health and personalized tips to improve it.</p>
                <Link href="/health-check-summary">
                    <button className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200">
                    View Health Summary
                    </button>
                </Link>
                </div>

                {/* Financial Tools */}
                <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
                <h2 className="text-xl font-semibold text-navy mb-4">Financial Tools</h2>
                <p className="mb-4">Access tools like the Budget Calculator, Savings Planner, and Spending Analyser.</p>
                <Link href="/financial-tools">
                    <button className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200">
                    Go to Tools
                    </button>
                </Link>
                </div>

                {/* Education Modules */}
                <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
                <h2 className="text-xl font-semibold text-navy mb-4">Education Modules</h2>
                <p className="mb-4">Learn about budgeting, saving, investing, and more with our interactive courses.</p>
                <Link href="/education-modules">
                    <button className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200">
                    Start Learning
                    </button>
                </Link>
                </div>

                {/* Connect with Advisors */}
                <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
                <h2 className="text-xl font-semibold text-navy mb-4">Financial Advisors</h2>
                <p className="mb-4">Get personalized advice by connecting with certified financial advisors.</p>
                <Link href="/connect-advisors">
                    <button className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200">
                    Connect Now
                    </button>
                </Link>
                </div>

                {/* Community Resources */}
                <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
                <h2 className="text-xl font-semibold text-navy mb-4">Community Resources</h2>
                <p className="mb-4">Explore resources and assistance programs available in your area.</p>
                <Link href="/community-resources">
                    <button className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200">
                    View Resources
                    </button>
                </Link>
                </div>

                {/* Progress Tracker */}
                <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
                <h2 className="text-xl font-semibold text-navy mb-4">Progress Tracker</h2>
                <p className="mb-4">Monitor your financial literacy progress and see achievements over time.</p>
                <Link href="/progress-tracker">
                    <button className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200">
                    View Progress
                    </button>
                </Link>
                </div>
            </div>
            </div>
    </div>
   
  );
}
