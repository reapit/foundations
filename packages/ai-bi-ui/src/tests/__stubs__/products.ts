import { ProductModelPagedResult } from '@reapit/foundations-ts-definitions'

export const mockProductModelPagedResult: ProductModelPagedResult = {
  data: [
    {
      id: 'agencyCloud',
      name: 'AgencyCloud',
      defaultSandboxId: 'GBR',
      openApiUrl: 'https://platform.dev.paas.reapit.cloud/docs/swagger/agencyCloud_swagger.json',
    },
    {
      id: 'agencyCloudAus',
      name: 'AgencyCloud Australia',
      defaultSandboxId: 'AUS',
      openApiUrl: 'https://platform.dev.paas.reapit.cloud/docs/swagger/agencyCloudAus_swagger.json',
    },
    {
      id: 'sharedEntities',
      name: 'Shared Entities',
      openApiUrl: 'https://platform.dev.paas.reapit.cloud/docs/swagger/sharedEntities_swagger.json',
    },
  ],
  pageNumber: 1,
  pageSize: 3,
  pageCount: 3,
  totalCount: 3,
}
