"use client"
import useSWR from 'swr'
import { faCircleXmark,faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from 'next/navigation'
import { useState, useMemo, useOptimistic, useEffect, useRef, use } from "react";

import { CurrentUser } from "@/app/home/page"
import { NextRouter, useRouter } from 'next/router'
import {ScrollArea} from "@/components/ui/scroll-area"
import { redirect } from 'next/navigation'
import Link from "next/link";

type NotificationItemProps = {
    id: number;
    userId: number;
    title: string;
    message: string;
    isRead: boolean;
    type: string;
    referenceId: string;
    dateCreated: string;
};


type ProfileProps = {
    username: string;
    email: string;
    birthday: string;
    gender: string;
    bio: string;
    school: string;
    course: string;
    distance: number;
    hobbies: string[];
  };    

type ChatProps = {
    id: number;
    user1Id: number;
    user2Id: number;
    createdAt: string;
    chatItems: ChatItemProps[];
};

type ChatItemProps = {
    chatId: number;
    senderId: number;
    message: string;
    timestamp: string;
};

const fetcher = (e : string) => fetch(e).then(res => res.json())

function getProfile(id: any){
    const { data, error } = useSWR(`https://localhost:7113/api/profiles/${id}`, fetcher);
    return {
      data: data ? data : '',
      loading: !data && !error,
      error
    };
};

function getUsersOfMatch(matchId: number) {
  const { data, error } = useSWR(`https://localhost:7113/api/match/users/${matchId}`, fetcher);

  return {
    data: data ? data.filter((user: any) => user.id != Number(CurrentUser.id)) : [],
    loading: !data && !error,
    error
  };
}

function getChat(id: any){
    const { data, error } = useSWR(`https://localhost:7113/api/chats/${id}`, fetcher);
    return {
      data: data ? data : '',
      loading: !data && !error,
      error
    };
}

const createNotification = async (notification: { userId: number; title: string; message: string, referenceId : string }) => {
    const payload = {
      userId: notification.userId,
      title: notification.title,
      message: notification.message,
      isRead: false,
      type: "chat",
      referenceId: notification.referenceId, // Adjust as needed
      dateCreated: new Date().toISOString()
    };
  
    try {
      const response = await fetch('https://localhost:7113/api/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Notification created:', data);
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };


function getChatProfile(id: any){
    var {data, loading, error } = getChat(id)
    var {data, loading, error } = getProfile(Number(CurrentUser.id) == data.user1Id ? data.user2Id : data.user1Id)


    return {
      data: data ? data : '',
      loading: !data && !error,
      error
    };
};



export const ProfileTagItem = ({children} : any) => {
    const colors = ["bg-red-300", "bg-blue-300", "bg-green-300", "bg-yellow-300", "bg-purple-300", "bg-pink-300", "bg-indigo-300", "bg-gray-300"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    return (
        <span className={`text-xs ${randomColor} rounded-full font-bold p-2`}>{children}</span>
    );
}

export const ProfileTags = (data : any) => {
    const tags: string[] = data.tags

    if (!tags) {
        return null; // or you can return a fallback UI
    }

    return (
        <div className = "flex flex-col gap-2">
            <div className = "flex gap-2">

                 {tags.map((hobby : string, index : number) => (
                <ProfileTagItem key={index}>{hobby}</ProfileTagItem>
                ))}
            </div>
        </div>
    )
}

export const ProfileOverview = () => {
    const {data, loading, error } = getUsersOfMatch(Number(useParams().id));
    const user = data[0]

    if (loading) {
      return <div>Loading data...</div>
    }

    return (
        <div className = "w-1/2 h-full p-2 flex flex-col gap-4 border-l-2">
            <div className = "w-full h-1/2 bg-gray-300 rounded-lg"></div>
            <div className = "flex flex-col gap-1">
                <span className = "text-2xl font-bold">{user.username}</span>
                <span className = "text-md">{user.school}</span>
                <span className = "text-xs text-gray-500">{user.course}</span>

            </div>

            <ProfileTags tags={user.hobbies}></ProfileTags>

            <div className = "flex-wrap break-all">
                <span className = "text-gray-500 text-sm font-light ">{user.bio}</span>
            </div>

        </div>
    )
}

export const LeftChat = ({children} : any) => {
    return ( <div className="w-full h-12">
        <div className = "flex py-2 px-4 items-center w-fit max-w-[500px] h-fit bg-[#F2DFFD] rounded-lg break-all">{children}</div>
    </div>)

}

export const RightChat = ({children} : any) => {
    return ( <div className="w-full h-12 flex justify-end">
        <div className = "flex py-2 px-4 items-center w-fit max-w-[500px] h-fit bg-[#C8B6FF] rounded-lg break-all">{children}</div>
    </div>)
}

export const ChatArea = () => {
    return (
        <div className="flex flex-col-reverse flex-grow gap-4 items-center p-4 w-full h-full text-lg">
            DONT FORGET TO SAY HI TO EACH OTHER!
        </div>
    );
};

const SendNewChatButton = ({ chatId, message }: { chatId: string, message: string }) => {
  const handleSendChat = async () => {
    
    const payload = {
      senderId: Number(CurrentUser.id),
      message: message,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(`https://localhost:7113/api/match/update/${chatId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      window.location.href = `/home/chat/${data.id}`;
    } catch (error) {
      console.error('Error:', error);
    }

    
  };

  

  return (
    <button onClick={handleSendChat} className=" text-white p-2 rounded">
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  );
};



export default function ChatPage() {
    const {data, loading, error } = getUsersOfMatch(Number(useParams().id))
    console.log(data)
    const user = data[0]
    const [message, setMessage] = useState("");

    if (loading) {
      return <div>Loading data...</div>
    }

    return (
        <div className = "flex w-full h-full max-h-full">
            {/* Chat Page */}
            <div className = "flex flex-col w-full h-full max-h-full">
                <div className = "p-4 flex items-center w-full justify-between h-24 border-b-2">
                    <span>HAHAHAH</span>
                    <Link href="/home"><FontAwesomeIcon icon={faCircleXmark} /></Link>
                </div>

                <ChatArea/>

                <div className = "p-2 flex gap-2 items-center justify-between h-12 bg-[#4530A7]">
                    <input type="text" onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" className = "flex-grow h-full bg-white text-[#1A1A1A] rounded-full p-2"/>
                    <SendNewChatButton chatId={String(useParams().id)} message={message} />
                </div>
            </div>

            

            {/* Profile Overview */}
            <ProfileOverview></ProfileOverview> 
        </div>
    )
}