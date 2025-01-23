import React, { createContext, useState, useContext, useMemo } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("login") === "true";
  });
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState("");

  const getAllRecords = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/v1/record", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecords(response.data.data.records);
    } catch (error) {
      console.log(error);
    }
  };

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("login", true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("login", "false");
    localStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
      getAllRecords,
      records,
      summary,
      setSummary,
      token,
    }),
    [isLoggedIn, records, summary, token]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
