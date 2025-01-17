import React from "react";
import { motion } from "framer-motion";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const OverlayModel = ({ children, onClose, isOpen }: OverlayProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex md:justify-center md:items-center justify-end z-[1050]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white w-1/2 md:h-2/3 h-full shadow-lg relative"
        initial={{ width: "50%" }}
        animate={{ x: 0 }}
        exit={{ x: "50%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        // onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default OverlayModel;
