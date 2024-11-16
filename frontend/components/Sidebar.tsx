import Link from 'next/link';
import { useState } from 'react';

const Sidebar = ({ isVisible, toggleSidebar }: { isVisible: boolean; toggleSidebar: () => void }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 z-50 transition-transform transform ${
        isVisible ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      <button
        className="p-4 text-yellow hover:text-yellow-400 focus:outline-none"
        onClick={toggleSidebar}
      >
        Close
      </button>
      <div className="p-4 text-2xl font-semibold">Dashboard</div>
      <nav className="flex-1">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/health-check-summary">Financial Health Check Summary</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/financial-tools">Financial Tools</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/education-modules">Education Modules</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/connect-with-advisors">Connect with Advisors</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/community-resources">Community Resources</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
