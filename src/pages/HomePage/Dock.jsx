/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const dockIcons = [
  {
    key: 1,
    url: "https://play-lh.googleusercontent.com/eLqKK4MkDoXXbD_F3A_2rs-othxTESxbocvyOGyhAmbNCydgnYKczItIY2-HLYJmhr6Q",
  },
  {
    key: 2,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFcV1o7oojlN9kwcbCnTvjdXDRZbIWN598wEKehs46g&s",
  },
  {
    key: 3,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Mk4nHU3WplWvJMDScLSvIEBKDCNp-3Yx4vXCA75Gni96I9FHedRIHkt7yXuWPgJwme8&usqp=CAU",
  },
  {
    key: 4,
    url: "https://cdn.iconscout.com/icon/free/png-256/free-jordan-43-282671.png",
  },
  {
    key: 5,
    url: "https://cdn-1.webcatalog.io/catalog/converse/converse-icon-filled-256.png?v=1714774021362",
  },
  {
    key: 6,
    url: "https://seeklogo.com/images/N/new-balance-logo-6BC6A6B337-seeklogo.com.png",
  },
];

export default function Dock() {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleHover = (index) => {
    setHoveredButton(index);
  };

  return (
    <motion.div
      className="mx-auto max-w-[300px] flex h-[58px] items-end gap-2 rounded-2xl px-2 pb-2 border dark:border-[#707070]"
      whileHover={{ scale: 1.1, opacity: 1 }}
    >
      {dockIcons.map((item) => (
        <button
          key={item.key}
          onMouseEnter={() => handleHover(item.key)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <motion.div
            animate={{
              scale:
                hoveredButton === item.key
                  ? 1.375
                  : hoveredButton === item.key - 1 ||
                    hoveredButton === item.key + 1
                  ? 1.2
                  : 1,
              y: hoveredButton === item.key ? [-3, 0] : 0,
            }}
          >
            <span className="sr-only">Finder</span>
            <img
              src={item.url}
              className="aspect-square rounded-lg h-[40px] w-[40px] hover:scale-x transform transition duration-y"
              alt=""
            />
          </motion.div>
        </button>
      ))}
    </motion.div>
  );
}
