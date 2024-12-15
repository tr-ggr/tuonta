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
  createdAt: string;  // Added field for date of creation
}

const usersPerPage = 6;

const UserManagement: React.FC = () => {
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
          "/images/2.png",
          "/images/5.png",
          "/images/3.png",
          "/images/1.png",
          "/images/6.png",
          "/images/4.png",
        ],
        approved: false,
        selectedImageIndex: 0,
        createdAt: "2023-01-15T08:00:00Z",
      },
      {
        id: 2,
        name: "John Smith",
        email: "john.smith@example.com",
        birthday: "1999-12-15",
        course: "BS Information Technology",
        year: 4,
        school: "CIT-U",
        gender: "Male",
        profilePics: [
          "/images/4.png",
          "/images/1.png",
          "/images/6.png",
          "/images/3.png",
          "/images/2.png",
          "/images/5.png",
        ],
        approved: true,
        selectedImageIndex: 0,
        createdAt: "2023-02-20T10:30:00Z",
      },
      {
        id: 3,
        name: "Maria Garcia",
        email: "maria.garcia@example.com",
        birthday: "2000-03-10",
        course: "BS Nursing",
        year: 2,
        school: "Cebu Doctors' University",
        gender: "Female",
        profilePics: [
          "/images/3.png",
          "/images/5.png",
          "/images/4.png",
          "/images/2.png",
          "/images/6.png",
          "/images/1.png",
        ],
        approved: false,
        selectedImageIndex: 1,
        createdAt: "2023-03-05T09:15:00Z",
      },
      {
        id: 4,
        name: "James Brown",
        email: "james.brown@example.com",
        birthday: "1997-07-22",
        course: "BS Civil Engineering",
        year: 5,
        school: "University of San Carlos",
        gender: "Male",
        profilePics: [
          "/images/6.png",
          "/images/2.png",
          "/images/5.png",
          "/images/3.png",
          "/images/1.png",
          "/images/4.png",
        ],
        approved: true,
        selectedImageIndex: 2,
        createdAt: "2023-04-10T11:45:00Z",
      },
      {
        id: 5,
        name: "Sophia Davis",
        email: "sophia.davis@example.com",
        birthday: "2001-11-05",
        course: "BS Architecture",
        year: 1,
        school: "CIT-U",
        gender: "Female",
        profilePics: [
          "/images/1.png",
          "/images/6.png",
          "/images/4.png",
          "/images/5.png",
          "/images/3.png",
          "/images/2.png",
        ],
        approved: false,
        selectedImageIndex: 0,
        createdAt: "2023-05-25T14:00:00Z",
      },
      {
        id: 6,
        name: "Liam Martinez",
        email: "liam.martinez@example.com",
        birthday: "2000-09-18",
        course: "BS Mechanical Engineering",
        year: 4,
        school: "University of the Visayas",
        gender: "Male",
        profilePics: [
          "/images/5.png",
          "/images/4.png",
          "/images/1.png",
          "/images/3.png",
          "/images/6.png",
          "/images/2.png",
        ],
        approved: true,
        selectedImageIndex: 1,
        createdAt: "2023-06-12T16:20:00Z",
      },
      {
        id: 7,
        name: "Isabella Wilson",
        email: "isabella.wilson@example.com",
        birthday: "2002-02-14",
        course: "BS Accountancy",
        year: 2,
        school: "Cebu Normal University",
        gender: "Female",
        profilePics: [
          "/images/4.png",
          "/images/2.png",
          "/images/6.png",
          "/images/5.png",
          "/images/1.png",
          "/images/3.png",
        ],
        approved: false,
        selectedImageIndex: 2,
        createdAt: "2023-07-05T08:10:00Z",
      },
      {
        id: 8,
        name: "Ethan Hernandez",
        email: "ethan.hernandez@example.com",
        birthday: "1998-04-09",
        course: "BS Electronics Engineering",
        year: 5,
        school: "University of Cebu",
        gender: "Male",
        profilePics: [
          "/images/6.png",
          "/images/3.png",
          "/images/5.png",
          "/images/2.png",
          "/images/4.png",
          "/images/1.png",
        ],
        approved: true,
        selectedImageIndex: 0,
        createdAt: "2023-08-01T12:30:00Z",
      },
      {
        id: 9,
        name: "Emma Thompson",
        email: "emma.thompson@example.com",
        birthday: "1999-06-30",
        course: "BS Education",
        year: 3,
        school: "CIT-U",
        gender: "Female",
        profilePics: [
          "/images/3.png",
          "/images/1.png",
          "/images/2.png",
          "/images/4.png",
          "/images/6.png",
          "/images/5.png",
        ],
        approved: false,
        selectedImageIndex: 1,
        createdAt: "2023-09-10T15:40:00Z",
      },    
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState<"name" | "school" | "course">("name");
  const [sortCriteria, setSortCriteria] = useState<"year" | "birthday" | "createdAt">("year");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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

  const handleSort = (criteria: "year" | "birthday" | "createdAt") => {
    const direction = sortCriteria === criteria && sortDirection === "asc" ? "desc" : "asc";
    setSortCriteria(criteria);
    setSortDirection(direction);
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    if (searchBy === "name") {
      return user.name.toLowerCase().includes(query);
    }
    if (searchBy === "school") {
      return user.school.toLowerCase().includes(query);
    }
    return user.course.toLowerCase().includes(query);
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    let comparison = 0;

    if (sortCriteria === "year") {
      comparison = a.year - b.year;
    } else if (sortCriteria === "birthday") {
      comparison = new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
    } else if (sortCriteria === "createdAt") {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const paginatedUsers = sortedUsers.slice(
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
