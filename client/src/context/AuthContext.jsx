import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userID, setUserID] = useState(localStorage.getItem("userID"));

  const login = (role, id) => {
    localStorage.setItem("userRole", role);
    localStorage.setItem("userID", id);
    setUserRole(role);
    setUserID(id);
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userID");
    setUserRole(null);
    setUserID(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, userID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
