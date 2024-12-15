"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import SettingsPage from "./settings/page"; // Import the Settings modal
import { ScrollArea } from "@/components/ui/scroll-area"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const NavButton = ({
  isActive,
  href,
  children,
}: {
  isActive: boolean;
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href}>
      <Button
        className={isActive ? "bg-[#FDFDFD] text-[#240046]" : "text-[#fdfdfd]"}
        variant={isActive ? "secondary" : "ghost"}
      >
        {children}
      </Button>
    </Link>
  );
};

export const NavProfile = ({
  picture,
  user,
}: {
  picture?: string;
  user: string;
}) => {
  return (
    <Link href={"/profile"}>
      <div className="flex items-center w-fit h-full gap-3">
        <div
          className="bg-white w-8 h-8 rounded-full"
          style={{
            backgroundImage: `url(${picture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <span className="text-[#fdfdfd] font-bold">{user}</span>
      </div>
    </Link>
  );
};

export const NotificationFilter = ({children, isActive, onClick} : {onClick : () => void,children : string, isActive : boolean}) => {
  if (isActive){
    return <button onClick={onClick} className="bg-transparent text-sm font-bold border-b-red-200 border-b-2">{children}</button>
  } else {
    return <button onClick={onClick} className="bg-transparent text-sm">{children}</button>
  }
}


export const NotificationItem = ({Type, Title, Message, timestamp, isRead} : {Type : string, Title : string, Message : string, timestamp : string, isRead : boolean}) => {
  
  if(isRead){
    return (
      <div className="flex w-full h-20 items-center justify-between">
        <div className="flex w-full items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-bold">{Title}</span>
            <span className="text-sm">{Message}</span>
            <span className="text-xs">{timestamp}</span>
          </div>
        </div>

        <div className="flex items-center justify-center w-[10px] h-[10px] bg-[#240046] rounded-full p-2"></div>

      </div>
    )
  } else {
    return (
      <div className="flex w-full h-20 items-center justify-between">
        <div className="flex w-full items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
  
          <div className="flex flex-col">
            <span className="font-bold">{Title}</span>
            <span className="text-sm">{Message}</span>
            <span className="text-xs">{timestamp}</span>
          </div>
        </div>
  
      </div>
    )
  }

  

}

export const NotificationView = () => {
  const [view, setView] = useState("all");

  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-2xl">Notifications</span>

      <div className="flex w-full gap-4 ">
        <NotificationFilter onClick={() => setView("all")} isActive={view === "all"}>View all</NotificationFilter>
        <NotificationFilter onClick={() => setView("match")} isActive={view === "match"}>Match Request</NotificationFilter>
        <NotificationFilter onClick={() => setView("message")} isActive={view === "message"}>Message</NotificationFilter>
      </div> 

      <ScrollArea className="w-full h-96">
        <NotificationItem Type="Match" Title="Jake Bajo" Message="Wants to match with you!" timestamp="Just now" isRead={true}/>
      </ScrollArea>
    </div>
  );
}

export const Navbar = () => {
  const pathname = usePathname()
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  if (pathname === "/" || pathname === "/signup" || pathname === "/login" || pathname === "/signup/registration") return;

  return (
    <>
      <nav className="w-full h-16 p-8 items-center justify-between flex gap-6 bg-[#240046]">
        <div className="flex items-center gap-4">
          <span className="text-3xl text-[#FDFDFD] font-bold">TuonTa</span>

          {/* Navigation Links */}
          <div className="flex gap-2">
            <NavButton href="/home" isActive={pathname === "/home"}>
              Find match!
            </NavButton>
            <NavButton href="/sessions" isActive={pathname === "/sessions"}>
              Study Session
            </NavButton>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <NavProfile user="Jake Bajo" />
          
        <Popover>
          <PopoverTrigger><FontAwesomeIcon icon={faBell} className="text-white" /></PopoverTrigger>
          <PopoverContent className="w-80 flex flex-col gap-4">
            <NotificationView/>
            


          </PopoverContent>
        </Popover>
          <FontAwesomeIcon
            icon={faGear}
            className="text-white cursor-pointer"
            onClick={() => setShowSettingsModal(true)}
          />

        </div>
      </nav>

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsPage onClose={() => setShowSettingsModal(false)} />
      )}
    </>
  );
};
