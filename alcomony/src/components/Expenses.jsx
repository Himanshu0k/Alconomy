import React, { useState, useEffect, useRef } from "react";
import LeftNavbar from "./LeftNavbar";
import { FaRupeeSign, FaPlusCircle } from "react-icons/fa";

function Expense() {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Groceries", amount: 50, date: "2023-03-15" },
    { id: 2, title: "Utilities", amount: 75, date: "2023-03-10" },
    { id: 3, title: "Dining Out", amount: 30, date: "2023-03-18" },
  ]);
  // const [quantity, setQuantity] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [transcript, setTranscript] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [ setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
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

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!title || !amount || !date) return;
    const newExpense = {
      id: expenses.length + 1,
      title,
      amount: parseFloat(amount),
      date: new Date(date).toLocaleDateString("en-IN"),
    };
    setExpenses([newExpense, ...expenses]);
    setTitle("");
    setAmount("");
    setDate("");
  };

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Navigation */}
      <aside className="w-64 h-screen overflow-y-auto bg-gray-800 border-r border-gray-700">
        <LeftNavbar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden p-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FaRupeeSign className="text-green-400" />
            Expense Tracker
          </h2>
          <p className="text-gray-400 mt-2">
            Manage and track your daily expenses
          </p>
          <br />
          <button
            onClick={handleMicClick}
            className="text-xl hover:text-blue-400 transition"
          >
            Speak to add your expenses🎙️
          </button>
        </div>

        {/* Total Summary */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-lg">
          <h3 className="text-lg font-semibold">
            Total Expenses:
            <span className="text-red-400 ml-2">
              ₹{totalExpenses.toLocaleString("en-IN")}
            </span>
          </h3>
        </div>

        {/* Add Expense Form */}
        <form
          onSubmit={handleAddExpense}
          className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Expense Title"
              className="bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <FaPlusCircle />
              Add Expense
            </button>
          </div>
        </form>

        {/* Expenses Table */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 text-left text-sm font-semibold">Title</th>
                <th className="p-4 text-left text-sm font-semibold">Amount</th>
                <th className="p-4 text-left text-sm font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                >
                  <td className="p-4">{expense.title}</td>
                  <td className="p-4 text-red-400 flex items-center gap-1">
                    <FaRupeeSign className="text-sm" />
                    {expense.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4 text-gray-400">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

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
              {transcript || "Try Something like: Buy 5 apples for 200" }
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  const words = transcript.trim().split(" ");
                  const lastWord = words[words.length - 1];
                  const parsedQuantity = words[1];
                  const parsedAmount = parseFloat(lastWord);
                  const parsedTitle = words[2];

                  if (!isNaN(parsedAmount)) {
                    setTitle(parsedTitle || "Voice Expense");
                    // setQuantity(parsedQuantity)
                    setAmount(parsedAmount);
                    setDate(new Date().toISOString().split("T")[0]);
                    alert("Expense data filled from voice! You can now click 'Add Expense'.");
                    console.log(`Amount: ${parsedAmount} Title: ${parsedTitle} Quantity: ${parsedQuantity}`)
                  } else {
                    alert("Couldn't detect amount. Try saying something like 'Buy milk for 50'");
                  }

                  stopListening();
                  setShowModal(false);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Use this as Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Expense;


// import { FaChartPie } from "react-icons/fa";
// import LeftNavbar from "./LeftNavbar";

// function Expense() {
//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white">
//       <aside className="w-64 h-screen overflow-y-auto bg-gray-800 border-r border-gray-700">
//         <LeftNavbar />
//       </aside>

//       <main className="flex-1 flex flex-col overflow-hidden p-6">
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold flex items-center gap-3">
//             <FaChartPie className="text-purple-400" />
//             Expense Dashboard
//           </h2>
//           <p className="text-gray-400 mt-2">Summary and analytics coming soon</p>
//         </div>

//         <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
//           <p className="text-gray-300">
//             This page is currently under development. You will soon be able to see charts and summaries of your expenses.
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Expense;
