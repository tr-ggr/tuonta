"use client";

import React, { useState } from "react";
import ApproveModal from "./modals/approve";
import useSWR, { mutate } from "swr";

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
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserManagement: React.FC = () => {
  const { data: users, error } = useSWR<User[]>(
    "https://localhost:7113/api/users",
    fetcher
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState<"name" | "school" | "course">("name");
  const [sortCriteria, setSortCriteria] = useState<"year" | "birthday" | "createdAt">("year");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUser, setModalUser] = useState<User | null>(null);

  if (error) return <div>Error loading users.</div>;
  if (!users) return <div>Loading...</div>;

  const usersPerPage = 6;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const openApproveModal = (user: User) => {
    setModalUser(user);
    setModalVisible(true);
  };

  const closeApproveModal = () => {
    setModalVisible(false);
    setModalUser(null);
  };

  const handleApproval = async () => {
    if (modalUser) {
      try {
        const updatedUser = { ...modalUser, approved: !modalUser.approved };
        await fetch(`https://localhost:7113/api/users/${modalUser.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        });
        mutate("https://localhost:7113/api/users");
        closeApproveModal();
      } catch (err) {
        console.error("Failed to update user approval status", err);
      }
    }
  };

  const handleImageChange = (userId: number, direction: "prev" | "next") => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            selectedImageIndex:
              direction === "next"
                ? (user.selectedImageIndex + 1) % user.profilePics.length
                : (user.selectedImageIndex - 1 + user.profilePics.length) %
                  user.profilePics.length,
          }
        : user
    );
    mutate("https://localhost:7113/api/users", updatedUsers, false);
  };

  const handleSort = (criteria: "year" | "birthday" | "createdAt") => {
    const direction = sortCriteria === criteria && sortDirection === "asc" ? "desc" : "asc";
    setSortCriteria(criteria);
    setSortDirection(direction);
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    if (searchBy === "name") return user.name.toLowerCase().includes(query);
    if (searchBy === "school") return user.school.toLowerCase().includes(query);
    return user.course.toLowerCase().includes(query);
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    let comparison = 0;
    if (sortCriteria === "year") comparison = a.year - b.year;
    else if (sortCriteria === "birthday")
      comparison = new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
    else if (sortCriteria === "createdAt")
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">User Management</h1>

      {/* Search Bar with Dropdown */}
      <div className="mb-6 flex justify-center items-center gap-4">
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value as "name" | "school" | "course")}
          className="px-4 py-2 rounded-md border border-gray-300"
        >
          <option value="name">Search by Name</option>
          <option value="school">Search by School</option>
          <option value="course">Search by Course</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchBy.charAt(0).toUpperCase() + searchBy.slice(1)}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 w-1/2"
        />
      </div>

      {/* Sorting Options */}
      <div className="mb-4 flex justify-center gap-4">
        <button
          onClick={() => handleSort("year")}
          className="bg-[#4530a7] text-white px-4 py-2 rounded-md"
        >
          Sort by Year
        </button>
        <button
          onClick={() => handleSort("birthday")}
          className="bg-[#4530a7] text-white px-4 py-2 rounded-md"
        >
          Sort by Birthday
        </button>
        <button
          onClick={() => handleSort("createdAt")}
          className="bg-[#4530a7] text-white px-4 py-2 rounded-md"
        >
          Sort by Date of Creation
        </button>
      </div>

      {/* User Grid */}
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
                  <img src="/images/approve.png" alt="Approved" />
                </div>
              )}
              <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
                <button
                  onClick={() => handleImageChange(user.id, "prev")}
                  className="font-bold text-xl"
                >
                  <img src="/images/arrowsleft.png" alt="Previous" />
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {modalVisible && modalUser && (
        <ApproveModal
          visible={modalVisible} // Pass the visible prop
          user={modalUser}
          onApprove={handleApproval}
          onClose={closeApproveModal}
        />
      )}
    </div>
  );
};

export default UserManagement;
