import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Auth Pages

const Login = lazy(() => import("../auth/SignIn"));

const Dashboards = lazy(() => import("../pages/Dashboard"));

export const publicRoutes = [
  {
    path: "/login",
    component: <Login />,
  },
];

export const authProtectedRoutes = [
  {
    path: "*",
    component: <Navigate to="/dashboards" />,
  },
  {
    path: "/",
    component: <Navigate to="/dashboards" />,
  },
  { path: "/dashboards", component: <Dashboards /> },
];