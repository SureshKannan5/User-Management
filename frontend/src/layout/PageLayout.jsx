import React from "react";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div className="main-content">
      <Outlet />
    </div>
  );
};

export default PageLayout;
