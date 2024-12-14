



export const Participants = () => {
    // Array of GIF URLs for each participant
    const participantGifs = [
      "/images/wewe.gif", // Participant 1 GIF
      "/images/wewe.gif", // Participant 2 GIF
      "/images/wewe.gif", // Participant 3 GIF
      "/images/wewe.gif", // Participant 4 GIF
    ];
  
    return (
      <div className="w-full p-4 bg-gray-600">
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((id) => (
            <div
              key={id}
              className="w-full h-24 bg-gray-800 rounded-lg flex items-center justify-center relative"
            >
              {/* GIF for each participant */}
              <img
                src={participantGifs[id - 1]} // Select the appropriate GIF based on the participant ID
                alt={`Participant ${id} GIF`}
                className="w-full h-full object-cover rounded-lg absolute"
              />
  
              {/* Participant name label */}
              <span className="text-white font-semibold z-10">{`Participant ${id}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  


//ADMIN VIEW
  
//   import React from "react";
// import { useAuth } from "./AuthContext";

// export const Participants = () => {
//   const { user } = useAuth(); // Access isAdmin flag

//   const handleKick = (id) => {
//     if (user.isAdmin) {
//       console.log(`Kicking Participant ${id}`); // Placeholder for backend call
//     } else {
//       alert("Only admins can kick participants!");
//     }
//   };

//   return (
//     <div className="w-full p-4 bg-gray-600">
//       <div className="grid grid-cols-4 gap-4">
//         {[1, 2, 3, 4].map((id) => (
//           <div
//             key={id}
//             className="w-full h-24 bg-gray-800 rounded-lg flex items-center justify-center relative"
//           >
//             <span className="text-white font-semibold z-10">
//               Participant {id}
//             </span>

//             {/* Admin-only Kick Button */}
//             {user.isAdmin && (
//               <button
//                 onClick={() => handleKick(id)}
//                 className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Kick
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
