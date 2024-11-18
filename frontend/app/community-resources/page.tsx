'use client';

import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

export default function CommunityResources() {
  const [searchTerm, setSearchTerm] = useState('');

  const resources = [
    {
      title: 'Financial Counselling Australia',
      category: 'Financial Counselling',
      description:
        'Provides free financial counselling to Australians experiencing financial difficulties.',
      link: 'https://www.financialcounsellingaustralia.org.au/',
    },
    {
      title: 'MoneySmart',
      category: 'Budgeting Tools',
      description:
        'Government website offering budgeting tools and financial guidance.',
      link: 'https://moneysmart.gov.au/',
    },
    {
      title: 'ASIC’s MoneySmart Calculators',
      category: 'Budgeting Tools',
      description:
        'A collection of calculators to help with budgeting, savings, and loans.',
      link: 'https://moneysmart.gov.au/tools-and-resources/calculators-and-apps',
    },
    {
      title: 'National Debt Helpline',
      category: 'Debt Management',
      description:
        'Offers free advice to help Australians tackle their debt problems.',
      link: 'https://ndh.org.au/',
    },
    {
      title: 'Good Shepherd Microfinance',
      category: 'Loans and Credit',
      description:
        'Provides fair and affordable financial programs to people on low incomes.',
      link: 'https://goodshepherdmicrofinance.org.au/',
    },
    {
      title: 'Australian Securities and Investments Commission (ASIC)',
      category: 'Regulatory Information',
      description:
        'Provides information on financial rights and protections.',
      link: 'https://asic.gov.au/',
    },
    {
      title: 'Emergency Relief and Food Access Service',
      category: 'Emergency Assistance',
      description:
        'Helps people find food relief and emergency support services.',
      link: 'https://www.askizzy.org.au/food/',
    },
    {
      title: 'Centrelink',
      category: 'Government Support',
      description:
        'Provides information on government payments and services.',
      link: 'https://www.servicesaustralia.gov.au/centrelink',
    },
  ];

  const categories = [
    'All',
    'Financial Counselling',
    'Budgeting Tools',
    'Debt Management',
    'Loans and Credit',
    'Regulatory Information',
    'Emergency Assistance',
    'Government Support',
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <Navbar/>
    <div className="max-h-screen bg-navy text-yellow flex items-center justify-center px-6">
      <div className="max-w-8xl  rounded-lg p-8 shadow-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Community Resources</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 mb-4 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search resources..."
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Categories:</h2>
          <div className="flex flex-wrap">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`mr-2 mb-2 px-4 py-2 rounded ${
                  selectedCategory === category
                    ? 'bg-yellow text-navy font-semibold'
                    : 'bg-gray-700 text-white'
                } hover:bg-yellow hover:text-navy`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                <p className="text-sm mb-2">Category: {resource.category}</p>
                <p className="text-sm mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 inline-block"
                >
                  Visit Website
                </a>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-300">
              No resources found.
            </p>
          )}
        </div>
      </div>
    </div>
    </div>

  );
}
