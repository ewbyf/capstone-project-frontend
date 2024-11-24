import React from "react";
import { motion } from "framer-motion";
import { HighlighBlocks } from "./HighlighBlocks";
export const BenefitsGrid = () => {
  return (
    <motion.section
      transition={{
        staggerChildren: 0.1,
      }}
      initial="initial"
      whileInView="whileInView"
      className="relative mx-auto grid max-w-6xl grid-cols-3 gap-4 px-2 py-12 md:px-4"
    >
      <HighlighBlocks />
    </motion.section>
  );
};
