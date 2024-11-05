import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const { isLoggedIn } = useGlobalContext();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to access this page.");
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
