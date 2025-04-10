import { useState } from "react";
import axios from "axios";

const AddBill = () => {
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!payee || !amount || !dueDate) {
      setError("All fields are required.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/bills", {
        payee,
        amount: parseFloat(amount),
        dueDate,
        reminderEnabled,
      });
      setSuccess("Bill added successfully!");
      // Reset fields
      setPayee("");
      setAmount("");
      setDueDate("");
    } catch (err) {
      setError("Failed to add bill. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-800 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Add a New Bill</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold mb-1">Payee</label>
          <input
            type="text"
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter payee name"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-1">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={reminderEnabled}
            onChange={() => setReminderEnabled(!reminderEnabled)}
            id="reminderToggle"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor="reminderToggle" className="text-lg font-semibold">
            Enable Reminder
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg font-bold transition"
        >
          Add Bill
        </button>
      </form>
    </div>
  );
};

export default AddBill;
