import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import localFont from "next/font/local";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGear } from "@fortawesome/free-solid-svg-icons";

export const NavButton = ({ isActive, value, children }: any) => {
  if (isActive) {
    return (
      <Button className="bg-[#FDFDFD] text-[#240046]" variant="secondary">
        {children}
      </Button>
    );
  } else {
    return (
      <Button className="text-[#fdfdfd]" variant="ghost">
        {children}
      </Button>
    );
  }
};

export const NavProfile = ({ picture, children, user }: any) => {
  return (
    <div className="flex items-center w-fit h-full gap-3">
      <div
        className="bg-white w-8 h-8 rounded-full"
        style={{ backgroundImage: picture }}
      ></div>

      <span className="text-[#fdfdfd] font-bold">{user}</span>
    </div>
  );
};

export const NavInfo = ({ children }: any) => {
  return (
    <div className="flex items-center gap-2">
      <div className=""></div>
      {children}
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="w-full h-16 p-8 items-center justify-between flex gap-6   bg-[#240046] ">
          <div className="flex items-center gap-4">
            <span className="text-3xl text-[#FDFDFD] font-bold">TuonTa</span>
            {/* navigation links */}
            <div className="flex gap-2">
              <NavButton isActive="true">Find match!</NavButton>
              <NavButton>Study Session</NavButton>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <NavProfile user="Jake Bajo" />
            <FontAwesomeIcon icon={faBell} className="text-white" />
            <FontAwesomeIcon icon={faGear} className="text-white" />
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
