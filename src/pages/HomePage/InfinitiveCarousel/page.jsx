"use client"
import Card from "./Card";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

export default function InfinitiveCarousel() {
    const images = [
        "https://images.unsplash.com/photo-1715197318611-c2347a558778?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1715197318611-c2347a558778?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1715197318611-c2347a558778?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1715197318611-c2347a558778?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8",
       
    ];
    const FAST_DURATION = 30;
    const SLOW_DURATION = 75;

    const [duration, setDuration] = useState(FAST_DURATION);
    let [ref, { width }] = useMeasure();

    const xTranslation = useMotionValue(0);

    const [mustFinish, setMustFinish] = useState(false);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        let controls;
        let finalPosition = -width / 2 - 8;

        if (mustFinish) {
            controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
                ease: "linear",
                duration: duration * (1 - xTranslation.get() / finalPosition),
                onComplete: () => {
                    setMustFinish(false);
                    setRerender(!rerender);
                },
            });
        } else {
            controls = animate(xTranslation, [0, finalPosition], {
                ease: "linear",
                duration: duration,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
            });
        }

        return controls?.stop;
    }, [rerender, xTranslation, duration, width]);

    return (
        <main className="py-8 my-16">
            <motion.div
                className="absolute left-0 flex gap-4 max-w-screen"
                style={{ x: xTranslation }}
                ref={ref}
                onHoverStart={() => {
                    setMustFinish(true);
                    setDuration(SLOW_DURATION);
                }}
                onHoverEnd={() => {
                    setMustFinish(true);
                    setDuration(FAST_DURATION);
                }}
            >
                {[...images, ...images].map((item, idx) => (
                    <Card image={`${item}`} key={idx} />
                ))}
            </motion.div>
        </main>
    );
}