"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from 'swr'

import { CurrentUser } from "./page"; 
import { get } from "http";

type ChatItemProps = {
  chatId: number;
  user1Id: number;
  user2Id: number;
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

function getMatches(){
  const { data, error } = useSWR(`https://localhost:7113/api/match/matches/${CurrentUser.id}`, fetcher);
  return {
    data: data ? data : '',
    loading: !data && !error,
    error
  };
};

function getUsersOfMatch(matchId: number){
  const { data, error } = useSWR(`https://localhost:7113/api/match/users/${matchId}`, fetcher);
  return {
    data: data ? data : '',
    loading: !data && !error,
    error
  };
}

export const ChatItem = ({ chatId, user1Id, user2Id, message, timestamp }: ChatItemProps) => {
  const { name, loading, error } = useUserName(Number(CurrentUser.id) == user1Id ? user2Id : user1Id);

  // console.log(user2Id)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load user name</div>;

  return (
    <Link href={`/home/chat/${chatId}`}>
      <div className="flex w-full h-16 bg-white items-center gap-4 rounded-lg p-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col">
            <span className="text-sm">{name}</span>
            <span className="text-xs w-[100px] truncate">{message}</span>
            {/* <span className="text-xs">{new Date(timestamp).toLocaleString()}</span> */}
          </div>
        </div>
        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
      </div>
    </Link>
  );
};


export const Chats = () => {
  const { data, error } = useSWR(`https://localhost:7113/api/chats/user_id/${CurrentUser.id}`, fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const chats: ChatProps[] = data;

  const latestChatItems = chats.map(chat => {
    const latestItem = chat.chatItems.reduce((latest, item) => {
      return new Date(item.timestamp) > new Date(latest.timestamp) ? item : latest;
    }, chat.chatItems[0]);

    

    return {
      chatId: chat.id, 
      user1Id: chat.user1Id,
      user2Id: chat.user2Id,
      message: latestItem.message,
      timestamp: latestItem.timestamp
    };
  });

  return (
    <div className="flex flex-col gap-4">
      {latestChatItems.map((item: ChatItemProps) => (
        <ChatItem key={item.chatId} chatId={item.chatId} user1Id={item.user1Id} user2Id={item.user2Id} message={item.message} timestamp={item.timestamp} />
      ))}
    </div>
  );
};

export const MatchQueueItem = ({ id, username }: { id: number, username: string }) => {
  return (
    <Link href={`/home/chat/new/${id}`}>
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
  const { data: matches, error: matchesError } = useSWR(`https://localhost:7113/api/match/matches/${CurrentUser.id}`, fetcher);
  const [matchQueueItems, setMatchQueueItems] = useState<{ id: number, username: string }[]>([]);

  console.log(matches)
  useEffect(() => {
    const fetchMatchQueueItems = async () => {
      if (matches) {
        const activeMatches = matches.filter((match: any) => match.isActive);
        const items = await Promise.all(activeMatches.map(async (match: any) => {
          const users = await fetcher(`https://localhost:7113/api/match/users/${match.id}`);
          const otherUser = users.find((user: any) => user.id !== Number(CurrentUser.id));
          return { id: match.id, username: otherUser.username };
        }));
        setMatchQueueItems(items);
      }
    };

    fetchMatchQueueItems();
  }, [matches]);

  if (matchesError) return <div>Error loading matches</div>;
  if (!matches) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      {matchQueueItems.map((item) => (
        <MatchQueueItem key={item.id} id={item.id} username={item.username} />
      ))}
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