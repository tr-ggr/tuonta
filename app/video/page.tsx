"use client";

import React, { useState } from "react";

const VideoPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [participants, setParticipants] = useState(["Alice", "Bob", "Charlie"]);
  const [isSharingScreen, setIsSharingScreen] = useState(true);
  const [screenSharer, setScreenSharer] = useState("Alice");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-gray-200 text-black p-4">
        <h1 className="text-lg font-bold">Study Session</h1>
        <div>
          <button className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600">
            End Session
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Main Screen (Screen Sharing or Placeholder) */}
        <div className="flex-grow bg-gray-200 p-4 flex flex-col justify-center items-center relative">
          {isSharingScreen ? (
            <div className="bg-gray-700 w-full h-full rounded-lg flex items-center justify-center text-white text-lg font-bold">
              <img
                src="/images/videofeed.jpg"
                alt={`Sharing Screen: ${screenSharer}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="bg-gray-500 w-full h-full rounded-lg flex items-center justify-center text-white text-lg font-bold">
              <p>No Screen is Being Shared</p>
            </div>
          )}
        </div>

        {/* Video Grid */}
        <div className="w-80 bg-gray-500 p-4 grid grid-cols-1 gap-4 rounded-lg mr-4">
          {/* Mock Video Feeds */}
          {participants.map((participant, index) => (
            <div
              key={index}
              className="bg-gray-300 rounded-lg h-20 flex items-center justify-center text-gray-900"
            >
              {participant}
            </div>
          ))}
        </div>

        {/* Chat Panel */}
        {isChatOpen && (
          <div className="w-80 bg-gray-800 text-white p-4 flex flex-col">
            <h2 className="text-lg font-bold mb-4">Chat</h2>
            <div className="flex-grow overflow-y-auto bg-gray-700 p-2 rounded-lg mb-4">
              {/* Mock Chat Messages */}
              <p className="mb-2">
                <strong>Alice:</strong> Hi, everyone!
              </p>
              <p className="mb-2">
                <strong>Bob:</strong> Ready to discuss chapter 4?
              </p>
            </div>
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 bg-gray-700 rounded-md focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="flex justify-center items-center bg-gray-200 text-white p-4">
        <button className="mx-2 p-2 bg-gray-700 rounded-full hover:bg-gray-600">
          🎥 Camera
        </button>
        <button className="mx-2 p-2 bg-gray-700 rounded-full hover:bg-gray-600">
          🎤 Mute
        </button>
        <button
          className="mx-2 p-2 bg-gray-700 rounded-full hover:bg-gray-600"
          onClick={() => setIsSharingScreen(!isSharingScreen)}
        >
          🖥 {isSharingScreen ? "Stop Sharing" : "Share Screen"}
        </button>
        <button
          onClick={toggleChat}
          className="mx-2 p-2 bg-gray-700 rounded-full hover:bg-gray-600"
        >
          💬 Chat
        </button>
      </div>
    </div>
  );
};

export default VideoPage;
