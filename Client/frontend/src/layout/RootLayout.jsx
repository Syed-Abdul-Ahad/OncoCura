import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import SideBar from "@/components/common/SideBar";
import { useGlobalContext } from "../context/GlobalContext";

const RootLayout = () => {
  const { isLoggedIn } = useGlobalContext();
  const location = useLocation();

  // const isLoginPage =
  //   location.pathname === "/login" ||
  //   location.pathname === "/signup" ||
  //   location.pathname === "/";

  return (
    <>
      <Header />
      <div className="flex">
        {isLoggedIn && (
          <div className="w-[10vw]">
            <SideBar />
          </div>
        )}
        <div className={isLoggedIn ? "w-[85vw] mr-6 ml-4" : "w-full"}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
