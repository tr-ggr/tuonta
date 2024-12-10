"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faCamera, faShareSquare } from "@fortawesome/free-solid-svg-icons";

export const ControlBar = () => {
  return (
    <div className="w-full h-16 bg-[#4530A7] flex justify-around items-center">
      <ControlButton icon={faMicrophone} />
      <ControlButton icon={faCamera} />
      <ControlButton icon={faShareSquare} />
    </div>
  );
};

const ControlButton = ({ icon }: { icon: any }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 flex items-center justify-center rounded-full bg-[#D9D9D9]"
    >
      <FontAwesomeIcon icon={icon} />
    </motion.button>
  );
};
