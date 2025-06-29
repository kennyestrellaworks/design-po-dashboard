import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginAuth = ({ email, password }) => {
    const demoUser = { email: "demo@gmail.com", password: "1234" };

    if (demoUser.email === email && demoUser.password === password) {
      setIsAuthenticated(true);
      return { success: true, message: "Login successful" };
    } else {
      return {
        success: false,
        message: `Wrong credentials, use ${demoUser.email} / ${demoUser.password}`,
      };
    }
  };

  const logoutAuth = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ loginAuth, logoutAuth, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
