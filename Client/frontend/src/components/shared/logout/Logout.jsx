import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setTimeout(() => {
      logout();
      navigate("/login");
    }, 1000);
  };

  return (
    <button
      onClick={() => {
        setLoading(true);
        handleLogout();
      }}
      className="px-6 py-2 text-black border-2 border-black  text-sm rounded-md hover:bg-black hover:text-white transition duration-300"
      disabled={loading}
    >
      {loading ? (
        <svg
          className="animate-spin h-3 w-3 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        "Logout"
      )}
    </button>
  );
};

export default Logout;
