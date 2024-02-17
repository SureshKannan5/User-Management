import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "../slices/authSlice";
import { labelFormatter } from "../../app/util/helpers";

const API_URL = import.meta.env.VITE_BACKEND_SERVER || "http://localhost:8080";

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { auth } = getState();

    if (auth?.token) {
      headers.set("Authorization", `Bearer ${auth.token}`);
      headers.set("authenticate", "true");
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  console.log(result);

  if (result?.error?.originalStatus === 403) {
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
        url: "/api/v1/user/auth",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  reducerPath: "baseApi",
});

export const { useLoginMutation } = api;
