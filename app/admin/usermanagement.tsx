import React, { useState, useEffect } from "react";
import useSWR from "swr";
import ApproveModal from "./modals/approve";

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  province: string;
  street: string;
  email: string;
  birthday: string;
  gender: string;
  bio: string | null;
  school: string;
  role: string;
  password: string;
  course: string;
  isAdmin: boolean;
  isVerified: boolean;
  distance: string | null;
  hobbies: string | null;
  profileImages: string | null;
  selectedImageIndex: number;
  approved: boolean;
  profilePics: string[];
  name: string; // Add a 'name' property

}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserManagement: React.FC = () => {
  const { data: users, error } = useSWR<User[]>("https://localhost:7113/api/verifyidentity", fetcher);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [profileDetails, setProfileDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (users && users.length > 0) {
          const profiles = await Promise.all(
            users.map(async (user: any) => {
              const res = await fetch(`https://localhost:7113/api/profiles/${user.userID}`);
              const profileData = await res.json();
              return profileData;
            })
          );
  
          // Filter out profiles where isApproved is true
          const filteredProfiles = profiles.filter((profile: any) => !profile.isVerified);
          console.log(filteredProfiles)
  
          setProfileDetails(filteredProfiles);
        }
      } catch (err) {
        console.error("Error fetching profile details:", err);
      }
    };
  
    if (users) {
      fetchProfiles();
    }
  }, [users]);

  if (error) return <div>Error loading users.</div>;
  if (!users) return <div>Loading...</div>;

  const openApproveModal = (user: User) => {
    // console.log(user)
    setModalUser(user);
    setModalVisible(true);
  };

  const closeApproveModal = () => {
    setModalVisible(false);
    setModalUser(null);
  };

  const handleApproval = (userId: number) => {
    setProfileDetails((prevDetails) =>
      prevDetails.map((profile) =>
        profile.id === userId ? { ...profile, approved: true } : profile
      )
    );
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">User Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profileDetails.length > 0 &&
          profileDetails.map((profile: any) => (
            <div key={profile.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
              <div className="h-24 w-24 mx-auto bg-gray-200 rounded-full"></div>
              <h2 className="text-xl font-bold mt-2 text-center">{profile.firstName} {profile.lastName}</h2>
              <div className="mt-2 space-y-1 text-md text-center">
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Birthday:</strong> {profile.birthday}</p>
                <p><strong>Course:</strong> {profile.course}</p>
                <p><strong>School:</strong> {profile.school}</p>
                <p><strong>Gender:</strong> {profile.gender}</p>
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => openApproveModal(profile)}
                  className="bg-[#4530a7] hover:bg-[#2f1f7a] text-white px-4 py-2 rounded-md"
                >
                  Manage Approval
                </button>
              </div>
            </div>
          ))}
      </div>

      {modalVisible && modalUser && (
        <ApproveModal
          visible={modalVisible}
          user={modalUser}
          onApprove={handleApproval}
          onClose={closeApproveModal}
        />
      )}
    </div>
  );
};

export default UserManagement;
