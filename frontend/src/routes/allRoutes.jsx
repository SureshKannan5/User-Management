import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AccessDenied from "../app/components/AccessDenied";

// Auth Pages

const Login = lazy(() => import("../auth/SignIn"));

const HomePage = lazy(() => import("../pages/HomePage"));

const RegisterAdmin = lazy(() => import("../auth/SignUp"));

const UsersView = lazy(() => import("../pages/UsersView"));

export const publicRoutes = [
  {
    path: "/register",
    component: <RegisterAdmin />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/access-denied",
    component: <AccessDenied />,
  },
];

export const authProtectedRoutes = [
  { path: "/organizations", component: <HomePage />, roles: ["admin"] },
  { path: "/users-view", component: <UsersView />, roles: ["admin", "user"] },
];
