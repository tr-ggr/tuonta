"use client";

import { Button } from "@/components/ui/button";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const NavButton = ({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button
      onClick={onClick}
      className={isActive ? "bg-[#FDFDFD] text-[#240046]" : "text-[#fdfdfd]"}
      variant={isActive ? "secondary" : "ghost"}
    >
      {children}
    </Button>
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
  );
};

export const Navbar = () => {
  const [url, setUrl] = useState("/");

  return (
    <nav className="w-full h-16 p-8 items-center justify-between flex gap-6 bg-[#240046]">
      <div className="flex items-center gap-4">
        <span className="text-3xl text-[#FDFDFD] font-bold">TuonTa</span>

        {/* Navigation Links */}
        <div className="flex gap-2">
          <Link href="/">
            <NavButton isActive={url === "/"} onClick={() => setUrl("/")}>
              Find match!
            </NavButton>
          </Link>
          <Link href="/study_sessions">
            <NavButton
              isActive={url === "/study_sessions"}
              onClick={() => setUrl("/study_sessions")}
            >
              Study Session
            </NavButton>
          </Link>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <NavProfile user="Jake Bajo" />
        <FontAwesomeIcon icon={faBell} className="text-white" />
        <FontAwesomeIcon icon={faGear} className="text-white" />
      </div>
    </nav>
  );
};
