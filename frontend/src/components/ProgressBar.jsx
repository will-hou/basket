import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

const ProgressBar = (props) => {
  const [animate, setAnimate] = useState(false);

  const startingSavingsWidth = props.curSavings * props.width;
  const newSavingsWidth = props.newSavings * props.width;

  // Trigger the animation on mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  const variants = {
    hidden: { width: 0, opacity: 0 },
    visible: (custom) => ({ width: custom, opacity: 1 }),
  };

  return (
    <div className="progress-bar grid relative">
      {/* Static background div */}
      <div
        className="z-50 border-black border-2 col-start-1 row-start-1 rounded-full"
        style={{ width: `${props.width}px` }}
      />

      {/* First bar with slide-in animation */}
      <motion.div
        className="z-20 h-[20px] bg-primary col-start-1 row-start-1 rounded-full"
        initial="hidden"
        animate="visible"
        variants={variants}
        custom={startingSavingsWidth}
        transition={{ duration: 1, ease: "easeInOut"}}  // You can customize the transition duration and other properties
      />

      {/* Second bar with delayed slide-in animation */}
      <motion.div
        className="z-10 h-[20px] bg-tertiary col-start-1 row-start-1 rounded-full"
        initial="hidden"
        animate="visible"
        variants={variants}
        custom={newSavingsWidth}
        transition={{ duration: 1, delay: 1, ease: "easeInOut" }}  // You can customize the transition duration and other properties
      />
    </div>
  );
};

export default ProgressBar;