import { labelFormatter } from "../../app/util/helpers";
import { api } from "./baseApiSetup";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    listMetaOrganizations: build.query({
      query: () => "/api/v1/admin/organization/listMetaOrganizations",
      transformResponse: (data) => labelFormatter(data, "name", "_id"),
    }),
  }),
  overrideExisting: true,
});

export const { useListMetaOrganizationsQuery } = userApi;
