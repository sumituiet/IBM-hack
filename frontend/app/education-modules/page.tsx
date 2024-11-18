"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function EducationModules() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center bg-navy text-yellow">
        <div className="p-6 bg-navy text-yellow text-center">
          <h1 className="text-2xl font-bold mb-6 text-center">Education Modules</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EducationCard
              title="Budgeting Basics"
              description="Learn the essentials of budgeting effectively."
              link="/education/budgeting"
            />
            <EducationCard
              title="Debt Management"
              description="Strategies to manage and reduce debt."
              link="/education/debt-management"
            />
            <EducationCard
              title="Investing 101"
              description="Introductory course on safe investing."
              link="/education/investing"
            />
            <EducationCard
              title="Retirement Planning"
              description="Plan for a secure retirement."
              link="/education/retirement-planning"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface EducationCardProps {
  title: string;
  description: string;
  link: string;
}

function EducationCard({ title, description, link }: EducationCardProps) {
  return (
    <Link href={link}>
      <div className="p-6 bg-white rounded-lg shadow-md text-gray-200 bg-opacity-20 hover:bg-opacity-30 hover:shadow-lg transform hover:-translate-y-1 transition duration-200 cursor-pointer">
        <h2 className="text-lg font-semibold text-navy mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
      </div>
    </Link>
  );
}
