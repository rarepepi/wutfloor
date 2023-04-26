import { useEffect, useState } from "react";

import { Transition } from "@headlessui/react";

import Link from "next/link";

import SearchBar from "./SearchBar";
const navigation = [
  { name: "Twitter", href: "#", current: false },
  { name: "Github", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TopNav(props) {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [gas, setGas] = useState(0);

  return (
    <div className="z-10">
      <nav className="bg-bg-light">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link className="" href="/" legacyBehavior>
                  <a>
                    <img
                      className="h-8 w-8 "
                      src="/img/logo-transparent.png"
                      alt="Workflow"
                    />
                  </a>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-1">
                  <Link href="/features" legacyBehavior>
                    <a className="text-white   font-bold flex justify-center hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md">
                      Features
                    </a>
                  </Link>
                  <Link href="/top" legacyBehavior>
                    <a className="text-white  font-bold  flex justify-center hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md">
                      Top
                    </a>
                  </Link>

                  <Link href="/hot" legacyBehavior>
                    <a className="text-white  font-bold  flex justify-center hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md ">
                      Hot
                    </a>
                  </Link>
                  {/* <Link href="/discover">
                    <a className="text-white  font-bold  flex justify-center hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md">
                      Discover
                    </a>
                  </Link> */}
                  {/* <Link href="/wallet">
                    <a className="text-white  font-bold  flex justify-center hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md ">
                      Wallet
                    </a>
                  </Link> */}
                  {props.dontShow == undefined && <SearchBar />}
                </div>
              </div>
              <div className="hidden md:block right-0 absolute">
                <a className="text-gray-200 hover:bg-gray-700  font-bold text-lg	 hover:text-white px-3 py-2 rounded-md ">
                  {/* {gas} */}
                  {/* <i className="fas fa-gas-pump text-lg ml-2" /> */}
                </a>
                <a
                  href="https://twitter.com/wutfloorxyz"
                  target="_blank"
                  className="text-gray-200 hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <i className="fab fa-twitter text-xl mr-2" />
                </a>
                <a
                  href="https://github.com/rarepepi/wutfloor"
                  target="_blank"
                  className="text-gray-200 hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <i className="fab fa-github text-xl mr-2" />
                </a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/features" legacyBehavior>
                  <a className="text-white   font-bold flex justify-center hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md">
                    Features
                  </a>
                </Link>
                <Link href="/top" legacyBehavior>
                  <a className="text-white   font-bold flex justify-center hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md">
                    Top
                  </a>
                </Link>
                <Link href="/hot" legacyBehavior>
                  <a className="text-white   font-bold flex justify-center hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md">
                    Hot
                  </a>
                </Link>

                {/* <Link href="/wallet">
                  <a className="text-white   font-bold flex justify-center hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md">
                    Wallet
                  </a>
                </Link> */}
                <SearchBar />

                <a className="text-gray-200 hover:bg-gray-700 flex justify-center font-bold text-lg	 hover:text-white px-3 py-2 rounded-md ">
                  {gas}
                  <i className="fas fa-gas-pump text-lg ml-2" />
                </a>
                <a
                  href="https://twitter.com/wutfloorxyz"
                  target="_blank"
                  className="text-gray-200 flex justify-center hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <i className="fab fa-twitter text-xl mr-2" />
                </a>
                <a
                  href="https://github.com/rarepepi/wutfloor"
                  target="_blank"
                  className="text-gray-200 flex justify-center hover:bg-gray-700 cursor-pointer	 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <i className="fab fa-github text-xl mr-2" />
                </a>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default TopNav;
