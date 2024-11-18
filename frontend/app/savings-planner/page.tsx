'use client';

import React, { useState } from 'react';
import {
  Line,
  Bar,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter for time scales

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  TimeScale,
  Tooltip,
  Legend
);

export default function SavingsPlanner() {
  const [goalAmount, setGoalAmount] = useState<number | ''>('');
  const [targetDate, setTargetDate] = useState<string>('');
  const [currentSavings, setCurrentSavings] = useState<number | ''>('');
  const [savingsHistory, setSavingsHistory] = useState<
    { date: string; amount: number }[]
  >([]);
  const [contributionAmount, setContributionAmount] = useState<number | ''>('');

  // Calculate days remaining
  const today = new Date();
  const endDate = targetDate ? new Date(targetDate) : null;
  const daysRemaining = endDate
    ? Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // Calculate total needed to save
  const totalNeeded =
    typeof goalAmount === 'number' && typeof currentSavings === 'number'
      ? goalAmount - currentSavings
      : null;

  // Calculate savings per period
  const dailySavings =
    totalNeeded !== null && daysRemaining !== null && daysRemaining > 0
      ? totalNeeded / daysRemaining
      : null;
  const weeklySavings = dailySavings !== null ? dailySavings * 7 : null;
  const monthlySavings = dailySavings !== null ? (dailySavings * 30) / 1 : null;

  // Calculate progress
  const progress =
    typeof currentSavings === 'number' && typeof goalAmount === 'number' && goalAmount > 0
      ? (currentSavings / goalAmount) * 100
      : 0;

  // Add savings contribution
  const addContribution = () => {
    if (typeof contributionAmount === 'number' && contributionAmount > 0) {
      const newSavings = (currentSavings || 0) + contributionAmount;
      setCurrentSavings(newSavings);
      setSavingsHistory([
        ...savingsHistory,
        { date: new Date().toISOString().split('T')[0], amount: newSavings },
      ]);
      setContributionAmount('');
    }
  };

  // Prepare data for charts
  const dates = savingsHistory.map((entry) => entry.date);
  const amounts = savingsHistory.map((entry) => entry.amount);

  const lineChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Savings Over Time',
        data: amounts,
        fill: false,
        borderColor: '#4caf50',
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Savings Contributions',
        data: amounts,
        backgroundColor: '#36a2eb',
      },
    ],
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto p-6 bg-white bg-opacity-20 rounded shadow-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Savings Planner</h1>

        {/* Savings Goal Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Set Your Savings Goal</h2>
          <div className="mb-4">
            <label className="block mb-2">Goal Amount:</label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) =>
                setGoalAmount(
                  e.target.value === '' ? '' : parseFloat(e.target.value)
                )
              }
              className="w-full px-3 py-2 border rounded mb-2 text-gray-700"
              placeholder="Enter your savings goal amount"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Target Date:</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Current Savings:</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) =>
                setCurrentSavings(
                  e.target.value === '' ? '' : parseFloat(e.target.value)
                )
              }
              className="w-full px-3 py-2 border rounded mb-2 text-gray-700"
              placeholder="Enter your current savings"
            />
          </div>
        </div>

        {/* Savings Plan Calculation */}
        {totalNeeded !== null && daysRemaining !== null && daysRemaining > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Savings Plan</h2>
            <p className="mb-2">
              To reach your goal of ${goalAmount} by {targetDate}, you need to save:
            </p>
            <ul className="list-disc list-inside">
              <li>
                Daily: <strong>${dailySavings!.toFixed(2)}</strong>
              </li>
              <li>
                Weekly: <strong>${weeklySavings!.toFixed(2)}</strong>
              </li>
              <li>
                Monthly: <strong>${monthlySavings!.toFixed(2)}</strong>
              </li>
            </ul>
          </div>
        )}

        {/* Progress Visualization */}
        {typeof goalAmount === 'number' && goalAmount > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Progress</h2>
            <div className="w-full bg-gray-300 rounded-full h-6">
              <div
                className="bg-green-500 h-6 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-200 mt-1">
              {progress.toFixed(2)}% of your goal achieved
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
