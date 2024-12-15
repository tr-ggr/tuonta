import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Participant {
  id: string;
  userId: string;
  name: string;
  videoFeedUrl?: string;
}

interface ParticipantsProps {
  participants: Participant[];
}

export const Participants = ({ participants }: ParticipantsProps) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const itemsPerView = 5;
  const safeParticipants = participants || [];

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
    <div className="w-full p-2 bg-white relative h-48">
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
      <div className="flex overflow-hidden h-full">
        {safeParticipants
          .slice(scrollIndex * itemsPerView, (scrollIndex + 1) * itemsPerView)
          .map((participant) => (
            <div key={participant.id} className="w-1/5 p-1 h-full">
              <div className="bg-gray-200 p-2 h-full flex flex-col justify-center">
                <h3 className="text-sm">{participant.name}</h3>
                <p className="text-xs">User ID: {participant.userId}</p>
                {participant.videoFeedUrl && (
                  <video src={participant.videoFeedUrl} controls className="w-full h-auto" />
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