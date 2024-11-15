"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function FinancialTools() {
  return (
    <div>
        <Navbar />
        <div className="p-6 bg-navy min-h-screen text-yellow">
        <h1 className="text-2xl font-bold mb-6 text-center">Financial Tools</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ToolCard title="Budget Calculator" description="Manage your monthly budget effectively." link="/budget-calculator" />
            <ToolCard title="Savings Planner" description="Plan and track your savings goals." link="/savings-planner" />
            <ToolCard title="Spending Analyzer" description="Analyze spending to find areas to save." link="/spending-analyzer" />
        </div>
        </div>
    </div>

  );
}

interface ToolCardProps {
  title: string;
  description: string;
  link: string;
}

function ToolCard({ title, description, link }: ToolCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
      <h2 className="text-lg font-semibold text-navy mb-4">{title}</h2>
      <p className="mb-4">{description}</p>
      <Link href={link}>
        <button className="py-2 px-4 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200">
          Open Tool
        </button>
      </Link>
    </div>
  );
}
