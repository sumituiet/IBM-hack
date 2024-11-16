"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { supabase } from "../_lib/supabaseClient";
import { Pie,Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';


export default function Dashboard() {
    
    const [loading, setLoading] = useState(true);
    const [email, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { data: { user } } = await supabase.auth.getUser();
                setUsername(user?.email || null);
            }
            setLoading(false);
        };

        getSession();
    }, []);
      
    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { data: { user } } = await supabase.auth.getUser();
                setUsername(user?.email || null);
            }
            setLoading(false);
        };

        getSession();
    }, []);

    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

    const earned = 1024;
    const earnedTarget = 1800;
    const spent = 1200;
    const wallet = 12999;

    const data = {
        labels: ['Rent', 'Groceries', 'Utilities', 'Entertainment', 'Miscellaneous'],
        datasets: [
            {
                label: 'My Spendings',
                data: [500, 300, 200, 100, 50],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
      
  return (
    <div>
        <Navbar />

        <div className="flex justify-center grid grid-cols-4 gap-4 ml-20">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src="https://github.com/sumituiet.png" alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Welcome to your Dashboard</div>
                {!loading && (
                <div className="welcome-card">
                    <h1>Welcome to your Dashboard</h1>
                    {email ? <p>Logged in as: {email}</p> : <p>Please log in to access your dashboard.</p>}
                    <Link href="/profile">
                    <button className="border round">Go to profile</button>
                    </Link>
                </div>
                )}
            </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">My Spendings</div>
                <Pie data={data} />
            </div>


            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="p-6 shadow-md rounded-md">
                <div className="font-bold text-xl mb-4">My Cashflow for {new Date().toLocaleString('default', { month: 'long' })}</div>

                {/* Earned Progress */}
                <div className="mb-4">
                    <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Earned</span>
                    <span className="text-gray-600">${earned} of ${earnedTarget}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${(earned / earnedTarget) * 100}%` }}
                    ></div>
                    </div>
                </div>

                {/* Spent Progress */}
                <div className="mb-4">
                    <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Spent</span>
                    <span className="text-gray-600">${spent}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${Math.min((spent / earnedTarget) * 100, 100)}%` }}
                    ></div>
                    </div>
                </div>

                {/* Wallet Amount */}
                <div className="mt-4 text-center text-lg font-bold text-gray-100">
                    My wallet <span className="text-green-600 text-2xl">${wallet.toLocaleString()}</span>
                </div>
                </div>
                        </div>
                        </div>
        </div>

   
  );
}