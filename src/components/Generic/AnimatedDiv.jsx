import { motion } from "framer-motion";

const AnimatedDiv = ({
  children,
  variants,
  initial = "initial",
  animate = "animate",
  exit = "exit",
  transition = { duration: 0.5, type: "spring" },
  style = {},
  className = "",
  ...rest
}) => (
  <motion.div
    variants={variants}
    initial={initial}
    animate={animate}
    exit={exit}
    transition={transition}
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

export default AnimatedDiv; 