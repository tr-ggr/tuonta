import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Participant {
  id: string;
  userId: string;
  name: string;
  imageUrl?: string;
}

interface ParticipantsProps {
  participants: Participant[];
}

export const Participants = ({ participants }: ParticipantsProps) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const itemsPerView = 4;
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
    <div className="w-full p-2 bg-white relative h-32 flex justify-center items-center">
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
      <div className="flex overflow-hidden h-full justify-center items-center space-x-4">
        {safeParticipants
          .slice(scrollIndex * itemsPerView, (scrollIndex + 1) * itemsPerView)
          .map((participant) => (
            <div key={participant.id} className="w-2/6 p-1 h-full">
              <div className="bg-gray-200 p-2 h-full flex flex-col justify-center items-center">
                <h3 className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{participant.name}</h3>
                {participant.imageUrl && (
                  <img src={participant.imageUrl} alt={participant.name} className="w-full h-full object-contain" />
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