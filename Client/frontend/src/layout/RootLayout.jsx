import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import SideBar from "@/components/common/SideBar";

const RootLayout = () => {
  const login = localStorage.getItem("login");

  return (
    <>
      <Header />
      {login === "true" && <SideBar />}
      <Outlet />
    </>
  );
};

export default RootLayout;
