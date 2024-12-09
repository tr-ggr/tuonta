"use client";

import { Button } from "@/components/ui/button";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

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

export const Navbar = () => {
  if (usePathname() === "/") return;
  return (
    <nav className="w-full h-16 p-8 items-center justify-between flex gap-6 bg-[#240046]">
      <div className="flex items-center gap-4">
        <span className="text-3xl text-[#FDFDFD] font-bold">TuonTa</span>

        {/* Navigation Links */}
        <div className="flex gap-2">
          <NavButton href="/home" isActive={usePathname() === "/home"}>
            Find match!
          </NavButton>
          <NavButton href="/sessions" isActive={usePathname() === "/sessions"}>
            Study Session
          </NavButton>
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
