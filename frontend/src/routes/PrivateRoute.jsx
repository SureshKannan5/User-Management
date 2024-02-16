import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../app/components/PageLoader";
import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentToken, setCredentials } from "../redux/slices/authSlice";

const PrivateRoute = () => {
  const [loading, setLoading] = React.useState(true);
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const userToken = sessionStorage.getItem("auth-token");
  const currentLoginUser = sessionStorage.getItem("currentSessionUser");
  const location = useLocation();

  useEffect(() => {
    if (token === "" && userToken) {
      // reset state in navigating urls to aviod location state rendering;
      location.state = null;
      dispatch(
        setCredentials({
          user: currentLoginUser || "",
          token: userToken || "",
        })
      );
    }
    setLoading(false);
  }, [location]);

  return loading ? (
    <PageLoader />
  ) : userToken ? (
    <div>page</div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
