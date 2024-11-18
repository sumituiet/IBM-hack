// app/page.tsx

'use client';

import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

export default function DebtCalculator() {
  const loanTypes = [
    'Personal Loan',
    'Home Loan',
    'Car Loan',
    'Student Loan',
    'Credit Card',
    'Payday Loan',
    'Business Loan',
    'Investment Loan',
    'Line of Credit',
    'Overdraft',
    'Equipment Finance',
    'Margin Loan',
  ];

  const [debts, setDebts] = useState<
    {
      loanType: string;
      principal: number | '';
      interestRate: number | '';
      term: number | '';
      monthlyPayment?: number;
      totalInterest?: number;
      totalPayment?: number;
    }[]
  >([]);

  const [newDebt, setNewDebt] = useState({
    loanType: '',
    principal: '',
    interestRate: '',
    term: '',
  });

  const addDebt = () => {
    if (
      newDebt.loanType &&
      newDebt.principal !== '' &&
      newDebt.interestRate !== '' &&
      newDebt.term !== ''
    ) {
      const principal = parseFloat(newDebt.principal as string);
      const interestRate = parseFloat(newDebt.interestRate as string);
      const term = parseFloat(newDebt.term as string);

      // Calculate monthly payment using the formula for amortizing loans
      const monthlyInterestRate = interestRate / 100 / 12;
      const numberOfPayments = term * 12;
      const monthlyPayment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

      const totalPayment = monthlyPayment * numberOfPayments;
      const totalInterest = totalPayment - principal;

      setDebts([
        ...debts,
        {
          loanType: newDebt.loanType,
          principal,
          interestRate,
          term,
          monthlyPayment,
          totalInterest,
          totalPayment,
        },
      ]);

      setNewDebt({
        loanType: '',
        principal: '',
        interestRate: '',
        term: '',
      });
    }
  };

  const totalDebt = debts.reduce((acc, debt) => acc + (debt.principal as number), 0);
  const totalMonthlyPayment = debts.reduce(
    (acc, debt) => acc + (debt.monthlyPayment || 0),
    0
  );
  const totalInterest = debts.reduce((acc, debt) => acc + (debt.totalInterest || 0), 0);

  return (
    <div>
      <Navbar />
      <div className="max-h-screen text-yellow p-6">
        <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Debt and Loan Calculator</h1>

          {/* Debt Input Form */}
          <section className="mb-8 text-justify">
            <h2 className="text-2xl font-semibold mb-4">Add a Debt or Loan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-gray-300">Loan Type</label>
                <select
                  value={newDebt.loanType}
                  onChange={(e) =>
                    setNewDebt({ ...newDebt, loanType: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded text-gray-700"
                >
                  <option value="">Select Loan Type</option>
                  {loanTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Principal Amount ($)</label>
                <input
                  type="number"
                  value={newDebt.principal}
                  onChange={(e) =>
                    setNewDebt({ ...newDebt, principal: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded text-gray-700"
                  placeholder="e.g., 5000"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Interest Rate (% per annum)</label>
                <input
                  type="number"
                  value={newDebt.interestRate}
                  onChange={(e) =>
                    setNewDebt({ ...newDebt, interestRate: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded text-gray-700"
                  placeholder="e.g., 5.5"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Loan Term (years)</label>
                <input
                  type="number"
                  value={newDebt.term}
                  onChange={(e) => setNewDebt({ ...newDebt, term: e.target.value })}
                  className="w-full px-3 py-2 border rounded text-gray-700"
                  placeholder="e.g., 3"
                />
              </div>
            </div>
            <button
              onClick={addDebt}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Debt
            </button>
          </section>

          {/* Debts Table */}
          {debts.length > 0 && (
            <section className="mb-8 text-justify">
              <h2 className="text-2xl font-semibold mb-4">Your Debts and Loans</h2>
              <table className="w-full text-gray-300">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Loan Type</th>
                    <th className="border px-2 py-1">Principal ($)</th>
                    <th className="border px-2 py-1">Interest Rate (%)</th>
                    <th className="border px-2 py-1">Term (years)</th>
                    <th className="border px-2 py-1">Monthly Payment ($)</th>
                    <th className="border px-2 py-1">Total Interest ($)</th>
                    <th className="border px-2 py-1">Total Payment ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {debts.map((debt, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-1">{debt.loanType}</td>
                      <td className="border px-2 py-1">{typeof debt.principal === 'number' ? debt.principal.toFixed(2) : debt.principal}</td>
                      <td className="border px-2 py-1">{typeof debt.interestRate === 'number' ? debt.interestRate.toFixed(2) : debt.interestRate}</td>
                      <td className="border px-2 py-1">{debt.term}</td>
                      <td className="border px-2 py-1">{debt.monthlyPayment!.toFixed(2)}</td>
                      <td className="border px-2 py-1">{debt.totalInterest!.toFixed(2)}</td>
                      <td className="border px-2 py-1">{debt.totalPayment!.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Summary */}
          {debts.length > 0 && (
            <section className="mb-8 text-justify">
              <h2 className="text-2xl font-semibold mb-4">Summary</h2>
              <p className="text-gray-300">
                <strong>Total Debt:</strong> ${totalDebt.toFixed(2)}
              </p>
              <p className="text-gray-300">
                <strong>Total Monthly Payment:</strong> ${totalMonthlyPayment.toFixed(2)}
              </p>
              <p className="text-gray-300">
                <strong>Total Interest Over Time:</strong> ${totalInterest.toFixed(2)}
              </p>
            </section>
          )}

          {/* Disclaimer */}
          <section className="mt-8 text-justify">
            <p className="text-gray-600 text-sm">
              <strong>Disclaimer:</strong> This calculator provides estimates only and does not constitute financial advice. Interest rates and loan terms can vary based on individual circumstances. Please consult a financial advisor or lender for personalized information.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
