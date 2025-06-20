import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FramerScrollBlur = ({ children }) => {
  const elementRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: elementRef,
    
    offset: ["start start", "end end"],
  });


  const filter = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ["blur(15px)", "blur(15px)", "blur(0px)", "blur(15px)"]
  );
  
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.75, 1], 
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      ref={elementRef}
      style={{
        filter: filter, 
        opacity: opacity,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FramerScrollBlur;