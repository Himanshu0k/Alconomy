import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import axios from 'axios';
import LeftNavbar from './LeftNavbar'; // Adjust as needed

function BillOCR() {
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setItems([]);
    }
  };

  const extractText = async () => {
    if (!image) return;
    setLoading(true);

    const worker = await createWorker('eng', 1, {
      logger: (m) => console.log(m),
    });

    await worker.setParameters({
      tessedit_char_whitelist:
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .:-',
    });

    const {
      data: { text },
    } = await worker.recognize(image);

    await parseItems(text);
    setLoading(false);
    await worker.terminate();
  };

  const parseItems = async (rawText) => {
    const lines = rawText.split('\n');
    const itemList = [];

    for (const line of lines) {
      const match = line.match(/(.+?)\s+(\d+(?:\.\d{1,2})?)$/);
      if (match) {
        const fullDescription = match[1].trim();
        const words = fullDescription.split(/\s+/);
        const description = words[1] || words[0];
        const amount = parseFloat(match[2]);

        if (description.toLowerCase() === 'total') continue;

        if (description && !isNaN(amount)) {
          const formattedAmount = parseInt(amount);

          try {
            await axios.post('http://localhost:5000/api/expenses', {
              description,
              amount: formattedAmount,
              date: new Date().toISOString(),
            });
            itemList.push({ description, amount: formattedAmount });
          } catch (error) {
            console.error(`Failed to save item: ${description}`, error);
          }
        }
      }
    }

    setItems(itemList);
    alert(itemList.length > 0
      ? 'Items saved to the database successfully!'
      : 'No valid items extracted or saved.');
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 border-r border-gray-700 shadow-md">
        <LeftNavbar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="bg-gray-950 shadow-md p-5 border-b border-gray-700">
          <h1 className="text-3xl font-bold text-cyan-400 tracking-tight">🧾 Bill OCR Scanner</h1>
        </header>

        {/* Content */}
        <main className="flex-grow p-8 overflow-y-auto bg-gray-900">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Upload Section */}
            <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">📤 Upload Your Bill Image</h2>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-6 block text-sm file:bg-cyan-600 file:hover:bg-cyan-700 file:text-white file:px-4 file:py-2 file:rounded file:cursor-pointer"
              />

              {image && (
                <img
                  src={image}
                  alt="Uploaded Preview"
                  className="mb-6 max-w-full rounded-lg border border-gray-600 shadow-md transition-transform hover:scale-105"
                  style={{ filter: 'grayscale(80%) contrast(130%)', maxHeight: '400px', objectFit: 'contain' }}
                />
              )}

              <button
                onClick={extractText}
                disabled={!image || loading}
                className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
              >
                {loading ? '🔍 Extracting...' : '✨ Extract Text'}
              </button>
            </section>

            {/* Extracted Items */}
            {items.length > 0 && (
              <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-lime-400">🛍️ Extracted Items</h2>
                <ul className="space-y-3">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition"
                    >
                      <span className="font-medium">{item.description}</span>
                      <span className="text-green-400 font-semibold">₹{item.amount}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-950 p-4 text-sm text-center text-gray-500 border-t border-gray-800">
          © {new Date().getFullYear()} OCR Scanner by Your Name. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default BillOCR;
