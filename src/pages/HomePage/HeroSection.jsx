import React from "react";

export default function HeroSection() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-3xl py-12 ">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative cursor-pointer rounded-full px-3 py-1 text-sm leading-6 ring-1 ring-gray-600 hover:bg-gray-900 dark:text-textDark ">
            Elevate Your Game with the Latest Nike Gear &rarr;{" "}
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-medium tracking-tight sm:text-6xl dark:text-textDark">
            Welcome to Nike+
          </h1>
          <p className="text-regular mx-auto mt-6 max-w-xl leading-8 text-[#707070]">
            Discover the perfect blend of performance and style. From running
            shoes to training apparel, we have everything you need to conquer
            your goals.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-gray-200 hover:bg-[#1C1C1C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-textDark dark:ring-[#FAFAFA]"
            >
              Talk to us
            </a>
            <a
              href="#"
              className="light:text-textDark rounded-md bg-[#18181B] px-3.5 py-2.5 text-sm font-semibold text-[#FAFAFA] shadow-sm ring-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-[#c2c0c0] dark:text-[#18181B]"
            >
              Shop Now
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#707070]">
            Shop New Arrivals
          </p>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(20%+3rem)] top-[200px] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#b4b0b2] to-[#5d5c62] opacity-30 sm:left-[calc(30%)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%)",
          }}
        />
      </div>
    </div>
  );
}
