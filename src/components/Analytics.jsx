import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { departmentPerformance, metrics } from "../data";

export const Analytics = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pt-[80px] px-8 md:pt-[0]">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Analytics
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
      <div
        id="analytics"
        className="grid grid-cols-1 gap-6 p-8 md:grid-cols-1 md1:grid-cols-2 md8:grid-cols-3 xl:grid-cols-4 "
      >
        {metrics.map((metric) => (
          <div
            id="analytics__cards-item"
            key={metric.name}
            className={`relative overflow-hidden bg-gradient-to-br ${metric.bgColor} rounded-2xl  border border-white/20 shadow-xl hover:shadow-2xl duration-300 group hover:-translate-y-2 transition-transform`}
          >
            <div
              id="analytics__cards-item-wrap"
              className="flex items-center justify-between xl:flex-col-reverse xl:items-start xl:gap-4 xl2:flex-row xl2:items-center p-6"
            >
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  {metric.name}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {metric.value}
                </p>
                <div className="flex items-center space-x-1 md1:flex-col md4:flex-row md1:items-start md4:items-center md6:items-start md8:flex-col xl:flex-col">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500">from last month</span>
                </div>
              </div>
              <div
                className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center shadow-lg  transition-transform duration-300`}
              >
                <metric.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          </div>
        ))}
      </div>

      {/* Department Performance */}
      <div className="flex flex-col p-8">
        <div
          id="derpartment-performance"
          className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden"
        >
          <div
            id="derpartment-performance__heading"
            className="px-8 py-6 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50"
          >
            <div
              id="derpartment-performance__heading-wrap"
              className="flex items-center justify-between"
            >
              <h2 className="text-2xl font-bold text-gray-900 w-[200px]">
                Department Performance
              </h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1  transition-transform duration-200">
                <span>View All</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            id="derpartment-performance__items"
            className="flex flex-col px-8 pb-8"
          >
            <div
              id="derpartment-performance__items-wrap"
              className="flex flex-col gap-4"
            >
              <table className="w-full">
                <thead className="hidden sm1:flex md:hidden md4:flex">
                  <tr className="border-b border-gray-200 sm1:flex sm1:flex-row sm1:w-full">
                    <th className="text-left py-4 font-semibold text-gray-900 sm1:w-[35%]">
                      Department
                    </th>
                    <th className="text-left py-4 font-semibold text-gray-900 sm1:w-[15%]">
                      Projects
                    </th>
                    <th className="text-left py-4 font-semibold text-gray-900 sm1:w-[20%]">
                      Revenue
                    </th>
                    <th className="text-left py-4 font-semibold text-gray-900 sm1:w-[30%]">
                      Utilization
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {departmentPerformance.map((dept, index) => {
                    return (
                      <tr
                        key={index}
                        className="flex flex-col border-b hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-200 w-full py-6 sm1:flex-row md:flex-col md4:flex-row"
                      >
                        <td className="flex flex-row items-center py-2 sm1:w-[35%] md:w-full md4:w-[35%]">
                          <div className="flex flex-row justify-between w-full">
                            <p className="flex text-left font-semibold text-gray-900 sm1:hidden md:flex md4:hidden">
                              Department
                            </p>
                            <div className="flex flex-row items-center gap-1">
                              <div
                                className={`w-3 h-3 ${dept.color} rounded-full`}
                              ></div>

                              <span className="font-semibold text-gray-900">
                                {dept.department}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="flex flex-row items-center py-2 sm1:w-[15%] md:w-full md4:w-[15%]">
                          <div className="flex flex-row justify-between w-full">
                            <p className="flex text-left font-semibold text-gray-900 sm1:hidden md:flex md4:hidden">
                              Projects
                            </p>
                            {dept.projects}
                          </div>
                        </td>
                        <td className="flex flex-row items-center py-2 sm1:w-[20%] md:w-full md4:w-[20%]">
                          <div className="flex flex-row justify-between w-full">
                            <p className="flex text-left font-semibold text-gray-900 sm1:hidden md:flex md4:hidden">
                              Revenue
                            </p>
                            {dept.revenue}
                          </div>
                        </td>
                        <td className="flex flex-row items-center py-2 sm1:w-[30%] md:w-full md4:w-[30%]">
                          <div className="flex flex-row justify-between w-full md:justify-between">
                            <p className="flex text-left font-semibold text-gray-900 sm1:hidden md:flex md4:hidden">
                              Utilization
                            </p>
                            <div className="flex flex-row items-center justify-end">
                              <div className="flex flex-row w-20 rounded-full h-2.5 mr-2 bg-gray-300 ">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                                  style={{ width: `${dept.utilization}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-bold text-gray-900">
                                {dept.utilization}%
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
