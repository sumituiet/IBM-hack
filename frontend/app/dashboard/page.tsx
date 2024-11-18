"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { supabase } from "../_lib/supabaseClient";
import {
  Pie,
  Bar,
  Line,
  Doughnut,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, full_name, email, avatar_url")
          .eq("id", session.user.id)
          .single();

        setEmail(data?.email || null);
        setUsername(data?.username || null);
        setAvatarUrl(data?.avatar_url || `Sample_User_Icon.png`);

      }
      setLoading(false);
    };

    getSession();
  }, []);

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement
  );

  const earned = 1024;
  const earnedTarget = 1800;
  const spent = 1200;
  const wallet = 12999;

  const spendingData = {
    labels: ["Rent", "Groceries", "Utilities", "Entertainment", "Miscellaneous"],
    datasets: [
      {
        label: "My Spendings",
        data: [500, 300, 200, 100, 50],
        backgroundColor: [
          "#ff6384", // Rent
          "#36a2eb", // Groceries
          "#ffce56", // Utilities
          "#4bc0c0", // Entertainment
          "#9966ff", // Miscellaneous
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          // Custom label color
          color: "#f0f0f0", // Replace with your desired label color
          font: {
            size: 14, // Adjust label font size if needed
          },
        },
      },
    },
  };

  const earningsData = {
    labels: ["Earned", "Target"],
    datasets: [
      {
        label: "Earnings",
        data: [earned, earnedTarget],
        backgroundColor: ["#4caf50", "#ff9800"],
        borderColor: ["#388e3c", "#f57c00"],
        borderWidth: 1,
      },
    ],
  };

  const incomeSourceData = {
    labels: ["Salary", "Investments", "Freelancing", "Other"],
    datasets: [
      {
        data: [600, 250, 100, 74],
        backgroundColor: ["#4caf50", "#36a2eb", "#ffce56", "#9966ff"],
        hoverOffset: 4,
      },
    ],
  };

  const monthlyExpensesData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Expenses",
        data: [800, 700, 850, 900, 750],
        fill: false,
        borderColor: "#4bc0c0",
        tension: 0.3,
      },
    ],
  };

  const transactionHistory = [
    { id: 1, date: "2024-11-10", description: "Grocery Shopping", amount: -45 },
    { id: 2, date: "2024-11-09", description: "Salary", amount: 1024 },
    { id: 3, date: "2024-11-07", description: "Movie Tickets", amount: -20 },
    { id: 4, date: "2024-11-05", description: "Utility Bill", amount: -100 },
    { id: 5, date: "2024-11-01", description: "Freelance Work", amount: 150 },
  ];

  return (
    <div className="scrollbar-hide overflow-auto h-screen">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 ">
        {/* Welcome Card */}
        <div className="rounded shadow p-4">
          <h2 className="text-xl font-bold mb-4">Welcome to your Dashboard</h2>
            <img 
                src={avatar_url || "Sample_User_Icon.png"}
                alt="User Avatar" 
                className="w-24 h-24 rounded-full mb-4 border border-gray-300 bg-gray-200"
            />
          {!loading && (
            <div>
              {email ? (
                <p>Logged in as: {email}</p>
              ) : (
                <p>Please log in to access your dashboard.</p>
              )}
              <Link href="/profile">
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                  Go to Profile
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Spending Chart */}
        <div className="rounded shadow p-4">
          <h2 className="text-xl font-bold mb-4">My Spendings</h2>
          <Pie data={spendingData} options={chartOptions} />
        </div>

        {/* Earnings Chart */}
        <div className="rounded shadow p-4">
        <h2 className="text-xl font-bold mb-4">My Earnings</h2>
        <div
            style={{
            height: "25rem", // Set a fixed height
            width: "100%", // Ensure it adjusts to the parent container's width
            }}
        >
            <Bar
            data={earningsData}
            options={{
                responsive: true,
                maintainAspectRatio: false, // Important for making the chart fit within the container
                plugins: {
                    legend: {display: false},

                },
                scales: {
                x: {
                    beginAtZero: true, // Ensure bars start at 0
                    grid: {display: false,},
                    ticks: {color: "#f0f0f0"}, // Adjust label color

                },
                y: {
                    beginAtZero: true,
                    grid: {display: false,},
                    ticks: {color: "#f0f0f0"}

                },
                },
            }}
            />
        </div>
        </div>



        {/* Income Sources */}
        <div className="rounded shadow p-4">
          <h2 className="text-xl font-bold mb-4">Income Sources</h2>
          <Doughnut data={incomeSourceData} options={chartOptions} />
        </div>

        {/* Monthly Expenses */}
        <div className="rounded shadow p-4 col-span-2">
            <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>
            <div style={{ height: "20rem" }}> {/* Set a fixed height */}
                <Line
                data={monthlyExpensesData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false, // Allows the chart to fit within the set height
                    plugins: { legend: { display: false } },
                    scales: {
                    y: {
                        beginAtZero: true,
                        grid: { display: false },
                        ticks: { color: "#f0f0f0"}
                    },
                    x: {
                        grid: { display: false},
                        ticks: { color: "#f0f0f0"}
                    }
                    },
                }}
                />
            </div>
        </div>


        {/* Transaction History */}
        <div className="rounded shadow p-4 col-span-2">
          <h2 className="text-xl font-bold mb-4">Transaction History</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-200 px-4 py-2">Date</th>
                <th className="border border-gray-200 px-4 py-2">Description</th>
                <th className="border border-gray-200 px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-700">
                  <td className="border border-gray-200 px-4 py-2">{tx.date}</td>
                  <td className="border border-gray-200 px-4 py-2">{tx.description}</td>
                  <td
                    className={`border border-gray-200 px-4 py-2 ${
                      tx.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
