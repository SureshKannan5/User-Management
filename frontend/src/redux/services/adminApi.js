import { labelFormatter } from "../../app/util/helpers";
import { api } from "./baseApiSetup";

const MODULE_BASE_URL = "api/v1/admin/organization";

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (payload) => ({
        url: `api/v1/user/create`,
        method: "POST",
        body: payload,
      }),
    }),
    listOrganization: build.query({
      query: () => `${MODULE_BASE_URL}/listAllOrganizations`,
      transformResponse: (data) => labelFormatter(data, "name", "_id"),
    }),
    listRoles: build.query({
      query: () => `${MODULE_BASE_URL}/listRoles`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useListOrganizationQuery,
  useRegisterUserMutation,
  useListRolesQuery,
} = adminApi;
