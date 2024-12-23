"use client"

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faX, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

import { useRouter } from 'next/navigation'

import useSWR from 'swr'
import { profile } from "console";



const fetcher = (e : string) => fetch(e).then(res => res.json())


function getProfile(id: any){
  const { data, error } = useSWR(`https://localhost:7113/api/profiles/${id}`, fetcher);
  // console.log(data)
  return {
    data: data ? data : '',
    loading: !data && !error,
    error
  };
};

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

const destroyCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0;`;
};

const getProfileSession = () => {
  return getProfile(getCookie("userId")).data
}

export const CurrentUser = {
  id: getCookie("userId"),
}



const createNotification = async (notification: { userId: number; title: string; message: string, referenceId : string, type : string }) => {
  const payload = {
    userId: notification.userId,
    title: notification.title,
    message: notification.message,
    isRead: false,
    type: notification.type,
    referenceId: notification.referenceId, // Adjust as needed
    dateCreated: new Date().toISOString()
  };

  try {
    const response = await fetch('https://localhost:7113/api/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Notification created:', data);
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};


function getAllProfiles(excludeUserId: string) {

  const { data: profilesData, error: profilesError } = useSWR(`https://localhost:7113/api/profiles/`, fetcher);
  const { data: matchStatusData, error: matchStatusError } = useSWR(`https://localhost:7113/api/match/matches/`, fetcher);


  if (profilesError || matchStatusError) {
    return {
      data: [],
      loading: false,
      error: profilesError || matchStatusError,
    };
  }

  if (!profilesData || !matchStatusData) {
    return {
      data: [],
      loading: true,
      error: null,
    };
  }

  const excludedUserIds = matchStatusData
    .filter((match: any) => match.user1Id == excludeUserId)
    .map((match: any) => match.user2Id);

  // console.log(excludedUserIds)
  const filteredProfiles = profilesData.filter((profile: any) => !excludedUserIds.includes(profile.id) && profile.id != excludeUserId);

  // console.log(filteredProfiles);



  return {
    data: filteredProfiles,
    loading: false,
    error: null,
  };
}

export const CancelButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <motion.button whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }} className="w-16 h-16 flex items-center justify-center rounded-3xl bg-[#D9D9D9]" onClick={onClick}>
            <FontAwesomeIcon  icon={faX} />
        </motion.button>
    )
}

export const AcceptButton = ({ userId, onClick, isDisabled }: { isDisabled : boolean, userId: string, onClick: () => void }) => {
  const handleAccept = async () => {
    const payload = {
      user1Id: CurrentUser.id,
      user2Id: userId,
      date_created: new Date().toISOString()
    };

    try {
      const response = await fetch('https://localhost:7113/api/match/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }

    onClick();
    createNotification({ userId: Number(userId), title: "You have a new match!", message: "You have a new match!", referenceId: String(CurrentUser.id), type : "home" });
    // router.refresh();
  };



  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-16 h-16 flex items-center justify-center rounded-3xl bg-[#D9D9D9]"
      onClick={handleAccept}
      disabled={isDisabled}
    >
      <FontAwesomeIcon icon={faHeart} />
    </motion.button>
  );
};

export const MatchCard = ({ profile }: { profile: any }) => {
  return(
  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 w-1/2 flex flex-col items-center bg-cyan-700 rounded-3xl h-5/6"> 
        <div className="w-full h-4/6 bg-transparent"></div>
        <div className="w-full gap-2 h-2/6 bg-[#4530A7] rounded-3xl flex flex-col p-4">
          <span className="font-bold text-3xl text-white">{profile.username}</span>
          <span className="font-bold text-lg text-white">{profile.school}</span>
          <span className=" text-white">{profile.course}</span>
          {/* <ProfileTags></ProfileTags> */}
        </div>
      </motion.div>
  )
}

export default function HomePage() {
  const excludeUserId = CurrentUser.id; // Replace with the actual user ID to exclude
  const { data: profiles, loading, error } = getAllProfiles(String(excludeUserId));
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  var currentProfile = null

  if(profiles.length != 0){
    currentProfile = profiles[currentIndex];
  }

  // console.log(currentProfile);

  return (
    <div className="w-full justify-between h-full flex flex-col items-center">
      {currentProfile == null ? <div className="w-full h-full flex justify-center items-center">NO MORE MATCHES</div> : <MatchCard profile={currentProfile} />}
      

      <div className = "flex justify-around items-center w-1/3 h-24 bg-[#4530A7] rounded-t-3xl">
        <CancelButton onClick={handleNextProfile} />
        <AcceptButton isDisabled={profiles.length == 0 ? true : false} userId={profiles.length == 0 ? 0 : currentProfile.id} onClick={handleNextProfile} />
      </div>
    </div>
  )
}