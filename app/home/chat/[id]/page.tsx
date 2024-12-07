"use client"

import { faCircleXmark,faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

export const ProfileTagItem = ({children} : any) => {
    const colors = ["bg-red-300", "bg-blue-300", "bg-green-300", "bg-yellow-300", "bg-purple-300", "bg-pink-300", "bg-indigo-300", "bg-gray-300"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    return (
        <span className={`text-xs ${randomColor} rounded-full font-bold p-2`}>{children}</span>
    );
}

export const ProfileTags = () => {
    return (
        <div className = "flex flex-col gap-2">
            <div className = "flex gap-2">
                <ProfileTagItem>Mathematics</ProfileTagItem>
                <ProfileTagItem>Algebra</ProfileTagItem>
            </div>
        </div>
    )
}

export const ProfileOverview = () => {
    return (
        <div className = "w-1/2 h-full p-2 flex flex-col gap-4 border-l-2">
            <div className = "w-full h-1/2 bg-gray-300 rounded-lg"></div>
            <div className = "flex flex-col gap-1">
                <span className = "text-2xl font-bold">Derrick</span>
                <span className = "text-md">Cebu Institute of Technology</span>
                <span className = "text-xs text-gray-500">BS Criminology, Major in Forensics</span>

            </div>

            <ProfileTags></ProfileTags>

            <div className = "flex-wrap break-all">
                <span className = "text-gray-500 text-sm font-light ">habsdhasbdnhsandhadsmjasmaskdnasdsjkasdkasmdksaadnsajdnasjdnsajdndsjad</span>
            </div>


        </div>
    )
}

export const LeftChat = ({children} : any) => {
    return ( <div className="w-full h-12">
        <div className = "flex p-4 items-center w-fit h-9 bg-[#F2DFFD] rounded-full">{children}</div>
    </div>)

}

export const RightChat = ({children} : any) => {
    return ( <div className="w-full h-12 flex justify-end">
        <div className = "flex p-4 items-center w-fit h-9 bg-[#C8B6FF] rounded-full">{children}</div>
    </div>)

}

export default async function ChatPage({ params }: any) {
    return (
        <div className = "flex w-full h-full max-h-full">
            {/* Chat Page */}
            <div className = "flex flex-col w-full h-full max-h-full">
                <div className = "p-4 flex items-center w-full justify-between h-24 border-b-2">
                    <span>Derrick Binangbang</span>
                    <Link href="/home"><FontAwesomeIcon icon={faCircleXmark} /></Link>
                </div>

                <div className = "flex flex-col flex-grow gap-4 p-4 h-1 w-full overflow-y-auto">
                    <LeftChat>Hi</LeftChat>
                    <RightChat>Hi</RightChat>
                   
                </div>

                <div className = "p-2 flex gap-2 items-center justify-between h-12 bg-[#4530A7]">
                    <input type="text" placeholder="Type a message" className = "flex-grow h-full bg-white text-[#1A1A1A] rounded-full p-2"/>
                    <FontAwesomeIcon className="text-white" icon={faPaperPlane} />
                </div>
            </div>

            

            {/* Profile Overview */}
            <ProfileOverview></ProfileOverview>
        </div>
    )
}