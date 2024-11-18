'use client';

import Navbar from '@/components/Navbar';
import React from 'react';

export default function BudgetingBasics() {
  return (
    <div>
      <Navbar></Navbar>
    <div className="max-h-screen text-yellow p-6">
      <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold mb-6 text-center">Budgeting Basics</h1>

        {/* What is Budgeting? */}
        <section className="mb-8 text-justify">
          <h2 className="text-2xl font-semibold mb-4">What is Budgeting?</h2>
          <p className="text-gray-300 mb-4">
            Budgeting is the process of creating a plan to manage your money. It involves estimating your income and expenses over a specific period, typically a month or a year. A budget helps you understand where your money is going, enables you to make informed financial decisions, and assists in achieving your financial goals.
          </p>
        </section>

        {/* Importance of Budgeting */}
        <section className="mb-8 text-justify">
          <h2 className="text-2xl font-semibold mb-4">Why is Budgeting Important?</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Financial Control:</strong> Helps you take control of your finances and avoid overspending.
            </li>
            <li>
              <strong>Goal Achievement:</strong> Assists in setting and reaching financial goals, such as saving for a house or paying off debt.
            </li>
            <li>
              <strong>Stress Reduction:</strong> Reduces financial stress by providing a clear picture of your financial situation.
            </li>
            <li>
              <strong>Preparedness:</strong> Allows you to prepare for unexpected expenses by setting aside emergency funds.
            </li>
          </ul>
        </section>

        {/* Steps to Create a Budget */}
        <section className="mb-8 text-justify">
          <h2 className="text-2xl font-semibold mb-4">Steps to Create a Budget</h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>
              <strong>Calculate Your Income:</strong> Determine your total monthly income, including salary, bonuses, and any other sources.
            </li>
            <li>
              <strong>List Your Expenses:</strong> Make a list of all your monthly expenses, such as rent, utilities, groceries, transportation, and entertainment.
            </li>
            <li>
              <strong>Categorize Expenses:</strong> Divide your expenses into fixed (rent, loan payments) and variable (dining out, entertainment) categories.
            </li>
            <li>
              <strong>Set Spending Limits:</strong> Allocate a specific amount for each expense category based on your income and financial goals.
            </li>
            <li>
              <strong>Track Your Spending:</strong> Monitor your expenses throughout the month to ensure you stay within your budget.
            </li>
            <li>
              <strong>Adjust as Needed:</strong> Review your budget regularly and make adjustments based on changes in income or expenses.
            </li>
          </ol>
        </section>

        {/* Tips for Successful Budgeting */}
        <section className="mb-8 text-justify">
          <h2 className="text-2xl font-semibold mb-4">Tips for Successful Budgeting</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Be Realistic:</strong> Set achievable goals and realistic spending limits.
            </li>
            <li>
              <strong>Use Budgeting Tools:</strong> Utilize apps or spreadsheets to help manage your budget.
            </li>
            <li>
              <strong>Prioritize Savings:</strong> Treat savings as a fixed expense and contribute to it regularly.
            </li>
            <li>
              <strong>Plan for Irregular Expenses:</strong> Account for expenses that occur annually or semi-annually, like insurance premiums.
            </li>
            <li>
              <strong>Reduce Unnecessary Spending:</strong> Identify areas where you can cut back, such as subscriptions or dining out.
            </li>
            <li>
              <strong>Stay Committed:</strong> Stick to your budget and review it regularly to stay on track.
            </li>
          </ul>
        </section>

        {/* Additional Resources */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
          <p className="text-gray-300 mb-4">
            For more information on budgeting and financial planning, check out these resources:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a
                href="https://moneysmart.gov.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                MoneySmart by ASIC
              </a>
            </li>
            <li>
              <a
                href="https://www.financialcounsellingaustralia.org.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Financial Counselling Australia
              </a>
            </li>
            <li>
              <a
                href="https://ndh.org.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                National Debt Helpline
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
    </div>

  );
}
