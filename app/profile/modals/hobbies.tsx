import React, { useState, useEffect } from "react";

interface HobbiesModalProps {
  onClose: () => void;
  onSave: (hobbies: string[]) => void;
  initialHobbies: string[];
}

export default function HobbiesModal({
  onClose,
  onSave,
  initialHobbies,
}: HobbiesModalProps) {
  const availableHobbies = ["Reading", "Traveling", "Cooking", "Sports", "Music", "Dancing", "Cycling", "Running", "Mind Games", "Movies", "Cafe", "Art"];
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [otherHobby, setOtherHobby] = useState<string>("");

  useEffect(() => {
    const predefinedHobbies = initialHobbies.filter((hobby) => availableHobbies.includes(hobby));
    setSelectedHobbies(predefinedHobbies);

    const otherHobbies = initialHobbies.filter((hobby) => !availableHobbies.includes(hobby));
    setOtherHobby(otherHobbies.join(", "));
  }, [initialHobbies]);

  const handleSelectHobby = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((item) => item !== hobby) : [...prev, hobby]
    );
  };

  const handleSave = () => {
    let updatedHobbies = [...selectedHobbies];

    if (otherHobby) {
      const otherHobbiesArray = otherHobby.split(",").map((hobby) => hobby.trim()).filter(Boolean);
      otherHobbiesArray.forEach((hobby) => {
        if (!updatedHobbies.includes(hobby)) {
          updatedHobbies.push(hobby);
        }
      });
    }

    onSave(updatedHobbies);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Select Your Hobbies</h2>
        <div className="space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {availableHobbies.map((hobby, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={hobby}
                  checked={selectedHobbies.includes(hobby)}
                  onChange={() => handleSelectHobby(hobby)}
                  className="mr-2"
                />
                <label htmlFor={hobby}>{hobby}</label>
              </div>
            ))}
          </div>

          <div className="flex items-center mt-4">
            <input
              type="text"
              value={otherHobby}
              onChange={(e) => setOtherHobby(e.target.value)}
              className="border p-2 w-full"
              placeholder="Other hobby"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-[#4530a7] text-white py-2 px-4 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
