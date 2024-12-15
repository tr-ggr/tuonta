"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faComments, faEllipsisV } from "@fortawesome/free-solid-svg-icons";


interface Participant {
  id: string;
  name: string;
  videoUrl?: string;
  role?: string;
}

interface ChatMessage {
  id: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
}

interface SideBarProps {
  participantsData: Participant[];
  chatMessagesData: ChatMessage[];
}

export default function SideBar({ participantsData, chatMessagesData }: SideBarProps) {
  const [activeTab, setActiveTab] = useState("chat");
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const [participants, setParticipants] = useState<Participant[]>(participantsData || []);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(chatMessagesData || []);

  // Function to toggle dropdown visibility
  const toggleDropdown = (id: string) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  // Function to fetch participants from the backend (example API)
  const fetchParticipants = async () => {
    try {
      const response = await fetch("/api/participants");
      const data = await response.json();
      setParticipants(data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  // Function to fetch chat messages from the backend (example API)
  const fetchChatMessages = async () => {
    try {
      const response = await fetch("/api/chat-messages");
      const data = await response.json();
      setChatMessages(data);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    fetchParticipants();
    fetchChatMessages();
  }, []); // Fetch data once on component mount

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
            {chatMessages.map((message) => (
              <div key={message.id} className="bg-white p-2 rounded-lg flex items-center space-x-4">
                <img
                  src={message.senderAvatar || "https://via.placeholder.com/100"} // Dynamic profile image
                  alt={message.senderName}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{message.senderName}</span>
                  <span className="text-sm">{message.content}</span>
                </div>
              </div>
            ))}
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
                  src={participant.videoUrl || "https://via.placeholder.com/100"}
                  alt={participant.name}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div className="flex flex-col flex-grow">
                  <span className="text-sm font-semibold">{participant.name}</span>
                  <span className="text-xs text-gray-400">{participant.role}</span>
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