import React from "react";
import { motion } from "framer-motion";

function Toasty() {
  const [isShown, setIsShown] = React.useState(false);

  const wrapperRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      setIsShown(entry.isIntersecting);
    });

    observer.observe(wrapperRef.current);
  }, []);

  const translateX = isShown ? "0%" : "100%";

  return (
    <div
      ref={wrapperRef}
      className="relative pointer-events-none md:w-screen my-20"
    >
      <motion.div
        className="absolute -left-16 md:left-2/4 bottom-0 text-9xl will-change-transform"
        transition={{
          type: "spring",
          stiffness: isShown ? 300 : 600,
          damping: isShown ? 70 : 40,
          restDelta: 0.01,
        }}
        animate={{
          x: translateX,
        }}
      >
        😻
      </motion.div>
    </div>
  );
}

export default Toasty;
