import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/baseApiSetup";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
