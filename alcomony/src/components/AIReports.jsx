import { useEffect, useState } from "react";
import axios from "axios";
import LeftNavbar from "./LeftNavbar";
import { FaChartLine, FaLightbulb, FaMoneyBillWave } from "react-icons/fa";

// Helper function to format a line of text.
const formatLine = (line) => {
  const regex = /(\*[^*]+\*|#[^#]+#)/g;
  const parts = line.split(regex);
  return parts.map((part, index) => {
    if (
      (part.startsWith("*") && part.endsWith("*")) ||
      (part.startsWith("#") && part.endsWith("#"))
    ) {
      return (
        <span key={index} className="text-blue-700 font-semibold">
          {part.slice(1, -1)}
        </span>
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });
};

// Delay helper
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Retry wrapper with exponential backoff
const retryWithBackoff = async (fn, maxRetries = 3) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (err.response?.status === 429 && attempt < maxRetries - 1) {
        const wait = 2 ** attempt * 1000;
        console.warn(`Rate limit hit. Retrying in ${wait}ms...`);
        await delay(wait);
      } else {
        throw err;
      }
    }
  }
};

const AIReports = () => {
  const [expenses, setExpenses] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [spendersAdvice, setSpendersAdvice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/expenses");
        setExpenses(response.data);

        if (response.data.length > 0) {
          await generateAnalysis(response.data);
          await generateSpendersAdvice(response.data);
        }
      } catch (err) {
        setError("Failed to fetch expense data or generate reports.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateAnalysis = async (expenses) => {
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

    return retryWithBackoff(async () => {
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
    });
  };

  const generateSpendersAdvice = async (expenses) => {
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

    return retryWithBackoff(async () => {
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
    });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-800 text-xl">
        Analyzing your expenses...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-red-600 text-xl text-center p-4">
        Error: {error}.<br />
        Please wait a moment and refresh the page.
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 font-sans">
      <aside className="w-64 h-screen overflow-y-auto bg-white border-r border-gray-300 shadow-md">
        <LeftNavbar />
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-12">
          <header className="mb-8">
            <h1 className="text-4xl font-bold flex items-center gap-3 text-blue-600">
              <FaChartLine />
              AI Financial Analysis Report
            </h1>
            <p className="text-gray-600 text-lg">
              A professional summary and actionable recommendations based on
              your recent expenses.
            </p>
          </header>

          <section className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
            <h2 className="text-3xl font-semibold mb-6 text-blue-600 border-b pb-3">
              Key Insights
            </h2>
            {analysis ? (
              <div className="space-y-3">
                {analysis.split("\n").map((line, index) => (
                  <p key={index}>{formatLine(line)}</p>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                Report not available yet.
              </p>
            )}
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-600">
                <FaMoneyBillWave />
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

            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-purple-600">
                <FaChartLine />
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
                    className="flex justify-between py-2 border-b border-gray-200 last:border-b-0 text-lg"
                  >
                    <span>{cat}</span>
                    <span>₹{amount.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
            <h3 className="text-3xl font-bold mb-4 text-yellow-500 border-b pb-3 flex items-center gap-2">
              <FaLightbulb />
              Spenders' Quick Advice
            </h3>
            <p className="mb-4 px-4 py-2 bg-yellow-100 text-yellow-900 rounded shadow">
              Personalized financial tips for each recipient.
            </p>
            {expenses.length > 0 &&
            spendersAdvice.length === expenses.length ? (
              <ul className="list-disc pl-6 space-y-2 text-lg">
                {expenses.map((expense, index) => (
                  <li key={expense._id}>
                    <span className="text-yellow-700 font-bold">
                      {expense.description}
                    </span>
                    : {spendersAdvice[index]}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-600">Generating quick advice...</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AIReports;
