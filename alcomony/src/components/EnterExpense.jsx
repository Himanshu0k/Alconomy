import { FaRupeeSign, FaPlusCircle } from "react-icons/fa";
import LeftNavbar from "./LeftNavbar";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function EnterExpense() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // yyyy-mm-dd
  });
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [transcript, setTranscript] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    fetchExpenses();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const speech = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + speech + " ");
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(response.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError("Failed to load expenses. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!description || !amount) {
      setError("Please fill in all fields");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/expenses", {
        description,
        amount: parseFloat(amount),
        date: new Date(date).toISOString(),
      });

      await fetchExpenses();
      setDescription("");
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Failed to add expense. Please try again."
      );
    }
    setLoading(false);
  };

  const startListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsListening(false);
  };

  const handleMicClick = () => {
    setShowModal(true);
    setTranscript("");
    startListening();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    stopListening();
  };

  const handleVoiceUse = () => {
    const words = transcript.trim().split(" ");
    const parsedAmount = parseFloat(words[words.length - 1]);
    const parsedTitle = words[1];

    if (!isNaN(parsedAmount)) {
      setDescription(parsedTitle || "Voice Expense");
      setAmount(parsedAmount);
      alert("Expense data filled from voice! You can now click 'Add Expense'.");
    } else {
      alert("Couldn't detect amount. Try saying something like 'Buy milk for 40'");
    }

    stopListening();
    setShowModal(false);
  };

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-64 h-screen overflow-y-auto bg-gray-800 border-r border-gray-700">
        <LeftNavbar />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FaPlusCircle className="text-blue-400" />
            Expense Manager
          </h2>
          <p className="text-gray-400 mt-2">
            Track your expenses effortlessly
          </p>
        </div>

        {/* Summary */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-lg">
          <h3 className="text-lg font-semibold">
            Total Expenses:
            <span className="text-red-400 ml-2">
              ₹{totalExpenses.toLocaleString("en-IN")}
            </span>
          </h3>
        </div>

        <form
  onSubmit={handleSubmit}
  className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
>
  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
    <input
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Expense Description"
      className="bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full col-span-1 md:col-span-2"
      disabled={loading}
    />

    <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="Amount"
      className="bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full col-span-1 md:col-span-1"
      disabled={loading}
    />

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="bg-gray-700 rounded-lg p-3 text-white w-full focus:ring-2 focus:ring-blue-500 focus:outline-none col-span-1 md:col-span-1"
      disabled={loading}
    />

    <button
      type="submit"
      disabled={loading}
      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 w-full col-span-1 md:col-span-1 disabled:opacity-70"
    >
      <FaPlusCircle />
      {loading ? "Adding..." : "Add Expense"}
    </button>

    <div className="flex justify-center items-center col-span-1 md:col-span-1">
      <button
        onClick={handleMicClick}
        type="button"
        className="text-2xl hover:text-blue-400 transition p-2 bg-gray-700 rounded-full w-13 h-12 flex items-center justify-center"
        title="Add via voice"
      >
        🎙️
      </button>
    </div>
  </div>

  {error && (
    <div className="mt-4 p-3 bg-red-800/20 text-red-400 rounded-lg">
      {error}
    </div>
  )}
</form>


        {/* Expense Table */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {expenses.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold">
                    Description
                  </th>
                  <th className="p-4 text-left text-sm font-semibold">Amount</th>
                  <th className="p-4 text-left text-sm font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense._id}
                    className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                  >
                    <td className="p-4">{expense.description}</td>
                    <td className="p-4 text-red-400 flex items-center gap-1">
                      <FaRupeeSign className="text-sm" />
                      {expense.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(expense.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-gray-400">No expenses recorded yet</div>
          )}
        </div>

        {/* Voice-to-Text Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-[#111827] border border-gray-600 rounded-lg shadow-lg w-[90%] max-w-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">🎤 Listening...</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-sm text-red-400 hover:text-red-600 font-semibold"
                >
                  Close
                </button>
              </div>
              <div className="bg-[#1F2937] text-gray-300 border border-gray-700 p-4 rounded-lg min-h-[150px] whitespace-pre-wrap font-mono tracking-wide">
                {transcript || "Try Something like: Buy milk for 40"}
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={handleVoiceUse}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Use this as Expense
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default EnterExpense;
