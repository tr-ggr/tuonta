"use client";

import { Button } from "@/components/ui/button";

export default function SettingsPage({ onClose }: { onClose: () => void }) {
  const handleLogout = () => {
    document.cookie = `userId=; path=/; max-age=0;`;
    window.location.href = "/"
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
            className="w-full bg-red-500 text-white py-2 font-semibold rounded-md hover:bg-red-600 h-11"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
          <Button
            className="w-full bg-gray-300 text-black py-2 font-semibold rounded-md hover:bg-gray-400 h-11"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
