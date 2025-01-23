import { Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useGlobalContext();
  const location = useLocation();

  if (isLoggedIn) {
    return <Navigate to={location.state?.from || "/records"} replace />;
  }

  return children;
};

export default AuthRoute;
