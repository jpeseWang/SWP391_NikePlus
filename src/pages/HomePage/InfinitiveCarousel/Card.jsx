import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const Card = ({ image }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.div
      className="relative flex h-[200px] min-w-[400px]  items-center justify-center overflow-hidden rounded-xl"
      key={image}
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      {/* Hover overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="pointer-events-none absolute h-full w-full bg-black opacity-50" />
            <motion.h1
              className="z-10 flex items-center gap-[0.5ch] rounded-full bg-white px-3 py-2 text-sm font-semibold hover:opacity-75"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
            >
              <span>Explore Now</span>
              {/* <Arrow className="h-4 w-4" /> */}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-sm leading-6 ">
        <div className="group relative">
          <div className="duration-400 absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-25 blur transition group-hover:opacity-100 group-hover:duration-200"></div>
          <a href="https://twitter.com/tim_cook" className="cursor-pointer">
            <div className="relative space-y-6 rounded-lg bg-slate-800 p-6 leading-none ring-1 ring-gray-900/5">
              <div className="flex items-center space-x-4">
                <img
                  src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                  className="h-12 w-12 rounded-full border bg-cover bg-center"
                  alt="Tim Cook"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                  <p className="text-md text-gray-500">CEO of Apple</p>
                </div>
              </div>
              <p className="text-md leading-normal text-gray-300">
                Diam quis enim lobortis scelerisque fermentum dui faucibus in
                ornare. Donec pretium vulputate sapien nec sagittis aliquam
                malesuada bibendum.
              </p>
            </div>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
