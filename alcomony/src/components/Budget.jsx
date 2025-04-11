import React, { useState } from "react";
import LeftNavbar from "./LeftNavbar";

function Budget() {
  const [budget] = useState({
    totalBudget: 1000,
    spent: 250,
    remaining: 750,
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800">
      {/* Left Navbar */}
      <div className="fixed left-0 top-0 h-full">
        <LeftNavbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow ml-64 w-full p-10">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-800">
            Budget Overview
          </h1>
        </header>

        <main className="max-w-7xl mx-auto">
          {/* Budget Summary Section */}
          <section className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-indigo-500">Total Budget</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{budget.totalBudget.toFixed(2)}
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-yellow-500">Spent</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{budget.spent.toFixed(2)}
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-green-500">Remaining</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{budget.remaining.toFixed(2)}
                </p>
              </div>
            </div>
          </section>

          {/* Detailed Analysis Section */}
          <section className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Detailed Analysis
            </h2>
            <p className="text-gray-600">
              Explore your spending habits and track financial trends with detailed charts and insights. 
              This area is reserved for future enhancements such as interactive graphs and transaction histories.
            </p>

            {/* Placeholder for future chart/graph */}
            <div className="mt-6">
              <div className="w-full h-64 bg-white/50 backdrop-blur-sm border border-dashed border-gray-300 flex items-center justify-center rounded-xl">
                <span className="text-gray-500">Chart/Graph Placeholder</span>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-10 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Budget;
