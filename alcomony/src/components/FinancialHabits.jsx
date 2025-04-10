import React from "react";

const financialGoals = [
  {
    id: 1,
    title: "LYFT Savings",
    subtitle: "Waste Management",
    progress: 60,
    total: 100,
    daysLeft: 12,
  },
  {
    id: 2,
    title: "<₹50 on Gas",
    subtitle: "Employer Challenge",
    progress: 23,
    total: 100,
    daysLeft: 15,
  },
  {
    id: 3,
    title: "Travel",
    subtitle: "",
    progress: 60,
    total: 100,
    daysLeft: 12,
  },
];

const FinancialHabits = () => {
  return (
    <div className="bg-[#1E2235] text-white p-4 rounded-lg shadow-lg w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Improving Financial Habits</h2>
        <button className="text-gray-400">⋮</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {financialGoals.map((goal) => (
          <div key={goal.id} className="bg-[#2A2F48] p-4 rounded-lg">
            <p className="text-sm font-medium">{goal.title}</p>
            <p className="text-xs text-gray-400">{goal.subtitle}</p>
            <div className="relative flex justify-center items-center my-3">
              <div className="w-16 h-16 rounded-full border-[6px] border-gray-600 relative">
                <div
                  className="absolute top-0 left-0 w-full h-full border-[6px] rounded-full"
                  style={{
                    borderColor: goal.progress > 50 ? "#21C3B2" : "#FF8C00",
                    borderTopColor: "transparent",
                    transform: `rotate(₹{
                      (goal.progress / goal.total) * 360
                    }deg)`,
                  }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-center text-[#21C3B2]">
              ${goal.progress}/₹{goal.total}
            </p>
            <p className="text-xs text-center text-gray-400">
              {goal.daysLeft} days left
            </p>
          </div>
        ))}
        <div className="bg-[#2A2F48] p-4 rounded-lg flex justify-center items-center">
          <button className="text-gray-400 text-2xl">+</button>
        </div>
      </div>
    </div>
  );
};

export default FinancialHabits;
