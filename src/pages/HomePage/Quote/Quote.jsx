"use client";
// import { gsap, Linear } from "gsap";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";

export default function QuoteSection() {
  return (
    <section id="about" className="  h-screen dark:text-textDark">
      <div className="container mx-auto flex h-full items-center">
        <div className="wrapper px-12">
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            whileInView={{ y: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
            className="contact_left_container"
          >
            <p className="white mt-64 text-6xl font-medium">
              We are
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
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
            <p className="white ml-4 mt-16 text-4xl font-medium">
              Passion for organization and style!
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            whileInView={{ x: [-90, 0], opacity: 1 }}
            transition={{ duration: 1 }}
            className="contact_left_container"
          >
            <p className="white ml-4 mt-6 text-4xl font-medium">
              Discover our most popular items, loved by athletes worldwide. Shop
              Best Sellers
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            whileInView={{ x: [-130, 0], opacity: 1 }}
            transition={{ duration: 1 }}
            className="contact_left_container"
          >
            <p className="white ml-4 mt-6 text-4xl font-medium">
              Exclusive designs that make a statement.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
