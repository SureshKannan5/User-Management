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
    getOrgnizationById: build.query({
      query: (id) => `${MODULE_BASE_URL}/${id}`,
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
    updateOrganizationById: build.mutation({
      query: ({ payload, id }) => ({
        url: `${MODULE_BASE_URL}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    updateUserById: build.mutation({
      query: ({ payload, id }) => ({
        url: `api/v1/user/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteOrganizationById: build.mutation({
      query: (id) => ({
        url: `${MODULE_BASE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    deleteUserById: build.mutation({
      query: (id) => ({
        url: `api/v1/user/${id}`,
        method: "DELETE",
      }),
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
  useLazyGetOrgnizationByIdQuery,
  useUpdateOrganizationByIdMutation,
  useUpdateUserByIdMutation,
  useDeleteOrganizationByIdMutation,
  useDeleteUserByIdMutation,
} = adminApi;
