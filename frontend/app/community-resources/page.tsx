"use client";
import Link from 'next/link';

export default function CommunityResources() {
  return (
    <div className="p-6 bg-navy min-h-screen text-yellow">
      <h1 className="text-2xl font-bold mb-6 text-center">Community Resources</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
        <p>Explore resources and assistance programs available to support your financial journey.</p>
        <ul className="list-disc pl-5 my-4">
          <li><Link href="https://www.moneysmart.gov.au" className="text-blue-500 underline">MoneySmart by ASIC</Link></li>
          <li><Link href="https://www.iba.gov.au" className="text-blue-500 underline">Indigenous Business Australia</Link></li>
          <li><Link href="https://nils.com.au" className="text-blue-500 underline">No Interest Loan Scheme (NILs)</Link></li>
        </ul>
      </div>
    </div>
  );
}