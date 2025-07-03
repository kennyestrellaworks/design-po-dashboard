import { useSearchParams } from "react-router-dom";
import { departments, teamMembers } from "../data";
import {
  ArrowDown,
  Building2,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Search,
  Star,
} from "lucide-react";
import { useState } from "react";

export const Teams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const departmentFilter = searchParams.get("department") || "All";
  const teamMemberViewLimt = 12;
  const [displayCount, setDisplayCount] = useState(teamMemberViewLimt);

  console.log("searchQuery", searchQuery);

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      departmentFilter === "All" || member.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const displayMembers = filteredMembers.slice(0, displayCount);
  const hasMoreUsers = displayCount < filteredMembers.length;

  // console.log("filteredMembers", filteredMembers);
  // console.log("displayMembers", displayMembers);

  const handleSearchChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const handleDepartmentChange = (department) => {
    const newParams = new URLSearchParams(searchParams);
    if (department !== "All") {
      newParams.set("department", department);
    } else {
      newParams.delete("department");
    }
    setSearchParams(newParams);
  };

  const loadMoreMembers = () => {
    setDisplayCount((prev) =>
      Math.min(prev + teamMemberViewLimt, filteredMembers.length)
    );
  };

  const resetMemberDisplay = () => {
    setDisplayCount(teamMemberViewLimt);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pt-[80px] px-8 md:pt-[0]">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Team
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Manage your team members and their departments.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      {/* Search and Filter Bar */}.
      <div id="teams" className="grid grid-cols-1 gap-6 px-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 md:flex-col md6:flex-row">
            <div className="flex-1 relative">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500" />
                </div>

                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => {
                    handleSearchChange(e.target.value);
                    resetMemberDisplay();
                  }}
                  className="w-full bg-white border border-gray-200 text-gray-700 py-2 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative flex flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Building2 className="w-4 h-4 text-gray-500" />
                </div>

                <select
                  value={departmentFilter}
                  onChange={(e) => {
                    handleDepartmentChange(e.target.value);
                    resetMemberDisplay();
                  }}
                  className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-10 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {departments.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
          {/* Search */}
        </div>
      </div>
      <div className="flex flex-col p-8">
        <div
          id="team-members"
          className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden"
        >
          <div
            id="team-members__heading"
            className="p-8 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50"
          >
            {displayMembers.length === 0 && (
              <div className="flex w-full justify-center">
                <div className="flex flex-col py-[100px] items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1117 9a7.5 7.5 0 01-.35 7.65z"
                    ></path>
                  </svg>
                  <h2 className="text-lg font-semibold text-gray-700">
                    No results found
                  </h2>
                  <p className="text-gray-500 mt-1">
                    We couldn’t find anything matching your search.
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-8 sm3:grid sm3:grid-cols-2 sm3:gap-6 md:grid-cols-1 md3:grid-cols-2 xl1:grid-cols-3 xl4:grid-cols-4">
              {displayMembers.map((member) => (
                <div
                  key={member.id}
                  className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl duration-300 hover:-translate-y-2 transition-transform"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      id="team-members__profile"
                      className="flex items-center sm3:flex-col sm3:items-start md2:flex-row md3:flex-col md10:flex-row xl1:flex-col"
                    >
                      <div
                        id="team-members__profile-wrap"
                        className={`w-16 h-16 bg-gradient-to-r ${member.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {member.image ? (
                          <img
                            id="team-members__profile-image"
                            className="w-16 h-16 rounded-full object-cover"
                            src={member.image}
                          />
                        ) : (
                          <span className="text-lg font-bold text-white">
                            {member.name
                              .split(" ")
                              .slice(0, 2)
                              .map((word) => word[0])
                              .join("")}
                          </span>
                        )}
                      </div>
                      <div
                        id="team-members__profile-details"
                        className="w-full ml-4 sm3:ml-0 sm3:mt-4 md2:mt-0 md2:ml-4 md3:ml-0 md3:mt-4 md10:mt-0 md10:ml-4 xl1:ml-0 xl1:mt-4"
                      >
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-900 transition-colors duration-200">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {member.role}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1 font-medium">
                            {member.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${
                        member.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between sm3:flex-col sm3:items-start sm3:gap-1 md:flex-row md3:flex-col md7:flex-row xl4:flex-col">
                      <span
                        className={`inline-flex px-3 py-1.5 text-sm font-semibold rounded-full ${
                          member.department === "Design"
                            ? "bg-pink-100 text-pink-800"
                            : member.department === "Development"
                            ? "bg-blue-100 text-blue-800"
                            : member.department === "Marketing"
                            ? "bg-green-100 text-green-800"
                            : member.department === "Strategy"
                            ? "bg-purple-100 text-purple-800"
                            : member.department === "Product"
                            ? "bg-blue-100 text-blue-400"
                            : member.department === "Quality Assurance"
                            ? "bg-orange-100 text-orange-500"
                            : member.department === "Analytics"
                            ? "bg-amber-100 text-amber-500"
                            : member.department === "Infrastructure"
                            ? "bg-violet-100 text-violet-500"
                            : member.department === "Human Resources"
                            ? "bg-sky-100 text-sky-500"
                            : member.department === "Project Management"
                            ? "bg-yellow-100 text-yellow-500"
                            : member.department === "Content"
                            ? "bg-zinc-100 text-zinc-500"
                            : member.department === "Documentation"
                            ? "bg-fuchsia-100 text-fuchsia-500"
                            : member.department === "Security"
                            ? "bg-red-100 text-red-500"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {member.department}
                      </span>
                      <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1.5 rounded-full">
                        {member.projects} projects
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <Mail className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="truncate font-medium">
                          {member.email}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <Phone className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="font-medium">{member.phone}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="font-medium">{member.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {hasMoreUsers && (
              <div className="flex w-full justify-center mt-10">
                <button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                  onClick={() => loadMoreMembers()}
                >
                  <span>Load More</span>
                  <ArrowDown />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
