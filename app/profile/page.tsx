"use client";

import { useState } from "react";
import HobbiesModal from "./modals/hobbies"; // Import your modal component
import ProfilePicsEdit from "./profilepicsedit"; // Import the ProfilePicsEdit component
import ProfilePics from "./profilepics"; // Import the ProfilePics component

export default function ProfileSettingsPage() {
  const [username, setUsername] = useState("jakebajo2003");
  const [email, setEmail] = useState("jakebajo2003@gmail.com");
  const [birthday, setBirthday] = useState("10/04/2003");
  const [gender, setGender] = useState("Male");
  const [bio, setBio] = useState("i love you");
  const [school, setSchool] = useState("Cebu Institute of Technology - University");
  const [course, setCourse] = useState("BSCS - 3");
  const [distance, setDistance] = useState(30);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [profileImages, setProfileImages] = useState<string[]>(new Array(6).fill(""));

  // State to control whether ProfilePics or ProfilePicsEdit is shown
  const [isEditingProfilePics, setIsEditingProfilePics] = useState(false);

  const [showHobbiesModal, setShowHobbiesModal] = useState(false);

  const handleSaveHobbies = (selectedHobbies: string[]) => {
    setHobbies(selectedHobbies);
    setShowHobbiesModal(false);
  };

  const handleSaveProfilePics = (updatedImages: string[]) => {
    setProfileImages(updatedImages);
    setIsEditingProfilePics(false); // Return to ProfilePics after saving
  };

  return (
    <div className="h-screen bg-gray-200 flex overflow-hidden">
      {/* Profile Settings Section */}
      <div className="w-full max-w-3xl overflow-y-auto bg-[#f2e1fc] p-6 border border-gray-300 rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">Profile Settings</h1>

        {/* Personal Details Section */}
        <section>
          <div className="">
            <div className="flex flex-col bg-gray-100 p-2 border-b rounded-t-lg">
              <label className="text-sm font-bold mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-right rounded-md p-2"
              />
            </div>
            <div className="flex flex-col bg-gray-100 p-2 border-b">
              <label className="text-sm font-bold mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-right rounded-md p-2"
              />
            </div>
            <div className="flex justify-between bg-gray-100 p-2 border-b">
              <label className="text-sm font-bold mb-1">Birthday</label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="text-right bg-transparent focus:outline-none rounded-md p-2 mt-5"
              />
            </div>
            <div className="flex justify-between bg-gray-100 p-2 border-b">
              <label className="text-sm font-bold mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="bg-transparent focus:outline-none text-right rounded-md p-2 mt-5"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex flex-col bg-gray-100 p-2 border-b rounded-b-lg">
              <label className="text-sm font-bold mb-1">Bio</label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-right rounded-md p-2"
              />
            </div>
          </div>
        </section>

        {/* Hobbies Section */}
        <section className="mt-6">
          <div className="bg-gray-100 p-3 border-b rounded-lg flex justify-between items-center">
            <label className="text-sm font-bold mb-1">Hobbies</label>
            <button
              onClick={() => setShowHobbiesModal(true)}
              className="bg-[#4530a7] text-white py-2 px-4 font-semibold text-sm rounded-md"
            >
              Add Hobby
            </button>
          </div>
          <div className="flex flex-wrap mt-2">
            {hobbies.length > 0 &&
              hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-[#4530a7] text-white rounded-full px-4 py-1 m-1.5 text-sm"
                >
                  {hobby}
                </div>
              ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mt-6">
          <div className="space-y-4">
            <div className="flex flex-col bg-gray-100 p-2 border-b rounded-lg">
              <label className="text-sm font-bold mb-1">School</label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-right rounded-md p-2"
              />
            </div>
            <div className="flex flex-col bg-gray-100 p-2 border-b rounded-lg">
              <label className="text-sm font-bold mb-1">Course and Year</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-right rounded-md p-2"
              />
            </div>
          </div>
        </section>

        {/* Discovery Settings */}
        <section className="mt-6">
          <div className="bg-gray-100 p-3 border-b rounded-lg">
            <label className="text-sm font-bold mb-1">Distance Preference</label>
            <input
              type="range"
              min="10"
              max="100"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-[#4530a7] mt-5"
            />
            <div className="text-right">{distance} km</div>
          </div>
        </section>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={() => alert("Changes saved!")}
            className="w-full bg-[#4530a7] text-white py-3 font-semibold text-lg rounded-full"
          >
            Save Changes
          </button>
        </div>
      </div>
{/* Profile Pics Section */}
<div className="w-full max-w-3xl flex justify-center items-center p-4">
  {isEditingProfilePics ? (
    <ProfilePicsEdit
      initialImages={profileImages}
      onSaveChanges={handleSaveProfilePics}
    />
  ) : (
    <ProfilePics
      images={profileImages}
      onEdit={() => setIsEditingProfilePics(true)} // Show ProfilePicsEdit when editing
      name="Jake Bajo" // Pass name
      birthday="2002-01-01" // Pass birthday
      course="BSCS" // Pass course
      year={3} // Pass year
      school="Cebu Institute of Technology - University" // Pass school
      bio="i love you"
    />
  )}
</div>

      {/* Modal */}
      {showHobbiesModal && (
        <HobbiesModal
          onClose={() => setShowHobbiesModal(false)}
          onSave={handleSaveHobbies}
          initialHobbies={hobbies}
        />
      )}
    </div>
  );
}
