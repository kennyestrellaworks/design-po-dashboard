import { useSearchParams } from "react-router-dom";
import { clients, industries } from "../data";
import {
  Search,
  Filter,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Star,
  User,
  ChevronDown,
  ArrowDown,
} from "lucide-react";
import { useState } from "react";

export const Clients = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const industryFilter = searchParams.get("industry") || "All";

  const displayLimit = 12;
  const [displayCount, setDisplayCount] = useState(displayLimit);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry =
      industryFilter === "All" || client.industry === industryFilter;

    return matchesSearch && matchesIndustry;
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

  const handleIndustryChange = (industry) => {
    const newParams = new URLSearchParams(searchParams);
    if (industry !== "All") {
      newParams.set("industry", industry);
    } else {
      newParams.delete("industry");
    }
    setSearchParams(newParams);
  };

  const displayClients = filteredClients.slice(0, displayCount);
  const hasMoreUsers = displayCount < filteredClients.length;

  const loadMoreMembers = () => {
    setDisplayCount((prev) =>
      Math.min(prev + displayLimit, filteredClients.length)
    );
  };

  const resetClientDisplay = () => {
    setDisplayCount(displayLimit);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pt-[80px] px-8 md:pt-[0]">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Clients
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Manage your client relationships and project partnerships.
          </p>
        </div>
      </div>
      {/* Search and Filter Bar */}
      <div id="clients__filter" className="grid grid-cols-1 gap-6 px-8">
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
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => {
                    handleSearchChange(e.target.value);
                    resetClientDisplay();
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
                  value={industryFilter}
                  onChange={(e) => {
                    handleIndustryChange(e.target.value);
                    resetClientDisplay();
                  }}
                  className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-10 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {industries.map((status) => (
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
      {/* Clients Grid */}
      <div id="clients" className="flex flex-col p-8">
        <div
          id="team-members"
          className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden"
        >
          <div
            id="team-members__heading"
            className="p-8 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50"
          >
            {displayClients.length === 0 && (
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
              {displayClients.map((client) => {
                return (
                  <div
                    id="client__item"
                    key={client.id}
                    className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div
                      id="client__item-heading"
                      className="flex items-start justify-between mb-6"
                    >
                      <div
                        id="client__item-heading-left"
                        className="flex items-start flex-col"
                      >
                        <div
                          id="client__item-heading-icon"
                          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                        >
                          <Building2 className="w-8 h-8 text-white" />
                        </div>
                        <div id="client__item-heading-details" className="mt-4">
                          <h3 className="font-bold text-gray-900 text-xl group-hover:text-blue-900 transition-colors duration-200">
                            {client.name}
                          </h3>
                          <p className="text-gray-600 font-medium">
                            {client.industry}
                          </p>
                          {client.rating > 0 && (
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 ml-1 font-medium">
                                {client.rating}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span
                        id="client__item-heading-right"
                        className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${
                          client.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : client.status === "Inactive"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {client.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {client.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <Mail className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="truncate font-medium">
                          {client.email}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <Phone className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="font-medium">{client.phone}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <Globe className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="truncate font-medium">
                          {client.website}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="font-medium">{client.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-start pt-4 border-t border-gray-100 md3:flex-row md3:justify-between md5:flex-col">
                      <div className="text-sm">
                        <span className="text-gray-600">clients: </span>
                        <span className="font-bold text-gray-900">
                          {client.clients}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Revenue: </span>
                        <span className="font-bold text-gray-900">
                          {client.revenue}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        Since {new Date(client.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
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
