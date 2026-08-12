import { motion } from "motion/react";

const FloatingLeaf = ({
    src = "/images/leaf.png",
    delay = 0,
    left = "50%",
    size = 32,
    duration = 7,
}) => {
    return (
        <motion.img
            src={src}
            alt="Falling leaf"
            className="fixed pointer-events-none select-none z-50"
            style={{
                left,
                width: size,
            }}
            initial={{
                y: "-10vh",
                x: 0,
                rotate: 0,
                opacity: 0,
            }}
            animate={{
                y: "110vh",
                x: [0, 35, -25, 45, -20, 30],
                rotate: [0, 40, -30, 60, -45, 80],
                opacity: [0, 1, 1, 1, 0.8, 0],
            }}
            transition={{
                duration,
                delay,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
            }}
        />
    );
};

export default FloatingLeaf;