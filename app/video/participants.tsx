// "use client";

// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

// export const Participants = () => {
//   // Array of GIF URLs for each participant
//   const participantGifs = [
//     "/images/wewe.gif", // Participant 1 GIF
//     "/images/wewe.gif", // Participant 2 GIF
//     "/images/wewe.gif", // Participant 3 GIF
//     "/images/wewe.gif", // Participant 4 GIF
//     "/images/wewe.gif", // Participant 5 GIF
//     "/images/wewe.gif", // Participant 6 GIF
//     "/images/wewe.gif", // Participant 7 GIF
//     "/images/wewe.gif", // Participant 8 GIF
//   ];

//   const [scrollIndex, setScrollIndex] = useState(0);
//   const itemsPerView = 4; // Number of items to show per view

//   // Handle scroll
//   const scroll = (direction: "left" | "right") => {
//     setScrollIndex((prev) => {
//       if (direction === "left") {
//         return Math.max(prev - 1, 0);
//       } else {
//         return Math.min(prev + 1, Math.ceil(participantGifs.length / itemsPerView) - 1);
//       }
//     });
//   };

//   return (
//     <div className="w-full p-4 bg-white relative">
//       {/* Left Arrow */}
//       {scrollIndex > 0 && (
//         <button
//           onClick={() => scroll("left")}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg"
//         >
//           <FontAwesomeIcon icon={faChevronLeft} />
//         </button>
//       )}

//       {/* Participant Grid */}
//       <div className="overflow-hidden">
//         <div
//           className="flex gap-4 transition-transform duration-300"
//           style={{
//             transform: `translateX(-${scrollIndex * 100}%)`, // Adjust translation based on scroll index
//           }}
//         >
//           {participantGifs.map((gif, index) => (
//             <div
//               key={index}
//               className="w-48 h-24 bg-gray-200 rounded-lg flex items-center justify-center relative flex-shrink-0"
//             >
//               {/* GIF for each participant */}
//               <img
//                 src={gif} // Select the appropriate GIF
//                 alt={`Participant ${index + 1} GIF`}
//                 className="w-full h-full object-cover rounded-lg absolute"
//               />
//               {/* Participant name label */}
//               <span className="text-white font-semibold z-10">{`Participant ${index + 1}`}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Arrow */}
//       {scrollIndex < Math.ceil(participantGifs.length / itemsPerView) - 1 && (
//         <button
//           onClick={() => scroll("right")}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg"
//         >
//           <FontAwesomeIcon icon={faChevronRight} />
//         </button>
//       )}
//     </div>
//   );
// };


"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Participant {
  id: string;
  name: string;
  videoFeedUrl?: string; // Video feed URL for the participant
}

interface ParticipantsProps {
  participants: Participant[]; // Array of participants from the backend
}

export const Participants = (props?: ParticipantsProps) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const itemsPerView = 4; // Number of items to show per view

  // Safety check to ensure participants is always defined
  const safeParticipants = props?.participants || [];

  // Handle scroll
  const scroll = (direction: "left" | "right") => {
    setScrollIndex((prev) => {
      if (direction === "left") {
        return Math.max(prev - 1, 0);
      } else {
        return Math.min(prev + 1, Math.ceil(safeParticipants.length / itemsPerView) - 1);
      }
    });
  };

  return (
    <div className="w-full p-4 bg-white relative">
      {/* Left Arrow */}
      {scrollIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2"
          onClick={() => scroll("left")}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}

      {/* Participants List */}
      <div className="flex overflow-hidden">
        {safeParticipants
          .slice(scrollIndex * itemsPerView, (scrollIndex + 1) * itemsPerView)
          .map((participant) => (
            <div key={participant.id} className="w-1/4 p-2">
              <div className="bg-gray-200 p-4">
                <h3>{participant.name}</h3>
                {participant.videoFeedUrl && (
                  <video src={participant.videoFeedUrl} controls />
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Right Arrow */}
      {scrollIndex < Math.ceil(safeParticipants.length / itemsPerView) - 1 && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2"
          onClick={() => scroll("right")}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
};
