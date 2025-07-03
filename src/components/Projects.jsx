import { Link, useSearchParams } from "react-router-dom";
import { priorities, statuses, projects, teamMembers } from "../data";
import {
  Search,
  Filter,
  Calendar,
  DollarSign,
  Users,
  Clock,
  ArrowUpRight,
  FolderOpen,
  Building2,
  ChevronDown,
  FolderOpenDot,
} from "lucide-react";
import { useState } from "react";

export const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "All";
  const priorityFilter = searchParams.get("priority") || "All";

  const displayLimit = 12;
  const [displayCount, setDisplayCount] = useState(displayLimit);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const displayProjects = filteredProjects.slice(0, displayCount);
  const hasMoreUsers = displayCount < filteredProjects.length;

  const handleSearchChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const handleStatusChange = (status) => {
    const newParams = new URLSearchParams(searchParams);
    if (status !== "All") {
      newParams.set("status", status);
    } else {
      newParams.delete("status");
    }
    setSearchParams(newParams);
  };

  const handlePriorityChange = (priority) => {
    const newParams = new URLSearchParams(searchParams);
    if (priority !== "All") {
      newParams.set("priority", priority);
    } else {
      newParams.delete("priority");
    }
    setSearchParams(newParams);
  };

  const loadMoreMembers = () => {
    setDisplayCount((prev) =>
      Math.min(prev + displayLimit, displayProjects.length)
    );
  };

  const resetProjectDisplay = () => {
    setDisplayCount(displayLimit);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-8 items-start justify-between md:pt-[0] pt-[80px] px-8 sm:flex-row sm:items-center">
        <div className="flex-[2]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Manage all your design and development projects.
          </p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 items-center space-x-2 inline-flex">
          <span>New Project</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      {/* Search and Filter Bar */}.
      <div id="projects__filter" className="grid grid-cols-1 gap-6 px-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
          {/* Filter */}
          <div className="flex flex-col sm:flex-row gap-4 md:flex-col md6:flex-row ">
            {/* Search input */}
            <div className="flex-1 md6:flex-[1.6_1-0%] relative">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500" />
                </div>

                <input
                  name="text"
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => {
                    handleSearchChange(e.target.value);
                    resetProjectDisplay();
                  }}
                  className="w-full bg-white border border-gray-200 text-gray-700 py-2 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            {/* Select */}
            <div className="flex flex-1 w-full gap-4">
              <div className="relative flex w-[60%]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Building2 className="w-4 h-4 text-gray-500" />
                </div>

                <select
                  name="statusFilter"
                  value={statusFilter}
                  onChange={(e) => {
                    handleStatusChange(e.target.value);
                    resetProjectDisplay();
                  }}
                  className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-10 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div className="relative flex  w-[40%]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FolderOpenDot className="w-4 h-4 text-gray-500" />
                </div>

                <select
                  name="priorityFilter"
                  value={priorityFilter}
                  onChange={(e) => {
                    handlePriorityChange(e.target.value);
                    resetProjectDisplay();
                  }}
                  className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-10 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
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
      {/* ***** */}
      <div id="projects" className="flex flex-col p-8">
        <div
          id="team-members"
          className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden"
        >
          <div
            id="team-members__heading"
            className="p-8 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50"
          >
            {displayProjects.length === 0 && (
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
            <div className="flex flex-col gap-8 sm2:grid sm2:grid-cols-2 sm2:gap-6 md:grid-cols-1 md5:grid-cols-2 md11:grid-cols-3 xl5:grid-cols-4">
              {displayProjects.map((project) => (
                <div
                  id="projects__item"
                  key={project.id}
                  className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl hover:-translate-y-2 transition-transform"
                >
                  <div
                    id="projects__item-heading"
                    className="flex flex-col md4:flex-row md4:justify-between md4:items-center md5:flex-col md5:items-start"
                  >
                    <div id="projects__item-heading-left" className="space-y-2">
                      <h3 className="font-bold text-gray-900 text-xl group-hover:text-blue-900 transition-colors duration-200">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {project.client}
                      </p>
                    </div>
                    <div
                      id="projects__item-heading-right md4:inline-flex"
                      className="flex gap-1"
                    >
                      <span
                        className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : project.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : project.status === "Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span
                        className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${
                          project.priority === "Critical"
                            ? "bg-red-100 text-red-800"
                            : project.priority === "High"
                            ? "bg-orange-100 text-orange-800"
                            : project.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.priority}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mt-4 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span className="font-semibold">{project.budget}</span>
                      </div>
                      <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="font-semibold">
                          {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="font-medium">Progress</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {project.progress}%
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            project.progress === 100
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : "bg-gradient-to-r from-blue-500 to-purple-500"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Team Avatars */}
                  <div
                    id="projects__item-footer"
                    className="flex border-t border-gray-100 sm2:flex-col sm2:items-start md:flex-row md:justify-between md5:flex-col"
                  >
                    <div className="flex mt-4">
                      <Users className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600 font-medium mr-3">
                        Team:
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 xl5:flex-col xl5:items-start">
                      <div className="flex -space-x-4 rtl:space-x-reverse">
                        {project.team.slice(0, 3).map((id) => {
                          const member = teamMembers.find((m) => m.id === id);
                          // if (!member || !member.image) return null;

                          if (member.image) {
                            return (
                              <img
                                key={id}
                                className="w-10 h-10 rounded-full object-cover"
                                src={member.image}
                              />
                            );
                          } else {
                            return (
                              <div
                                key={id}
                                className={`w-10 h-10 rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center shadow-lg `}
                              >
                                <span className="w-10 h-10 text-lg font-bold text-white flex items-center justify-center">
                                  {member.name
                                    .split(" ")
                                    .slice(0, 2)
                                    .map((word) => word[0])
                                    .join("")}
                                </span>
                              </div>
                            );
                          }
                        })}

                        {project.team.length > 3 && (
                          <Link
                            className="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-400 hover:text-white bg-gray-300 rounded-full hover:bg-gray-400 dark:border-gray-800 transition-all duration-200"
                            href="#"
                          >
                            +{project.team.length - 3}
                          </Link>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 font-medium">
                        {project.team.length} members
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {hasMoreUsers && (
              <div className="flex w-full justify-center mt-10">
                <button
                  class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2"
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
