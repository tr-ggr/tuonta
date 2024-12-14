"use client";

import { Button } from "@/components/ui/button";

export default function SettingsPage({ onClose }: { onClose: () => void }) {
  const handleLogout = () => {
    alert("Logged out!"); // Replace with your logout logic
    onClose(); // Close the modal after logout
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: 9999 }} // Ensure it's always on top
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">Settings</h1>
        <div className="flex flex-col items-center gap-4">
          <Button
            className="w-full bg-red-500 text-white py-2 font-semibold rounded-md"
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Button
            className="w-full bg-gray-300 text-black py-2 font-semibold rounded-md"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
