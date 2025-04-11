function Freelancer() {
  return (
    <div className="min-h-screen w-full bg-white text-gray-800 flex flex-col">
      {/* Header Section */}
      <header className="p-8 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          Freelance Connect
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Connect with the right clients, harness our AI-driven platform, and
          gain insights into your financial growth. Tailored for freelancers who
          want to excel.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-10">
        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Client Matching
            </h2>
            <p className="text-gray-700">
              Our advanced algorithms ensure you connect with clients that align
              with your expertise and professional goals.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI-Driven Insights
            </h2>
            <p className="text-gray-700">
              Leverage our AI tools to analyze project opportunities and gain
              valuable insights into client financial trends.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Financial Analytics
            </h2>
            <p className="text-gray-700">
              Monitor your earnings with comprehensive financial reports and
              analytics designed to boost your income.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white border border-gray-200 p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Why Choose Our Platform?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
            <li>Connect with high-quality clients who value your skills.</li>
            <li>Access advanced AI tools for smarter project management.</li>
            <li>Gain actionable insights to optimize your financial growth.</li>
            <li>User-centric design tailored for freelance success.</li>
          </ul>
        </section>

        {/* Call-to-Action */}
        <section className="text-center">
          <button className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-8 rounded-full font-semibold transition duration-300 shadow-lg">
            Get Started Now
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500">
        © {new Date().getFullYear()} Freelance Connect. All rights reserved.
      </footer>
    </div>
  );
}

export default Freelancer;
