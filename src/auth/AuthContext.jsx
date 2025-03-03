import { createContext, useContext, useState, useEffect } from "react";
import { getUserAuth } from "../hooks/userAuth"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginUser = (user, token) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };
  useEffect(() => {
    const authUser = getUserAuth();
    if (authUser) {
      setUser(authUser);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);
