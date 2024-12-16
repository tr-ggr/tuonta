"use client"
import { useEffect, useState } from "react";
import useSWR from "swr";
import HobbiesModal from "./modals/hobbies";
import ProfilePicsEdit from "./profilepicsedit";
import ProfilePics from "./profilepics";
import SaveChangesModal from "./modals/savechanges";
import { CurrentUser } from "../home/page";

interface ProfileSettingsPageProps {
  onSaveProfile: (updatedProfile: any) => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function getProfile(id: any) {
  const { data, error } = useSWR(
    `https://localhost:7113/api/profiles/${id}`,
    fetcher
  );
  return {
    data: data ? data : "",
    loading: !data && !error,
    error,
  };
}

export default function ProfileSettingsPage({
  onSaveProfile,
}: ProfileSettingsPageProps) {
  const { data, loading, error } = getProfile(CurrentUser.id);

  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [school, setSchool] = useState("");
  const [course, setCourse] = useState("");
  const [distance, setDistance] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [street, setStreet] = useState("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [profileImages, setProfileImages] = useState<string[]>([]);

  const [role, setRole] = useState(""); // State for role
  const [isEditingProfilePics, setIsEditingProfilePics] = useState(false);
  const [showHobbiesModal, setShowHobbiesModal] = useState(false);
  const [showSaveChangesModal, setShowSaveChangesModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    if (data) {
      setUsername(data.username);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setBirthday(data.birthday);
      setGender(data.gender);
      setBio(data.bio);
      setSchool(data.school);
      setCourse(data.course);
      setDistance(data.distance);
      setCountry(data.country);
      setCity(data.city);
      setProvince(data.province);
      setStreet(data.street);
      setProfileImages([]);
      setRole(data.role); // Set role from data
    }
  }, [data]);

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

  const handleConfirmSaveChanges = async () => {
    const updatedProfile = {
      id: CurrentUser.id,
      username: username,
      firstName: firstname,
      lastName: lastname,
      country: country,
      city: city,
      province: province,
      street: street,
      email: email,
      birthday: birthday,
      gender: gender,
      bio: bio,
      school: school,
      role: role, // Include role in the updated profile
      password: data.password,
      course: course,
      distance: Number(distance),
      hobbies: hobbies,
      profileImages: profileImages,
      isAdmin: data.isAdmin, // Adjust as needed
      isVerified: data.isVerified, // Adjust as needed
    };

    // Sending PUT request to update the profile
    try {
      const response = await fetch(`https://localhost:7113/api/profiles/${CurrentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      // console.log()
      console.log(updatedProfile)

      if (response.ok) {
        // onSaveProfile(updatedProfile); // Notify the parent component
        setShowSaveChangesModal(false);
        setIsEditingProfile(false);
      } else {
        // alert("Failed to save changes.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // alert("An error occurred while updating your profile.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading profile data</div>;
  }

  return (
    <div className="h-screen bg-gray-200 flex overflow-hidden">
      <div className="w-full max-w-3xl overflow-y-auto bg-[#f2e1fc] p-6 border border-gray-300 rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">Profile Settings</h1>

        {/* Profile Settings Form */}
        <section>
          <div className="grid grid-cols-1 gap-4">
            <div>
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

            <div>
              <label htmlFor="firstname" className="block font-semibold">Firstname</label>
              <input
                id="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditingProfile}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block font-semibold">Lastname</label>
              <input
                id="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditingProfile}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </div>

            <div>
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

            <div>
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

            <div>
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

            <div>
              <label htmlFor="role" className="block font-semibold">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={!isEditingProfile}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              >
                <option value="Tutor">Tutor</option>
                <option value="Student">Student</option>
              </select>
            </div>

            <div>
              <label htmlFor="bio" className="block font-semibold">Bio</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!isEditingProfile}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </div>

            <div>
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

            <div>
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

            <div>
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

            <div>
              <label htmlFor="country" className="block font-semibold">Country</label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={!isEditingProfile}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="city" className="block font-semibold">City</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!isEditingProfile}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="province" className="block font-semibold">Province</label>
              <input
                id="province"
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                disabled={!isEditingProfile}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="street" className="block font-semibold">Street</label>
              <input
                id="street"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                disabled={!isEditingProfile}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </div>
          </div>
        </section>

        {/* Save changes buttons */}
        <div className="mt-6">
          {isEditingProfile ? (
            <>
              <button
                onClick={handleConfirmSaveChanges}
                className="bg-green-500 text-white p-2 rounded mr-2"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditProfile}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
