// app/page.tsx

'use client';

import Navbar from '@/components/Navbar';
import React from 'react';

export default function RetirementPlanning() {
  return (
    <div>
      <Navbar />
      <div className="max-h-screen text-yellow p-6">
        <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Retirement Planning</h1>

          {/* Understanding Retirement Planning */}
          <section className="mb-8 text-justify">
            <h2 className="text-2xl font-semibold mb-4">Understanding Retirement Planning</h2>
            <p className="text-gray-300 mb-4">
              Retirement planning is the process of determining retirement income goals and the actions and decisions necessary to achieve those goals. It involves identifying sources of income, estimating expenses, implementing a savings program, and managing assets and risk.
            </p>
          </section>

          {/* Importance of Starting Early */}
          <section className="mb-8 text-justify">
            <h2 className="text-2xl font-semibold mb-4">Why Start Early?</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <strong>Compound Interest:</strong> Starting early allows your investments to grow exponentially over time through compound interest.
              </li>
              <li>
                <strong>Financial Security:</strong> Early planning provides greater financial security and peace of mind during retirement.
              </li>
              <li>
                <strong>Flexibility:</strong> Gives you more flexibility to adjust your savings plan as life circumstances change.
              </li>
              <li>
                <strong>Reduced Stress:</strong> Minimizes financial stress in later years by building a solid retirement fund.
              </li>
            </ul>
          </section>

          {/* Steps to Plan for Retirement */}
          <section className="mb-8 text-justify">
            <h2 className="text-2xl font-semibold mb-4">Steps to Plan for Retirement</h2>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>
                <strong>Set Retirement Goals:</strong> Determine at what age you wish to retire and the lifestyle you desire.
              </li>
              <li>
                <strong>Estimate Retirement Expenses:</strong> Calculate your expected expenses during retirement, including housing, healthcare, and leisure activities.
              </li>
              <li>
                <strong>Assess Current Financial Position:</strong> Review your current savings, investments, and any retirement accounts.
              </li>
              <li>
                <strong>Develop a Savings Plan:</strong> Determine how much you need to save regularly to meet your retirement goals.
              </li>
              <li>
                <strong>Invest Wisely:</strong> Choose appropriate investment vehicles based on your risk tolerance and time horizon.
              </li>
              <li>
                <strong>Monitor and Adjust:</strong> Regularly review your retirement plan and make adjustments as needed.
              </li>
            </ol>
          </section>

          {/* Tips for Successful Retirement Planning */}
          <section className="mb-8 text-justify">
            <h2 className="text-2xl font-semibold mb-4">Tips for Successful Retirement Planning</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <strong>Start Now:</strong> It's never too early or too late to start planning for retirement.
              </li>
              <li>
                <strong>Maximize Super Contributions:</strong> Take advantage of employer superannuation contributions and consider additional voluntary contributions.
              </li>
              <li>
                <strong>Diversify Investments:</strong> Spread your investments across different asset classes to manage risk.
              </li>
              <li>
                <strong>Avoid Unnecessary Debt:</strong> Pay off high-interest debts to free up more money for savings.
              </li>
              <li>
                <strong>Seek Professional Advice:</strong> Consult a financial advisor for personalized retirement planning.
              </li>
              <li>
                <strong>Stay Informed:</strong> Keep up-to-date with changes in laws and regulations affecting retirement savings.
              </li>
            </ul>
          </section>

          {/* Additional Resources */}
          <section className="mb-8 text-justify">
            <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
            <p className="text-gray-300 mb-4">
              For more information on retirement planning, consider these resources:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a
                  href="https://moneysmart.gov.au/retirement-income"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  MoneySmart - Retirement Income
                </a>
              </li>
              <li>
                <a
                  href="https://www.ato.gov.au/Individuals/Super/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Australian Taxation Office - Superannuation
                </a>
              </li>
              <li>
                <a
                  href="https://www.servicesaustralia.gov.au/individuals/subjects/age-pension-and-planning-your-retirement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Services Australia - Age Pension and Planning Your Retirement
                </a>
              </li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section className="mt-8 text-justify">
            <p className="text-gray-600 text-sm">
              <strong>Disclaimer:</strong> The information provided on this page is for general informational purposes only and should not be considered financial advice. Please consult a qualified financial advisor for advice tailored to your specific circumstances.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
