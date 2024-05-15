import React from "react";

export default function CTA() {
  return (
    <>
      <section className="border border-border rounded-2xl container bg-white dark:bg-[#121212] p-8 md:p-10 md:pb-0 overflow-hidden mb-12">
        <div className="flex flex-col md:space-x-12 md:flex-row">
          <div className="w-full">
            <img
              alt="Overview"
              width="789"
              height="400"
              decoding="async"
              data-nimg="1"
              className="hidden dark:block -mb-[1px] object-contain"
              src="https://midday.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofit-loss.b5a29e84.png&w=1920&q=75"
            />
          </div>
          <div className="mt-6 md:max-w-[40%] md:ml-8 md:mb-8">
            <h3 className="font-medium text-xl md:text-2xl mb-4">
              Financial overview
            </h3>

            <p className="text-[#878787] mb-4">
              Bring your own bank. We connect to over 20 000+ banks in 33
              countries across US, Canada, UK and Europe. Keep tabs on your
              expenses and income, and gain a clearer picture of your
              business&apos;s financial track record and current situation.
            </p>

            <div className="flex space-x-2 items-center mt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="13"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                ></path>
              </svg>
              <span className="text-[#878787]">Share financial reports</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
