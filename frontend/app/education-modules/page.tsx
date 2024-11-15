"use client";
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function EducationModules() {
  return (
    <div>
        <Navbar/>
        <div className="p-6 bg-navy min-h-screen text-yellow">
        <h1 className="text-2xl font-bold mb-6 text-center">Education Modules</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EducationCard title="Budgeting Basics" description="Learn the essentials of budgeting effectively." link="/education/budgeting" />
            <EducationCard title="Debt Management" description="Strategies to manage and reduce debt." link="/education/debt-management" />
            <EducationCard title="Investing 101" description="Introductory course on safe investing." link="/education/investing" />
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
        <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
        <h2 className="text-lg font-semibold text-navy mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
        <Link href={link}>
            <button className="py-2 px-4 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200">
            Start Learning
            </button>
        </Link>
        </div>

  );
}