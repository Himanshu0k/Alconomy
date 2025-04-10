import { useEffect, useState } from "react";
import axios from "axios";
import LeftNavbar from "./LeftNavbar";
import { FaChartLine, FaLightbulb, FaMoneyBillWave } from "react-icons/fa";

// Helper function to format a line of text.
// It searches for text wrapped in * or # and returns styled spans for those segments.
const formatLine = (line) => {
  const regex = /(\*[^*]+\*|#[^#]+#)/g;
  const parts = line.split(regex);
  return parts.map((part, index) => {
    if (
      (part.startsWith("*") && part.endsWith("*")) ||
      (part.startsWith("#") && part.endsWith("#"))
    ) {
      return (
        <span key={index} className="text-xl font-semibold text-yellow-300">
          {part.slice(1, -1)}
        </span>
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });
};

const AIReports = () => {
  const [expenses, setExpenses] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [spendersAdvice, setSpendersAdvice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch expenses from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/expenses");
        setExpenses(response.data);
        // Only generate analysis/advice if there are expenses to analyze
        if (response.data.length > 0) {
          generateAnalysis(response.data);
          generateSpendersAdvice(response.data);
        }
      } catch (err) {
        setError("Failed to fetch expense data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Generate AI analysis using Groq
  const generateAnalysis = async (expenses) => {
    try {
      const prompt = `Analyze these expenses and provide financial recommendations:
${expenses
  .map(
    (e) =>
      `${e.description}: ₹${e.amount} on ${new Date(
        e.date
      ).toLocaleDateString()}`
  )
  .join("\n")}

As a financial advisor, consider:
1. Spending patterns
2. Biggest expenses
3. Potential savings areas
4. Budget optimization tips
5. Short-term actionable steps`;

      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );
      setAnalysis(response.data.choices[0].message.content);
    } catch (err) {
      setError("Failed to generate analysis");
      console.error("Groq API Error:", err);
    }
  };

  // Generate quick, person-to-person advice for each expense using the description as recipient name.
  const generateSpendersAdvice = async (expenses) => {
    try {
      // The prompt is now built so that each expense line is generated, and we assume one advice per expense.
      const prompt = `For each of the following expenses, provide one clear, actionable financial advice in a professional tone.
Format your response so that each line corresponds to the expense in order.
${expenses
  .map(
    (e) =>
      `${e.description}: ₹${e.amount} on ${new Date(
        e.date
      ).toLocaleDateString()}`
  )
  .join("\n")}`;

      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );

      const adviceText = response.data.choices[0].message.content;
      const adviceLines = adviceText
        .split("\n")
        .filter((line) => line.trim() !== "");
      setSpendersAdvice(adviceLines);
    } catch (err) {
      console.error("Failed to generate spenders advice:", err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">
        Analyzing your expenses...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500 text-xl">
        Error: {error}
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <aside className="w-64 h-screen overflow-y-auto bg-gray-800 border-r border-gray-700 shadow-lg">
        <LeftNavbar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-12">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold flex items-center gap-3">
              <FaChartLine className="text-blue-400" />
              AI Financial Analysis Report
            </h1>
            <p className="text-gray-400 text-lg">
              A professional summary and actionable recommendations based on
              your recent expenses.
            </p>
          </header>

          {/* Analysis Report */}
          <section className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-300 border-b pb-3">
              Key Insights
            </h2>
            {analysis ? (
              <div className="prose prose-invert max-w-none">
                {analysis.split("\n").map((line, index) => (
                  <p key={index}>{formatLine(line)}</p>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">
                Report not available yet.
              </p>
            )}
          </section>

          {/* Overview Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8 hover:scale-105 transform transition duration-300">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-300">
                <FaMoneyBillWave className="inline-block" />
                Spending Overview
              </h3>
              <p className="text-lg">
                <span className="font-semibold">Total Expenses:</span> ₹
                {expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
              </p>
              <p className="text-lg mt-2">
                <span className="font-semibold">Average Daily Spend:</span> ₹
                {(expenses.reduce((sum, e) => sum + e.amount, 0) / 30).toFixed(
                  2
                )}
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8 hover:scale-105 transform transition duration-300">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-purple-300">
                <FaChartLine className="inline-block" />
                Top Categories
              </h3>
              {Object.entries(
                expenses.reduce((cats, e) => {
                  const category = e.description.split(" ")[0];
                  cats[category] = (cats[category] || 0) + e.amount;
                  return cats;
                }, {})
              )
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([cat, amount]) => (
                  <div
                    key={cat}
                    className="flex justify-between py-2 border-b border-gray-700 last:border-b-0 text-lg"
                  >
                    <span>{cat}</span>
                    <span>₹{amount.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          </section>

          {/* Spenders Quick Advice */}
          <section className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8">
            <h3 className="text-3xl font-bold mb-4 text-yellow-300 border-b pb-3 flex items-center gap-2">
              <FaLightbulb className="inline-block" />
              Spenders' Quick Advice
            </h3>
            {/* Highlighted description for quick advice */}
            <p className="mb-4 px-4 py-2 bg-yellow-200 text-gray-900 rounded shadow">
              Personalized financial tips for each recipient.
            </p>
            {expenses.length > 0 &&
            spendersAdvice.length === expenses.length ? (
              <ul className="list-disc pl-6 space-y-2 text-lg">
                {expenses.map((expense, index) => (
                  <li key={expense._id}>
                    <span className="text-yellow-300 font-bold">
                      {expense.description}
                    </span>
                    : {spendersAdvice[index]}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg">Generating quick advice...</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AIReports;
