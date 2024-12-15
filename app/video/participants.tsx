"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const Participants = () => {
  // Array of GIF URLs for each participant
  const participantGifs = [
    "/images/wewe.gif", // Participant 1 GIF
    "/images/wewe.gif", // Participant 2 GIF
    "/images/wewe.gif", // Participant 3 GIF
    "/images/wewe.gif", // Participant 4 GIF
    "/images/wewe.gif", // Participant 5 GIF
    "/images/wewe.gif", // Participant 6 GIF
    "/images/wewe.gif", // Participant 7 GIF
    "/images/wewe.gif", // Participant 8 GIF
  ];

  const [scrollIndex, setScrollIndex] = useState(0);
  const itemsPerView = 4; // Number of items to show per view

  // Handle scroll
  const scroll = (direction: "left" | "right") => {
    setScrollIndex((prev) => {
      if (direction === "left") {
        return Math.max(prev - 1, 0);
      } else {
        return Math.min(prev + 1, Math.ceil(participantGifs.length / itemsPerView) - 1);
      }
    });
  };

  return (
    <div className="w-full p-4 bg-white relative">
      {/* Left Arrow */}
      {scrollIndex > 0 && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}

      {/* Participant Grid */}
      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-300"
          style={{
            transform: `translateX(-${scrollIndex * 100}%)`, // Adjust translation based on scroll index
          }}
        >
          {participantGifs.map((gif, index) => (
            <div
              key={index}
              className="w-48 h-24 bg-gray-200 rounded-lg flex items-center justify-center relative flex-shrink-0"
            >
              {/* GIF for each participant */}
              <img
                src={gif} // Select the appropriate GIF
                alt={`Participant ${index + 1} GIF`}
                className="w-full h-full object-cover rounded-lg absolute"
              />
              {/* Participant name label */}
              <span className="text-white font-semibold z-10">{`Participant ${index + 1}`}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      {scrollIndex < Math.ceil(participantGifs.length / itemsPerView) - 1 && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
};
