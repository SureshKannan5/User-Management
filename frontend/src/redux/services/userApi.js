import { labelFormatter } from "../../app/util/helpers";
import { api } from "./baseApiSetup";

const MODULE_BASE_URL = "api/v1/user";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    listMetaOrganizations: build.query({
      query: () => "/api/v1/admin/organization/listMetaOrganizations",
      transformResponse: (data) => labelFormatter(data, "name", "_id"),
    }),
    listAllUsers: build.query({
      query: () => `${MODULE_BASE_URL}/listAllUsers`,
    }),
    getUserProfile: build.query({
      query: () => `${MODULE_BASE_URL}/profile`,
    }),
    updateCurrentUser: build.mutation({
      query: (payload) => ({
        url: `${MODULE_BASE_URL}/profile`,
        method: "PUT",
        body: payload,
      }),
    }),
    getUserById: build.query({
      query: (id) => `${MODULE_BASE_URL}/${id}`,
    }),
    updateUserById: build.mutation({
      query: ({ payload, id }) => ({
        url: `${MODULE_BASE_URL}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteUserById: build.mutation({
      query: ({ payload, id }) => ({
        url: `${MODULE_BASE_URL}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useListMetaOrganizationsQuery,
  useListAllUsersQuery,
  useLazyGetUserProfileQuery,
  useUpdateCurrentUserMutation,
  useLazyListAllUsersQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} = userApi;
