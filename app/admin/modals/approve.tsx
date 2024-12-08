import React from "react";

interface ApproveModalProps {
  visible: boolean;
  user: {
    name: string;
    profilePics: string[]; // Array of profile pictures
    approved: boolean;
    selectedImageIndex: number; // Add selectedImageIndex here
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
          src={user.profilePics[user.selectedImageIndex]} // Use the selected profile picture
          alt="User profile"
          className="w-32 h-32 object-cover mx-auto rounded-full shadow-lg mb-4"
        />
        <p className="text-center mb-4 font-semibold">{user.name}</p>
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
