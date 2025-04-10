export default function FormComponent({ setForms }) {
  // ... existing react-hook-form logic ...

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-50 p-8 rounded-2xl shadow-xl w-full max-w-xl"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Financial Information Form
      </h2>

      <div className="space-y-4">
        {/* Personal Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              {...register("name", { required: true })}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">Name is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              {...register("phone", { required: true })}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">Phone is required</p>
            )}
          </div>
        </div>

        {/* Email and Verification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            {...register("email", { required: true })}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">Valid email is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Verification Code
          </label>
          <input
            {...register("verificationCode", { required: true, minLength: 6 })}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.verificationCode ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="6-digit code"
          />
          {errors.verificationCode && (
            <p className="mt-1 text-sm text-red-600">
              Must be at least 6 characters
            </p>
          )}
        </div>

        {/* Financial Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Expenses (₹)
            </label>
            <input
              {...register("dayEndExpense", { required: true })}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.dayEndExpense ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="e.g., 150.00"
            />
            {errors.dayEndExpense && (
              <p className="mt-1 text-sm text-red-600">Required field</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Income (₹)
            </label>
            <input
              {...register("monthlyEarning", { required: true })}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.monthlyEarning ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="e.g., 4500.00"
            />
            {errors.monthlyEarning && (
              <p className="mt-1 text-sm text-red-600">Required field</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Submit Financial Details
        </button>
      </div>
    </form>
  );
}
