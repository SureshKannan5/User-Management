import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { publicRoutes, authProtectedRoutes } from "./allRoutes";
import PrivateRoute from "./PrivateRoute";

const MainRouteDriver = createBrowserRouter(
  createRoutesFromElements(
    <>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={route.component} key={route.path} />
      ))}
      <Route path="/" element={<PrivateRoute />}>
        {authProtectedRoutes.map((route) => (
          <Route path={route.path} element={route.component} key={route.path} />
        ))}
      </Route>
    </>
  )
);

export default MainRouteDriver;
