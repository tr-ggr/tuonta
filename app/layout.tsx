import type { Metadata } from "next";

import "./globals.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGear } from "@fortawesome/free-solid-svg-icons";

import { Navbar } from "./navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col w-screen h-screen">
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
