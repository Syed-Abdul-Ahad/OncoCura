import React from "react";
import Login from "../../components/shared/login/Login";
import SideComponent from "./subcomponent/SideComponent";

const LoginPage = () => {
  return (
    <div className="flex flex-row w-full overflow-hidden bg-[#F9F9F9]">
      <SideComponent />
      <Login />
    </div>
  );
};

export default LoginPage;
