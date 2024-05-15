import React from "react";

export default function HeroSection() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-3xl py-12 ">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 dark:text-textDark ring-1 ring-gray-600 hover:bg-gray-900 cursor-pointer ">
            Announcing Early Adopters Plan &rarr;{" "}
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-medium tracking-tight dark:text-textDark sm:text-6xl">
            Run your business smarter.
          </h1>
          <p className="mt-6 text-regular leading-8 text-[#707070] max-w-xl mx-auto">
            Midday provides you with greater insight into your business and
            automates the boring tasks, allowing you to focus on what you love
            to do instead.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md dark:text-textDark hover:bg-[#1C1C1C] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Talk to us
            </a>
            <a
              href="#"
              className="rounded-md hover:bg-[#c2c0c0] px-3.5 py-2.5 text-sm font-semibold text-[#18181B] shadow-sm ring-1 bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get Early Access
            </a>
          </div>
          <p className="mt-6 text-sm leading-8 text-[#707070] max-w-xl mx-auto">
            No credit card required.
          </p>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(20%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#b4b0b2] to-[#5d5c62] opacity-30 sm:left-[calc(30%)] sm:w-[72.1875rem] top-[200px]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%)",
          }}
        />
      </div>
    </div>
  );
}
