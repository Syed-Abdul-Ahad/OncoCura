import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import SideBar from "@/components/common/SideBar";

const RootLayout = () => {
  const login = localStorage.getItem("login");

  return (
    <>
      <Header />
      <div className="flex">
        {login === "true" && (
          <div className="w-[10vw]">
            <SideBar />
          </div>
        )}
        <div className={login === "true" ? "w-[85vw] mr-6 ml-4" : "w-full"}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
