"use client";

import { useState, useEffect } from "react";
import HobbiesModal from "./modals/hobbies";
import ProfilePicsEdit from "./profilepicsedit";
import ProfilePics from "./profilepics";
import SaveChangesModal from "./modals/savechanges";

interface ProfileSettingsPageProps {
  initialData: {
    username: string;
    email: string;
    birthday: string;
    gender: string;
    bio: string;
    school: string;
    course: string;
    distance: number;
    hobbies: string[];
    profileImages: string[];
  };
  onSaveProfile: (updatedProfile: any) => void;
}

export default function ProfileSettingsPage({
  initialData,
  onSaveProfile,
}: ProfileSettingsPageProps) {
  const [username, setUsername] = useState(initialData.username);
  const [email, setEmail] = useState(initialData.email);
  const [birthday, setBirthday] = useState(initialData.birthday);
  const [gender, setGender] = useState(initialData.gender);
  const [bio, setBio] = useState(initialData.bio);
  const [school, setSchool] = useState(initialData.school);
  const [course, setCourse] = useState(initialData.course);
  const [distance, setDistance] = useState(initialData.distance);
  const [hobbies, setHobbies] = useState<string[]>(initialData.hobbies);
  const [profileImages, setProfileImages] = useState<string[]>(initialData.profileImages);

  const [isEditingProfilePics, setIsEditingProfilePics] = useState(false);
  const [showHobbiesModal, setShowHobbiesModal] = useState(false);
  const [showSaveChangesModal, setShowSaveChangesModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleSaveHobbies = (selectedHobbies: string[]) => {
    setHobbies(selectedHobbies);
    setShowHobbiesModal(false);
  };

  const handleSaveProfilePics = (updatedImages: string[]) => {
    setProfileImages(updatedImages);
    setIsEditingProfilePics(false);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveChanges = () => {
    setIsEditingProfile(false);
    setShowSaveChangesModal(true);
  };

  const handleCloseSaveChangesModal = () => {
    setShowSaveChangesModal(false);
  };

  const handleConfirmSaveChanges = () => {
    onSaveProfile({
      username,
      email,
      birthday,
      gender,
      bio,
      school,
      course,
      distance,
      hobbies,
      profileImages,
    });
    setShowSaveChangesModal(false);
    setIsEditingProfile(false);
  };

  return (
    <div className="h-screen bg-gray-200 flex overflow-hidden">
      <div className="w-full max-w-3xl overflow-y-auto bg-[#f2e1fc] p-6 border border-gray-300 rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">Profile Settings</h1>

        {/* Profile Settings Form */}
        <section>
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditingProfile}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditingProfile}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="birthday" className="block font-semibold">Birthday</label>
            <input
              id="birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              disabled={!isEditingProfile}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block font-semibold">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={!isEditingProfile}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block font-semibold">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={!isEditingProfile}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="school" className="block font-semibold">School</label>
            <input
              id="school"
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              disabled={!isEditingProfile}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="course" className="block font-semibold">Course</label>
            <input
              id="course"
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              disabled={!isEditingProfile}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="distance" className="block font-semibold">Distance</label>
            <input
              id="distance"
              type="number"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              disabled={!isEditingProfile}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
        </section>

        {/* Hobbies Section */}
        <section className="mt-6">
          <button
            onClick={() => setShowHobbiesModal(true)}
            disabled={!isEditingProfile}
            className="bg-[#4530a7] text-white py-2 px-4 font-semibold text-sm rounded-md disabled:opacity-50"
          >
            Add Hobby
          </button>
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

        {/* Save Changes Button */}
        <button
          onClick={handleSaveChanges}
          className="w-full bg-[#4530a7] text-white py-3 font-semibold text-lg rounded-full"
        >
          Save Changes
        </button>
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
            onEdit={() => setIsEditingProfilePics(true)}
            name={username}
            birthday={birthday}
            course={course}
            year={3}
            approved={true}
            school={school}
            bio={bio}
          />
        )}
      </div>

      {/* Modals */}
      {showHobbiesModal && (
        <HobbiesModal
          onClose={() => setShowHobbiesModal(false)}
          onSave={handleSaveHobbies}
          initialHobbies={hobbies}	
        />
      )}
      {showSaveChangesModal && (
        <SaveChangesModal
          onClose={handleCloseSaveChangesModal}
          onSave={handleConfirmSaveChanges}
        />
      )}
    </div>
  );
}
