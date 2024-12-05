import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { Featured, SmallView } from "./studyhome";

export default function Home() {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar></Sidebar>
      <div className="flex flex-col gap-4 p-4 w-3/4 overflow-y-auto [&>div]:flex-shrink-0 pb-32">
        <span className="font-bold text-2xl">FEATURED</span>
        <Featured></Featured>
        <span className="font-bold text-2xl">POPULAR NOW</span>
        <SmallView type="ungart"></SmallView>
        <span className="font-bold text-2xl">RISING</span>
        <SmallView type="ungart"></SmallView>
        <span className="font-bold text-2xl">RECENT</span>
        <SmallView type="ungart"></SmallView>
      </div>
    </div>
  );
}
