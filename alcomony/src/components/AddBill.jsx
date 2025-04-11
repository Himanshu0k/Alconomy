import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import axios from 'axios';
import LeftNavbar from './LeftNavbar';

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
      tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .:-',
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
    <div className="flex min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-md">
        <LeftNavbar />
      </aside>

      {/* Main Layout */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="bg-white p-6 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold text-cyan-600 tracking-wide flex items-center gap-2">
            🧾 Bill OCR Scanner
          </h1>
          <p className="text-gray-500 text-sm mt-1">Extract and store expenses from bill images</p>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-6 overflow-y-auto bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Column */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">📤 Upload Your Bill Image</h2>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block mb-6 w-full text-sm file:bg-cyan-600 file:hover:bg-cyan-700 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 file:cursor-pointer"
              />

              {image && (
                <img
                  src={image}
                  alt="Uploaded Preview"
                  className="mb-6 w-full rounded-lg border border-gray-300 shadow transition-transform hover:scale-[1.02]"
                  style={{
                    filter: 'grayscale(80%) contrast(130%)',
                    maxHeight: '400px',
                    objectFit: 'contain',
                  }}
                />
              )}

              <button
                onClick={extractText}
                disabled={!image || loading}
                className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 w-full"
              >
                {loading ? '🔍 Extracting...' : '✨ Extract Text'}
              </button>
            </section>

            {/* Right Column - Extracted Items */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-lime-600">🛍️ Extracted Items</h2>
              {items.length === 0 ? (
                <p className="text-gray-500">No items extracted yet. Upload a bill and extract to see results.</p>
              ) : (
                <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg transition"
                    >
                      <span className="font-medium text-gray-800">{item.description}</span>
                      <span className="text-green-600 font-semibold">₹{item.amount}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white text-gray-500 text-sm text-center py-4 border-t border-gray-200">
          © {new Date().getFullYear()} OCR Scanner by Your Name. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default BillOCR;
