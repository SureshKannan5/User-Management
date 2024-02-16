import { Suspense } from "react";
import "./assets/styles/app.scss";
import PageLoader from "./app/components/PageLoader";
import { RouterProvider } from "react-router-dom";
import MainRouteDriver from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={MainRouteDriver} />
      </Suspense>
    </Provider>
  );
}

export default App;
