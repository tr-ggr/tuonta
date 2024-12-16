import React from "react";

interface ApproveModalProps {
  visible: boolean;
  user: {
    id: number; // User's unique identifier
    name: string; // User's name (can be derived from firstName + lastName)
    profilePics: string[]; // Array of profile pictures
    approved: boolean; // Current approval status
    selectedImageIndex: number; // Index of the selected profile image
  } | null;
  onClose: () => void; // Callback to close the modal
  onApprove: (userId: number, newApprovalStatus: boolean) => void; // Callback to handle approval change
}

const ApproveModal: React.FC<ApproveModalProps> = ({
  visible,
  user,
  onClose,
  onApprove,
}) => {
  if (!visible || !user) return null;

  // Safe access to the user's profile picture, fallback to a default if not available
  const profilePic = user.profilePics?.[user.selectedImageIndex] || "/default-profile-pic.jpg";

  // Function to handle the approval status change
  const handleApprove = async () => {
    try {
      // Send a PUT request to the backend to update the approval status
      const response = await fetch(`https://localhost:7113/api/verifyidentity/update/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: user.id, // Pass the user's ID
          isApproved: !user.approved, // Toggle approval status
        }),
      });

      // Check the response status
      if (response.ok) {
        // After successfully updating the approval status, call the onApprove callback
        onApprove(user.id, !user.approved); // Pass the updated approval status
      } else {
        // Log error if update fails
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
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      >
        <h2 className="text-xl font-bold mb-4 text-center">Manage Approval</h2>
        <img
          src={profilePic} // Profile image
          alt="User profile"
          className="w-32 h-32 object-cover mx-auto rounded-full shadow-lg mb-4"
        />
        <p className="text-center mb-4 font-semibold">{user.name}</p> {/* Display user name */}
        <button
          className={`p-2 rounded text-white w-full ${user.approved ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
          onClick={handleApprove}
        >
          {user.approved ? "Disapprove" : "Approve"} {/* Toggle button text */}
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
