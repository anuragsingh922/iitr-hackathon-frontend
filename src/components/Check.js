import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./UI/NavBar";

export default function Check() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
