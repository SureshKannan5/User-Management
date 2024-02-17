import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  selectCurrentToken,
  setUserAuthToken,
  setUserInfo,
} from "../redux/slices/authSlice";
import { generateUserInfo } from "../app/util/helpers";
import { authProtectedRoutes } from "./allRoutes";
import { isEmpty } from "lodash";
import PageLoader from "../app/components/PageLoader";
import PageLayout from "../layout/PageLayout";

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const userToken = sessionStorage.getItem("auth-token");
  const role = sessionStorage.getItem("currentUserRole");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpty(role)) {
      const matchRoute = authProtectedRoutes.find(
        (route) => route.path === location.pathname
      );
      if (!matchRoute?.roles.includes(role)) {
        if (location.pathname === "/") {
          if (role === "user") {
            navigate("/users-view");
            return;
          } else if (role === "admin") {
            navigate("/organizations");
            return;
          }
        }
        navigate("/access-denied");
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        if (token === "" && userToken !== "") {
          const userInformation = generateUserInfo(userToken);
          dispatch(setUserAuthToken({ token: userToken }));
          dispatch(setUserInfo({ ...userInformation }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    initializeUser();
  }, [token, userToken, dispatch]);

  if (loading) return <PageLoader />;
  if (userToken) return <PageLayout />;
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
