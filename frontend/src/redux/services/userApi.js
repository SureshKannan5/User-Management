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
    getUserById: build.query({
      query: (id) => `${MODULE_BASE_URL}/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useListMetaOrganizationsQuery,
  useListAllUsersQuery,
  useLazyGetUserByIdQuery,
} = userApi;
