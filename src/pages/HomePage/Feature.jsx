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
          <h3 className="text-4xl font-medium md:text-8xl dark:text-textDark">
            Win On Air
          </h3>
          <p className="mx-auto mt-4 max-w-[600px] text-[#878787] md:mt-8">
            Meet the next generation of Nike Air. Engineered to the exact
            specifications of championship athletes.
          </p>
        </div>
      </div>

      <section className="container mx-auto mb-12 mt-16 max-w-[1504px] overflow-hidden rounded-2xl border border-[#2b2b2b] bg-white p-8 md:p-10 md:pb-0 dark:bg-[#121212]">
        <div className="flex flex-col md:flex-row md:space-x-12">
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
                className="-mb-[1px] hidden object-contain dark:block"
                src={image1}
              />
            </motion.div>
          </div>
          <div className="mt-6 md:mb-8 md:ml-8 md:max-w-[40%]">
            <h3 className="mb-4 text-xl font-medium md:text-2xl dark:text-textDark">
              Financial overview
            </h3>

            <p className="mb-4 text-[#878787]">
              Bring your own bank. We connect to over 20 000+ banks in 33
              countries across US, Canada, UK and Europe. Keep tabs on your
              expenses and income, and gain a clearer picture of your
              business&apos;s financial track record and current situation.
            </p>

            <div className="mt-8 flex items-center space-x-2">
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

      <section className="relative mx-auto mb-12 max-w-[1504px]">
        <div className="container mx-auto overflow-hidden rounded-2xl border border-[#2b2b2b] bg-white p-8 md:p-10 md:pb-0 dark:bg-[#121212]">
          <div className="flex flex-col md:flex-row md:space-x-12">
            <div className="mt-6 md:mb-8 md:mr-8 md:max-w-[40%]">
              <h3 className="mb-4 text-xl font-medium md:text-2xl dark:text-textDark">
                Time track your projects
              </h3>
              <p className="mb-4 text-[#878787]">
                Effortlessly boost productivity and collaboration with our
                advanced time tracking solution: gain insightful project
                overviews and foster seamless collaboration amongst your team
                for optimal efficiency and success.
              </p>
              <div className="mt-8 flex items-center space-x-2">
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
              <div className="mt-1 flex items-center space-x-2">
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
                  className="-mb-[1px] hidden object-contain dark:block"
                />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="-top-50 -left-100 absolute z-[-10] h-[216px] w-[216px] rounded-full bg-[#F59F95]/5 blur-2xl"></div>
        <div className="-bottom-50 -right-100 absolute z-[-10] h-[216px] w-[216px] rounded-full bg-[#A1F5CD]/5 blur-2xl"></div>
      </section>
    </div>
  );
}
