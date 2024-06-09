import styles from "./styles.module.scss";
import Picture1 from "../../../../public/images/1.jpeg";
import Picture3 from "../../../../public/images/3.jpg";
import Picture2 from "../../../../public/images/2.jpeg";
import Picture4 from "../../../../public/images/4.jpg";
import Picture5 from "../../../../public/images/5.jpg";
import Picture6 from "../../../../public/images/6.jpg";
import Picture7 from "../../../../public/images/7.jpeg";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { classNames } from "@/utils/classNames";

export default function Index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: "https://images.unsplash.com/photo-1715197318611-c2347a558778?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8",
      scale: scale4,
      classNames: "w-[] h-[]",
    },
    {
      src: "https://images.unsplash.com/photo-1509983165097-0c31a863e3f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      scale: scale5,
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1715914879541-57bf3411c4ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
      scale: scale6,
    },
    {
      src: "https://images.unsplash.com/photo-1715645978020-e420bd954560?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
      scale: scale5,
    },
    {
      src: "https://images.unsplash.com/photo-1716093264767-7d818c805f7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D",
      scale: scale6,
    },
    {
      src: "https://images.unsplash.com/photo-1716117274929-875f37a83fe5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D",
      scale: scale8,
    },
    {
      src: "https://images.unsplash.com/photo-1715630914630-145eff95062b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D",
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={styles.imageContainer}>
                <img
                  className=""
                  src={src}
                  fill="true"
                  alt="image"
                  placeholder="blur"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
