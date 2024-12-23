"use client";

import React from "react";
import UserManagement from "./usermanagement"; // Import the UserManagement component
import Link from "next/link"; // Import Link for navigation
import useSWR from "swr";
import { CurrentUser  } from "../home/page";


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

const AdminPage: React.FC = () => {
  const {data, loading, error} = getProfile(CurrentUser.id)

  console.log(data.isAdmin)

  if (!data.isAdmin){
    return <div>NOT ADMIN BRO</div>
  }

  
  return (
    <div className="flex h-full bg-gray-100 overflow-hidden">
      {/* Admin Dashboard Sidebar */}
      <div className="w-1/5 bg-[#f2e1fc] text-white flex flex-col items-center py-8 shadow-lg h-full overflow-hidden">
        <h2 className="text-2xl font-bold mb-8 text-black">Admin Dashboard</h2>
        <div className="flex flex-col gap-4 w-3/4">
          {/* Profile Button */}
          <Link href="/profile" className="w-full">
            <button className="w-full bg-[#4530a7] p-4 rounded-lg text-white text-lg hover:bg-[#2f1f7a] font-semibold">
              Profile
            </button>
          </Link>

          {/* Sign Out Button */}
          <button className="w-full bg-red-500 p-4 rounded-lg text-white text-lg hover:bg-red-600 transition font-semibold">
            Sign Out
          </button>
        </div>
      </div>

      {/* User Management Section */}
      <div className="flex-1 overflow-y-auto">
        <UserManagement /> {/* Include the UserManagement component */}
      </div>
    </div>
  );
};

export default AdminPage;
