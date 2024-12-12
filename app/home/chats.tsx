"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from 'swr'

type ChatItemProps = {
  chatId: number;
  senderId: number;
  message: string;
  timestamp: string;
};

type ChatProps = {
  id: number;
  user1Id: number;
  user2Id: number;
  createdAt: string;
  chatItems: ChatItemProps[];
};


const fetcher = async (url: string) => {
  const response = await fetch(url);
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.error("Response text:", text);
    throw error;
  }
};

const useUserName = (userId: number): { name: string; loading: boolean; error: any } => {
  const { data, error } = useSWR(`https://localhost:7113/api/profiles/${userId}`, fetcher);
  return {
    name: data ? data.username : '',
    loading: !data && !error,
    error
  };
};

export const ChatItem = ({ chatId, senderId, message, timestamp }: ChatItemProps) => {
  const { name, loading, error } = useUserName(senderId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load user name</div>;

  return (
    <Link href={`/home/chat/${chatId}`}>
      <div className="flex w-full h-16 bg-white items-center gap-4 rounded-lg p-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col">
            <span className="text-sm">{name}</span>
            <span className="text-xs">{message}</span>
            {/* <span className="text-xs">{new Date(timestamp).toLocaleString()}</span> */}
          </div>
        </div>
        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
      </div>
    </Link>
  );
};


export const Chats = () => {
  const { data, error } = useSWR('https://localhost:7113/api/chats/user_id/1', fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const chats: ChatProps[] = data;

  const latestChatItems = chats.map(chat => {
    const latestItem = chat.chatItems.reduce((latest, item) => {
      return new Date(item.timestamp) > new Date(latest.timestamp) ? item : latest;
    }, chat.chatItems[0]);

    

    return {
      chatId: chat.id, // Assuming chatId is user1Id, adjust if needed
      senderId: chat.user2Id,
      message: latestItem.message,
      timestamp: latestItem.timestamp
    };
  });

  return (
    <div className="flex flex-col gap-4">
      {latestChatItems.map((item: ChatItemProps) => (
        <ChatItem key={item.chatId} chatId={item.chatId} senderId={item.senderId} message={item.message} timestamp={item.timestamp} />
      ))}
    </div>
  );
};

export const MatchQueueItem = ({ id, username }: { id: number, username: string }) => {
  return (
    <Link href={`/home/chat/${id}`}>
      <div className="flex w-full h-16 bg-white items-center gap-4 rounded-lg p-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col">
            <span className="text-xs text-red-500">New Match</span>
            <span className="text-lg">{username}</span>
          </div>
        </div>
        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
      </div>
    </Link>
  );
};


export const MatchQueue = () => {
  return (
    <div className="flex flex-col gap-4">
      <MatchQueueItem id={1} username="Derrick Ginabot" />
      <MatchQueueItem id={2} username="Jane Doe" />
      <MatchQueueItem id={3} username="John Smith" />
      <MatchQueueItem id={4} username="Alice Johnson" />
      <MatchQueueItem id={5} username="Bob Brown" />
    </div>
  );
};

export const SideBar = () => {
  const [view, setView] = useState("chats");

  return (
    <div className="flex flex-col w-1/4 h-full bg-[#F2DFFD] p-6 gap-4">
      <div className="flex items-center justify-center rounded-full h-16 bg-white">
        <button
          className={`w-1/2 text-sm h-full rounded-full ${view === "chats" ? "bg-[#4530A7] text-white" : ""}`}
          onClick={() => setView("chats")}
        >
          Conversations
        </button>
        <button
          className={`w-1/2 text-sm h-full rounded-full ${view === "matchQueue" ? "bg-[#4530A7] text-white" : ""}`}
          onClick={() => setView("matchQueue")}
        >
          Match Queue
        </button>
      </div>
      {view === "chats" ? <Chats /> : <MatchQueue />}
    </div>
  );
};