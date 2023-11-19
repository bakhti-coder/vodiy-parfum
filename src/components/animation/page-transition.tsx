"use client";

import { motion } from "framer-motion";
import React from "react";

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          translateY: 20, 
        }}
        exit={{
          opacity: 0,
          translateY: -20, 
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
export default PageTransitionProvider;
