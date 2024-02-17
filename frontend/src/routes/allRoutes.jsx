import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Auth Pages

const Login = lazy(() => import("../auth/SignIn"));

const HomePage = lazy(() => import("../pages/HomePage"));

const RegisterAdmin = lazy(() => import("../auth/SignUp"));

export const publicRoutes = [
  {
    path: "/register",
    component: <RegisterAdmin />,
  },
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
  { path: "/", component: <HomePage /> },
];
