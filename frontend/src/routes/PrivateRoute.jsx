import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../app/components/PageLoader";
import { Navigate } from "react-router-dom";
import {
  selectCurrentToken,
  setUserAuthToken,
  setUserInfo,
} from "../redux/slices/authSlice";
import PageLayout from "../layout/PageLayout";
import { generateUserInfo } from "../app/util/helpers";

const PrivateRoute = () => {
  const [loading, setLoading] = React.useState(true);
  const token = useSelector(selectCurrentToken);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const userToken = sessionStorage.getItem("auth-token");

  useEffect(() => {
    try {
      if (token === "" && userToken !== "") {
        const userInformation = generateUserInfo(userToken);

        dispatch(setUserAuthToken({ token: userToken }));

        dispatch(setUserInfo(userInfo, { ...userInformation }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <PageLoader />
  ) : userToken ? (
    <PageLayout />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
