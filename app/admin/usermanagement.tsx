import React, { useState } from "react";
import ApproveModal from "./modals/approve";

interface User {
  id: number;
  name: string;
  email: string;
  birthday: string;
  course: string;
  year: number;
  school: string;
  gender: string;
  profilePics: string[];
  approved: boolean;
  selectedImageIndex: number;
}

const usersPerPage = 6;

const UserManagement: React.FC = () => {
    // Adding 8 users with 6 manually selected profile images (1.png to 6.png)
    const [users, setUsers] = useState<User[]>([
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        birthday: "1998-05-20",
        course: "BS Computer Science",
        year: 3,
        school: "CIT-U",
        gender: "Female",
        profilePics: [
          "/images/1.png",
          "/images/2.png",
          "/images/3.png",
          "/images/4.png",
          "/images/5.png",
          "/images/6.png",
        ],
        approved: false,
        selectedImageIndex: 0,
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@example.com",
        birthday: "1997-11-15",
        course: "BS Information Technology",
        year: 4,
        school: "CIT-U",
        gender: "Male",
        profilePics: [
          "/images/1.png",
          "/images/2.png",
          "/images/3.png",
          "/images/4.png",
          "/images/5.png",
          "/images/6.png",
        ],
        approved: true,
        selectedImageIndex: 1,
      },
      {
        id: 3,
        name: "Charlie Davis",
        email: "charlie.davis@example.com",
        birthday: "1999-03-12",
        course: "BS Software Engineering",
        year: 2,
        school: "CIT-U",
        gender: "Male",
        profilePics: [
          "/images/1.png",
          "/images/2.png",
          "/images/3.png",
          "/images/4.png",
          "/images/5.png",
          "/images/6.png",
        ],
        approved: false,
        selectedImageIndex: 2,
      },
      {
        id: 4,
        name: "Diana Lewis",
        email: "diana.lewis@example.com",
        birthday: "2000-08-30",
        course: "BS Information Systems",
        year: 1,
        school: "CIT-U",
        gender: "Female",
        profilePics: [
          "/images/1.png",
          "/images/2.png",
          "/images/3.png",
          "/images/4.png",
          "/images/5.png",
          "/images/6.png",
        ],
        approved: true,
        selectedImageIndex: 3,
      },
      {
        id: 5,
        name: "Ethan Brown",
        email: "ethan.brown@example.com",
        birthday: "1996-12-25",
        course: "BS Computer Engineering",
        year: 4,
        school: "CIT-U",
        gender: "Male",
        profilePics: [
          "/images/1.png",
          "/images/2.png",
          "/images/3.png",
          "/images/4.png",
          "/images/5.png",
          "/images/6.png",
        ],
        approved: true,
        selectedImageIndex: 4,
      },
      {
        id: 6,
        name: "Fiona White",
        email: "fiona.white@example.com",
        birthday: "1998-02-18",
        course: "BS Data Science",
        year: 3,
        school: "CIT-U",
        gender: "Female",
        profilePics: [
          "/images/1.png",
          "/images/2.png",
          "/images/3.png",
          "/images/4.png",
          "/images/5.png",
          "/images/6.png",
        ],
        approved: false,
        selectedImageIndex: 5,
      },
      {
        id: 7,
        name: "George King",
        email: "george.king@example.com",
        birthday: "1997-07-10",
        course: "BS Computer Science",
        year: 4,
        school: "CIT-U",
        gender: "Male",
        profilePics: [
          "/images/1.png",
          "/images/2.png",
          "/images/3.png",
          "/images/4.png",
          "/images/5.png",
          "/images/6.png",
        ],
        approved: false,
        selectedImageIndex: 0,
      },
      {
        id: 8,
        name: "Hannah Scott",
        email: "hannah.scott@example.com",
        birthday: "2001-01-03",
        course: "BS Software Engineering",
        year: 1,
        school: "CIT-U",
        gender: "Female",
        profilePics: [
          "/images/1.png",
          "/images/2.png",
          "/images/3.png",
          "/images/4.png",
          "/images/5.png",
          "/images/6.png",
        ],
        approved: true,
        selectedImageIndex: 2,
      },
    ]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalUser, setModalUser] = useState<User | null>(null);

  const openApproveModal = (user: User) => {
    setModalUser(user);
    setModalVisible(true);
  };

  const closeApproveModal = () => {
    setModalVisible(false);
    setModalUser(null);
  };

  const handleApproval = () => {
    if (modalUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === modalUser.id
            ? { ...user, approved: !user.approved }
            : user
        )
      );
      closeApproveModal();
    }
  };

  const handleImageChange = (userId: number, direction: "prev" | "next") => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              selectedImageIndex:
                direction === "next"
                  ? (user.selectedImageIndex + 1) % user.profilePics.length
                  : (user.selectedImageIndex - 1 + user.profilePics.length) % user.profilePics.length,
            }
          : user
      )
    );
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">User Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
          >
            <div className="relative text-center">
              <img
                src={user.profilePics[user.selectedImageIndex]}
                alt={`Profile ${user.selectedImageIndex + 1}`}
                className="w-48 h-48 object-cover mx-auto border-4 border-[#1a1a1a]/30 shadow-lg"
              />
              {user.approved && (
                <div className="absolute top-0 right-0 rounded-full w-6 h-6 flex items-center justify-center">
                  <img
                    src="/images/approve.png"
                    alt="Approved"
                  />
                </div>
              )}
              <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
  <button
    onClick={() => handleImageChange(user.id, "prev")}
    className="font-bold text-xl"
  >
    <img src="/images/arrowsleft.png" alt="Previous"/>
  </button>
  <button
    onClick={() => handleImageChange(user.id, "next")}
    className="font-bold text-xl"
  >
    <img src="/images/arrowsright.png" alt="Next" />
  </button>
</div>

            </div>
            <h2 className="text-xl font-bold mt-2 text-center">{user.name}</h2>
            <div className="mt-2 space-y-1 text-md text-center">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Birthday:</strong> {user.birthday}</p>
              <p><strong>Course:</strong> {user.course}</p>
              <p><strong>Year:</strong> {user.year}</p>
              <p><strong>School:</strong> {user.school}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => openApproveModal(user)}
                className="bg-[#4530a7] hover:bg-[#2f1f7a] text-white px-4 py-2 rounded-md"
              >
                Manage Approval
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {modalVisible && modalUser && (
        <ApproveModal
          visible={modalVisible}
          user={{
            name: modalUser.name,
            profilePics: modalUser.profilePics,
            approved: modalUser.approved,
            selectedImageIndex: modalUser.selectedImageIndex,
          }}
          onClose={closeApproveModal}
          onApprove={handleApproval}
        />
      )}
    </div>
  );
};

export default UserManagement;
