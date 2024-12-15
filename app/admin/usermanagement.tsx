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
  approved: boolean; // Add approved property
  profilePics: string[]; // Add profilePics as an array of images
}


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserManagement: React.FC = () => {
  const { data: users, error } = useSWR<User[]>("https://localhost:7113/api/verifyidentity", fetcher);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [profileDetails, setProfileDetails] = useState<any[]>([]);

  // Fetch profiles once users data is available
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (users && users.length > 0) {
          const profiles = await Promise.all(
            users.map(async (user) => {
              const res = await fetch(`https://localhost:7113/api/profiles/${user.id}`);
              const profileData = await res.json();
              return profileData;
            })
          );
          setProfileDetails(profiles); // Set profile details to state
        }
      } catch (err) {
        console.error("Error fetching profile details:", err);
      }
    };

    // Trigger fetchProfiles only when users data is available
    if (users) {
      fetchProfiles();
    }
  }, [users]); // Re-run effect when users change

  // Handle errors and loading states
  if (error) return <div>Error loading users.</div>;
  if (!users) return <div>Loading...</div>;

  // Open modal for user approval
  const openApproveModal = (user: User) => {
    setModalUser(user);
    setModalVisible(true);
  };

  // Close approval modal
  const closeApproveModal = () => {
    setModalVisible(false);
    setModalUser(null);
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">User Management</h1>

      {/* User Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profileDetails.length > 0 &&
          profileDetails.map((profile: any) => (
            <div key={profile.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
              {/* Empty image box above the username */}
              <div className="h-24 w-24 mx-auto bg-gray-200 rounded-full"></div>

              <h2 className="text-xl font-bold mt-2 text-center">{profile.firstName} {profile.lastName}</h2> {/* Full name above email */}
              
              <div className="mt-2 space-y-1 text-md text-center">
                <p><strong>Username:</strong> {profile.username}</p> {/* Username above Email */}
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

      {/* Modal */}
      {modalVisible && modalUser && (
        <ApproveModal
          visible={modalVisible}
          user={modalUser}
          onApprove={() => {}}
          onClose={closeApproveModal}
        />
      )}
    </div>
  );
};

export default UserManagement;
