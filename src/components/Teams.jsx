import { useSearchParams } from "react-router-dom";
import { departments, teamMembers } from "../data";
import { Filter, Mail, MapPin, Phone, Search, Star } from "lucide-react";

export const Teams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const departmentFilter = searchParams.get("department") || "All";

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      departmentFilter === "All" || member.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
          Team
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Manage your team members and their departments.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
            />
          </div>

          {/* Department Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={departmentFilter}
              onChange={(e) => handleDepartmentChange(e.target.value)}
              className="pl-12 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm min-w-[160px] transition-all duration-200"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${member.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {member.image ? (
                    <img
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
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-900 transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 font-medium">{member.role}</p>
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
              <div className="flex items-center justify-between">
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
                <span className="text-sm text-gray-600 font-medium bg-gray-50 px-3 py-1.5 rounded-full">
                  {member.projects} projects
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="truncate font-medium">{member.email}</span>
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

      {filteredMembers.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">
            No team members found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};
