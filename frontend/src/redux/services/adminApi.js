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
    createOrganization: build.mutation({
      query: (payload) => ({
        url: `${MODULE_BASE_URL}/create`,
        method: "POST",
        body: payload,
      }),
    }),
    listOrganization: build.query({
      query: () => `${MODULE_BASE_URL}/listAllOrganizations`,
    }),
    listRoles: build.query({
      query: () => `${MODULE_BASE_URL}/listRoles`,
    }),
    listAllData: build.query({
      query: () => `${MODULE_BASE_URL}/getAllData`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useListOrganizationQuery,
  useRegisterUserMutation,
  useListRolesQuery,
  useListAllDataQuery,
  useCreateOrganizationMutation,
} = adminApi;
