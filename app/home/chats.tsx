"use client";
import Link from "next/link";
import { useState } from "react";

export const ChatItem = ({ id }: { id: number }) => {
  return (
    <Link href={`/home/chat/${id}`}>
      <div className="flex w-full h-16 bg-white items-center gap-4 rounded-lg p-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col">
            <span className="text-sm">Username</span>
            <span className="text-xs">Last message</span>
          </div>
        </div>
        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
      </div>
    </Link>
  );
};

export const MatchQueueItem = ({ id }: { id: number }) => {
  return (
    <Link href={`/home/chat/${id}`}>
      <div className="flex w-full h-16 bg-white items-center gap-4 rounded-lg p-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col">
            <span className="text-xs text-red-500">New Match</span>
            <span className="text-lg">Derrick Ginabot</span>
          </div>
        </div>
        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
      </div>
    </Link>
  );
};

export const Chats = () => {
  return (
    <div className="flex flex-col gap-4">
      <ChatItem id={1}></ChatItem>
      <ChatItem id={2}></ChatItem>
      <ChatItem id={3}></ChatItem>
      <ChatItem id={4}></ChatItem>
      <ChatItem id={5}></ChatItem>
    </div>
  );
};

export const MatchQueue = () => {
  return (
    <div className="flex flex-col gap-4">
      <MatchQueueItem id={1}></MatchQueueItem>
      <MatchQueueItem id={2}></MatchQueueItem>
      <MatchQueueItem id={3}></MatchQueueItem>
      <MatchQueueItem id={4}></MatchQueueItem>
      <MatchQueueItem id={5}></MatchQueueItem>
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