"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface StudySession {
  id: number;
  sessionName: string;
  sessionCreator: string;
  participantCount: number;
  groupType: boolean;
}

export const SmallViewItem = ({
  id,
  title,
  creator,
  participants,
  groupType,
}: {
  id: number;
  title: string;
  creator: string;
  participants: number;
  groupType: boolean;
}) => {
  return (
    <Link href={`/video/${id}`}>
      <div className="flex h-fit w-[300px] flex-col gap-2 cursor-pointer">
        <div className="h-40 bg-slate-600"></div>
        <div className="flex justify-between gap-2">
          <span className="font-bold">{title}</span>
          <span className="text-xs">{participants} participants</span>
        </div>
        <div className="flex gap-2">
          <span className="text-xs bg-[#F2DFFD] px-2 py-1 rounded-full">
            {groupType ? "Public" : "Private"}
          </span>
          <span className="text-xs bg-[#F2DFFD] px-2 py-1 rounded-full">
            {creator}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const SmallView = ({ type }: { type: string }) => {
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);

  useEffect(() => {
    const fetchStudySessions = async () => {
      try {
        const response = await fetch('https://localhost:7113/api/videosessions');
        if (response.ok) {
          const data = await response.json();
          // Sort the study sessions by id in descending order
          const sortedData = data.sort((a: StudySession, b: StudySession) => b.id - a.id);
          setStudySessions(sortedData);
        } else {
          console.error('Failed to fetch study sessions');
        }
      } catch (error) {
        console.error('Error fetching study sessions:', error);
      }
    };

    fetchStudySessions();
  }, []);

  const getRandomParticipants = () => Math.floor(Math.random() * 15) + 1;

  return (
    <div className="flex gap-12 w-full p-4 overflow-x-auto [&>div]:flex-shrink-0">
      {studySessions.map((session) => (
        <SmallViewItem
          key={session.id}
          id={session.id}
          title={session.sessionName}
          creator={session.sessionCreator}
          participants={getRandomParticipants()}
          groupType={session.groupType}
        />
      ))}
    </div>
  );
};









export const FloatingButton = ({ type }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionTitle, setSessionTitle] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [coverImage, setCoverImage] = useState("/images/banner/b1.jpg");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCoverChange = (image: string) => {
    setCoverImage(image);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sessionData = {
      sessionName: sessionTitle,
      sessionCreator: 'creator-name', // Replace with the actual session creator's name
      participantCount: 0, // Initial participants count
      groupType: privacy == "public", // Convert to boolean
    };

    // Prepare to send data to the ASP.NET backend
    try {
      const response = await fetch('https://localhost:7113/api/videosessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      if (response.ok) {
        // Redirect to the layout page with the session details as query parameters
        const data = await response.json();
        console.log(data)
        window.location.href = `/video/${data}`;
      } else {
        console.error('Failed to create session');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const coverImages = [
    "/images/banner/b2.jpg",
    "/images/banner/b8.jpg",
    "/images/banner/b4.jpg",
    "/images/banner/b5.jpg",
    "/images/banner/b6.jpg",
    "/images/banner/b7.jpg",
  ];

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 bg-violet-600 text-white p-4 rounded-full shadow-lg hover:bg-violet-800 focus:outline-none"
      >
        + Create Study Session
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleModal} // Close modal when clicking outside
        >
          <div
            className="bg-white p-10 rounded-lg shadow-lg w-2/3 max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            {/* Change Study Session Cover */}
            <div className="w-full mb-6">
              <h2 className="text-xl font-bold mb-4">Create Study Session</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {coverImages.map((image, index) => (
                  <div
                    key={index}
                    className="cursor-pointer border-2 border-transparent hover:border-violet-600 rounded-md"
                    onClick={() => handleCoverChange(image)}
                  >
                    <img
                      src={image}
                      alt={`Cover ${index + 1}`}
                      className={`w-full h-20 object-cover rounded-md ${
                        coverImage === image ? "border-2 border-violet-600" : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
              {/* Display selected cover */}
              <div
                className="w-full h-56 bg-cover rounded-md"
                style={{
                  backgroundImage: `url(${coverImage})`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>

            {/* Left Side: Details and Privacy Section */}
            <div className="flex mb-6">
              {/* Left Side: Details Section */}
              <div className="w-full md:w-full pr-6">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold mb-4">Details</h2>
                  {/* Session Title */}
                  <input
                    type="text"
                    placeholder="Session Title"
                    value={sessionTitle}
                    onChange={(e) => setSessionTitle(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-md"
                  />

                  {/* Session Topic Dropdown */}
                  

                  {/* Privacy Section */}
                  <h2 className="text-xl font-bold mb-4">Privacy</h2>
                  <div className="mb-4">
                    <label className="mr-4">Private</label>
                    <input
                      type="radio"
                      name="privacy"
                      value="private"
                      checked={privacy === "private"}
                      onChange={() => setPrivacy("private")}
                      className="mr-2"
                    />
                    <label className="mr-4">Public</label>
                    <input
                      type="radio"
                      name="privacy"
                      value="public"
                      checked={privacy === "public"}
                      onChange={() => setPrivacy("public")}
                      className="mr-2"
                    />
                  </div>

                  {/* Create Session Button */}
                  <button
                    type="submit"
                    className="w-full p-3 bg-violet-600 hover:bg-violet-900 text-white rounded-md text-center"
                  >
                    Create Study Session
                  </button>
                </form>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-600 font-bold"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};