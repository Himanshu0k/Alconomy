import { useState, useEffect } from "react";
import axios from "axios";

const BillReminders = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bills from your backend API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bills");
        setBills(response.data);
      } catch (err) {
        setError("Failed to fetch bills.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  if (loading)
    return <p className="text-center text-white">Loading bills...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-800 rounded-xl shadow-lg text-white">
      <h1 className="text-3xl font-bold mb-6">Upcoming Bill Reminders</h1>
      {bills.length === 0 ? (
        <p>No upcoming bills found.</p>
      ) : (
        <ul className="space-y-4">
          {bills.map((bill) => (
            <li
              key={bill._id}
              className="p-4 border border-gray-700 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{bill.payee}</p>
                <p className="text-sm text-gray-400">
                  Due on: {new Date(bill.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">₹{bill.amount.toFixed(2)}</p>
                <button className="mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded">
                  {bill.reminderEnabled ? "On" : "Off"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BillReminders;
