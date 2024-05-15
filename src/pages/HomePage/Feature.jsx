"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import image1 from "../HomePage/images/josh-redd.jpg";
import image2 from "../HomePage/images/peter-aroner.jpg";
export default function Feature() {
  return (
    <div className=" py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h3 className="text-4xl md:text-8xl font-medium dark:text-textDark">
            Save hours.
          </h3>
          <p className="mt-4 md:mt-8 text-[#878787] max-w-[600px] mx-auto">
            From automated receipt-to-transaction mapping to conversing with
            your financials and consolidating all your files, Midday not only
            assists you with your most tiresome business tasks but also enhances
            your ability to gain valuable business insights.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-[1504px] border border-[#2b2b2b] rounded-2xl container bg-white dark:bg-[#121212] p-8 md:p-10 md:pb-0 overflow-hidden mb-12 mt-16">
        <div className="flex flex-col md:space-x-12 md:flex-row">
          <div className="">
            <motion.div
              whileInView={{ y: -10, x: 10 }}
              whileHover={{ y: -10, x: 10 }}
            >
              <Image
                alt="Overview"
                width="789"
                height="400"
                decoding="async"
                data-nimg="1"
                className="hidden dark:block -mb-[1px] object-contain"
                src={image1}
              />
            </motion.div>
          </div>
          <div className="mt-6 md:max-w-[40%] md:ml-8 md:mb-8">
            <h3 className="font-medium text-xl md:text-2xl mb-4 dark:text-textDark">
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

      <section className="relative mb-12 max-w-[1504px] mx-auto">
        <div className="mx-auto border border-[#2b2b2b] rounded-2xl container bg-white dark:bg-[#121212] p-8 md:p-10 md:pb-0 overflow-hidden">
          <div className="flex flex-col md:space-x-12 md:flex-row">
            <div className="mt-6 md:max-w-[40%] md:mr-8 md:mb-8">
              <h3 className="font-medium text-xl md:text-2xl mb-4 dark:text-textDark">
                Time track your projects
              </h3>
              <p className="text-[#878787] mb-4">
                Effortlessly boost productivity and collaboration with our
                advanced time tracking solution: gain insightful project
                overviews and foster seamless collaboration amongst your team
                for optimal efficiency and success.
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
                <span className="text-[#878787]">Live time tracking</span>
              </div>
              <div className="flex space-x-2 items-center mt-1">
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
                <span className="text-[#878787]">Share with your clients</span>
              </div>
            </div>
            <div className="!ml-auto">
              <motion.div
                whileInView={{ y: -10, x: -10 }}
                whileHover={{ y: -10, x: -10 }}
              >
                <Image
                  src={image2}
                  alt="Overview"
                  width="789"
                  height="400"
                  decoding="async"
                  data-nimg="1"
                  className="hidden dark:block -mb-[1px] object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="w-[216px] h-[216px] rounded-full blur-2xl absolute -top-50 -left-100 bg-[#F59F95]/5 z-[-10]"></div>
        <div className="w-[216px] h-[216px] rounded-full blur-2xl absolute -bottom-50 -right-100 bg-[#A1F5CD]/5 z-[-10]"></div>
      </section>
    </div>
  );
}
