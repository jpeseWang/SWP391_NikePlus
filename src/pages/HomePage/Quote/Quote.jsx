"use client"
// import { gsap, Linear } from "gsap";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";

export default function QuoteSection() {
    return (
        <section id="about" className="  h-screen dark:text-textDark">
            <div className="container mx-auto h-full flex items-center">
                <div className="wrapper px-12">
                    <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        whileInView={{ y: [-50, 0], opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="contact_left_container"
                    >
                        <p className="white font-medium text-6xl mt-64">
                            We are
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                @nikeplus
                            </span>
                            , all thing you need.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        whileInView={{ x: [-40, 0], opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="contact_left_container"
                    >
                        <p className="white font-medium text-4xl mt-16 ml-4">
                            Passion for organization and style
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        whileInView={{ x: [-90, 0], opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="contact_left_container"
                    >
                        <p className="white font-medium text-4xl mt-6 ml-4">
                            If you&apos;ve ever wondered how to turn your shelf into a
                            masterpiece of both function and aesthetics, you&apos;re in the
                            right place.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        whileInView={{ x: [-130, 0], opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="contact_left_container"
                    >
                        <p className="white font-medium text-4xl mt-6 ml-4">
                            With a passion for style that&apos;s as contagious, I&apos;m
                            excited to invite you to visit my page.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}