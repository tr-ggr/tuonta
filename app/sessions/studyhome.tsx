"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export const FeaturedItem = ({
  picture,
  title,
  tags,
  viewers,
}: {
  picture: string;
  title: string;
  tags: string[];
  viewers: number;
}) => {
  return (
    <div className="flex h-fit w-[500px] flex-col gap-2">
      <div className="h-56  bg-slate-600"></div>
      <div className="flex justify-between gap-2">
        <span className="font-bold">{title}</span>
        <span className="text-xs">{viewers} viewers</span>
      </div>

      <div className="flex gap-2">
        {tags.map((tag) => (
          <span className="text-xs bg-[#F2DFFD] px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Featured = () => {
  return (
    <div className="flex gap-12 w-full p-4 overflow-x-auto [&>div]:flex-shrink-0">
      <FeaturedItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <FeaturedItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <FeaturedItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <FeaturedItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <FeaturedItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <FeaturedItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
    </div>
  );
};

export const SmallViewItem = ({
  picture,
  title,
  tags,
  viewers,
}: {
  picture: string;
  title: string;
  tags: string[];
  viewers: number;
}) => {
  return (
    <div className="flex h-fit w-[300px] flex-col gap-2">
      <div className="h-40  bg-slate-600"></div>
      <div className="flex justify-between gap-2">
        <span className="font-bold">{title}</span>
        <span className="text-xs">{viewers} viewers</span>
      </div>

      <div className="flex gap-2">
        {tags.map((tag) => (
          <span className="text-xs bg-[#F2DFFD] px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const SmallView = ({ type }: { type: string }) => {
  return (
    <div className="flex gap-12 w-full p-4 overflow-x-auto [&>div]:flex-shrink-0">
      <SmallViewItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <SmallViewItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <SmallViewItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <SmallViewItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <SmallViewItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
    </div>
  );
};




export const FloatingButton = ({ type }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionTitle, setSessionTitle] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [coverImage, setCoverImage] = useState("default-cover.jpg");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCoverChange = (image: string) => {
    setCoverImage(image);
  };

  const coverImages = [
    "default-cover.jpg",
    "cover1.jpg",
    "cover2.jpg",
    "cover3.jpg",
    "cover4.jpg",
    "cover5.jpg",
  ];

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 bg-violet-600 text-white p-4 rounded-full shadow-lg hover:bg-violet-800 focus:outline-none"
      >
        + Create Study Session
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleModal} // Close modal when clicking outside
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-2/3 max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            {/* Change Study Session Cover */}
            <div className="w-full mb-6">
              <h2 className="text-xl font-bold mb-4">Create Study Session</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {coverImages.map((image, index) => (
                  <div
                    key={index}
                    className="cursor-pointer border-2 border-transparent hover:border-violet-600 rounded-md"
                    onClick={() => handleCoverChange(image)}
                  >
                    <img
                      src={image}
                      alt={`Cover ${index + 1}`}
                      className={`w-full h-32 object-cover rounded-md ${
                        coverImage === image ? "border-2 border-violet-600" : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
              {/* Display selected cover */}
              <div
                className="w-full h-1 bg-cover rounded-md"
                style={{
                  backgroundImage: `url(${coverImage})`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>

            {/* Left Side: Details and Privacy Section */}
            <div className="flex mb-6">
              {/* Left Side: Details Section */}
              <div className="w-full md:w-1/2 pr-6">
                <form>
                  <h2 className="text-xl font-bold mb-4">Details</h2>
                  {/* Session Title */}
                  <input
                    type="text"
                    placeholder="Session Title"
                    value={sessionTitle}
                    onChange={(e) => setSessionTitle(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-md"
                  />

                  {/* Session Topic Dropdown */}
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-md"
                  >
                    <option value="">Select Topic</option>
                    <option value="math">Math</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    <option value="literature">Literature</option>
                  </select>
                </form>
              </div>

              {/* Right Side: Privacy Section */}
              <div className="w-full md:w-1/2 pl-6">
                <h2 className="text-xl font-bold mb-4">Privacy</h2>
                <div className="mb-4">
                  <label className="mr-4">Private</label>
                  <input
                    type="radio"
                    name="privacy"
                    value="private"
                    checked={privacy === "private"}
                    onChange={() => setPrivacy("private")}
                    className="mr-2"
                  />
                  <label className="mr-4">Public</label>
                  <input
                    type="radio"
                    name="privacy"
                    value="public"
                    checked={privacy === "public"}
                    onChange={() => setPrivacy("public")}
                    className="mr-2"
                  />
                </div>
              </div>
            </div>

            {/* Create Session Button - At the bottom of the modal */}
            <button
              type="submit"
              className="w-full p-3 bg-violet-600 hover:bg-violet-900 text-white rounded-md"
            >
              Create
            </button>

            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-600 font-bold"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};














// export const FloatingButton = ({ type }:any) => {

//   return (
//     // <Link href="/sessions/createsession">
//     <button
//       className="fixed bottom-6 right-6 bg-violet-600 text-white p-4 rounded-full shadow-lg hover:bg-violet-800 focus:outline-none"
//     >
//       +  Create Study Session
//     </button>
//     // </Link>
//   );
// };

