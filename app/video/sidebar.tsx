"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faComments } from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  const [activeTab, setActiveTab] = useState("chat");

  // Sample participants list (replace with dynamic data)
  const participants = [
    { id: 1, name: "John Doe", status: "online", videoUrl: "https://via.placeholder.com/100" },
    { id: 2, name: "Jane Smith", status: "offline", videoUrl: "https://via.placeholder.com/100" },
    { id: 3, name: "Sam Wilson", status: "online", videoUrl: "https://via.placeholder.com/100" },
    // Add more participants as needed
  ];

  return (
    <div className="w-1/4 h-full flex flex-col bg-white">
      {/* Sidebar with Tabs */}
      <div className="p-4">
        {/* Button Toggle Container */}
        <div className="flex items-center justify-center rounded-full h-16 bg-gray-100">
          <button
            className={`w-1/2 text-sm h-full rounded-full ${activeTab === "chat" ? "bg-[#4530A7] text-white" : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            <FontAwesomeIcon icon={faComments} className="mr-2" />
            Chats
          </button>
          <button
            className={`w-1/2 text-sm h-full rounded-full ${activeTab === "participants" ? "bg-[#4530A7] text-white" : ""}`}
            onClick={() => setActiveTab("participants")}
          >
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Participants
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "chat" && (
        <div className="text-black p-4 flex flex-col justify-between h-full">
          {/* Chat Box */}
          <div className="space-y-4 flex-grow overflow-y-auto">
            <div className="bg-gray-200 p-2 rounded-lg">
              <span className="text-sm">John Doe: Hello everyone!</span>
            </div>
            <div className="bg-gray-200 p-2 rounded-lg">
              <span className="text-sm">Jane Smith: Hi John!</span>
            </div>
            {/* Add more chat messages here */}
          </div>

          {/* Chat Input */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              placeholder="Type a message"
              className="w-full p-2 bg-gray-700 rounded-lg text-white placeholder-gray-400"
            />
            <button className="ml-2 text-white bg-[#4530A7] p-2 rounded-lg">Send</button>
          </div>
        </div>
      )}

      {activeTab === "participants" && (
        <div className="text-white p-4 flex-grow overflow-y-auto">
          {/* Participants List */}
          <div className="space-y-4">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center space-x-4">
                <img
                  src={participant.videoUrl}
                  alt={participant.name}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm">{participant.name}</span>
                  <span className="text-xs text-gray-400">{participant.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
