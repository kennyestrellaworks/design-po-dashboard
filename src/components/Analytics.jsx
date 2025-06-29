import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { departmentPerformance, metrics, recentActivity } from "../data";

export const Analytics = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Track your agency's performance and key metrics.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className={`relative overflow-hidden bg-gradient-to-br ${metric.bgColor} rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  {metric.name}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {metric.value}
                </p>
                <div className="flex items-center space-x-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500">vs last month</span>
                </div>
              </div>
              <div
                className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <metric.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          </div>
        ))}
      </div>

      {/* Department Performance */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Department Performance
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 hover:scale-105 transition-transform duration-200">
              <span>View Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Department
                  </th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900">
                    Projects
                  </th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900">
                    Revenue
                  </th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900">
                    Utilization
                  </th>
                </tr>
              </thead>
              <tbody>
                {departmentPerformance.map((dept, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-200"
                  >
                    <td className="py-5 px-4">
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 ${dept.color} rounded-full mr-3`}
                        ></div>
                        <span className="font-semibold text-gray-900">
                          {dept.department}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-right font-semibold text-gray-900">
                      {dept.projects}
                    </td>
                    <td className="py-5 px-4 text-right font-semibold text-gray-900">
                      {dept.revenue}
                    </td>
                    <td className="py-5 px-4 text-right">
                      <div className="flex items-center justify-end">
                        <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${dept.utilization}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900 min-w-[40px]">
                          {dept.utilization}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
          <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-200"
              >
                <div
                  className={`w-3 h-3 rounded-full mt-2 ${
                    activity.type === "success"
                      ? "bg-green-500"
                      : activity.type === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                ></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.details}
                  </p>
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
