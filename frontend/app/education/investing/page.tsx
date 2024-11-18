'use client';

import Navbar from '@/components/Navbar';
import React from 'react';

export default function Investment101() {
  return (
    <div>
        <Navbar/>
    <div className="min-h-screen bg-navy text-yellow p-6">
      <div className="max-w-4xl mx-auto  p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Investment 101</h1>

        {/* What is Investing? */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What is Investing?</h2>
          <p className="text-gray-300 mb-4">
            Investing involves allocating money into financial assets such as stocks, bonds, or real estate with the expectation of generating income or profit. It's a powerful tool for building wealth over time and achieving financial goals.
          </p>
        </section>

        {/* Why Should You Invest? */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Should You Invest?</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Grow Your Wealth:</strong> Investments have the potential to generate higher returns compared to savings accounts.
            </li>
            <li>
              <strong>Beat Inflation:</strong> Investing helps your money maintain its value and grow despite rising inflation.
            </li>
            <li>
              <strong>Achieve Financial Goals:</strong> Enables you to save for long-term goals like buying a house, funding education, or retiring comfortably.
            </li>
            <li>
              <strong>Earn Passive Income:</strong> Certain investments, like dividend stocks or rental properties, provide a steady income stream.
            </li>
          </ul>
        </section>

        {/* Types of Investments */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Types of Investments</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Stocks:</strong> Ownership shares in a company, offering potential for high returns and dividends.
            </li>
            <li>
              <strong>Bonds:</strong> Loans to companies or governments with fixed interest payments over time.
            </li>
            <li>
              <strong>Mutual Funds:</strong> Pooled investments managed by professionals, offering diversification.
            </li>
            <li>
              <strong>Real Estate:</strong> Property investments, including rental properties or REITs (Real Estate Investment Trusts).
            </li>
            <li>
              <strong>ETFs:</strong> Exchange-Traded Funds, a collection of stocks or bonds traded on an exchange like a single stock.
            </li>
            <li>
              <strong>Cryptocurrency:</strong> Digital assets like Bitcoin or Ethereum, offering high risk and potential high rewards.
            </li>
          </ul>
        </section>

        {/* Tips for Beginner Investors */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tips for Beginner Investors</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Start Early:</strong> The earlier you start, the more time your investments have to grow through compounding.
            </li>
            <li>
              <strong>Diversify:</strong> Avoid putting all your money into one investment; spread it across different assets.
            </li>
            <li>
              <strong>Understand Risk:</strong> Every investment carries risk. Assess your risk tolerance before investing.
            </li>
            <li>
              <strong>Invest Regularly:</strong> Contribute consistently, even small amounts, to build your portfolio over time.
            </li>
            <li>
              <strong>Stay Informed:</strong> Keep learning about market trends and investment opportunities.
            </li>
            <li>
              <strong>Avoid Emotional Decisions:</strong> Stick to your investment strategy, even during market fluctuations.
            </li>
          </ul>
        </section>

        {/* Additional Resources */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
          <p className="text-gray-300 mb-4">
            For more guidance on investing, explore the following resources:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a
                href="https://moneysmart.gov.au/investing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                MoneySmart - Investing
              </a>
            </li>
            <li>
              <a
                href="https://www.asx.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Australian Securities Exchange (ASX)
              </a>
            </li>
            <li>
              <a
                href="https://ndh.org.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                National Debt Helpline - Investing
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
    </div>

  );
}
