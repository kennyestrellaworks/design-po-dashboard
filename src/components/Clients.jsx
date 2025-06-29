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
} from "lucide-react";

export const Clients = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const industryFilter = searchParams.get("industry") || "All";

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
          Clients
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Manage your client relationships and project partnerships.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={industryFilter}
                onChange={(e) => handleIndustryChange(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm min-w-[150px] transition-all duration-200"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div
        id="client"
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        {filteredClients.map((client) => (
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
                className="flex items-center md:flex-col md:items-start 2xl:flex-row"
              >
                <div
                  id="client__item-heading-icon"
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                >
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div
                  id="client__item-heading-details"
                  className="ml-4 md:ml-0 md:mt-4 2xl:ml-4 2xl:mt-0"
                >
                  <h3 className="font-bold text-gray-900 text-xl group-hover:text-blue-900 transition-colors duration-200">
                    {client.name}
                  </h3>
                  <p className="text-gray-600 font-medium">{client.industry}</p>
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
                <span className="truncate font-medium">{client.email}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Phone className="w-4 h-4 mr-3 text-gray-400" />
                <span className="font-medium">{client.phone}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Globe className="w-4 h-4 mr-3 text-gray-400" />
                <span className="truncate font-medium">{client.website}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                <span className="font-medium">{client.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm">
                <span className="text-gray-600">Projects: </span>
                <span className="font-bold text-gray-900">
                  {client.projects}
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
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">
            No clients found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};
