import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Analytics } from "./components/Analytics";
import { Clients } from "./components/Clients";
import { Dashboard } from "./components/Dashboard";
import { Projects } from "./components/Projects";
import { Teams } from "./components/Teams";
import { RootLayout } from "./layout/RootLayout";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectRoute";
import { Signup } from "./components/Signup";
import { useAuth } from "./context/AuthContext";

export const App = () => {
  const { isAuthenticated } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="team" element={<Teams />} />
            <Route path="projects" element={<Projects />} />
            <Route path="clients" element={<Clients />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};
