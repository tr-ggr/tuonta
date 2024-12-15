import React from "react";

interface ApproveModalProps {
  visible: boolean;
  user: {
    firstName: string;
    lastName: string;
    profileImages: string | null; // Use the profileImages field here
    approved: boolean;
    selectedImageIndex: number; // Keep selectedImageIndex here
  } | null;
  onClose: () => void;
  onApprove: () => void;
}

const ApproveModal: React.FC<ApproveModalProps> = ({
  visible,
  user,
  onClose,
  onApprove,
}) => {
  if (!visible || !user) return null;

  // Handle profile image, use fallback if profileImages is null or undefined
  const profilePic = user.profileImages ? user.profileImages : "/default-profile-pic.jpg";

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
          src={profilePic} // Use the profile picture or fallback
          alt="User profile"
          className="w-32 h-32 object-cover mx-auto rounded-full shadow-lg mb-4"
        />
        <p className="text-center mb-4 font-semibold">{user.firstName} {user.lastName}</p>
        <button
          className={`p-2 rounded text-white w-full ${
            user.approved ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={onApprove}
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
