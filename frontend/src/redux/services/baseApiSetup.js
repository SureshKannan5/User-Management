import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "../slices/authSlice";

const API_URL = import.meta.env.VITE_BACKEND_SERVER || "http://localhost:8080";

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const {
      auth: { authState },
    } = getState();

    // console.log("token", auth);
    if (authState.token) {
      headers.set("Authorization", `Bearer ${authState.token}`);
      headers.set("srcuserid", authState.user);
      headers.set("authenticate", "true");
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    // logout
    api.dispatch(logOut());
    window.location.href = "/login";
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "/api/v1/users/create",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  reducerPath: "baseApi",
});

export const { useLoginMutation } = api;
