"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faCamera, faShareSquare, faPhoneSlash } from "@fortawesome/free-solid-svg-icons";

export const ControlBar = () => {
  return (
    <div className="w-full h-20 bg-white flex justify-center items-center gap-x-28">
      <ControlButton icon={faMicrophone} />
      <ControlButton icon={faCamera} />
      <ControlButton icon={faShareSquare} />
      <ControlButton icon={faPhoneSlash} isEndCall />
    </div>
  );
};

const ControlButton = ({ icon, isEndCall }: { icon: any; isEndCall?: boolean }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`w-12 h-12 flex items-center justify-center rounded-full ${
        isEndCall ? "bg-red-500 text-white" : "bg-[#D9D9D9]"
      }`}
    >
      <FontAwesomeIcon icon={icon} />
    </motion.button>
  );
};




// import React from "react";
// import { useAuth } from "./AuthContext";

// export const ControlBar = () => {
//   const { user } = useAuth(); // Access isAdmin flag

//   const handleDeleteMessage = () => {
//     if (user.isAdmin) {
//       console.log("Deleting messages..."); // Placeholder for backend call
//     } else {
//       alert("Only admins can delete messages!");
//     }
//   };

//   return (
//     <div className="w-full p-4 bg-gray-700 flex justify-between">
//       <div>Chat Section</div>
//       {user.isAdmin && (
//         <button
//           onClick={handleDeleteMessage}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Delete Messages
//         </button>
//       )}
//     </div>
//   );
// };
