import React from "react";
import { motion } from "framer-motion";
import { FaRegBell, FaPiggyBank } from "react-icons/fa";

const billReminders = [
  { id: 1, name: "Electricity Bill", dueDate: "April 5, 2025", amount: "₹120" },
  { id: 2, name: "Internet Bill", dueDate: "April 10, 2025", amount: "₹50" },
  {
    id: 3,
    name: "Credit Card Payment",
    dueDate: "April 15, 2025",
    amount: "₹300",
  },
];

const savingsGoals = [
  { id: 1, goal: "Vacation Fund", saved: 600, target: 1500, daysLeft: 45 },
  { id: 2, goal: "New Laptop", saved: 800, target: 1200, daysLeft: 30 },
  { id: 3, goal: "Emergency Fund", saved: 2000, target: 5000, daysLeft: 90 },
];

const FinancePlanner = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 rounded-2xl shadow-xl bg-gray-900 bg-opacity-90 backdrop-blur-lg border border-gray-800">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bill Reminders */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaRegBell className="text-yellow-400" /> Bill Reminders
          </h2>
          <ul className="space-y-4">
            {billReminders.map((bill) => (
              <motion.li
                key={bill.id}
                className="p-4 flex justify-between items-center rounded-xl bg-gray-800 bg-opacity-50 shadow-md border border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <p className="text-white font-medium">{bill.name}</p>
                  <p className="text-sm text-gray-400">Due: {bill.dueDate}</p>
                </div>
                <span className="text-lg font-semibold text-green-400">
                  {bill.amount}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Savings Goals */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaPiggyBank className="text-blue-400" /> Savings Goals
          </h2>
          <div className="space-y-4">
            {savingsGoals.map((goal) => (
              <motion.div
                key={goal.id}
                className="p-4 rounded-xl bg-gray-800 bg-opacity-50 shadow-md border border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-white font-medium">{goal.goal}</p>
                <div className="w-full bg-gray-700 h-3 rounded-lg mt-2 relative">
                  <motion.div
                    className="h-3 rounded-lg bg-blue-400"
                    style={{ width: `₹{(goal.saved / goal.target) * 100}%` }}
                    initial={{ width: "0%" }}
                    animate={{ width: `₹{(goal.saved / goal.target) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Saved: ₹{goal.saved} / ₹{goal.target} • {goal.daysLeft} days
                  left
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePlanner;
