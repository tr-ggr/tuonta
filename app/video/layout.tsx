import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons"; // Participant icon
import SideBar from "./sidebar";
import { VideoFeed } from "./videofeed";
import { ControlBar } from "./controlbar";
import { Participants } from "./participants";

// Define the types of the props to be passed
interface VideoSessionLayoutProps {
  sessionName: string; // The name of the session
  sessionCreator: string; // The creator of the session
  participantsCount: number; // Number of participants in the session
  groupType: "Public" | "Private"; // The group type (public or private)
}

const dummyParticipants = [
  { id: '1', name: 'Alice', videoFeedUrl: 'https://example.com/video1' },
  { id: '2', name: 'Bob', videoFeedUrl: 'https://example.com/video2' },
  { id: '3', name: 'Charlie', videoFeedUrl: 'https://example.com/video3' },
  { id: '4', name: 'David', videoFeedUrl: 'https://example.com/video4' },
  { id: '5', name: 'Eve', videoFeedUrl: 'https://example.com/video5' },
];

const dummyChatMessages = [
  { id: '1', senderName: 'Alice', content: 'Hello everyone!' },
  { id: '2', senderName: 'Bob', content: 'Hi Alice!' },
  { id: '3', senderName: 'Charlie', content: 'Good morning!' },
  { id: '4', senderName: 'David', content: 'How are you all?' },
  { id: '5', senderName: 'Eve', content: 'I am fine, thank you!' },
];


export default function VideoSessionLayout({
  sessionName,
  sessionCreator,
  participantsCount,
  groupType,
}: VideoSessionLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Title Card */}
        <div className="bg-white text-gray-700 px-6 py-4 flex justify-between items-center">
          {/* Left Side: Session Name and Privacy */}
          <div>
            <h1 className="text-xl font-semibold">{`Study Session: ${sessionName}`}</h1>
            <p className="text-sm flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full ${
                  groupType === "Public" ? "bg-[#4530A7]" : "bg-gray-500"
                } text-white border border-[#4530A7] text-xs`}
              >
                {groupType} {/* Display group type */}
              </span>
            </p>
          </div>

          {/* Right Side: Room Creator and Participants */}
          <div className="text-right">
            <p className="text-sm">
              <span className="font-semibold">Room Creator:</span> {sessionCreator}
            </p>
            <p className="text-sm flex items-center justify-end space-x-2">
              <FontAwesomeIcon icon={faUsers} className="text-[#4530A7]" />
              <span>
                <span className="font-semibold">Participants:</span> {participantsCount}
              </span>
            </p>
          </div>
        </div>

        {/* Main Video Feed */}
        <VideoFeed videoUrl="jasdjadjsandjsa" description="jasjsajsdjasdjasd"></VideoFeed>

        {/* Participants' Video Feeds */}
      <Participants participants={dummyParticipants} />

        {/* Control Bar */}
        <ControlBar />
      </div>

       {/* Sidebar moved to the right side */}
       <SideBar participantsData={dummyParticipants} chatMessagesData={dummyChatMessages} />
    </div>
  );
}
