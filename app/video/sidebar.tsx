"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faComments, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  const [activeTab, setActiveTab] = useState("chat");
  const [dropdownVisible, setDropdownVisible] = useState(null);

  // Sample participants list (replace with dynamic data)
  const participants = [
    { id: 1, name: "John Doe", status: "online", videoUrl: "https://via.placeholder.com/100" },
    { id: 2, name: "Jane Smith", status: "offline", videoUrl: "https://via.placeholder.com/100" },
    { id: 3, name: "Sam Wilson", status: "online", videoUrl: "https://via.placeholder.com/100" },
    // Add more participants as needed
  ];

  // Function to toggle dropdown visibility
  const toggleDropdown = (id) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  return (
    <div className="w-1/4 h-full flex flex-col bg-[#F2DFFD]">
      {/* Sidebar with Tabs */}
      <div className="p-4">
        {/* Button Toggle Container */}
        <div className="flex items-center justify-center rounded-full h-16 bg-white">
          <button
            className={`w-1/2 text-sm h-full rounded-full ${
              activeTab === "chat" ? "bg-[#4530A7] text-white" : ""
            }`}
            onClick={() => setActiveTab("chat")}
          >
            <FontAwesomeIcon icon={faComments} className="mr-2" />
            Chats
          </button>
          <button
            className={`w-1/2 text-sm h-full rounded-full ${
              activeTab === "participants" ? "bg-[#4530A7] text-white" : ""
            }`}
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
            <div className="bg-white p-2 rounded-lg flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/100" // User's profile image
                alt="John Doe"
                className="w-12 h-12 object-cover rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">John Doe</span>
                <span className="text-sm">Hello everyone!</span>
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/100" // User's profile image
                alt="Jane Smith"
                className="w-12 h-12 object-cover rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Jane Smith</span>
                <span className="text-sm">Hi John!</span>
              </div>
            </div>
            {/* Add more chat messages here */}
          </div>

          {/* Chat Input */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              placeholder="Type a message"
              className="w-full p-2 bg-gray-white rounded-lg text-white placeholder-gray-400"
            />
            <button className="ml-2 text-white bg-[#4530A7] p-2 rounded-lg">Send</button>
          </div>
        </div>
      )}

      {activeTab === "participants" && (
        <div className="text-black p-4 flex-grow overflow-y-auto">
          {/* Participants List */}
          <div className="space-y-4">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center space-x-4">
                <img
                  src={participant.videoUrl}
                  alt={participant.name}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div className="flex flex-col flex-grow">
                  <span className="text-sm font-semibold">{participant.name}</span>
                  <span className="text-xs text-gray-400">{participant.status}</span>
                </div>
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(participant.id)}
                    className="text-gray-500"
                  >
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                  {dropdownVisible === participant.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <ul className="py-1">
                        {/* Normal member options */}
                        <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          Request Match
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
