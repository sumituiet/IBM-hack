// app/page.tsx

'use client';

import Navbar from '@/components/Navbar';
import React from 'react';

export default function DebtManagement() {
  return (
    <div>
      <Navbar />
      <div className="max-h-screen text-yellow p-6">
        <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg ">
          <h1 className="text-3xl font-bold mb-6 text-center">Debt Management</h1>

          {/* Understanding Debt */}
          <section className="mb-8 text-justify">
            <h2 className="text-2xl font-semibold mb-4">Understanding Debt</h2>
            <p className="text-gray-300 mb-4">
              Debt is money borrowed by one party from another, often to make large purchases that they could not afford under normal circumstances. Common forms of debt include loans, credit cards, mortgages, and student loans. Understanding your debt is the first step toward effective debt management.
            </p>
          </section>

          {/* Types of Debt */}
          <section className="mb-8 text-justify">
            <h2 className="text-2xl font-semibold mb-4">Types of Debt</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <strong>Secured Debt:</strong> Backed by collateral, such as a house or car. Examples include mortgages and auto loans.
              </li>
              <li>
                <strong>Unsecured Debt:</strong> Not backed by collateral. Examples include credit cards, medical bills, and personal loans.
              </li>
              <li>
                <strong>Revolving Debt:</strong> Allows you to borrow up to a certain limit and repay over time, such as credit cards and lines of credit.
              </li>
              <li>
                <strong>Installment Debt:</strong> Repaid over a set period with regular payments, such as student loans and mortgages.
              </li>
            </ul>
          </section>

          {/* Strategies for Managing Debt */}
          <section className="mb-8 text-justify">
            <h2 className="text-2xl font-semibold mb-4">Strategies for Managing Debt</h2>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>
                <strong>Create a Debt Inventory:</strong> List all your debts, including balances, interest rates, and minimum payments.
              </li>
              <li>
                <strong>Prioritize Debts:</strong> Decide which debts to pay off first based on interest rates or balances.
              </li>
              <li>
                <strong>Develop a Repayment Plan:</strong> Choose a strategy, such as the snowball or avalanche method, to systematically pay down debts.
              </li>
              <li>
                <strong>Consolidate Debts:</strong> Consider combining multiple debts into a single loan with a lower interest rate.
              </li>
              <li>
                <strong>Negotiate with Creditors:</strong> Contact creditors to discuss possible reductions in interest rates or payment plans.
              </li>
              <li>
                <strong>Seek Professional Advice:</strong> Consult a financial counselor for personalized assistance.
              </li>
            </ol>
          </section>

          {/* Tips for Reducing Debt */}
          <section className="mb-8 text-justify">
            <h2 className="text-2xl font-semibold mb-4">Tips for Reducing Debt</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <strong>Budget Wisely:</strong> Create and stick to a budget to control spending.
              </li>
              <li>
                <strong>Increase Income:</strong> Explore opportunities for additional income, such as a part-time job or freelance work.
              </li>
              <li>
                <strong>Avoid New Debt:</strong> Refrain from taking on additional debt while paying off existing obligations.
              </li>
              <li>
                <strong>Make Extra Payments:</strong> Allocate extra funds toward debt repayment when possible.
              </li>
              <li>
                <strong>Use Windfalls Wisely:</strong> Apply tax refunds or bonuses to reduce debt.
              </li>
              <li>
                <strong>Cut Unnecessary Expenses:</strong> Identify and eliminate non-essential spending.
              </li>
            </ul>
          </section>

          {/* Additional Resources */}
          <section className="mb-8 text-justify">
            <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
            <p className="text-gray-300 mb-4">
              For more information on debt management and financial assistance, consider these resources:
            </p>
            <ul className="list-disc list-inside space-y-2">
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
                  href="https://moneysmart.gov.au/managing-debt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  MoneySmart - Managing Debt
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
