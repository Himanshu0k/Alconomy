import React, { useState, useMemo } from 'react';
import LeftNavbar from './LeftNavbar';
import axios from 'axios';
import { Pie, Bar, Line, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

const keywordMap = {
  education: ['school', 'tuition', 'books', 'exam', 'college', 'university', 'course', 'learning'],
  groceries: ['milk', 'vegetables', 'grocery', 'bread', 'fruit', 'food', 'supermarket', 'market'],
  travel: ['flight', 'train', 'bus', 'hotel', 'uber', 'taxi', 'travel', 'trip', 'vacation'],
  sports: ['cricket', 'football', 'gym', 'basketball', 'racket', 'sports', 'fitness', 'exercise'],
  electronics: ['laptop', 'phone', 'charger', 'tv', 'headphones', 'computer', 'device', 'gadget'],
  clothing: ['shirt', 'jeans', 'clothes', 'jacket', 'shoes', 'dress', 'fashion', 'apparel'],
  household: ['detergent', 'cleaner', 'furniture', 'soap', 'mop', 'utensils', 'appliances', 'home'],
  entertainment: ['movie', 'concert', 'game', 'music', 'streaming', 'subscription', 'ticket'],
  health: ['medicine', 'doctor', 'hospital', 'pharmacy', 'medical', 'healthcare', 'insurance'],
  transportation: ['fuel', 'gas', 'car', 'bike', 'maintenance', 'repair', 'parking'],
};

const sampleExpenses = [];

for (let i = 0; i < 400; i++) {
  const categories = Object.keys(keywordMap);
  const category = categories[Math.floor(Math.random() * categories.length)];
  const keyword = keywordMap[category][Math.floor(Math.random() * keywordMap[category].length)];
  const amount = Math.floor(Math.random() * 4901) + 100; // 100–5000
  sampleExpenses.push([keyword, amount]);
}

const predictCategory = (desc) => {
  const lowerDesc = desc.toLowerCase();
  const matches = [];
  
  for (const [category, keywords] of Object.entries(keywordMap)) {
    const matchedKeywords = keywords.filter(keyword => lowerDesc.includes(keyword));
    if (matchedKeywords.length > 0) {
      matches.push({
        category,
        confidence: (matchedKeywords.length / keywords.length) * 100,
        matchedKeywords
      });
    }
  }

  if (matches.length === 0) return { category: 'other', confidence: 0, matchedKeywords: [] };
  
  // Sort by confidence and return the best match
  matches.sort((a, b) => b.confidence - a.confidence);
  return matches[0];
};

const ExpenseCategoryPredictor = () => {
  const [description, setDescription] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Process sample expenses data for visualization
  const categoryData = useMemo(() => {
    const categoryTotals = {};
    const categoryCounts = {};
    
    sampleExpenses.forEach(([keyword, amount]) => {
      const result = predictCategory(keyword);
      const category = result.category;
      
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    return {
      totals: categoryTotals,
      counts: categoryCounts
    };
  }, []);

  const handlePredict = async () => {
    if (!description.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = predictCategory(description);
      setPrediction(result);

      // Save to recent predictions
      setRecentPredictions(prev => [
        { description, ...result, timestamp: new Date() },
        ...prev.slice(0, 4) // Keep only last 5 predictions
      ]);

      // Optionally save to backend
      await axios.post('http://localhost:5000/api/expenses', {
        description,
        amount: 0, // Default amount
        category: result.category,
        predicted: true
      });

    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePredict();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed left-0 top-0 h-full">
        <LeftNavbar />
      </div>
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Expense Category Predictor</h1>
          
          {/* Prediction Box */}
          <div className="mb-8 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">Enter Expense Description</label>
                <input
                  type="text"
                  placeholder="e.g., Bought groceries from supermarket..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-12 px-4 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <button 
                onClick={handlePredict} 
                className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Predicting...' : 'Predict Category'}
              </button>
            </div>
          </div>

          {prediction && (
            <div className="mb-8 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Prediction Result</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-800 border border-gray-200 rounded-lg text-lg">
                      {prediction.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Confidence:</span>
                    <span className={`px-4 py-2 rounded-lg text-lg text-white ${
                      prediction.confidence > 70 ? 'bg-green-500' : 
                      prediction.confidence > 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {Math.round(prediction.confidence)}%
                    </span>
                  </div>
                  {prediction.matchedKeywords.length > 0 && (
                    <div>
                      <span className="text-gray-600">Matched Keywords:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {prediction.matchedKeywords.map((keyword, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-800 border border-gray-200 rounded-lg"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Visualization Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Pie Chart */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Distribution by Amount</h2>
              <div className="h-64">
                <Pie
                  data={{
                    labels: Object.keys(categoryData.totals),
                    datasets: [{
                      data: Object.values(categoryData.totals),
                      backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                        '#FF9F40', '#8AC24A', '#FF5252', '#7E57C2', '#26A69A'
                      ],
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          padding: 20,
                          font: {
                            size: 12
                          }
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: $${value} (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Average Expenditure Chart */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Average Expenditure per Category</h2>
              <div className="h-64">
                <Bar
                  data={{
                    labels: Object.keys(categoryData.totals),
                    datasets: [{
                      label: 'Average Amount',
                      data: Object.entries(categoryData.totals).map(([category, total]) => {
                        const count = categoryData.counts[category];
                        return total / count;
                      }),
                      backgroundColor: Object.entries(categoryData.totals).map(([category, total]) => {
                        const count = categoryData.counts[category];
                        const avg = total / count;
                        return avg > 1000 ? '#EF4444' : 
                               avg > 500 ? '#F59E0B' : '#10B981';
                      }),
                      borderColor: Object.entries(categoryData.totals).map(([category, total]) => {
                        const count = categoryData.counts[category];
                        const avg = total / count;
                        return avg > 1000 ? '#DC2626' : 
                               avg > 500 ? '#D97706' : '#059669';
                      }),
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `Average: $${context.raw.toFixed(2)}`;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Amount ($)'
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>Color coding: 
                  <span className="text-red-500"> High (&gt;$1000)</span>, 
                  <span className="text-yellow-500"> Medium ($500-$1000)</span>, 
                  <span className="text-green-500"> Low (&lt;$500)</span>
                </p>
              </div>
            </div>

            {/* Predictive Forecast Graph */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Category-wise Expense Forecast</h2>
              <div className="h-64">
                <Bar
                  data={{
                    labels: Object.keys(categoryData.totals),
                    datasets: [{
                      label: 'Current Average',
                      data: Object.values(categoryData.totals).map(total => total / Object.values(categoryData.counts)[Object.keys(categoryData.totals).indexOf(Object.keys(categoryData.totals)[Object.values(categoryData.totals).indexOf(total)])]),
                      backgroundColor: '#6366F1',
                      borderColor: '#4F46E5',
                      borderWidth: 1
                    }, {
                      label: 'Projected Next Month',
                      data: Object.values(categoryData.totals).map((total, index) => {
                        const count = Object.values(categoryData.counts)[index];
                        const avg = total / count;
                        // Simple projection: current average + 5% growth
                        return avg * 1.05;
                      }),
                      backgroundColor: '#10B981',
                      borderColor: '#059669',
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          padding: 20,
                          font: {
                            size: 12
                          }
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Amount ($)'
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>Note: Projections are based on current spending patterns with a 5% growth factor.</p>
              </div>
            </div>
          </div>

          {recentPredictions.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Predictions</h2>
                <div className="space-y-4">
                  {recentPredictions.map((pred, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-gray-800">{pred.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(pred.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <span className="ml-4 px-3 py-1 bg-gray-100 text-gray-800 rounded-lg">
                        {pred.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCategoryPredictor; 