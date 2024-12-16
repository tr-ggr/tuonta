import React from "react";

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

interface ApproveModalProps {
  visible: boolean;
  user: User;
  onClose: () => void; // Callback to close the modal
  onApprove: (userId: number, newApprovalStatus: boolean) => void; // Callback to handle approval change
}

const ApproveModal : React.FC<ApproveModalProps> = ({user, visible, onClose, onApprove}) => {



  if (!visible || !user) return null;

  const profilePic =
    user.profilePics?.[user.selectedImageIndex] || "/default-profile-pic.jpg";

  const handleApprove = async () => {
    
    try {
      const response = await fetch(
        `https://localhost:7113/api/verifyidentity/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: user.id,
          }),
        }
      );

      console.log(user.id)

      if (response.ok) {
        onApprove(user.id, !user.approved);
      } else {
        console.error("Error updating approval status");
      }
    } catch (error) {
      console.error("Error occurred during approval:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Manage Approval</h2>
        <img
          src={profilePic}
          alt="User profile"
          className="w-32 h-32 object-cover mx-auto rounded-full shadow-lg mb-4"
        />
        <p className="text-center mb-4 font-semibold">{user.username }</p>
        <button
          className={`p-2 rounded text-white w-full ${
            user.approved
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={handleApprove}
        >
          {user.approved ? "Disapprove" : "Approve"}
        </button>
        <button
          className="mt-2 p-2 rounded bg-gray-500 text-white w-full hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ApproveModal;
