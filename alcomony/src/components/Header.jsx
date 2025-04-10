import alconomy from "./alconomy.png";
function Header() {
  return (
    <>
      <header className="bg-white pt-3 h-24 dark:bg-gray-900">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a className="block text-teal-600 dark:text-teal-300" href="#">
                <span className="sr-only">Home</span>
                <img src={alconomy} className="h-60 l-10" alt="" />
              </a>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <a
                    className="rounded-md bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-amber-800"
                    href="/paypal-checkout"
                  >
                    Buy Subscription
                  </a>
                  <a
                    className="rounded-md bg-amber-400 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-amber-600"
                    href="/freelancer"
                  >
                    Freelancer?
                  </a>
                  <a
                    className="rounded-md bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-amber-400"
                    href="/trading-app"
                  >
                    Trading Apps
                  </a>
                  <a
                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-teal-500"
                    href="/login"
                  >
                    Login
                  </a>

                  <div className="hidden sm:flex">
                    <a
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                      href="/register"
                    >
                      Register
                    </a>
                  </div>
                </div>

                <div className="block md:hidden">
                  <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
