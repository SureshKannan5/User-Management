import React from "react";
import { Routes, Route } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import PrivateRoute from "./PrivateRoute";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route) => (
          <Route path={route.path} element={route.component} key={route.path} />
        ))}
        <Route path="/" element={<PrivateRoute />}>
          {authProtectedRoutes.map((route) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.name}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default Index;
