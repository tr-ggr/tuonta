import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons"; // Participant icon
import SideBar from "./sidebar";
import { VideoFeed } from "./videofeed";
import { ControlBar } from "./controlbar";
import { Participants } from "./participants";

export default function VideoSessionLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Title Card */}
        <div className="bg-white text-gray-700 px-6 py-4 flex justify-between items-center">
          {/* Left Side: Session Name and Privacy */}
          <div>
            <h1 className="text-xl font-semibold">Study Session: Data Structures</h1>
            <p className="text-sm flex items-center space-x-2">
              <span
                className="px-2 py-1 rounded-full bg-[#4530A7] text-white border border-[#4530A7] text-xs"
              >
                Public
              </span>
            </p>
          </div>

          {/* Right Side: Room Creator and Participants */}
          <div className="text-right">
            <p className="text-sm">
              <span className="font-semibold">Room Creator:</span> Jane Doe
            </p>
            <p className="text-sm flex items-center justify-end space-x-2">
              <FontAwesomeIcon icon={faUsers} className="text-[#4530A7]" />
              <span>
                <span className="font-semibold">Participants:</span> 12
              </span>
            </p>
          </div>
        </div>

        {/* Main Video Feed */}
        <VideoFeed />

        {/* Participants' Video Feeds */}
        <Participants />

        {/* Control Bar */}
        <ControlBar />
      </div>

      {/* Sidebar moved to the right side */}
      <SideBar />
    </div>
  );
}


// import React from "react";
// import { useAuth } from "./AuthContext";
// import { Participants } from "./Participants";
// import { ControlBar } from "./ControlBar";

// export const VideoSessionLayout = () => {
//   const { user } = useAuth(); // Access isAdmin flag

//   return (
//     <div className="flex h-screen">
//       <div className="flex-1 flex flex-col">
//         {/* Participants */}
//         <Participants />

//         {/* Control Bar */}
//         <ControlBar />
//       </div>
//     </div>
//   );
// };
