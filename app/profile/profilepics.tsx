import React, { useState, useEffect } from "react";

interface ProfilePicsProps {
  images: string[];
  name: string;
  birthday: string;
  course: string;
  year: number;
  school: string;
  bio: string;  // Added bio field
  onEdit: () => void;
}

const ProfilePics: React.FC<ProfilePicsProps> = ({
  images,
  name,
  birthday,
  course,
  year,
  school,
  bio,
  onEdit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [age, setAge] = useState<number>(0);

  // Calculate age from birthday
  useEffect(() => {
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    const calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();
    setAge(calculatedAge);
  }, [birthday]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-[#f2e1fc] flex flex-col items-center space-y-6 p-8 ml-20 rounded-xl shadow-lg max-w-xl">
        {/* Profile Picture Section */}
        <div className="relative w-[270px] h-[270px] rounded-full border-2 border-[#1a1a1a]/30 bg-[#f4f4f4] overflow-hidden mb-4">
          {images.length > 0 ? (
            <img
              src={images[currentIndex]}
              alt={`Profile ${currentIndex + 1}`}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="flex justify-center items-center w-full h-full text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Bio Section */}
        {bio && (
          <div className="text-center text-lg text-black italic mb-3">
            {bio}
          </div>
        )}

        {/* User Details Section */}
        <div className="flex flex-col gap-4 text-left w-full">
          <div className="text-2xl font-bold text-black border-b border-black">{name}</div>
          <div className="text-lg text-black">{age} years old</div>
          <div className="text-2xl font-bold text-black border-b border-black">{course} - {year}</div>
          <div className="text-lg text-black">{school}</div>
        </div>

        {/* Edit Button */}
        <button
          className="w-full h-[60px] p-3 bg-[#4530a7] rounded-[30px] text-white text-xl font-semibold mt-4"
          onClick={onEdit}
        >
          Edit Picture
        </button>
      </div>
    </div>
  );
};

export default ProfilePics;
