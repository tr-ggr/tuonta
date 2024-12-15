import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { SmallView } from "./studyhome";
import { FloatingButton } from "./studyhome";

export default function Home() {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar></Sidebar>
      <div className="flex flex-col gap-4 p-4 w-3/4 overflow-y-auto [&>div]:flex-shrink-0 pb-32">
        <span className="font-bold text-2xl">RECENT</span>
        <SmallView type="ungart"></SmallView>
      </div>
      <FloatingButton type="ungart"> </FloatingButton>
    </div>
  );
}
