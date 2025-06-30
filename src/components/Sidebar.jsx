import { LogOut, Menu, Palette, X } from "lucide-react";
import { navigation } from "../data";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = {
    id: "bwvaxzle43018276",
    name: "Isabella Kim",
    role: "Frontend Developer",
    department: "Development",
    email: "isabella.kim@designpro.com",
    phone: "+1 (555) 567-8901",
    image: "/images/a-fotor-ai-f202506290634.jpg",
    status: "Busy",
    projects: 4,
    location: "Los Angeles",
    rating: 4.5,
    color: "from-purple-500 to-violet-600",
  };
  const { logoutAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAuth();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-white/80 backdrop-blur-xl rounded-xl p-3 shadow-lg border border-white/20 hover:bg-white/90 transition-all duration-200"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-20 px-6 border-b border-gray-100/50">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  DesignPro
                </span>
                <p className="text-xs text-gray-500 font-medium">
                  Creative Studio
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)} // Close sidebar on mobile when navigating
                className={({ isActive }) =>
                  `group flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-105"
                      : "text-gray-600 hover:bg-white/60 hover:text-gray-900 hover:shadow-md hover:scale-105"
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-6 border-t border-gray-100/50">
            <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                {user.image ? (
                  <img className="rounded-full object-cover" src={user.image} />
                ) : (
                  <span className="text-lg font-bold text-white">
                    {user.name
                      .split(" ")
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")}
                  </span>
                )}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
