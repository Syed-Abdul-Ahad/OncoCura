import React from "react";
import SideComponent from "./subcomponent/SideComponent";
import SignUp from "@/components/shared/SignUp";

const signupPage = () => {
  return (
    <div className="flex flex-row w-full overflow-hidden bg-[#F9F9F9]">
      <SignUp />
      <SideComponent />
    </div>
  );
};

export default signupPage;
