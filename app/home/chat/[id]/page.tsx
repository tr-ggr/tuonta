"use client"
import useSWR from 'swr'
import { faCircleXmark,faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from 'next/navigation'
import { useState, useMemo, useOptimistic } from "react";

import { CurrentUser } from "@/app/home/page"

import Link from "next/link";

import { io } from 'socket.io-client';


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
    // console.log(data)
    return {
      data: data ? data : '',
      loading: !data && !error,
      error
    };
};

function getChat(id: any){
    const { data, error } = useSWR(`https://localhost:7113/api/chats/${id}`, fetcher);
    return {
      data: data ? data : '',
      loading: !data && !error,
      error
    };
}


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
    const userData = getChatProfile(useParams().id).data

    // console.log(userData)

    return (
        <div className = "w-1/2 h-full p-2 flex flex-col gap-4 border-l-2">
            <div className = "w-full h-1/2 bg-gray-300 rounded-lg"></div>
            <div className = "flex flex-col gap-1">
                <span className = "text-2xl font-bold">{userData.username}</span>
                <span className = "text-md">{userData.school}</span>
                <span className = "text-xs text-gray-500">{userData.course}</span>

            </div>

            <ProfileTags tags={userData.hobbies}></ProfileTags>

            <div className = "flex-wrap break-all">
                <span className = "text-gray-500 text-sm font-light ">{userData.bio}</span>
            </div>


        </div>
    )
}

export const LeftChat = ({children} : any) => {
    return ( <div className="w-full h-12">
        <div className = "flex p-4 items-center w-fit h-9 bg-[#F2DFFD] rounded-full truncate">{children}</div>
    </div>)

}

export const RightChat = ({children} : any) => {
    return ( <div className="w-full h-12 flex justify-end">
        <div className = "flex p-4 items-center w-fit h-9 bg-[#C8B6FF] rounded-full truncate">{children}</div>
    </div>)

}

export const ChatArea = () => {
    const { data, loading, error } = getChat(useParams().id);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const senderId = CurrentUser.id;

    console.log(data)

    return (
        <div className="flex flex-col flex-grow gap-4 p-4 h-1 w-full overflow-y-auto">
            {data.chatItems.map((message: any, index: number) => (
                message.senderId != senderId ? (
                    <LeftChat key={index}>{message.message}</LeftChat>
                ) : (
                    <RightChat key={index}>{message.message}</RightChat>
                )
            ))}
        </div>
    );
};

export const SendChatButton = ({ chatId, message }: { chatId: any, message: string }) => {
    const handleSendChat = async () => {
      const payload = {
        chatId: chatId,
        senderId: CurrentUser.id, // Assuming senderId is 1
        message: message,
        timestamp: new Date().toISOString()
      };
  
      try {
        const response = await fetch('https://localhost:7113/api/chats/items', {
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
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <button onClick={handleSendChat}>
        <FontAwesomeIcon className="text-white" icon={faPaperPlane} />
      </button>
    );
  }; 




export default function ChatPage() {
    const {data, loading, error } = getChatProfile(useParams().id)
    const [message, setMessage] = useState("");

    const socket = useMemo(()=>io("http://localhost:4000"), [])

    return (
        <div className = "flex w-full h-full max-h-full">
            {/* Chat Page */}
            <div className = "flex flex-col w-full h-full max-h-full">
                <div className = "p-4 flex items-center w-full justify-between h-24 border-b-2">
                    <span>{data.username}</span>
                    <Link href="/home"><FontAwesomeIcon icon={faCircleXmark} /></Link>
                </div>

                <ChatArea/>

                <div className = "p-2 flex gap-2 items-center justify-between h-12 bg-[#4530A7]">
                    <input type="text" onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" className = "flex-grow h-full bg-white text-[#1A1A1A] rounded-full p-2"/>
                    <SendChatButton chatId={useParams().id} message={message} />
                </div>
            </div>

            

            {/* Profile Overview */}
            <ProfileOverview></ProfileOverview>
        </div>
    )
}