import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Palette, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { loginAuth } = useAuth();

  const demoEmail = "demo@gmail.com";
  const demoPassword = "1234";

  const handleDemoLogin = () => {
    const response = loginAuth({ email: demoEmail, password: demoPassword });

    if (response.success) {
      navigate("/dashboard");
    } else {
      alert(response.message || "Demo login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-2xl shadow-xl mb-4">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            DesignPro
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back to your creative studio
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Access Demo
            </h2>
            <p className="text-gray-600">
              Explore the dashboard with demo credentials
            </p>
          </div>

          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-blue-800 text-sm font-medium mb-2">
              Demo Credentials:
            </p>
            <p className="text-blue-700 text-sm">Email: {demoEmail}</p>
            <p className="text-blue-700 text-sm">Password: {demoPassword}</p>
          </div>

          <div className="space-y-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-4 h-4 text-gray-500" />
                </div>
                <div className="w-full bg-white border border-gray-200 text-gray-400 py-2 pl-10 pr-4 rounded-xl">
                  demo@gmail.com
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-4 h-4 text-gray-500" />
                </div>
                <div className="w-full bg-white border border-gray-200 text-gray-400 py-2 pl-10 pr-4 rounded-xl">
                  ••••
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Continue as Demo User</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Want to create your own demo?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all duration-200"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-400">
          <p>
            This is a frontend-only prototype. No user data is stored or
            transmitted.
          </p>
          <p className="mt-1">
            <span className="underline" title="Demo only – not real policies">
              Privacy Policy
            </span>{" "}
            ·{" "}
            <span className="underline" title="Demo only – not real terms">
              Terms
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
