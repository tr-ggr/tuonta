import React, { useState } from "react";

const ProfilePics = () => {
  const [images, setImages] = useState<string[]>(new Array(6).fill(""));
  
  const handleSaveChanges = () => {
    console.log("Changes saved!");
    // Add your save logic here
  };

  const handleImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-white flex flex-col items-center space-y-8 p-7 ml-20 rounded-xl shadow-lg">
        {/* Profile Photos Header */}
        <div className="text-[#1a1a1a] text-2xl font-semibold">
          Profile Photos
        </div>

        {/* Image Uploads */}
        <div className="flex flex-wrap justify-center gap-7">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-[180px] h-[240px] rounded-[12px] border-dashed border-2 border-[#1a1a1a]/30 bg-[#f4f4f4]"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageChange(index, event)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {image && (
                <img
                  src={image}
                  alt={`Profile ${index + 1}`}
                  className="w-full h-full object-cover rounded-[12px]"
                />
              )}
            </div>
          ))}
        </div>

        {/* Save Changes Button */}
        <div
          className="w-[230px] h-[60px] p-3 bg-[#4530a7] rounded-[30px] flex justify-center items-center relative z-10 cursor-pointer"
          onClick={handleSaveChanges}
        >
          <div className="text-white text-xl font-semibold">Save Changes</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePics;
