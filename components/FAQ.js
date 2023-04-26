import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
const FAQ = () => {
  return (
    <div id="FAQ" className="w-full px-4">
      <div className="relative flex flex-col items-center justify-center sm:px-0 px-6 z-20 pb-16">
        <div className="">
          <h1
            role="heading"
            className="xl:text-4xl text-2xl font-bold leading-10 text-white"
          >
            FAQ
          </h1>
        </div>
      </div>
      <div className=" p-2 mx-auto bg-transparent rounded-2xl h-2/3 lg:w-2/3 text-white">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-center w-full px-4 py-2 lg:text-3xl font-medium text-center bg-green-100 rounded-lg hover:bg-green-300 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
                <span>What is Wut Floor?</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-green-300`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-4 lg:text-2xl text-gray-200 text-center">
                a<span className="text-purple-500"> "floor" </span>
                <span className="text-green-300">price</span> calculator
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-center w-full px-4 py-2 lg:text-3xl font-medium text-center bg-green-300 rounded-lg hover:bg-green-300 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
                <span>Is this open sourced?</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-green-300`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 lg:text-2xl text-gray-200 text-center">
                <span className="text-green-300"> Yes! </span>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default FAQ;
