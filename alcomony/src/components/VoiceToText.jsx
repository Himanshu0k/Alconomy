import { useState } from "react";
import LeftNavbar from "./LeftNavbar";
import { FaPiggyBank, FaChartPie, FaGlobe } from "react-icons/fa";

const goalSplit = [
  { label: "Emergency Fund", percent: 30, icon: <FaPiggyBank /> },
  { label: "Investments", percent: 25, icon: <FaChartPie /> },
  { label: "Travel & Leisure", percent: 20, icon: <FaGlobe /> },
  { label: "Education", percent: 15, icon: "🎓" },
  { label: "Miscellaneous", percent: 10, icon: "📦" },
];

const AISavingsPlanner = () => {
  const [amount, setAmount] = useState("");
  const [split, setSplit] = useState([]);

  const handleSplit = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;
    const result = goalSplit.map((goal) => ({
      ...goal,
      value: ((goal.percent / 100) * amt).toFixed(2),
    }));
    setSplit(result);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <aside className="w-64 h-screen overflow-y-auto bg-gray-800 border-r border-gray-700 shadow-lg">
        <LeftNavbar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-10">
          <header className="mb-6">
            <h1 className="text-4xl font-extrabold flex items-center gap-3">
              <FaPiggyBank className="text-pink-400" />
              AI Savings Planner
            </h1>
            <p className="text-gray-400 text-lg">
              Distribute your savings towards meaningful future goals.
            </p>
          </header>

          {/* Input Form */}
          <section className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8">
            <h2 className="text-3xl font-bold mb-4 text-pink-300 border-b pb-3">
              Enter Savings
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount (₹)"
                className="w-full sm:w-1/2 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                onClick={handleSplit}
                className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl shadow transition duration-300"
              >
                Split Savings
              </button>
            </div>
          </section>

          {/* Split Results */}
          {split.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {split.map((goal, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6 transform hover:scale-105 transition duration-300"
                >
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-blue-300">
                    <span className="text-xl">{goal.icon}</span>
                    {goal.label}
                  </h3>
                  <p className="text-lg text-gray-300">
                    {goal.percent}% of savings
                  </p>
                  <p className="text-xl font-semibold text-green-400 mt-2">
                    ₹{goal.value}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default AISavingsPlanner;
