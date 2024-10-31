import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
