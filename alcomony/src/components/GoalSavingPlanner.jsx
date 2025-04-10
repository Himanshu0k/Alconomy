import { useState } from "react";
import LeftNavbar from "./LeftNavbar";
import { FaPiggyBank } from "react-icons/fa";

const AISavingsPlanner = () => {
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState([]);
  const [newLabel, setNewLabel] = useState("");
  const [newPercent, setNewPercent] = useState("");
  const [newIcon, setNewIcon] = useState("🎯");

  const handleAddCategory = () => {
    const percent = parseFloat(newPercent);
    const amt = parseFloat(amount) || 0;

    if (!newLabel || isNaN(percent) || percent <= 0 || totalPercent + percent > 100) return;

    const newCategory = {
      label: newLabel,
      percent,
      icon: newIcon || "🎯",
      value: ((percent / 100) * amt).toFixed(2),
    };

    setCategories([...categories, newCategory]);
    setNewLabel("");
    setNewPercent("");
    setNewIcon("🎯");
  };

  const handleAmountChange = (e) => {
    const amt = parseFloat(e.target.value) || 0;
    setAmount(e.target.value);
    const updated = categories.map((cat) => ({
      ...cat,
      value: ((cat.percent / 100) * amt).toFixed(2),
    }));
    setCategories(updated);
  };

  const handlePercentChange = (index, newPercent) => {
    const percent = parseFloat(newPercent) || 0;
    const amt = parseFloat(amount) || 0;
    const updated = [...categories];
    updated[index].percent = percent;
    updated[index].value = ((percent / 100) * amt).toFixed(2);
    setCategories(updated);
  };

  const totalPercent = categories.reduce(
    (sum, cat) => sum + parseFloat(cat.percent || 0),
    0
  );

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
              Plan your savings by setting up personalized categories.
            </p>
          </header>

          {/* Input Form */}
          <section className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8 space-y-4">
            <h2 className="text-3xl font-bold text-pink-300 border-b pb-3">
              Enter Total Savings
            </h2>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount (₹)"
              className="w-full sm:w-1/2 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <div
              className={`text-lg font-semibold ${
                totalPercent > 100
                  ? "text-red-400"
                  : totalPercent === 100
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              Total: {totalPercent}%{" "}
              {totalPercent !== 100 && <span className="ml-2">(Should equal 100%)</span>}
            </div>
          </section>

          {/* Add Category */}
          <section className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">
              Add New Category
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Category Name"
                className="px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="number"
                value={newPercent}
                onChange={(e) => setNewPercent(e.target.value)}
                placeholder="%"
                className="px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="text"
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                placeholder="Emoji"
                className="px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-pink-400"
              />
              <button
                onClick={handleAddCategory}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl px-4 py-2 transition duration-300"
              >
                Add
              </button>
            </div>
            {totalPercent > 100 && (
              <p className="text-red-400 font-semibold mt-2">
                Total percentage exceeds 100%!
              </p>
            )}
          </section>

          {/* Display Categories */}
          {categories.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6 transform hover:scale-105 transition duration-300"
                >
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-blue-300">
                    <span className="text-xl">{cat.icon}</span>
                    {cat.label}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="number"
                      value={cat.percent}
                      onChange={(e) => handlePercentChange(index, e.target.value)}
                      className="w-20 px-2 py-1 bg-gray-700 text-white rounded focus:ring-2 focus:ring-pink-400"
                    />
                    <span className="text-gray-400">%</span>
                  </div>
                  <p className="text-xl font-semibold text-green-400">
                    ₹{cat.value}
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
