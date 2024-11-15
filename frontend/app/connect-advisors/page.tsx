"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FinancialAdvisors() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="p-6 bg-navy min-h-screen text-yellow">
      <h1 className="text-2xl font-bold mb-6 text-center">Connect with Financial Advisors</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
        <p>Our certified financial advisors are here to help you with any questions or guidance on your financial journey.</p>
        <Link href="/chatbot">
          <button className="mt-6 py-2 px-4 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200" >
            Connect Now
          </button>
        </Link>
      </div>
    </div>
  );
}
