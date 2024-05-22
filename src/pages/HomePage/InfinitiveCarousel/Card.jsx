import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const Card = ({ image }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <motion.div
            className="relative overflow-hidden h-[200px] min-w-[400px]  rounded-xl flex justify-center items-center"
            key={image}
            onHoverStart={() => setShowOverlay(true)}
            onHoverEnd={() => setShowOverlay(false)}
        >
            {/* Hover overlay */}
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 right-0 z-10 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute bg-black pointer-events-none opacity-50 h-full w-full" />
                        <motion.h1
                            className="bg-white font-semibold text-sm z-10 px-3 py-2 rounded-full flex items-center gap-[0.5ch] hover:opacity-75"
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
            <div class="text-sm leading-6 ">
                <div class="relative group">
                    <div
                        class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <a href="https://twitter.com/tim_cook" class="cursor-pointer">
                        <div
                            class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                            <div class="flex items-center space-x-4"><img
                                src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                                class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                                <div>
                                    <h3 class="text-lg font-semibold text-white">Tim Cook</h3>
                                    <p class="text-gray-500 text-md">CEO of Apple</p>
                                </div>
                            </div>
                            <p class="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque
                                fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                aliquam malesuada bibendum.</p>
                        </div>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default Card;