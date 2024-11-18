// app/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  Pie,
  Bar,
  Line,
  Doughnut,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

export default function BudgetCalculator() {
  const [incomes, setIncomes] = useState<
    { description: string; amount: number }[]
  >([]);
  const [expenses, setExpenses] = useState<
    { description: string; amount: number; category: string }[]
  >([]);
  const [incomeDesc, setIncomeDesc] = useState('');
  const [incomeAmount, setIncomeAmount] = useState<number | ''>('');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState<number | ''>('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [savingsGoal, setSavingsGoal] = useState<number | ''>('');
  const [isEditingExpense, setIsEditingExpense] = useState<number | null>(null);
  const [isEditingIncome, setIsEditingIncome] = useState<number | null>(null);

  const incomeTotal = incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const expensesTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = incomeTotal - expensesTotal;
  const savingsProgress =
    typeof savingsGoal === 'number' && savingsGoal > 0
      ? ((balance >= 0 ? balance : 0) / savingsGoal) * 100
      : 0;

  const expenseCategories = [
    'Housing',
    'Transportation',
    'Food',
    'Utilities',
    'Insurance',
    'Healthcare',
    'Entertainment',
    'Personal',
    'Other',
  ];

  const COLORS = [
    '#ff6384', // Housing
    '#36a2eb', // Transportation
    '#ffce56', // Food
    '#4bc0c0', // Utilities
    '#9966ff', // Insurance
    '#a0522d', // Healthcare
    '#8a2be2', // Entertainment
    '#00ced1', // Personal
    '#ffa500', // Other
  ];

  const addIncome = () => {
    if (incomeDesc && typeof incomeAmount === 'number') {
      if (isEditingIncome !== null) {
        const updatedIncomes = incomes.map((income, index) =>
          index === isEditingIncome
            ? { description: incomeDesc, amount: incomeAmount }
            : income
        );
        setIncomes(updatedIncomes);
        setIsEditingIncome(null);
      } else {
        setIncomes([...incomes, { description: incomeDesc, amount: incomeAmount }]);
      }
      setIncomeDesc('');
      setIncomeAmount('');
    }
  };

  const addExpense = () => {
    if (
      expenseDesc &&
      typeof expenseAmount === 'number' &&
      expenseCategory
    ) {
      if (isEditingExpense !== null) {
        const updatedExpenses = expenses.map((expense, index) =>
          index === isEditingExpense
            ? {
                description: expenseDesc,
                amount: expenseAmount,
                category: expenseCategory,
              }
            : expense
        );
        setExpenses(updatedExpenses);
        setIsEditingExpense(null);
      } else {
        setExpenses([
          ...expenses,
          {
            description: expenseDesc,
            amount: expenseAmount,
            category: expenseCategory,
          },
        ]);
      }
      setExpenseDesc('');
      setExpenseAmount('');
      setExpenseCategory('');
    }
  };

  const editExpense = (index: number) => {
    const expense = expenses[index];
    setExpenseDesc(expense.description);
    setExpenseAmount(expense.amount);
    setExpenseCategory(expense.category);
    setIsEditingExpense(index);
  };

  const deleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const editIncome = (index: number) => {
    const income = incomes[index];
    setIncomeDesc(income.description);
    setIncomeAmount(income.amount);
    setIsEditingIncome(index);
  };

  const deleteIncome = (index: number) => {
    setIncomes(incomes.filter((_, i) => i !== index));
  };

  const expenseDataValues = expenseCategories.map((category) => {
    const total = expenses
      .filter((expense) => expense.category === category)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return total;
  });

  const expenseChartData = {
    labels: expenseCategories,
    datasets: [
      {
        data: expenseDataValues,
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS,
      },
    ],
  };

  const incomeData = {
    labels: incomes.map((income) => income.description),
    datasets: [
      {
        label: 'Income',
        data: incomes.map((income) => income.amount),
        backgroundColor: '#4caf50',
      },
    ],
  };

  const monthlyExpensesData = {
    labels: expenses.map((expense, index) => `Expense ${index + 1}`),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount),
        fill: false,
        borderColor: '#ff6384',
        tension: 0.1,
      },
    ],
  };

  const transactionHistory = [
    ...incomes.map((income, index) => ({
      id: `income-${index}`,
      date: new Date().toISOString().split('T')[0],
      description: income.description,
      amount: income.amount,
    })),
    ...expenses.map((expense, index) => ({
      id: `expense-${index}`,
      date: new Date().toISOString().split('T')[0],
      description: expense.description,
      amount: -expense.amount,
    })),
  ].sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <div className="scrollbar-hide overflow-auto min-h-screen">
        <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
        {/* Welcome Card */}
        <div className="rounded shadow p-4 bg-white bg-opacity-20">
          <h2 className="text-xl font-bold mb-4">Welcome to your Budget Calculator</h2>
          <p className="mb-4">
            Use this tool to manage your income and expenses effectively.
          </p>
          <div className="mb-4">
            <h3 className="font-semibold">Balance:</h3>
            <p className={balance >= 0 ? 'text-green-500' : 'text-red-500'}>
              ${balance.toFixed(2)}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Savings Goal Progress:</h3>
            {typeof savingsGoal === 'number' && savingsGoal > 0 ? (
              <div className="mt-2">
                <div className="w-full bg-gray-300 rounded-full h-4 ">
                  <div
                    className="bg-green-500 h-4 rounded-full max-w-full"
                    style={{ width: `${savingsProgress}%` }}
                    
                  ></div>
                </div>
                <p className="text-sm text-gray-200 mt-1 ">
                  {savingsProgress.toFixed(2)}% of your goal achieved
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-200">No savings goal set.</p>
            )}
          </div>
                  {/* Savings Goal */}
        <div className="rounded shadow p-4 ">
          <h2 className="text-xl font-bold mb-4">Set Savings Goal</h2>
          <input
            type="number"
            value={savingsGoal}
            onChange={(e) =>
              setSavingsGoal(
                e.target.value === '' ? '' : parseFloat(e.target.value)
              )
            }
            className="w-full px-3 py-2 border rounded mb-2 text-gray-700"
            placeholder="Enter your savings goal"
          />
        </div>
        </div>

        {/* Income Sources */}
        <div className="rounded shadow p-4 bg-white bg-opacity-20">
          <h2 className="text-xl font-bold mb-4">Income Sources</h2>
          <Doughnut
            data={{
              labels: incomes.map((income) => income.description),
              datasets: [
                {
                  data: incomes.map((income) => income.amount),
                  backgroundColor: COLORS,
                  hoverBackgroundColor: COLORS,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: true,
                  position: 'bottom',
                  labels:{
                    color: '#f0f0f0'
                  }
                },

              },
            }}
          />
        </div>

        {/* Expense Chart */}
        <div className="rounded shadow p-4 bg-white bg-opacity-20">
          <h2 className="text-xl font-bold mb-4">Expenses by Category</h2>
          <Pie
            data={expenseChartData}
            options={{
              plugins: {
                legend: {
                  display: true,
                  position: 'bottom',
                  labels:{
                    color:  '#f0f0f0    '
                  }

                },
              },
            }}
          />
        </div>

        {/* Monthly Expenses Line Chart */}
        <div className="rounded shadow p-4 bg-white bg-opacity-20">
          <h2 className="text-xl font-bold mb-4">Expenses Over Time</h2>
          <Line
            data={monthlyExpensesData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  display: false,
                  ticks: {color: "#f0f0f0"},
                },
                y: {
                  beginAtZero: true,
                  grid: {display: false,},
                  ticks: {color: "#f0f0f0"},
                },
              },
            }}
          />
        </div>

        {/* Income Form */}
        <div className="rounded shadow p-4 bg-white md:col-span-2 bg-opacity-20">
          <h2 className="text-xl font-bold mb-4">Add Income</h2>
          <div className="mb-4">
            <input
              type="text"
              value={incomeDesc}
              onChange={(e) => setIncomeDesc(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2 text-gray-700"
              placeholder="Income description"
            />
            <input
              type="number"
              value={incomeAmount}
              onChange={(e) =>
                setIncomeAmount(
                  e.target.value === '' ? '' : parseFloat(e.target.value)
                )
              }
              className="w-full px-3 py-2 border rounded mb-2 text-gray-700"
              placeholder="Amount"
            />
            <button
              onClick={addIncome}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              {isEditingIncome !== null ? 'Update Income' : 'Add Income'}
            </button>
          </div>
          <h3 className="text-lg font-semibold mb-2">Income List</h3>
          {incomes.length > 0 ? (
            incomes.map((income, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-medium">{income.description}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">${income.amount.toFixed(2)}</span>
                  <button
                    onClick={() => editIncome(index)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteIncome(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No income added yet.</p>
          )}
        </div>

        {/* Expense Form */}
        <div className="rounded shadow p-4 bg-white md:col-span-2 bg-opacity-20">
          <h2 className="text-xl font-bold mb-4">Add Expense</h2>
          <div className="mb-4">
            <input
              type="text"
              value={expenseDesc}
              onChange={(e) => setExpenseDesc(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2 text-gray-700"
              placeholder="Expense description"
            />
            <input
              type="number"
              value={expenseAmount}
              onChange={(e) =>
                setExpenseAmount(
                  e.target.value === '' ? '' : parseFloat(e.target.value)
                )
              }
              className="w-full px-3 py-2 border rounded mb-2 text-gray-700"
              placeholder="Amount"
            />
            <select
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2 text-gray-700"
            >
              <option value="">Select category</option>
              {expenseCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              onClick={addExpense}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {isEditingExpense !== null ? 'Update Expense' : 'Add Expense'}
            </button>
          </div>
          <h3 className="text-lg font-semibold mb-2">Expense List</h3>
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-medium">{expense.description}</span> -{' '}
                  <span className="text-sm text-yellow-500">{expense.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">${expense.amount.toFixed(2)}</span>
                  <button
                    onClick={() => editExpense(index)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExpense(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No expenses added yet.</p>
          )}
        </div>



      </div>
    </div>
  );
}
