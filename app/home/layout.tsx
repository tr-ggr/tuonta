import type { Metadata } from "next";

import localFont from "next/font/local";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import { SideBar } from "./chats"


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (

  <div className = "flex flex-grow">

    <SideBar></SideBar>
    <section className = "w-full h-full">{children}</section>
  </div>);
}
