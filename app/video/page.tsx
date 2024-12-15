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

 
};

export default VideoPage;
