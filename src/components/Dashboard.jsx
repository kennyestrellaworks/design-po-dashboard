import { ArrowUpRight, Clock } from "lucide-react";

import { stats, recentProjects } from "../data";

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Welcome back! Here's what's happening at your agency.
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center space-x-1">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">from last month</span>
                </div>
              </div>
              <div
                className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Projects
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 hover:scale-105 transition-transform duration-200">
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-6 border border-gray-100/50 rounded-xl hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-900 transition-colors duration-200">
                      {project.name}
                    </h3>
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
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
                  <p className="text-gray-600">{project.client}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Due in {project.dueDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <span
                      className={`inline-flex px-3 py-1.5 text-sm font-medium rounded-full ${
                        project.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : project.status === "Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : project.status === "Planning"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="w-32">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Progress
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          project.progress === 100
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : "bg-gradient-to-r from-blue-500 to-purple-500"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
