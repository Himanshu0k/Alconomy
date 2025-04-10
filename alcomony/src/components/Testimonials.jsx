function Testimonials() {
  return (
    <>
      <section id="testimonies" className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
          <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
            <div className="mb-12 space-y-5 md:mb-16 md:text-center">
              <div className="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 rounded-lg md:text-center bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
                Words from Our Users
              </div>
              <h1 className="mb-5 text-3xl font-semibold text-white md:text-5xl">
                Our Community.
              </h1>
              <p className="text-xl text-gray-100 md:text-2xl">
                Here's what our users have to say.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {/* Group 1 */}
            <ul className="space-y-8">
              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/men/10.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Rahul Sharma"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Rahul Sharma
                          </h3>
                          <p className="text-gray-500 text-md">
                            CEO, Startup Hub
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        This platform has transformed our business
                        operations—efficient, intuitive, and transparent.
                      </p>
                    </div>
                  </a>
                </div>
              </li>

              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/women/11.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Priya Singh"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Priya Singh
                          </h3>
                          <p className="text-gray-500 text-md">
                            Digital Marketing Expert
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        I love the user-friendly interface and deep
                        analytics—it’s a game changer for our marketing
                        campaigns.
                      </p>
                    </div>
                  </a>
                </div>
              </li>

              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/men/12.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Anil Kumar"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Anil Kumar
                          </h3>
                          <p className="text-gray-500 text-md">
                            Financial Analyst
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        The insights here have helped me make smarter investment
                        decisions every day.
                      </p>
                    </div>
                  </a>
                </div>
              </li>

              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/women/13.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Sunita Patel"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Sunita Patel
                          </h3>
                          <p className="text-gray-500 text-md">Entrepreneur</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        An indispensable tool that has streamlined our finance
                        management and boosted productivity.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>

            {/* Group 2 */}
            <ul className="hidden space-y-8 sm:block">
              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/men/14.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Vikram Joshi"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Vikram Joshi
                          </h3>
                          <p className="text-gray-500 text-md">
                            Product Manager
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        A game-changing experience in the tech space. The
                        customer support is simply unparalleled.
                      </p>
                    </div>
                  </a>
                </div>
              </li>

              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/women/15.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Neha Gupta"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Neha Gupta
                          </h3>
                          <p className="text-gray-500 text-md">
                            Software Developer
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        Innovative, efficient, and reliable – this platform has
                        taken my projects to the next level.
                      </p>
                    </div>
                  </a>
                </div>
              </li>

              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/men/16.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Amit Verma"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Amit Verma
                          </h3>
                          <p className="text-gray-500 text-md">
                            Business Strategist
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        Their attention to detail and quality is evident in
                        every feature. Truly remarkable.
                      </p>
                    </div>
                  </a>
                </div>
              </li>

              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/women/17.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Kavita Rao"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Kavita Rao
                          </h3>
                          <p className="text-gray-500 text-md">Consultant</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        This service not only meets, but exceeds expectations. A
                        must-have for professionals.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>

            {/* Group 3 */}
            <ul className="hidden space-y-8 lg:block">
              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/men/18.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Rohit Mehra"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Rohit Mehra
                          </h3>
                          <p className="text-gray-500 text-md">
                            CTO, TechSolutions
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        We noticed immediate improvements in workflow and
                        productivity after adopting this platform.
                      </p>
                    </div>
                  </a>
                </div>
              </li>

              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/women/19.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Maya Iyer"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Maya Iyer
                          </h3>
                          <p className="text-gray-500 text-md">Entrepreneur</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        The intuitive design and powerful analytics have made a
                        significant impact on our bottom line.
                      </p>
                    </div>
                  </a>
                </div>
              </li>

              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/men/20.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Sanjay Patel"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Sanjay Patel
                          </h3>
                          <p className="text-gray-500 text-md">Investor</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        A brilliant solution for today’s business
                        challenges—trustworthy, efficient, and reliable.
                      </p>
                    </div>
                  </a>
                </div>
              </li>

              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/women/21.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Leena Das"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Leena Das
                          </h3>
                          <p className="text-gray-500 text-md">HR Manager</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        A refreshing, modern approach to team management. This
                        tool has truly elevated our HR processes.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
