import { Suspense } from "react";
import "./assets/styles/app.scss";
import PageLoader from "./app/components/PageLoader";
import Routes from "./routes/index";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<PageLoader />}>
        <Routes />
      </Suspense>
    </Provider>
  );
}

export default App;
