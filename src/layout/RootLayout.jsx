import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
