"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function FinancialTools() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center bg-navy text-yellow">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-6">Financial Tools</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ToolCard
              title="Budget Calculator"
              description="Manage your monthly budget effectively."
              link="/budget-calculator"
            />
            <ToolCard
              title="Savings Planner"
              description="Plan and track your savings goals."
              link="/budget-calculator"
            />
            <ToolCard
              title="Debt Calculator"
              description="Calculate and manage your debts efficiently."
              link="/debt-calculator"
            />
            <ToolCard
              title="Investment Tracker"
              description="Monitor and manage your investments efficiently."
              link="/investment-tracker"
            />
            </div>
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
    <Link href={link}>
      <div className="p-6 bg-white rounded-lg shadow-md text-gray-200 bg-opacity-20 hover:bg-opacity-30 hover:shadow-lg transform hover:-translate-y-1 transition duration-200 cursor-pointer">
        <h2 className="text-lg font-semibold text-navy mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
      </div>
    </Link>
  );
}
