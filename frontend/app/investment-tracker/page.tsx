'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import Navbar from '@/components/Navbar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
);

export default function InvestmentTracker() {
  const [portfolio, setPortfolio] = useState<
    { symbol: string; shares: number; data?: any }[]
  >([]);
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState<number | ''>('');
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_KEY;

  const fetchStockData = async () => {
    const updatedPortfolio = await Promise.all(
      portfolio.map(async (stock) => {
        try {
          const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
              function: 'TIME_SERIES_DAILY',
              symbol: stock.symbol,
              outputsize: 'compact',
              apikey: apiKey,
            },
          });
          const timeSeries = response.data['Time Series (Daily)'];
          const dates = Object.keys(timeSeries).sort(
            (a, b) => new Date(a).getTime() - new Date(b).getTime()
          );
          const prices = dates.map((date) =>
            parseFloat(timeSeries[date]['4. close'])
          );
          return {
            ...stock,
            data: { dates, prices, latestPrice: prices[prices.length - 1] },
          };
        } catch (error) {
          console.error(`Error fetching data for ${stock.symbol}:`, error);
          return stock;
        }
      })
    );
    setPortfolio(updatedPortfolio);
  };

  useEffect(() => {
    if (portfolio.length > 0) {
      fetchStockData();
    }
  }, [portfolio.length]);

  const addStock = () => {
    if (symbol && typeof shares === 'number' && shares > 0) {
      setPortfolio([...portfolio, { symbol: symbol.toUpperCase(), shares }]);
      setSymbol('');
      setShares('');
    }
  };

  const totalValue = portfolio.reduce((acc, stock) => {
    if (stock.data && stock.data.latestPrice) {
      return acc + stock.shares * stock.data.latestPrice;
    }
    return acc;
  }, 0);

  const chartData = {
    labels: portfolio.length > 0 ? portfolio[0].data?.dates : [],
    datasets: portfolio.map((stock, index) => ({
      label: stock.symbol,
      data: stock.data?.prices || [],
      borderColor: `hsl(${(index * 360) / portfolio.length}, 70%, 50%)`,
      backgroundColor: `hsl(${(index * 360) / portfolio.length}, 70%, 70%)`,
      fill: false,
      tension: 0.1,
    })),
  };

  return (
    <div>
        <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-navy text-yellow px-6">
      <div className="w-full max-w-8xl bg-white bg-opacity-20 rounded-lg p-8 shadow-lg flex flex-col lg:flex-row gap-8">
        {/* Left Column: Form and Table */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-8 text-center">Investment Tracker</h1>
          {/* Add Stock Form */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Add Stock to Portfolio</h2>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full px-4 py-2 mb-4 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Stock Symbol (e.g., AAPL)"
            />
            <input
              type="number"
              value={shares}
              onChange={(e) =>
                setShares(e.target.value === '' ? '' : parseFloat(e.target.value))
              }
              className="w-full px-4 py-2 mb-4 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Number of Shares"
            />
            <button
              onClick={addStock}
              className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
            >
              Add to Portfolio
            </button>
          </div>

          {/* Portfolio Table */}
          {portfolio.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">My Portfolio</h2>
              <table className="w-full border-collapse text-yellow">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 px-4 py-2">Symbol</th>
                    <th className="border border-gray-600 px-4 py-2">Shares</th>
                    <th className="border border-gray-600 px-4 py-2">Latest Price</th>
                    <th className="border border-gray-600 px-4 py-2">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((stock, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="border border-gray-600 px-4 py-2 text-center">
                        {stock.symbol}
                      </td>
                      <td className="border border-gray-600 px-4 py-2 text-center">
                        {stock.shares}
                      </td>
                      <td className="border border-gray-600 px-4 py-2 text-center">
                        {stock.data && stock.data.latestPrice
                          ? `$${stock.data.latestPrice.toFixed(2)}`
                          : 'Loading...'}
                      </td>
                      <td className="border border-gray-600 px-4 py-2 text-center">
                        {stock.data && stock.data.latestPrice
                          ? `$${(stock.shares * stock.data.latestPrice).toFixed(2)}`
                          : 'Loading...'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xl font-bold mt-4 text-center">
                Total Portfolio Value: ${totalValue.toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Graphs */}
        <div className="lg:w-1/2">
          {portfolio.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">Stock Performance</h2>
              <Line
                data={chartData}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                    },
                  },
                  scales: {
                    x: {
                      type: 'time',
                      time: {
                        unit: 'day',
                      },
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      beginAtZero: false,
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
    </div>

  );
}
