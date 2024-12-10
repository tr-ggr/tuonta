import SideBar from "./sidebar";
import { VideoFeed } from "./videofeed";
import { ControlBar } from "./controlbar";
import { Participants } from "./participants";

export default function VideoSessionLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
