import { FaUser, FaBriefcase, FaSmile, FaQuestionCircle } from "react-icons/fa";
import Card from "./Card";

function Selector() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 py-12">
      {/* Title Section */}
      <div className="mb-12 text-center animate-fade-in-down">
        <div className="inline-flex items-center gap-3 mb-4">
          <FaQuestionCircle className="text-4xl text-white animate-bounce" />
          <h1 className="text-4xl font-bold text-white">Who are you?</h1>
        </div>
        <p className="text-xl text-gray-300 mt-2">
          Select your financial profile to get started
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:space-x-8">
        <Card
          title="Personal"
          description="Manage your personal finances, track expenses and set budgets tailored for your everyday needs."
          route="/dashboard"
          icon={<FaUser className="w-full h-full" />}
        />
        <Card
          title="Business"
          description="Organize business finances, monitor transactions and analyze growth with our comprehensive tools."
          route="/dashboard"
          icon={<FaBriefcase className="w-full h-full" />}
        />
        <Card
          title="Teens"
          description="Empower teens with financial literacy through simple tracking, saving, and budgeting features."
          route="/dashboard"
          icon={<FaSmile className="w-full h-full" />}
        />
      </div>
    </div>
  );
}

export default Selector;
