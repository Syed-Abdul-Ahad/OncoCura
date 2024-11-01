import React, { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("GlobalContext : ", isLoggedIn);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("login", true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <GlobalContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
