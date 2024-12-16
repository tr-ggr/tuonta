"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../sidebar';
import { VideoFeed } from '../videofeed';
import { ControlBar } from '../controlbar';
import { Participants } from '../participants';

interface VideoSessionLayoutProps {
  id: number;
  sessionName: string;
  sessionCreator: string;
  participantCount: number;
  groupType: boolean;
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateDummyParticipants = () => {
  const participantNames = ['Wewe', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'];
  const imageUrls = [
    '/images/zak.gif',
    '/images/laine.gif',
    '/images/wewe.gif',
    '/images/rand.gif',
  ];
  const participantCount = Math.floor(Math.random() * 4) + 1; // Generate between 1 and 4 participants
  const participants = [];

  for (let i = 0; i < participantCount; i++) {
    participants.push({
      id: (i + 1).toString(),
      userId: `u${i + 1}`,
      name: participantNames[i % participantNames.length],
      imageUrl: imageUrls[i % imageUrls.length], // Assign an image URL in a round-robin fashion
    });
  }

  return { participants: shuffleArray(participants), participantCount };
};

const dummyChatMessages = [
  { id: '1', senderName: 'Wewe', content: 'Hello everyone!' },
  { id: '2', senderName: 'Tristan', content: 'Hi Wewe!' },
  { id: '3', senderName: 'Laine', content: 'Good morning!' },
  { id: '4', senderName: 'Zak', content: 'How are you all?' },
  { id: '5', senderName: 'Wewe', content: 'I am fine, thank you!' },
];

export default function VideoSessionLayout() {
  const sessionId = useParams().id;
  const [sessionDetails, setSessionDetails] = useState<VideoSessionLayoutProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7113/api/videosessions/${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          setSessionDetails(data);
        } else {
          setError('Failed to fetch session details');
        }
      } catch (error) {
        setError('Error fetching session details');
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!sessionDetails) {
    return <div>Loading...</div>;
  }

  const { participants: dummyParticipants, participantCount } = generateDummyParticipants();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Title Card */}
        <div className="bg-white text-gray-700 px-6 py-4 flex justify-between items-center">
          {/* Left Side: Session Name and Privacy */}
          <div>
            <h1 className="text-xl font-semibold">{`Study Session: ${sessionDetails.sessionName}`}</h1>
            <p className="text-sm flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full ${
                  sessionDetails.groupType ? 'bg-[#4530A7]' : 'bg-gray-500'
                } text-white border border-[#4530A7] text-xs`}
              >
                {sessionDetails.groupType ? 'Public' : 'Private'} {/* Display group type */}
              </span>
            </p>
          </div>

          {/* Right Side: Room Creator and Participants */}
          <div className="text-right">
            <p className="text-sm">
              <span className="font-semibold">Room Creator:</span> {sessionDetails.sessionCreator}
            </p>
            <p className="text-sm flex items-center justify-end space-x-2">
              <FontAwesomeIcon icon={faUsers} className="text-[#4530A7]" />
              <span>
                <span className="font-semibold">Participants:</span> {participantCount}
              </span>
            </p>
          </div>
        </div>

        {/* Main Video Feed */}
        <VideoFeed videoUrl="/images/itan.gif" description="You" />

        {/* Participants' Video Feeds */}
        <div className="flex justify-center items-center">
          <Participants participants={dummyParticipants} />
        </div>

        {/* Control Bar */}
        <ControlBar />
      </div>

      {/* Sidebar moved to the right side */}
      <SideBar participantsData={dummyParticipants} chatMessagesData={dummyChatMessages} />
    </div>
  );
}