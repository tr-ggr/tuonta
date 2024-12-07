"use client";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faX } from "@fortawesome/free-solid-svg-icons";
import { ProfileTags } from"./chat/[id]/page";

export const ControlButton = ({icon} : {icon : any}) => {
    return (
        <motion.button whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }} className="w-16 h-16 flex items-center justify-center rounded-3xl bg-[#D9D9D9]">
            <FontAwesomeIcon  icon={icon} />
        </motion.button>
    )
}

export const MatchCard = () => {
  return(
  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 w-1/2 flex flex-col items-center bg-cyan-700 rounded-3xl h-5/6"> 
        <div className="w-full h-4/6 bg-transparent"></div>
        <div className="w-full gap-2 h-2/6 bg-[#4530A7] rounded-3xl flex flex-col p-4">
          <span className="font-bold text-3xl text-white">Derrick</span>
          <span className="font-bold text-lg text-white">Cebu Institute of Technology - University</span>
          <span className=" text-white">BS Criminology, Major in Forensics</span>
          <ProfileTags></ProfileTags>
        </div>
      </motion.div>
  )
}



export default function ChatPage() {
  return (
    <div className="w-full justify-between h-full flex flex-col items-center">
      <MatchCard></MatchCard>

      <div className = "flex justify-around items-center w-1/3 h-24 bg-[#4530A7] rounded-t-3xl">
        <ControlButton icon={faX}/>
        <ControlButton icon={faHeart}/>
        
      </div>
    </div>
  )
}