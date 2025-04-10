const transactions = [
  {
    id: 1,
    type: "Order Revenue",
    date: "Apr 27, 22",
    amount: "+ ₹874",
    isPositive: true,
  },
  {
    id: 2,
    type: "Withdrawal Initiated",
    date: "Apr 25, 22",
    amount: "- ₹2490",
    isPositive: false,
  },
  {
    id: 3,
    type: "Order Revenue",
    date: "Mar 1, 22",
    amount: "+ ₹126",
    isPositive: true,
  },
];

const TransactionHistory = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-80">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">History Transactions</h2>
        <a href="#" className="text-blue-500 text-sm">
          View all
        </a>
      </div>

      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center gap-3 mb-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <span className="text-blue-500">⬇</span>{" "}
            {/* Replace with an icon */}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{transaction.type}</p>
            <p className="text-xs text-gray-500">{transaction.date}</p>
          </div>
          <p
            className={`text-sm font-semibold ${
              transaction.isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {transaction.amount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
