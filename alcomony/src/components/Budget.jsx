import React, { useState } from "react";
import LeftNavbar from "./LeftNavbar"; // Adjust the import path as needed

function Budget() {
  // Dummy budget data
  const [budget] = useState({
    totalBudget: 1000,
    spent: 250,
    remaining: 750,
  });

  return (
    <div className="flex min-h-screen bg-gray-800">
      {/* Left Navbar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <LeftNavbar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="bg-gray-900 shadow p-4">
          <h1 className="text-2xl font-bold text-white">Budget Overview</h1>
        </header>

        {/* Content */}
        <main className="flex-grow p-6">
          <div className="max-w-7xl mx-auto">
            {/* Budget Summary Section */}
            <section className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700 p-6 rounded-lg shadow border border-gray-600">
                  <h3 className="text-lg font-semibold text-blue-300">
                    Total Budget
                  </h3>
                  <p className="text-3xl font-bold text-blue-100 mt-2">
                    ₹{budget.totalBudget.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg shadow border border-gray-600">
                  <h3 className="text-lg font-semibold text-yellow-300">
                    Spent
                  </h3>
                  <p className="text-3xl font-bold text-yellow-100 mt-2">
                    ₹{budget.spent.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg shadow border border-gray-600">
                  <h3 className="text-lg font-semibold text-green-300">
                    Remaining
                  </h3>
                  <p className="text-3xl font-bold text-green-100 mt-2">
                    ₹{budget.remaining.toFixed(2)}
                  </p>
                </div>
              </div>
            </section>

            {/* Detailed Analysis Section */}
            <section className="bg-gray-700 p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Detailed Analysis
              </h2>
              <p className="text-gray-300">
                Explore your spending habits and track financial trends with
                detailed charts and insights. This area is reserved for future
                enhancements such as interactive graphs and transaction
                histories.
              </p>
              {/* Placeholder for future chart/graph */}
              <div className="mt-6">
                <div className="w-full h-64 bg-gray-600 flex items-center justify-center rounded-lg border border-dashed border-gray-500">
                  <span className="text-gray-300">Chart/Graph Placeholder</span>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 shadow p-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
}

export default Budget;
